from flask import Flask, jsonify, request
import psycopg2
from psycopg2.extras import RealDictCursor
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS
from transformers import BertTokenizer, BertModel
import torch
import numpy as np

app = Flask(__name__)
CORS(app)

# Database connection
DATABASE_URL = "postgresql://postgres:amanjain17@localhost:5432/atisha_db"

try:
    conn = psycopg2.connect(DATABASE_URL)
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
        print("Fetched Students Data:", students_data)  # Debugging line
        
        # Fetch counselor data from PostgreSQL
        cursor.execute("SELECT * FROM counselor_professional;")
        counselors_data = cursor.fetchall()
        print("Fetched Counselors Data:", counselors_data)  # Debugging line

        # Fetch mentor data from PostgreSQL
        cursor.execute("SELECT * FROM mentors;")
        mentors_data = cursor.fetchall()
        print("Fetched Mentors Data:", mentors_data)  # Debugging line

    except Exception as e:
        print("Error fetching data from database:", e)
        return pd.DataFrame(), pd.DataFrame(), pd.DataFrame()  # Return empty DataFrames on error

    return pd.DataFrame(students_data), pd.DataFrame(counselors_data), pd.DataFrame(mentors_data)


students, counselors, mentors = load_data()

# Check if students DataFrame is empty
if students.empty:
    print("No student data found. Exiting.")
    exit()  # Exit if no student data is available

# Print columns for debugging purposes
print("Students DataFrame Columns:", students.columns)

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
            top_indices = cosine_similarities.argsort()[-5:][::-1]
            
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

# Endpoint to search for matches based on student ID (for counselors)
@app.route('/match_counselor', methods=['GET'])
def match_counselor():
    user_id = int(request.args.get('user_id'))  # Get student user_id from query parameter
    matches = find_matches(user_id=user_id, counselor_id=True)  # Pass user_id and counselor_id flag to find_matches
    return jsonify({"user_id": user_id, "matches": matches})


# Endpoint to search for matches based on student ID (for mentors)
@app.route('/match_mentor', methods=['GET'])
def match_mentor():
    user_id = int(request.args.get('user_id'))  # Get student user_id from query parameter
    matches = find_matches(user_id=user_id, mentor_id=True)  # Pass user_id and mentor_id flag to find_matches
    return jsonify({"user_id": user_id, "matches": matches})


if __name__ == '__main__':
    app.run(debug=True, port=7000)