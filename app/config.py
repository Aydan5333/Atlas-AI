import os
def _need(name: str) -> str:
    v = os.getenv(name)
    if not v:
        raise RuntimeError(f"Missing env var: {name}")
    return v
SUPABASE_URL = _need("SUPABASE_URL")
SUPABASE_ANON_KEY = _need("SUPABASE_ANON_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
