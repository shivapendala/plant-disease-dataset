"""Pydantic schemas for Agronomy Treatment recommendations."""
from typing import Optional, List
from pydantic import BaseModel
from backend.models.treatment import TreatmentType

class TreatmentResponse(BaseModel):
    id: int
    disease_id: int
    treatment_type: TreatmentType
    title: str
    active_ingredient: Optional[str] = None
    commercial_name: Optional[str] = None
    dosage_per_hectare: Optional[str] = None
    application_method: str
    application_frequency: str
    pre_harvest_interval_days: int
    safety_precautions: Optional[str] = None
    environmental_impact: str
    cost_rating: str
    class Config:
        from_attributes = True

class DosageCalculatorRequest(BaseModel):
    disease_id: int
    farm_area_hectares: float
    treatment_type: str = "Integrated"
    water_volume_liters_per_hectare: float = 200.0

class DosageCalculatorResponse(BaseModel):
    product_name: str
    active_ingredient: str
    total_product_required: str
    total_water_volume_liters: float
    application_instructions: List[str]
    estimated_cost_usd: float
