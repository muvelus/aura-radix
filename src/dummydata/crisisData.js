// Crisis and negative sentiment data
export const generateNegativeMentions = (count = 50) => {
  const negativeTexts = [
    "The casting choice is questionable at best",
    "This looks like a copy of that Hollywood film",
    "The dialogue in the trailer is cringeworthy",
    "Waste of a talented ensemble cast",
    "The director has lost their touch completely",
    "This will bomb at the box office, mark my words",
    "Why do they keep making these mindless action films?",
    "The lead actor cannot carry a film of this scale",
    "Disappointing teaser, expected much better",
    "Another example of style over substance",
    "The editing in the trailer is choppy and confusing",
    "This looks dated already, like a 2010 film",
    "They should have cast someone else for this role",
    "The script clearly needed more work before production",
    "Too much reliance on VFX, not enough substance",
    "The tone is all over the place in the trailer",
    "This franchise should have ended years ago",
    "Completely misunderstood what made the original great",
    "Budget clearly wasn't used wisely",
    "Disappointing announcement for such a big project",
    "The premise sounds forced and unoriginal",
    "Can't believe they're making this when better stories exist",
    "This is going to be a waste of talent and resources",
    "The direction looks confused, no clear vision",
    "Visual effects look cheap for such a big production",
    "Not convinced this needed to be made",
    "The chemistry between leads looks forced",
    "This looks like it was made for a streaming platform, not theatres",
    "Concerned about the pacing based on the trailer",
    "The music score sounds generic and uninspired"
  ];

  const authors = [
    'amethystgems', 'aquamarineskies', 'arcticwhispers', 'autumnleavesfalling',
    'azurehorizons', 'beautifulnightsky', 'beeswaxcandles', 'blackpearl',
    'starryeyed_dreamer98', 'aesthetic__girl', 'flowerchild1999', 'hippiechick2468'
  ];

  const platforms = ['reddit', 'youtube', 'twitter'];

  const narratives = [
    'Casting Concerns',
    'Box Office Bets',
    'Technical Quality',
    'Comparison Wars',
    'Plot Speculation',
    'Director Hype',
    'Marketing Campaign'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `negative_${i}`,
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    author: authors[Math.floor(Math.random() * authors.length)],
    text: negativeTexts[Math.floor(Math.random() * negativeTexts.length)],
    sentiment: 'negative',
    aiSentiment: 'negative',
    aiThreatScore: 60 + Math.floor(Math.random() * 35),
    narrative: narratives[Math.floor(Math.random() * narratives.length)],
    engagement: {
      likes: Math.floor(Math.random() * 150),
      comments: Math.floor(Math.random() * 50),
      shares: Math.floor(Math.random() * 30)
    },
    userProfile: {
      accountAge: Math.floor(Math.random() * 3650),
      botProbability: Math.random() * 15,
      pastNegativeCount: Math.floor(Math.random() * 10),
      followerCount: Math.floor(Math.random() * 50000)
    },
    isAnomaly: Math.random() < 0.1
  }));
};

// Combined mentions dataset with negative and other sentiments for crisis analysis
export const generateCrisisData = (movieEntityId = 'dedepyaarde2') => {
  const positiveTexts = [
    "This looks absolutely amazing! Can't wait for release!",
    "The trailer just dropped and it's phenomenal!",
    "Best cast lineup I've seen in years!",
    "This is going to break box office records!",
    "Finally a worthy sequel! The director knows what they're doing"
  ];

  const neutralTexts = [
    "Release date confirmed for next month",
    "New poster revealed today",
    "Cast and crew announced",
    "Shooting wrapped up last week according to sources",
    "Budget estimated at 250 crores"
  ];

  const authors = [
    'amethystgems', 'aquamarineskies', 'arcticwhispers', 'autumnleavesfalling',
    'azurehorizons', 'beautifulnightsky', 'beeswaxcandles', 'blackpearl',
    'starryeyed_dreamer98', 'aesthetic__girl', 'flowerchild1999', 'hippiechick2468'
  ];

  const platforms = ['reddit', 'youtube', 'twitter'];

  const narratives = [
    'Casting Concerns',
    'Box Office Bets',
    'Technical Quality',
    'Comparison Wars',
    'Plot Speculation',
    'Director Hype',
    'Marketing Campaign',
    'Fan Theories'
  ];

  const negativeTexts = generateNegativeMentions(30).map(m => m.text);
  const allTexts = [...positiveTexts, ...neutralTexts, ...negativeTexts];

  const sentiments = ['negative', 'negative', 'negative', 'negative', 'neutral', 'neutral', 'positive'];

  return Array.from({ length: 100 }, (_, i) => {
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    let threatScore;
    
    if (sentiment === 'negative') {
      threatScore = 60 + Math.floor(Math.random() * 35);
    } else if (sentiment === 'neutral') {
      threatScore = 20 + Math.floor(Math.random() * 20);
    } else {
      threatScore = Math.floor(Math.random() * 20);
    }

    return {
      id: `mention_${i}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      author: authors[Math.floor(Math.random() * authors.length)],
      text: allTexts[Math.floor(Math.random() * allTexts.length)],
      sentiment,
      aiSentiment: sentiment,
      aiThreatScore: threatScore,
      narrative: narratives[Math.floor(Math.random() * narratives.length)],
      engagement: {
        likes: Math.floor(Math.random() * 200),
        comments: Math.floor(Math.random() * 80),
        shares: Math.floor(Math.random() * 50)
      },
      userProfile: {
        accountAge: Math.floor(Math.random() * 3650),
        botProbability: Math.random() * 20,
        pastNegativeCount: Math.floor(Math.random() * 15),
        followerCount: Math.floor(Math.random() * 100000)
      },
      isAnomaly: Math.random() < 0.08,
      entityId: movieEntityId
    };
  });
};

// Response strategy templates
export const crisisResponseStrategies = {
  'Casting Concerns': {
    strategy: 'Transparency & Trust Building',
    actions: ['Share casting rationale', 'Highlight actor\'s preparation', 'Behind-the-scenes content']
  },
  'Box Office Bets': {
    strategy: 'Confidence & Excitement',
    actions: ['Share pre-booking numbers', 'Highlight advance bookings', 'Showcase fan excitement']
  },
  'Technical Quality': {
    strategy: 'Quality Assurance',
    actions: ['Share VFX breakdown videos', 'Highlight technical team credentials', 'Preview clips']
  },
  'Comparison Wars': {
    strategy: 'Unique Value Proposition',
    actions: ['Emphasize unique storyline', 'Highlight differentiators', 'Celebrate both projects']
  },
  'Plot Speculation': {
    strategy: 'Intrigue & Mystery',
    actions: ['Tease without spoiling', 'Share character insights', 'Build anticipation']
  },
  'Director Hype': {
    strategy: 'Leverage Track Record',
    actions: ['Highlight past successes', 'Share director vision', 'Interview snippets']
  },
  'Marketing Campaign': {
    strategy: 'Strategic Communication',
    actions: ['Clarify campaign objectives', 'Share behind-the-scenes', 'Engage with feedback']
  },
  'Fan Theories': {
    strategy: 'Community Engagement',
    actions: ['Acknowledge theories', 'Hint at accuracy', 'Foster discussion']
  },
  'default': {
    strategy: 'Active Listening & Engagement',
    actions: ['Acknowledge concerns', 'Provide updates', 'Engage positively']
  }
};
