import React, { useMemo, useState } from 'react';
import AnalyticsHeader from './AnalyticsHeader';
import KPICardsSection from './KPICardsSection';
import SentimentTrendChart from './SentimentTrendChart';
import SentimentDistributionChart from './SentimentDistributionChart';
import PlatformBreakdownChart from './PlatformBreakdownChart';
import { movies } from '../../dummydata';

export default function AnalyticsView({ mentions, metricsData, selectedEntity, entityType }) {
  const [dateRange, setDateRange] = useState('7days');
  
  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 Days', days: 7 },
    { value: '2weeks', label: 'Last 2 Weeks', days: 14 },
    { value: '4weeks', label: 'Last 4 Weeks', days: 28 },
    { value: '2months', label: 'Last 2 Months', days: 60 }
  ];
  
  const selectedRange = dateRangeOptions.find(opt => opt.value === dateRange);
  
  // Calculate key metrics
  const analytics = useMemo(() => {
    if (!mentions || mentions.length === 0) {
      return {
        totalMentions: 0,
        positive: 0,
        negative: 0,
        neutral: 0,
        highThreat: 0,
        avgEngagement: 0,
        timeBuckets: [],
        topNarratives: [],
        sentimentData: [],
        platformData: []
      };
    }

    // Filter mentions based on date range
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - selectedRange.days);
    
    const filteredMentions = mentions.filter(m => m.timestamp >= cutoffDate);
    
    const totalMentions = filteredMentions.length;
    const positive = filteredMentions.filter(m => m.aiSentiment === 'positive').length;
    const negative = filteredMentions.filter(m => m.aiSentiment === 'negative').length;
    const neutral = filteredMentions.filter(m => m.aiSentiment === 'neutral').length;
    const highThreat = filteredMentions.filter(m => m.aiThreatScore >= 70).length;
    
    // Calculate engagement
    const totalEngagement = filteredMentions.reduce((sum, m) => 
      sum + (m.engagement?.likes || 0) + (m.engagement?.comments || 0), 0
    );
    const avgEngagement = totalMentions > 0 ? Math.round(totalEngagement / totalMentions) : 0;
    
    // Platform breakdown
    const platformStats = filteredMentions.reduce((acc, m) => {
      acc[m.platform] = (acc[m.platform] || 0) + 1;
      return acc;
    }, {});
    
    // Sentiment over time - dynamic buckets based on date range
    const now = Date.now();
    const bucketCount = selectedRange.days <= 7 ? 7 : selectedRange.days <= 14 ? 14 : selectedRange.days <= 28 ? 28 : Math.ceil(selectedRange.days / 2);
    const bucketSizeMs = (selectedRange.days * 24 * 60 * 60 * 1000) / bucketCount;
    
    // Calculate time buckets from actual mentions data
    const timeBuckets = Array.from({ length: bucketCount }, (_, i) => {
      const bucketEnd = now - (i * bucketSizeMs);
      const bucketStart = bucketEnd - bucketSizeMs;
      
      const bucketMentions = filteredMentions.filter(m => {
        const time = new Date(m.timestamp).getTime();
        return time >= bucketStart && time < bucketEnd;
      });
      
      let timeLabel;
      if (selectedRange.days <= 7) {
        // Show day names for 7-day view
        timeLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(bucketEnd).getDay()];
      } else if (selectedRange.days <= 14) {
        // Show dates for 2-week view
        timeLabel = new Date(bucketEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else {
        // Show dates for 4-week and 2-month views
        timeLabel = new Date(bucketEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      
      const positiveCount = bucketMentions.filter(m => m.aiSentiment === 'positive').length;
      const neutralCount = bucketMentions.filter(m => m.aiSentiment === 'neutral').length;
      const negativeCount = bucketMentions.filter(m => m.aiSentiment === 'negative').length;
      const total = bucketMentions.length;
      
      // Normalize to percentages (0-100)
      const positive = total > 0 ? Math.round((positiveCount / total) * 100) : 0;
      const neutral = total > 0 ? Math.round((neutralCount / total) * 100) : 0;
      const negative = total > 0 ? Math.round((negativeCount / total) * 100) : 0;
      
      // Store full date for tooltip (formatted string)
      const fullDate = new Date(bucketEnd).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

      // Store the bucket end date as milliseconds for reliable date matching
      // Use UTC to avoid timezone issues
      const bucketEndDateUTC = new Date(bucketEnd);
      bucketEndDateUTC.setUTCHours(0, 0, 0, 0); // Normalize to midnight UTC
      const bucketDateMs = bucketEndDateUTC.getTime();
      
      return {
        time: timeLabel,
        positive,
        neutral,
        negative,
        total,
        fullDate,
        bucketDateMs // Add precise date for release date matching
      };
    }).reverse();
    
    // Top narratives
    const narrativeCounts = filteredMentions.reduce((acc, m) => {
      acc[m.narrative] = (acc[m.narrative] || 0) + 1;
      return acc;
    }, {});
    
    const topNarratives = Object.entries(narrativeCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([narrative, count]) => ({
        narrative,
        count,
        percentage: ((count / totalMentions) * 100).toFixed(1)
      }));
    
    // Sentiment distribution for pie chart
    const sentimentData = [
      { name: 'Positive', value: positive, color: '#22c55e', percentage: totalMentions > 0 ? ((positive / totalMentions) * 100).toFixed(1) : 0 },
      { name: 'Neutral', value: neutral, color: '#eab308', percentage: totalMentions > 0 ? ((neutral / totalMentions) * 100).toFixed(1) : 0 },
      { name: 'Negative', value: negative, color: '#ef4444', percentage: totalMentions > 0 ? ((negative / totalMentions) * 100).toFixed(1) : 0 }
    ];
    
    // Platform distribution
    const platformData = [
      { platform: 'Reddit', count: platformStats.reddit || 0, color: '#FF4500' },
      { platform: 'Instagram', count: platformStats.youtube || 0, color: '#E1306C' },
      { platform: 'X', count: platformStats.twitter || 0, color: '#000000' }
    ];
    
    return {
      totalMentions,
      positive,
      negative,
      neutral,
      highThreat,
      avgEngagement,
      timeBuckets,
      topNarratives,
      sentimentData,
      platformData
    };
  }, [mentions, selectedRange, selectedEntity?.id]);
  
  const sentimentScore = useMemo(() => {
    if (analytics.totalMentions === 0) return { score: 50, label: 'Neutral', color: '#eab308' };
    
    const score = Math.round(
      ((analytics.positive * 100) + (analytics.neutral * 50)) / analytics.totalMentions
    );
    
    if (score >= 70) return { score, label: 'Positive', color: '#22c55e' };
    if (score >= 40) return { score, label: 'Mixed', color: '#eab308' };
    return { score, label: 'Negative', color: '#ef4444' };
  }, [analytics]);

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <AnalyticsHeader 
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        dateRangeOptions={dateRangeOptions}
        selectedEntity={selectedEntity}
      />

      {/* KPI Cards */}
      <KPICardsSection 
        analytics={analytics}
        sentimentScore={sentimentScore}
      />

      {/* Charts Section */}
      <div className="space-y-6 p-6">
        {/* Sentiment Over Time - Full Width */}
        <SentimentTrendChart 
          timeBuckets={analytics.timeBuckets} 
          releaseDate={movies.find(m => m.id === selectedEntity?.id)?.releaseDate}
          selectedEntity={selectedEntity}
        />

        {/* Bottom Row - Sentiment Distribution and Platform Breakdown */}
        <div className="grid grid-cols-2 gap-6">
          <SentimentDistributionChart sentimentData={analytics.sentimentData} />
          <PlatformBreakdownChart platformData={analytics.platformData} />
        </div>
      </div>
    </div>
  );
}
