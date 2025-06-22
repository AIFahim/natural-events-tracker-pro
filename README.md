# 🌍 Natural Events Tracker Pro

> **🏆 NASA Space Apps Challenge 2020 - Global Nominee**  
> **Challenge**: Data Discovery for Earth Science  
> **Team**: SiliconLily - Sylhet  
> **Original Project**: [Environmental Natural Events Discovery](https://2020.spaceappschallenge.org/challenges/connect/data-discovery-earth-science/teams/siliconlily/project)

## Project Background

This project was originally created for the NASA Space Apps Challenge 2020 as "Environmental Natural Events Discovery" by Team SiliconLily. It addresses the challenge of creating a tool to guide users to relevant datasets for studying specific natural events using NASA's Earth Observatory data.

NASA tracks natural events worldwide using satellites, and this platform empowers users by providing a centralized location to visualize and learn about these events. By making this information accessible, we enable communities to take informed actions together.

### Awards & Nominations
SiliconLily has received the following awards and nominations:

🏆 **Global Nominee** - NASA Space Apps Challenge 2020
- Category: Connect
- Challenge: Data Discovery for Earth Science
- Recognition: Selected as Global Nominee among worldwide participants

### Original Achievement
- Successfully created a user-friendly platform for real-time natural event tracking
- Integrated NASA's Earth Observatory Natural Event Tracker (EONET) API
- Provided researchers and the public with valuable environmental data
- Enabled communities to prepare for natural events through timely information

---

## About This Version

This is a professionally refactored version of the original Space Apps Challenge project, featuring:
- Modern React with TypeScript
- FastAPI Python backend
- Enhanced visualization and user experience
- Production-ready architecture

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![React](https://img.shields.io/badge/react-19.0+-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-4.9+-blue.svg)

## 🚀 Features

- **Real-time Event Tracking**: Monitor natural events worldwide with data updated from NASA's EONET API
- **Interactive Map Visualization**: View events on an interactive Leaflet map with custom markers
- **Event Categories**: Track wildfires, volcanoes, severe storms, and sea/lake ice events
- **Statistical Analysis**: Visualize event distribution with interactive charts
- **Filtering & Search**: Filter events by category and time period
- **Responsive Design**: Fully responsive UI that works on desktop and mobile devices
- **Performance Optimized**: Redis caching for improved performance
- **Type Safety**: Full TypeScript support on frontend with Pydantic validation on backend

## 📸 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Main Dashboard
The application displays natural events on an interactive map with statistics.

### Event List
Browse through all events with filtering capabilities.

### Event Details
Click on any marker to view detailed information about the event.

</details>

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **React Leaflet** for map visualization
- **Chart.js** for data visualization
- **Axios** for API communication
- **CSS Modules** for styling

### Backend
- **FastAPI** (Python) - Modern async web framework
- **Pydantic** - Data validation
- **httpx** - Async HTTP client
- **Redis** - Caching (optional)
- **uvicorn** - ASGI server

## 📋 Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn
- Redis (optional, for caching)

## 🚀 Quick Start

### Option 1: Using Conda (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/AIFahim/natural-events-tracker-pro.git
cd natural-events-tracker-pro
```

2. Run the setup script:
```bash
./setup-conda.sh
```

3. Start the backend:
```bash
conda activate natural-events-backend
cd backend
python run.py
```

4. Start the frontend (new terminal):
```bash
conda activate natural-events-frontend
cd frontend
npm start
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python run.py
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Option 3: Docker

```bash
docker-compose up
```

## 🔧 Configuration

### Backend Configuration

Create a `.env` file in the backend directory:

```env
# Application
APP_NAME="Natural Events Tracker API"
VERSION="1.0.0"
DEBUG=False

# API Configuration
NASA_EONET_API_URL="https://eonet.gsfc.nasa.gov/api/v3/events"
DEFAULT_DAYS=30

# CORS
ALLOWED_ORIGINS=["http://localhost:3000"]

# Cache (optional)
REDIS_URL=redis://localhost:6379/0
CACHE_TTL=3600
```

### Frontend Configuration

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8000/api/v1
```

## 📚 API Documentation

Once the backend is running, visit:
- Interactive docs: http://localhost:8000/api/v1/docs
- Alternative docs: http://localhost:8000/api/v1/redoc

### Main Endpoints

- `GET /api/v1/events` - Get all events
  - Query params: `days`, `category`, `status`, `limit`
- `GET /api/v1/events/{event_id}` - Get specific event
- `GET /api/v1/events/statistics` - Get event statistics

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Building for Production

### Backend
```bash
cd backend
# Use production ASGI server
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with any static server
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- NASA EONET API for providing real-time natural event data
- OpenStreetMap for map tiles
- Icons8 for event icons
- NASA Space Apps Challenge for the opportunity and recognition