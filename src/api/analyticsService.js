import apiClient from './client';

export const analyticsService = {
  // Get predicted box office revenue for a movie (Mock analytics)
  // Path: GET /api/analytics/box-office-prediction
  // Query Params: movieId (required)
  // Response: { movieId: number, predictedBoxOffice: number }
  getBoxOfficePrediction: async (movieId) => {
    return apiClient.get('/analytics/box-office-prediction', {
      params: { movieId },
    });
  },

  // Get trending genre for a specific date (Mock analytics)
  // Path: GET /api/analytics/trending-genre
  // Query Params: date (ISO format, e.g., 2025-11-08)
  // Response: { date: string, trendingGenre: string }
  getTrendingGenre: async (date) => {
    return apiClient.get('/analytics/trending-genre', {
      params: { date },
    });
  },

  // Get predicted hit genre for upcoming releases (Mock analytics)
  // Path: GET /api/analytics/hit-genre-prediction
  // Response: { predictedHitGenre: string }
  getHitGenrePrediction: async () => {
    return apiClient.get('/analytics/hit-genre-prediction');
  },

  // Get best performing genre for a specific date (Mock analytics)
  // Path: GET /api/analytics/best-genre
  // Query Params: date (ISO format, e.g., 2025-11-08)
  // Response: { date: string, bestGenre: string }
  getBestGenre: async (date) => {
    return apiClient.get('/analytics/best-genre', {
      params: { date },
    });
  },

  // Get top box office movie for a specific date (Mock analytics)
  // Path: GET /api/analytics/top-box-office
  // Query Params: date (ISO format, e.g., 2025-11-08)
  // Response: { date: string, topBoxOfficeMovie: string }
  getTopBoxOffice: async (date) => {
    return apiClient.get('/analytics/top-box-office', {
      params: { date },
    });
  },
};
