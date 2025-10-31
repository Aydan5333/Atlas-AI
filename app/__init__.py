from fastapi import FastAPI
from app.api import router as api_router

app = FastAPI(title="Atlas API", version="1.0")

# Register API router
app.include_router(api_router)
