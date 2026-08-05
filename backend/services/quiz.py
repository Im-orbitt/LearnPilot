import json

from services.ai import generate_quiz


def process_quiz(notes: dict):
    topics = []

    for topic in notes["topics"]:
        result = generate_quiz(topic["notes"])

        if result is None:
            raise ValueError(f"Gemini returned no quiz for {topic['title']}")

        quiz = json.loads(result)

        topics.append({
            "title": topic["title"],
            "quiz": quiz["questions"]
        })

    return {
        "topics": topics
    }