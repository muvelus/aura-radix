import React, { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { celebrityAnalytics, movies } from "../../dummydata";
import CelebrityAnalytics from "./CelebrityAnalytics";
import CompetitivePositioning from "./CompetitivePositioning";
import SocialMediaFeed from "./SocialMediaFeed";
import KPICardsSection from "../analytics/KPICardsSection";
import SentimentTrendChart from "../analytics/SentimentTrendChart";
import SentimentDistributionChart from "../analytics/SentimentDistributionChart";
import PlatformBreakdownChart from "../analytics/PlatformBreakdownChart";
import TimeRangeSelector from "../navigation/TimeRangeSelector";

export default function DashboardView({
  selectedEntity,
  entityType,
  competitiveData,
  mentions,
  platformData,
  stats,
  sentimentData,
  dateRange,
  setDateRange,
  onMentionSelect,
  onRefresh,
}) {
  // Determine if we're showing celebrity or movie data
  const isCelebrity = entityType === "celebrity";

  const dateRangeOptions = [
    { value: "DAY", label: "Daily", days: 7, apiParam: "DAY" },
    { value: "WEEK", label: "Weekly", days: 14, apiParam: "WEEK" },
    { value: "MONTH", label: "Monthly", days: 28, apiParam: "MONTH" },
  ];

  const selectedRange =
    dateRangeOptions.find((opt) => opt.value === dateRange) ||
    dateRangeOptions[0];

  // Calculate key analytics metrics
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
        platformData: [],
      };
    }

    // Filter mentions based on date range
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - selectedRange.days);

    const filteredMentions = mentions.filter((m) => m.timestamp >= cutoffDate);

    const totalMentions = filteredMentions.length;
    const positive = filteredMentions.filter(
      (m) => m.aiSentiment === "positive",
    ).length;
    const negative = filteredMentions.filter(
      (m) => m.aiSentiment === "negative",
    ).length;
    const neutral = filteredMentions.filter(
      (m) => m.aiSentiment === "neutral",
    ).length;
    const highThreat = filteredMentions.filter(
      (m) => m.aiThreatScore >= 70,
    ).length;

    // Calculate engagement
    const totalEngagement = filteredMentions.reduce(
      (sum, m) =>
        sum + (m.engagement?.likes || 0) + (m.engagement?.comments || 0),
      0,
    );
    const avgEngagement =
      totalMentions > 0 ? Math.round(totalEngagement / totalMentions) : 0;

    // Platform breakdown
    const platformStats = filteredMentions.reduce((acc, m) => {
      acc[m.platform] = (acc[m.platform] || 0) + 1;
      return acc;
    }, {});

    // Sentiment over time - dynamic buckets based on date range
    const now = Date.now();
    const bucketCount =
      selectedRange.days <= 7
        ? 7
        : selectedRange.days <= 14
          ? 14
          : selectedRange.days <= 28
            ? 28
            : Math.ceil(selectedRange.days / 2);
    const bucketSizeMs =
      (selectedRange.days * 24 * 60 * 60 * 1000) / bucketCount;

    // Calculate time buckets from actual mentions data
    const timeBuckets = Array.from({ length: bucketCount }, (_, i) => {
      const bucketEnd = now - i * bucketSizeMs;
      const bucketStart = bucketEnd - bucketSizeMs;

      const bucketMentions = filteredMentions.filter((m) => {
        const time = new Date(m.timestamp).getTime();
        return time >= bucketStart && time < bucketEnd;
      });

      let timeLabel;
      if (selectedRange.days <= 7) {
        timeLabel = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
          new Date(bucketEnd).getDay()
        ];
      } else if (selectedRange.days <= 14) {
        timeLabel = new Date(bucketEnd).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      } else {
        timeLabel = new Date(bucketEnd).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }

      const positiveCount = bucketMentions.filter(
        (m) => m.aiSentiment === "positive",
      ).length;
      const neutralCount = bucketMentions.filter(
        (m) => m.aiSentiment === "neutral",
      ).length;
      const negativeCount = bucketMentions.filter(
        (m) => m.aiSentiment === "negative",
      ).length;
      const total = bucketMentions.length;

      const positiveVal =
        total > 0 ? Math.round((positiveCount / total) * 100) : 0;
      const neutralVal =
        total > 0 ? Math.round((neutralCount / total) * 100) : 0;
      const negativeVal =
        total > 0 ? Math.round((negativeCount / total) * 100) : 0;

      const fullDate = new Date(bucketEnd).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const bucketEndDateUTC = new Date(bucketEnd);
      bucketEndDateUTC.setUTCHours(0, 0, 0, 0);
      const bucketDateMs = bucketEndDateUTC.getTime();

      return {
        time: timeLabel,
        positive: positiveVal,
        neutral: neutralVal,
        negative: negativeVal,
        total,
        fullDate,
        bucketDateMs,
      };
    }).reverse();

    // Sentiment distribution for pie chart
    const sentimentData = [
      {
        name: "Positive",
        value: positive,
        color: "#22c55e",
        percentage:
          totalMentions > 0 ? ((positive / totalMentions) * 100).toFixed(1) : 0,
      },
      {
        name: "Neutral",
        value: neutral,
        color: "#eab308",
        percentage:
          totalMentions > 0 ? ((neutral / totalMentions) * 100).toFixed(1) : 0,
      },
      {
        name: "Negative",
        value: negative,
        color: "#ef4444",
        percentage:
          totalMentions > 0 ? ((negative / totalMentions) * 100).toFixed(1) : 0,
      },
    ];

    // Platform distribution
    const platformData = [
      {
        platform: "Reddit",
        count: platformStats.reddit || 0,
        color: "#FF4500",
      },
      {
        platform: "Instagram",
        count: platformStats.youtube || 0,
        color: "#E1306C",
      },
      { platform: "X", count: platformStats.twitter || 0, color: "#000000" },
    ];

    return {
      totalMentions,
      positive,
      negative,
      neutral,
      highThreat,
      avgEngagement,
      timeBuckets,
      sentimentData,
      platformData,
    };
  }, [mentions, selectedRange, selectedEntity?.id]);

  const sentimentScore = useMemo(() => {
    if (analytics.totalMentions === 0)
      return { score: 50, label: "Neutral", color: "#eab308" };

    const score = Math.round(
      (analytics.positive * 100 + analytics.neutral * 50) /
        analytics.totalMentions,
    );

    if (score >= 70) return { score, label: "Positive", color: "#22c55e" };
    if (score >= 40) return { score, label: "Mixed", color: "#eab308" };
    return { score, label: "Negative", color: "#ef4444" };
  }, [analytics]);

  // Get celebrity analytics for selected entity (celebrities)
  const celebrityData =
    isCelebrity && selectedEntity?.id && celebrityAnalytics[selectedEntity.id]
      ? celebrityAnalytics[selectedEntity.id]
      : {
          socialReach: 25000000,
          brandValue: 2000000000,
          endorsementScore: 80,
          fanEngagement: 75,
          trend: "neutral",
          recentProjects: [
            { title: "Upcoming Film", status: "Development", buzz: 75 },
          ],
          metrics: [
            { name: "Social Media Influence", score: 75, impact: "neutral" },
            { name: "Brand Power", score: 80, impact: "positive" },
            { name: "Fan Loyalty", score: 78, impact: "positive" },
            { name: "Box Office Track Record", score: 75, impact: "neutral" },
            { name: "Controversy Risk", score: 30, impact: "neutral" },
          ],
        };

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary rounded-lg">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered</span>
          </div>
        </div>

        {/* Date Range Selector for Sentiment Analysis */}
        <TimeRangeSelector
          dateRange={dateRange}
          setDateRange={setDateRange}
          selectedEntity={selectedEntity}
          entityType={entityType}
        />

        {/* KPI Cards */}
        <KPICardsSection analytics={stats} />

        {/* Sentiment Trend Chart - Full Width */}
        <SentimentTrendChart sentimentData={sentimentData} />

        {/* Competitor Snapshot */}
        <CompetitivePositioning competitiveData={competitiveData} />

        {/* Sentiment Distribution and Platform Breakdown - Side by Side */}
        <div className="grid grid-cols-2 gap-6">
          <SentimentDistributionChart sentimentData={analytics.sentimentData} />
          <PlatformBreakdownChart platformData={platformData} />
        </div>

        {/* Social Media Feed - Full Width */}
        <SocialMediaFeed mentions={mentions} selectedEntity={selectedEntity} />

        {/* Celebrity Analytics if applicable */}
        {isCelebrity && <CelebrityAnalytics celebrityData={celebrityData} />}
      </div>
    </div>
  );
}
