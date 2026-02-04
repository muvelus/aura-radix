import apiClient from './client';

export const interactionService = {
  // Generate AI-powered reply to a mention
  // Path: GET /api/interact/generate-reply/{id}
  // Response: { generatedReply: string }
  generateReply: async (mentionId) => {
    return apiClient.get(`/interact/generate-reply/${mentionId}`);
  },

  // Legacy: Generate AI-powered reply to a mention (Mock LLM)
  // Path: POST /api/interact/generate-reply
  // Request: { managedEntityName: string, mentionContent: string, sentiment: string }
  // Response: { generatedReply: string }
  generateReplyLegacy: async (managedEntityName, mentionContent, sentiment) => {
    return apiClient.post('/interact/generate-reply', {
      managedEntityName,
      mentionContent,
      sentiment,
    });
  },

  // Post reply to social media platform (Mock implementation)
  // Path: POST /api/interact/respond
  // Request: { platform: string, postIdToReplyTo: string, replyText: string }
  // Response: "Reply posted successfully (mock)"
  respond: async (platform, postIdToReplyTo, replyText) => {
    return apiClient.post('/interact/respond', {
      platform,
      postIdToReplyTo,
      replyText,
    });
  },
};
