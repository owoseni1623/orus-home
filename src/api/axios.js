import axios from 'axios';
import { API_URL } from '../../config/env';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to handle retries
api.interceptors.request.use(
  config => {
    // Add any request interceptors here
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Handle rate limiting
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'] || 60;
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      return api(originalRequest);
    }

    // Handle CORS errors
    if (error.message.includes('Network Error') || error.response?.status === 0) {
      console.error('CORS or Network Error:', error);
      toast.error('Network error. Please check your connection and try again.');
    }

    return Promise.reject(error);
  }
);

// Replace your fetchBlocks function with this:
const fetchBlocks = async () => {
  try {
    const response = await api.get('/blocks');
    
    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || 'Failed to fetch blocks');
    }

    const validBlocks = Array.isArray(response.data.data) 
      ? response.data.data.filter(block => block && typeof block === 'object')
      : [];

    setBlocks(validBlocks);
  } catch (error) {
    console.error('Fetch error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data
    });

    toast.error(
      error.response?.status === 404 
        ? 'API endpoint not found. Please check your API configuration.' 
        : error.response?.status === 429
        ? 'Too many requests. Please wait a moment and try again.'
        : `Error: ${error.message}`
    );
    
    setBlocks([]);
  } finally {
    setLoading(false);
  }
};

export default api;