// Metrics data generators
export const generateMetricsData = (timeRange = '60m') => {
  const now = Date.now();
  let points, interval;
  
  // Determine data points and interval based on time range
  switch(timeRange) {
    case '60m':
      points = 12; // 60 minutes / 5 minutes
      interval = 5 * 60 * 1000; // 5 minutes
      break;
    case '24h':
      points = 48; // 24 hours * 2 (30-minute intervals)
      interval = 30 * 60 * 1000; // 30 minutes
      break;
    case '7d':
      points = 168; // 7 days * 24 hours
      interval = 60 * 60 * 1000; // 1 hour
      break;
    case '30d':
      points = 30;
      interval = 24 * 60 * 60 * 1000; // 1 day
      break;
    case '6m':
      points = 6;
      interval = 30 * 24 * 60 * 60 * 1000; // 1 month
      break;
    case '1y':
      points = 12;
      interval = 30 * 24 * 60 * 60 * 1000; // 1 month
      break;
    default:
      points = 60;
      interval = 60 * 1000;
  }
  
  return Array.from({ length: points }, (_, i) => {
    const timestamp = new Date(now - (points - i) * interval);
    
    // Round minutes to nearest 5
    if (timeRange === '60m' || timeRange === '24h') {
      const minutes = timestamp.getMinutes();
      const roundedMinutes = Math.round(minutes / 5) * 5;
      timestamp.setMinutes(roundedMinutes);
      timestamp.setSeconds(0);
      timestamp.setMilliseconds(0);
    }
    
    // Round hours to whole hours for 7d
    if (timeRange === '7d') {
      timestamp.setMinutes(0);
      timestamp.setSeconds(0);
      timestamp.setMilliseconds(0);
    }
    
    const totalMentions = 50 + Math.floor(Math.random() * 100);
    const positiveMentions = Math.floor(totalMentions * (0.3 + Math.random() * 0.2)); // 30-50%
    const negativeMentions = Math.floor(totalMentions * (0.15 + Math.random() * 0.15)); // 15-30%
    const neutralMentions = Math.floor(totalMentions * (0.2 + Math.random() * 0.15)); // 20-35%
    
    let timeLabel;
    if (timeRange === '60m' || timeRange === '24h') {
      timeLabel = timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      timeLabel = timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    
    return {
      timestamp,
      time: timeLabel,
      totalMentions,
      positiveMentions,
      negativeMentions,
      neutralMentions,
      // Legacy fields for backward compatibility
      mentions: totalMentions,
      highRisk: Math.floor(Math.random() * 15)
    };
  });
};

export const threadGenealogyData = {
  nodes: [
    { id: '1', type: 'original', text: 'Just saw the trailer...', author: 'User1' },
    { id: '2', type: 'reply', text: 'I agree!', author: 'User2', parent: '1' },
    { id: '3', type: 'reply', text: 'Disagree completely', author: 'User3', parent: '1' },
    { id: '4', type: 'reply', text: 'Why?', author: 'User4', parent: '3' },
    { id: '5', type: 'reply', text: 'Because...', author: 'User3', parent: '4' }
  ],
  edges: [
    { from: '1', to: '2' },
    { from: '1', to: '3' },
    { from: '3', to: '4' },
    { from: '4', to: '5' }
  ]
};
