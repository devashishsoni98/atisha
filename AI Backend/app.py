from waitress import serve
from flask import Flask
from dotenv import load_dotenv
from modules.chatbot import chatbot_bp
from modules.events import events_bp
from modules.recommend_coureses import recommend_courses_bp
from modules.questions import questions_bp
from modules.quiz_and_match import quiz_bp
from modules.recommend_events import recommend_events_bp


load_dotenv()

app = Flask(__name__)

# Register blueprints for modular routes
app.register_blueprint(chatbot_bp, url_prefix='/chatbot')
app.register_blueprint(events_bp, url_prefix='/events')
app.register_blueprint(recommend_courses_bp, url_prefix='/recommend')
app.register_blueprint(questions_bp, url_prefix='/questions')
app.register_blueprint(quiz_bp, url_prefix='/quiz')
app.register_blueprint(recommend_events_bp, url_prefix='/revents')

if __name__ == '__main__':
    # # Use Waitress to serve the app with multi-threading enabled
    # serve(app,port=7000, threads=4)
    app.run(port=7000,debug=True,threaded=True)