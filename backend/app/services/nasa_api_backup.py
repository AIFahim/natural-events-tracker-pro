import httpx
from typing import Optional, List
from datetime import datetime, timedelta
import logging
from app.models.event import NaturalEvent, EventsResponse
from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


class NASAApiService:
    def __init__(self):
        self.base_url = settings.NASA_EONET_API_URL
        self.timeout = httpx.Timeout(30.0)
        # Use HTTP client with custom settings for WSL
        self.client_options = {
            'timeout': self.timeout,
            'verify': False,  # Temporarily disable SSL verification
            'follow_redirects': True
        }
        
    async def fetch_events(
        self, 
        days: int = settings.DEFAULT_DAYS,
        category: Optional[str] = None,
        status: Optional[str] = None
    ) -> List[NaturalEvent]:
        """
        Fetch natural events from NASA EONET API
        
        Args:
            days: Number of days to look back
            category: Filter by category ID
            status: Filter by status (open/closed)
            
        Returns:
            List of natural events
        """
        params = {
            "days": days
        }
        
        if category:
            params["category"] = category
        if status:
            params["status"] = status
            
        try:
            logger.info(f"Fetching events from NASA API: {self.base_url}")
            async with httpx.AsyncClient(**self.client_options) as client:
                response = await client.get(self.base_url, params=params)
                logger.info(f"NASA API response status: {response.status_code}")
                response.raise_for_status()
                
                data = response.json()
                events_response = EventsResponse(**data)
                
                logger.info(f"Successfully fetched {len(events_response.events)} events")
                return events_response.events
                
        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP error occurred: {e}")
            raise
        except httpx.RequestError as e:
            logger.error(f"Request error occurred: {e}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            raise
            
    async def fetch_event_by_id(self, event_id: str) -> Optional[NaturalEvent]:
        """
        Fetch a specific event by ID
        
        Args:
            event_id: The event ID
            
        Returns:
            Natural event if found, None otherwise
        """
        try:
            async with httpx.AsyncClient(**self.client_options) as client:
                response = await client.get(f"{self.base_url}/{event_id}")
                
                if response.status_code == 404:
                    return None
                    
                response.raise_for_status()
                data = response.json()
                
                return NaturalEvent(**data)
                
        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP error occurred: {e}")
            raise
        except httpx.RequestError as e:
            logger.error(f"Request error occurred: {e}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            raise