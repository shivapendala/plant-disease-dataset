"""Treatment advisory and dosage calculator endpoints."""
from fastapi import APIRouter
from backend.schemas.treatment import DosageCalculatorRequest, DosageCalculatorResponse
from backend.services.treatment_service import TreatmentService

router = APIRouter(prefix="/treatments", tags=["Treatments"])

@router.post("/calculate-dosage", response_model=DosageCalculatorResponse)
def calculate_dosage(req: DosageCalculatorRequest):
    return TreatmentService.calculate_dosage(req.farm_area_hectares, req.treatment_type)
