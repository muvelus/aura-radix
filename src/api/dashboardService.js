import apiClient from './client';

export const dashboardService = {
  // Get entity statistics (KPIs, counts, sentiment ratios)
  // Path: GET /api/dashboard/{entityType}/{entityId}/stats
  // Response: { totalMentions, positiveSentiment, negativeSentiment }
  getStats: async (entityType, entityId) => {
    return apiClient.get(
      `/dashboard/${entityType}/${entityId}/stats`
    );
  },

  // Get competitor comparison snapshot (entity + competitors stats)
  // Path: GET /api/dashboard/{entityType}/{entityId}/competitor-snapshot
  // Response: Array of { entityName, totalMentions, positiveSentiment }
  getCompetitorSnapshot: async (entityType, entityId) => {
    return apiClient.get(
      `/dashboard/${entityType}/${entityId}/competitor-snapshot`
    );
  },

  // Get sentiment data over time for trend analysis
  // Path: GET /api/dashboard/{entityType}/{entityId}/sentiment-over-time
  // Query Params: period (DAY|WEEK|MONTH), entityIds (comma-separated)
  // Response: { entities: [{ name, sentiments: [{ date, positive, negative, neutral }] }] }
  getSentimentOverTime: async (entityType, entityId, period = 'DAY', entityIds = []) => {
    const entityIdParam = entityIds.length > 0 
      ? (Array.isArray(entityIds) ? entityIds.join(',') : entityIds)
      : entityId;
    return apiClient.get(
      `/dashboard/${entityType}/${entityId}/sentiment-over-time`,
      { params: { period, entityIds: entityIdParam } }
    );
  },

  // Get platform breakdown (mentions by platform)
  // Path: GET /api/dashboard/{entityType}/{entityId}/platform-mentions
  // Response: { X: number, REDDIT: number, YOUTUBE: number, INSTAGRAM: number }
  getPlatformMentions: async (entityType, entityId) => {
    return apiClient.get(
      `/dashboard/${entityType}/${entityId}/platform-mentions`
    );
  },

  // Get filtered mentions with pagination
  // Path: GET /api/dashboard/{entityType}/{entityId}/mentions
  // Query Params: platform?, page (default: 0), size (default: 10)
  // Response: { content: Mention[], pageable, totalElements, totalPages, last }
  getMentions: async (entityType, entityId, filters = {}) => {
    const params = {
      page: filters.page || 0,
      size: filters.size || 200,
      ...(filters.platform && { platform: filters.platform }),
    };
    return apiClient.get(
      `/dashboard/${entityType}/${entityId}/mentions`,
      { params }
    );
  },
};
