import json

from services.ai import generate_chapter_structure

def process_pdf(text: str):
    result = generate_chapter_structure(text)

    if result is None:
        raise ValueError("Gemini returned no chapter.")

    return json.loads(result)