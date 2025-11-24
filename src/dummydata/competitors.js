import { entityProfiles } from './entityProfiles';

// Competitor movies database with dummy data based on entity profiles
export const competitorMoviesDB = [
  { 
    id: 'dedepyaarde2',
    name: 'De De Pyaar De 2', 
    sentiment: 72, 
    sentimentLabel: 'Positive',
    totalMentions: 1920,
    platforms: { reddit: 960, youtube: 576, twitter: 384 },
    sentimentBreakdown: { positive: 72, neutral: 18, negative: 10 }
  },
  { 
    id: 'homebound',
    name: 'Homebound', 
    sentiment: 58, 
    sentimentLabel: 'Neutral',
    totalMentions: 950,
    platforms: { reddit: 380, youtube: 285, twitter: 285 },
    sentimentBreakdown: { positive: 58, neutral: 28, negative: 14 }
  },
  { 
    id: 'bengalfiles',
    name: 'The Bengal Files', 
    sentiment: 76, 
    sentimentLabel: 'Positive',
    totalMentions: 1680,
    platforms: { reddit: 840, youtube: 504, twitter: 336 },
    sentimentBreakdown: { positive: 76, neutral: 16, negative: 8 }
  },
  { 
    id: 'jollyllb3',
    name: 'Jolly LLB 3', 
    sentiment: 65, 
    sentimentLabel: 'Positive',
    totalMentions: 1450,
    platforms: { reddit: 580, youtube: 520, twitter: 350 },
    sentimentBreakdown: { positive: 65, neutral: 25, negative: 10 }
  },
  { 
    id: 'baramulla',
    name: 'Baramulla', 
    sentiment: 62, 
    sentimentLabel: 'Positive',
    totalMentions: 1240,
    platforms: { reddit: 620, youtube: 372, twitter: 248 },
    sentimentBreakdown: { positive: 62, neutral: 24, negative: 14 }
  }
];

export const generateCompetitiveData = () => {
  const competitors = [
    { id: 'dedepyaarde2', name: 'De De Pyaar De 2' },
    { id: 'homebound', name: 'Homebound' },
    { id: 'bengalfiles', name: 'The Bengal Files' },
    { id: 'jollyllb3', name: 'Jolly LLB 3' },
    { id: 'baramulla', name: 'Baramulla' }
  ];

  // Color palette for visualization
  const colors = ['#06b6d4', '#a78bfa', '#fb923c', '#f59e0b', '#4ade80'];

  return competitors.map((competitor, idx) => {
    const profile = entityProfiles[competitor.id];
    
    // Calculate sentiment score based on weights
    // positive: 0-100, neutral: 0-50, negative: 0-30, sarcastic: 0-20
    const sentimentScore = Math.round(
      (profile.sentimentWeights.positive * 100) +
      (profile.sentimentWeights.neutral * 50) -
      (profile.sentimentWeights.negative * 35) -
      (profile.sentimentWeights.sarcastic * 20)
    );

    // Vary mention counts based on engagement multiplier and profile weights
    const baseMentions = profile.mentionCount;
    const variance = Math.floor((Math.random() - 0.5) * baseMentions * 0.15);
    const mentions = Math.max(500, baseMentions + variance);

    // Crisis count based on negative weight and threat level
    const crisisBase = Math.round((profile.sentimentWeights.negative + profile.sentimentWeights.sarcastic) * 50);
    const crisisVariance = Math.floor((Math.random() - 0.5) * 8);
    const crisis = Math.max(1, crisisBase + crisisVariance);

    // Determine trend based on sentiment and threat
    const trend = profile.avgThreat > 30 ? 'down' : 
                  sentimentScore > 70 ? 'up' : 
                  'stable';

    return {
      name: competitor.name,
      sentiment: Math.max(20, Math.min(95, sentimentScore + Math.floor((Math.random() - 0.5) * 10))),
      color: colors[idx],
      mentions,
      crisis,
      trend
    };
  });
};

export const generateCompetitorData = () => {
  const now = Date.now();
  const days = 7;
  
  return Array.from({ length: days * 24 }, (_, i) => {
    // Use entityProfiles to determine volume based on engagement multiplier
    const dedepProfile = entityProfiles.dedepyaarde2;
    const homeProfile = entityProfiles.homebound;
    const bengalProfile = entityProfiles.bengalfiles;
    const jollyProfile = entityProfiles.jollyllb3;
    const baraProfile = entityProfiles.baramulla;

    // Generate data with weight-influenced variation
    return {
      timestamp: new Date(now - (days * 24 - i) * 60 * 60 * 1000),
      // Base on engagement multiplier, add weighted noise
      dedepyaarde2: Math.floor(150 + (dedepProfile.engagementMultiplier * 50) + Math.random() * 150),
      homebound: Math.floor(75 + (homeProfile.engagementMultiplier * 30) + Math.random() * 100),
      bengalfiles: Math.floor(140 + (bengalProfile.engagementMultiplier * 60) + Math.random() * 140),
      jollyllb3: Math.floor(120 + (jollyProfile.engagementMultiplier * 55) + Math.random() * 130),
      baramulla: Math.floor(100 + (baraProfile.engagementMultiplier * 50) + Math.random() * 120)
    };
  });
};
