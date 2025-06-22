export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1',
  EVENTS: '/events',
  STATISTICS: '/events/statistics',
  DAYS_PARAM: 30
} as const;

export const EVENT_CATEGORIES = {
  WILDFIRE: 'Wildfires',
  SEVERE_STORM: 'Severe Storms',
  SEA_LAKE_ICE: 'Sea and Lake Ice',
  VOLCANO: 'Volcanoes'
} as const;

export const CHART_COLORS = {
  [EVENT_CATEGORIES.SEA_LAKE_ICE]: '#125dff',
  [EVENT_CATEGORIES.SEVERE_STORM]: '#8a8a88',
  [EVENT_CATEGORIES.VOLCANO]: '#d90000',
  [EVENT_CATEGORIES.WILDFIRE]: '#ffb300'
} as const;

export const MAP_CONFIG = {
  DEFAULT_CENTER: { lat: 20, lng: 0 } as const,
  DEFAULT_ZOOM: 2,
  TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
} as const;

export const ICON_PATHS = {
  FIRE: '/icons/icons8-fire-48.png',
  VOLCANO: '/icons/icons8-volcano-48.png',
  ICEBERG: '/icons/icons8-iceberg-48.png',
  HURRICANE: '/icons/icons8-hurricane-48.png'
} as const;