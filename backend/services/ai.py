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
You are an expert school teacher creating detailed study notes for students.

The textbook has already been divided into these topics:

{topics}

Generate useful, detailed study notes for EVERY topic above.

These are STUDY NOTES, not a short summary. A student should be able to
actually study for a school exam using these notes.

Return ONLY valid JSON.

Format:
{{
  "topics": [
    {{
      "title": "Topic name",
      "notes": "Detailed Markdown notes."
    }}
  ]
}}

Rules:
- Use EXACTLY the same topic titles.
- Keep the same order.
- Do not add or remove topics.
- Explain concepts clearly and at a school-student level.
- Cover the important information from the textbook.
- Include definitions of important terms.
- Explain processes, relationships, causes, effects, and differences where relevant.
- Include important examples from the textbook and useful examples when appropriate.
- Use headings and subheadings where helpful.
- Use bullet points and numbered lists where helpful.
- Highlight important terms using Markdown.
- Include key facts a student should remember.
- Do NOT simply copy the textbook.
- Do NOT make the notes unnecessarily repetitive.
- Do NOT turn every sentence into a bullet point.
- Each topic should contain substantial study material, not just a short paragraph.
- Aim for roughly 300–600 words per topic when the source material supports it.
- Do not invent information that is not supported by the textbook.
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

Generate exactly 10 multiple choice questions based ONLY on the notes for
THIS SINGLE TOPIC.

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
- Use EXACTLY the same topic titles.
- Keep the same order.
- Do not add or remove topics.
- Base the notes primarily on the provided textbook content.
- Cover ALL important information from the source that belongs to the topic.
- Do not omit smaller but potentially exam-relevant facts, examples, names, numbers, processes, or applications.
- Explain concepts clearly at a school-student level.
- Define important terms.
- Explain how and why things work when the source provides that information.
- Include relevant examples from the textbook.
- Include important scientists, discoveries, dates, numbers, or special facts when present in the source.
- Include comparisons, differences, causes, effects, advantages, disadvantages, or sequences when relevant.
- Use Markdown headings and subheadings to organize larger topics.
- Use bullet points and numbered lists where they improve readability.
- Highlight important terms using Markdown bold.
- Do NOT simply copy the textbook word-for-word.
- Do NOT turn the notes into a short summary.
- Do NOT add unsupported information just to make the notes longer.
- Do NOT repeat the same information in different wording.
- Topic length should depend on how much useful information the textbook provides.
- A short topic may have shorter notes; a detailed topic should have substantially longer notes.
- The goal is that a student could use these notes as their primary revision material for this topic.
- Return ONLY JSON.

Notes:
{notes_json}
"""
    )

    if response.text is None:
        raise ValueError("Gemini returned no quiz.")

    return response.text