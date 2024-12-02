import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

# Configuration settings for the application
DATABASE_URL = os.getenv("DATABASE_URL")
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
GEMINI_API_KEY= os.getenv("GEMINI_API_KEY1")