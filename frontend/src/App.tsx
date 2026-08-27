import React, { useState } from 'react';
import { DiagnosisStudioView } from './components/DiagnosisStudioView';
import { CropRegistryView } from './components/CropRegistryView';
import { DiseaseCatalogView } from './components/DiseaseCatalogView';
import { AgronomyTelemetryView } from './components/AgronomyTelemetryView';
import { TreatmentCalculatorView } from './components/TreatmentCalculatorView';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'studio' | 'crops' | 'catalog' | 'telemetry' | 'calculator'>('studio');
  const [cropHint, setCropHint] = useState<string | undefined>(undefined);

  const handleSelectCropForDiagnosis = (cropName: string) => {
    setCropHint(cropName);
    setActiveTab('studio');
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span style={{ fontSize: '1.6rem' }}>🌱</span>
          <div>
            <div>FloraGuard AI</div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: 0.5 }}>ENTERPRISE PATHOLOGY</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'studio' ? 'active' : ''}`}
            onClick={() => setActiveTab('studio')}
          >
            <span>🔍</span>
            <span>Diagnostic Studio</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'crops' ? 'active' : ''}`}
            onClick={() => setActiveTab('crops')}
          >
            <span>🌾</span>
            <span>Crop Registry (14)</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            <span>📚</span>
            <span>Disease Catalog (38)</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'telemetry' ? 'active' : ''}`}
            onClick={() => setActiveTab('telemetry')}
          >
            <span>📊</span>
            <span>Agronomy Telemetry</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            <span>🧪</span>
            <span>Dosage Calculator</span>
          </button>
        </nav>

        <div style={{ marginTop: 'auto', background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
            <span style={{ height: 8, width: 8, borderRadius: '50%', background: 'var(--accent-emerald)', display: 'inline-block' }}></span>
            <span>AI Neural Engine Active</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Vision Transformer (ViT) & SE-ResNet50 Ensemble (98.4% Accuracy)
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'studio' && (
          <DiagnosisStudioView
            initialCropHint={cropHint}
            onNavigateToCalculator={() => setActiveTab('calculator')}
          />
        )}
        {activeTab === 'crops' && (
          <CropRegistryView onSelectCropForDiagnosis={handleSelectCropForDiagnosis} />
        )}
        {activeTab === 'catalog' && <DiseaseCatalogView />}
        {activeTab === 'telemetry' && <AgronomyTelemetryView />}
        {activeTab === 'calculator' && <TreatmentCalculatorView />}
      </main>
    </div>
  );
};

export default App;