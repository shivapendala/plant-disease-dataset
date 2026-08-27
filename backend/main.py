"""FloraGuard AI Plant Disease Diagnosis & Agronomy Platform API."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.core.config import settings
from backend.api.v1 import auth, diagnoses, crops, treatments, telemetry

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Enterprise Plant Pathology, Leaf Lesion Segmentation & Agronomic Advisory REST API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1")
app.include_router(diagnoses.router, prefix="/api/v1")
app.include_router(crops.router, prefix="/api/v1")
app.include_router(treatments.router, prefix="/api/v1")
app.include_router(telemetry.router, prefix="/api/v1")

@app.get("/", tags=["Health"])
def root():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "supported_disease_classes": 38
    }

@app.get("/healthz", tags=["Health"])
def health_check():
    return {"status": "ok", "inference_ready": True, "database": "connected"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host=settings.SERVER_HOST, port=settings.SERVER_PORT, reload=settings.DEBUG)
