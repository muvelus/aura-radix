// Entity-specific analytics profiles
export const entityProfiles = {
  dedepyaarde2: {
    sentimentWeights: { positive: 0.85, neutral: 0.12, negative: 0.02, sarcastic: 0.01 },
    narratives: ['Box Office Bets', 'Franchise Appeal', 'Comedy Genre', 'Marketing Campaign', 'Fan Theories', 'Comparison Wars'],
    platforms: { reddit: 0.30, youtube: 0.40, twitter: 0.30 },
    avgThreat: 12,
    engagementMultiplier: 2.5,
    mentionCount: 850
  },
  homebound: {
    sentimentWeights: { positive: 0.33, neutral: 0.60, negative: 0.05, sarcastic: 0.02 },
    narratives: ['Thriller Genre', 'Plot Speculation', 'Technical Quality', 'Fan Theories', 'Regional Appeal', 'Marketing Campaign'],
    platforms: { reddit: 0.35, youtube: 0.35, twitter: 0.30 },
    avgThreat: 18,
    engagementMultiplier: 1.8,
    mentionCount: 720
  },
  bengalfiles: {
    sentimentWeights: { positive: 0.15, neutral: 0.25, negative: 0.55, sarcastic: 0.05 },
    narratives: ['Mystery Genre', 'Plot Speculation', 'Technical Quality', 'Regional Appeal', 'Box Office Bets', 'Fan Theories'],
    platforms: { reddit: 0.40, youtube: 0.35, twitter: 0.25 },
    avgThreat: 62,
    engagementMultiplier: 2.1,
    mentionCount: 780
  },
  jollyllb3: {
    sentimentWeights: { positive: 0.45, neutral: 0.35, negative: 0.15, sarcastic: 0.05 },
    narratives: ['Box Office Bets', 'Franchise Appeal', 'Legal Comedy', 'Marketing Campaign', 'Fan Theories', 'Comparison Wars'],
    platforms: { reddit: 0.30, youtube: 0.40, twitter: 0.30 },
    avgThreat: 28,
    engagementMultiplier: 2.2,
    mentionCount: 695
  },
  baramulla: {
    sentimentWeights: { positive: 0.42, neutral: 0.38, negative: 0.15, sarcastic: 0.05 },
    narratives: ['Drama Genre', 'Plot Speculation', 'Regional Appeal', 'Technical Quality', 'Fan Theories', 'Marketing Campaign'],
    platforms: { reddit: 0.35, youtube: 0.35, twitter: 0.30 },
    avgThreat: 32,
    engagementMultiplier: 2.0,
    mentionCount: 755
  },
  // Celebrities
  srk: {
    sentimentWeights: { positive: 0.80, neutral: 0.12, negative: 0.06, sarcastic: 0.02 },
    narratives: ['Box Office Bets', 'Fan Theories', 'Marketing Campaign', 'Director Hype', 'Regional Appeal', 'Plot Speculation'],
    platforms: { reddit: 0.25, youtube: 0.40, twitter: 0.35 },
    avgThreat: 15,
    engagementMultiplier: 3.0
  },
  salman: {
    sentimentWeights: { positive: 0.75, neutral: 0.15, negative: 0.07, sarcastic: 0.03 },
    narratives: ['Box Office Bets', 'Fan Theories', 'Regional Appeal', 'Marketing Campaign', 'Comparison Wars', 'Director Hype'],
    platforms: { reddit: 0.20, youtube: 0.45, twitter: 0.35 },
    avgThreat: 17,
    engagementMultiplier: 2.8
  },
  aamir: {
    sentimentWeights: { positive: 0.70, neutral: 0.20, negative: 0.08, sarcastic: 0.02 },
    narratives: ['Technical Quality', 'Plot Speculation', 'Director Hype', 'Box Office Bets', 'Fan Theories', 'Regional Appeal'],
    platforms: { reddit: 0.40, youtube: 0.35, twitter: 0.25 },
    avgThreat: 20,
    engagementMultiplier: 2.2
  },
  deepika: {
    sentimentWeights: { positive: 0.78, neutral: 0.14, negative: 0.06, sarcastic: 0.02 },
    narratives: ['Marketing Campaign', 'Technical Quality', 'Fan Theories', 'Regional Appeal', 'Box Office Bets', 'Plot Speculation'],
    platforms: { reddit: 0.25, youtube: 0.35, twitter: 0.40 },
    avgThreat: 16,
    engagementMultiplier: 2.6
  },
  priyanka: {
    sentimentWeights: { positive: 0.82, neutral: 0.12, negative: 0.05, sarcastic: 0.01 },
    narratives: ['Regional Appeal', 'Marketing Campaign', 'Fan Theories', 'Technical Quality', 'Box Office Bets', 'Comparison Wars'],
    platforms: { reddit: 0.30, youtube: 0.30, twitter: 0.40 },
    avgThreat: 14,
    engagementMultiplier: 2.9
  },
  rajini: {
    sentimentWeights: { positive: 0.85, neutral: 0.10, negative: 0.04, sarcastic: 0.01 },
    narratives: ['Fan Theories', 'Box Office Bets', 'Regional Appeal', 'Director Hype', 'Technical Quality', 'Marketing Campaign'],
    platforms: { reddit: 0.20, youtube: 0.50, twitter: 0.30 },
    avgThreat: 12,
    engagementMultiplier: 3.5
  },
  prabhas: {
    sentimentWeights: { positive: 0.77, neutral: 0.15, negative: 0.06, sarcastic: 0.02 },
    narratives: ['VFX Expectations', 'Box Office Bets', 'Fan Theories', 'Technical Quality', 'Regional Appeal', 'Plot Speculation'],
    platforms: { reddit: 0.30, youtube: 0.45, twitter: 0.25 },
    avgThreat: 18,
    engagementMultiplier: 2.7
  },
  allu: {
    sentimentWeights: { positive: 0.79, neutral: 0.13, negative: 0.06, sarcastic: 0.02 },
    narratives: ['Music & Soundtrack', 'Fan Theories', 'Box Office Bets', 'Regional Appeal', 'Marketing Campaign', 'Technical Quality'],
    platforms: { reddit: 0.25, youtube: 0.50, twitter: 0.25 },
    avgThreat: 16,
    engagementMultiplier: 2.8
  }
};
