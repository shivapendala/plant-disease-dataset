"""Environmental telemetry and risk forecast endpoints."""
from fastapi import APIRouter
from backend.services.weather_service import WeatherRiskService

router = APIRouter(prefix="/telemetry", tags=["Telemetry"])

@router.get("/risk-forecast")
def get_risk_forecast(temp: float = 24.5, humidity: float = 88.0, wetness: float = 7.5):
    return WeatherRiskService.compute_disease_risk(temp, humidity, wetness)
