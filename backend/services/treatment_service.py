"""Agronomic recommendation and dosage calculation service."""
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from backend.models.treatment import TreatmentRecommendation, TreatmentType

class TreatmentService:
    @staticmethod
    def get_treatments_for_disease(db: Session, disease_id: int) -> List[TreatmentRecommendation]:
        return db.query(TreatmentRecommendation).filter(TreatmentRecommendation.disease_id == disease_id).all()

    @staticmethod
    def calculate_dosage(farm_area_ha: float, product_type: str = "biological") -> Dict[str, Any]:
        if product_type.lower() == "biological":
            product_name = "BioGuard Bacillus subtilis Formulation"
            rate_per_ha = 2.5
            water_per_ha = 250
            cost_per_liter = 18.5
        else:
            product_name = "Copper Oxychloride 50% WP"
            rate_per_ha = 3.0
            water_per_ha = 300
            cost_per_liter = 12.0
            
        total_product = round(farm_area_ha * rate_per_ha, 2)
        total_water = round(farm_area_ha * water_per_ha, 1)
        estimated_cost = round(total_product * cost_per_liter, 2)
        
        return {
            "product_name": product_name,
            "active_ingredient": "Bacillus subtilis strain QST 713" if product_type.lower() == "biological" else "Copper Oxychloride (50% Cu metallic)",
            "total_product_required": f"{total_product} {'L' if product_type.lower() == 'biological' else 'kg'}",
            "total_water_volume_liters": total_water,
            "application_instructions": [
                "Calibrate knapsack or tractor-mounted boom sprayer to ensure uniform leaf canopy coverage.",
                "Spray early in the morning or late afternoon to minimize UV degradation and evaporative loss.",
                "Ensure both upper and lower leaf surfaces are thoroughly wetted.",
                "Repeat application at 7 to 10-day intervals if relative humidity exceeds 80%."
            ],
            "estimated_cost_usd": estimated_cost
        }
