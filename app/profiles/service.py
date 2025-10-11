from typing import Optional, Dict, Any
from app.supabase_client import get_client

class ProfilesService:
    def __init__(self):
        self.db = get_client()

    def upsert(self, user_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        res = self.db.table("profiles").upsert({"id": user_id, **data}).execute()
        return (res.data or [{}])[0]

    def get(self, user_id: str) -> Optional[Dict[str, Any]]:
        res = self.db.table("profiles").select("*").eq("id", user_id).single().execute()
        return getattr(res, "data", None)
