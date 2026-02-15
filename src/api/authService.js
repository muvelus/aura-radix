import apiClient from './client';

export const authService = {
  // Register new user
  // Request: { username: string, password: string }
  // Response: "User registered successfully"
  register: async (username, password) => {
    try {
      const response = await apiClient.post('/auth/register', { username, password });
      return response;
    } catch (error) {
      console.error('Failed to register user:', error);
      throw error;
    }
  },

  // Login and get JWT token
  // Request: { username: string, password: string }
  // Response: { jwtToken: string }
  login: async (username, password) => {
    try {
      const response = await apiClient.post('/auth/login', { username, password });
      // Validate response format
      if (!response?.jwtToken) {
        throw new Error('Invalid response format: missing jwtToken');
      }
      // Store token in localStorage for subsequent requests
      localStorage.setItem('jwtToken', response.jwtToken);
      return response;
    } catch (error) {
      console.error('Failed to login user:', error);
      throw error;
    }
  },

  logout: () => {
    try {
      localStorage.removeItem('jwtToken');
    } catch (error) {
      console.error('Failed to logout user:', error);
      throw error;
    }
  },

  // Get current user profile
  // Response: User profile object
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/profile');
      return response;
    } catch (error) {
      console.error('Failed to fetch current user profile:', error);
      throw error;
    }
  },
};
