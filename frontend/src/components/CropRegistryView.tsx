import React, { useState } from 'react';

interface Props {
  onSelectCropForDiagnosis: (cropName: string) => void;
}

export const CropRegistryView: React.FC<Props> = ({ onSelectCropForDiagnosis }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const crops = [
    { id: 1, name: 'Apple', scientific: 'Malus domestica', category: 'Fruit', diseases: 4, stages: 'Bloom to Fruit Set', duration: '150-180 days', temp: '15-25°C', icon: '🍏', commonDiseases: ['Apple Scab', 'Black Rot', 'Cedar Apple Rust'] },
    { id: 2, name: 'Cassava', scientific: 'Manihot esculenta', category: 'Tuber', diseases: 5, stages: 'Vegetative to Root Bulking', duration: '240-360 days', temp: '25-32°C', icon: '🌿', commonDiseases: ['Bacterial Blight (CBB)', 'Brown Streak (CBSD)', 'Mosaic Disease (CMD)'] },
    { id: 3, name: 'Cherry', scientific: 'Prunus avium', category: 'Fruit', diseases: 2, stages: 'Flowering & Ripening', duration: '60-90 days', temp: '18-24°C', icon: '🍒', commonDiseases: ['Powdery Mildew', 'Leaf Spot'] },
    { id: 4, name: 'Corn (Maize)', scientific: 'Zea mays', category: 'Cereal', diseases: 4, stages: 'Tasseling & Grain Fill', duration: '90-120 days', temp: '20-30°C', icon: '🌽', commonDiseases: ['Common Rust', 'Northern Leaf Blight', 'Cercospora Gray Leaf Spot'] },
    { id: 5, name: 'Grape', scientific: 'Vitis vinifera', category: 'Fruit', diseases: 4, stages: 'Veraison to Harvest', duration: '120-150 days', temp: '20-28°C', icon: '🍇', commonDiseases: ['Black Rot', 'Esca (Black Measles)', 'Leaf Blight (Isariopsis)'] },
    { id: 6, name: 'Orange', scientific: 'Citrus sinensis', category: 'Citrus', diseases: 1, stages: 'Fruit Sizing & Maturation', duration: '240-300 days', temp: '22-34°C', icon: '🍊', commonDiseases: ['Huanglongbing (Citrus Greening)'] },
    { id: 7, name: 'Peach', scientific: 'Prunus persica', category: 'Fruit', diseases: 2, stages: 'Pit Hardening to Harvest', duration: '90-120 days', temp: '18-26°C', icon: '🍑', commonDiseases: ['Bacterial Spot', 'Leaf Curl'] },
    { id: 8, name: 'Pepper (Bell)', scientific: 'Capsicum annuum', category: 'Vegetable', diseases: 2, stages: 'Flowering & Fruiting', duration: '75-90 days', temp: '21-29°C', icon: '🫑', commonDiseases: ['Bacterial Spot', 'Anthracnose'] },
    { id: 9, name: 'Potato', scientific: 'Solanum tuberosum', category: 'Tuber', diseases: 3, stages: 'Tuber Initiation & Bulking', duration: '90-120 days', temp: '15-20°C', icon: '🥔', commonDiseases: ['Early Blight', 'Late Blight (Phytophthora)'] },
    { id: 10, name: 'Rice', scientific: 'Oryza sativa', category: 'Cereal', diseases: 4, stages: 'Tillering & Panicle Initiation', duration: '105-150 days', temp: '22-32°C', icon: '🌾', commonDiseases: ['Leaf Blast', 'Brown Spot', 'Rice Hispa'] },
    { id: 11, name: 'Squash', scientific: 'Cucurbita pepo', category: 'Vegetable', diseases: 1, stages: 'Vining & Fruit Development', duration: '50-70 days', temp: '20-28°C', icon: '🎃', commonDiseases: ['Powdery Mildew'] },
    { id: 12, name: 'Strawberry', scientific: 'Fragaria ananassa', category: 'Fruit', diseases: 2, stages: 'Runner Growth & Berry Set', duration: '60-80 days', temp: '16-24°C', icon: '🍓', commonDiseases: ['Leaf Scorch', 'Angular Leaf Spot'] },
    { id: 13, name: 'Tomato', scientific: 'Solanum lycopersicum', category: 'Vegetable', diseases: 10, stages: 'Vegetative to Ripening', duration: '70-95 days', temp: '20-27°C', icon: '🍅', commonDiseases: ['Early Blight', 'Late Blight', 'Leaf Mold', 'Septoria', 'Yellow Leaf Curl'] }
  ];

  const categories = ['All', 'Fruit', 'Vegetable', 'Cereal', 'Tuber', 'Citrus'];

  const filtered = crops.filter(c => {
    const matchCat = filter === 'All' || c.category === filter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.scientific.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      <div className="page-header">
        <h1>🌾 Agricultural Crop Registry</h1>
        <p>Comprehensive monitoring registry for 14 essential food and cash crop species with active pathology profiles.</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search crop by name, scientific binomial, or family..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-chip ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-3">
        {filtered.map(crop => (
          <div key={crop.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 36 }}>{crop.icon}</span>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{crop.name}</h3>
                    <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{crop.scientific}</p>
                  </div>
                </div>
                <span className="badge badge-info">{crop.category}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: 10, margin: '14px 0', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Growth Cycle:</span>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{crop.duration}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Ideal Temp:</span>
                  <div style={{ fontWeight: 600, color: 'var(--accent-emerald)' }}>{crop.temp}</div>
                </div>
              </div>

              <div style={{ marginTop: 10 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }}>Monitored Diseases ({crop.diseases}):</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                  {crop.commonDiseases.map((d, i) => (
                    <span key={i} style={{ background: 'rgba(255,255,255,0.06)', padding: '3px 8px', borderRadius: 6, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>● Active Monitoring</span>
              <button
                className="btn-primary"
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                onClick={() => onSelectCropForDiagnosis(crop.name)}
              >
                Scan {crop.name} 🔍
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};