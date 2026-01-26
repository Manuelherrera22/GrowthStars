from sqlalchemy.orm import Session
from app.models.mission import Mission
from app.schemas.mission import MissionCreate, MissionUpdate

def get_missions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Mission).offset(skip).limit(limit).all()

def get_missions_by_artist(db: Session, artist_id: int, skip: int = 0, limit: int = 100):
    return db.query(Mission).filter(Mission.artist_id == artist_id).offset(skip).limit(limit).all()

def create_mission(db: Session, mission: MissionCreate):
    db_mission = Mission(
        title=mission.title,
        description=mission.description,
        deadline=mission.deadline,
        status=mission.status.value,
        artist_id=mission.artist_id
    )
    db.add(db_mission)
    db.commit()
    db.refresh(db_mission)
    return db_mission
