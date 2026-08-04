import json

from services.ai import generate_chapter_structure

def process_pdf(text: str):
    result = generate_chapter_structure(text)

    return json.loads(result)