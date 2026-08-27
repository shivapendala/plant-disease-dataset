const API_BASE = "/api/v1";

export async function scanLeafImage(file: File, cropHint?: string) {
  const formData = new FormData();
  formData.append("image", file);
  if (cropHint) formData.append("crop_hint", cropHint);

  const res = await fetch(`${API_BASE}/diagnoses/scan`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Diagnosis scan failed");
  return await res.json();
}

export async function fetchCrops() {
  const res = await fetch(`${API_BASE}/crops/`);
  if (!res.ok) throw new Error("Failed to load crops");
  return await res.json();
}

export async function calculateDosage(farmArea: number, treatmentType: string) {
  const res = await fetch(`${API_BASE}/treatments/calculate-dosage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      disease_id: 1,
      farm_area_hectares: farmArea,
      treatment_type: treatmentType
    }),
  });
  if (!res.ok) throw new Error("Failed to calculate dosage");
  return await res.json();
}
