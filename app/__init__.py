# app/api/__init__.py (additions)
from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/")
def welcome():
    return {"service": "atlas-api", "docs": "/docs", "health": "/health"}

@router.get("/health")
def health():
    return {"ok": True}

# keep existing /api/health if you already have it
# Mount router
app.include_router(router)
