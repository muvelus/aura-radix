import React from 'react';
import { Film, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function GenreTrends({ genreTrends, weeklyTrends }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Trending Genre Analytics</h3>
        </div>
        <span className="text-xs text-muted-foreground">Last 7 Days</span>
      </div>

      {/* Genre Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {genreTrends.map((genre, idx) => (
          <div 
            key={idx}
            className="p-4 bg-accent/30 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground">{genre.genre}</span>
              <div className={`flex items-center gap-1 text-xs ${
                genre.trend > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                <TrendingUp className={`w-3 h-3 ${genre.trend < 0 ? 'rotate-180' : ''}`} />
                <span>{Math.abs(genre.trend)}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Sentiment</span>
                <span className={`font-medium ${
                  genre.sentiment >= 70 ? 'text-green-500' :
                  genre.sentiment >= 40 ? 'text-yellow-500' :
                  'text-red-500'
                }`}>
                  {genre.sentiment >= 70 ? 'Positive' :
                   genre.sentiment >= 40 ? 'Neutral' :
                   'Negative'}
                </span>
              </div>
              <div className="h-1.5 bg-background rounded-full overflow-hidden">
                <div 
                  className="h-full"
                  style={{ 
                    width: `${genre.sentiment}%`,
                    backgroundColor: genre.color
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-muted-foreground">Mentions</span>
                <span className="font-medium text-foreground">{genre.buzz.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
