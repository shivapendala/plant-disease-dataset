"""Plant leaf disease diagnosis endpoints."""
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from backend.core.database import get_db
from backend.schemas.diagnosis import DiagnosisResponse
from backend.services.diagnosis_service import DiagnosisService

router = APIRouter(prefix="/diagnoses", tags=["Diagnosis"])

@router.post("/scan", response_model=DiagnosisResponse)
async def scan_leaf(
    image: UploadFile = File(...),
    crop_hint: str = Form(None),
    db: Session = Depends(get_db)
):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be a valid image (.jpg, .png)")
    
    contents = await image.read()
    result = DiagnosisService.diagnose_image(db, contents, image.filename)
    return result

@router.get("/recent")
def get_recent_scans(limit: int = 10, db: Session = Depends(get_db)):
    return [
        {
            "id": i,
            "crop": "Tomato",
            "disease": "Late Blight",
            "confidence": 0.96,
            "status": "Critical",
            "timestamp": "10 mins ago"
        }
        for i in range(1, limit + 1)
    ]
