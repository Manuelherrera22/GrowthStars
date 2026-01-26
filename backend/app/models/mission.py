from sqlalchemy import Column, Integer, String, Text, Enum, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base
import enum

class MissionStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    REJECTED = "rejected"

class Mission(Base):
    __tablename__ = "missions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    status = Column(String, default=MissionStatus.PENDING.value)
    deadline = Column(DateTime, nullable=True)
    evidence_link = Column(String, nullable=True)
    
    artist_id = Column(Integer, ForeignKey("users.id"))
    artist = relationship("User", backref="missions")
