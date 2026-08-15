from datetime import datetime

from pydantic import BaseModel

class QuizQuestion(BaseModel):
    question: str
    options: list[str]
    answer: str


class Topic(BaseModel):
    title: str
    notes: str
    quiz: list[QuizQuestion]


class Chapter(BaseModel):
    title: str
    summary: str
    topics: list[Topic]


class Book(BaseModel):
    id: int
    filename: str
    chapter: Chapter


class StoredBook(Book):
    created_at: datetime


class BooksResponse(BaseModel):
    books: list[StoredBook]
    
class UploadResponse(BaseModel):
    book: Book