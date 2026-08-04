from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from services.pdf import extract_text
from services.parser import process_pdf

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
    return {"message": "Hello from LearnPilot!"}


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    pdf_bytes = await file.read()

    text = extract_text(pdf_bytes)

    result = process_pdf(text)

    return {
        "filename": file.filename,
        **result,
    }