import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calendar } from 'lucide-react';

export default function BestGenreChart({ releaseDate }) {
  // Mock historical data for genres that performed well on this date/season
  const genreData = [
    { genre: 'Action', avgBoxOffice: 380, films: 12, color: '#ef4444' },
    { genre: 'Drama', avgBoxOffice: 290, films: 18, color: '#8b5cf6' },
    { genre: 'Comedy', avgBoxOffice: 250, films: 15, color: '#f59e0b' },
    { genre: 'Romance', avgBoxOffice: 210, films: 10, color: '#ec4899' },
    { genre: 'Thriller', avgBoxOffice: 190, films: 8, color: '#06b6d4' },
    { genre: 'Horror', avgBoxOffice: 120, films: 6, color: '#10b981' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg px-4 py-3 shadow-lg">
          <p className="text-sm font-semibold text-foreground mb-1">{data.genre}</p>
          <p className="text-xs text-muted-foreground">Avg. Box Office: ₹{data.avgBoxOffice}Cr</p>
          <p className="text-xs text-muted-foreground">{data.films} films released</p>
        </div>
      );
    }
    return null;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'this season';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Best Genre on this Date</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Historical performance for {formatDate(releaseDate)}
          </p>
        </div>
        <Calendar className="w-5 h-5 text-blue-500" />
      </div>

      <div className="space-y-6">
        {/* Bar Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={genreData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
              <XAxis 
                dataKey="genre" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: '#334155' }}
              />
              <YAxis 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: '#334155' }}
                label={{ value: 'Avg Box Office (Cr)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }} />
              <Bar dataKey="avgBoxOffice" radius={[8, 8, 0, 0]}>
                {genreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top 3 Genres */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          {genreData.slice(0, 3).map((genre, idx) => (
            <div key={idx} className="bg-background rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: genre.color }}
                />
                <p className="text-xs text-muted-foreground uppercase">#{idx + 1} {genre.genre}</p>
              </div>
              <p className="text-xl font-bold text-foreground">₹{genre.avgBoxOffice}Cr</p>
              <p className="text-xs text-muted-foreground mt-1">{genre.films} releases</p>
            </div>
          ))}
        </div>

        {/* Insight */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-xs text-muted-foreground">
            <span className="text-blue-500 font-semibold">Action</span> genre historically performs 
            best during this release window, with an average collection of 
            <span className="text-blue-500 font-semibold"> ₹380 Crores</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
