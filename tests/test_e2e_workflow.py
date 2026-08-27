import pytest

def test_complete_farmer_workflow(client, sample_leaf_image):
    # 1. Check crops
    crops_res = client.get("/api/v1/crops/")
    assert crops_res.status_code == 200

    # 2. Check telemetry
    telemetry_res = client.get("/api/v1/telemetry/risk-forecast?temp=25&humidity=85&wetness=7")
    assert telemetry_res.status_code == 200

    # 3. Calculate treatment
    calc_res = client.post("/api/v1/treatments/calculate-dosage", json={
        "disease_id": 1,
        "farm_area_hectares": 1.5,
        "treatment_type": "chemical",
        "water_volume_liters_per_hectare": 200.0
    })
    assert calc_res.status_code == 200
    assert calc_res.json()["estimated_cost_usd"] > 0
