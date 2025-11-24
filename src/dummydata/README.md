# Dummy Data Organization

This folder contains all dummy/mock data for the PR Command Center application. All data is organized into specialized modules for better maintainability and easier testing.

## File Structure

### `index.js` (Central Export Hub)
Main entry point for all dummy data. All components should import from this file for consistency.

```javascript
// Correct: Use centralized index
import { movies, generateMentions, threadGenealogyData } from '../dummydata';

// Avoid: Direct file imports
import { movies } from '../dummydata/movies';
```

### Individual Modules

#### `movies.js`
- **Exports:** `movies`, `projects`
- **Purpose:** Core movie list used across the application
- **Data:** 5 movies with ID, name, description, hex color, and release date

#### `celebrities.js`
- **Exports:** `celebrities`, `celebrityAnalytics`
- **Purpose:** Celebrity/actor information and analytics
- **Data:** 8 celebrities with social reach, brand value, and recent projects

#### `boxOffice.js`
- **Exports:** `boxOfficePredictions`
- **Purpose:** Box office predictions for each movie
- **Data:** Predicted collections, confidence scores, ranges, and prediction factors

#### `competitors.js`
- **Exports:** `competitorMoviesDB`, `generateCompetitiveData`, `generateCompetitorData`
- **Purpose:** Competitor movie database and competitive positioning data
- **Data:** Searchable movies with sentiment scores, mention counts, and platform distribution

#### `entityProfiles.js`
- **Exports:** `entityProfiles`
- **Purpose:** Weighted sentiment profiles for movies and celebrities
- **Data:** Sentiment weights, narratives, platforms, threat levels, and engagement multipliers

#### `mentions.js`
- **Exports:** `generateMentions`
- **Purpose:** Generate realistic social media mentions with sentiment analysis
- **Data Generator:** Accepts entity ID, returns array of mention objects with detailed metadata

#### `metrics.js`
- **Exports:** `generateMetricsData`, `threadGenealogyData`
- **Purpose:** Time-series metrics and thread genealogy structure
- **Data Generators:** 
  - `generateMetricsData(timeRange)` - Returns data for different time ranges (60m, 24h, 7d, 30d, 6m, 1y)
  - `threadGenealogyData` - Static data for discussion thread hierarchies

## Import Guidelines

### ✅ Recommended Pattern
```javascript
// Use the centralized index from any location
import { movies, celebrities, generateMentions } from '../../dummydata';
```

### ❌ Avoid These Patterns
```javascript
// Don't import from individual files
import { movies } from '../../dummydata/movies';

// Don't use old utils location
import { movies } from '../../utils/dummyData';
```

## Data Structure Examples

### Movie Object
```javascript
{
  id: 'dedepyaarde2',
  name: 'De De Pyaar De 2',
  description: 'Ajay Devgn romantic comedy sequel',
  color: '#06b6d4',
  releaseDate: '2025-11-15'
}
```

### Mention Object
```javascript
{
  id: 'mention_123',
  timestamp: Date,
  platform: 'reddit', // 'reddit', 'youtube', 'twitter'/'x'
  author: 'username',
  text: 'Comment text',
  aiSentiment: 'positive', // 'positive', 'neutral', 'negative', 'sarcastic'
  aiThreatScore: 45,
  engagement: { likes: 150, comments: 12, shares: 3 },
  userProfile: { accountAge: 365, botProbability: 2.5, ... },
  isAnomaly: false,
  aiTags: ['enthusiastic', 'technical']
}
```

## Component Usage

### PRCommandCenter.jsx
```javascript
import { generateMentions, generateMetricsData, generateCompetitiveData, movies, celebrities } from '../dummydata';
```

### DashboardView.jsx
```javascript
import { celebrityAnalytics } from '../../dummydata';
```

### CompetitivePositioning.jsx
```javascript
import { competitorMoviesDB } from '../../dummydata';
```

### ThreadGenealogy.jsx
```javascript
import { threadGenealogyData } from '../../dummydata';
```

## Adding New Data

1. **Static Data:** Add to appropriate module file (e.g., new movie in `movies.js`)
2. **Entity Profiles:** Add to `entityProfiles.js` with sentiment weights
3. **Export:** Update `index.js` if adding new named exports
4. **Test:** Verify imports from `index.js` work correctly

## Migration Notes

- **Old Location:** `src/utils/dummyData.js` (deprecated, kept for reference)
- **New Location:** `src/dummydata/` (all components now import from here)
- **Status:** All components migrated to use centralized index ✓
