import json

from services.ai import generate_notes

def process_notes(text: str, topics: list[str]):
    result = generate_notes(text, topics)

    if result is None:
        raise ValueError("Gemini returned no notes.")

    return json.loads(result)