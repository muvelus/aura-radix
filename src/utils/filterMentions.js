/**
 * Filter mentions by platform, sentiment, and status
 * @param {Array} mentions - Array of mention objects
 * @param {Object} filters - Filter configuration
 * @param {Array} filters.platforms - Platform filters
 * @param {Array} filters.sentiments - Sentiment filters
 * @param {Array} filters.statuses - Status filters
 * @returns {Array} Filtered mentions
 */
export function filterMentions(mentions, { platforms = [], sentiments = [], statuses = [] } = {}) {
  let filtered = mentions;

  if (platforms.length > 0) {
    filtered = filtered.filter(m => platforms.includes(m.platform));
  }

  if (sentiments.length > 0) {
    filtered = filtered.filter(m => sentiments.includes(m.aiSentiment));
  }

  if (statuses.length > 0) {
    filtered = filtered.filter(m => {
      const status = m.aiThreatScore > 70 ? 'pending' :
        m.aiThreatScore > 40 ? 'replied' : 'no-reply';
      return statuses.includes(status);
    });
  }

  return filtered;
}
