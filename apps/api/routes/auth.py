from fastapi import APIRouter, Depends, HTTPException, Request, Response

from core.config import (
    IS_PRODUCTION,
    SESSION_COOKIE_NAME,
    SESSION_MAX_AGE,
)
from schemas.auth import (
    LoginRequest,
    MessageResponse,
    RegisterRequest,
    UserResponse,
)
from services.auth import (
    authenticate_user,
    create_session,
    create_user,
    delete_session,
)
from utils.auth import get_current_user


router = APIRouter(prefix="/auth")


def set_session_cookie(
    response: Response,
    token: str,
):
    response.set_cookie(
        key=SESSION_COOKIE_NAME,
        value=token,
        httponly=True,
        samesite="lax",
        secure=IS_PRODUCTION,
        max_age=SESSION_MAX_AGE,
    )


@router.post(
    "/register",
    response_model=UserResponse,
)
def register(
    data: RegisterRequest,
    response: Response,
):
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

    set_session_cookie(response, token)

    return {
        "user": user,
    }


@router.post(
    "/login",
    response_model=UserResponse,
)
def login(
    data: LoginRequest,
    response: Response,
):
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

    set_session_cookie(response, token)

    return {
        "user": user,
    }


@router.post(
    "/logout",
    response_model=MessageResponse,
)
def logout(
    request: Request,
    response: Response,
):
    token = request.cookies.get(SESSION_COOKIE_NAME)

    delete_session(token)

    response.delete_cookie(SESSION_COOKIE_NAME)

    return {
        "message": "Logged out successfully.",
    }


@router.get(
    "/me",
    response_model=UserResponse,
)
def get_current_user_route(
    user: dict = Depends(get_current_user),
):
    return {
        "user": user,
    }