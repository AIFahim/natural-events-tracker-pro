import { useState, useEffect, useCallback } from 'react';
import { NaturalEvent } from '../types';
import naturalEventsApi from '../services/api.service';

interface UseNaturalEventsReturn {
  events: NaturalEvent[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useNaturalEvents = (days: number = 30): UseNaturalEventsReturn => {
  const [events, setEvents] = useState<NaturalEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await naturalEventsApi.fetchNaturalEvents(days);
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch events'));
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    refetch: fetchEvents
  };
};