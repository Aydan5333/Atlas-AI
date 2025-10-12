from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import os

from app.atlas import hello
from app.notes import NotesService
from app.profiles import ProfilesService

app = FastAPI(title="Atlas API")

# ---- CORS (allow Vercel + local dev)
vercel_origin = os.getenv("ALLOWED_ORIGIN")
default_origins = ["*"] if not vercel_origin else [vercel_origin]
app.add_middleware(
    CORSMiddleware,
    allow_origins=default_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Health
@app.get("/health")
def health():
    return {"ok": True}

# ---- Hello (sanity route)
@app.get("/hello")
def greet(name: str = "D"):
    return {"message": hello(name)}

# ---- Notes
@app.post("/notes/add")
def add_note(user_id: str, text: str = Body(..., embed=True)):
    return NotesService().add(user_id, text)

@app.get("/notes/list")
def list_notes(user_id: str):
    return {"items": NotesService().list(user_id)}

# ---- Profiles
@app.post("/profiles/upsert")
def upsert_profile(user_id: str, display_name: str = Body(None), avatar_url: str = Body(None)):
    data = {"display_name": display_name, "avatar_url": avatar_url}
    return ProfilesService().upsert(user_id, data)

@app.get("/profiles/get")
def get_profile(user_id: str):
    return ProfilesService().get(user_id)
