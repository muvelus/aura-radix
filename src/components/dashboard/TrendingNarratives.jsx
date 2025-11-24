import React from 'react';
import { Flame, ArrowUp, ArrowDown, Minus } from 'lucide-react';

export default function TrendingNarratives({ trendingNarratives }) {
  if (!trendingNarratives || trendingNarratives.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Flame className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-foreground">Trending Narratives</h3>
          <span className="text-xs text-muted-foreground ml-auto">Last 24 hours</span>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No trending narratives available</p>
          <p className="text-xs mt-1">Check back after more mentions are collected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-foreground">Trending Narratives</h3>
        <span className="text-xs text-muted-foreground ml-auto">Last 24 hours</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {trendingNarratives.map((narrative, idx) => (
          <div key={idx} className="p-4 bg-accent/30 border border-border rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">#{idx + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{narrative.narrative}</p>
                  <p className="text-xs text-muted-foreground">{narrative.count} mentions</p>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${
                narrative.trend === 'up' ? 'text-green-500' :
                narrative.trend === 'down' ? 'text-red-500' :
                'text-yellow-500'
              }`}>
                {narrative.trend === 'up' && <ArrowUp className="w-4 h-4" />}
                {narrative.trend === 'down' && <ArrowDown className="w-4 h-4" />}
                {narrative.trend === 'stable' && <Minus className="w-4 h-4" />}
                <span className="text-xs font-semibold">
                  {narrative.growth > 0 ? '+' : ''}{narrative.growth}%
                </span>
              </div>
            </div>

            {/* Sentiment Distribution */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-background rounded-full overflow-hidden flex">
                  {narrative.positivePercent > 0 && (
                    <div 
                      className="h-full bg-green-500"
                      style={{ width: `${narrative.positivePercent}%` }}
                      title={`${narrative.positivePercent}% Positive`}
                    />
                  )}
                  {narrative.neutralPercent > 0 && (
                    <div 
                      className="h-full bg-yellow-500"
                      style={{ width: `${narrative.neutralPercent}%` }}
                      title={`${narrative.neutralPercent}% Neutral`}
                    />
                  )}
                  {narrative.negativePercent > 0 && (
                    <div 
                      className="h-full bg-red-500"
                      style={{ width: `${narrative.negativePercent}%` }}
                      title={`${narrative.negativePercent}% Negative`}
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-muted-foreground">{narrative.positivePercent}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-muted-foreground">{narrative.neutralPercent}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-muted-foreground">{narrative.negativePercent}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
