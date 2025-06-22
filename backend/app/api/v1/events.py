from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from app.models.event import NaturalEvent, EventStatistics
from app.services.nasa_api import NASAApiService
from app.services.cache import CacheService
from app.utils.statistics import calculate_event_statistics
from app.core.config import get_settings
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/events", tags=["events"])
settings = get_settings()

# Service instances
nasa_service = NASAApiService()
cache_service = CacheService()


@router.get("", response_model=List[NaturalEvent])
async def get_events(
    days: int = Query(default=settings.DEFAULT_DAYS, ge=1, le=365, description="Number of days to look back"),
    category: Optional[str] = Query(default=None, description="Filter by category ID"),
    status: Optional[str] = Query(default=None, regex="^(open|closed)$", description="Filter by status"),
    skip_cache: bool = Query(default=False, description="Skip cache and fetch fresh data")
) -> List[NaturalEvent]:
    """
    Retrieve natural events from NASA EONET API
    
    - **days**: Number of days to look back (1-365)
    - **category**: Optional category filter
    - **status**: Optional status filter (open/closed)
    - **skip_cache**: Force fresh data fetch
    """
    cache_key = f"events:{days}:{category}:{status}"
    
    # Try to get from cache first
    if not skip_cache:
        cached_data = await cache_service.get(cache_key)
        if cached_data:
            logger.info("Returning cached events")
            return [NaturalEvent(**event) for event in cached_data]
    
    try:
        # Fetch from NASA API
        events = await nasa_service.fetch_events(days=days, category=category, status=status)
        
        # Cache the results
        events_dict = [event.dict() for event in events]
        await cache_service.set(cache_key, events_dict)
        
        return events
        
    except Exception as e:
        logger.error(f"Error fetching events: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch events")


@router.get("/statistics", response_model=EventStatistics)
async def get_event_statistics(
    days: int = Query(default=settings.DEFAULT_DAYS, ge=1, le=365, description="Number of days to look back")
) -> EventStatistics:
    """
    Get statistical summary of natural events
    
    - **days**: Number of days to look back (1-365)
    """
    try:
        events = await get_events(days=days)
        statistics = calculate_event_statistics(events)
        return statistics
        
    except Exception as e:
        logger.error(f"Error calculating statistics: {e}")
        raise HTTPException(status_code=500, detail="Failed to calculate statistics")


@router.get("/{event_id}", response_model=NaturalEvent)
async def get_event_by_id(event_id: str) -> NaturalEvent:
    """
    Retrieve a specific event by ID
    
    - **event_id**: The unique event identifier
    """
    cache_key = f"event:{event_id}"
    
    # Try cache first
    cached_event = await cache_service.get(cache_key)
    if cached_event:
        logger.info(f"Returning cached event {event_id}")
        return NaturalEvent(**cached_event)
    
    try:
        event = await nasa_service.fetch_event_by_id(event_id)
        
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        # Cache the result
        await cache_service.set(cache_key, event.dict())
        
        return event
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching event {event_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch event")