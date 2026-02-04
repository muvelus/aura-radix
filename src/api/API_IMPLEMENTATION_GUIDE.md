# Frontend API Implementation Guide

## Status Summary

**All 20 Backend APIs are already defined in frontend service files!**
- ✅ All function stubs exist
- ⚠️ Most are not yet integrated into components
- 📋 This guide shows where each function is defined and how to use it

---

## Complete API Implementation Map

### Authentication APIs

#### 1. ✅ Register User
- **Endpoint:** `POST /api/auth/register`
- **Function:** `authService.register(username, password)`
- **File:** [src/api/authService.js](authService.js)
- **Status:** Implemented, NOT used in components
- **Usage Example:**
  ```javascript
  import { authService } from '../../api/authService';
  
  const handleRegister = async (username, password) => {
    try {
      const response = await authService.register(username, password);
      console.log('Registration successful:', response);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  ```
- **Where to Add:** LoginModal.jsx (add register tab/form)

#### 2. ✅ Login
- **Endpoint:** `POST /api/auth/login`
- **Function:** `authService.login(username, password)`
- **File:** [src/api/authService.js](authService.js)
- **Status:** ✅ Implemented & USED
- **Location:** LoginModal.jsx

---

### Entity Management APIs

#### 3. ✅ Create Entity
- **Endpoint:** `POST /api/entities/{entityType}`
- **Function:** `entityService.create(entityType, entityData)`
- **File:** [src/api/entityService.js](entityService.js)
- **Status:** Implemented, NOT used
- **Usage Example:**
  ```javascript
  const newEntity = await entityService.create('movie', {
    name: 'The Matrix Resurrections',
    type: 'MOVIE',
    director: 'Lana Wachowski',
    actors: ['Keanu Reeves', 'Carrie-Anne Moss'],
    keywords: ['matrix', 'sci-fi']
  });
  ```
- **Where to Add:** Create a new "Add Entity" modal/page

#### 4. ✅ Get All Entities
- **Endpoint:** `GET /api/entities/{entityType}`
- **Function:** `entityService.getAll(entityType)`
- **File:** [src/api/entityService.js](entityService.js)
- **Status:** ✅ Implemented & USED
- **Location:** PRCommandCenter.jsx

#### 5. ✅ Get Entity by ID
- **Endpoint:** `GET /api/entities/{entityType}/{id}`
- **Function:** `entityService.getById(entityId, entityType)`
- **File:** [src/api/entityService.js](entityService.js)
- **Status:** Implemented, NOT used
- **Usage Example:**
  ```javascript
  const entity = await entityService.getById(1, 'movie');
  // Returns: { id, name, director, actors, keywords, competitors }
  ```
- **Where to Add:** Entity detail page/modal

#### 6. ✅ Update Competitors
- **Endpoint:** `PUT /api/entities/{entityType}/{id}/competitors`
- **Function:** `entityService.updateCompetitors(entityType, entityId, competitorIds)`
- **File:** [src/api/entityService.js](entityService.js)
- **Status:** Implemented, NOT used
- **Usage Example:**
  ```javascript
  const updated = await entityService.updateCompetitors('movie', 1, [3, 4, 5]);
  ```
- **Where to Add:** Entity settings/management page

#### 7. ✅ Update Keywords
- **Endpoint:** `PUT /api/entities/{entityType}/{id}/keywords`
- **Function:** `entityService.updateKeywords(entityType, entityId, keywords)`
- **File:** [src/api/entityService.js](entityService.js)
- **Status:** Implemented, NOT used
- **Usage Example:**
  ```javascript
  const updated = await entityService.updateKeywords('movie', 1, ['action', 'sci-fi', 'thriller']);
  ```
- **Where to Add:** Entity settings/management page

---

### Dashboard APIs

#### 8. ✅ Get Entity Statistics
- **Endpoint:** `GET /api/dashboard/{entityType}/{entityId}/stats`
- **Function:** `dashboardService.getStats(entityType, entityId)`
- **File:** [src/api/dashboardService.js](dashboardService.js)
- **Status:** ✅ Implemented & USED
- **Location:** DashboardView.jsx, KPICardsSection.jsx

#### 9. ✅ Get Competitor Snapshot
- **Endpoint:** `GET /api/dashboard/{entityType}/{entityId}/competitor-snapshot`
- **Function:** `dashboardService.getCompetitorSnapshot(entityType, entityId)`
- **File:** [src/api/dashboardService.js](dashboardService.js)
- **Status:** ✅ Implemented & USED
- **Location:** CompetitivePositioning.jsx

#### 10. ✅ Get Sentiment Over Time
- **Endpoint:** `GET /api/dashboard/{entityType}/{entityId}/sentiment-over-time`
- **Function:** `dashboardService.getSentimentOverTime(entityType, entityId, period, entityIds)`
- **File:** [src/api/dashboardService.js](dashboardService.js)
- **Status:** ✅ Implemented & USED
- **Location:** SentimentTrendChart.jsx

#### 11. ✅ Get Platform Mentions
- **Endpoint:** `GET /api/dashboard/{entityType}/{entityId}/platform-mentions`
- **Function:** `dashboardService.getPlatformMentions(entityType, entityId)`
- **File:** [src/api/dashboardService.js](dashboardService.js)
- **Status:** ✅ Implemented & USED
- **Location:** PlatformBreakdownChart.jsx

#### 12. ✅ Get Filtered Mentions
- **Endpoint:** `GET /api/dashboard/{entityType}/{entityId}/mentions`
- **Function:** `dashboardService.getMentions(entityType, entityId, platform, page, size)`
- **File:** [src/api/dashboardService.js](dashboardService.js)
- **Status:** ✅ Implemented & USED
- **Location:** CrisisFocusView.jsx, SocialMediaFeed.jsx

---

### Interaction APIs

#### 13. ✅ Generate Reply
- **Endpoint:** `POST /api/interact/generate-reply`
- **Function:** `interactionService.generateReply(managedEntityName, mentionContent, sentiment)`
- **File:** [src/api/interactionService.js](interactionService.js)
- **Status:** Implemented, NOT used
- **Usage Example:**
  ```javascript
  const { generatedReply } = await interactionService.generateReply(
    'The Quantum Paradox',
    'This movie was terrible!',
    'NEGATIVE'
  );
  ```
- **Where to Add:** SimplifiedReplyGenerator.jsx, AIReplyGenerator.jsx

#### 14. ✅ Post Response
- **Endpoint:** `POST /api/interact/respond`
- **Function:** `interactionService.respond(platform, postIdToReplyTo, replyText)`
- **File:** [src/api/interactionService.js](interactionService.js)
- **Status:** Implemented, NOT used
- **Usage Example:**
  ```javascript
  const response = await interactionService.respond(
    'X',
    'tweet_12345',
    'Thank you for your feedback!'
  );
  ```
- **Where to Add:** Reply submission handlers in SimplifiedReplyGenerator.jsx

---

### Crisis Management APIs

#### 15. ✅ Generate Crisis Plan
- **Endpoint:** `POST /api/crisis/generate-plan`
- **Function:** `crisisService.generatePlan(entityId, crisisDescription)`
- **File:** [src/api/crisisService.js](crisisService.js)
- **Status:** Implemented, NOT used
- **Usage Example:**
  ```javascript
  const { generatedPlan } = await crisisService.generatePlan(
    1,
    'Negative reviews flooding social media'
  );
  ```
- **Where to Add:** CrisisPlanGenerator.jsx

---

### Analytics APIs

#### 16. ✅ Get Box Office Prediction
- **Endpoint:** `GET /api/analytics/{movieId}`
- **Function:** `analyticsService.getBoxOfficePrediction(movieId)`
- **File:** [src/api/analyticsService.js](analyticsService.js)
- **Status:** Implemented, NOT used
- **Usage Example:**
  ```javascript
  const prediction = await analyticsService.getBoxOfficePrediction(11);
  // Returns: { movieId, predictedBoxOffice with financial_projections, strategic_fit, market_verdict }
  ```
- **Where to Add:** BoxOfficePrediction.jsx

#### 17. ✅ Get Trending Genre
- **Endpoint:** `GET /api/analytics/trending-genre`
- **Function:** `analyticsService.getTrendingGenre(date)`
- **File:** [src/api/analyticsService.js](analyticsService.js)
- **Status:** ✅ Implemented & USED
- **Location:** TrendingNarratives.jsx

#### 18. ✅ Get Hit Genre Prediction
- **Endpoint:** `GET /api/analytics/hit-genre-prediction`
- **Function:** `analyticsService.getHitGenrePrediction()`
- **File:** [src/api/analyticsService.js](analyticsService.js)
- **Status:** ✅ Implemented & USED
- **Location:** HitGenrePrediction.jsx

#### 19. ✅ Get Best Genre
- **Endpoint:** `GET /api/analytics/best-genre`
- **Function:** `analyticsService.getBestGenre(date)`
- **File:** [src/api/analyticsService.js](analyticsService.js)
- **Status:** Implemented, NOT used
- **Usage Example:**
  ```javascript
  const { date, bestGenre } = await analyticsService.getBestGenre(new Date());
  ```
- **Where to Add:** Genre analytics dashboard

#### 20. ✅ Get Top Box Office
- **Endpoint:** `GET /api/analytics/top-box-office`
- **Function:** `analyticsService.getTopBoxOffice(date)`
- **File:** [src/api/analyticsService.js](analyticsService.js)
- **Status:** ✅ Implemented & USED
- **Location:** TopBoxOfficeMovies.jsx

---

## Implementation Priority

### High Priority (Missing Core Features)
1. **POST /api/interact/generate-reply** - Needed for AI reply generation feature
2. **POST /api/interact/respond** - Needed for posting replies to social media
3. **POST /api/crisis/generate-plan** - Needed for crisis management feature
4. **POST /api/entities/{entityType}** - Needed for entity creation feature

### Medium Priority (Data Management)
5. **PUT /api/entities/{entityType}/{id}/competitors** - Entity editing
6. **PUT /api/entities/{entityType}/{id}/keywords** - Entity editing
7. **GET /api/entities/{entityType}/{id}** - Entity detail views
8. **GET /api/analytics/{movieId}** - Box office predictions

### Low Priority (Additional Analytics)
9. **POST /api/auth/register** - User registration (optional if using default user)
10. **GET /api/analytics/best-genre** - Genre analytics (nice-to-have)

---

## Quick Integration Checklist

- [ ] Import service in component: `import { xyzService } from '../../api/xyzService.js';`
- [ ] Add loading/error state management
- [ ] Call function on component mount or user action
- [ ] Handle response and update state
- [ ] Add error UI/notifications
- [ ] Test with backend API

## Example Integration Pattern

```javascript
import React, { useState, useEffect } from 'react';
import { interactionService } from '../../api/interactionService';

export function MyComponent() {
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateReply = async (mention) => {
    setLoading(true);
    setError(null);
    try {
      const { generatedReply } = await interactionService.generateReply(
        mention.entityName,
        mention.content,
        mention.sentiment
      );
      setReply(generatedReply);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {loading && <div>Generating...</div>}
      {reply && <div className="reply">{reply}</div>}
      <button onClick={() => handleGenerateReply(mention)}>
        Generate Reply
      </button>
    </div>
  );
}
```

---

## Service Files Reference

- **[authService.js](authService.js)** - Authentication (login, register)
- **[entityService.js](entityService.js)** - Entity management (CRUD)
- **[dashboardService.js](dashboardService.js)** - Dashboard data
- **[analyticsService.js](analyticsService.js)** - Analytics & predictions
- **[interactionService.js](interactionService.js)** - AI replies & social posting
- **[crisisService.js](crisisService.js)** - Crisis management

---

## Next Steps

1. **Review** each unused API function in its service file
2. **Identify** components that need this functionality
3. **Integrate** following the pattern above
4. **Test** with backend API running
5. **Add** loading/error states and user feedback
