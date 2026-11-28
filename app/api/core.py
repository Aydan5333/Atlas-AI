"""Authenticated single-owner local core. No provider or third-party actions."""
import json
import os
import secrets
import sqlite3
from datetime import date, datetime, timezone
from decimal import Decimal
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
    db.execute("CREATE TABLE IF NOT EXISTS days (day TEXT PRIMARY KEY, payload TEXT NOT NULL, updated_at TEXT NOT NULL)")
    return db


def now():
    return datetime.now(timezone.utc).isoformat()


Kind = Literal["task", "project", "contact", "innovation", "note", "content"]
Lane = Literal["Atlas", "TSC", "School", "Garage", "Content", "Family", "Finance", "Memory"]
Status = Literal["planned", "active", "blocked", "done"]


class BusinessBlueprint(BaseModel):
    stage: Literal["local_proof", "repeatable_operations", "second_city", "international"] = "local_proof"
    offer: str = Field(default="", max_length=3000)
    customer: str = Field(default="", max_length=3000)
    economics: str = Field(default="", max_length=3000)
    acquisition: str = Field(default="", max_length=3000)
    proof: str = Field(default="", max_length=3000)
    operations: str = Field(default="", max_length=3000)
    expansion_gate: str = Field(default="", max_length=3000)
    next_action: str = Field(default="", max_length=200)


class ContentPlan(BaseModel):
    """Manual publish and outcome log. This never posts to external platforms."""
    objective: Literal["show_work", "collaborate", "commission", "service", "community"] = "show_work"
    audience: str = Field(default="", max_length=500)
    series: str = Field(default="", max_length=200)
    pillars: list[Literal["Art", "Music", "Fashion", "Auto", "Tech", "Education"]] = Field(default_factory=list, max_length=6)
    platforms: list[Literal["Instagram", "TikTok", "YouTube Shorts", "YouTube", "Other"]] = Field(default_factory=list, max_length=5)
    call_to_action: str = Field(default="", max_length=500)
    asset_link: str = Field(default="", max_length=2000)
    post_links: list[str] = Field(default_factory=list, max_length=5)
    published_on: date | None = None
    views: int = Field(default=0, ge=0, le=1_000_000_000)
    saves: int = Field(default=0, ge=0, le=1_000_000_000)
    inquiries: int = Field(default=0, ge=0, le=1_000_000)
    paid_projects: int = Field(default=0, ge=0, le=1_000_000)
    revenue: Decimal = Field(default=Decimal("0"), ge=0, max_digits=12, decimal_places=2)


class Record(BaseModel):
    kind: Kind
    title: str = Field(min_length=1, max_length=200)
    body: str = Field(default="", max_length=20000)
    lane: Lane = "Atlas"
    status: Status = "planned"
    skills: list[str] = Field(default_factory=list, max_length=30)
    resources: list[str] = Field(default_factory=list, max_length=30)
    project_id: str | None = None
    due_date: date | None = None
    priority: Literal["normal", "high"] = "normal"
    blueprint: BusinessBlueprint | None = None
    content: ContentPlan | None = None


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
        return {"item": {**record.model_dump(mode="json"), "id": ident, "created_at": stamp, "updated_at": stamp}}
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
        return {"item": {**record.model_dump(mode="json"), "id": item_id, "created_at": row["created_at"], "updated_at": stamp}}
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
    return {"counts": {kind: sum(item["kind"] == kind for item in items) for kind in ("task", "project", "contact", "note", "innovation", "content")}, "next_tasks": [item for item in items if item["kind"] == "task" and item["status"] != "done"][:5], "blockers": [item for item in items if item["status"] == "blocked"], "generated_at": now()}


@router.get("/workspace/export")
def export_workspace():
    db = connect()
    try:
        days = [{"day": row["day"], **json.loads(row["payload"]), "updated_at": row["updated_at"]} for row in db.execute("SELECT * FROM days ORDER BY day DESC")]
    finally:
        db.close()
    return {"schema_version": 1, "exported_at": now(), "items": list_items()["items"], "profile": get_profile(), "days": days}


class DayPlan(BaseModel):
    focus_ids: list[str] = Field(default_factory=list, max_length=3)
    commitments: str = Field(default="", max_length=5000)
    review: str = Field(default="", max_length=5000)


@router.put("/daily/{day}")
def save_day(day: date, plan: DayPlan):
    items = {item["id"]: item for item in list_items()["items"]}
    if len(set(plan.focus_ids)) != len(plan.focus_ids):
        raise HTTPException(422, "Choose each priority only once")
    if any(ident not in items or items[ident]["kind"] != "task" for ident in plan.focus_ids):
        raise HTTPException(422, "Priorities must refer to existing tasks")
    db = connect()
    try:
        with db:
            db.execute("INSERT INTO days VALUES (?,?,?) ON CONFLICT(day) DO UPDATE SET payload=excluded.payload,updated_at=excluded.updated_at", (day.isoformat(), plan.model_dump_json(), now()))
    finally:
        db.close()
    return daily(day)


@router.get("/daily/{day}")
def daily(day: date):
    db = connect()
    try:
        row = db.execute("SELECT payload FROM days WHERE day=?", (day.isoformat(),)).fetchone()
    finally:
        db.close()
    plan = json.loads(row["payload"]) if row else DayPlan().model_dump()
    items = list_items()["items"]
    lookup = {item["id"]: item for item in items}
    plan["focus_ids"] = [ident for ident in plan["focus_ids"] if ident in lookup and lookup[ident]["kind"] == "task"]
    focus = [lookup[ident] for ident in plan["focus_ids"] if ident in lookup]
    open_tasks = [item for item in items if item["kind"] == "task" and item["status"] != "done"]
    # ISO dates sort chronologically; callers supply their local calendar date.
    overdue = [item for item in open_tasks if item.get("due_date") and item["due_date"] < day.isoformat()]
    due = [item for item in open_tasks if item.get("due_date") == day.isoformat()]
    blockers = [item for item in items if item["status"] == "blocked"]
    completed = [item for item in focus if item["status"] == "done"]
    spoken = [f"Atlas briefing for {day.isoformat()}.", f"You have {len(open_tasks)} open tasks, {len(overdue)} overdue, and {len(blockers)} blockers."]
    spoken += [f"Priority {i + 1}: {item['title']}. Status: {item['status']}." for i, item in enumerate(focus)]
    if not focus:
        spoken.append("Choose up to three priorities for this day.")
    if plan["commitments"]:
        spoken.append("Your manually entered commitments: " + plan["commitments"])
    if due:
        spoken.append("Due on this date: " + "; ".join(item["title"] for item in due))
    spoken.append("Keep your hands on the wheel.")
    return {"day": day.isoformat(), "plan": plan, "focus": focus, "due": due, "overdue": overdue, "blockers": blockers, "completed_focus": len(completed), "open_tasks": len(open_tasks), "spoken_text": " ".join(spoken), "generated_at": now()}


@router.get("/capabilities")
def capabilities():
    return {"storage": "local SQLite (unencrypted)", "identity": "single-owner", "implemented": ["notes", "profile", "tasks", "projects", "contacts with skills/resources/project links", "manual innovation radar", "briefing", "daily plans and evening reviews", "TSC business blueprints", "manual content publishing and outcome log", "JSON export"], "planned": ["AI conversation and agent execution", "cloud sign-in and multi-user storage", "calendar and mail sync", "creator app control", "payments", "voice and wearable integrations", "encrypted Survival/Legacy vault", "CAD/LiDAR processing"], "connectors": [{"name": name, "status": "not_connected"} for name in ["GitHub", "Google Drive", "Gmail", "Google Calendar", "Canva", "Shopify", "Ableton Live", "FL Studio", "Serato", "Payments"]]}
