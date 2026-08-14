import hashlib
import secrets

from services.supabase import supabase
from postgrest.exceptions import APIError

def initialize_database():
    pass


def hash_password(password):
    salt = secrets.token_bytes(16)

    password_hash = hashlib.scrypt(
        password.encode("utf-8"),
        salt=salt,
        n=16384,
        r=8,
        p=1,
    )

    return f"{salt.hex()}:{password_hash.hex()}"


def verify_password(password, stored_hash):
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


def create_user(name, email, password):
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

    user = response.data[0]

    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
    }


def authenticate_user(email, password):
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

    user = response.data[0]

    if not verify_password(password, user["password_hash"]):
        return None

    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
    }


def create_session(user_id):
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


def get_user_from_session(token):
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

    user = response.data[0].get("users")

    if not user:
        return None

    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
    }


def delete_session(token):
    if not token:
        return

    supabase.table("sessions").delete().eq("token", token).execute()