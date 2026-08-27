import React, { useState } from 'react';
import { DiagnosisDropzone } from './components/DiagnosisDropzone';
import { GradCamViewer } from './components/GradCamViewer';
import { DiagnosisResult } from './types';

export const App: React.FC = () => {
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2 style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: 8 }}>
          🌱 FloraGuard AI
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 24 }}>
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'flex-start' }}>🔍 Diagnostic Studio</button>
          <button style={{ background: 'transparent', color: 'var(--text-secondary)', border: 'none', padding: '12px 16px', textAlign: 'left', borderRadius: 8, cursor: 'pointer' }}>🌾 Crop Registry (14)</button>
          <button style={{ background: 'transparent', color: 'var(--text-secondary)', border: 'none', padding: '12px 16px', textAlign: 'left', borderRadius: 8, cursor: 'pointer' }}>📚 Disease Catalog (38)</button>
          <button style={{ background: 'transparent', color: 'var(--text-secondary)', border: 'none', padding: '12px 16px', textAlign: 'left', borderRadius: 8, cursor: 'pointer' }}>📊 Agronomy Telemetry</button>
        </nav>
      </aside>

      <main className="main-content">
        <header style={{ marginBottom: 32 }}>
          <h1>Plant Health & Leaf Disease Diagnostic Studio</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
            Real-time multi-spectral leaf lesion detection powered by Vision Transformers and ResNet50 ensembling.
          </p>
        </header>

        <DiagnosisDropzone onDiagnosisComplete={setDiagnosis} />

        {diagnosis && (
          <div style={{ marginTop: 32 }}>
            <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
              <div>
                <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Detected Crop</span>
                <h2 style={{ marginTop: 4 }}>{diagnosis.crop}</h2>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Condition</span>
                <h2 style={{ marginTop: 4, color: diagnosis.is_healthy ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                  {diagnosis.disease_name}
                </h2>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Confidence</span>
                <h2 style={{ marginTop: 4, color: 'var(--accent-cyan)' }}>
                  {(diagnosis.confidence * 100).toFixed(1)}%
                </h2>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Latency</span>
                <h2 style={{ marginTop: 4 }}>{diagnosis.inference_latency_ms} ms</h2>
              </div>
            </div>

            <GradCamViewer
              rawImageUrl={diagnosis.image_url}
              heatmapUrl={diagnosis.heatmap_url}
              lesionCoverage={diagnosis.lesion_coverage_percent}
            />

            <div className="card" style={{ marginTop: 24 }}>
              <h3>🧪 Recommended Treatment Protocol</h3>
              <p style={{ color: 'var(--text-primary)', marginTop: 12, lineHeight: 1.6 }}>
                {diagnosis.treatment_preview}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default App;
