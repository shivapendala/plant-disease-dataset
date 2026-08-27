"""Pydantic schemas for Plant Diseases."""
from typing import Optional, List
from pydantic import BaseModel
from backend.models.disease import PathogenCategory, SeverityClass

class DiseaseBase(BaseModel):
    crop_species_id: int
    name: str
    scientific_name: Optional[str] = None
    category: PathogenCategory
    severity_level: SeverityClass
    symptoms_description: str
    favorable_conditions: Optional[str] = None
    prevention_measures: Optional[str] = None

class DiseaseResponse(DiseaseBase):
    id: int
    sample_image_url: Optional[str] = None
    class Config:
        from_attributes = True

class SymptomMatcherRequest(BaseModel):
    crop_name: str
    observed_symptoms: List[str]
    affected_part: str = "Leaf"
