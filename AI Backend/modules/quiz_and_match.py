from flask import Flask, request,Blueprint, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai
import psycopg2
from psycopg2.extras import RealDictCursor

from flask import Flask, request, jsonify
from flask import request, jsonify, url_for
from flask_cors import CORS, cross_origin  
import psycopg2
from psycopg2.extras import RealDictCursor
import requests
import threading  # For running the second API call in a separate thread

import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from transformers import BertTokenizer, BertModel
import torch
import numpy as np

quiz_bp = Blueprint('quiz_and_match', __name__)
CORS(quiz_bp)

# Enable CORS for all domains (you can customize it later for specific domains)
CORS(quiz_bp, resources={r"/*": {"origins": "http://localhost:5173", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"]}})

# Load environment variables
load_dotenv()
# Configure Gemini API
api_key = os.getenv("GEMINI_API_KEY2")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-pro")


# Database connection
DB_URL = os.getenv('DATABASE_URL')

try:
    conn = psycopg2.connect(DB_URL)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
except Exception as e:
    print("Database connection error:", e)
    exit()  # Exit if the database connection fails


# Load BERT Model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')


# 1. Define a new function to generate weighted embeddings
def weighted_embed_text(career1, career2, career3):
    weights = [1.5, 0.8, 0.5]  # Adjust the weights for career1, career2, and career3 respectively
    careers = [career1, career2, career3]
    
    # Filter out any empty careers
    careers = [career for career in careers if career.strip()]
    
    # Apply weight to each career and generate its embedding
    weighted_embeddings = []
    for i, career in enumerate(careers):
        embedding = embed_text(career)
        weighted_embeddings.append(embedding * weights[i])
    
    # Calculate the weighted average of embeddings
    if weighted_embeddings:
        return torch.mean(torch.stack(weighted_embeddings), dim=0)
    else:
        return torch.zeros(768)  # Return a zero vector if no valid careers


def embed_text(text):
    inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=128)
    with torch.no_grad():
        embeddings = model(**inputs).last_hidden_state.mean(dim=1)
    return embeddings


def load_data():
    try:
        # Fetch student data from PostgreSQL
        cursor.execute("SELECT * FROM recommended_careers;")  # Of Students
        students_data = cursor.fetchall()
        # print("Fetched Students Data:", students_data)  # Debugging line
        
        # Fetch counselor data from PostgreSQL
        cursor.execute("SELECT * FROM counselor_professional;")
        counselors_data = cursor.fetchall()
        # print("Fetched Counselors Data:", counselors_data)  # Debugging line

        # Fetch mentor data from PostgreSQL
        cursor.execute("SELECT * FROM mentors;")
        mentors_data = cursor.fetchall()
        # print("Fetched Mentors Data:", mentors_data)  # Debugging line

    except Exception as e:
        print("Error fetching data from database:", e)
        return pd.DataFrame(), pd.DataFrame(), pd.DataFrame()  # Return empty DataFrames on error

    return pd.DataFrame(students_data), pd.DataFrame(counselors_data), pd.DataFrame(mentors_data)


students, counselors, mentors = load_data()

# Check if students DataFrame is empty
if students.empty:
    print("No student data found. Exiting.")
    # exit()  # Exit if no student data is available

# Print columns for debugging purposes
# print("Students DataFrame Columns:", students.columns)

# Check if required columns exist before combining them
required_columns = ['career1', 'career2', 'career3']
if all(col in students.columns for col in required_columns):
    students['combined_careers'] = students[required_columns].fillna('').apply(
        lambda row: " ".join(filter(None, [row['career1'], row['career2'], row['career3']])), axis=1
    )
else:
    print("One or more required columns are missing in the students DataFrame.")

# 2. Update the students' embeddings using the weighted approach
students['embedding'] = students.apply(lambda row: weighted_embed_text(
    row['career1'], row['career2'], row['career3']
), axis=1)

# Update counselors' embeddings based on their specialization
counselors['embedding'] = counselors['career_specialization'].apply(
    lambda career_specialization: embed_text(" ".join(career_specialization)) 
    if isinstance(career_specialization, list) 
    else embed_text(career_specialization)
    if isinstance(career_specialization, str) and career_specialization.strip() 
    else embed_text("")
)

# Generate BERT Embeddings for Mentors using the 'expertise' column
mentors['embedding'] = mentors['expertise'].apply(
    lambda expertise: embed_text(expertise) if isinstance(expertise, str) and expertise.strip() else embed_text("")
)


def find_matches(user_id=None, counselor_id=None, mentor_id=None):
    matches = []
    
    if user_id:  # Matching student based on user_id
        # Check if the student ID exists in the DataFrame
        if user_id not in students['user_id'].values:
            return {"error": "Student ID not found"}
        
        # Retrieve the student's embedding
        student_embedding = students.loc[students['user_id'] == user_id, 'embedding'].values[0].reshape(1, -1)
        
        if counselor_id:  # If counselor_id is provided, match with counselors
            counselor_embeddings = np.vstack(counselors['embedding'].values)
            cosine_similarities = cosine_similarity(student_embedding, counselor_embeddings).flatten()
            top_indices = cosine_similarities.argsort()[-3:][::-1]
            
            for i in top_indices:
                matches.append({
                    "counselor_id": int(counselors['user_id'].iloc[i]),
                    "specialization": counselors['counselor_speciality'].iloc[i],
                    "career_specialization": counselors['career_specialization'].iloc[i],
                    "similarity_score": float(cosine_similarities[i]),
                    "student_career_1": students.loc[students['user_id'] == user_id, 'career1'].values[0],
                    "student_career_2": students.loc[students['user_id'] == user_id, 'career2'].values[0],
                    "student_career_3": students.loc[students['user_id'] == user_id, 'career3'].values[0]
                })

        elif mentor_id:  # If mentor_id is provided, match with mentors
            mentor_embeddings = np.vstack(mentors['embedding'].values)
            cosine_similarities = cosine_similarity(student_embedding, mentor_embeddings).flatten()
            top_indices = cosine_similarities.argsort()[-3:][::-1]
            
            for i in top_indices:
                matches.append({
                    "mentor_id": int(mentors['user_id'].iloc[i]),
                    "specialization": mentors['expertise'].iloc[i],
                    "similarity_score": float(cosine_similarities[i]),
                    "student_career_1": students.loc[students['user_id'] == user_id, 'career1'].values[0],
                    "student_career_2": students.loc[students['user_id'] == user_id, 'career2'].values[0],
                    "student_career_3": students.loc[students['user_id'] == user_id, 'career3'].values[0]
                })

    return matches


# Function to call the second API asynchronously
def call_second_api(student_class):
    second_api_url = 'http://127.0.0.1:7000/questions/generate_questions'  # Replace with the actual URL
    try:
        # Send a POST request to the second API without waiting for a response
        requests.post(second_api_url, json={'class': student_class})
    except requests.exceptions.RequestException as e:
        # Optionally log the error or handle it in some way
        print(f"Failed to call the second API: {e}")

@quiz_bp.route('/fetch_generate_questions', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])

def fetch_generate_questions():
    data = request.json
    student_class = data.get("class")

    if not student_class:
        return jsonify({"error": "Class is required"}), 400

    # 1. Clean the database by deleting rows where the answer column is NULL
    with conn.cursor() as cursor:
        delete_query = '''DELETE FROM quiz_questions 
            WHERE answer IS NULL 
            AND category IN ('Aptitude Test', 'IQ Test');'''
        cursor.execute(delete_query)
        conn.commit()

    with conn.cursor() as cursor:
        delete_query = '''DELETE FROM quiz_questions 
            WHERE traits IS NULL 
            AND category IN ('Holland Code', 'Big Five Personality');'''
        cursor.execute(delete_query)
        conn.commit()

    # 2. Query to fetch questions based on class
    query = """
        WITH question_selection AS (
            SELECT *, 
                ROW_NUMBER() OVER (
                    PARTITION BY category, traits 
                    ORDER BY 
                        CASE 
                            WHEN category = 'Holland Code' THEN 1
                            WHEN category = 'Big Five Personality' THEN 2
                            WHEN category = 'Aptitude Test' THEN 3
                            WHEN category = 'IQ Test' THEN 4
                            ELSE 5 -- Default for any unexpected categories
                        END, 
                        RANDOM()
                ) AS rn
            FROM quiz_questions
            WHERE class = 10
        )
        SELECT id, category, traits, question, options 
        FROM question_selection
        WHERE 
            (category = 'Holland Code' AND rn <= 2) OR
            (category = 'Big Five Personality' AND rn <= 2) OR
            (category = 'Aptitude Test' AND rn <= 5) OR
            (category = 'IQ Test' AND rn <= 3)
        ORDER BY 
            CASE 
                WHEN category = 'Holland Code' THEN 1
                WHEN category = 'Big Five Personality' THEN 2
                WHEN category = 'Aptitude Test' THEN 3
                WHEN category = 'IQ Test' THEN 4
                ELSE 5 -- Default for any unexpected categories
            END;

        """

    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(query, (student_class,))
        questions = cursor.fetchall()

    # 3. Call the second API in a separate thread
    # threading.Thread(target=call_second_api, args=(student_class,)).start()

    # 4. Return the questions as the response immediately
    return jsonify({"questions": questions})


@quiz_bp.route('/calculate_results', methods=['POST'])
def calculate_results():
    data = request.json
    user_id = data.get("user_id")
    responses = data.get("responses")  # List of {"question_id": <id>, "response": <value>}

    # Validate inputs
    if not user_id or not isinstance(responses, list) or len(responses) == 0:
        return jsonify({"error": "User ID and valid responses are required"}), 400

    try:
        # Step 1: Fetch all questions related to the provided responses
        question_ids = [resp["question_id"] for resp in responses]
        query = """
            SELECT id, category, traits, answer 
            FROM quiz_questions 
            WHERE id = ANY(%s);
        """
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query, (question_ids,))
            questions = cursor.fetchall()

        if not questions:
            return jsonify({"error": "No questions found for the provided IDs"}), 404

        # Step 2: Initialize variables
        holland_scores = {}
        big_five_scores = {}
        aptitude_score = 0
        iq_score = 0

        response_dict = {resp["question_id"]: resp["response"] for resp in responses}

        # Step 3: Process each question and calculate scores
        for question in questions:
            question_id = question["id"]
            category = question["category"]
            traits = question["traits"]
            correct_answer = question["answer"]
            user_response = response_dict.get(question_id)

            # Validate response before using
            if user_response is None:
                continue

            if category in ["Holland Code", "Big Five Personality"]:
                try:
                    user_response = int(user_response)  # Likert scale score
                    if category == "Holland Code":
                        holland_scores[traits] = holland_scores.get(traits, 0) + user_response
                    elif category == "Big Five Personality":
                        big_five_scores[traits] = big_five_scores.get(traits, 0) + user_response
                except ValueError:
                    continue  # Skip invalid responses

            elif category in ["Aptitude Test", "IQ Test"]:
                if user_response == correct_answer:
                    if category == "Aptitude Test":
                        aptitude_score += 1
                    elif category == "IQ Test":
                        iq_score += 1

        # Step 4: Calculate highest traits
        top_holland_traits = [trait for trait, score in holland_scores.items() if score == max(holland_scores.values(), default=0)]
        top_big_five_traits = [trait for trait, score in big_five_scores.items() if score == max(big_five_scores.values(), default=0)]

        # Step 5: Calculate aptitude and IQ status
        aptitude_status = calculate_status(aptitude_score, len([q for q in questions if q["category"] == "Aptitude Test"]))
        iq_status = calculate_status(iq_score, len([q for q in questions if q["category"] == "IQ Test"]))

        # Step 6: Store results in the database
        try:
            with conn.cursor() as cursor:
                cursor.execute("""
            INSERT INTO user_traits_status(
                user_id, 
                holland_code_traits, 
                big_five_traits,
                aptitude_status, 
                iq_status,
                traits_counter
            ) VALUES (%s, %s, %s, %s, %s, 1)
            ON CONFLICT (user_id) DO UPDATE SET traits_counter = user_traits_status.traits_counter + 1
        """, (
            user_id,
            top_holland_traits,
            top_big_five_traits,
            aptitude_status,
            iq_status
        ))
            conn.commit()
        except Exception as e:
            return jsonify({"error": "Failed to store results", "details": str(e)}), 500

        # Step 7: Return the results
        result = {
            "user_id": user_id,
            "results": {
                "holland_code": {"top_trait": top_holland_traits, "scores": holland_scores},
                "big_five_personality": {"top_trait": top_big_five_traits, "scores": big_five_scores},
                "aptitude_test": {
                    "score": aptitude_score,
                    "status": aptitude_status
                },
                "iq_test": {
                    "score": iq_score,
                    "status": iq_status
                },
            }
        }

        # Step 8 : Call another api
        # Step 3: Prepare the payload for /recommend_careers API
        payload = {"user_id": user_id}

        # Step 4: Make a request to the /recommend_careers API
        recommend_url = url_for('recommend_careers.recommend_careers', _external=True)
        response = requests.post(recommend_url, json=payload)

        # Step 5: Handle response from /recommend_careers API
        if response.status_code == 200:
            career_recommendations = response.json()

            # Step 6: Merge the results of both APIs
            result["career_recommendations"] = career_recommendations
            return jsonify(result), 200
        else:
            return jsonify({
                "status": "error",
                "message": "Failed to fetch career recommendations"
            }), response.status_code

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

        # Display the result on the console
        # print("Result sent to client:", result)

        # Return the JSON response
        return jsonify(result)


    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500


def calculate_status(score, total_questions):
    if total_questions == 0:
        return "No Questions Found"
    percentage = (score / total_questions) * 100
    if percentage <= 40:
        return "Low"
    elif percentage <= 80:
        return "Mid"
    else:
        return "High"


# Endpoint to search for matches based on student ID (for counselors)
@quiz_bp.route('/match_counselor', methods=['GET'])
def match_counselor():
    user_id = int(request.args.get('user_id'))  # Get student user_id from query parameter
    matches = find_matches(user_id=user_id, counselor_id=True)  # Pass user_id and counselor_id flag to find_matches
    return jsonify({"user_id": user_id, "matches": matches})


# Endpoint to search for matches based on student ID (for mentors)
@quiz_bp.route('/match_mentor', methods=['GET'])
def match_mentor():
    user_id = int(request.args.get('user_id'))  # Get student user_id from query parameter
    matches = find_matches(user_id=user_id, mentor_id=True)  # Pass user_id and mentor_id flag to find_matches
    return jsonify({"user_id": user_id, "matches": matches})



