import json

from services.ai import generate_notes
from services.ai import clean_json

def process_notes(text: str, topics: list[dict]):
    topic_titles = [topic["title"] for topic in topics]
    result = generate_notes(text, topic_titles)
    
    if result is None:
        raise ValueError("Gemini returned no notes.")
    
    return json.loads(clean_json(result))