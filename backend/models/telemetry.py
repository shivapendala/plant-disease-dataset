"""Environmental sensor stations and disease risk telemetry."""
from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from backend.core.database import Base
from backend.models.base import TimestampMixin

class TelemetryStation(Base, TimestampMixin):
    __tablename__ = "telemetry_stations"
    station_code = Column(String(100), unique=True, index=True, nullable=False)
    farm_id = Column(Integer, ForeignKey("farms.id"), nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    elevation_meters = Column(Float, default=150.0)
    battery_level_percent = Column(Float, default=100.0)
    firmware_version = Column(String(50), default="v1.4.2")

class EnvironmentalReading(Base, TimestampMixin):
    __tablename__ = "environmental_readings"
    station_id = Column(Integer, ForeignKey("telemetry_stations.id"), nullable=False)
    recorded_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)
    air_temperature_celsius = Column(Float, nullable=False)
    relative_humidity_percent = Column(Float, nullable=False)
    leaf_wetness_index = Column(Float, default=0.0)
    soil_moisture_percent = Column(Float, default=35.0)
    solar_radiation_w_m2 = Column(Float, default=500.0)
    calculated_fungal_risk_index = Column(Float, default=0.2)
