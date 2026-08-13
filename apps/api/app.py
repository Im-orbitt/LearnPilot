from fastapi import FastAPI, UploadFile, File, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

from services.pdf import extract_text
from services.parser import process_chapter
from services.notes import process_notes
from services.quiz import process_quiz

from services.auth import (
    initialize_database,
    create_user,
    authenticate_user,
    create_session,
    get_user_from_session,
    delete_session,
)

from services.books import (
    initialize_books_database,
    create_book,
    get_user_books,
    count_user_books,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

initialize_database()
initialize_books_database()

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@app.get("/")
def root():
    return {"message": "Backend Online!"}


@app.post("/auth/register")
def register(data: RegisterRequest, response: Response):
    if len(data.password) < 8:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 8 characters long.",
        )

    if not data.name.strip():
        raise HTTPException(
            status_code=400,
            detail="Name is required.",
        )

    try:
        user = create_user(
            data.name.strip(),
            data.email,
            data.password,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=409,
            detail=str(error),
        )

    token = create_session(user["id"])

    response.set_cookie(
        key="learnpilot_session",
        value=token,
        httponly=True,
        samesite="lax",
        secure=False,
        max_age=60 * 60 * 24 * 30,
    )

    return {"user": user}


@app.post("/auth/login")
def login(data: LoginRequest, response: Response):
    user = authenticate_user(
        data.email,
        data.password,
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    token = create_session(user["id"])

    response.set_cookie(
        key="learnpilot_session",
        value=token,
        httponly=True,
        samesite="lax",
        secure=False,
        max_age=60 * 60 * 24 * 30,
    )

    return {"user": user}


@app.post("/auth/logout")
def logout(request: Request, response: Response):
    token = request.cookies.get("learnpilot_session")

    delete_session(token)

    response.delete_cookie("learnpilot_session")

    return {"message": "Logged out successfully."}


@app.get("/auth/me")
def get_current_user(request: Request):
    token = request.cookies.get("learnpilot_session")

    user = get_user_from_session(token)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated.",
        )

    return {"user": user}

@app.get("/books")
def get_books(request: Request):
    token = request.cookies.get("learnpilot_session")

    user = get_user_from_session(token)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated.",
        )

    books = get_user_books(user["id"])

    return {
        "books": books,
    }

@app.post("/upload")
async def upload_pdf(
    request: Request,
    file: UploadFile = File(...),
):
    token = request.cookies.get("learnpilot_session")

    user = get_user_from_session(token)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated.",
        )
    
    if count_user_books(user["id"]) >= 2:
        raise HTTPException(
            status_code=403,
            detail="You've reached the 2-book limit on the Free plan.",
        )

    pdf_bytes = await file.read()

    text = extract_text(pdf_bytes)

    try:
        chapter = process_chapter(text)
        notes = process_notes(text, chapter["topics"])
        quiz = process_quiz(notes)

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
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
        topic["quiz"] = quiz_lookup.get(topic["title"], [])

    book = create_book(
        user["id"],
        file.filename,
        chapter,
    )

    return {
        "book": book,
    }