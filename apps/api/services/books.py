import json
from typing import Any, cast

from services.supabase import supabase


def create_book(user_id: int, filename: str, chapter: dict[str, Any]):
    response = (
        supabase.table("books")
        .insert(
            {
                "user_id": user_id,
                "filename": filename,
                "chapter_json": json.dumps(chapter),
            }
        )
        .execute()
    )

    if not response.data:
        raise RuntimeError("Failed to create book.")

    book = cast(dict[str, Any], response.data[0])

    return {
        "id": book["id"],
        "filename": book["filename"],
        "chapter": chapter,
    }


def get_user_books(user_id: int):
    response = (
        supabase.table("books")
        .select("id, filename, chapter_json, created_at")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .execute()
    )

    books = cast(list[dict[str, Any]], response.data or [])

    return [
        {
            "id": book["id"],
            "filename": book["filename"],
            "chapter": json.loads(str(book["chapter_json"])),
            "created_at": book["created_at"],
        }
        for book in books
    ]


def delete_book(book_id: int, user_id: int):
    (
        supabase.table("books")
        .delete()
        .eq("id", book_id)
        .eq("user_id", user_id)
        .execute()
    )


def count_user_books(user_id: int) -> int:
    response = (
        supabase.table("books")
        .select("id")
        .eq("user_id", user_id)
        .execute()
    )

    return len(response.data or [])