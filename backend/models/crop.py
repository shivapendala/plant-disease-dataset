"""Crop and Farm Plot domain models."""
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from backend.core.database import Base
from backend.models.base import TimestampMixin

class Farm(Base, TimestampMixin):
    __tablename__ = "farms"
    name = Column(String(255), nullable=False, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    location_lat = Column(Float, nullable=True)
    location_lon = Column(Float, nullable=True)
    area_hectares = Column(Float, default=1.0)
    soil_type = Column(String(100), default="Loam")
    irrigation_system = Column(String(100), default="Drip")
    
    owner = relationship("User", back_populates="farms")
    crops = relationship("CropPlot", back_populates="farm")

class CropSpecies(Base, TimestampMixin):
    __tablename__ = "crop_species"
    common_name = Column(String(100), unique=True, nullable=False, index=True)
    scientific_name = Column(String(200), nullable=False)
    family = Column(String(100), nullable=True)
    optimal_temp_min = Column(Float, default=15.0)
    optimal_temp_max = Column(Float, default=30.0)
    optimal_humidity_min = Column(Float, default=40.0)
    optimal_humidity_max = Column(Float, default=80.0)
    description = Column(Text, nullable=True)
    growth_duration_days = Column(Integer, default=120)
    
    diseases = relationship("Disease", back_populates="crop_species")
    plots = relationship("CropPlot", back_populates="species")

class CropPlot(Base, TimestampMixin):
    __tablename__ = "crop_plots"
    farm_id = Column(Integer, ForeignKey("farms.id"), nullable=False)
    species_id = Column(Integer, ForeignKey("crop_species.id"), nullable=False)
    plot_code = Column(String(100), nullable=False)
    planted_date = Column(String(50), nullable=True)
    expected_harvest_date = Column(String(50), nullable=True)
    current_growth_stage = Column(String(100), default="Vegetative")
    health_status = Column(String(50), default="Healthy")
    
    farm = relationship("Farm", back_populates="crops")
    species = relationship("CropSpecies", back_populates="plots")
    diagnoses = relationship("DiagnosisRecord", back_populates="plot")
