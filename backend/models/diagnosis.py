"""AI image diagnosis record and attention heatmap models."""
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from backend.core.database import Base
from backend.models.base import TimestampMixin

class DiagnosisRecord(Base, TimestampMixin):
    __tablename__ = "diagnosis_records"
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    plot_id = Column(Integer, ForeignKey("crop_plots.id"), nullable=True)
    disease_id = Column(Integer, ForeignKey("diseases.id"), nullable=True)
    
    image_path = Column(String(500), nullable=False)
    image_hash = Column(String(100), nullable=True, index=True)
    predicted_class_name = Column(String(255), nullable=False)
    confidence_score = Column(Float, nullable=False)
    top_k_predictions = Column(JSON, nullable=True)
    
    # Model attribution & Grad-CAM
    model_architecture = Column(String(100), default="ViT-B16-ResNet50-Ensemble")
    inference_latency_ms = Column(Float, default=45.0)
    heatmap_overlay_path = Column(String(500), nullable=True)
    lesion_coverage_percent = Column(Float, default=0.0)
    
    # Validation & Feedback
    expert_verified = Column(String(50), default="Pending")
    expert_notes = Column(Text, nullable=True)
    treatment_applied = Column(String(255), nullable=True)
    
    user = relationship("User", back_populates="diagnoses")
    plot = relationship("CropPlot", back_populates="diagnoses")
    detected_disease = relationship("Disease", back_populates="diagnoses")
