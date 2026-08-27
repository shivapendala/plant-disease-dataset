# FloraGuard AI - Enterprise Plant Pathology & Diagnostic Platform

FloraGuard AI is an enterprise-grade agricultural pathology, leaf lesion segmentation, and agronomic advisory platform. It utilizes Vision Transformers (ViT) and Squeeze-and-Excitation ResNet50 ensembling to classify 38+ plant diseases with over 98.4% diagnostic accuracy across 14 vital food security crop species.

---

## 🏛️ System Architecture

```
[ Field Drone / Mobile Scanner ] (React 18 / Vite / TypeScript)
               │
               ▼
   [ NGINX Reverse Proxy & SSL ]
               │
   ┌───────────┴───────────┐
   ▼                       ▼
[ FastAPI Core API ]   [ PyTorch Inference Engine ]
 - Multi-crop Registry  - Vision Transformer (ViT-B/16)
 - Dosage Engine        - SE-ResNet50 + EfficientNet-B4
 - Weather Telemetry    - Grad-CAM Lesion Heatmaps
   │                       │
   └───────────┬───────────┘
               ▼
   [ PostgreSQL 15 & Redis 7 ]
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+ & npm 9+
- Docker & Docker Compose

### 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shivapendala/plant-disease-dataset.git
   cd plant-disease-dataset
   ```

2. **Set up Python Virtual Environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Environment Setup:**
   ```bash
   cp .env.example .env
   ```

---

## 🔨 Build Instructions

### Build with Docker Compose:
```bash
docker-compose build
```

### Build Frontend Assets:
```bash
cd frontend
npm run build
cd ..
```

---

## ▶️ Running the Application

### Option A: Run Full Stack via Docker Compose (Recommended)
```bash
docker-compose up -d
```
Access the application:
- **Web Dashboard:** [http://localhost:3000](http://localhost:3000)
- **API Docs (Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Check:** [http://localhost:8000/healthz](http://localhost:8000/healthz)

### Option B: Run Locally for Development
1. **Start Backend API:**
   ```bash
   uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
   ```
2. **Start Frontend Dev Server:**
   ```bash
   cd frontend
   npm run dev
   ```

---

## 🧪 Testing & Quality Assurance

Run the comprehensive test suite with coverage report:
```bash
pytest --cov=backend --cov=ml_engine tests/ -v
```

---

## 📊 Dataset & Crop Coverage

The platform classifies **38 distinct pathology categories** across 14 crops:
- **Apple:** Scab, Black Rot, Cedar Apple Rust, Healthy
- **Cassava:** Bacterial Blight (CBB), Brown Streak (CBSD), Green Mottle (CGM), Healthy, Mosaic (CMD)
- **Cherry:** Powdery Mildew, Healthy
- **Corn (Maize):** Cercospora Gray Leaf Spot, Common Rust, Northern Leaf Blight, Healthy
- **Grape:** Black Rot, Esca (Black Measles), Leaf Blight, Healthy
- **Orange:** Citrus Greening (Huanglongbing)
- **Peach:** Bacterial Spot, Healthy
- **Pepper (Bell):** Bacterial Spot, Healthy
- **Potato:** Early Blight, Late Blight, Healthy
- **Rice:** Brown Spot, Leaf Blast, Hispa, Healthy
- **Squash:** Powdery Mildew
- **Strawberry:** Leaf Scorch, Healthy
- **Tomato:** Bacterial Spot, Early Blight, Late Blight, Leaf Mold, Septoria, Spider Mites, Target Spot, Mosaic Virus, Yellow Leaf Curl, Healthy

---

## 🔒 Security & Proprietary Notice
This software and its custom neural architectures are proprietary and confidential. No open-source license granted. All API keys and environment variables must be managed via secure secrets management.
