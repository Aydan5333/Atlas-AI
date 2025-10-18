from app.api import app
from app.scheduler.jobs import hourly_heartbeat

@app.post("/jobs/heartbeat")
def jobs_heartbeat():
    return {"message": hourly_heartbeat()}
