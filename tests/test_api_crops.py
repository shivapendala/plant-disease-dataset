import pytest

def test_list_crops(client):
    res = client.get("/api/v1/crops/")
    assert res.status_code == 200
    crops = res.json()
    assert len(crops) >= 13
    assert any(c["name"] == "Cassava" for c in crops)
    assert any(c["name"] == "Rice" for c in crops)
