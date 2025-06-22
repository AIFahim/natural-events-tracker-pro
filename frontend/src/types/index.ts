export interface Geometry {
  type: 'Point' | 'Polygon';
  coordinates: number[] | number[][];
}

export interface EventCategory {
  id: string;
  title: string;
}

export interface EventSource {
  id: string;
  url: string;
}

export interface NaturalEvent {
  id: string;
  title: string;
  description?: string;
  categories: EventCategory[];
  sources: EventSource[];
  geometry: Geometry[];
  closed?: string;
}

export interface ApiResponse {
  title: string;
  description: string;
  link: string;
  events: NaturalEvent[];
}

export enum EventType {
  WILDFIRE = 'Wildfires',
  SEVERE_STORM = 'Severe Storms',
  SEA_LAKE_ICE = 'Sea and Lake Ice',
  VOLCANO = 'Volcanoes'
}

export interface EventCountData {
  labels: string[];
  datasets: [{
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }];
}

export interface MapCenter {
  lat: number;
  lng: number;
}

export interface EventMarker {
  id: string;
  title: string;
  category: string;
  position: [number, number];
  description?: string;
  source?: string;
  date?: string;
}