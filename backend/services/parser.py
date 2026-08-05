import json

from services.ai import generate_chapter_structure
from services.ai import clean_json

def process_chapter(text: str):
    result = generate_chapter_structure(text)

    if result is None:
        raise ValueError("Gemini returned no chapter.")

    return json.loads(clean_json(result))