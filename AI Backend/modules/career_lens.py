# import os
# import psycopg2
# from psycopg2.extras import RealDictCursor
# import google.generativeai as genai
# from flask import Flask, request, Blueprint, jsonify
# from flask_cors import CORS
# from dotenv import load_dotenv
# import re

# # Load environment variables
# load_dotenv()

# career_lens_bp = Blueprint("career_lens", __name__)
# CORS(career_lens_bp)

# # Configure Gemini
# api_key = os.getenv("GEMINI_API_KEY2")
# genai.configure(api_key=api_key)
# model1 = genai.GenerativeModel("gemini-pro")

# # Database connection
# DB_URL = os.getenv("DATABASE_URL")

# try:
#     conn = psycopg2.connect(DB_URL)
#     cursor = conn.cursor(cursor_factory=RealDictCursor)
# except Exception as e:
#     print("Database connection error:", e)
#     exit()

# # Data cleaning function
# # def clean_text(text):
# #     """Remove unwanted characters, symbols, and leading/trailing spaces from text."""
# #     # Remove unwanted characters (e.g., asterisks) and extra spaces
# #     cleaned_text = re.sub(r"\*", "", text).strip()
# #     # Remove leading/trailing spaces from each item in a comma-separated list
# #     cleaned_text = ", ".join([item.strip() for item in cleaned_text.split(",")])
# #     return cleaned_text

# def clean_text(text):
#     """Remove unwanted characters, symbols, and leading/trailing spaces from text."""
#     # Remove asterisks and normalize spaces
#     cleaned_text = re.sub(r"\*", "", text).strip()
#     # Handle extra spaces in comma-separated lists and normalize spaces in general
#     cleaned_text = ", ".join([item.strip() for item in cleaned_text.split(",")])
#     # Correct extra spaces after commas (e.g., in salary ranges)
#     cleaned_text = re.sub(r",\s+", ",", cleaned_text)
#     return cleaned_text


# # Function to fetch data from Gemini
# def fetch_career_data(career):
#     prompts = {
#         "skills": f"List the key skills required for a career as a {career}. Provide them as a comma-separated list without extra characters.\n",
#         "cons": f"What are the cons of pursuing a career as a {career}? Provide clear points prefixed with 'Con:'.Keep it concise and give 5 cons only(one sentence max per con).\n",
#         "pros": f"What are the pros of pursuing a career as a {career}? Provide clear points prefixed with 'Pro:'.Keep it concise and give 5 pros only(one sentence max per pro).\n",
#         "related_careers": f"What careers are related to being a {career}? Provide them as a comma-separated list without extra characters.\n",
#         "salary": f"What is the typical salary range for a {career} in India? Provide a single-line answer in INR",
#     }

#     responses = {}

#     for key, prompt in prompts.items():
#         try:
#             response = model1.generate_content(prompt)
#             responses[key] = clean_text(response.text.strip())
#         except Exception as e:
#             responses[key] = f"Error fetching {key}: {str(e)}"

#     # Handle pros and cons separately
#     pros = responses.get("pros", "Data unavailable")
#     cons = responses.get("cons", "Data unavailable")

#     # Split and clean pros and cons if they contain the 'Pro:' or 'Con:' prefix
#     pros = [clean_text(item.replace("Pro:", "").strip()) for item in pros.splitlines() if item.startswith("Pro:")]
#     cons = [clean_text(item.replace("Con:", "").strip()) for item in cons.splitlines() if item.startswith("Con:")]

#     # Fallback to 'Data unavailable' if no pros or cons found
#     if not pros:
#         pros = ["Data unavailable"]
#     if not cons:
#         cons = ["Data unavailable"]

#     responses["pros"] = pros
#     responses["cons"] = cons

#     return responses


# # Endpoint to process career lens data
# @career_lens_bp.route("/career-lens", methods=["POST"])
# def career_lens():
#     data = request.json
#     career = data.get("career")
#     if not career:
#         return jsonify({"error": "Career field is required"}), 400

#     # Fetch data from Gemini
#     gemini_data = fetch_career_data(career)

#     if any("Error" in v for v in gemini_data.values()):
#         return jsonify({"error": "Failed to fetch complete data from Gemini"}), 500

#     # Parse fetched data
#     skills = gemini_data["skills"].split(",")
#     pros = gemini_data["pros"]
#     cons = gemini_data["cons"]
#     related_careers = gemini_data["related_careers"].split(",")
#     salary = gemini_data["salary"]

#     # Ensure pros and cons are in valid array format (even if they are "Data unavailable")
#     pros = pros if isinstance(pros, list) else [pros]
#     cons = cons if isinstance(cons, list) else [cons]

#     # Insert data into the database
#     try:
#         query = """
#         INSERT INTO career_lens (name, skills, pros, cons, related_careers, salary)
#         VALUES (%s, %s, %s, %s, %s, %s)
#         RETURNING id
#         """
#         cursor.execute(
#             query,
#             (career, skills, pros, cons, related_careers, salary),
#         )
#         conn.commit()  # Commit the transaction only if the query is successful
#         career_id = cursor.fetchone()["id"]
#     except Exception as e:
#         conn.rollback()  # Roll back the transaction on error
#         return jsonify({"error": str(e)}), 500

#     # JSON response
#     return jsonify(
#         {
#             "message": "Career data saved successfully!",
#             "career_id": career_id,
#             "career": career,
#             "skills": skills,
#             "pros": pros,
#             "cons": cons,
#             "related_careers": related_careers,
#             "salary": salary,
#         }
#     ), 201


import os
import psycopg2
from psycopg2.extras import RealDictCursor
import google.generativeai as genai
from flask import Flask, request, Blueprint, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import re

# Load environment variables
load_dotenv()

career_lens_bp = Blueprint("career_lens", __name__)
CORS(career_lens_bp)

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY2")
genai.configure(api_key=api_key)
model1 = genai.GenerativeModel("gemini-pro")

# Database connection
DB_URL = os.getenv("DATABASE_URL")

try:
    conn = psycopg2.connect(DB_URL)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
except Exception as e:
    print("Database connection error:", e)
    exit()

# Data cleaning function
def clean_text(text):
    """Remove unwanted characters, symbols, and leading/trailing spaces from text."""
    # Remove asterisks and normalize spaces
    cleaned_text = re.sub(r"\*", "", text).strip()
    # Handle extra spaces in comma-separated lists and normalize spaces in general
    cleaned_text = ", ".join([item.strip() for item in cleaned_text.split(",")])
    # Correct extra spaces after commas (e.g., in salary ranges)
    cleaned_text = re.sub(r",\s+", ",", cleaned_text)
    return cleaned_text


# Function to fetch data from Gemini
def fetch_career_data(career,max_retries=10):
    prompts = {
        "skills": f"List the key skills required for a career as a {career}. Provide them as a comma-separated list without extra characters.\n",
        "cons": f"What are the cons of pursuing a career as a {career}? Provide clear points prefixed with 'Con:'.Keep it concise and give 5 cons only(one sentence max per con).\n",
        "pros": f"What are the pros of pursuing a career as a {career}? Provide clear points prefixed with 'Pro:'.Keep it concise and give 5 pros only(one sentence max per pro).\n",
        "related_careers": f"What careers are related to being a {career}? Provide them as a comma-separated list without extra characters.\n",
        "salary": f"What is the typical salary range for a {career} in India? Provide a single-line answer in INR\n",
        "trend": f"Provide an estimate of the annual growth rate (in %) for the career {career} over the last 5 years, along with the corresponding years (e.g., '2020: 5%, 2021: 4%'). If exact data is unavailable, provide a general trend based on assumptions for similar careers or industries. Ensure the response is a comma-separated list in the specified format without additional characters or explanations.\n"


    }

    responses = {}

    for key, prompt in prompts.items():
        retries = 0
        while retries < max_retries:
            try:
                response = model1.generate_content(prompt)
                cleaned_response = clean_text(response.text.strip())
                if "Data unavailable" not in cleaned_response:
                    responses[key] = cleaned_response
                    break  # Exit the retry loop if a valid response is received
                else:
                    retries += 1  # Increment retry count if response is invalid
            except Exception as e:
                responses[key] = f"Error fetching {key}: {str(e)}"
                break  # Break the loop on error to avoid infinite retries

        # If max retries are reached and still "Data unavailable," use a fallback value
        if retries == max_retries and key not in responses:
            responses[key] = "Data unavailable"


    # Handle pros and cons separately
    pros = responses.get("pros", "Data unavailable")
    cons = responses.get("cons", "Data unavailable")

    # Split and clean pros and cons if they contain the 'Pro:' or 'Con:' prefix
    pros = [clean_text(item.replace("Pro:", "").strip()) for item in pros.splitlines() if item.startswith("Pro:")]
    cons = [clean_text(item.replace("Con:", "").strip()) for item in cons.splitlines() if item.startswith("Con:")]

    # Fallback to 'Data unavailable' if no pros or cons found
    if not pros:
        pros = ["Data unavailable"]
    if not cons:
        cons = ["Data unavailable"]

    responses["pros"] = pros
    responses["cons"] = cons

    return responses


# Endpoint to process career lens data
@career_lens_bp.route("/career-lens", methods=["POST"])
def career_lens():
    data = request.json
    career = data.get("career_name")
    if not career:
        return jsonify({"error": "Career field is required"}), 400

    # Fetch data from Gemini
    gemini_data = fetch_career_data(career)

    if any("Error" in v for v in gemini_data.values()):
        return jsonify({"error": "Failed to fetch complete data from Gemini"}), 500

    # Parse fetched data
    skills = gemini_data["skills"].split(",")
    pros = gemini_data["pros"]
    cons = gemini_data["cons"]
    related_careers = gemini_data["related_careers"].split(",")
    salary = gemini_data["salary"]
    trend = gemini_data["trend"].split(",")


    # Ensure pros and cons are in valid array format (even if they are "Data unavailable")
    pros = pros if isinstance(pros, list) else [pros]
    cons = cons if isinstance(cons, list) else [cons]

    # Insert data into the database
    try:
        query = """
        INSERT INTO career_lens (name, skills, pros, cons, related_careers, salary, trend)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING id
        """
        cursor.execute(
            query,
            (career, skills, pros, cons, related_careers, salary, trend),
        )
        conn.commit()  # Commit the transaction only if the query is successful
        career_id = cursor.fetchone()["id"]

    except Exception as e:
        conn.rollback()  # Roll back the transaction on error
        return jsonify({"error": str(e)}), 500

    # JSON response
    return jsonify(
        {
            "message": "Career data saved successfully!",
            "career_id": career_id,
            "career": career,
            "skills": skills,
            "pros": pros,
            "cons": cons,
            "related_careers": related_careers,
            "salary": salary,
            "trend": trend,
        }
    ), 201