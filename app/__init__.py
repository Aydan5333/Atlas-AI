from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()
from app.api import router as api_router
from app.api.core import router as core_router

app = FastAPI(title="Atlas API", version="1.1")
app.include_router(api_router)
app.include_router(core_router)
