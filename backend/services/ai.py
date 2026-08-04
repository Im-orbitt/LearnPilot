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
    You are an expert school teacher.
    Read the textbook chapter below.
    For EACH topic, generate detailed study notes.
    Return ONLY valid JSON.
    Format:
    {{
      "topics": [
        {{
          "title": "Topic name",
          "notes": "Markdown notes for this topic."
        }}
      ]
    }}
    Rules:
    - Keep the same topic order as the textbook.
    - Explain concepts simply.
    - Use markdown headings and bullet points.
    - Include definitions and examples from the textbook.
    - Do NOT invent information.
    - Return ONLY JSON.
    - Do NOT wrap the response in markdown.
    - Do NOT use json or .
    Chapter:
    {text}
    """
  )
  
  if response.text is None:
      raise ValueError("Gemini returned no text.")
  return response.text