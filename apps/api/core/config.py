import os

from dotenv import load_dotenv


load_dotenv()


IS_PRODUCTION = os.getenv("ENVIRONMENT") == "production"

GENAI_API_KEY = os.getenv("GENAI_API_KEY")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173",
)

PRODUCTION_FRONTEND_URL = os.getenv(
    "PRODUCTION_FRONTEND_URL",
    "https://learnpilot-seven.vercel.app",
)

SESSION_COOKIE_NAME = "learnpilot_session"
SESSION_MAX_AGE = 60 * 60 * 24 * 30