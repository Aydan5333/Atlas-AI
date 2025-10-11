from typing import Dict, Any, List
from app.supabase_client import get_client

class NotesService:
    def __init__(self):
        self.db = get_client()

    def add(self, user_id: str, text: str) -> Dict[str, Any]:
        res = self.db.table("notes").insert({"user_id": user_id, "text": text}).execute()
        return (res.data or [{}])[0]

    def list(self, user_id: str) -> List[Dict[str, Any]]:
        res = self.db.table("notes").select("*").eq("user_id", user_id).order("created_at").execute()
        return res.data or []
