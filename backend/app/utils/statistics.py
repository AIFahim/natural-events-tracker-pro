from typing import List, Dict, Optional
from datetime import datetime
from app.models.event import NaturalEvent, EventStatistics


def calculate_event_statistics(events: List[NaturalEvent]) -> EventStatistics:
    """Calculate statistics from a list of events"""
    
    # Count events by category
    category_counts: Dict[str, int] = {}
    for event in events:
        for category in event.categories:
            category_title = category.title
            category_counts[category_title] = category_counts.get(category_title, 0) + 1
    
    # Find most recent event
    most_recent = None
    if events:
        sorted_events = sorted(
            events,
            key=lambda e: datetime.fromisoformat(e.closed.replace('Z', '+00:00')) if e.closed else datetime.min,
            reverse=True
        )
        most_recent = sorted_events[0] if sorted_events else None
    
    # Calculate date range
    dates = []
    for event in events:
        if event.closed:
            try:
                date = datetime.fromisoformat(event.closed.replace('Z', '+00:00'))
                dates.append(date)
            except:
                pass
    
    date_range = {
        "start": min(dates).isoformat() if dates else None,
        "end": max(dates).isoformat() if dates else None
    }
    
    return EventStatistics(
        total_events=len(events),
        events_by_category=category_counts,
        most_recent_event=most_recent,
        date_range=date_range
    )


def filter_events_by_geometry_type(
    events: List[NaturalEvent], 
    geometry_type: str
) -> List[NaturalEvent]:
    """Filter events by geometry type (Point or Polygon)"""
    filtered = []
    for event in events:
        for geometry in event.geometry:
            if geometry.type == geometry_type:
                filtered.append(event)
                break
    return filtered


def get_events_by_date_range(
    events: List[NaturalEvent],
    start_date: datetime,
    end_date: datetime
) -> List[NaturalEvent]:
    """Filter events within a date range"""
    filtered = []
    for event in events:
        if event.closed:
            try:
                event_date = datetime.fromisoformat(event.closed.replace('Z', '+00:00'))
                if start_date <= event_date <= end_date:
                    filtered.append(event)
            except:
                pass
    return filtered