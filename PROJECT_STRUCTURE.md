# Project Structure

```
natural-events-tracker-pro/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD pipeline configuration
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── __init__.py
│   │   │       └── events.py   # API endpoints
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   └── config.py       # Application configuration
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── event.py        # Pydantic models
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── cache.py        # Redis caching service
│   │   │   └── nasa_api.py     # NASA API client
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   └── statistics.py   # Event statistics utilities
│   │   ├── __init__.py
│   │   └── main.py             # FastAPI application
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_api.py         # API tests
│   ├── .env.example            # Environment variables template
│   ├── Dockerfile              # Docker configuration
│   ├── requirements.txt        # Python dependencies
│   └── run.py                  # Application entry point
├── frontend/
│   ├── public/
│   │   ├── icons/              # Event type icons
│   │   └── index.html          # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Charts/
│   │   │   │   ├── EventStatistics.tsx
│   │   │   │   └── EventStatistics.module.css
│   │   │   ├── Error/
│   │   │   │   ├── ErrorMessage.tsx
│   │   │   │   └── ErrorMessage.module.css
│   │   │   ├── ErrorBoundary/
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   └── ErrorBoundary.module.css
│   │   │   ├── Events/
│   │   │   │   ├── EventCard.tsx
│   │   │   │   ├── EventCard.module.css
│   │   │   │   ├── EventList.tsx
│   │   │   │   └── EventList.module.css
│   │   │   ├── Layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Header.module.css
│   │   │   ├── Loading/
│   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   └── LoadingSpinner.module.css
│   │   │   └── Map/
│   │   │       ├── EventMap.tsx
│   │   │       └── EventMap.module.css
│   │   ├── constants/
│   │   │   └── index.ts        # Application constants
│   │   ├── hooks/
│   │   │   └── useNaturalEvents.ts  # Custom React hooks
│   │   ├── services/
│   │   │   └── api.service.ts  # API service layer
│   │   ├── styles/
│   │   │   └── global.css      # Global styles
│   │   ├── types/
│   │   │   └── index.ts        # TypeScript type definitions
│   │   ├── utils/
│   │   │   └── eventHelpers.ts # Utility functions
│   │   ├── App.tsx             # Main application component
│   │   ├── App.module.css      # App-specific styles
│   │   ├── index.tsx           # Application entry point
│   │   └── react-app-env.d.ts  # TypeScript declarations
│   ├── .gitignore
│   ├── Dockerfile              # Docker configuration
│   ├── package.json            # Node.js dependencies
│   ├── package-lock.json
│   └── tsconfig.json           # TypeScript configuration
├── .gitignore                  # Git ignore rules
├── docker-compose.yml          # Docker Compose configuration
├── environment.yml             # Conda environment (all-in-one)
├── environment-backend.yml     # Conda environment (backend only)
├── environment-frontend.yml    # Conda environment (frontend only)
├── LICENSE                     # MIT License
├── PROJECT_STRUCTURE.md        # This file
├── README.md                   # Project documentation
├── setup.py                    # Python setup script
├── setup.sh                    # Shell setup script
└── setup-conda.sh             # Conda setup script
```

## Key Design Decisions

### Backend Architecture
- **FastAPI**: Modern async Python web framework
- **Service Layer**: Separation of concerns with dedicated services
- **Pydantic Models**: Strong type validation
- **Async/Await**: Non-blocking I/O operations
- **Redis Caching**: Optional performance optimization

### Frontend Architecture
- **TypeScript**: Type safety throughout the application
- **React Hooks**: Modern functional components
- **CSS Modules**: Scoped styling to prevent conflicts
- **Service Layer**: Centralized API communication
- **Custom Hooks**: Reusable logic extraction

### Code Organization
- **Modular Structure**: Clear separation of concerns
- **Consistent Naming**: Professional naming conventions
- **Type Safety**: Full typing on both frontend and backend
- **Error Handling**: Comprehensive error boundaries and handling
- **Testing**: Unit tests for critical functionality