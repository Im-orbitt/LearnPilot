import hashlib
import secrets
import sqlite3

from pathlib import Path

import json

DATABASE_PATH = Path(__file__).resolve().parent.parent / "learnpilot.db"


def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row

    return connection


def initialize_database():
    with get_connection() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS sessions (
                token TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
            """
        )

        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                filename TEXT NOT NULL,
                chapter_json TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
            """
        )

        connection.commit()


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
    password_hash = hash_password(password)

    try:
        with get_connection() as connection:
            cursor = connection.execute(
                """
                INSERT INTO users (name, email, password_hash)
                VALUES (?, ?, ?)
                """,
                (name, email.lower(), password_hash),
            )

            connection.commit()

            return {
                "id": cursor.lastrowid,
                "name": name,
                "email": email.lower(),
            }

    except sqlite3.IntegrityError:
        raise ValueError("An account with this email already exists.")


def authenticate_user(email, password):
    with get_connection() as connection:
        user = connection.execute(
            """
            SELECT id, name, email, password_hash
            FROM users
            WHERE email = ?
            """,
            (email.lower(),),
        ).fetchone()

    if not user or not verify_password(password, user["password_hash"]):
        return None

    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
    }


def create_session(user_id):
    token = secrets.token_urlsafe(32)

    with get_connection() as connection:
        connection.execute(
            """
            INSERT INTO sessions (token, user_id)
            VALUES (?, ?)
            """,
            (token, user_id),
        )

        connection.commit()

    return token


def get_user_from_session(token):
    if not token:
        return None

    with get_connection() as connection:
        user = connection.execute(
            """
            SELECT users.id, users.name, users.email
            FROM users
            JOIN sessions ON sessions.user_id = users.id
            WHERE sessions.token = ?
            """,
            (token,),
        ).fetchone()

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

    with get_connection() as connection:
        connection.execute(
            "DELETE FROM sessions WHERE token = ?",
            (token,),
        )

        connection.commit()