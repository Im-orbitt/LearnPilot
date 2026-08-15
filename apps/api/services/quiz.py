import json

from services.ai import clean_json, generate_quiz


def process_quiz(
    notes: dict,
) -> dict:
    topics = []

    for topic in notes["topics"]:
        result = generate_quiz(
            topic["notes"],
        )

        quiz = json.loads(
            clean_json(result)
        )

        topics.append(
            {
                "title": topic["title"],
                "quiz": quiz["questions"],
            }
        )

    return {
        "topics": topics,
    }