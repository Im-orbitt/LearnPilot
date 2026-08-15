from fastapi import APIRouter, Depends

from schemas.books import BooksResponse
from services.books import get_user_books
from utils.auth import get_current_user


router = APIRouter(prefix="/books")


@router.get(
    "",
    response_model=BooksResponse,
)
def get_books(
    user: dict = Depends(get_current_user),
):
    books = get_user_books(user["id"])

    return {
        "books": books,
    }