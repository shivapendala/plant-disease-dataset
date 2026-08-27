"""Pydantic schemas for Crop species and Farm plots."""
from typing import Optional, List
from pydantic import BaseModel

class CropSpeciesBase(BaseModel):
    common_name: str
    scientific_name: str
    family: Optional[str] = None
    growth_duration_days: int = 120
    description: Optional[str] = None

class CropSpeciesResponse(CropSpeciesBase):
    id: int
    class Config:
        from_attributes = True

class CropPlotCreate(BaseModel):
    farm_id: int
    species_id: int
    plot_code: str
    planted_date: Optional[str] = None
    expected_harvest_date: Optional[str] = None

class CropPlotResponse(BaseModel):
    id: int
    farm_id: int
    species_id: int
    plot_code: str
    current_growth_stage: str
    health_status: str
    class Config:
        from_attributes = True
