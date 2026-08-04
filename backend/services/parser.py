import json

from services.ai import generate_summary

def process_pdf(text: str):
    result = generate_summary(text)

    return json.loads(result)