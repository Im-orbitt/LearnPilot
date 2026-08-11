import json
import sqlite3

from pathlib import Path


DATABASE_PATH = Path(__file__).resolve().parent.parent / "learnpilot.db"


def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row

    return connection


def initialize_books_database():
    with get_connection() as connection:
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


def create_book(user_id, filename, chapter):
    with get_connection() as connection:
        cursor = connection.execute(
            """
            INSERT INTO books (user_id, filename, chapter_json)
            VALUES (?, ?, ?)
            """,
            (
                user_id,
                filename,
                json.dumps(chapter),
            ),
        )

        connection.commit()

        return {
            "id": cursor.lastrowid,
            "filename": filename,
            "chapter": chapter,
        }


def get_user_books(user_id):
    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT id, filename, chapter_json, created_at
            FROM books
            WHERE user_id = ?
            ORDER BY created_at DESC
            """,
            (user_id,),
        ).fetchall()

    return [
        {
            "id": row["id"],
            "filename": row["filename"],
            "chapter": json.loads(row["chapter_json"]),
            "created_at": row["created_at"],
        }
        for row in rows
    ]

def delete_book(book_id, user_id):
    with get_connection() as connection:
        connection.execute(
            """
            DELETE FROM books
            WHERE id = ? AND user_id = ?
            """,
            (book_id, user_id),
        )

        connection.commit()
        
def count_user_books(user_id):
    with get_connection() as connection:
        row = connection.execute(
            """
            SELECT COUNT(*) AS count
            FROM books
            WHERE user_id = ?
            """,
            (user_id,),
        ).fetchone()

    return row["count"]