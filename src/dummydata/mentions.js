import { entityProfiles } from './entityProfiles';
import { movies } from './movies';
import { movieRealCommentsMap } from './realComments';

// Sample text content for different sentiments
const sampleTexts = {
  positive: [
    "This looks absolutely amazing! Can't wait for release!",
    "The trailer just dropped and it's phenomenal!",
    "Best cast lineup I've seen in years!",
    "This is going to break box office records!",
    "Finally a worthy sequel! The director knows what they're doing",
    "The cinematography in this looks stunning! Oscar-worthy",
    "Already booked my tickets for opening weekend!",
    "This is exactly what cinema needs right now",
    "The music director has outdone themselves this time",
    "Can't stop watching the teaser! Goosebumps every time",
    "The production values look insane! Worth every rupee",
    "This will redefine the action genre in Indian cinema",
    "The star's dedication to this role is inspiring",
    "Finally a movie that respects the audience's intelligence",
    "The behind-the-scenes content shows real passion",
    "This director never disappoints! Day one ticket confirmed",
    "The supporting cast is incredibly talented!",
    "This is the kind of original storytelling we need",
    "The world-building in this looks fantastic",
    "Can already tell this will be a cultural phenomenon",
    "The attention to detail in every frame is remarkable"
  ],
  neutral: [
    "Interesting choice of director for this project",
    "Release date confirmed for next month",
    "New poster revealed today",
    "Cast and crew announced",
    "Shooting wrapped up last week according to sources",
    "Budget estimated at 300 crores",
    "Post-production in full swing",
    "Film certification received, runtime is 165 minutes",
    "Advance booking opens next Friday",
    "The film will release in 5 languages simultaneously",
    "Press conference scheduled for tomorrow",
    "International distribution rights sold",
    "First look reveals period costume drama",
    "Film's official X handle launched",
    "Principal photography began in January",
    "Music album will feature 6 original compositions",
    "The film has been shot across 4 countries",
    "Director's previous film crossed 500 crores worldwide",
    "Satellite rights acquired by major broadcaster"
  ],
  negative: [
    "Another cash grab sequel nobody asked for",
    "The CGI looks terrible in the trailer",
    "They completely ruined the original concept",
    "Casting choice is questionable at best",
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
    "Completely misunderstood what made the original great"
  ],
  sarcastic: [
    "Oh great, another reboot. Just what we needed.",
    "Wow, so original. Never seen this before.",
    "I'm sure this will be a masterpiece /s",
    "Can't wait for this to flop spectacularly",
    "Another 'pan-India' film that'll work nowhere",
    "Because we definitely needed another multiverse story",
    "Nothing says quality like announcing a sequel before release",
    "The CGI budget clearly went to the catering",
    "Revolutionary filmmaking... if you're living in 1995",
    "Such unique storytelling, totally not a remake /s",
    "Can't wait to see this on OTT in 3 weeks",
    "The trailer has all 3 good scenes from the movie",
    "I'm sure the plot will make total sense /s",
    "Another masterclass in wasting a big budget",
    "Bet the director's cut will fix everything /s",
    "Can't wait for the unnecessary sequel in 2 years",
    "Revolutionary CGI... for the PlayStation 2 era"
  ]
};

const authors = [
  'MovieBuff2024', 'CinematicCritic', 'FilmFanatic99', 'RedditUser123',
  'InstagramUser', 'XUser', 'PopcornLover', 'BlockbusterFan',
  'IndieWatcher', 'HollywoodInsider', 'BoxOfficeTracker', 'GenreExpert',
  'CinephileDaily', 'TrailerReactions', 'FilmAnalyst', 'BollywoodBuzz',
  'TollywoodTalks', 'MasalaReviews', 'ScreenSavvy', 'ReelTalk',
  'CinemaSphere', 'FrameByFrame', 'PlotTwister', 'ActionJunkie',
  'DramaQueen', 'ThrillerSeeker', 'RomComFan', 'HorrorHound'
];

export const generateMentions = (count = 100, entityId = 'dedepyaarde2') => {
  const profile = entityProfiles[entityId] || entityProfiles.dedepyaarde2;
  
  // Get real comments if available for this entity
  const realCommentsList = movieRealCommentsMap[entityId] || [];
  const hasRealComments = realCommentsList.length > 0;
  
  // Use mention count from profile if available, otherwise use passed count
  const mentionCount = profile.mentionCount || count;
  const platforms = ['reddit', 'youtube', 'twitter'];
  const sentiments = ['positive', 'neutral', 'negative', 'sarcastic'];
  const narratives = profile.narratives;
  
  return Array.from({ length: mentionCount }, (_, i) => {
    let sentiment, author, text, narrativeUsed;
    
    // Use real comments when available and rotating through them
    if (hasRealComments && i < realCommentsList.length) {
      const realComment = realCommentsList[i];
      text = realComment.text;
      author = realComment.author;
      sentiment = realComment.sentiment;
      narrativeUsed = realComment.narrative;
    } else {
      // Use weighted random selection for sentiment based on entity profile
      const rand = Math.random();
      let cumulative = 0;
      sentiment = 'neutral';
      for (const [sent, weight] of Object.entries(profile.sentimentWeights)) {
        cumulative += weight;
        if (rand <= cumulative) {
          sentiment = sent;
          break;
        }
      }
      
      narrativeUsed = narratives[Math.floor(Math.random() * narratives.length)];
      author = authors[Math.floor(Math.random() * authors.length)];
      const texts = sampleTexts[sentiment];
      text = texts[Math.floor(Math.random() * texts.length)];
    }
    
    // Use weighted platform selection
    const platformRand = Math.random();
    let platformCumulative = 0;
    let platform = 'reddit';
    for (const [plat, weight] of Object.entries(profile.platforms)) {
      platformCumulative += weight;
      if (platformRand <= platformCumulative) {
        platform = plat;
        break;
      }
    }
    
    // Generate timestamps spread across the last 60 days for better distribution
    const timestamp = new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000);
    
    // Calculate threat score based on sentiment and entity profile
    const baseThreat = sentiment === 'negative' ? 60 + Math.random() * 40 :
                       sentiment === 'sarcastic' ? 40 + Math.random() * 30 :
                       sentiment === 'neutral' ? Math.random() * 40 :
                       Math.random() * 20;
    
    // Adjust threat score based on entity's average threat level
    const threatScore = Math.min(100, baseThreat + (profile.avgThreat - 25));
    
    const isAnomaly = threatScore > 70 && Math.random() > 0.7;
    
    // Generate platform-specific URLs
    const postId = Math.random().toString(36).substring(2, 15);
    const sourceUrl = platform === 'reddit' ? `https://reddit.com/r/movies/comments/${postId}` :
                     platform === 'youtube' ? `https://instagram.com/p/${postId}` :
                     `https://twitter.com/${author}/status/${postId}`;
    
    // Adjust engagement based on entity's popularity
    const baseEngagement = Math.floor(Math.random() * 1000);
    const adjustedEngagement = Math.floor(baseEngagement * profile.engagementMultiplier);
    
    return {
      id: `mention-${i}`,
      platform,
      author,
      authorId: `${author.toLowerCase()}_${Math.floor(Math.random() * 10000)}`,
      timestamp,
      textSnippet: text,
      text: text,
      sourceUrl,
      aiSentiment: sentiment,
      aiThreatScore: Math.round(threatScore),
      narrative: narrativeUsed,
      isAnomaly,
      isRealComment: hasRealComments && i < realCommentsList.length,
      engagement: {
        likes: adjustedEngagement,
        comments: Math.floor(adjustedEngagement * 0.1),
        shares: Math.floor(adjustedEngagement * 0.05)
      },
      userProfile: {
        accountAge: Math.floor(Math.random() * 3650), // days
        botProbability: Math.random() * 100,
        pastNegativeCount: Math.floor(Math.random() * 20),
        followerCount: Math.floor(Math.random() * 100000)
      }
    };
  }).sort((a, b) => {
    // Real comments always come first
    if (a.isRealComment && !b.isRealComment) return -1;
    if (!a.isRealComment && b.isRealComment) return 1;
    // Then sort by timestamp (newest first)
    return b.timestamp - a.timestamp;
  });
};
