import json

from services.ai import clean_json, generate_chapter_structure


def process_chapter(
    text: str,
) -> dict:
    result = generate_chapter_structure(text)

    return json.loads(clean_json(result))