import React, { useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { celebrityAnalytics } from '../../dummydata';
import CelebrityAnalytics from './CelebrityAnalytics';
import GenreTrends from './GenreTrends';
import TrendingNarratives from './TrendingNarratives';
import CompetitivePositioning from './CompetitivePositioning';

export default function DashboardView({ selectedEntity, entityType, competitiveData, mentions }) {
  // Determine if we're showing celebrity or movie data
  const isCelebrity = entityType === 'celebrity';

  // Extract trending narratives from mentions
  const trendingNarratives = useMemo(() => {
    if (!mentions?.length) return [];

    // Count mentions by narrative
    const narrativeCounts = {};
    const narrativeSentiments = {};

    mentions.forEach(mention => {
      const narrative = mention.narrative;
      if (!narrativeCounts[narrative]) {
        narrativeCounts[narrative] = 0;
        narrativeSentiments[narrative] = { positive: 0, negative: 0, neutral: 0 };
      }
      narrativeCounts[narrative]++;
      narrativeSentiments[narrative][mention.aiSentiment]++;
    });

    // Convert to array and sort by count
    const narratives = Object.entries(narrativeCounts)
      .map(([narrative, count]) => {
        const sentiments = narrativeSentiments[narrative];
        const total = count;
        const positivePercent = Math.round((sentiments.positive / total) * 100);
        const negativePercent = Math.round((sentiments.negative / total) * 100);
        const neutralPercent = Math.round((sentiments.neutral / total) * 100);
        
        // Simulate growth trend (positive if more positive than negative)
        const growth = positivePercent > negativePercent ? 
          Math.floor(Math.random() * 15) + 5 : 
          -(Math.floor(Math.random() * 10) + 3);

        return {
          narrative,
          count,
          positivePercent,
          negativePercent,
          neutralPercent,
          growth,
          trend: growth > 5 ? 'up' : growth < -3 ? 'down' : 'stable'
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    return narratives;
  }, [mentions]);

  // Format currency helper
  const formatCurrency = (value) => {
    const crores = value / 10000000;
    return `₹${crores.toFixed(0)} Cr`;
  };

  // Get celebrity analytics for selected entity (celebrities)
  const celebrityData = isCelebrity && selectedEntity?.id && celebrityAnalytics[selectedEntity.id]
    ? celebrityAnalytics[selectedEntity.id]
    : {
        socialReach: 25000000,
        brandValue: 2000000000,
        endorsementScore: 80,
        fanEngagement: 75,
        trend: 'neutral',
        recentProjects: [
          { title: 'Upcoming Film', status: 'Development', buzz: 75 }
        ],
        metrics: [
          { name: 'Social Media Influence', score: 75, impact: 'neutral' },
          { name: 'Brand Power', score: 80, impact: 'positive' },
          { name: 'Fan Loyalty', score: 78, impact: 'positive' },
          { name: 'Box Office Track Record', score: 75, impact: 'neutral' },
          { name: 'Controversy Risk', score: 30, impact: 'neutral' }
        ]
      };

  // Genre Trends Data
  const genreTrends = [
    { genre: 'Action', sentiment: 92, buzz: 3200, trend: 15, color: '#ef4444' },
    { genre: 'Drama', sentiment: 58, buzz: 1400, trend: -8, color: '#f59e0b' },
    { genre: 'Comedy', sentiment: 45, buzz: 980, trend: -12, color: '#10b981' },
    { genre: 'Thriller', sentiment: 76, buzz: 2600, trend: 22, color: '#8b5cf6' },
    { genre: 'Romance', sentiment: 38, buzz: 720, trend: -18, color: '#ec4899' },
    { genre: 'Sci-Fi', sentiment: 88, buzz: 3800, trend: 28, color: '#3b82f6' }
  ];

  // Weekly trend data for chart
  const weeklyTrends = [
    { day: 'Mon', action: 78, thriller: 68, scifi: 82 },
    { day: 'Tue', action: 82, thriller: 72, scifi: 85 },
    { day: 'Wed', action: 85, thriller: 75, scifi: 87 },
    { day: 'Thu', action: 88, thriller: 78, scifi: 89 },
    { day: 'Fri', action: 91, thriller: 82, scifi: 91 },
    { day: 'Sat', action: 89, thriller: 80, scifi: 88 },
    { day: 'Sun', action: 92, thriller: 76, scifi: 88 }
  ];

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">AI Analytics Dashboard</h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary rounded-lg">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered</span>
          </div>
        </div>

        {/* Genre Trends Section */}
        <GenreTrends genreTrends={genreTrends} weeklyTrends={weeklyTrends} />

        {/* Trending Narratives Section */}
        {/* {mentions && mentions.length > 0 && (
          <TrendingNarratives trendingNarratives={trendingNarratives} />
        )} */}

        {/* Competitive Positioning */}
        <CompetitivePositioning competitiveData={competitiveData} />
      </div>
    </div>
  );
}
