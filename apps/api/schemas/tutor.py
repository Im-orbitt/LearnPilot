from pydantic import BaseModel, Field


class TutorRequest(BaseModel):
    book_id: str = Field(min_length=1)
    question: str = Field(min_length=1)


class TutorResponse(BaseModel):
    answer: str