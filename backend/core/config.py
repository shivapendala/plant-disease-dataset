"""Application configuration and settings management."""
import os
from typing import List, Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "FloraGuard-PlantHealth-AI"
    APP_VERSION: str = "2.4.0"
    ENVIRONMENT: str = "production"
    DEBUG: bool = False
    LOG_LEVEL: str = "INFO"
    
    # Server network settings
    SERVER_HOST: str = "0.0.0.0"
    SERVER_PORT: int = 8000
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000", "*"]
    
    # Database
    DATABASE_URL: str = "postgresql://floraguard_user:db_password@postgres:5432/floraguard_db"
    DB_POOL_SIZE: int = 25
    DB_MAX_OVERFLOW: int = 15
    DB_TIMEOUT: int = 30
    
    # Redis
    REDIS_URL: str = "redis://redis:6379/0"
    REDIS_CACHE_TTL: int = 3600
    
    # Security
    SECRET_KEY: str = "secure_production_secret_key_plant_disease_detection_platform_256"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 14
    
    # Machine Learning Settings
    MODEL_STORAGE_PATH: str = "./ml_models/checkpoints"
    INFERENCE_DEVICE: str = "cpu"
    BATCH_INFERENCE_MAX_SIZE: int = 32
    HEATMAP_RESOLUTION: int = 224
    CONFIDENCE_THRESHOLD: float = 0.75
    SUPPORTED_CROPS: List[str] = [
        "Apple", "Cassava", "Cherry", "Corn", "Grape", 
        "Orange", "Peach", "Pepper Bell", "Potato", "Rice", 
        "Squash", "Strawberry", "Tomato"
    ]
    
    # Weather and Telemetry
    WEATHER_API_KEY: Optional[str] = None
    WEATHER_BASE_URL: str = "https://api.agromet-services.org/v2"
    IOT_MQTT_BROKER_HOST: str = "mqtt.agrisense.local"
    IOT_MQTT_BROKER_PORT: int = 1883
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
