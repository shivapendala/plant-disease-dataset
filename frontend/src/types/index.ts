export interface DiagnosisResult {
  diagnosis_id: number;
  image_url: string;
  predicted_class: string;
  crop: string;
  disease_name: string;
  confidence: number;
  is_healthy: boolean;
  top_5_predictions: {
    class_name: string;
    crop: string;
    disease_name: string;
    confidence: number;
    is_healthy: boolean;
  }[];
  heatmap_url?: string;
  lesion_coverage_percent: number;
  treatment_preview?: string;
  inference_latency_ms: number;
  created_at: string;
}

export interface CropSummary {
  id: number;
  name: string;
  scientific: string;
  diseases_count: number;
  status: string;
}

export interface DosageResult {
  product_name: string;
  active_ingredient: string;
  total_product_required: string;
  total_water_volume_liters: number;
  application_instructions: string[];
  estimated_cost_usd: number;
}
