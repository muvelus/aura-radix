// Box Office Predictions per Movie
export const boxOfficePredictions = {
  dedepyaarde2: {
    predicted: 2400000000, // 240 crores
    confidence: 82,
    range: { min: 1900000000, max: 2900000000 },
    trend: 'up',
    factors: [
      { name: 'Franchise Recognition', score: 88, impact: 'positive' },
      { name: 'Star Power (Ajay Devgn)', score: 92, impact: 'positive' },
      { name: 'Comedy Genre Appeal', score: 80, impact: 'positive' },
      { name: 'Pre-release Buzz', score: 76, impact: 'neutral' },
      { name: 'Box Office Competition', score: 68, impact: 'negative' }
    ]
  },
  homebound: {
    predicted: 1200000000, // 120 crores
    confidence: 70,
    range: { min: 800000000, max: 1600000000 },
    trend: 'neutral',
    factors: [
      { name: 'Thriller Genre Appeal', score: 75, impact: 'positive' },
      { name: 'Emerging Star Power', score: 68, impact: 'neutral' },
      { name: 'Production Quality', score: 72, impact: 'neutral' },
      { name: 'Marketing Campaign', score: 70, impact: 'neutral' },
      { name: 'Market Saturation', score: 60, impact: 'negative' }
    ]
  },
  bengalfiles: {
    predicted: 1800000000, // 180 crores
    confidence: 75,
    range: { min: 1400000000, max: 2300000000 },
    trend: 'up',
    factors: [
      { name: 'Mystery Genre Trend', score: 82, impact: 'positive' },
      { name: 'Regional Content Appeal', score: 78, impact: 'positive' },
      { name: 'Production Values', score: 76, impact: 'positive' },
      { name: 'Social Buzz', score: 73, impact: 'neutral' },
      { name: 'Niche Audience', score: 65, impact: 'neutral' }
    ]
  },
  jollyllb3: {
    predicted: 1600000000, // 160 crores
    confidence: 78,
    range: { min: 1200000000, max: 2100000000 },
    trend: 'up',
    factors: [
      { name: 'Franchise Success', score: 90, impact: 'positive' },
      { name: 'Legal Comedy Genre', score: 84, impact: 'positive' },
      { name: 'Audience Loyalty', score: 86, impact: 'positive' },
      { name: 'Star Power', score: 79, impact: 'positive' },
      { name: 'September Release', score: 72, impact: 'neutral' }
    ]
  },
  baramulla: {
    predicted: 1400000000, // 140 crores
    confidence: 72,
    range: { min: 1000000000, max: 1900000000 },
    trend: 'neutral',
    factors: [
      { name: 'Drama Genre Appeal', score: 76, impact: 'positive' },
      { name: 'Strong Narrative', score: 80, impact: 'positive' },
      { name: 'Production Quality', score: 74, impact: 'neutral' },
      { name: 'Regional Focus', score: 70, impact: 'neutral' },
      { name: 'Limited Marketing', score: 62, impact: 'negative' }
    ]
  }
};
