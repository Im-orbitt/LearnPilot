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
        raise ValueError("Gemini returned no chapter.")

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
      "notes": "Markdown notes."
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

Chapter:
{text}
"""
    )

    if response.text is None:
        raise ValueError("Gemini returned no notes.")

    return response.text

# def generate_quiz(notes: str):
#     response = client.models.generate_content(
#         model="gemini-3.5-flash-lite",
#         contents=f"""
# You are an expert school teacher.
# 
# Generate exactly 5 multiple choice questions based ONLY on these notes.
# 
# Return ONLY valid JSON.
# 
# Format:
# {{
#   "questions": [
#     {{
#       "question": "...",
#       "options": [
#         "...",
#         "...",
#         "...",
#         "..."
#       ],
#       "answer": "..."
#     }}
#   ]
# }}
# 
# Rules:
# - Exactly 5 questions.
# - Exactly 4 options each.
# - Only one correct answer.
# - Don't invent information.
# - Return ONLY JSON.
# 
# Notes:
# {notes}
# """
#     )
# 
#     if response.text is None:
#         raise ValueError("Gemini returned no quiz.")
# 
#     return response.text