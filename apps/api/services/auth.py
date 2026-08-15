import hashlib
import secrets
from typing import Any, cast

from postgrest.exceptions import APIError

from services.supabase import supabase


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)

    password_hash = hashlib.scrypt(
        password.encode("utf-8"),
        salt=salt,
        n=16384,
        r=8,
        p=1,
    )

    return f"{salt.hex()}:{password_hash.hex()}"


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        salt_hex, password_hash_hex = stored_hash.split(":", 1)

        salt = bytes.fromhex(salt_hex)
        expected_hash = bytes.fromhex(password_hash_hex)

        actual_hash = hashlib.scrypt(
            password.encode("utf-8"),
            salt=salt,
            n=16384,
            r=8,
            p=1,
        )

        return secrets.compare_digest(actual_hash, expected_hash)

    except (ValueError, TypeError):
        return False


def create_user(
    name: str,
    email: str,
    password: str,
) -> dict[str, Any]:
    email = email.lower()
    password_hash = hash_password(password)

    try:
        response = (
            supabase.table("users")
            .insert(
                {
                    "name": name,
                    "email": email,
                    "password_hash": password_hash,
                }
            )
            .execute()
        )

    except APIError as error:
        if error.code == "23505":
            raise ValueError(
                "An account with this email already exists."
            )

        raise

    if not response.data:
        raise ValueError("Failed to create account.")

    user = cast(dict[str, Any], response.data[0])

    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
    }


def authenticate_user(
    email: str,
    password: str,
) -> dict[str, Any] | None:
    email = email.lower()

    response = (
        supabase.table("users")
        .select("id, name, email, password_hash")
        .eq("email", email)
        .limit(1)
        .execute()
    )

    if not response.data:
        return None

    user = cast(dict[str, Any], response.data[0])

    if not verify_password(password, str(user["password_hash"])):
        return None

    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
    }


def create_session(user_id: int) -> str:
    token = secrets.token_urlsafe(32)

    response = (
        supabase.table("sessions")
        .insert(
            {
                "token": token,
                "user_id": user_id,
            }
        )
        .execute()
    )

    if not response.data:
        raise RuntimeError("Failed to create session.")

    return token


def get_user_from_session(
    token: str | None,
) -> dict[str, Any] | None:
    if not token:
        return None

    response = (
        supabase.table("sessions")
        .select("user_id, users(id, name, email)")
        .eq("token", token)
        .limit(1)
        .execute()
    )

    if not response.data:
        return None

    session = cast(dict[str, Any], response.data[0])
    user = session.get("users")

    if not isinstance(user, dict):
        return None

    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
    }


def delete_session(token: str | None) -> None:
    if not token:
        return

    (
        supabase.table("sessions")
        .delete()
        .eq("token", token)
        .execute()
    )