import React, { useState, useMemo } from 'react';
import { NaturalEvent } from '../../types';
import EventCard from './EventCard';
import EventStatistics from '../Charts/EventStatistics';
import { EVENT_CATEGORIES } from '../../constants';
import styles from './EventList.module.css';

interface EventListProps {
  events: NaturalEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    if (!selectedCategory) return events;
    return events.filter(event => 
      event.categories.some(cat => cat.title === selectedCategory)
    );
  }, [events, selectedCategory]);

  const categories = Object.values(EVENT_CATEGORIES);

  return (
    <section className={styles.container}>
      <EventStatistics events={events} />
      
      <div className={styles.filterContainer}>
        <h2 className={styles.sectionTitle}>Event Details</h2>
        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${!selectedCategory ? styles.active : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            All Events ({events.length})
          </button>
          {categories.map(category => {
            const count = events.filter(e => 
              e.categories.some(cat => cat.title === category)
            ).length;
            
            return (
              <button
                key={category}
                className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
                disabled={count === 0}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.eventGrid}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className={styles.noEvents}>
            <p>No events found for the selected category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventList;