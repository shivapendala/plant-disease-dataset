import React, { useState, useRef } from 'react';
import { scanLeafImage } from '../services/api';
import { DiagnosisResult } from '../types';

interface Props {
  onDiagnosisComplete: (res: DiagnosisResult) => void;
}

export const DiagnosisDropzone: React.FC<Props> = ({ onDiagnosisComplete }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    try {
      const result = await scanLeafImage(file);
      onDiagnosisComplete(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
        }}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragActive ? 'var(--accent-emerald)' : 'var(--border-color)'}`,
          borderRadius: 16,
          padding: '48px 24px',
          cursor: 'pointer',
          background: dragActive ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
          transition: 'all 0.2s'
        }}
      >
        {preview ? (
          <img src={preview} alt="Leaf Preview" style={{ maxHeight: 240, borderRadius: 12, marginBottom: 16 }} />
        ) : (
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
        )}
        <h3>{loading ? 'Analyzing Pathology via ViT & ResNet...' : 'Drop Crop Leaf Image Here or Click to Upload'}</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
          Supports 38+ plant disease classes across Cassava, Rice, Apple, Tomato, Corn, Grape and more.
        </p>
      </div>
    </div>
  );
};
