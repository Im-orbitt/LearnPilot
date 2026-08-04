import json

from services.ai import generate_notes

def process_pdf(text: str):
    result = generate_notes(text)

    if result is None:
        raise ValueError("Gemini returned no notes.")

    return json.loads(result)