import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function SentimentDistributionChart({ sentimentData }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Sentiment Distribution</h3>
        <p className="text-xs text-muted-foreground mt-1">Overall sentiment breakdown</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={sentimentData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ percentage }) => `${percentage}%`}
            labelLine={false}
            labelStyle={{ fill: '#ffffff', fontSize: '14px', fontWeight: 'bold' }}
          >
            {sentimentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
