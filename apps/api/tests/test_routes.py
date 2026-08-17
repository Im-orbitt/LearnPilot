from unittest.mock import patch

def test_root_endpoint(client):
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {"message": "Backend Online!"}


def test_me_requires_authentication(client):
    response = client.get("/auth/me")

    assert response.status_code == 401
    assert response.json()["detail"] == "Not authenticated."


def test_login_rejects_invalid_credentials(client):
    with patch(
        "routes.auth.authenticate_user",
        return_value=None,
    ):
        response = client.post(
            "/auth/login",
            json={
                "email": "unknown@example.com",
                "password": "wrong-password",
            },
        )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password."


def test_tutor_requires_authentication(client):
    response = client.post(
        "/tutor",
        json={
            "book_id": "1",
            "question": "What is photosynthesis?",
        },
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Not authenticated."

def test_tutor_returns_mocked_answer(client):
    from app import app
    from utils.auth import get_current_user

    mock_user = {
        "id": 1,
        "email": "student@example.com",
    }

    mock_books = [
        {
            "id": 1,
            "filename": "science.pdf",
            "chapter": {
                "title": "Photosynthesis",
                "topics": [
                    {
                        "title": "Introduction",
                        "notes": "Plants use light energy.",
                    }
                ],
            },
        }
    ]

    with (
        patch(
            "routes.tutor.get_user_books",
            return_value=mock_books,
        ),
        patch(
            "routes.tutor.ask_tutor",
            return_value=(
                "Photosynthesis is the process plants use to convert "
                "light energy into chemical energy."
            ),
        ) as mock_ask_tutor,
    ):
        app.dependency_overrides[get_current_user] = lambda: mock_user

        try:
            response = client.post(
                "/tutor",
                json={
                    "book_id": "1",
                    "question": "What is photosynthesis?",
                },
            )
        finally:
            app.dependency_overrides.clear()

    assert response.status_code == 200
    assert response.json() == {
        "answer": (
            "Photosynthesis is the process plants use to convert "
            "light energy into chemical energy."
        )
    }

    mock_ask_tutor.assert_called_once()