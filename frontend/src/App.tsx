import React from 'react';
import { useNaturalEvents } from './hooks/useNaturalEvents';
import Header from './components/Layout/Header';
import EventMap from './components/Map/EventMap';
import EventList from './components/Events/EventList';
import LoadingSpinner from './components/Loading/LoadingSpinner';
import ErrorMessage from './components/Error/ErrorMessage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './styles/global.css';
import styles from './App.module.css';

const App: React.FC = () => {
  const { events, loading, error, refetch } = useNaturalEvents();

  if (loading) {
    return (
      <div className={styles.app}>
        <Header />
        <LoadingSpinner message="Fetching latest natural events..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.app}>
        <Header />
        <ErrorMessage error={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <EventMap events={events} />
        <EventList events={events} />
      </main>
      <footer className={styles.footer}>
        <p>
          Data provided by NASA EONET API | 
          Map icons by <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">Icons8</a>
        </p>
      </footer>
    </div>
  );
};

export default App;