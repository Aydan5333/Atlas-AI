"""Authenticated single-owner local core. No provider or third-party actions."""
import json
import os
import secrets
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal
from uuid import uuid4

from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel, Field


def authorize(authorization: str = Header(default="")):
    token = os.getenv("ATLAS_ACCESS_TOKEN", "")
    if len(token) < 32:
        raise HTTPException(503, "Atlas access token is not configured")
    if not secrets.compare_digest(authorization, f"Bearer {token}"):
        raise HTTPException(401, "Authentication required")


router = APIRouter(dependencies=[Depends(authorize)])


def connect():
    path = Path(os.getenv("ATLAS_DB_PATH", "data/atlas.sqlite3"))
    path.parent.mkdir(parents=True, exist_ok=True)
    db = sqlite3.connect(path, timeout=10)
    db.row_factory = sqlite3.Row
    db.execute("CREATE TABLE IF NOT EXISTS records (id TEXT PRIMARY KEY, kind TEXT NOT NULL, payload TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)")
    db.execute("CREATE INDEX IF NOT EXISTS records_kind ON records(kind)")
    db.execute("CREATE TABLE IF NOT EXISTS profile (id TEXT PRIMARY KEY, payload TEXT NOT NULL)")
    return db


def now():
    return datetime.now(timezone.utc).isoformat()


Kind = Literal["task", "project", "contact", "innovation", "note"]
Lane = Literal["Atlas", "TSC", "School", "Garage", "Content", "Family", "Finance", "Memory"]
Status = Literal["planned", "active", "blocked", "done"]


class Record(BaseModel):
    kind: Kind
    title: str = Field(min_length=1, max_length=200)
    body: str = Field(default="", max_length=20000)
    lane: Lane = "Atlas"
    status: Status = "planned"
    skills: list[str] = Field(default_factory=list, max_length=30)
    resources: list[str] = Field(default_factory=list, max_length=30)
    project_id: str | None = None


def unpack(row):
    return {**json.loads(row["payload"]), "id": row["id"], "created_at": row["created_at"], "updated_at": row["updated_at"]}


def validate_link(db, record):
    if record.project_id:
        row = db.execute("SELECT kind FROM records WHERE id=?", (record.project_id,)).fetchone()
        if not row or row["kind"] != "project":
            raise HTTPException(422, "Linked project does not exist")


@router.get("/workspace/items")
def list_items(kind: Kind | None = None, q: str = ""):
    db = connect()
    try:
        rows = db.execute("SELECT * FROM records WHERE (? IS NULL OR kind=?) ORDER BY created_at DESC", (kind, kind)).fetchall()
        items = [unpack(row) for row in rows]
        if q:
            items = [item for item in items if q.casefold() in (item["title"] + " " + item["body"]).casefold()]
        return {"items": items}
    finally:
        db.close()


@router.post("/workspace/items", status_code=201)
def create_item(record: Record):
    if not record.title.strip():
        raise HTTPException(422, "Title cannot be blank")
    db = connect()
    ident, stamp = str(uuid4()), now()
    try:
        validate_link(db, record)
        with db:
            db.execute("INSERT INTO records VALUES (?,?,?,?,?)", (ident, record.kind, record.model_dump_json(), stamp, stamp))
        return {"item": {**record.model_dump(), "id": ident, "created_at": stamp, "updated_at": stamp}}
    finally:
        db.close()


@router.put("/workspace/items/{item_id}")
def update_item(item_id: str, record: Record):
    if not record.title.strip():
        raise HTTPException(422, "Title cannot be blank")
    db = connect()
    try:
        row = db.execute("SELECT * FROM records WHERE id=?", (item_id,)).fetchone()
        if not row:
            raise HTTPException(404, "Item not found")
        if row["kind"] != record.kind:
            raise HTTPException(422, "Item kind cannot be changed")
        validate_link(db, record)
        stamp = now()
        with db:
            db.execute("UPDATE records SET payload=?,updated_at=? WHERE id=?", (record.model_dump_json(), stamp, item_id))
        return {"item": {**record.model_dump(), "id": item_id, "created_at": row["created_at"], "updated_at": stamp}}
    finally:
        db.close()


@router.delete("/workspace/items/{item_id}")
def delete_item(item_id: str):
    db = connect()
    try:
        with db:
            rows = db.execute("SELECT * FROM records").fetchall()
            if any(json.loads(row["payload"]).get("project_id") == item_id for row in rows):
                raise HTTPException(409, "Remove linked items before deleting this project")
            if not db.execute("DELETE FROM records WHERE id=?", (item_id,)).rowcount:
                raise HTTPException(404, "Item not found")
        return {"ok": True}
    finally:
        db.close()


class Note(BaseModel):
    text: str = Field(min_length=1, max_length=20000)


def owner(user_id: str):
    if user_id != "local":
        raise HTTPException(403, "This build is single-owner; use local")


@router.get("/notes/list")
@router.get("/notes/search")
def notes(user_id: str = "local", q: str = ""):
    owner(user_id)
    return {"items": [{**item, "text": item["body"]} for item in list_items("note", q)["items"]]}


@router.post("/notes/add", status_code=201)
def add_note(note: Note, user_id: str = "local"):
    owner(user_id)
    result = create_item(Record(kind="note", title=note.text[:100], body=note.text, lane="Memory"))
    result["item"]["text"] = note.text
    return result


class DeleteNote(BaseModel):
    note_id: str


@router.post("/notes/delete")
def remove_note(note: DeleteNote):
    db = connect()
    try:
        row = db.execute("SELECT kind FROM records WHERE id=?", (note.note_id,)).fetchone()
        if not row or row["kind"] != "note":
            raise HTTPException(404, "Note not found")
    finally:
        db.close()
    return delete_item(note.note_id)


class Profile(BaseModel):
    user_id: Literal["local"] = "local"
    display_name: str = Field(default="", max_length=100)
    avatar_url: str = Field(default="", max_length=2000)


@router.get("/profiles/get")
def get_profile(user_id: str = "local"):
    owner(user_id)
    db = connect()
    try:
        row = db.execute("SELECT payload FROM profile WHERE id='local'").fetchone()
        return json.loads(row["payload"]) if row else Profile().model_dump()
    finally:
        db.close()


@router.post("/profiles/upsert")
def save_profile(profile: Profile):
    db = connect()
    try:
        with db:
            db.execute("INSERT INTO profile VALUES ('local',?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload", (profile.model_dump_json(),))
        return profile.model_dump()
    finally:
        db.close()


@router.get("/briefing")
def briefing():
    items = list_items()["items"]
    return {"counts": {kind: sum(item["kind"] == kind for item in items) for kind in ("task", "project", "contact", "note", "innovation")}, "next_tasks": [item for item in items if item["kind"] == "task" and item["status"] != "done"][:5], "blockers": [item for item in items if item["status"] == "blocked"], "generated_at": now()}


@router.get("/workspace/export")
def export_workspace():
    return {"schema_version": 1, "exported_at": now(), "items": list_items()["items"], "profile": get_profile()}


@router.get("/capabilities")
def capabilities():
    return {"storage": "local SQLite (unencrypted)", "identity": "single-owner", "implemented": ["notes", "profile", "tasks", "projects", "contacts with skills/resources/project links", "manual innovation radar", "briefing", "JSON export"], "planned": ["AI conversation and agent execution", "cloud sign-in and multi-user storage", "calendar and mail sync", "creator app control", "payments", "voice and wearable integrations", "encrypted Survival/Legacy vault", "CAD/LiDAR processing"], "connectors": [{"name": name, "status": "not_connected"} for name in ["GitHub", "Google Drive", "Gmail", "Google Calendar", "Canva", "Shopify", "Ableton Live", "FL Studio", "Serato", "Payments"]]}
