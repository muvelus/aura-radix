// Celebrities data
export const celebrities = [
  { id: 'srk', name: 'Shah Rukh Khan', description: 'Bollywood superstar', type: 'actor' },
  { id: 'salman', name: 'Salman Khan', description: 'Box office king', type: 'actor' },
  { id: 'aamir', name: 'Aamir Khan', description: 'Mr. Perfectionist', type: 'actor' },
  { id: 'deepika', name: 'Deepika Padukone', description: 'Leading actress', type: 'actor' },
  { id: 'priyanka', name: 'Priyanka Chopra', description: 'Global icon', type: 'actor' },
  { id: 'rajini', name: 'Rajinikanth', description: 'Thalaivar', type: 'actor' },
  { id: 'prabhas', name: 'Prabhas', description: 'Pan-India star', type: 'actor' },
  { id: 'allu', name: 'Allu Arjun', description: 'Stylish star', type: 'actor' }
];

// Celebrity Analytics per Celebrity
export const celebrityAnalytics = {
  srk: {
    socialReach: 45000000, // 45M followers
    brandValue: 2800000000, // ₹2800 Cr
    endorsementScore: 94,
    fanEngagement: 89,
    trend: 'up',
    recentProjects: [
      { title: 'Pathaan 2', status: 'In Production', buzz: 92 },
      { title: 'King', status: 'Pre-Production', buzz: 88 }
    ],
    metrics: [
      { name: 'Social Media Influence', score: 96, impact: 'positive' },
      { name: 'Box Office Track Record', score: 92, impact: 'positive' },
      { name: 'Brand Endorsements', score: 94, impact: 'positive' },
      { name: 'Fan Loyalty', score: 95, impact: 'positive' },
      { name: 'Controversy Risk', score: 15, impact: 'positive' }
    ]
  },
  salman: {
    socialReach: 52000000, // 52M followers
    brandValue: 3100000000, // ₹3100 Cr
    endorsementScore: 91,
    fanEngagement: 93,
    trend: 'up',
    recentProjects: [
      { title: 'Tiger vs Pathaan', status: 'Announced', buzz: 95 },
      { title: 'Sikander', status: 'Filming', buzz: 89 }
    ],
    metrics: [
      { name: 'Mass Appeal', score: 98, impact: 'positive' },
      { name: 'Loyal Fanbase', score: 96, impact: 'positive' },
      { name: 'Brand Power', score: 91, impact: 'positive' },
      { name: 'Box Office Guarantee', score: 93, impact: 'positive' },
      { name: 'Critical Reception', score: 68, impact: 'neutral' }
    ]
  },
  aamir: {
    socialReach: 28000000, // 28M followers
    brandValue: 2500000000, // ₹2500 Cr
    endorsementScore: 88,
    fanEngagement: 82,
    trend: 'neutral',
    recentProjects: [
      { title: 'Sitaare Zameen Par', status: 'Post-Production', buzz: 85 },
      { title: 'Mahabharata', status: 'Development', buzz: 90 }
    ],
    metrics: [
      { name: 'Critical Acclaim', score: 95, impact: 'positive' },
      { name: 'Perfectionist Image', score: 93, impact: 'positive' },
      { name: 'Content Quality', score: 92, impact: 'positive' },
      { name: 'Social Media Presence', score: 65, impact: 'neutral' },
      { name: 'Recent Track Record', score: 72, impact: 'neutral' }
    ]
  },
  deepika: {
    socialReach: 74000000, // 74M followers
    brandValue: 2200000000, // ₹2200 Cr
    endorsementScore: 96,
    fanEngagement: 91,
    trend: 'up',
    recentProjects: [
      { title: 'Fighter 2', status: 'Development', buzz: 87 },
      { title: 'Singham Again', status: 'Post-Production', buzz: 89 }
    ],
    metrics: [
      { name: 'Global Recognition', score: 94, impact: 'positive' },
      { name: 'Brand Endorsements', score: 96, impact: 'positive' },
      { name: 'Social Media Reach', score: 97, impact: 'positive' },
      { name: 'Acting Versatility', score: 89, impact: 'positive' },
      { name: 'Box Office Pull', score: 85, impact: 'positive' }
    ]
  },
  priyanka: {
    socialReach: 89000000, // 89M followers (global)
    brandValue: 2400000000, // ₹2400 Cr
    endorsementScore: 92,
    fanEngagement: 88,
    trend: 'up',
    recentProjects: [
      { title: 'Citadel Season 2', status: 'Filming', buzz: 91 },
      { title: 'Jee Le Zaraa', status: 'Development', buzz: 86 }
    ],
    metrics: [
      { name: 'International Presence', score: 98, impact: 'positive' },
      { name: 'Global Brand Power', score: 95, impact: 'positive' },
      { name: 'Social Activism', score: 90, impact: 'positive' },
      { name: 'Bollywood Connect', score: 75, impact: 'neutral' },
      { name: 'Production House', score: 82, impact: 'positive' }
    ]
  },
  rajini: {
    socialReach: 15000000, // 15M followers (but massive offline presence)
    brandValue: 3500000000, // ₹3500 Cr
    endorsementScore: 89,
    fanEngagement: 97,
    trend: 'up',
    recentProjects: [
      { title: 'Coolie', status: 'Filming', buzz: 94 },
      { title: 'Thalaivar 171', status: 'Announced', buzz: 90 }
    ],
    metrics: [
      { name: 'God-Level Status', score: 99, impact: 'positive' },
      { name: 'Pan-India Appeal', score: 94, impact: 'positive' },
      { name: 'Box Office Magic', score: 96, impact: 'positive' },
      { name: 'Brand Legacy', score: 98, impact: 'positive' },
      { name: 'Age Factor', score: 68, impact: 'neutral' }
    ]
  },
  prabhas: {
    socialReach: 32000000, // 32M followers
    brandValue: 2900000000, // ₹2900 Cr
    endorsementScore: 90,
    fanEngagement: 94,
    trend: 'up',
    recentProjects: [
      { title: 'Kalki 2', status: 'Pre-Production', buzz: 96 },
      { title: 'Spirit', status: 'Development', buzz: 88 }
    ],
    metrics: [
      { name: 'Pan-India Superstar', score: 97, impact: 'positive' },
      { name: 'Box Office Guarantee', score: 93, impact: 'positive' },
      { name: 'Fan Devotion', score: 96, impact: 'positive' },
      { name: 'Content Choices', score: 78, impact: 'neutral' },
      { name: 'Brand Endorsements', score: 90, impact: 'positive' }
    ]
  },
  allu: {
    socialReach: 38000000, // 38M followers
    brandValue: 2600000000, // ₹2600 Cr
    endorsementScore: 93,
    fanEngagement: 95,
    trend: 'up',
    recentProjects: [
      { title: 'Pushpa 2', status: 'Post-Production', buzz: 98 },
      { title: 'AA22', status: 'Development', buzz: 85 }
    ],
    metrics: [
      { name: 'Pan-India Phenomenon', score: 96, impact: 'positive' },
      { name: 'Style Icon Status', score: 94, impact: 'positive' },
      { name: 'Dance & Performance', score: 95, impact: 'positive' },
      { name: 'National Recognition', score: 92, impact: 'positive' },
      { name: 'Brand Value Growth', score: 93, impact: 'positive' }
    ]
  }
};
