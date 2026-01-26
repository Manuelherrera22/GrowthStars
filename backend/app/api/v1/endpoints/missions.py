from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.crud import mission as crud_mission
from app.schemas.mission import Mission, MissionCreate
from app.api import deps
from app.db.database import get_db
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=Mission)
def create_mission(
    *,
    db: Session = Depends(get_db),
    mission_in: MissionCreate,
    current_user: User = Depends(deps.get_current_active_admin),
):
    """
    Create new mission. Only Admins can create missions.
    """
    return crud_mission.create_mission(db=db, mission=mission_in)

@router.get("/", response_model=List[Mission])
def read_missions(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
):
    """
    Retrieve missions. 
    Admins see all. Artists should ideally only see theirs (logic simplified for now).
    """
    if current_user.role == "artist":
        return crud_mission.get_missions_by_artist(db=db, artist_id=current_user.id, skip=skip, limit=limit)
    return crud_mission.get_missions(db=db, skip=skip, limit=limit)
