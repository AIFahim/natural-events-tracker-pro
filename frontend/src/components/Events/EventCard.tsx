import React from 'react';
import { NaturalEvent } from '../../types';
import { getCategoryFromEvent, formatEventDate, getCategoryClassName } from '../../utils/eventHelpers';
import styles from './EventCard.module.css';
import classNames from 'classnames';

interface EventCardProps {
  event: NaturalEvent;
  onClick?: (event: NaturalEvent) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const category = getCategoryFromEvent(event);
  const categoryClass = getCategoryClassName(category);
  
  const handleClick = () => {
    if (onClick) {
      onClick(event);
    }
  };

  const cardClasses = classNames(
    styles.card,
    styles[categoryClass],
    { [styles.clickable]: !!onClick }
  );

  return (
    <article 
      className={cardClasses}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          handleClick();
        }
      }}
    >
      <header className={styles.header}>
        <h3 className={styles.title}>{event.title}</h3>
        <span className={styles.category}>{category}</span>
      </header>
      
      <div className={styles.content}>
        {event.description && (
          <p className={styles.description}>{event.description}</p>
        )}
        
        <div className={styles.metadata}>
          <span className={styles.date}>{formatEventDate(event.closed)}</span>
          {event.sources.length > 0 && (
            <a 
              href={event.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceLink}
              onClick={(e) => e.stopPropagation()}
            >
              View Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default EventCard;