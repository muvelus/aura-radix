import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

export default function PlatformBreakdownChart({ platformData }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Platform Breakdown</h3>
        <p className="text-xs text-muted-foreground mt-1">Mentions by platform</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={platformData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
          <XAxis 
            dataKey="platform"
            tick={{ fill: '#888', fontSize: 11 }}
            stroke="#444"
          />
          <YAxis 
            tick={{ fill: '#888', fontSize: 11 }}
            stroke="#444"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a1a', 
              border: '1px solid #333',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#ffffff'
            }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {platformData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
