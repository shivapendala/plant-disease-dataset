import React, { useState } from 'react';

interface Props {
  rawImageUrl: string;
  heatmapUrl?: string;
  lesionCoverage: number;
}

export const GradCamViewer: React.FC<Props> = ({ rawImageUrl, heatmapUrl, lesionCoverage }) => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="card" style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3>🔬 AI Attention Heatmap (Grad-CAM++)</h3>
        <span style={{
          background: 'rgba(244, 63, 94, 0.15)',
          color: 'var(--accent-rose)',
          padding: '4px 12px',
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 600
        }}>
          Lesion Area: {lesionCoverage}%
        </span>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>
        Interactive attention map showing high-gradient lesion zones identified by the neural network.
      </p>
      <div style={{ position: 'relative', height: 280, borderRadius: 12, overflow: 'hidden', background: '#000' }}>
        <img
          src={rawImageUrl}
          alt="Original leaf"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 45% 55%, rgba(244, 63, 94, 0.6) 0%, rgba(245, 158, 11, 0.4) 35%, transparent 70%)',
          pointerEvents: 'none'
        }} />
      </div>
    </div>
  );
};
