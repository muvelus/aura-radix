import React from 'react';
import { Target, MessageSquare, TrendingUp } from 'lucide-react';

export default function CompetitivePositioning({ competitiveData = [] }) {
  const formatMentions = (count) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const formatSentiment = (value) => {
    return Math.round(value * 100);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Competitor Snapshot</h3>
      </div>

      {/* Competitors Row */}
      <div className="flex items-stretch gap-4 flex-wrap relative z-0">
        {competitiveData && competitiveData.length > 0 ? (
          competitiveData.map((competitor, idx) => (
            <div 
              key={idx}
              className="flex-1 min-w-[200px] p-4 bg-accent/30 border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              {/* Competitor Name */}
              <h4 className="text-sm font-semibold text-primary mb-4">
                {competitor.entityName}
              </h4>

              {/* Total Mentions */}
              <div className="mb-4 pb-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    Mentions
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {formatMentions(competitor.totalMentions)}
                  </span>
                </div>
              </div>

              {/* Sentiment */}
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Positive Sentiment
                  </span>
                  <span className="text-sm font-semibold text-green-500">
                    {formatSentiment(competitor.positiveSentiment)}%
                  </span>
                </div>
                
                {/* Sentiment Bar */}
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${formatSentiment(competitor.positiveSentiment)}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-12 text-muted-foreground">
            <MessageSquare className="w-10 h-10 mb-3 opacity-50" />
            <p className="text-sm">No competitor data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
