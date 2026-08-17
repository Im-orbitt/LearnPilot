from unittest.mock import patch

from services.tutor import ask_tutor


def test_tutor_rejects_empty_question():
    try:
        ask_tutor(
            context="Some learning material.",
            question="   ",
        )
        assert False
    except ValueError as error:
        assert str(error) == "Question cannot be empty."


def test_tutor_uses_ai_service():
    with patch(
        "services.tutor.generate_tutor_response",
        return_value="The answer is 42.",
    ) as mock_generate:
        result = ask_tutor(
            context="The answer to life is 42.",
            question="What is the answer?",
        )

    assert result == "The answer is 42."

    mock_generate.assert_called_once_with(
        context="The answer to life is 42.",
        question="What is the answer?",
    )