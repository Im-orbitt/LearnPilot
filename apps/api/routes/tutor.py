import json

from fastapi import APIRouter, Depends, HTTPException

from schemas.tutor import TutorRequest, TutorResponse
from services.books import get_user_books
from services.tutor import ask_tutor
from utils.auth import get_current_user


router = APIRouter(prefix="/tutor")


@router.post(
    "",
    response_model=TutorResponse,
)
def tutor(
    data: TutorRequest,
    user: dict = Depends(get_current_user),
):
    if not data.question.strip():
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty.",
        )

    books = get_user_books(user["id"])

    book = next(
        (
            book
            for book in books
            if str(book["id"]) == str(data.book_id)
        ),
        None,
    )

    if not book:
        raise HTTPException(
            status_code=404,
            detail="Book not found.",
        )

    context = json.dumps(
        book["chapter"],
        ensure_ascii=False,
    )

    try:
        answer = ask_tutor(
            context=context,
            question=data.question,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )

    return {
        "answer": answer,
    }