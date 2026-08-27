"""Crop management endpoints."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.core.database import get_db
from backend.models.crop import CropSpecies

router = APIRouter(prefix="/crops", tags=["Crops"])

@router.get("/")
def list_crops(db: Session = Depends(get_db)):
    crops = [
        {"id": 1, "name": "Apple", "scientific": "Malus domestica", "diseases_count": 4, "status": "Monitored"},
        {"id": 2, "name": "Cassava", "scientific": "Manihot esculenta", "diseases_count": 5, "status": "Monitored"},
        {"id": 3, "name": "Cherry", "scientific": "Prunus avium", "diseases_count": 2, "status": "Monitored"},
        {"id": 4, "name": "Corn (Maize)", "scientific": "Zea mays", "diseases_count": 4, "status": "Monitored"},
        {"id": 5, "name": "Grape", "scientific": "Vitis vinifera", "diseases_count": 4, "status": "Monitored"},
        {"id": 6, "name": "Orange", "scientific": "Citrus sinensis", "diseases_count": 1, "status": "Monitored"},
        {"id": 7, "name": "Peach", "scientific": "Prunus persica", "diseases_count": 2, "status": "Monitored"},
        {"id": 8, "name": "Pepper Bell", "scientific": "Capsicum annuum", "diseases_count": 2, "status": "Monitored"},
        {"id": 9, "name": "Potato", "scientific": "Solanum tuberosum", "diseases_count": 3, "status": "Monitored"},
        {"id": 10, "name": "Rice", "scientific": "Oryza sativa", "diseases_count": 4, "status": "Monitored"},
        {"id": 11, "name": "Squash", "scientific": "Cucurbita pepo", "diseases_count": 1, "status": "Monitored"},
        {"id": 12, "name": "Strawberry", "scientific": "Fragaria ananassa", "diseases_count": 2, "status": "Monitored"},
        {"id": 13, "name": "Tomato", "scientific": "Solanum lycopersicum", "diseases_count": 10, "status": "Monitored"}
    ]
    return crops
