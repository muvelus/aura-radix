import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export default function HitGenrePrediction({ selectedEntity }) {
  // Mock genre prediction data
  const genreData = [
    { name: 'Drama', probability: 20, color: '#8b5cf6' },
    { name: 'Action', probability: 35, color: '#ef4444' },
    { name: 'Thriller', probability: 8, color: '#06b6d4' },
    { name: 'Comedy', probability: 25, color: '#f59e0b' },
    { name: 'Romance', probability: 12, color: '#ec4899' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
          <p className="text-sm font-semibold text-foreground">{payload[0].name}</p>
          <p className="text-xs text-muted-foreground">{payload[0].value}% probability</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Hit Genre Prediction</CardTitle>
          <Award className="w-5 h-5 text-purple-500" />
        </div>
      </CardHeader>
      <CardContent>
        {/* Bar Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={genreData}
              margin={{ top: 10, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
              <XAxis 
                dataKey="name"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: '#334155' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: '#334155' }}
                label={{ value: 'Probability (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                domain={[0, 40]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }} />
              <Bar dataKey="probability" radius={[8, 8, 0, 0]}>
                {genreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Genre List with Probability Bars */}
        <div className="space-y-3 pt-4 border-t border-border">
          {genreData.map((genre, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: genre.color }}
              />
              <span className="text-sm text-muted-foreground flex-1">{genre.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${(genre.probability / 40) * 100}%`,
                      backgroundColor: genre.color
                    }}
                  />
                </div>
                <span className="text-sm font-semibold text-foreground w-10">{genre.probability}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Current Genre Highlight */}
        <div className="pt-4 border-t border-border">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-purple-500" />
              <p className="text-sm font-semibold text-foreground">Current Genre Analysis</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Based on current trends, <span className="text-purple-500 font-semibold">Action</span> genre 
              has the highest probability of success with <span className="text-purple-500 font-semibold">35%</span> confidence.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
