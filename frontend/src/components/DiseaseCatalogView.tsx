import React, { useState } from 'react';

export const DiseaseCatalogView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [pathogenFilter, setPathogenFilter] = useState('All');
  const [selectedDisease, setSelectedDisease] = useState<any | null>(null);

  const diseases = [
    { id: 1, crop: 'Apple', name: 'Apple Scab', scientific: 'Venturia inaequalis', pathogen: 'Fungal', severity: 'High', symptoms: ['Olive-green velvety spots on leaves', 'Dark brown circular lesions on fruit', 'Premature leaf drop'], organic: 'Apply Sulfur-based fungicide or Bacillus subtilis foliar spray.', chemical: 'Captan 50 WP or Difenoconazole 25% EC.', yieldLoss: '30-70% if untreated' },
    { id: 2, crop: 'Apple', name: 'Black Rot', scientific: 'Botryosphaeria obtusa', pathogen: 'Fungal', severity: 'High', symptoms: ['Frog-eye leaf spots with purple margins', 'Black mummified rot on fruit', 'Cankers on branches'], organic: 'Prune infected cankers and apply copper sulfate.', chemical: 'Thiophanate-methyl or Mancozeb 75 WP.', yieldLoss: '25-50%' },
    { id: 3, crop: 'Apple', name: 'Cedar Apple Rust', scientific: 'Gymnosporangium juniperi-virginianae', pathogen: 'Fungal', severity: 'Moderate', symptoms: ['Bright yellow-orange spots on upper leaf surface', 'Tube-like aecial spore structures below leaves'], organic: 'Remove nearby Eastern red cedar alternate hosts.', chemical: 'Myclobutanil or Azoxystrobin.', yieldLoss: '15-30%' },
    { id: 4, crop: 'Cassava', name: 'Bacterial Blight (CBB)', scientific: 'Xanthomonas phaseoli pv. manihotis', pathogen: 'Bacterial', severity: 'Critical', symptoms: ['Angular water-soaked leaf spots', 'Bacterial gum exudation on green stems', 'Dieback of shoot tips'], organic: 'Use disease-free stem cuttings and intercrop with maize.', chemical: 'Copper hydroxide foliar bactericide.', yieldLoss: '50-90%' },
    { id: 5, crop: 'Cassava', name: 'Brown Streak Disease (CBSD)', scientific: 'Cassava brown streak virus (CBSV)', pathogen: 'Viral', severity: 'Critical', symptoms: ['Feathery chlorosis along secondary leaf veins', 'Brown necrotic dry rot in storage roots'], organic: 'Plant certified virus-free elite cuttings and control whitefly vector.', chemical: 'No direct virucide; apply Acetamiprid for whitefly control.', yieldLoss: '70-100%' },
    { id: 6, crop: 'Cassava', name: 'Mosaic Disease (CMD)', scientific: 'Cassava mosaic geminivirus', pathogen: 'Viral', severity: 'Critical', symptoms: ['Severe leaf distortion and mosaic variegation', 'Stunted plant growth and reduced tuberization'], organic: 'Roguing infected plants within first 60 days.', chemical: 'Vector management via systemic insecticides.', yieldLoss: '40-80%' },
    { id: 7, crop: 'Corn (Maize)', name: 'Common Rust', scientific: 'Puccinia sorghi', pathogen: 'Fungal', severity: 'Moderate', symptoms: ['Golden-brown to cinnamon-brown powdery pustules on both leaf surfaces', 'Premature leaf chlorosis'], organic: 'Plant resistant corn hybrids; apply bio-fungicides.', chemical: 'Pyraclostrobin or Propiconazole at tassel emergence.', yieldLoss: '10-25%' },
    { id: 8, crop: 'Corn (Maize)', name: 'Northern Leaf Blight', scientific: 'Setosphaeria turcica', pathogen: 'Fungal', severity: 'High', symptoms: ['Long elliptical grayish-green cigar-shaped lesions (2-15 cm)', 'Extensive photosynthetic tissue destruction'], organic: 'Deep tillage of residue and crop rotation with legumes.', chemical: 'Azoxystrobin + Difenoconazole formulation.', yieldLoss: '30-50%' },
    { id: 9, crop: 'Grape', name: 'Black Rot', scientific: 'Guignardia bidwellii', pathogen: 'Fungal', severity: 'Critical', symptoms: ['Small circular reddish-brown leaf spots with black pycnidia', 'Shriveled black hard mummified berries'], organic: 'Canopy thinning for airflow and Bordeaux mixture.', chemical: 'Mancozeb or Kresoxim-methyl.', yieldLoss: '50-100%' },
    { id: 10, crop: 'Grape', name: 'Esca (Black Measles)', scientific: 'Phaeomoniella chlamydospora', pathogen: 'Fungal', severity: 'High', symptoms: ['Tiger-stripe interveinal necrosis on leaves', 'Dark purple punctate spots on fruit skin'], organic: 'Seal large pruning wounds with Trichoderma paste.', chemical: 'Fosetyl-Al soil and foliar drench.', yieldLoss: '30-60%' },
    { id: 11, crop: 'Orange', name: 'Huanglongbing (Citrus Greening)', scientific: 'Candidatus Liberibacter asiaticus', pathogen: 'Bacterial', severity: 'Critical', symptoms: ['Asymmetric blotchy mottle on leaves', 'Lopsided bitter fruit with aborted seeds', 'Yellow shoots in canopy'], organic: 'Eradicate infected trees and introduce Tamarixia radiata parasitoids.', chemical: 'Control Asian citrus psyllid with Imidacloprid.', yieldLoss: '80-100%' },
    { id: 12, crop: 'Potato', name: 'Early Blight', scientific: 'Alternaria solani', pathogen: 'Fungal', severity: 'Moderate', symptoms: ['Concentric dark brown target-like rings on older leaves', 'Yellowing chlorotic halos around lesions'], organic: 'Maintain optimal nitrogen nutrition and mulch.', chemical: 'Chlorothalonil or Chlorothalonil + Metalaxyl.', yieldLoss: '20-40%' },
    { id: 13, crop: 'Potato', name: 'Late Blight', scientific: 'Phytophthora infestans', pathogen: 'Fungal', severity: 'Critical', symptoms: ['Rapidly expanding water-soaked dark lesions', 'White downy fungal growth on underside in humid air'], organic: 'Copper oxychloride preventative spray before rain.', chemical: 'Cymoxanil + Mancozeb or Dimethomorph.', yieldLoss: '70-100%' },
    { id: 14, crop: 'Rice', name: 'Leaf Blast', scientific: 'Magnaporthe oryzae', pathogen: 'Fungal', severity: 'Critical', symptoms: ['Diamond or spindle-shaped lesions with gray centers and brown borders', 'Neck blast causing white heads'], organic: 'Avoid excessive nitrogen fertilization and maintain floodwater level.', chemical: 'Tricyclazole 75 WP or Isoprothiolane 40 EC.', yieldLoss: '40-80%' },
    { id: 15, crop: 'Rice', name: 'Brown Spot', scientific: 'Bipolaris oryzae', pathogen: 'Fungal', severity: 'High', symptoms: ['Oval dark brown spots with yellow halos uniformly distributed over leaf blade'], organic: 'Seed treatment with Trichoderma and balanced potassium.', chemical: 'Carbendazim + Mancozeb combination.', yieldLoss: '15-45%' },
    { id: 16, crop: 'Tomato', name: 'Late Blight', scientific: 'Phytophthora infestans', pathogen: 'Fungal', severity: 'Critical', symptoms: ['Large irregular water-soaked pale green to brown lesions', 'White sporulation on lower leaf surface', 'Firm brown fruit rot'], organic: 'Copper sulfate + lime (Bordeaux mixture).', chemical: 'Mandipropamid or Fenamidone.', yieldLoss: '80-100%' },
    { id: 17, crop: 'Tomato', name: 'Early Blight', scientific: 'Alternaria linariae', pathogen: 'Fungal', severity: 'Moderate', symptoms: ['Collar rot on stems and concentric target spots on foliage'], organic: 'Crop rotation and drip irrigation.', chemical: 'Azoxystrobin or Difenoconazole.', yieldLoss: '20-50%' },
    { id: 18, crop: 'Tomato', name: 'Tomato Yellow Leaf Curl', scientific: 'TYLCV (Begomovirus)', pathogen: 'Viral', severity: 'Critical', symptoms: ['Upward curling and cupping of leaf margins', 'Severe interveinal chlorosis and bush-like stunting'], organic: 'Reflective silver mulches to repel whitefly vectors.', chemical: 'Systemic neonicotinoids for whitefly suppression.', yieldLoss: '60-100%' },
    { id: 19, crop: 'Tomato', name: 'Bacterial Spot', scientific: 'Xanthomonas perforans', pathogen: 'Bacterial', severity: 'High', symptoms: ['Small dark water-soaked spots with yellow halo and greasy appearance'], organic: 'Copper + Mancozeb bactericide spray.', chemical: 'Streptomycin sulfate or Copper Hydroxide.', yieldLoss: '30-60%' },
    { id: 20, crop: 'Squash', name: 'Powdery Mildew', scientific: 'Podosphaera xanthii', pathogen: 'Fungal', severity: 'Moderate', symptoms: ['White talcum-powder-like fungal patches on leaf surfaces'], organic: 'Potassium bicarbonate (3g/L) or neem oil spray.', chemical: 'Triflumizole or Myclobutanil.', yieldLoss: '20-40%' }
  ];

  const pathogens = ['All', 'Fungal', 'Bacterial', 'Viral'];

  const filtered = diseases.filter(d => {
    const matchPathogen = pathogenFilter === 'All' || d.pathogen === pathogenFilter;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.crop.toLowerCase().includes(search.toLowerCase()) || d.scientific.toLowerCase().includes(search.toLowerCase());
    return matchPathogen && matchSearch;
  });

  return (
    <div>
      <div className="page-header">
        <h1>📚 Plant Disease Pathology Encyclopedia</h1>
        <p>Scientific diagnostics, cellular lesion characteristics, and integrated pest management (IPM) protocols for 38+ plant diseases.</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search by disease name, host crop, or pathogen species..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {pathogens.map(p => (
            <button
              key={p}
              className={`filter-chip ${pathogenFilter === p ? 'active' : ''}`}
              onClick={() => setPathogenFilter(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-3">
        {filtered.map(d => (
          <div key={d.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600, textTransform: 'uppercase' }}>{d.crop}</span>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', marginTop: 2 }}>{d.name}</h3>
                  <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{d.scientific}</p>
                </div>
                <span className={`badge ${d.severity === 'Critical' ? 'badge-danger' : (d.severity === 'High' ? 'badge-warning' : 'badge-info')}`}>
                  {d.severity}
                </span>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: 10, margin: '14px 0' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Key Symptoms:</span>
                <ul style={{ paddingLeft: 18, marginTop: 6, fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {d.symptoms.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div style={{ fontSize: '0.85rem', marginBottom: 6 }}>
                <strong style={{ color: 'var(--accent-emerald)' }}>🌿 Organic Remedy: </strong>
                <span style={{ color: 'var(--text-secondary)' }}>{d.organic}</span>
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <strong style={{ color: 'var(--accent-cyan)' }}>🧪 Chemical Control: </strong>
                <span style={{ color: 'var(--text-secondary)' }}>{d.chemical}</span>
              </div>
            </div>

            <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-rose)', fontWeight: 600 }}>Yield Impact: {d.yieldLoss}</span>
              <button
                className="btn-outline"
                style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                onClick={() => setSelectedDisease(d)}
              >
                Inspect Protocol
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedDisease && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: 20
        }}>
          <div className="card" style={{ maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid var(--accent-emerald)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <span className="badge badge-success">{selectedDisease.crop}</span>
                <h2 style={{ fontSize: '1.6rem', marginTop: 6 }}>{selectedDisease.name}</h2>
                <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>{selectedDisease.scientific}</p>
              </div>
              <button
                onClick={() => setSelectedDisease(null)}
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.95rem', lineHeight: 1.6 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 10 }}>
                <strong>Pathogen Class:</strong> {selectedDisease.pathogen} (Severity: {selectedDisease.severity})
              </div>
              <div>
                <h4 style={{ color: 'var(--accent-emerald)', marginBottom: 6 }}>Diagnostic Field Symptoms</h4>
                <ul style={{ paddingLeft: 20 }}>
                  {selectedDisease.symptoms.map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                <h4 style={{ color: 'var(--accent-lime)', marginBottom: 6 }}>Biological / Organic Management</h4>
                <p>{selectedDisease.organic}</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--accent-cyan)', marginBottom: 6 }}>Chemical Intervention Protocol</h4>
                <p>{selectedDisease.chemical}</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--accent-rose)', marginBottom: 6 }}>Expected Economic Impact</h4>
                <p>{selectedDisease.yieldLoss}</p>
              </div>
            </div>

            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <button className="btn-primary" onClick={() => setSelectedDisease(null)}>Close Inspection</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};