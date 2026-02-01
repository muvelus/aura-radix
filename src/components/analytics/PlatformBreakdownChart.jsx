import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function PlatformBreakdownChart({ platformData = {} }) {
  // Transform API response to chart data format
  const chartData = useMemo(() => {
    if (!platformData || Object.keys(platformData).length === 0) {
      return [];
    }

    // Convert platform counts object to array
    const data = Object.entries(platformData).map(([platform, count]) => ({
      platform: platform.charAt(0).toUpperCase() + platform.slice(1).toLowerCase(), // Capitalize first letter
      count: count
    }));

    return data;
  }, [platformData]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs space-y-1">
          <p className="text-white font-medium">{data.platform}</p>
          <p className="text-primary">Mentions: {data.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Platform Breakdown</h3>
        <p className="text-xs text-muted-foreground mt-1">Mentions by platform</p>
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
            <Bar dataKey="count" fill="#3b82f6" name="Mentions" radius={[8, 8, 0, 0]} />
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
