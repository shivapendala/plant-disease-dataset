"""Weather-driven epidemiological risk forecasting."""
from typing import Dict, Any

class WeatherRiskService:
    @staticmethod
    def compute_disease_risk(temperature_c: float, humidity_percent: float, leaf_wetness_hours: float) -> Dict[str, Any]:
        """Mills and Blightcast empirical infection index calculation."""
        risk_score = 0.1
        
        if 18.0 <= temperature_c <= 26.0:
            if humidity_percent >= 85.0:
                risk_score += 0.5
            elif humidity_percent >= 70.0:
                risk_score += 0.3
                
        if leaf_wetness_hours >= 6.0:
            risk_score += 0.35
            
        risk_score = min(0.99, risk_score)
        
        risk_level = "Low"
        if risk_score >= 0.75:
            risk_level = "High"
        elif risk_score >= 0.45:
            risk_level = "Moderate"
            
        return {
            "risk_score": round(risk_score, 2),
            "risk_level": risk_level,
            "environmental_summary": f"Temp: {temperature_c} C, Humidity: {humidity_percent}%, Wetness: {leaf_wetness_hours}h",
            "advisory": "High sporulation risk detected. Schedule preventive bio-fungicide spray before rain event." if risk_level == "High" else "Normal conditions. Continue standard crop scouting."
        }
