import apiClient from './client';

export const authService = {
  // Register new user
  // Request: { username: string, password: string }
  // Response: "User registered successfully"
  register: async (username, password) => {
    return apiClient.post('/auth/register', { username, password });
  },

  // Login and get JWT token
  // Request: { username: string, password: string }
  // Response: { jwtToken: string }
  login: async (username, password) => {
    const response = await apiClient.post('/auth/login', { username, password });
    // Store token in localStorage for subsequent requests
    if (response.jwtToken) {
      localStorage.setItem('jwtToken', response.jwtToken);
    }
    return response;
  },

  logout: () => {
    localStorage.removeItem('jwtToken');
  },

  // Get current user profile
  // Response: User profile object
  getCurrentUser: async () => {
    return apiClient.get('/auth/profile');
  },
};
