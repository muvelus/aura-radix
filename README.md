# Aura Radix - PR Command Center

A production-ready **AI Analytics Dashboard** for real-time sentiment monitoring and threat detection across social media platforms.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173`

## 📊 Features

### Real-Time Analytics
- **Multi-Entity Monitoring**: Track sentiment for movies and celebrities
- **Temporal Analysis**: 7-day, 14-day, 28-day, and 60-day views
- **Threat Detection**: Automatic identification of high-threat posts (score ≥70)
- **Release Date Tracking**: Visual reference lines for movie releases

### Visualizations
- **Sentiment Trend Chart**: Multi-line chart with positive/neutral/negative tracking
- **Sentiment Distribution**: Pie chart showing sentiment ratios
- **Platform Breakdown**: Reddit, Instagram, X/Twitter analytics
- **KPI Dashboard**: Overall sentiment score, mention count, threat posts

### Crisis Management
- AI-powered crisis response planning
- Entity profile deep-dive analysis
- Narrative tracking and monitoring

## 📁 Project Structure

```
src/
├── components/
│   ├── analytics/
│   │   ├── AnalyticsView.jsx          # Main analytics container
│   │   ├── SentimentTrendChart.jsx    # Sentiment chart with release dates
│   │   ├── KPICardsSection.jsx        # Metric cards
│   │   ├── SentimentDistributionChart.jsx
│   │   └── PlatformBreakdownChart.jsx
│   ├── layout/                        # Layout components
│   ├── ui/                            # Radix UI wrappers
│   └── pages/                         # Page components
├── dummydata/
│   ├── movies.js                      # Movie metadata (5 films)
│   ├── mentions.js                    # 700-850 mentions per movie
│   ├── celebrities.js                 # Actor profiles
│   ├── metrics.js                     # Pre-calculated KPIs
│   └── index.js                       # Data exports
├── hooks/                             # Custom React hooks
├── styles/                            # Global styles
└── App.jsx                            # Root component
```

## 📊 Movie Database

| Title | Release | Mentions | Status |
|-------|---------|----------|--------|
| De De Pyaar De 2 | Nov 15, 2025 | 850 | Active |
| Homebound | Sep 20, 2025 | 750 | Past |
| The Bengal Files | Oct 10, 2025 | 800 | Past |
| Jolly LLB 3 | Oct 24, 2025 | 695 | Past |
| Baramulla | Nov 1, 2025 | 720 | Past |

## 🔧 Technology Stack

- **React 19.2.0** - UI framework
- **Radix UI** - Unstyled accessible components
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **@tanstack/react-query** - Data fetching & caching
- **Vite 7.2.4** - Build tool

## 🎯 Release Date Feature

The sentiment chart displays movie release dates with reference lines:

```javascript
// Release dates are highlighted when in visible range
Release: Nov 15, 2025          // Displayed when date is within buckets
Release: Oct 24, 2025 (outside visible range)  // When date is outside range
```

**Implementation Details:**
- UTC-normalized date comparison
- Matches release date against bucket dates
- Finds closest bucket for reference line positioning
- Seamlessly handles all date ranges (7, 14, 28, 60 days)

## 🚨 Data & Mentions

### Mention Generation
- **Source Platforms**: Reddit, Instagram, X/Twitter
- **Sentiment Types**: Positive, Neutral, Negative, Sarcastic
- **Threat Scoring**: 0-100 scale based on language patterns
- **Distribution**: Weighted sentiment distribution per entity
- **Time Range**: Last 60 days of data

### Entity Profiles
Each movie/celebrity has:
- Sentiment weights (positive, neutral, negative, sarcastic)
- Platform distribution preferences
- Engagement multipliers
- Narratives/talking points
- Average threat levels

## 🎨 Dark Theme

The application features a professional dark theme:
- **Background**: Deep dark (`#0a0a0a`)
- **Cards**: Slightly lighter (`#1a1a1a`)
- **Text**: Light gray for readability
- **Accents**: Color-coded by sentiment
  - 🟢 Positive: `#22c55e` (green)
  - 🟡 Neutral: `#eab308` (yellow)
  - 🔴 Negative: `#ef4444` (red)
  - 🟣 Threat: `#6366f1` (indigo)

## 📈 Analytics Views

### 7-Day View
- Hourly or daily breakdowns
- Real-time sentiment tracking
- Platform distribution

### 2-Week View
- Daily aggregates
- Weekly pattern recognition
- Platform trends

### 4-Week View
- Weekly aggregates
- Monthly trend analysis
- Entity comparison

### 2-Month View (60-Day)
- Bi-weekly aggregates
- Release cycle analysis
- Long-term sentiment trends

## 🔍 Debugging

View detailed release date matching logs in browser console:

```javascript
🔍 Release Date Debug     // Input parameters
📊 Range check           // Date comparison results
✨ Closest bucket        // Selected bucket for reference line
⚠️ Fallback matching     // When bucketDateMs is unavailable
```

## 📝 Environment

**Current Date Context**: November 24, 2025

All dates are calculated relative to this reference point:
- 7-day range: Nov 17 - Nov 24
- 14-day range: Nov 10 - Nov 24
- 28-day range: Oct 27 - Nov 24
- 60-day range: Sep 25 - Nov 24

## 🔄 Data Refresh

Using `@tanstack/react-query` with 5-minute refetch interval for automatic data synchronization.

## 🎯 Use Cases

1. **PR Teams**: Monitor movie/celebrity reputation in real-time
2. **Crisis Management**: Identify and respond to threat signals
3. **Marketing**: Track campaign sentiment and engagement
4. **Leadership**: Executive dashboard for stakeholder reporting
5. **Research**: Analyze social media trends and narratives

## 🐛 Known Issues & Fixes

### ✅ Fixed: Release Date Timezone Issues
- **Problem**: Release dates showing as "(outside visible range)" incorrectly
- **Solution**: UTC-normalized date comparison for consistency
- **Status**: Resolved in v1.1

### ✅ Fixed: Component Integration
- **Problem**: EnhancedMetricsDashboard and CrisisPlanGenerator unused
- **Solution**: Integrated into appropriate views
- **Status**: Complete

## 📞 Support

For issues or questions about the analytics dashboard, check:
1. Browser console logs (use search terms: 🔍, 📊, ✨, ⚠️)
2. `PROJECT_DESC.md` for detailed architecture documentation
3. Component source files in `src/components/analytics/`

## 📄 License

Internal project for Aura.ai - All rights reserved
