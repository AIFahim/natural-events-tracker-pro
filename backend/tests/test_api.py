import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root_endpoint():
    """Test root endpoint returns correct response"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "version" in data
    assert "docs" in data


def test_health_endpoint():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "service" in data
    assert "version" in data


def test_events_endpoint_structure():
    """Test events endpoint returns correct structure"""
    response = client.get("/api/v1/events?days=1")
    assert response.status_code in [200, 500]  # May fail if NASA API is down
    if response.status_code == 200:
        data = response.json()
        assert isinstance(data, list)


def test_events_endpoint_with_params():
    """Test events endpoint with query parameters"""
    response = client.get("/api/v1/events?days=7&limit=5")
    assert response.status_code in [200, 500]


def test_statistics_endpoint():
    """Test statistics endpoint"""
    response = client.get("/api/v1/events/statistics?days=7")
    assert response.status_code in [200, 500]
    if response.status_code == 200:
        data = response.json()
        assert "total_events" in data
        assert "events_by_category" in data


def test_invalid_event_id():
    """Test fetching non-existent event"""
    response = client.get("/api/v1/events/INVALID_ID_12345")
    assert response.status_code in [404, 500]