import apiClient from './client';

export const analyticsService = {
  // Get predicted box office revenue for a movie (Mock analytics)
  // Path: GET /api/analytics/{movieId}
  // Response: { movieId, predictedBoxOffice with financial_projections, strategic_fit, market_verdict }
  getBoxOfficePrediction: async (movieId) => {
    return apiClient.get(`/analytics/${movieId}`);
  },

  // Get trending genre for a specific date (Mock analytics)
  // Path: GET /api/analytics/trending-genre
  // Query Params: date (ISO format, e.g., 2025-11-08)
  // Response: { date: string, trendingGenre: string }
  getTrendingGenre: async (date) => {
    const isoDate = date instanceof Date ? date.toISOString() : date;
    return apiClient.get('/analytics/trending-genre', {
      params: { date: isoDate },
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
    const isoDate = date instanceof Date ? date.toISOString() : date;
    return apiClient.get('/analytics/best-genre', {
      params: { date: isoDate },
    });
  },

  // Get top box office movie for a specific date (Mock analytics)
  // Path: GET /api/analytics/top-box-office
  // Query Params: date (ISO format, e.g., 2025-11-08)
  // Response: { date: string, topBoxOfficeMovie: string }
  getTopBoxOffice: async (date) => {
    const isoDate = date instanceof Date ? date.toISOString() : date;
    return apiClient.get('/analytics/top-box-office', {
      params: { date: isoDate },
    });
  },
};
