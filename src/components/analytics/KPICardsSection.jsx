import React from 'react';
import KPICard from './KPICard';
import { StatCard } from '../shared';
import { TrendingUp } from 'lucide-react';
import { Activity, MessageSquare, AlertTriangle, Users, Target, Zap } from 'lucide-react';

// Debug mode - set to true to enable console logging
const DEBUG_MODE = false;

export default function KPICardsSection({ analytics }) {
  // Safety checks
  if (!analytics) {
    return null;
  }

  // Debug log to verify data structure
  if (DEBUG_MODE) {
    console.log('KPICardsSection received analytics:', analytics);
  }

  // Check if analytics is an array of stat cards (new format from transformStatsToCards)
  if (Array.isArray(analytics) && analytics.length > 0 && analytics[0]?.icon) {
    return (
      <div className="grid grid-cols-4 gap-4 p-6 border-b border-border bg-card">
        {analytics.map((stat, idx) => (
          <StatCard
            key={idx}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            color={stat.color}
            tooltip={stat.tooltip}
          />
        ))}
      </div>
    );
  }

  // Fallback to old format for backwards compatibility
  const sentiments = {
    positive: analytics.positiveSentiment || 0,
    negative: analytics.negativeSentiment || 0,
    neutral: analytics.neutralSentiment || 0,
  };

  const maxSentiment = Math.max(sentiments.positive, sentiments.negative, sentiments.neutral);
  let overallLabel = 'Neutral';
  let overallColor = '#8b5cf6';

  if (maxSentiment === sentiments.positive) {
    overallLabel = 'Positive';
    overallColor = '#22c55e';
  } else if (maxSentiment === sentiments.negative) {
    overallLabel = 'Negative';
    overallColor = '#ef4444';
  }

  const kpiData = [
    {
      icon: Activity,
      label: 'Overall Sentiment',
      value: `${(maxSentiment * 100).toFixed(1)}%`,
      color: overallColor,
      subtext: overallLabel
    },
    {
      icon: MessageSquare,
      label: 'Total Mentions',
      value: (analytics.totalMentions || 0).toLocaleString(),
      trend: { icon: <TrendingUp className="w-3 h-3" />, text: '+12.5%' }
    },
    {
      icon: AlertTriangle,
      label: 'High Threat Posts',
      value: analytics.highThreat || 0,
      color: '#ef4444',
      subtext: `${analytics.totalMentions > 0 ? (((analytics.highThreat || 0) / analytics.totalMentions) * 100).toFixed(1) : 0}% of total`
    },
    {
      icon: Target,
      label: 'Positive Ratio',
      value: `${(sentiments.positive * 100).toFixed(0)}%`,
      color: '#22c55e',
      subtext: `${(sentiments.positive * analytics.totalMentions).toFixed(0)} positive mentions`
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 p-6 border-b border-border bg-card">
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
