import pytest
from backend.services.treatment_service import TreatmentService

def test_dosage_calculation():
    calc = TreatmentService.calculate_dosage(2.5, "biological")
    assert "BioGuard" in calc["product_name"]
    assert calc["total_water_volume_liters"] == 625.0
    assert calc["estimated_cost_usd"] > 0
