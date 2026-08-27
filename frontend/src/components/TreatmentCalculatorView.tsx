import React, { useState } from 'react';

export const TreatmentCalculatorView: React.FC = () => {
  const [area, setArea] = useState<number>(2.5);
  const [treatmentType, setTreatmentType] = useState<'bio' | 'chem'>('bio');
  const [crop, setCrop] = useState('Tomato');
  const [disease, setDisease] = useState('Late Blight');

  const isBio = treatmentType === 'bio';
  const ratePerHa = isBio ? 2.5 : 3.0;
  const waterPerHa = isBio ? 250 : 300;
  const unit = isBio ? 'Liters' : 'kg';
  const productName = isBio ? 'BioGuard (Bacillus subtilis QST 713)' : 'Copper Oxychloride 50% WP';
  const unitPrice = isBio ? 18.5 : 12.0;

  const totalProduct = (area * ratePerHa).toFixed(2);
  const totalWater = (area * waterPerHa).toFixed(0);
  const totalCost = (Number(totalProduct) * unitPrice).toFixed(2);

  return (
    <div>
      <div className="page-header">
        <h1>🧪 Precision Dosage & Application Calculator</h1>
        <p>Calculate farm-scale product quantities, spray tank water volumes, and estimated input costs.</p>
      </div>

      <div className="grid-3" style={{ gap: 24 }}>
        <div className="card" style={{ gridColumn: 'span 1' }}>
          <h3 style={{ marginBottom: 20 }}>1. Farm & Crop Parameters</h3>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Farm Area (Hectares)</label>
            <input
              type="number"
              min="0.1"
              step="0.5"
              className="search-input"
              value={area}
              onChange={(e) => setArea(Math.max(0.1, Number(e.target.value)))}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Target Crop</label>
            <select
              className="search-input"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              style={{ background: '#0f172a' }}
            >
              <option value="Tomato">Tomato (Solanum lycopersicum)</option>
              <option value="Potato">Potato (Solanum tuberosum)</option>
              <option value="Rice">Rice (Oryza sativa)</option>
              <option value="Apple">Apple (Malus domestica)</option>
              <option value="Cassava">Cassava (Manihot esculenta)</option>
              <option value="Grape">Grape (Vitis vinifera)</option>
            </select>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Diagnosed Disease</label>
            <select
              className="search-input"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              style={{ background: '#0f172a' }}
            >
              <option value="Late Blight">Late Blight (Phytophthora infestans)</option>
              <option value="Early Blight">Early Blight (Alternaria solani)</option>
              <option value="Leaf Blast">Leaf Blast (Magnaporthe oryzae)</option>
              <option value="Apple Scab">Apple Scab (Venturia inaequalis)</option>
              <option value="Black Rot">Black Rot (Guignardia bidwellii)</option>
              <option value="Bacterial Blight">Bacterial Blight (Xanthomonas)</option>
            </select>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Intervention Strategy</label>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className={`filter-chip ${isBio ? 'active' : ''}`}
                style={{ flex: 1 }}
                onClick={() => setTreatmentType('bio')}
              >
                🌿 Biological / Bio
              </button>
              <button
                className={`filter-chip ${!isBio ? 'active' : ''}`}
                style={{ flex: 1 }}
                onClick={() => setTreatmentType('chem')}
              >
                🧪 Chemical / WP
              </button>
            </div>
          </div>
        </div>

        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h3 style={{ marginBottom: 16 }}>2. Calculated Prescription for {crop} ({disease})</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: 18, borderRadius: 12, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase' }}>Product Required</span>
              <h2 style={{ fontSize: '1.8rem', color: '#fff', marginTop: 4 }}>{totalProduct} {unit}</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>{productName}</p>
            </div>

            <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: 18, borderRadius: 12, border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>Water Carrier Tank</span>
              <h2 style={{ fontSize: '1.8rem', color: '#fff', marginTop: 4 }}>{totalWater} Liters</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>At {waterPerHa} L/ha spray volume</p>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: 18, borderRadius: 12, border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: 700, textTransform: 'uppercase' }}>Estimated Material Cost</span>
              <h2 style={{ fontSize: '1.8rem', color: '#fff', marginTop: 4 }}>${totalCost}</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>At ${unitPrice}/{unit.toLowerCase()}</p>
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.25)', padding: 20, borderRadius: 12 }}>
            <h4 style={{ color: 'var(--accent-emerald)', marginBottom: 10 }}>Standard Application Guidelines:</h4>
            <ul style={{ paddingLeft: 20, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              <li>Fill spray tank with 50% water before mixing {productName}. Maintain continuous agitation.</li>
              <li>Calibrate pressure nozzles to 2.5-3.0 bar to generate fine-medium droplets avoiding drift.</li>
              <li>Target complete coverage of both adaxial (upper) and abaxial (lower) foliar surfaces.</li>
              <li>Re-entry Interval (REI): 4 hours for biological; 24 hours for chemical formulation.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};