from sqlalchemy import Boolean, Column, Integer, String, Enum
from app.db.database import Base
import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    ARTIST = "artist"
    INVESTOR = "investor"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String, nullable=True)
    role = Column(String, default=UserRole.ARTIST.value)
    is_active = Column(Boolean, default=True)
    
    # For Artists:
    spotify_id = Column(String, nullable=True)
    
    # For Investors:
    investment_cap = Column(Integer, nullable=True)
