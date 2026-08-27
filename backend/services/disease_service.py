"""Disease catalog and semantic symptom matching service."""
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from backend.models.disease import Disease, PathogenCategory
from backend.models.crop import CropSpecies

class DiseaseService:
    @staticmethod
    def get_all_diseases(db: Session, category: Optional[str] = None) -> List[Disease]:
        query = db.query(Disease)
        if category:
            query = query.filter(Disease.category == category)
        return query.all()

    @staticmethod
    def get_disease_by_id(db: Session, disease_id: int) -> Optional[Disease]:
        return db.query(Disease).filter(Disease.id == disease_id).first()

    @staticmethod
    def match_symptoms(crop_name: str, symptoms: List[str]) -> List[Dict[str, Any]]:
        """Semantic rule-based symptom matching."""
        matches = []
        symptom_set = {s.lower() for s in symptoms}
        
        knowledge_base = [
            {
                "crop": "Tomato",
                "disease": "Early Blight",
                "keywords": ["concentric rings", "dark brown spots", "lower leaves yellowing", "target spot"],
                "pathogen": "Alternaria solani",
                "confidence": 0.92
            },
            {
                "crop": "Tomato",
                "disease": "Late Blight",
                "keywords": ["water-soaked spots", "white fungal growth", "rapid wilting", "stem lesions"],
                "pathogen": "Phytophthora infestans",
                "confidence": 0.95
            },
            {
                "crop": "Apple",
                "disease": "Apple Scab",
                "keywords": ["velvety olive green spots", "dark brown scabs", "cracked fruit"],
                "pathogen": "Venturia inaequalis",
                "confidence": 0.88
            },
            {
                "crop": "Rice",
                "disease": "Leaf Blast",
                "keywords": ["spindle shaped lesions", "gray center brown margin", "seedling blight"],
                "pathogen": "Magnaporthe oryzae",
                "confidence": 0.94
            },
            {
                "crop": "Cassava",
                "disease": "Mosaic Disease (CMD)",
                "keywords": ["yellow green mosaic pattern", "leaf distortion", "stunted growth"],
                "pathogen": "Cassava Mosaic Geminivirus",
                "confidence": 0.96
            }
        ]
        
        for entry in knowledge_base:
            if crop_name.lower() in entry["crop"].lower() or entry["crop"].lower() in crop_name.lower():
                score = sum(1 for kw in entry["keywords"] if any(kw in s or s in kw for s in symptom_set))
                if score > 0:
                    matches.append({
                        "crop": entry["crop"],
                        "disease_name": entry["disease"],
                        "pathogen": entry["pathogen"],
                        "match_score": min(0.99, entry["confidence"] * (score / max(1, len(symptoms)))),
                        "recommendation": f"Inspect leaves for {entry['pathogen']} and apply recommended management protocol."
                    })
        
        matches.sort(key=lambda x: x["match_score"], reverse=True)
        return matches
