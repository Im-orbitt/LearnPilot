from services.ai import generate_tutor_response


def ask_tutor(
    context: str,
    question: str,
) -> str:
    if not question.strip():
        raise ValueError("Question cannot be empty.")

    return generate_tutor_response(
        context=context,
        question=question.strip(),
    )