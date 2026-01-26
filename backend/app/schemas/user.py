from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    ARTIST = "artist"
    INVESTOR = "investor"

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: UserRole = UserRole.ARTIST

class UserCreate(UserBase):
    password: str
    # Optional fields based on role
    spotify_id: Optional[str] = None
    investment_cap: Optional[int] = None

class User(UserBase):
    id: int
    is_active: bool
    spotify_id: Optional[str] = None
    investment_cap: Optional[int] = None

    class Config:
        from_attributes = True
