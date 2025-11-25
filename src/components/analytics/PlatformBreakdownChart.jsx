import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function PlatformBreakdownChart({ mentions }) {
  // Calculate sentiment distribution by platform
  const sentimentByPlatform = useMemo(() => {
    if (!mentions || mentions.length === 0) {
      return [];
    }

    const platformStats = {
      reddit: { positive: 0, neutral: 0, negative: 0, total: 0 },
      youtube: { positive: 0, neutral: 0, negative: 0, total: 0 },
      twitter: { positive: 0, neutral: 0, negative: 0, total: 0 }
    };

    mentions.forEach(m => {
      const platform = m.platform || 'reddit';
      if (platformStats[platform]) {
        platformStats[platform][m.aiSentiment] = (platformStats[platform][m.aiSentiment] || 0) + 1;
        platformStats[platform].total += 1;
      }
    });

    // Convert to chart data format
    const chartData = [
      {
        platform: 'Reddit',
        positive: platformStats.reddit.positive,
        neutral: platformStats.reddit.neutral,
        negative: platformStats.reddit.negative,
        total: platformStats.reddit.total
      },
      {
        platform: 'Instagram',
        positive: platformStats.youtube.positive,
        neutral: platformStats.youtube.neutral,
        negative: platformStats.youtube.negative,
        total: platformStats.youtube.total
      },
      {
        platform: 'X',
        positive: platformStats.twitter.positive,
        neutral: platformStats.twitter.neutral,
        negative: platformStats.twitter.negative,
        total: platformStats.twitter.total
      }
    ];

    return chartData.filter(d => d.total > 0); // Only show platforms with data
  }, [mentions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs space-y-1">
          <p className="text-white font-medium">{data.platform}</p>
          <p className="text-green-400">Positive: {data.positive}</p>
          <p className="text-yellow-400">Neutral: {data.neutral}</p>
          <p className="text-red-400">Negative: {data.negative}</p>
          <p className="text-gray-300 border-t border-slate-600 pt-1 mt-1">Total: {data.total}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Platform Breakdown</h3>
        <p className="text-xs text-muted-foreground mt-1">Sentiment distribution by platform (Stacked Bar Chart)</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={sentimentByPlatform}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
          <XAxis 
            dataKey="platform"
            tick={{ fill: '#888', fontSize: 12 }}
            stroke="#444"
          />
          <YAxis 
            tick={{ fill: '#888', fontSize: 12 }}
            stroke="#444"
            label={{ value: 'Mentions', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '15px' }}
            iconType="square"
          />
          <Bar dataKey="positive" stackId="a" fill="#22c55e" name="Positive" radius={[0, 0, 8, 8]} />
          <Bar dataKey="neutral" stackId="a" fill="#eab308" name="Neutral" />
          <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
