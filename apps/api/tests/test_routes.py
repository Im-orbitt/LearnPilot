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