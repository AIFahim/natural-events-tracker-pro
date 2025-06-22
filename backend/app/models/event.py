from typing import List, Optional, Union
from datetime import datetime
from pydantic import BaseModel, Field, validator


class Geometry(BaseModel):
    type: str = Field(..., description="Type of geometry (Point or Polygon)")
    coordinates: Union[List[float], List[List[float]]] = Field(..., description="Coordinates")
    

class Category(BaseModel):
    id: str = Field(..., description="Category ID")
    title: str = Field(..., description="Category title")


class Source(BaseModel):
    id: str = Field(..., description="Source ID")
    url: str = Field(..., description="Source URL")


class NaturalEvent(BaseModel):
    id: str = Field(..., description="Event ID")
    title: str = Field(..., description="Event title")
    description: Optional[str] = Field(None, description="Event description")
    categories: List[Category] = Field(..., description="Event categories")
    sources: List[Source] = Field(..., description="Event sources")
    geometry: List[Geometry] = Field(..., description="Event geometries")
    closed: Optional[str] = Field(None, description="Event closure date")
    
    @validator('closed')
    def validate_closed_date(cls, v):
        if v:
            try:
                datetime.fromisoformat(v.replace('Z', '+00:00'))
            except ValueError:
                raise ValueError('Invalid date format')
        return v


class EventsResponse(BaseModel):
    title: str = Field(..., description="API response title")
    description: str = Field(..., description="API response description")
    link: str = Field(..., description="API documentation link")
    events: List[NaturalEvent] = Field(..., description="List of natural events")
    
    
class EventStatistics(BaseModel):
    total_events: int = Field(..., description="Total number of events")
    events_by_category: dict[str, int] = Field(..., description="Event count by category")
    most_recent_event: Optional[NaturalEvent] = Field(None, description="Most recent event")
    date_range: dict[str, str] = Field(..., description="Date range of events")