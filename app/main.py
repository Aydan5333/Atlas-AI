from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import router  # Update if your router filename is different

app = FastAPI()

# 🔐 Allowed frontend domains (like your Replit app)
origins = [
    "https://atlas-ai-obeydboy53.replit.app",  # ✅ your Replit frontend URL
    "http://localhost:3000"  # optional for local testing
]

# 🔄 CORS setup to allow frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔗 Include all your API routes
app.include_router(router)