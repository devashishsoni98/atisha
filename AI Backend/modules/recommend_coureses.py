from flask import Flask, jsonify, Blueprint,request
from transformers import BertTokenizer, BertModel
import psycopg2
import pandas as pd
import torch
import os
import numpy as np
from dotenv import load_dotenv
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity

load_dotenv()

recommend_courses_bp = Blueprint('recommend_courses', __name__)
CORS(recommend_courses_bp)

# Initialize BERT model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Database connection
DB_URL = os.getenv('DATABASE_URL')
conn = psycopg2.connect(DB_URL)

# Function to embed text using BERT
def embed_text(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
    with torch.no_grad():
        embeddings = model(**inputs).last_hidden_state.mean(dim=1).squeeze()
    return embeddings.numpy()

# Load data from tables
def load_data():
    with conn.cursor() as cursor:
        # Fetch recommended careers
        recommended_careers_query = "SELECT userid, career1, career2, career3 FROM recommended_careers;"
        cursor.execute(recommended_careers_query)
        recommended_careers_data = cursor.fetchall()
        recommended_careers_columns = [desc[0] for desc in cursor.description]
        recommended_careers = pd.DataFrame(recommended_careers_data, columns=recommended_careers_columns)

        # Fetch student interests
        student_interest_query = "SELECT user_id, subjects, sports, hobbies FROM student_interest;"
        cursor.execute(student_interest_query)
        student_interest_data = cursor.fetchall()
        student_interest_columns = [desc[0] for desc in cursor.description]
        student_interest = pd.DataFrame(student_interest_data, columns=student_interest_columns)

        # Fetch foundational courses
        foundational_courses_query = "SELECT course_id, name, description FROM foundational_courses;"
        cursor.execute(foundational_courses_query)
        foundational_courses_data = cursor.fetchall()
        foundational_courses_columns = [desc[0] for desc in cursor.description]
        foundational_courses = pd.DataFrame(foundational_courses_data, columns=foundational_courses_columns)

        # Fetch soft skill courses
        soft_skill_courses_query = "SELECT course_id, course_name, description FROM soft_skill_courses;"
        cursor.execute(soft_skill_courses_query)
        soft_skill_courses_data = cursor.fetchall()
        soft_skill_courses_columns = [desc[0] for desc in cursor.description]
        soft_skill_courses = pd.DataFrame(soft_skill_courses_data, columns=soft_skill_courses_columns)

        # Fetch vocational courses
        vocational_courses_query = "SELECT course_id, course_name, description FROM vocational_courses;"
        cursor.execute(vocational_courses_query)
        vocational_courses_data = cursor.fetchall()
        vocational_courses_columns = [desc[0] for desc in cursor.description]
        vocational_courses = pd.DataFrame(vocational_courses_data, columns=vocational_courses_columns)

    return recommended_careers, student_interest, foundational_courses, soft_skill_courses, vocational_courses

# Save recommendations to task_recommendations
def save_recommendations(userid, recommended_courses, task_type):
    try:
        with conn.cursor() as cursor:
            # Determine the task_id based on the task type
            task_id_query = "SELECT task_id FROM tasks WHERE name = %s;"
            cursor.execute(task_id_query, (task_type,))
            task_id_result = cursor.fetchone()
            
            if not task_id_result:
                raise ValueError(f"Task type '{task_type}' not found in the database.")
            
            task_id = task_id_result[0]

            # Extract course names based on the task type
            course_names = [course['name'] if 'name' in course else course['course_name'] for course in recommended_courses]

            # Insert the courses as an array into the recommendations column
            insert_query = """
                INSERT INTO task_recommendations (user_id, task_id, recommendations, recommendation_status)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(insert_query, (userid, task_id, course_names, 'Pending'))
            conn.commit()
            print(f"Recommendations successfully saved for user {userid} under task type '{task_type}'.")

    except ValueError as ve:
        print(f"Value Error: {ve}")
        return {"error": str(ve)}
    except psycopg2.Error as db_err:
        conn.rollback()  # Rollback the transaction to maintain database consistency
        print(f"Database Error: {db_err}")
        return {"error": "A database error occurred. Please try again later."}
    except Exception as e:
        conn.rollback()  # Rollback for any other exceptions
        print(f"Unexpected Error: {e}")
        return {"error": "An unexpected error occurred. Please contact support."}

# Predict most suitable foundational courses
def predict_courses(userid):
    # Unpack all five returned values
    recommended_careers, student_interest, foundational_courses, soft_skill_courses, vocational_courses = load_data()
    
    # Filter user-specific data from `recommended_careers` and `student_interest`
    user_career_data = recommended_careers[recommended_careers['userid'] == userid]
    user_interest_data = student_interest[student_interest['user_id'] == userid]
    
    # Handle the case where user data is missing
    if user_career_data.empty or user_interest_data.empty:
        return {"error": "User data not found"}
    
    # Combine career and interest data to create the user profile
    user_profile = " ".join([
        user_career_data['career1'].values[0] or "",
        user_career_data['career2'].values[0] or "",
        user_career_data['career3'].values[0] or "",
        user_interest_data['subjects'].values[0] or "",
        user_interest_data['sports'].values[0] or "",
        user_interest_data['hobbies'].values[0] or ""
    ])
    
    # Embed the user profile using BERT
    user_embedding = embed_text(user_profile)
    
    # Embed course descriptions and calculate similarity scores
    foundational_courses['embedding'] = foundational_courses['description'].apply(embed_text)
    similarity_scores = foundational_courses['embedding'].apply(
        lambda course_embedding: cosine_similarity([user_embedding], [course_embedding]).flatten()[0]
    )
    
    # Add similarity scores to the courses and recommend top 3
    foundational_courses['similarity_score'] = similarity_scores
    top_courses = foundational_courses.sort_values(by="similarity_score", ascending=False).head(3)
    
    # Convert recommendations to a dictionary
    recommendations = top_courses[['course_id', 'name', 'description', 'similarity_score']].to_dict(orient="records")
    
    # Save recommendations to the database
    save_recommendations(userid, recommendations, 'Foundational Courses')
    
    return recommendations


# Predict and recommend soft skill courses based on career recommendations
def recommend_soft_skill_courses(userid):
    recommended_careers, _, _, soft_skill_courses, _ = load_data()
    
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
@recommend_courses_bp.route('/recommend_courses', methods=['GET'])
def recommend_courses():
    userid = request.args.get("userid", type=int)
    if userid is None:
        return jsonify({"error": "Missing userid parameter"}), 400
    
    recommendations = predict_courses(userid)
    return jsonify({"userid": userid, "recommendations": recommendations})

# API endpoint to recommend soft skill courses
@recommend_courses_bp.route('/recommend_soft_skills', methods=['GET'])
def recommend_soft_skills():
    userid = request.args.get("userid", type=int)
    if userid is None:
        return jsonify({"error": "Missing userid parameter"}), 400
    
    recommendations = recommend_soft_skill_courses(userid)
    return jsonify({"userid": userid, "recommendations": recommendations})

@recommend_courses_bp.route('/recommend_vocational_courses', methods=['GET'])
def recommend_vocational():
    userid = request.args.get("userid", type=int)
    if userid is None:
        return jsonify({"error": "Missing userid parameter"}), 400
    
    recommendations = recommend_vocational_courses(userid)
    return jsonify({"userid": userid, "recommendations": recommendations})
