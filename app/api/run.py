import os

import uvicorn
from app import app


if __name__ == "__main__":
    uvicorn.run(app, host=os.getenv("ATLAS_HOST", "127.0.0.1"), port=int(os.getenv("PORT", "8000")))
