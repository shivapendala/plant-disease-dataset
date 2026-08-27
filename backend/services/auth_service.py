"""Authentication business service."""
from typing import Optional
from sqlalchemy.orm import Session
from backend.models.user import User, UserRole
from backend.schemas.user import UserCreate
from backend.core.security import get_password_hash, verify_password, create_access_token, create_refresh_token
from backend.core.exceptions import AuthenticationFailedException

class AuthService:
    @staticmethod
    def register_user(db: Session, user_in: UserCreate) -> User:
        existing = db.query(User).filter(User.email == user_in.email).first()
        if existing:
            raise ValueError(f"User with email '{user_in.email}' already exists.")
        
        user = User(
            email=user_in.email,
            hashed_password=get_password_hash(user_in.password),
            full_name=user_in.full_name,
            role=user_in.role,
            phone_number=user_in.phone_number,
            region=user_in.region,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def authenticate(db: Session, email: str, password: str):
        user = db.query(User).filter(User.email == email).first()
        if not user or not verify_password(password, user.hashed_password):
            raise AuthenticationFailedException("Invalid email or password.")
        
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": user
        }
