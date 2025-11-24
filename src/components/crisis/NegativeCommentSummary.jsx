import React, { useMemo } from 'react';
import { AlertCircle, TrendingDown, MessageSquare, Lightbulb, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { generateCrisisData, crisisResponseStrategies } from '../../dummydata';

export default function NegativeCommentSummary({ mentions: mentionsProps, selectedEntity }) {
  // Use provided mentions if they have content, otherwise generate sample data for the selected entity
  const mentions = useMemo(() => {
    if (mentionsProps && mentionsProps.length > 0) {
      return mentionsProps;
    }
    // Generate sample data if no mentions provided or empty
    return generateCrisisData(selectedEntity?.id || 'dedepyaarde2');
  }, [mentionsProps, selectedEntity?.id]);
  // Filter negative comments
  const negativeComments = useMemo(() => 
    mentions?.filter(m => m.aiSentiment === 'negative') || [], 
    [mentions]
  );

  // Extract top themes from negative comments
  const themes = useMemo(() => {
    if (!negativeComments.length) return [];

    // Count narratives in negative comments
    const narrativeCounts = {};
    negativeComments.forEach(comment => {
      narrativeCounts[comment.narrative] = (narrativeCounts[comment.narrative] || 0) + 1;
    });

    // Get top 3 themes
    return Object.entries(narrativeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([theme, count]) => ({
        theme,
        count,
        percentage: Math.round((count / negativeComments.length) * 100)
      }));
  }, [negativeComments]);

  // Get sample comments for each theme
  const getSampleComments = (theme) => {
    return negativeComments
      .filter(c => c.narrative === theme)
      .slice(0, 2)
      .map(c => {
        const fullText = c.text || c.textSnippet || '';
        return {
          text: fullText.slice(0, 120) + (fullText.length > 120 ? '...' : ''),
          author: c.author || 'Unknown',
          platform: c.platform || 'unknown'
        };
      });
  };

  // Sentiment distribution for pie chart
  const sentimentData = useMemo(() => {
    if (!mentions?.length) return [];
    
    const total = mentions.length;
    const negative = negativeComments.length;
    const positive = mentions.filter(m => m.aiSentiment === 'positive').length;
    const neutral = mentions.filter(m => m.aiSentiment === 'neutral').length;

    return [
      { name: 'Negative', value: negative, color: '#ef4444' },
      { name: 'Positive', value: positive, color: '#10b981' },
      { name: 'Neutral', value: neutral, color: '#eab308' }
    ];
  }, [mentions, negativeComments]);

  // Trending concerns (mock data showing growth over time)
  const trendingConcerns = useMemo(() => {
    if (!themes.length) return [];
    
    return themes.map((theme, idx) => ({
      concern: theme.theme,
      growth: [15, 22, 35, 28, 42, 38, theme.count][idx % 7] // Simplified trend
    }));
  }, [themes]);

  // AI-recommended responses based on themes
  const getRecommendedResponses = () => {
    if (!themes.length) return [];

    return themes.map(theme => ({
      theme: theme.theme,
      ...crisisResponseStrategies[theme.theme] || crisisResponseStrategies.default
    }));
  };

  const recommendedResponses = useMemo(() => getRecommendedResponses(), [themes]);

  if (!mentions?.length) {
    return (
      <div className="h-full flex items-center justify-center bg-background p-6">
        <div className="text-center text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No mentions available for analysis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Negative Sentiment Analysis</h2>
            <p className="text-sm text-muted-foreground">
              AI-powered insights from {negativeComments.length} negative mentions
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className="text-xs text-muted-foreground">Negative Count</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{negativeComments.length}</p>
            <p className="text-xs text-red-500 mt-1">
              {Math.round((negativeComments.length / mentions.length) * 100)}% of total
            </p>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-muted-foreground">Top Theme</span>
            </div>
            <p className="text-lg font-bold text-foreground">{themes[0]?.theme || 'N/A'}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {themes[0]?.count || 0} mentions
            </p>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-muted-foreground">Response Urgency</span>
            </div>
            <p className="text-lg font-bold text-orange-500">
              {negativeComments.length > 20 ? 'High' : negativeComments.length > 10 ? 'Medium' : 'Low'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Action recommended
            </p>
          </div>
        </div>

        {/* Sentiment Distribution */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Sentiment Distribution</h3>
          <div className="flex items-center gap-6">
            <div className="w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {sentimentData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {item.value} ({Math.round((item.value / mentions.length) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Negative Themes */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Top Negative Themes</h3>
          <div className="space-y-4">
            {themes.map((theme, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-red-500">{idx + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{theme.theme}</p>
                      <p className="text-xs text-muted-foreground">
                        {theme.count} mentions ({theme.percentage}% of negative)
                      </p>
                    </div>
                  </div>
                  <div className="h-2 w-24 bg-background rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500"
                      style={{ width: `${theme.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Sample Comments */}
                <div className="ml-11 space-y-2">
                  {getSampleComments(theme.theme).map((comment, commentIdx) => (
                    <div 
                      key={commentIdx}
                      className="p-3 bg-accent/30 rounded-lg border border-border/50"
                    >
                      <p className="text-xs text-foreground mb-2">"{comment.text}"</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>@{comment.author}</span>
                        <span>•</span>
                        <span className="capitalize">{comment.platform}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI-Recommended Response Approaches */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">AI-Recommended Response Strategy</h3>
          </div>
          <div className="space-y-4">
            {recommendedResponses.map((response, idx) => (
              <div key={idx} className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground mb-1">{response.theme}</p>
                    <p className="text-xs text-primary mb-3">Strategy: {response.strategy}</p>
                    <ul className="space-y-1.5">
                      {response.actions.map((action, actionIdx) => (
                        <li key={actionIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-primary mt-0.5">→</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
