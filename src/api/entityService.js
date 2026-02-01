import apiClient from './client';

export const entityService = {
  // Get all entities of a specific type
  // Path: GET /api/entities/{entityType}
  // Response: Array of entities
  getAll: async (entityType = 'movie') => {
    return apiClient.get(`/entities/${entityType}`);
  },

  // Get specific entity details by ID
  // Path: GET /api/entities/{entityType}/{id}
  // Response: Entity with full details including competitors
  getById: async (entityId, entityType = 'movie') => {
    return apiClient.get(`/entities/${entityType}/${entityId}`);
  },

  // Create new managed entity
  // Path: POST /api/entities/{entityType}
  // Request: { name, type, director?, actors?, keywords? }
  // Response: Created entity object
  create: async (entityType = 'movie', entityData) => {
    return apiClient.post(`/entities/${entityType}`, entityData);
  },

  // Update entity competitors list
  // Path: PUT /api/entities/{entityType}/{id}/competitors
  // Request: { competitorIds: number[] }
  // Response: Updated entity with competitors
  updateCompetitors: async (entityType, entityId, competitorIds) => {
    return apiClient.put(`/entities/${entityType}/${entityId}/competitors`, { 
      competitorIds 
    });
  },

  // Update entity keywords
  // Path: PUT /api/entities/{entityType}/{id}/keywords
  // Request: { keywords: string[] }
  // Response: Updated entity with new keywords
  updateKeywords: async (entityType, entityId, keywords) => {
    return apiClient.put(`/entities/${entityType}/${entityId}/keywords`, { 
      keywords 
    });
  },
};
