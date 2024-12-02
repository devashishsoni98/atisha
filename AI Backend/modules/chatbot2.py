from flask import Blueprint, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

chatbot_bp = Blueprint('chatbot', __name__)
CORS(chatbot_bp)

# Load environment variables and configure the AI model here...
api_key = os.getenv('GEMINI_API_KEY1')

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-pro")

# Role-specific instructions
role_prompts = {
    "Student": (
        "You are an assistant chatbot for ATISHA, designed to help students discover career paths, "
        "connect with counselors, and improve skills through guided programs. "
        "Provide precise responses about educational plans, career advice, or counseling sessions."
        "Keep responses brief, accurate, and specific to context"
    ),
    "Counselor": (
        "You are an assistant chatbot for ATISHA, designed to assist counselors in managing their sessions, "
        "connecting with students, and providing career or skill development advice. "
        "Provide relevant resources and scheduling tips for effective counseling."
        "Keep responses brief, accurate, and specific to context"
    ),
    "Mentor": (
        "You are an assistant chatbot for ATISHA, focused on guiding mentors to connect with students "
        "and provide personalized career or skill-based advice. Help them with mentorship tools and resources."
        "Keep responses brief, accurate, and specific to context"
    ),
    "Default": (
        "You are an assistant chatbot for ATISHA. Please guide the user in finding the right resources and connecting with counselors or mentors."
        "Your responses should be precise and focused on helping students find counselors based on their goals, skills, and interests."
        "Keep responses brief, accurate, and specific to context"
        "You assist with queries related to counseling sessions, career paths, educational plans, and skill enhancement programs. "
        "For any unrelated query, reply with: I'm here to assist with Career Guidance related queries only."
    )
}

# Predefined resources and links for common queries
resource_links = {
    "counselor": "https://www.atisha.com/counselors",
    "career guidance": "https://www.atisha.com/career-guidance",
    "skills": "https://www.atisha.com/skill-development",
    "education plans": "https://www.atisha.com/education-plans",
    "sessions": "https://www.atisha.com/counseling-sessions",
    "website": "https://www.atisha.com",
}

# Add new functionality: 500 relevant keywords for matching
keyword_array = [
    "hi", "hello", "career", "skills", "counseling", "mentors", "sessions",
    "resources", "education", "guidance", "art", "artist", "career change",
    "internships", "volunteering", "resume", "portfolio", "coding", "engineering",
    "psychology", "teaching", "science", "math", "medicine", "finance", "roadmaps",
    "scholarships", "motivation", "project management", "networking", "soft skills",
    "hard skills", "communication", "creative writing", "time management", "public speaking",
    "entrepreneurship", "data science", "cloud computing", "web development",
    # Add more keywords to reach 500...
]

@chatbot_bp.route('/welcome', methods=['POST'])
def welcome_message():
    """
    Greet the user based on their role sent from the frontend.
    """
    # Fetch the role from the frontend request
    role = request.json.get('role', 'Default')
    username = request.json.get('username', None)

    if username:
        # Logged-in user with a name
        greeting_message = {
            "message": f"Welcome back to ATISHA, {username}! How can I assist you today?",
            "role": role
        }
    else:
        # New or non-logged-in user
        greeting_message = {
            "message": f"Welcome to ATISHA! As a {role}, let me know how I can assist you.",
            "role": role
        }

    return jsonify(greeting_message)

@chatbot_bp.route('/generate', methods=['POST'])
def generate_response():
    """
    Generate chatbot responses for user queries based on role.
    """
    prompt = request.json.get('prompt', '')
    role = request.json.get('role', 'Default')

    # Role-specific context instructions
    context_instructions = role_prompts.get(role, role_prompts["Default"])

    # Check if the user's query matches predefined topics for resources
    for keyword, link in resource_links.items():
        if keyword.lower() in prompt.lower():
            return jsonify({
                "response": f"As a {role}, you can find more information on this topic here: {link}"
            })

    # Check if the user's query matches any of the 500 keywords
    matched_keywords = [keyword for keyword in keyword_array if keyword in prompt.lower()]
    if matched_keywords:
        return jsonify({
            "response": f"Your query relates to the following topic(s): {', '.join(matched_keywords)}. "
                        f"Let me guide you further with ATISHA's resources or assistance!"
        })

    # Generate a response using the AI model
    response = model.generate_content(f"{context_instructions} User: {prompt}")

    # Format the response
    if response and any(keyword.lower() in response.text.lower() for keyword in resource_links.keys()):
        formatted_response = {
            "response": response.text.strip()
        }
    else:
        formatted_response = {
            "response": "I'm here to assist with career guidance and counseling-related queries only."
        }

    return jsonify(formatted_response)
