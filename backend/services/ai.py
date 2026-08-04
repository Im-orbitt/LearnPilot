import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GENAI_API_KEY"))

def generate_chapter_structure(text: str):
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
  
def generate_notes(text: str):
    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=f"""
You are an expert teacher.

Create detailed study notes from the textbook content below.

Return ONLY valid Markdown.

The notes should:
- Use clear headings.
- Use bullet points where appropriate.
- Explain concepts simply.
- Include important definitions.
- Include examples if present in the textbook.
- Do not invent information not found in the text.

Text:
{text}
"""
    )

    if response.text is None:
        raise ValueError("Gemini returned no text.")

    return response.text