"""Plant pathology disease classification models."""
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Text, Enum, JSON
from sqlalchemy.orm import relationship
import enum
from backend.core.database import Base
from backend.models.base import TimestampMixin

class PathogenCategory(str, enum.Enum):
    FUNGAL = "Fungal"
    BACTERIAL = "Bacterial"
    VIRAL = "Viral"
    NEMATODE = "Nematode"
    PHYSIOLOGICAL = "Physiological"
    HEALTHY = "Healthy"

class SeverityClass(str, enum.Enum):
    NONE = "None"
    LOW = "Low"
    MODERATE = "Moderate"
    HIGH = "High"
    CRITICAL = "Critical"

class Disease(Base, TimestampMixin):
    __tablename__ = "diseases"
    crop_species_id = Column(Integer, ForeignKey("crop_species.id"), nullable=False)
    name = Column(String(255), nullable=False, index=True)
    scientific_name = Column(String(255), nullable=True)
    category = Column(Enum(PathogenCategory), default=PathogenCategory.FUNGAL, nullable=False)
    severity_level = Column(Enum(SeverityClass), default=SeverityClass.MODERATE, nullable=False)
    symptoms_description = Column(Text, nullable=False)
    favorable_conditions = Column(Text, nullable=True)
    transmission_mode = Column(String(255), nullable=True)
    economic_impact = Column(Text, nullable=True)
    prevention_measures = Column(Text, nullable=True)
    sample_image_url = Column(String(500), nullable=True)
    
    crop_species = relationship("CropSpecies", back_populates="diseases")
    treatments = relationship("TreatmentRecommendation", back_populates="disease")
    diagnoses = relationship("DiagnosisRecord", back_populates="detected_disease")
