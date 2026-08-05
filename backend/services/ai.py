import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GENAI_API_KEY"))

def clean_json(text: str):
    text = text.strip()

    if text.startswith("```json"):
        text = text.removeprefix("```json").strip()

    elif text.startswith("```"):
        text = text.removeprefix("```").strip()

    if text.endswith("```"):
        text = text.removesuffix("```").strip()

    return text

def generate_chapter_structure(text: str):
    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=f"""
You are an educational AI tutor.

Read the textbook content below.

Return ONLY valid JSON.

Return each topic as an object with a "title" field.

Do not return topics as strings.

Format:

{{
  "title":"...",
  "summary":"...",
  "topics":[
    {{
      "title":"Topic 1"
    }},
    {{
      "title":"Topic 2"
    }}
  ]
}}

Text:

{text}
"""
    )

    if response.text is None:
        raise ValueError("Gemini returned no chapter.")

    return response.text

def generate_notes(text: str, topics: list[str]):
    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=f"""
You are an expert school teacher.

The textbook has already been divided into these topics:

{topics}

Generate notes for EVERY topic above.

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
- Use EXACTLY the same topic titles.
- Keep the same order.
- Do not add or remove topics.
- Explain simply.
- Use markdown.
- Return ONLY JSON.

Chapter:
{text}
"""
    )

    if response.text is None:
        raise ValueError("Gemini returned no notes.")

    return response.text

def generate_quiz(notes_json: str):
    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=f"""
You are an expert school teacher.

Generate exactly 5 multiple choice questions based ONLY on the notes for THIS SINGLE TOPIC.

Return ONLY valid JSON.

Format:
{{
  "questions": [
    {{
      "question": "...",
      "options": [
        "...",
        "...",
        "...",
        "..."
      ],
      "answer": "..."
    }}
  ]
}}

Rules:
- Exactly 5 questions.
- Exactly 4 options each.
- Only one correct answer.
- Don't invent information.
- Return ONLY JSON.

Notes JSON:
{notes_json}
"""
    )

    if response.text is None:
        raise ValueError("Gemini returned no quiz.")

    return response.text