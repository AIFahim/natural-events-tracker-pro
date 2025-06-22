import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { NaturalEvent } from '../../types';
import { MAP_CONFIG, ICON_PATHS, EVENT_CATEGORIES } from '../../constants';
import { convertEventsToMarkers, getMostRecentEvent, getCoordinatesFromGeometry, formatEventDate } from '../../utils/eventHelpers';
import styles from './EventMap.module.css';
import 'leaflet/dist/leaflet.css';

// Fix for default markers not showing
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

interface EventMapProps {
  events: NaturalEvent[];
}

const createCustomIcon = (iconUrl: string): L.Icon => {
  return L.icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const iconMap: Record<string, L.Icon> = {
  [EVENT_CATEGORIES.WILDFIRE]: createCustomIcon(ICON_PATHS.FIRE),
  [EVENT_CATEGORIES.VOLCANO]: createCustomIcon(ICON_PATHS.VOLCANO),
  [EVENT_CATEGORIES.SEA_LAKE_ICE]: createCustomIcon(ICON_PATHS.ICEBERG),
  [EVENT_CATEGORIES.SEVERE_STORM]: createCustomIcon(ICON_PATHS.HURRICANE)
};

const EventMap: React.FC<EventMapProps> = ({ events }) => {
  const markers = useMemo(() => convertEventsToMarkers(events), [events]);
  
  const mapCenter = useMemo(() => {
    const recentEvent = getMostRecentEvent(events);
    if (recentEvent && recentEvent.geometry.length > 0) {
      const coords = getCoordinatesFromGeometry(recentEvent.geometry[0]);
      if (coords) {
        return { lat: coords[0], lng: coords[1] };
      }
    }
    return MAP_CONFIG.DEFAULT_CENTER;
  }, [events]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer 
        center={[mapCenter.lat, mapCenter.lng]} 
        zoom={MAP_CONFIG.DEFAULT_ZOOM} 
        className={styles.map}
      >
        <TileLayer
          url={MAP_CONFIG.TILE_URL}
          attribution={MAP_CONFIG.ATTRIBUTION}
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={iconMap[marker.category] || iconMap[EVENT_CATEGORIES.WILDFIRE]}
          >
            <Popup className={styles.popup}>
              <div className={styles.popupContent}>
                <h3 className={styles.popupTitle}>{marker.title}</h3>
                <p className={styles.popupCategory}>{marker.category}</p>
                <p className={styles.popupDate}>{formatEventDate(marker.date)}</p>
                {marker.description && (
                  <p className={styles.popupDescription}>{marker.description}</p>
                )}
                {marker.source && (
                  <a 
                    href={marker.source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.popupLink}
                  >
                    View Source
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EventMap;