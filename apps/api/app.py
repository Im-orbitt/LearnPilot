from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import (
    FRONTEND_URL,
    PRODUCTION_FRONTEND_URL,
)
from routes.auth import router as auth_router
from routes.books import router as books_router
from routes.upload import router as upload_router
from routes.tutor import router as tutor_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        PRODUCTION_FRONTEND_URL,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend Online!"}

app.include_router(auth_router)
app.include_router(books_router)
app.include_router(upload_router)
app.include_router(tutor_router)