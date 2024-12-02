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
    soft_skill_courses_query = "SELECT course_id, course_name, description FROM soft_skill_courses;"
    vocational_courses_query = "SELECT course_id, course_name, description FROM vocational_courses;"

    recommended_careers = pd.read_sql(recommended_careers_query, conn)
    student_interest = pd.read_sql(student_interest_query, conn)
    foundational_courses = pd.read_sql(foundational_courses_query, conn)
    soft_skill_courses = pd.read_sql(soft_skill_courses_query, conn)
    vocational_courses = pd.read_sql(vocational_courses_query, conn)

    return recommended_careers, student_interest, foundational_courses, soft_skill_courses, vocational_courses

# Save recommendations to task_recommendations
def save_recommendations(userid, recommended_courses, task_type):
    with conn.cursor() as cursor:
        # Determine the task_id based on the task type
        task_id_query = "SELECT task_id FROM tasks WHERE name = %s;"
        cursor.execute(task_id_query, (task_type,))
        task_id = cursor.fetchone()[0]
        
        # Extract course names based on the task type
        if task_type == 'Foundational Courses':
            course_names = [course['name'] for course in recommended_courses]
        elif task_type == 'Soft Skills Courses':
            course_names = [course['course_name'] for course in recommended_courses]
        elif task_type == 'Vocational Courses':
            course_names = [course['course_name'] for course in recommended_courses]
        else:
            raise ValueError(f"Invalid task type: {task_type}")
        
        # Insert the courses as an array into the recommendations column
        insert_query = """
            INSERT INTO task_recommendations (user_id, task_id, recommendations, recommendation_status)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(insert_query, (userid, task_id, course_names, 'Pending'))
        conn.commit()


# Predict most suitable foundational courses
def predict_courses(userid):
    recommended_careers, student_interest, foundational_courses, _ = load_data()
    
    user_career_data = recommended_careers[recommended_careers['userid'] == userid]
    user_interest_data = student_interest[student_interest['user_id'] == userid]
    
    if user_career_data.empty or user_interest_data.empty:
        return {"error": "User data not found"}
    
    user_profile = " ".join([user_career_data['career1'].values[0] or "",
                             user_career_data['career2'].values[0] or "",
                             user_career_data['career3'].values[0] or "",
                             user_interest_data['subjects'].values[0] or "",
                             user_interest_data['sports'].values[0] or "",
                             user_interest_data['hobbies'].values[0] or ""])
    
    user_embedding = embed_text(user_profile)
    foundational_courses['embedding'] = foundational_courses['description'].apply(embed_text)
    
    similarity_scores = foundational_courses['embedding'].apply(
        lambda course_embedding: cosine_similarity([user_embedding], [course_embedding]).flatten()[0]
    )
    
    foundational_courses['similarity_score'] = similarity_scores
    top_courses = foundational_courses.sort_values(by="similarity_score", ascending=False).head(3)
    
    recommendations = top_courses[['course_id', 'name', 'description', 'similarity_score']].to_dict(orient="records")
    save_recommendations(userid, recommendations, 'Foundational Courses')
    
    return recommendations

# Predict and recommend soft skill courses based on career recommendations
def recommend_soft_skill_courses(userid):
    recommended_careers, _, _, soft_skill_courses = load_data()
    
    # Get the careers recommended for the user
    user_career_data = recommended_careers[recommended_careers['userid'] == userid]
    if user_career_data.empty:
        return {"error": "User career data not found"}
    
    # Combine the career recommendations into a single text block for embedding
    careers_combined = " ".join([user_career_data['career1'].values[0],
                                 user_career_data['career2'].values[0],
                                 user_career_data['career3'].values[0]])
    
    # Generate embeddings for user careers
    career_embedding = embed_text(careers_combined)
    
    # Compute similarity scores between career embedding and soft skill course descriptions
    soft_skill_courses['embedding'] = soft_skill_courses['description'].apply(embed_text)
    soft_skill_courses['similarity_score'] = soft_skill_courses['embedding'].apply(
        lambda course_embedding: cosine_similarity([career_embedding], [course_embedding]).flatten()[0]
    )
    
    # Sort soft skill courses by similarity score and select top 3
    top_soft_skill_courses = soft_skill_courses.sort_values(by="similarity_score", ascending=False).head(3)
    recommended_courses_list = top_soft_skill_courses[['course_name', 'description']].to_dict(orient="records")
    
    # Save recommendations to the database
    save_recommendations(userid, recommended_courses_list, 'Soft Skills Courses')
    
    return recommended_courses_list

def recommend_vocational_courses(userid):
    recommended_careers, _, foundational_courses, soft_skill_courses, vocational_courses = load_data()
    
    # Get career recommendations for the user
    user_career_data = recommended_careers[recommended_careers['userid'] == userid]
    if user_career_data.empty:
        return {"error": "User career data not found"}
    
    # Combine text from career recommendations, foundational courses, and soft skills for embedding
    user_profile = " ".join([
        user_career_data['career1'].values[0] or "",
        user_career_data['career2'].values[0] or "",
        user_career_data['career3'].values[0] or "",
        " ".join(foundational_courses['description']),
        " ".join(soft_skill_courses['description'])
    ])
    
    # Generate embeddings for user profile and vocational courses
    user_embedding = embed_text(user_profile)
    vocational_courses['embedding'] = vocational_courses['description'].apply(embed_text)
    
    # Compute similarity scores and recommend top 3 courses
    vocational_courses['similarity_score'] = vocational_courses['embedding'].apply(
        lambda course_embedding: cosine_similarity([user_embedding], [course_embedding]).flatten()[0]
    )
    
    top_vocational_courses = vocational_courses.sort_values(by="similarity_score", ascending=False).head(3)
    recommended_courses_list = top_vocational_courses[['course_name', 'description']].to_dict(orient="records")
    
    # Save recommendations to the database
    save_recommendations(userid, recommended_courses_list, 'Vocational Courses')
    
    return recommended_courses_list

# API endpoint to recommend courses (Foundational Courses)
@app.route('/recommend_courses', methods=['GET'])
def recommend_courses():
    userid = request.args.get("userid", type=int)
    if userid is None:
        return jsonify({"error": "Missing userid parameter"}), 400
    
    recommendations = predict_courses(userid)
    return jsonify({"userid": userid, "recommendations": recommendations})

# API endpoint to recommend soft skill courses
@app.route('/recommend_soft_skills', methods=['GET'])
def recommend_soft_skills():
    userid = request.args.get("userid", type=int)
    if userid is None:
        return jsonify({"error": "Missing userid parameter"}), 400
    
    recommendations = recommend_soft_skill_courses(userid)
    return jsonify({"userid": userid, "recommendations": recommendations})

@app.route('/recommend_vocational_courses', methods=['GET'])
def recommend_vocational():
    userid = request.args.get("userid", type=int)
    if userid is None:
        return jsonify({"error": "Missing userid parameter"}), 400
    
    recommendations = recommend_vocational_courses(userid)
    return jsonify({"userid": userid, "recommendations": recommendations})

if __name__ == "__main__":
    app.run(debug=True, port=7000)
