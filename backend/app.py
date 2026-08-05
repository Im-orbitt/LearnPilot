from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from services.pdf import extract_text
from services.parser import process_pdf
from services.notes import process_notes
from services.quiz import process_quiz

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Backend Online!"}


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    pdf_bytes = await file.read()

    text = extract_text(pdf_bytes)

    chapter = process_pdf(text)
    notes = process_notes(text)
    quiz = process_quiz(text)

    return {
        "filename": file.filename,
        "chapter": chapter,
        "notes": notes,
        "quiz": quiz,
    }