from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db, get_mongo_db, engine
from app.core.config import settings
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from app.api.v1.api import api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title=settings.PROJECT_NAME, version="1.0.0")

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def read_root():
    return {"message": "Welcome to Growth Stars Intelligence Engine"}

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    # Check Postgres
    postgres_status = "healthy"
    try:
        db.execute("SELECT 1")
    except Exception as e:
        logger.error(f"Postgres connection failed: {e}")
        postgres_status = "unhealthy"

    # Check Mongo
    mongo_status = "healthy"
    try:
        # Simple command to check connection
        get_mongo_db().command("ping")
    except Exception as e:
        logger.error(f"Mongo connection failed: {e}")
        mongo_status = "unhealthy"

    return {
        "status": "online",
        "postgres": postgres_status,
        "mongo": mongo_status
    }
