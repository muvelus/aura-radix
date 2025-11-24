import React from 'react';
import KPICard from './KPICard';
import { TrendingUp } from 'lucide-react';
import { Activity, MessageSquare, AlertTriangle, Users, Target } from 'lucide-react';

export default function KPICardsSection({ analytics, sentimentScore }) {
  const kpiData = [
    {
      icon: Activity,
      label: 'Overall Sentiment',
      value: sentimentScore.score,
      color: sentimentScore.color,
      subtext: sentimentScore.label
    },
    {
      icon: MessageSquare,
      label: 'Total Mentions',
      value: analytics.totalMentions.toLocaleString(),
      trend: { icon: <TrendingUp className="w-3 h-3" />, text: '+12.5%' }
    },
    {
      icon: AlertTriangle,
      label: 'High Threat Posts',
      value: analytics.highThreat,
      color: '#ef4444',
      subtext: `${((analytics.highThreat / analytics.totalMentions) * 100).toFixed(1)}% of total`
    },
    {
      icon: Target,
      label: 'Positive Ratio',
      value: `${((analytics.positive / analytics.totalMentions) * 100).toFixed(0)}%`,
      color: '#22c55e',
      subtext: `${analytics.positive} positive mentions`
    }
  ];

  return (
    <div className="grid grid-cols-5 gap-4 p-6 border-b border-border bg-card">
      {kpiData.map((kpi, index) => (
        <KPICard
          key={index}
          icon={kpi.icon}
          label={kpi.label}
          value={kpi.value}
          color={kpi.color}
          subtext={kpi.subtext}
          trend={kpi.trend}
        />
      ))}
    </div>
  );
}
