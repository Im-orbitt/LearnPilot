import json

from services.ai import generate_quiz

def process_quiz(notes: dict):
    result = generate_quiz(json.dumps(notes))

    if result is None:
        raise ValueError("Gemini returned no quiz.")

    return json.loads(result)