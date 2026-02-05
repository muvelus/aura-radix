import React, { useMemo } from 'react';
import { AlertCircle, TrendingDown, MessageSquare, Lightbulb } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { crisisResponseStrategies } from '../../dummydata';

export default function NegativeCommentSummary({ mentions: mentionsProps, selectedEntity }) {
  // Filter negative comments from API response
  const negativeComments = useMemo(() => {
    if (!mentionsProps?.length) return [];
    // Filter for negative sentiment (API returns uppercase NEGATIVE/POSITIVE/NEUTRAL)
    return mentionsProps.filter(m => m.sentiment === 'NEGATIVE' || m.aiSentiment === 'negative') || [];
  }, [mentionsProps]);

  // Group comments by platform for theme analysis
  const platformGroups = useMemo(() => {
    if (!negativeComments.length) return {};
    
    const groups = {};
    negativeComments.forEach(comment => {
      const platform = comment.platform || 'Unknown';
      if (!groups[platform]) {
        groups[platform] = [];
      }
      groups[platform].push(comment);
    });
    
    return groups;
  }, [negativeComments]);

  // Get top platforms as "themes"
  const themes = useMemo(() => {
    if (!negativeComments.length) return [];
    
    return Object.entries(platformGroups)
      .map(([platform, comments]) => ({
        theme: platform,
        count: comments.length,
        percentage: Math.round((comments.length / negativeComments.length) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [platformGroups, negativeComments]);

  // Get all comments for each platform
  const getAllComments = (platform) => {
    return platformGroups[platform]?.map(c => ({
      text: c.content || 'No content',
      author: c.author || 'Unknown',
      platform: c.platform || 'unknown',
      postDate: c.postDate,
      postId: c.postId
    })) || [];
  };

  // Sentiment distribution for pie chart
  const sentimentData = useMemo(() => {
    if (!mentionsProps?.length) return [];
    
    const negative = negativeComments.length;
    const positive = mentionsProps.filter(m => m.sentiment === 'POSITIVE' || m.aiSentiment === 'positive').length;
    const neutral = mentionsProps.filter(m => m.sentiment === 'NEUTRAL' || m.aiSentiment === 'neutral').length;

    return [
      { name: 'Negative', value: negative, color: '#ef4444' },
      { name: 'Positive', value: positive, color: '#10b981' },
      { name: 'Neutral', value: neutral, color: '#eab308' }
    ];
  }, [mentionsProps, negativeComments]);

  // AI-recommended responses based on platforms
  const getRecommendedResponses = () => {
    if (!themes.length) return [];

    return themes.map(theme => ({
      theme: theme.theme,
      strategy: `Respond to ${theme.theme} audience concerns`,
      actions: [
        `Monitor ${theme.theme} channels for similar complaints`,
        `Prepare platform-specific response content`,
        `Engage with community managers on ${theme.theme}`
      ]
    }));
  };

  const recommendedResponses = useMemo(() => getRecommendedResponses(), [themes]);

  if (!mentionsProps?.length) {
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
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className="text-xs text-muted-foreground">Negative Mentions</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{negativeComments.length}</p>
            <p className="text-xs text-red-500 mt-1">
              {mentionsProps?.length ? Math.round((negativeComments.length / mentionsProps.length) * 100) : 0}% of total
            </p>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-muted-foreground">Most Active Platform</span>
            </div>
            <p className="text-lg font-bold text-foreground">{themes[0]?.theme || 'N/A'}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {themes[0]?.count || 0} negative mentions
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
                    {item.value} ({Math.round((item.value / mentionsProps.length) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Negative Platforms */}
        {/* <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Negative Comments by Platform</h3>
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

                
                <div className="ml-11 space-y-2">
                  {getAllComments(theme.theme).map((comment, commentIdx) => (
                    <div 
                      key={commentIdx}
                      className="p-3 bg-accent/30 rounded-lg border border-border/50"
                    >
                      <p className="text-xs text-foreground mb-2">"{comment.text}"</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>@{comment.author}</span>
                        <span>•</span>
                        <span className="capitalize">{comment.platform}</span>
                        {comment.postDate && (
                          <>
                            <span>•</span>
                            <span>{new Date(comment.postDate).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* AI-Recommended Response Approaches */}
        {/* <div className="bg-card border border-border rounded-xl p-6">
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
        </div> */}
      </div>
    </div>
  );
}
