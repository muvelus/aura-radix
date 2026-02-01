import apiClient from './client';

export const crisisService = {
  // Generate crisis response plan using AI (Mock LLM)
  // Path: POST /api/crisis/generate-plan
  // Request: { entityId: number, crisisDescription: string }
  // Response: { generatedPlan: string }
  generatePlan: async (entityId, crisisDescription) => {
    return apiClient.post('/crisis/generate-plan', {
      entityId,
      crisisDescription,
    });
  },
};
