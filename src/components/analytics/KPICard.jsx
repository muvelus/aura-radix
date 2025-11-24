import React from 'react';

export default function KPICard({ icon: Icon, label, value, subtext, color, trend }) {
  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          {label}
        </span>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold" style={color ? { color } : {}}>
          {value}
        </span>
        {label === 'Overall Sentiment' && (
          <span className="text-xs text-muted-foreground">/ 100</span>
        )}
      </div>
      {subtext && (
        <p className="text-xs text-muted-foreground mt-2">
          {subtext}
        </p>
      )}
      {trend && (
        <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
          {trend.icon}
          <span>{trend.text}</span>
        </div>
      )}
    </div>
  );
}
