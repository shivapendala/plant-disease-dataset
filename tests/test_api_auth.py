import pytest

def test_health_check(client):
    res = client.get("/healthz")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ok"

def test_root_endpoint(client):
    res = client.get("/")
    assert res.status_code == 200
    assert res.json()["service"] == "FloraGuard-PlantHealth-AI"
