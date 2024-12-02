from flask import Flask, jsonify, request
from transformers import BertTokenizer, BertModel
import psycopg2
import pandas as pd
import torch
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Initialize BERT model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Database connection
DATABASE_URL = "postgresql://postgres:4103@localhost:5432/Carreer"
conn = psycopg2.connect(DATABASE_URL)

# Function to embed text using BERT
def embed_text(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
    with torch.no_grad():
        embeddings = model(**inputs).last_hidden_state.mean(dim=1).squeeze()
    return embeddings.numpy()

# Load data from tables
def load_data():
    recommended_careers_query = "SELECT userid, career1, career2, career3 FROM recommended_careers;"
    student_interest_query = "SELECT user_id, subjects, sports, hobbies FROM student_interest;"
    foundational_courses_query = "SELECT course_id, name, description FROM foundational_courses;"
    
    recommended_careers = pd.read_sql(recommended_careers_query, conn)
    student_interest = pd.read_sql(student_interest_query, conn)
    foundational_courses = pd.read_sql(foundational_courses_query, conn)

    return recommended_careers, student_interest, foundational_courses

# Save all recommended courses in a single row in task_recommendations
def save_recommendations(userid, recommended_courses):
    with conn.cursor() as cursor:
        task_id_query = "SELECT task_id FROM tasks WHERE name = 'Foundational Courses';"
        cursor.execute(task_id_query)
        task_id = cursor.fetchone()[0]
        
        # Extract course names from the recommended courses
        course_names = [course['name'] for course in recommended_courses]
        
        # Insert the courses as an array into the recommendations column
        insert_query = """
            INSERT INTO task_recommendations (user_id, task_id, recommendations, recommendation_status)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(insert_query, (userid, task_id, course_names, 'Pending'))
        conn.commit()

# Predict most suitable foundational courses
def predict_courses(userid):
    recommended_careers, student_interest, foundational_courses = load_data()
    
    user_career_data = recommended_careers[recommended_careers['userid'] == userid]
    user_interest_data = student_interest[student_interest['user_id'] == userid]
    
    if user_career_data.empty or user_interest_data.empty:
        return {"error": "User data not found"}
    
    user_profile = " ".join([
        user_career_data['career1'].values[0] or "",
        user_career_data['career2'].values[0] or "",
        user_career_data['career3'].values[0] or "",
        user_interest_data['subjects'].values[0] or "",
        user_interest_data['sports'].values[0] or "",
        user_interest_data['hobbies'].values[0] or "",
    ])
    
    user_embedding = embed_text(user_profile)
    foundational_courses['embedding'] = foundational_courses['description'].apply(embed_text)
    
    similarity_scores = foundational_courses['embedding'].apply(
        lambda course_embedding: cosine_similarity([user_embedding], [course_embedding]).flatten()[0]
    )
    
    foundational_courses['similarity_score'] = similarity_scores
    top_courses = foundational_courses.sort_values(by="similarity_score", ascending=False).head(3)
    
    recommendations = top_courses[['course_id', 'name', 'description', 'similarity_score']].to_dict(orient="records")
    save_recommendations(userid, recommendations)
    
    return recommendations

# API endpoint to recommend courses
@app.route('/recommend_courses', methods=['GET'])
def recommend_courses():
    userid = request.args.get("userid", type=int)
    if userid is None:
        return jsonify({"error": "Missing userid parameter"}), 400
    
    recommendations = predict_courses(userid)
    return jsonify({"userid": userid, "recommendations": recommendations})

if __name__ == "__main__":
    app.run(debug=True, port=7000)
