import datetime as dt
def hourly_heartbeat() -> str:
    return f"Atlas heartbeat {dt.datetime.utcnow().isoformat()}Z"
