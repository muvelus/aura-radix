# Aura Radix - PR Command Center

## Project Overview

Aura Radix is a **real-time AI Analytics Dashboard** for monitoring public sentiment and threats around movies, celebrities, and entities. It provides PR teams with actionable intelligence through comprehensive sentiment analysis, threat detection, and crisis management capabilities.

## Key Features

### 1. **Multi-Entity Analytics**
- **Movies**: Track sentiment for films across 5 major Indian productions
- **Celebrities**: Monitor individual actor reputation and public perception
- **Dynamic Entity Switching**: Seamless navigation between movies and celebrities

### 2. **Sentiment Intelligence**
- **Real-time Sentiment Tracking**: Positive, neutral, and negative mentions
- **Temporal Sentiment Trends**: 7-day, 14-day, 28-day, and 60-day views
- **Release Date Highlighting**: Visual reference lines showing movie release dates
- **Threat Detection**: Automatic identification of high-threat posts (score ≥70)

### 3. **Data Visualization**
- **Sentiment Trend Chart**: Multi-line chart showing sentiment distribution over time
- **Sentiment Distribution**: Pie chart breaking down positive/neutral/negative ratios
- **Platform Breakdown**: Analyze sentiment sources (Reddit, Instagram, X/Twitter)
- **High Threat Posts**: Highlighted anomalies for crisis management

### 4. **KPI Dashboard**
- **Overall Sentiment Score** (0-100): AI-calculated sentiment from all mentions
- **Total Mentions**: Aggregated count of all social media mentions
- **High Threat Posts**: Count of posts flagged as potential threats
- **Positive Ratio**: Percentage of positive mentions

### 5. **Crisis Management**
- **Crisis Generator**: AI-powered tool to generate crisis response plans
- **Entity Profile Analysis**: Deep-dive threat assessment for celebrities/movies
- **Narrative Tracking**: Monitor dominant storylines and public discourse

## Movie Data

| Movie | Release Date | Mentions | Platform Mix |
|-------|-------------|----------|--------------|
| De De Pyaar De 2 | Nov 15, 2025 | 850 | Reddit, Instagram, X |
| Homebound | Sep 20, 2025 | 750 | Reddit, Instagram, X |
| The Bengal Files | Oct 10, 2025 | 800 | Reddit, Instagram, X |
| Jolly LLB 3 | Oct 24, 2025 | 695 | Reddit, Instagram, X |
| Baramulla | Nov 1, 2025 | 720 | Reddit, Instagram, X |

## Technology Stack

### Frontend
- **React 19.2.0**: Modern UI framework with hooks
- **Radix UI**: Unstyled, accessible component library
- **Tailwind CSS**: Utility-first CSS with dark theme
- **Recharts**: React charting library for data visualization
- **Vite 7.2.4**: Fast build tool and dev server

### Data & State
- **@tanstack/react-query**: Server state management with smart caching
- **Dummy Data System**: `/dummydata` folder with consolidated data sets
  - `movies.js`: Movie metadata and release dates
  - `mentions.js`: Generated social media mentions (700-850 per movie)
  - `celebrities.js`: Actor profiles and engagement metrics
  - `metrics.js`: Pre-calculated KPIs and analytics

### Analytics
- **AI Sentiment Classification**: Positive/Negative/Neutral/Sarcastic
- **Threat Scoring**: 0-100 scale based on sentiment and language patterns
- **Engagement Metrics**: Likes, comments, shares per mention

## Architecture

### Component Structure
```
AnalyticsView (Parent)
├── AnalyticsHeader (Date range selector)
├── KPICardsSection (Metric cards)
├── SentimentTrendChart (Main chart with release date overlay)
├── SentimentDistributionChart (Pie chart)
└── PlatformBreakdownChart (Platform analytics)
```

### Data Flow
1. **AnalyticsView** calculates time buckets and filters mentions by date range
2. **Buckets**: Divides data into 7, 14, 28, or 60 intervals (depending on range)
3. **SentimentTrendChart** receives:
   - `timeBuckets`: Array of time periods with sentiment percentages
   - `releaseDate`: Movie release date string (YYYY-MM-DD)
   - `selectedEntity`: Current movie/celebrity ID
4. **Release Date Matching**: UTC-normalized date comparison
   - Converts release date to UTC midnight
   - Matches against bucket dates (also UTC midnight)
   - Displays reference line and label when in visible range

### Release Date Feature
- **Purpose**: Highlight movie release dates on sentiment chart
- **Implementation**: UTC-normalized date comparison
- **Logic**: 
  1. Parse release date string (YYYY-MM-DD) to UTC midnight
  2. Compare against bucket dates (also UTC midnight)
  3. Find closest bucket if in range
  4. Render reference line with label
- **Visible Range**: Release line only shows if date falls within bucket range
- **Timezone Safe**: Uses UTC for all comparisons to avoid local timezone issues

## Date Range Views

| Range | Duration | Buckets | Use Case |
|-------|----------|---------|----------|
| Last 7 Days | 7 days | 7 | Daily sentiment tracking |
| Last 2 Weeks | 14 days | 14 | Weekly patterns |
| Last 4 Weeks | 28 days | 28 | Monthly trends |
| Last 2 Months | 60 days | 30 | Long-term analysis, release cycle tracking |

## Recent Fixes & Improvements

### Release Date Highlighting (v1.1)
- **Fixed UTC Timezone Issues**: Changed from local time to UTC for consistent date matching
- **Robust Date Matching**: Handles pre-release analysis and cross-timezone comparisons
- **Reference Line**: Only displays when release date falls within visible date range
- **Label Format**: "Release: Nov 15, 2025" with "(outside visible range)" fallback

### Component Integration (v1.0.3)
- ✅ Integrated `EnhancedMetricsDashboard` into metrics view
- ✅ Completed `CrisisPlanGenerator` data integration
- ✅ Removed orphaned components (TabbedInspector decision)
- ✅ Cleaned up empty folders (triage/, shared/)

## Development

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Key Files
- `src/components/analytics/AnalyticsView.jsx`: Main analytics container
- `src/components/analytics/SentimentTrendChart.jsx`: Chart with release date overlay
- `src/components/analytics/KPICardsSection.jsx`: Metric cards component
- `src/dummydata/mentions.js`: Mention data generation
- `src/dummydata/movies.js`: Movie metadata

## Monitoring & Debugging

### Console Logs
The release date matching includes detailed logging for debugging:
```javascript
🔍 Release Date Debug: Shows input parameters and bucket info
📊 Range check: Shows date comparison results
✨ Closest bucket: Shows selected bucket for reference line
⚠️ Fallback matching: Shows when bucketDateMs is unavailable
```

### Common Issues
1. **Release date shows "(outside visible range)"**
   - Check that release date is within data date range
   - Verify UTC date normalization is working
   - Check bucket dates in console logs

2. **Reference line not appearing**
   - Verify `isInRange: true` in debug logs
   - Check that ReferenceLine component is receiving correct data key

## Future Enhancements

- [ ] Real-time mention ingestion (currently using dummy data)
- [ ] Multi-language sentiment analysis
- [ ] Predictive crisis scoring
- [ ] Custom alert thresholds
- [ ] Export analytics reports (PDF/CSV)
- [ ] Team collaboration features
