import pytest
from backend.services.disease_service import DiseaseService

def test_symptom_matcher():
    symptoms = ["water-soaked spots", "rapid wilting"]
    matches = DiseaseService.match_symptoms("Tomato", symptoms)
    assert len(matches) > 0
    assert matches[0]["disease_name"] == "Late Blight"
