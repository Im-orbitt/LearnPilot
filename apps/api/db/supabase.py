from supabase import create_client

from core.config import SUPABASE_KEY, SUPABASE_URL


if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError(
        "Supabase environment variables are not configured."
    )


supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY,
)