import logging

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile

from schemas.books import UploadResponse
from services.books import count_user_books, create_book
from services.notes import process_notes
from services.parser import process_chapter
from services.pdf import extract_text
from services.quiz import process_quiz
from utils.auth import get_current_user


logger = logging.getLogger(__name__)


router = APIRouter()


MAX_PDF_BYTES = 50 * 1024 * 1024  # 50 MB

PDF_MAGIC_BYTES = b"%PDF-"


@router.post(
    "/upload",
    response_model=UploadResponse,
)
async def upload_pdf(
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user),
):
    if count_user_books(user["id"]) >= 2:
        raise HTTPException(
            status_code=403,
            detail="You've reached the 2-book limit on the Free plan.",
        )

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file must have a filename.",
        )

    pdf_bytes = await file.read()

    if len(pdf_bytes) > MAX_PDF_BYTES:
        raise HTTPException(
            status_code=413,
            detail="Uploaded file is too large. Maximum size is 50 MB.",
        )

    if not pdf_bytes.startswith(PDF_MAGIC_BYTES):
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is not a valid PDF.",
        )

    try:
        text = extract_text(pdf_bytes)
    except Exception:
        logger.exception("Failed to extract text from PDF")
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is not a valid PDF.",
        )

    try:
        chapter = process_chapter(text)
        notes = process_notes(text, chapter["topics"])
        quiz = process_quiz(notes)

    except Exception:
        logger.exception("Failed to process PDF content")
        raise HTTPException(
            status_code=500,
            detail="We couldn't process this PDF. Please try again.",
        )

    for chapter_topic, notes_topic in zip(
        chapter["topics"],
        notes["topics"],
    ):
        chapter_topic["notes"] = notes_topic["notes"]

    quiz_lookup = {
        topic["title"]: topic["quiz"]
        for topic in quiz["topics"]
    }

    for topic in chapter["topics"]:
        topic["quiz"] = quiz_lookup.get(
            topic["title"],
            [],
        )

    book = create_book(
        user["id"],
        file.filename,
        chapter,
    )

    return {
        "book": book,
    }