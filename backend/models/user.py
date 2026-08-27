"""User, Role, and Organization domain entities."""
from sqlalchemy import Column, String, Enum, ForeignKey, Integer, Text
from sqlalchemy.orm import relationship
import enum
from backend.core.database import Base
from backend.models.base import TimestampMixin

class UserRole(str, enum.Enum):
    SUPER_ADMIN = "super_admin"
    AGRONOMIST = "agronomist"
    FARMER = "farmer"
    RESEARCHER = "researcher"
    EXTENSION_OFFICER = "extension_officer"

class Organization(Base, TimestampMixin):
    __tablename__ = "organizations"
    name = Column(String(255), nullable=False, unique=True, index=True)
    org_type = Column(String(100), default="Cooperative")
    country = Column(String(100), default="Global")
    contact_email = Column(String(255), nullable=True)
    contact_phone = Column(String(50), nullable=True)
    users = relationship("User", back_populates="organization")

class User(Base, TimestampMixin):
    __tablename__ = "users"
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.FARMER, nullable=False)
    phone_number = Column(String(50), nullable=True)
    region = Column(String(100), default="Default Farm District")
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    
    organization = relationship("Organization", back_populates="users")
    diagnoses = relationship("DiagnosisRecord", back_populates="user")
    farms = relationship("Farm", back_populates="owner")
