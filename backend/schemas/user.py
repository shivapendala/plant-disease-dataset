"""Pydantic schemas for User authentication and profiles."""
from typing import Optional
from pydantic import BaseModel, EmailStr
from backend.models.user import UserRole

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: UserRole = UserRole.FARMER
    phone_number: Optional[str] = None
    region: Optional[str] = "Default Region"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in_seconds: int = 3600
