import apiClient from './client';

export const interactionService = {
  // Generate AI-powered reply to a mention
  // Path: GET /api/interact/generate-reply/{id}
  // Response: { generatedReply: string }
  generateReply: async (mentionId) => {
    try {
      const response = await apiClient.get(`/interact/generate-reply/${mentionId}`);
      return response;
    } catch (error) {
      console.error(`Failed to generate reply for mention ${mentionId}:`, error);
      throw error;
    }
  },

  // Legacy: Generate AI-powered reply to a mention (Mock LLM)
  // Path: POST /api/interact/generate-reply
  // Request: { managedEntityName: string, mentionContent: string, sentiment: string }
  // Response: { generatedReply: string }
  generateReplyLegacy: async (managedEntityName, mentionContent, sentiment) => {
    try {
      const response = await apiClient.post('/interact/generate-reply', {
        managedEntityName,
        mentionContent,
        sentiment,
      });
      return response;
    } catch (error) {
      console.error(`Failed to generate reply for entity ${managedEntityName}:`, error);
      throw error;
    }
  },

  // Post reply to social media platform (Mock implementation)
  // Path: POST /api/interact/respond
  // Request: { platform: string, postIdToReplyTo: string, replyText: string }
  // Response: "Reply posted successfully (mock)"
  respond: async (platform, postIdToReplyTo, replyText) => {
    try {
      const response = await apiClient.post('/interact/respond', {
        platform,
        postIdToReplyTo,
        replyText,
      });
      return response;
    } catch (error) {
      console.error(`Failed to post reply to ${platform} for post ${postIdToReplyTo}:`, error);
      throw error;
    }
  },
};
