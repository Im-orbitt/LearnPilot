from google import genai

from core.config import GENAI_API_KEY


if not GENAI_API_KEY:
    raise RuntimeError(
        "GENAI_API_KEY environment variable is not configured."
    )


client = genai.Client(api_key=GENAI_API_KEY)


def clean_json(text: str) -> str:
    text = text.strip()

    if text.startswith("```json"):
        text = text.removeprefix("```json").strip()

    elif text.startswith("```"):
        text = text.removeprefix("```").strip()

    if text.endswith("```"):
        text = text.removesuffix("```").strip()

    return text


def generate_chapter_structure(
    text: str,
) -> str:
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
""",
    )

    if response.text is None:
        raise ValueError("Gemini returned no chapter.")

    return response.text


def generate_notes(
    text: str,
    topics: list[str],
) -> str:
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
- Explain concepts clearly at a school-student level.
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

IMPORTANT MARKDOWN STRUCTURE RULES:

- The topic title is already displayed separately by the application.
- NEVER repeat the topic title inside the "notes" Markdown.
- Do NOT begin the notes with an H1 (#) containing the topic title.
- Do NOT create a heading called "Notes".
- Begin directly with the first useful section or explanation.
- Use H2 (##) and H3 (###) headings for meaningful subsections.
- Headings should describe the actual content of that section.

Return ONLY JSON.

Chapter:
{text}
""",
    )

    if response.text is None:
        raise ValueError("Gemini returned no notes.")

    return response.text


def generate_quiz(
    notes_json: str,
) -> str:
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

- Generate exactly 10 questions.
- Every question must have exactly 4 options.
- The answer must exactly match one of the options.
- Base every question ONLY on the provided notes.
- Cover important information across the topic.
- Include a mixture of factual, conceptual, and application questions where appropriate.
- Do not introduce unsupported information.
- Do not repeat essentially identical questions.
- Keep questions clear and appropriate for a school student.
- Return ONLY JSON.

Notes:
{notes_json}
""",
    )

    if response.text is None:
        raise ValueError("Gemini returned no quiz.")

    return response.text