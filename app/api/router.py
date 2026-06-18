from datetime import datetime, timezone

from fastapi import APIRouter

router = APIRouter()

ATLAS_ARCHITECT_BRIEFING = {
    "agent": "Atlas Architect",
    "status": "foundation",
    "mission": "Track emerging technology, protect the Atlas/TSC vision, and turn useful updates into experiments, roadmap changes, and build tasks.",
    "focus_areas": [
        "AI models and agent orchestration",
        "Wearables, smart glasses, and HUD interfaces",
        "Voice AI and multimodal capture",
        "CAD, 3D scanning, automotive, and FSAE tools",
        "Creator tools for TSC art, music, fashion, and auto content",
        "Education technology for school and family learning",
        "Business automation, sponsorship, grants, and operations",
    ],
    "decision_tags": [
        "ignore",
        "watch",
        "research",
        "prototype",
        "integrate",
        "strategic_priority",
    ],
    "current_priorities": [
        {
            "title": "Stabilize Atlas Core",
            "why": "Atlas needs a reliable dashboard, API, notes, profile, and task foundation before larger agents can safely stack on top.",
            "move": "Keep the current repo alive, fix broken routes, and build small feature branches.",
        },
        {
            "title": "Prepare Atlas HUD",
            "why": "Smart-glasses display access creates a real path for glanceable Atlas cards in the garage, classroom, events, and family routines.",
            "move": "Design a lightweight HUD view with Now, Capture, Build Mode, TSC Mode, and School Mode.",
        },
        {
            "title": "Designated Agent Layer",
            "why": "Atlas should stay the head while agents handle TSC, school, garage, content, family, finance, and architecture lanes.",
            "move": "Document agent roles first, then connect them to real API routes and UI cards.",
        },
    ],
    "guardrails": [
        "Atlas is the head; tools and agents are extensions.",
        "Do not chase hype without a small testable experiment.",
        "Keep code changes small, reviewable, and backed up.",
        "Privacy and security rules stay locked even as life changes.",
        "No more asi dejalo: finish what we start.",
    ],
    "next_experiments": [
        "Create an Atlas HUD page for smart-glasses-sized cards.",
        "Add an innovation radar table with update, source, impact, tag, and next move.",
        "Create first agent cards for TSC, School, Garage, Content, Family, Finance, and Architect.",
        "Connect the Chat page to a backend command router when model keys are configured.",
    ],
}


@router.get("/health")
def health_check():
    return {"ok": True, "service": "Atlas API", "version": "1.0"}


@router.get("/system/status")
def system_status():
    return {
        "ok": True,
        "app": "Atlas-AI",
        "mode": "development",
        "frontend": "Next.js JS/JSX",
        "backend": "FastAPI",
        "mission": "Personal OS for TSC, school, family, garage, content, and life operations.",
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }


@router.get("/architect/briefing")
def architect_briefing():
    return {
        **ATLAS_ARCHITECT_BRIEFING,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
