"""Pydantic schemas for Plant Disease Diagnoses."""
from typing import Optional, List, Dict, Any
from pydantic import BaseModel

class PredictionItem(BaseModel):
    class_name: str
    crop: str
    disease_name: str
    confidence: float
    is_healthy: bool

class DiagnosisResponse(BaseModel):
    diagnosis_id: int
    image_url: str
    predicted_class: str
    crop: str
    disease_name: str
    confidence: float
    is_healthy: bool
    top_5_predictions: List[PredictionItem]
    heatmap_url: Optional[str] = None
    lesion_coverage_percent: float
    treatment_preview: Optional[str] = None
    inference_latency_ms: float
    created_at: str

class BatchDiagnosisResponse(BaseModel):
    total_processed: int
    successful_count: int
    results: List[DiagnosisResponse]
