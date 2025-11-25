import { entityProfiles } from './entityProfiles';

// Competitor movies database with data dynamically calculated from entity profiles
const movieIds = ['dedepyaarde2', 'homebound', 'bengalfiles', 'jollyllb3', 'baramulla'];
const movieNames = {
  dedepyaarde2: 'De De Pyaar De 2',
  homebound: 'Homebound',
  bengalfiles: 'The Bengal Files',
  jollyllb3: 'Jolly LLB 3',
  baramulla: 'Baramulla'
};

// Generate competitor data based on entity profiles
const generateCompetitorMoviesDB = () => {
  return movieIds.map(id => {
    const profile = entityProfiles[id];
    
    // Calculate sentiment breakdown percentages from weights
    const positive = Math.round(profile.sentimentWeights.positive * 100);
    const neutral = Math.round(profile.sentimentWeights.neutral * 100);
    const negative = Math.round(profile.sentimentWeights.negative * 100);
    
    // Calculate overall sentiment score
    const sentimentScore = Math.round(
      (positive * 1) + (neutral * 0.5) - (negative * 0.8)
    );
    
    // Determine sentiment label based on score
    let sentimentLabel;
    if (sentimentScore >= 70) sentimentLabel = 'Positive';
    else if (sentimentScore >= 40) sentimentLabel = 'Neutral';
    else sentimentLabel = 'Negative';
    
    // Calculate mentions based on mention count from profile
    const totalMentions = profile.mentionCount * 1.2;
    
    // Calculate platform breakdown based on profile weights
    const redditMentions = Math.round(totalMentions * profile.platforms.reddit);
    const youtubeMentions = Math.round(totalMentions * profile.platforms.youtube);
    const twitterMentions = Math.round(totalMentions * profile.platforms.twitter);
    
    return {
      id,
      name: movieNames[id],
      sentiment: sentimentScore,
      sentimentLabel,
      totalMentions: Math.round(totalMentions),
      platforms: { reddit: redditMentions, youtube: youtubeMentions, twitter: twitterMentions },
      sentimentBreakdown: { positive, neutral, negative }
    };
  });
};

export const competitorMoviesDB = generateCompetitorMoviesDB();

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
