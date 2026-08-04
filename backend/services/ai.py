import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GENAI_API_KEY"))

def generate_summary(text: str):
    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=f"""
You are an educational AI tutor.

Read the textbook content below.

Return ONLY valid JSON.

Format:
{{
  "title": "...",
  "summary": "...",
  "topics": [
    "Topic 1",
    "Topic 2",
    "Topic 3"
  ]
}}

Text:
{text}
"""
    )

    if response.text is None:
        raise ValueError("Gemini returned no text.")

    return response.text