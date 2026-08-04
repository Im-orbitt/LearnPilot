import json

from services.ai import generate_notes

def process_notes(text: str):
    result = generate_notes(text)
    return json.loads(result)