from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.mission import MissionStatus

class MissionBase(BaseModel):
    title: str
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    status: Optional[MissionStatus] = MissionStatus.PENDING

class MissionCreate(MissionBase):
    artist_id: int

class MissionUpdate(MissionBase):
    pass

class Mission(MissionBase):
    id: int
    artist_id: int
    evidence_link: Optional[str] = None

    class Config:
        from_attributes = True
