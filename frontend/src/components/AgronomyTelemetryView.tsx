import React, { useState } from 'react';

export const AgronomyTelemetryView: React.FC = () => {
  const [temp, setTemp] = useState(24);
  const [humidity, setHumidity] = useState(88);
  const [wetness, setWetness] = useState(8);

  // Compute live infection risk index based on Mills Period / Blightcast algorithm
  let riskScore = 0.1;
  if (temp >= 16 && temp <= 27) {
    if (humidity >= 85) riskScore += 0.5;
    else if (humidity >= 70) riskScore += 0.3;
  }
  if (wetness >= 6) riskScore += 0.35;
  riskScore = Math.min(0.99, riskScore);

  let riskLevel = 'Low';
  let badgeClass = 'badge-success';
  let advisory = 'Environmental conditions are unfavorable for fungal sporulation. Routine scouting recommended.';

  if (riskScore >= 0.75) {
    riskLevel = 'Critical Sporulation Risk';
    badgeClass = 'badge-danger';
    advisory = 'High atmospheric moisture + optimal canopy temperature detected. Immediate preventive bio-fungicide or copper spray advised before next rain event.';
  } else if (riskScore >= 0.45) {
    riskLevel = 'Moderate Risk';
    badgeClass = 'badge-warning';
    advisory = 'Moderate humidity. Monitor susceptible crops (Tomato, Potato, Grape) for early lesion development.';
  }

  return (
    <div>
      <div className="page-header">
        <h1>📊 Microclimate Telemetry & Disease Risk Radar</h1>
        <p>Real-time epidemiological risk modeling based on continuous canopy temperature, relative humidity, and leaf wetness hours.</p>
      </div>

      <div className="grid-3" style={{ marginBottom: 32 }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Air Temperature</span>
            <span style={{ fontSize: 24 }}>🌡️</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', margin: '12px 0 6px', color: '#fff' }}>{temp}°C</h2>
          <input
            type="range"
            min="10"
            max="40"
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
            <span>10°C (Cold)</span>
            <span>40°C (Heatwave)</span>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Relative Humidity</span>
            <span style={{ fontSize: 24 }}>💧</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', margin: '12px 0 6px', color: 'var(--accent-cyan)' }}>{humidity}%</h2>
          <input
            type="range"
            min="30"
            max="100"
            value={humidity}
            onChange={(e) => setHumidity(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
            <span>30% (Dry)</span>
            <span>100% (Saturated)</span>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Continuous Leaf Wetness</span>
            <span style={{ fontSize: 24 }}>🌿</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', margin: '12px 0 6px', color: 'var(--accent-lime)' }}>{wetness} Hours</h2>
          <input
            type="range"
            min="0"
            max="24"
            value={wetness}
            onChange={(e) => setWetness(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-lime)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
            <span>0h (Dry Canopy)</span>
            <span>24h (Prolonged Dew)</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ border: `1px solid ${riskScore >= 0.75 ? 'var(--accent-rose)' : 'var(--border-color)'}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3>⚡ Live Epidemiological Risk Index</h3>
          <span className={`badge ${badgeClass}`} style={{ fontSize: '0.9rem', padding: '6px 14px' }}>
            {riskLevel} ({(riskScore * 100).toFixed(0)}%)
          </span>
        </div>

        <div style={{ height: 12, background: 'rgba(0,0,0,0.4)', borderRadius: 6, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{
            height: '100%',
            width: `${riskScore * 100}%`,
            background: riskScore >= 0.75 ? 'linear-gradient(90deg, #f59e0b, #f43f5e)' : 'linear-gradient(90deg, #10b981, #06b6d4)',
            transition: 'width 0.3s ease'
          }} />
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: 18, borderRadius: 12 }}>
          <h4 style={{ color: 'var(--accent-emerald)', marginBottom: 6 }}>💡 Automated Agronomist Advisory</h4>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{advisory}</p>
        </div>
      </div>
    </div>
  );
};