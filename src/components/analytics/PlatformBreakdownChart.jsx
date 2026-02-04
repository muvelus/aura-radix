import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function PlatformBreakdownChart({ platformData = {} }) {
  // Transform API response to chart data format
  const chartData = useMemo(() => {
    if (!platformData || Object.keys(platformData).length === 0) {
      return [];
    }

    // Convert platform data with sentiment breakdowns to array
    const data = Object.entries(platformData).map(([platform, sentiments]) => {
      const total = Object.values(sentiments).reduce((sum, val) => sum + val, 0);
      return {
        platform: platform.charAt(0).toUpperCase() + platform.slice(1).toLowerCase(),
        POSITIVE: sentiments.POSITIVE || 0,
        NEGATIVE: sentiments.NEGATIVE || 0,
        NEUTRAL: sentiments.NEUTRAL || 0,
        total: total
      };
    });

    return data;
  }, [platformData]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs space-y-1">
          <p className="text-white font-medium">{data.platform}</p>
          <p className="text-green-400">Positive: {data.POSITIVE}</p>
          <p className="text-red-400">Negative: {data.NEGATIVE}</p>
          <p className="text-yellow-400">Neutral: {data.NEUTRAL}</p>
          <p className="text-blue-400 mt-2">Total: {data.total}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Platform Breakdown</h3>
        <p className="text-xs text-muted-foreground mt-1">Mentions by platform and sentiment</p>
      </div>
      
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
            <XAxis 
              dataKey="platform"
              tick={{ fill: '#888', fontSize: 12 }}
              stroke="#444"
            />
            <YAxis 
              tick={{ fill: '#888', fontSize: 12 }}
              stroke="#444"
              label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="POSITIVE" fill="#22c55e" name="Positive" stackId="sentiment" />
            <Bar dataKey="NEGATIVE" fill="#ef4444" name="Negative" stackId="sentiment" />
            <Bar dataKey="NEUTRAL" fill="#eab308" name="Neutral" stackId="sentiment" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-[280px] text-muted-foreground">
          <p className="text-sm">No platform data available</p>
        </div>
      )}
    </div>
  );
}
