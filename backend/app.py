from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException

from services.pdf import extract_text
from services.parser import process_chapter
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

    try:
        chapter = process_chapter(text)
        notes = process_notes(text, chapter["topics"])
        quiz = process_quiz(notes["topics"])
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    for chapter_topic, notes_topic in zip(chapter["topics"], notes["topics"]):
        chapter_topic["notes"] = notes_topic["notes"]

    quiz_lookup = {
        topic["title"]: topic["quiz"]
        for topic in quiz["topics"]
    }

    for topic in chapter["topics"]:
        topic["quiz"] = quiz_lookup.get(topic["title"], [])

    return {
        "filename": file.filename,
        "chapter": chapter,
    }