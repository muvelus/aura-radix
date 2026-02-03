import axios from 'axios';

const API_BASE_URL = '/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle specific error codes
    const status = error.response?.status;
    const errorData = error.response?.data;

    if (status === 401) {
      // Unauthorized - token expired or invalid
      localStorage.removeItem('jwtToken');
      window.location.href = '/login';
    }

    if (status === 403) {
      // Forbidden - user lacks permissions
      console.warn('Access forbidden');
    }

    if (status === 404) {
      // Not found
      console.warn('Resource not found');
    }

    if (status === 422) {
      // Validation error
      console.warn('Validation error:', errorData?.errors);
    }

    if (status === 429) {
      // Rate limited - implement retry logic
      console.warn('Rate limited, please try again later');
    }

    if (status >= 500) {
      // Server error
      console.error('Server error:', errorData?.message);
    }

    // Return structured error for component handling
    return Promise.reject({
      status,
      message: errorData?.message || error.message,
      errors: errorData?.errors,
      data: errorData,
    });
  }
);

export default apiClient;
