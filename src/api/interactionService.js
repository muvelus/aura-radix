import apiClient from './client';

export const interactionService = {
  // Generate AI-powered reply to a mention (Mock LLM)
  // Path: POST /api/interact/generate-reply
  // Request: { mentionContent: string, sentiment: string }
  // Response: { generatedReply: string }
  generateReply: async (mentionContent, sentiment) => {
    return apiClient.post('/interact/generate-reply', {
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
