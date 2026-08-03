import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GENAI_API_KEY"))

def generate_summary(text):
    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=f"""
        You are an expert teacher.
        Summarize the following chapter into concise study notes.
        
        {text}
        """
    )
    
    return response.text