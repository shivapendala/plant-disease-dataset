import pytest
import io

def test_diagnosis_scan_endpoint(client, sample_leaf_image):
    file = io.BytesIO(sample_leaf_image)
    res = client.post(
        "/api/v1/diagnoses/scan",
        files={"image": ("tomato_late_blight.jpg", file, "image/jpeg")}
    )
    assert res.status_code == 200
    data = res.json()
    assert "diagnosis_id" in data
    assert "confidence" in data
    assert len(data["top_5_predictions"]) == 5
