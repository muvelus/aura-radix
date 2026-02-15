import apiClient from './client';

export const crisisService = {
  // Generate crisis response plan using AI (Mock LLM)
  // Path: POST /api/crisis/generate-plan
  // Request: { entityId: number, crisisDescription: string }
  // Response: { generatedPlan: string }
  generatePlan: async (entityId, crisisDescription) => {
    try {
      const response = await apiClient.post('/crisis/generate-plan', {
        entityId,
        crisisDescription,
      });
      return response;
    } catch (error) {
      console.error(`Failed to generate crisis plan for entity ${entityId}:`, error);
      throw error;
    }
  },
};
