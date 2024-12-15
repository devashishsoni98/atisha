# from waitress import serve
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from modules.chatbot import chatbot_bp
from modules.events import events_bp
from modules.recommend_coureses import recommend_courses_bp
from modules.questions import questions_bp
from modules.quiz_and_match import quiz_bp
from modules.recommend_events import recommend_events_bp
from modules.recommend_careers import recommend_careers_bp
from modules.career_lens import career_lens_bp
from modules.career_lens import career_lens_bp
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # '2' to suppress warnings; '3' for errors only

load_dotenv()

app = Flask(__name__)

# CORS(app)
from flask_cors import CORS

CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "http://localhost:5174","http://localhost:5175", "http://localhost:5176"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Register blueprints for modular routes
app.register_blueprint(chatbot_bp, url_prefix='/chatbot')
app.register_blueprint(events_bp, url_prefix='/events')
app.register_blueprint(recommend_courses_bp, url_prefix='/rcourses')
app.register_blueprint(questions_bp, url_prefix='/questions')
app.register_blueprint(quiz_bp, url_prefix='/quiz')
app.register_blueprint(recommend_events_bp, url_prefix='/revents')
app.register_blueprint(recommend_careers_bp, url_prefix='/rcareers')
# app.register_blueprint(career_lens_bp, url_prefix='/career-lens')
app.register_blueprint(career_lens_bp, url_prefix='/lens')


if __name__ == '__main__':
    # # Use Waitress to serve the app with multi-threading enabled
    # serve(app,port=7000, threads=4)
    app.run(port=7000,debug=True,threaded=True)