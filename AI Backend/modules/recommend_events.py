from flask import Flask, jsonify, Blueprint, request
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

recommend_events_bp = Blueprint('recommend_events', __name__)
CORS(recommend_events_bp)

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

        # Fetch events
        events_query = "SELECT id, name, description, event_type, event_mode FROM events;"
        cursor.execute(events_query)
        events_data = cursor.fetchall()
        events_columns = [desc[0] for desc in cursor.description]
        events = pd.DataFrame(events_data, columns=events_columns)

    return recommended_careers, student_interest, events

# Save recommended events to the database
def save_recommended_events(userid, recommended_events):
    try:
        with conn.cursor() as cursor:
            for event in recommended_events:
                insert_query = """
                    INSERT INTO recommended_events (user_id, event_id, recommendation_status)
                    VALUES (%s, %s, %s)
                """
                cursor.execute(insert_query, (userid, event['id'], 'Pending'))
            conn.commit()
            print(f"Recommended events saved successfully for user {userid}")
    except psycopg2.Error as db_err:
        conn.rollback()
        print(f"Database Error: {db_err}")
    except Exception as e:
        conn.rollback()
        print(f"Unexpected Error: {e}")

# Predict suitable events
def predict_events(userid):
    recommended_careers, student_interest, events = load_data()

    # Filter user-specific data
    user_career_data = recommended_careers[recommended_careers['userid'] == userid]
    user_interest_data = student_interest[student_interest['user_id'] == userid]

    # Handle missing user data
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

    # Embed event descriptions and calculate similarity scores
    events['embedding'] = events['description'].apply(embed_text)
    similarity_scores = events['embedding'].apply(
        lambda event_embedding: cosine_similarity([user_embedding], [event_embedding]).flatten()[0]
    )

    # Add similarity scores to the events and recommend top 3
    events['similarity_score'] = similarity_scores
    top_events = events.sort_values(by="similarity_score", ascending=False).head(3)

    # Convert recommendations to a dictionary
    recommendations = top_events[['id', 'name', 'description', 'event_type', 'event_mode', 'similarity_score']].to_dict(orient="records")

    # Save recommendations to the database
    save_recommended_events(userid, recommendations)

    return recommendations

# API endpoint to recommend events
@recommend_events_bp.route('/recommend_events', methods=['GET'])
def recommend_events():
    userid = request.args.get("userid", type=int)
    if userid is None:
        return jsonify({"error": "Missing userid parameter"}), 400

    recommendations = predict_events(userid)
    return jsonify({"userid": userid, "recommendations": recommendations})


