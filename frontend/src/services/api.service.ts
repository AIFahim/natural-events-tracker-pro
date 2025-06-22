import axios, { AxiosInstance, AxiosError } from 'axios';
import { NaturalEvent } from '../types';
import { API_ENDPOINTS } from '../constants';

class NaturalEventsApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_ENDPOINTS.BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error: AxiosError) => {
        console.error('Response error:', error);
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): Error {
    if (error.response) {
      const message = `Server Error: ${error.response.status} - ${error.response.statusText}`;
      return new Error(message);
    } else if (error.request) {
      return new Error('Network Error: No response from server');
    } else {
      return new Error(`Request Error: ${error.message}`);
    }
  }

  public async fetchNaturalEvents(days: number = API_ENDPOINTS.DAYS_PARAM): Promise<NaturalEvent[]> {
    try {
      const response = await this.axiosInstance.get<NaturalEvent[]>(API_ENDPOINTS.EVENTS, {
        params: { days }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching natural events:', error);
      throw error;
    }
  }

  public async fetchEventById(eventId: string): Promise<NaturalEvent | null> {
    try {
      const response = await this.axiosInstance.get<NaturalEvent>(`${API_ENDPOINTS.EVENTS}/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event ${eventId}:`, error);
      return null;
    }
  }
}

const naturalEventsApiService = new NaturalEventsApiService();
export default naturalEventsApiService;