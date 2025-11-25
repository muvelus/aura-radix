import React, { useState, useMemo } from 'react';
import { MessageSquare, Heart, MessageCircle, Share2, AlertTriangle, Star } from 'lucide-react';

export default function SocialMediaFeed({ mentions, selectedEntity }) {
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // Group and filter mentions by platform
  const platformMentions = useMemo(() => {
    if (!mentions || mentions.length === 0) {
      return { all: [], reddit: [], instagram: [], twitter: [] };
    }

    const grouped = {
      all: mentions.slice(0, 20), // Show latest 20 for all
      reddit: mentions.filter(m => m.platform === 'reddit').slice(0, 15),
      instagram: mentions.filter(m => m.platform === 'youtube').slice(0, 15), // youtube used for instagram
      twitter: mentions.filter(m => m.platform === 'twitter').slice(0, 15)
    };

    return grouped;
  }, [mentions]);

  const displayMentions = platformMentions[selectedPlatform] || platformMentions.all;

  const platformInfo = {
    reddit: { icon: '🔴', name: 'Reddit', color: 'text-[#FF4500]', bg: 'bg-[#FF4500]/10' },
    instagram: { icon: '📷', name: 'Instagram', color: 'text-[#E1306C]', bg: 'bg-[#E1306C]/10' },
    twitter: { icon: '𝕏', name: 'X (Twitter)', color: 'text-black', bg: 'bg-black/10' },
    all: { icon: '🌐', name: 'All Platforms', color: 'text-primary', bg: 'bg-primary/10' }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      case 'neutral':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getSentimentBg = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500/10';
      case 'negative':
        return 'bg-red-500/10';
      case 'neutral':
        return 'bg-yellow-500/10';
      default:
        return 'bg-gray-500/10';
    }
  };

  const getThreatLevel = (score) => {
    if (score >= 70) return { label: 'High', color: 'text-red-500', bg: 'bg-red-500/10' };
    if (score >= 40) return { label: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    return { label: 'Low', color: 'text-green-500', bg: 'bg-green-500/10' };
  };

  const formatEngagement = (count) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Social Media Posts
        </h3>
        <span className="text-xs text-muted-foreground">{displayMentions.length} posts</span>
      </div>

      {/* Platform Tabs */}
      <div className="flex gap-2 border-b border-border pb-4">
        {['all', 'reddit', 'instagram', 'twitter'].map((platform) => {
          const info = platformInfo[platform];
          const count = platformMentions[platform].length;
          return (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedPlatform === platform
                  ? `${info.bg} ${info.color} border border-current`
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <span className="mr-1">{info.icon}</span>
              {info.name}
              {count > 0 && <span className="ml-2 text-xs opacity-70">({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Posts List */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {displayMentions.length > 0 ? (
          displayMentions.map((mention, idx) => (
            <div key={idx} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
              {/* Header - Platform & Author */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                    {mention.author?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{mention.author || 'Anonymous'}</p>
                      {/* Star indicator for real vs generated comments */}
                      {mention.isRealComment ? (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" title="Real comment from social media" />
                      ) : (
                        <Star className="w-4 h-4 fill-red-300 text-red-300" title="Auto-generated comment" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {mention.platform === 'youtube' ? 'Instagram' : mention.platform === 'twitter' ? 'X' : mention.platform}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Sentiment Badge */}
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium capitalize ${getSentimentColor(
                      mention.aiSentiment
                    )} ${getSentimentBg(mention.aiSentiment)}`}
                  >
                    {mention.aiSentiment}
                  </span>
                  {/* Threat Badge */}
                  {mention.aiThreatScore >= 40 && (
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getThreatLevel(
                        mention.aiThreatScore
                      ).color} ${getThreatLevel(mention.aiThreatScore).bg}`}
                    >
                      <AlertTriangle className="w-3 h-3" />
                      {getThreatLevel(mention.aiThreatScore).label}
                    </span>
                  )}
                </div>
              </div>

              {/* Post Content */}
              <p className="text-sm text-foreground mb-3 leading-relaxed line-clamp-3">{mention.text}</p>

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 pb-3 border-b border-border/50">
                <span>{new Date(mention.timestamp).toLocaleDateString()}</span>
                <span className="text-xs">Narrative: {mention.narrative}</span>
              </div>

              {/* Engagement Stats */}
              <div className="grid grid-cols-4 gap-2">
                <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <Heart className="w-3 h-3" />
                  <span className="text-xs">{formatEngagement(mention.engagement?.likes || 0)}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <MessageCircle className="w-3 h-3" />
                  <span className="text-xs">{formatEngagement(mention.engagement?.comments || 0)}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <Share2 className="w-3 h-3" />
                  <span className="text-xs">{formatEngagement(mention.engagement?.shares || 0)}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-right ml-auto">
                  <span className="text-xs font-medium text-primary">Risk: {mention.aiThreatScore}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No posts found for this platform</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span>Real comment from social media</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-3.5 h-3.5 fill-red-300 text-red-300" />
          <span>Auto-generated comment</span>
        </div>
      </div>
    </div>
  );
}
