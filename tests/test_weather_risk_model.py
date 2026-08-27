import pytest
from backend.services.weather_service import WeatherRiskService

def test_high_risk_weather():
    risk = WeatherRiskService.compute_disease_risk(22.0, 90.0, 8.0)
    assert risk["risk_level"] == "High"
    assert risk["risk_score"] >= 0.75
