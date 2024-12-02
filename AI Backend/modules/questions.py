#Using skip proccess and updated options features

from flask import Flask, request,Blueprint,jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import json
import google.generativeai as genai
import psycopg2
import re
import random

# Load environment variables
load_dotenv()   

# Initialize Flask App
questions_bp = Blueprint('questions', __name__)
CORS(questions_bp)

# Configure Gemini API
api_key = os.getenv("GEMINI_API_KEY2")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-pro")

DB_URL = os.getenv('DATABASE_URL')
conn = psycopg2.connect(DB_URL)

# Context Instructions for Question Generation
context_instructions = (
    "You are an educational assistant tasked with generating questions for students in grades 8 to 12. "
    "Questions should align with four categories:\n"
    "1) Holland Code (12 questions, 2 per trait).\n"
    "2) Big Five Personality Traits (10 questions, 2 per trait).\n"
    "3) Aptitude Test (5 questions).\n"
    "4) IQ Test (3 questions).\n"
    "Questions must be age-appropriate for the student's class. "
    "For 'Holland Code' and 'Big Five Personality', include the specific traits with each question.\n"
    "Output each question as a JSON object in the format:\n"
    '{"category": "<category>", "traits": "<traits>", "question_text": "<question_text>", "answer": "<answer>"}\n'
)

def generate_questions(student_class):
    categories = [
        ("Holland Code", 12, ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"]),
        ("Big Five Personality", 10, ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"]),
        ("Aptitude Test", 5, None),
        ("IQ Test", 3, None),
    ]
    questions = []
    generated_count = 0
    remaining_questions = 30

    def generate_options_with_gemini(question_text, correct_answer):
        try:
            # Use the API to generate plausible options
            prompt = (
                f"Generate 4 plausible options for the following question:\n"
                f"Question: {question_text}\n"
                f"The correct answer is: {correct_answer}\n"
                f"Options should include the correct answer and be relevant to the question, without any numbering or formatting."
            )
            response = model.generate_content(prompt)
            generated_options = response.text.split('\n')  # Assuming options are returned line-by-line

            # Clean up options (remove numbers and extra formatting)
            cleaned_options = []
            for option in generated_options:
                option = re.sub(r'^\d+\.\s*', '', option)  # Remove leading numbers (e.g., "1. ")
                option = re.sub(r'\*\*', '', option)  # Remove bold formatting (e.g., "**Sailing**")
                option = option.strip()  # Remove extra spaces
                if option:
                    cleaned_options.append(option)

            # Include the correct answer if it's not already there
            if correct_answer not in cleaned_options:
                cleaned_options.append(correct_answer)

        # Shuffle the options and limit to 5
            random.shuffle(cleaned_options)
            return cleaned_options[:5]
        except Exception as e:
            print(f"Error generating options with Gemini: {e}")
            return []  # Return empty list if generation fails

    def request_questions(category, traits, count):
        """Helper function to generate questions from the API."""
        prompt = (
            f"{context_instructions}\n"
            f"Generate {count} questions for {category} for class {student_class}.\n"
            f"Output as valid JSON objects, like:\n"
            f'{{"category": "<category>", "traits": "<traits>", "question_text": "<question_text>", "answer": "<correct_answer>"}}\n'
            f"Specify 'traits' only if the category is 'Holland Code' or 'Big Five Personality'."
        )
        if traits:
            prompt += f" Focus on the following traits: {', '.join(traits)}."

        try:
            response = model.generate_content(prompt)
            return response.text if response else None
        except Exception as e:
            print(f"Error during API request: {e}")
            return None

    for category, total_count, traits in categories:
        trait_question_count = total_count // (len(traits) if traits else 1)
        remaining_questions_in_category = total_count

        while remaining_questions_in_category > 0 and generated_count < remaining_questions:
            try:
                # Generate questions for subcategories (if applicable)
                if traits:
                    for trait in traits:
                        if remaining_questions_in_category <= 0 or generated_count >= remaining_questions:
                            break
                        batch_size = min(trait_question_count, remaining_questions_in_category)
                        response_text = request_questions(category, [trait], batch_size)
                        if response_text:
                            for line in response_text.split('\n'):
                                line = line.strip()
                                if not line:
                                    continue
                                try:
                                    question_obj = json.loads(line)
                                    if "traits" in question_obj and question_obj["traits"] != trait:
                                        continue
                                    questions.append({
                                        "class": student_class,
                                        "category": category,
                                        "traits": question_obj.get("traits"),
                                        "question_text": question_obj["question_text"],
                                        "options": [1, 2, 3, 4, 5],
                                        "answer": question_obj.get("answer") if category in ["Aptitude Test", "IQ Test"] else None,
                                    })
                                    generated_count += 1
                                    remaining_questions_in_category -= 1
                                    if generated_count >= remaining_questions:
                                        break
                                except json.JSONDecodeError as e:
                                    print(f"Skipping invalid question: {line} - Error: {e}")
                else:
                    # Generate questions for non-trait categories (Aptitude/IQ)
                    response_text = request_questions(category, None, remaining_questions_in_category)
                    if response_text:
                        for line in response_text.split('\n'):
                            line = line.strip()
                            if not line:
                                continue
                            try:
                                question_obj = json.loads(line)
                                question_text = question_obj["question_text"]
                                correct_answer = question_obj.get("answer")

                                if not correct_answer:
                                    print(f"Skipping question due to missing answer: {question_text}")
                                    continue

                                if correct_answer.strip().lower() in ["yes", "no"]:
                                    print(f"Skipping question with Yes/No answer: {question_text}")
                                    continue  # Skip this question

                                options = generate_options_with_gemini(question_text, correct_answer)
                                if not options:
                                    print(f"Skipping question due to options generation failure: {question_text}")
                                    continue
                                
                                questions.append({
                                    "class": student_class,
                                    "category": category,
                                    "traits": None,
                                    "question_text": question_text,
                                    "options": options,  # Updated to include generated options
                                    "answer": correct_answer,  # Correct answer is explicitly included
                                })
                                generated_count += 1
                                remaining_questions_in_category -= 1
                                if generated_count >= remaining_questions:
                                    break
                            except json.JSONDecodeError as e:
                                print(f"Skipping invalid question: {line} - Error: {e}")
            except Exception as e:
                print(f"Error generating questions for {category}: {e}")

    # Trim the list to exactly match the required number of questions
    return questions[:remaining_questions]

def clean_option(option):
    option = str(option)
    # Remove unwanted symbols: asterisks (*), hyphens (-), extra spaces, etc.
    option = re.sub(r'[^\w\s:$]', '', option) # Allow colon in the string
    option = re.sub(r'\s+', ' ', option)  # Replace multiple spaces with a single space
    option = option.strip()  # Remove any leading/trailing spaces
    return option

# Store Questions in the Database
def store_questions(questions):
    inserted_count = 0
    with conn.cursor() as cursor:
        for q in questions:
            try:
                # Check if the question already exists
                cursor.execute(
                    """ SELECT id FROM quiz_questions WHERE class = %s AND category = %s AND question = %s; """,
                    (q["class"], q["category"], q["question_text"]),
                )
                existing_question = cursor.fetchone()
                if existing_question:
                    print(f"Skipping duplicate question: {q['question_text']}")
                    continue

                # Ensure options are in the correct format (list of strings)
                options = q["options"]
                if not options or not isinstance(options, list):
                    print(f"Invalid or missing options for question: {q['question_text']}")
                    continue
                cleaned_options = [clean_option(option) for option in options]

                # Format options as a PostgreSQL array literal
                formatted_options = '{' + ', '.join(cleaned_options) + '}'  # Correct format for PostgreSQL

                # Insert the question
                cursor.execute(
                    """ INSERT INTO quiz_questions (class, category, traits, question, options, answer) 
                        VALUES (%s, %s, %s, %s, %s, %s) RETURNING id; """,
                    (q["class"], q["category"], q["traits"],
                     q["question_text"], formatted_options,
                     q.get("answer")),
                )
                inserted_count += 1
                conn.commit()
            except psycopg2.errors.UniqueViolation:
                print(f"UniqueViolation: Skipping duplicate question: {q['question_text']}")
                conn.rollback()
            except Exception as e:
                print(f"Error storing question: {e}")
                conn.rollback()

    return inserted_count



@questions_bp.route('/generate_questions', methods=['POST'])
def generate_and_store_questions():
    data = request.json
    student_class = data.get("class")
    if not student_class:
        return jsonify({"error": "Student class is required"}), 400

    # Generate and store questions
    questions = generate_questions(student_class)
    total_inserted = store_questions(questions)  # Get total inserted questions

    # Filter response for specific attributes
    response_data = [
        {
            "category": q["category"],
            "traits": q["traits"],
            "class": q["class"],
            "question_text": q["question_text"],
            "options": q["options"],
            "answer": q.get("answer"),
        } for q in questions
    ]
    
    return jsonify({
        "message": "Questions generated and stored successfully",
        "total_stored": total_inserted,  # Include total stored questions in response
        "questions": response_data
    })


