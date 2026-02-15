import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, PieChart, Pie, Legend } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Activity, Users, Flame, Calendar } from 'lucide-react';

export default function EnhancedMetricsDashboard({ 
  mentions, 
  metricsData, 
  anomalyCount, 
  onAnomalyClick,
  competitiveData, // All projects
  selectedEntity, // Currently selected movie/celebrity
  timeRange = '60m', // Controlled from parent
  onTimeRangeChange // Callback to update parent state
}) {
  
  const totalMentions = mentions.length;
  const highRiskMentions = mentions.filter(m => m.aiThreatScore >= 60).length;
  const crisisMentions = mentions.filter(m => m.aiThreatScore >= 85 && m.aiSentiment === 'NEGATIVE').length;
  
  // Calculate velocity
  const recentMentions = mentions.filter(m => 
    Date.now() - m.timestamp.getTime() < 10 * 60 * 1000
  );
  const velocity = (recentMentions.length / 10).toFixed(1);

  // Calculate trend
  const lastHalfData = metricsData.slice(-30);
  const firstHalfData = metricsData.slice(0, 30);
  const lastHalfAvg = lastHalfData.reduce((sum, d) => sum + d.mentions, 0) / lastHalfData.length;
  const firstHalfAvg = firstHalfData.reduce((sum, d) => sum + d.mentions, 0) / firstHalfData.length;
  const trend = lastHalfAvg > firstHalfAvg ? 'up' : 'down';
  const trendPercent = Math.abs(((lastHalfAvg - firstHalfAvg) / firstHalfAvg) * 100).toFixed(1);

  // Calculate overall sentiment
  const sentiments = mentions.reduce((acc, m) => {
    acc[m.aiSentiment] = (acc[m.aiSentiment] || 0) + 1;
    return acc;
  }, {});
  const overallSentiment = calculateOverallSentiment(sentiments, totalMentions);



  // Time range options
  const timeRanges = [
    { value: '60m', label: '60 Min' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' }
  ];

  return (
    <div className="border-b border-border bg-card">
      {/* Entity Context Header */}
      {selectedEntity && (
        <div className="px-6 py-2 bg-accent/30 border-b border-border flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Monitoring:</span>
          <span className="text-sm font-bold text-foreground">{selectedEntity.name}</span>
          {selectedEntity.description && (
            <>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{selectedEntity.description}</span>
            </>
          )}
        </div>
      )}
      
      {/* Main KPI Row */}
      <div className="grid grid-cols-6 gap-4 px-6 py-6 border-b border-border">
        {/* Overall Sentiment Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Overall Sentiment
            </span>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <div className={`text-4xl font-bold ${getSentimentColor(overallSentiment.score)}`}>
              {overallSentiment.score}
            </div>
            <div className="text-xs text-muted-foreground">/ 100</div>
          </div>
          <div className="text-xs font-medium" style={{ color: overallSentiment.color }}>
            {overallSentiment.label}
          </div>
        </div>

        {/* Crisis Posts */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Crisis Posts
            </span>
            <Flame className="w-4 h-4 text-threat-critical" />
          </div>
          <div className="text-4xl font-bold text-threat-critical">{crisisMentions}</div>
          <div className="text-xs text-muted-foreground">
            Threat score ≥85
          </div>
        </div>

        {/* High Risk */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              High Risk
            </span>
            <AlertTriangle className="w-4 h-4 text-threat-high" />
          </div>
          <div className="text-4xl font-bold text-threat-high">{highRiskMentions}</div>
          <div className="text-xs text-muted-foreground">
            {((highRiskMentions / totalMentions) * 100).toFixed(1)}% of total
          </div>
        </div>

        {/* Total Mentions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Total Mentions
            </span>
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-4xl font-bold">{totalMentions}</div>
            <div className="flex items-center gap-1 text-xs">
              {trend === 'up' ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500" />
              )}
              <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {trendPercent}%
              </span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">vs last 30m</div>
        </div>

        {/* Velocity */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Velocity
            </span>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-4xl font-bold">{velocity}</div>
          <div className="text-xs text-muted-foreground">mentions/min</div>
        </div>

        {/* Anomalies */}
        <div 
          className={`space-y-2 cursor-pointer border-2 rounded-lg p-3 transition-all ${
            anomalyCount > 0 
              ? 'animate-flash border-yellow-500 bg-yellow-500/10' 
              : 'border-border'
          }`}
          onClick={onAnomalyClick}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs uppercase tracking-wider font-semibold ${
              anomalyCount > 0 ? 'text-yellow-300' : 'text-muted-foreground'
            }`}>
              Anomalies
            </span>
            <AlertTriangle className={`w-4 h-4 ${
              anomalyCount > 0 ? 'text-yellow-400' : 'text-muted-foreground'
            }`} />
          </div>
          <div className={`text-4xl font-bold ${
            anomalyCount > 0 ? 'text-yellow-400' : 'text-foreground'
          }`}>
            {anomalyCount}
          </div>
          <div className={`text-xs font-medium ${
            anomalyCount > 0 ? 'text-yellow-300' : 'text-muted-foreground'
          }`}>
            {anomalyCount > 0 ? 'Click to view' : 'All clear'}
          </div>
        </div>
      </div>

      {/* Timeline with Time Range Selector */}
      <div className="px-6 py-5 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Mentions Timeline</h3>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex gap-1 bg-accent/50 rounded-lg p-1">
            {timeRanges.map(range => (
              <button
                key={range.value}
                onClick={() => onTimeRangeChange(range.value)}
                className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                  timeRange === range.value
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metricsData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#666" fontSize={9} />
              <YAxis stroke="#666" fontSize={10} width={30} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0a0a', 
                  border: '2px solid #3b82f6',
                  borderRadius: '8px',
                  fontSize: '14px',
                  padding: '12px 16px',
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
                }}
                labelStyle={{
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '15px',
                  marginBottom: '8px'
                }}
                itemStyle={{
                  color: '#60a5fa',
                  fontWeight: '500',
                  fontSize: '14px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="totalMentions" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorTotal)" 
                name="Total Mentions"
              />
              <Area 
                type="monotone" 
                dataKey="positiveMentions" 
                stroke="#10b981" 
                strokeWidth={1.5}
                fillOpacity={1} 
                fill="url(#colorPositive)" 
                name="Positive"
              />
              <Area 
                type="monotone" 
                dataKey="negativeMentions" 
                stroke="#ef4444" 
                strokeWidth={1.5}
                fillOpacity={1} 
                fill="url(#colorNegative)" 
                name="Negative"
              />
              <Area 
                type="monotone" 
                dataKey="neutralMentions" 
                stroke="#eab308" 
                strokeWidth={1.5}
                fillOpacity={1} 
                fill="url(#colorNeutral)" 
                name="Neutral"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function calculateOverallSentiment(sentiments, total) {
  const weights = { positive: 100, neutral: 50, negative: 0, sarcastic: 25 };
  const weightedSum = Object.entries(sentiments).reduce((sum, [sentiment, count]) => {
    return sum + (weights[sentiment] || 50) * count;
  }, 0);
  const score = Math.round(weightedSum / total);
  
  let label, color;
  if (score >= 75) {
    label = 'Excellent';
    color = '#22c55e';
  } else if (score >= 60) {
    label = 'Good';
    color = '#84cc16';
  } else if (score >= 40) {
    label = 'Mixed';
    color = '#eab308';
  } else if (score >= 25) {
    label = 'Concerning';
    color = '#f97316';
  } else {
    label = 'Critical';
    color = '#ef4444';
  }
  
  return { score, label, color };
}

function getSentimentColor(score) {
  if (score >= 75) return 'text-green-500';
  if (score >= 60) return 'text-lime-500';
  if (score >= 40) return 'text-yellow-500';
  if (score >= 25) return 'text-orange-500';
  return 'text-red-500';
}

function getSentimentTextColor(sentiment) {
  const colors = {
    positive: 'text-sentiment-positive',
    neutral: 'text-sentiment-neutral',
    negative: 'text-sentiment-negative',
    sarcastic: 'text-sentiment-sarcastic'
  };
  return colors[sentiment] || 'text-muted-foreground';
}
