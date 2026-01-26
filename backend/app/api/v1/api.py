from fastapi import APIRouter
from app.api.v1.endpoints import users, login, missions, audio

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(missions.router, prefix="/missions", tags=["missions"])
api_router.include_router(audio.router, prefix="/audio", tags=["audio"])
