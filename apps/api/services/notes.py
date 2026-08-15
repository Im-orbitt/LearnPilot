import json

from services.ai import clean_json, generate_notes


def process_notes(
    text: str,
    topics: list[dict],
) -> dict:
    topic_titles = [
        topic["title"]
        for topic in topics
    ]

    result = generate_notes(
        text,
        topic_titles,
    )

    return json.loads(clean_json(result))