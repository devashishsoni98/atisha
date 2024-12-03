from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai
import psycopg2
from psycopg2.extras import RealDictCursor


recommend_careers_bp = Blueprint('recommend_careers', __name__)

# Enable CORS for all domains (you can customize it later for specific domains)
CORS(recommend_careers_bp, resources={r"/*": {"origins": "http://localhost:5173", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"]}})

# Load environment variables
load_dotenv()

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Configure Gemini API
api_key = os.getenv("GEMINI_API_KEY2")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-pro")

# Database connection
DATABASE_URL = "postgresql://postgres:amanjain17@localhost:5432/atisha_db"
conn = psycopg2.connect(DATABASE_URL)

def generate_career_recommendations(holland_traits, big_five_traits, aptitude_status, iq_status):
    """Generates career recommendations using Gemini API."""
    prompt = f"""
You are an AI model specializing in career recommendations. Based on the given traits, recommend the top 3 most suitable careers. Here is the data:

Holland Code Traits:
- Top Traits: {', '.join(holland_traits)}

Big Five Personality Traits:
- Top Traits: {', '.join(big_five_traits)}

Aptitude Status:
- {aptitude_status}

IQ Status:
- {iq_status}

Provide concise career recommendations. List the top 3 careers.
    """
    try:
        response = model.generate_content(prompt)
        # Extract recommended careers
        text_response = response.text
        careers = [line.strip() for line in text_response.split("\n") if line.strip()]
        return careers[:3]  # Return top 3 careers
    except Exception as e:
        raise Exception(f"Gemini API Error: {str(e)}")

@recommend_careers_bp.route('/recommend_careers', methods=['POST'])
def recommend_careers():
    data = request.json
    user_id = data.get("user_id")

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    # Fetch user traits from the database
    query = """
        SELECT holland_code_traits, big_five_traits, aptitude_status, iq_status
        FROM user_traits_status
        WHERE user_id = %s
        ORDER BY created_at DESC
        LIMIT 1;
    """
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(query, (user_id,))
        user_traits = cursor.fetchone()

    if not user_traits:
        return jsonify({"error": "No traits found for the given user ID"}), 404

    holland_traits = user_traits["holland_code_traits"]
    big_five_traits = user_traits["big_five_traits"]
    aptitude_status = user_traits["aptitude_status"]
    iq_status = user_traits["iq_status"]

    # Generate career recommendations using Gemini
    try:
        recommended_careers = generate_career_recommendations(
            holland_traits,
            big_five_traits,
            aptitude_status,
            iq_status
        )

        # Ensure we have exactly 3 recommendations
        while len(recommended_careers) < 3:
            recommended_careers.append("Career Placeholder")

        # Store the recommended careers in the database
        with conn.cursor() as cursor:
            cursor.execute("""
                INSERT INTO recommended_careers (user_id, career1, career2, career3)
                VALUES (%s, %s, %s, %s)
            """, (
                user_id,
                recommended_careers[0],
                recommended_careers[1],
                recommended_careers[2]
            ))
        conn.commit()

    except Exception as e:
        conn.rollback()  # Rollback if any error occurs
        return jsonify({"error": "Failed to generate recommendations", "details": str(e)}), 500

    # Return recommendations as JSON
    return jsonify({
        "user_id": user_id,
        "recommended_careers": recommended_careers
    })
if __name__ == "__main__":
    app.run(debug=True)
