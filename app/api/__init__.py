from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import router  # Make sure this matches your actual router filename

app = FastAPI()

origins = [
    "https://atlas-ai-obeydboy53.replit.app",  # ✅ Your Replit frontend URL
    "http://localhost:3000"  # Optional: for local dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(router)