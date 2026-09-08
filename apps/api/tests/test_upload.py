from unittest.mock import patch
from io import BytesIO

from app import app


def test_upload_requires_authentication(client):
    response = client.post(
        "/upload",
        files={"file": ("test.pdf", b"%PDF-1.0", "application/pdf")},
    )

    assert response.status_code == 401


def test_upload_rejects_non_pdf_magic_bytes(client):
    fake_user = {"id": 1, "name": "Test", "email": "test@example.com"}

    with (
        patch(
            "utils.auth.get_user_from_session",
            return_value=fake_user,
        ),
        patch(
            "services.books.count_user_books",
            return_value=0,
        ),
    ):
        response = client.post(
            "/upload",
            files={"file": ("test.pdf", b"This is not a PDF", "application/pdf")},
        )

    assert response.status_code == 400
    assert "not a valid PDF" in response.json()["detail"]


def test_upload_rejects_file_without_pdf_prefix(client):
    fake_user = {"id": 1, "name": "Test", "email": "test@example.com"}

    with (
        patch(
            "utils.auth.get_user_from_session",
            return_value=fake_user,
        ),
        patch(
            "services.books.count_user_books",
            return_value=0,
        ),
    ):
        response = client.post(
            "/upload",
            files={"file": ("test.pdf", b"PDF without magic bytes", "application/pdf")},
        )

    assert response.status_code == 400


def test_upload_rejects_empty_filename(client):
    fake_user = {"id": 1, "name": "Test", "email": "test@example.com"}

    with (
        patch(
            "utils.auth.get_user_from_session",
            return_value=fake_user,
        ),
        patch(
            "services.books.count_user_books",
            return_value=0,
        ),
    ):
        response = client.post(
            "/upload",
            files={"file": ("", b"%PDF-1.0", "application/pdf")},
        )

    # FastAPI returns 422 for empty filenames (pre-validation)
    assert response.status_code in (400, 422)


def test_upload_exception_does_not_expose_internal_details(client):
    fake_user = {"id": 1, "name": "Test", "email": "test@example.com"}

    with (
        patch(
            "utils.auth.get_user_from_session",
            return_value=fake_user,
        ),
        patch(
            "services.books.count_user_books",
            return_value=0,
        ),
        patch(
            "routes.upload.extract_text",
            side_effect=RuntimeError("INTERNAL SQL ERROR DETAILS"),
        ),
    ):
        response = client.post(
            "/upload",
            files={"file": ("malicious.pdf", b"%PDF-1.0", "application/pdf")},
        )

    assert response.status_code == 400
    assert "INTERNAL" not in response.json()["detail"]
    assert "SQL" not in response.json()["detail"]


def test_upload_exception_does_not_expose_ai_details(client):
    fake_user = {"id": 1, "name": "Test", "email": "test@example.com"}

    with (
        patch(
            "utils.auth.get_user_from_session",
            return_value=fake_user,
        ),
        patch(
            "services.books.count_user_books",
            return_value=0,
        ),
        patch(
            "routes.upload.extract_text",
            return_value="some text",
        ),
        patch(
            "routes.upload.process_chapter",
            side_effect=RuntimeError("Gemini API key invalid: SECRET_KEY_123"),
        ),
    ):
        response = client.post(
            "/upload",
            files={"file": ("test.pdf", b"%PDF-1.0", "application/pdf")},
        )

    assert response.status_code == 500
    detail = response.json()["detail"]
    assert "Gemini" not in detail
    assert "API key" not in detail
    assert "SECRET" not in detail
