from fastapi import Depends, HTTPException, Request

from core.config import SESSION_COOKIE_NAME
from services.auth import get_user_from_session


def get_current_user(
    request: Request,
):
    token = request.cookies.get(SESSION_COOKIE_NAME)

    user = get_user_from_session(token)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated.",
        )

    return user