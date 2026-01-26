from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pymongo import MongoClient
from app.core.config import settings

# PostgreSQL Setup (with SQLite fallback for dev)
if settings.DATABASE_URL.startswith("postgresql"):
    engine = create_engine(settings.DATABASE_URL)
else:
    engine = create_engine(
        settings.DATABASE_URL, connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# MongoDB Setup
mongo_client = MongoClient(settings.MONGO_URI)
mongo_db = mongo_client[settings.MONGO_DATABASE]

# Dependency for PostgreSQL
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Dependency for MongoDB
def get_mongo_db():
    return mongo_db
