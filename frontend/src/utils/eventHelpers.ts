import { NaturalEvent, EventMarker, Geometry } from '../types';
import { EVENT_CATEGORIES } from '../constants';
import { format } from 'date-fns';

export const getCategoryFromEvent = (event: NaturalEvent): string => {
  if (event.categories.length > 0) {
    return event.categories[0].title;
  }
  return 'Unknown';
};

export const getCoordinatesFromGeometry = (geometry: Geometry): [number, number] | null => {
  if (geometry.type === 'Point' && Array.isArray(geometry.coordinates)) {
    const [lng, lat] = geometry.coordinates as number[];
    return [lat, lng];
  } else if (geometry.type === 'Polygon' && Array.isArray(geometry.coordinates)) {
    const coordinates = geometry.coordinates as number[][];
    if (coordinates.length > 0 && Array.isArray(coordinates[0]) && coordinates[0].length > 0) {
      const firstRing = coordinates[0];
      if (Array.isArray(firstRing[0])) {
        const [lng, lat] = firstRing[0] as number[];
        return [lat, lng];
      }
    }
  }
  return null;
};

export const filterEventsByCategory = (events: NaturalEvent[], category: string): NaturalEvent[] => {
  return events.filter(event => 
    event.categories.some(cat => cat.title === category)
  );
};

export const countEventsByCategory = (events: NaturalEvent[]): Record<string, number> => {
  const counts: Record<string, number> = {
    [EVENT_CATEGORIES.SEA_LAKE_ICE]: 0,
    [EVENT_CATEGORIES.SEVERE_STORM]: 0,
    [EVENT_CATEGORIES.VOLCANO]: 0,
    [EVENT_CATEGORIES.WILDFIRE]: 0
  };

  events.forEach(event => {
    const category = getCategoryFromEvent(event);
    if (category in counts) {
      counts[category]++;
    }
  });

  return counts;
};

export const convertEventsToMarkers = (events: NaturalEvent[]): EventMarker[] => {
  const markers: EventMarker[] = [];

  events.forEach(event => {
    if (event.geometry.length > 0) {
      const coordinates = getCoordinatesFromGeometry(event.geometry[0]);
      if (coordinates) {
        markers.push({
          id: event.id,
          title: event.title,
          category: getCategoryFromEvent(event),
          position: coordinates,
          description: event.description,
          source: event.sources[0]?.url,
          date: event.closed || new Date().toISOString()
        });
      }
    }
  });

  return markers;
};

export const getMostRecentEvent = (events: NaturalEvent[]): NaturalEvent | null => {
  if (events.length === 0) return null;

  return events.reduce((mostRecent, current) => {
    const mostRecentDate = new Date(mostRecent.closed || 0);
    const currentDate = new Date(current.closed || 0);
    return currentDate > mostRecentDate ? current : mostRecent;
  });
};

export const formatEventDate = (dateString?: string): string => {
  if (!dateString) return 'Ongoing';
  
  try {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  } catch {
    return 'Invalid date';
  }
};

export const getCategoryClassName = (category: string): string => {
  const sanitized = category.replace(/\s+/g, '');
  return `${sanitized}Border`;
};