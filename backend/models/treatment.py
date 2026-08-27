"""Agronomy treatments, chemical protocols, and organic remedies."""
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
import enum
from backend.core.database import Base
from backend.models.base import TimestampMixin

class TreatmentType(str, enum.Enum):
    ORGANIC = "Organic / Biological"
    CHEMICAL = "Chemical Fungicide/Bactericide"
    CULTURAL = "Cultural / Agronomic"
    INTEGRATED = "Integrated Pest Management (IPM)"

class TreatmentRecommendation(Base, TimestampMixin):
    __tablename__ = "treatment_recommendations"
    disease_id = Column(Integer, ForeignKey("diseases.id"), nullable=False)
    treatment_type = Column(Enum(TreatmentType), default=TreatmentType.INTEGRATED, nullable=False)
    title = Column(String(255), nullable=False)
    active_ingredient = Column(String(255), nullable=True)
    commercial_name = Column(String(255), nullable=True)
    dosage_per_hectare = Column(String(100), nullable=True)
    application_method = Column(String(255), default="Foliar Spray")
    application_frequency = Column(String(255), default="Every 7-10 days")
    pre_harvest_interval_days = Column(Integer, default=7)
    safety_precautions = Column(Text, nullable=True)
    environmental_impact = Column(String(100), default="Low")
    cost_rating = Column(String(50), default="Medium")
    
    disease = relationship("Disease", back_populates="treatments")
