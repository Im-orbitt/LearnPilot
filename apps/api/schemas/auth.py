from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class User(BaseModel):
    id: int
    name: str
    email: EmailStr


class UserResponse(BaseModel):
    user: User


class MessageResponse(BaseModel):
    message: str