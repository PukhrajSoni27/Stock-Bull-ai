# Stock Bull.ai

**Stock Bull.ai** is a sophisticated full-stack institutional equity intelligence web application that leverages machine learning to forecast same-day stock closing prices. The system synthesizes real-time Yahoo Finance data, 12+ macro technical indicators, fundamental metrics, and advanced regression models (XGBoost with scikit-learn Gradient Boosting fallback) to deliver institutional-grade market predictions.

**Tagline:** Empirical foresight. Disciplined investing.

---

## 🚀 Key Features

### Frontend & Design System
- **Heritage Olive & Champagne Beige Theme**: Bespoke private wealth management and institutional trading desk aesthetic.
- **Editorial Typography**: Pairing serif headlines (`Newsreader`) with precision financial monospace (`JetBrains Mono`) and modern sans-serif (`Plus Jakarta Sans`).
- **React 18 & Vite**: Lightning-fast development with Hot Module Replacement (HMR).
- **Tailwind CSS v4**: Theme tokens configured natively with zero linter warnings.
- **Recharts Integration**: Custom olive-gradient area fills, trajectory lines, and high-contrast tooltip styling.
- **Framer Motion**: Smooth staggered page transitions and micro-interactions.
- **Lucide Icons**: Crisp, modern icon suite.

### Machine Learning & Backend
- **FastAPI**: REST API with automatic OpenAPI documentation.
- **XGBoost & Gradient Boosting**: High-conviction time-series regression.
- **Yahoo Finance Telemetry**: Real-time intraday data with fallback mechanisms.
- **In-Memory TTL Cache**: Sub-second query responses with automatic caching.
- **Deterministic R² Holdout Validation**: Reliable confidence scores bounded by statistical rigor.

### Authentication & Resilient Ledger
- **Dual-Layer Authentication**: Full Firebase Auth integration (Email/Password & Google OAuth) with seamless offline local storage fallback.
- **Instant Demo Client Access**: One-click preview button on login page.
- **Audited History Ledger**: Cloud-synced Firestore ledger with automatic `localStorage` backup and CSV export.
- **Multi-Currency FX**: Native INR for Indian stocks (`.NS`, `.BO`) with automated USD→INR conversion for US securities.

---

## 📁 Project Architecture

```text
PBL/
├── backend/                          # FastAPI ML Service
│   ├── main.py                      # FastAPI app, CORS, POST /api/predict
│   ├── requirements.txt             # Python dependencies
│   ├── ml/                          # Machine Learning Components
│   │   ├── __init__.py
│   │   └── predictor.py             # Features, train, predict, holdout R²
│   └── utils/                       # Utility Modules
│       ├── __init__.py
│       ├── cache.py                 # Simple TTL cache for market data
│       └── yahoo_chart.py           # Fallback Yahoo Finance API
├── frontend/                        # React Frontend
│   ├── src/
│   │   ├── components/              # UI Components
│   │   │   ├── AppLayout.jsx        # Top status bar & background layout
│   │   │   ├── Sidebar.jsx          # Collapsible navigation
│   │   │   ├── PriceForecastChart.jsx # Recharts price trajectory
│   │   │   ├── ChartPlaceholder.jsx # Signal dispersion demo chart
│   │   │   ├── Skeleton.jsx         # Loading skeleton states
│   │   │   ├── Spinner.jsx          # Loading spinner
│   │   │   └── ToastStack.jsx       # Notification system
│   │   ├── context/                 # Context Providers
│   │   │   ├── AuthContext.jsx      # Dual-layer authentication
│   │   │   ├── ThemeContext.jsx     # Permanent dark theme management
│   │   │   └── ToastContext.jsx     # Toast notifications
│   │   ├── pages/                   # Application Pages
│   │   │   ├── Landing.jsx          # Editorial landing page
│   │   │   ├── Login.jsx            # Terminal client sign-in
│   │   │   ├── Signup.jsx           # Institutional client registration
│   │   │   ├── Dashboard.jsx        # Executive intelligence dashboard
│   │   │   ├── Predict.jsx          # Valuation forecasting console
│   │   │   └── History.jsx          # Historical audit ledger
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx   # Route security wrapper
│   │   ├── services/
│   │   │   ├── api.js               # Backend API client
│   │   │   ├── firebase.js          # Resilient Firebase client
│   │   │   ├── predictions.js       # Dual-sync prediction ledger
│   │   │   ├── storage.js           # Local storage cache & persistence
│   │   │   └── formatInr.js         # Currency formatting utilities
│   │   ├── index.css                # Tailwind v4 theme & luxury utilities
│   │   └── main.jsx                 # Entry point
│   ├── package.json                 # Frontend dependencies
│   └── vite.config.js               # Vite proxy configuration
├── package.json                     # Workspace root delegate scripts
├── ARCHITECTURE.md                  # System architecture specifications
└── README.md                        # Documentation
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.10+ (3.11 tested)

### 1. Start Backend Server

```bash
cd PBL/backend
# Activate virtual environment
.\.venv\Scripts\activate   # Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
python main.py
```

The FastAPI server runs at **http://127.0.0.1:8000**
- Health check: `GET /api/health`
- Swagger docs: `http://127.0.0.1:8000/docs`

### 2. Start Frontend Application

In another terminal:

```bash
npm run dev
```

*(You can run `npm run dev` from the root workspace or `PBL` directory).*

The Vite server runs at **http://localhost:5173**

---

## 📡 API Documentation

### Forecast Endpoint

**POST** `/api/predict`

#### Request Body
```json
{
  "symbol": "AAPL"  // or "RELIANCE.NS", "TCS.BO"
}
```

#### Response Example
```json
{
  "prediction": 33568.53,
  "confidence": 0.82,
  "open": 33535.98,
  "prev_close": 33458.03,
  "currency": "INR",
  "fx_rate_to_inr": 86.42,
  "usd_converted": true,
  "as_of": "2026-11-16",
  "history_days": 504,
  "chart_series": [
    {
      "date": "2026-11-15",
      "close": 33458.03,
      "open": 33410.00
    }
  ],
  "r2_holdout": 0.82
}
```

---

## ⚠️ Regulatory Disclaimer

**Stock Bull.ai predictions are for educational, research, and evaluation purposes only.**

- **Not Investment Advisory**: Algorithmic outputs do not constitute personal financial or trading recommendations.
- **Past Performance**: Historical backtesting metrics do not guarantee future returns.
- Always perform independent due diligence or consult registered investment advisors before executing financial transactions.

---

© 2026 Stock Bull.ai. Built for Academic & Quantitative Research Excellence.

