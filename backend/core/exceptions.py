"""Application custom exceptions and error handlers."""
from fastapi import HTTPException, status

class DiseaseNotFoundException(HTTPException):
    def __init__(self, disease_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Plant disease with ID '{disease_id}' does not exist in catalog."
        )

class CropNotFoundException(HTTPException):
    def __init__(self, crop_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Crop with ID '{crop_id}' does not exist in registry."
        )

class InvalidImagePayloadException(HTTPException):
    def __init__(self, reason: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid plant leaf image payload: {reason}"
        )

class InferenceEngineException(HTTPException):
    def __init__(self, error_msg: str):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"ML inference pipeline encountered an internal error: {error_msg}"
        )

class AuthenticationFailedException(HTTPException):
    def __init__(self, detail: str = "Invalid credentials"):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={"WWW-Authenticate": "Bearer"},
        )
