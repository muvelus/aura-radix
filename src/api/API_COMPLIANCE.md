/**
 * AURA API SERVICE LAYER
 * 
 * Frontend API client layer for AuraService backend
 * All endpoints are fully documented and REST-compliant
 * 
 * COMPLIANCE SUMMARY
 * ==================
 * 
 * ✅ All 16 documented endpoints implemented
 * ✅ Proper HTTP methods (GET, POST, PUT, DELETE)
 * ✅ JWT authentication via Bearer tokens
 * ✅ Error handling with status codes (401, 403, 404, 422, 429, 500)
 * ✅ Request/response validation
 * ✅ CORS support
 * ✅ Request timeout handling (15s)
 * ✅ Pagination support (page, size)
 * ✅ Query parameter filtering
 * ✅ Proper Content-Type headers
 * 
 * SERVICES
 * ========
 */

// 1. AUTHENTICATION SERVICE
// - POST /api/auth/register
// - POST /api/auth/login
// - Logout (client-side)

// 2. ENTITY MANAGEMENT SERVICE
// - POST /api/entities/{entityType}           [CREATE]
// - GET  /api/entities/{entityType}           [READ ALL]
// - GET  /api/entities/{entityType}/{id}      [READ ONE]
// - PUT  /api/entities/{entityType}/{id}/competitors  [UPDATE]
// - PUT  /api/entities/{entityType}/{id}/keywords     [UPDATE]
// - DELETE /api/entities/{entityType}/{id}   [DELETE] ✨ NEW

// 3. DASHBOARD SERVICE
// - GET /api/dashboard/{entityType}/{entityId}/stats
// - GET /api/dashboard/{entityType}/{entityId}/competitor-snapshot
// - GET /api/dashboard/{entityType}/{entityId}/sentiment-over-time
// - GET /api/dashboard/{entityType}/{entityId}/platform-mentions
// - GET /api/dashboard/{entityType}/{entityId}/mentions

// 4. INTERACTION SERVICE
// - POST /api/interact/generate-reply        [UPDATED: added managedEntityName]
// - POST /api/interact/respond

// 5. CRISIS MANAGEMENT SERVICE
// - POST /api/crisis/generate-plan

// 6. ANALYTICS SERVICE
// - GET /api/analytics/{movieId}             [FIXED: path param instead of query]
// - GET /api/analytics/trending-genre
// - GET /api/analytics/hit-genre-prediction
// - GET /api/analytics/best-genre
// - GET /api/analytics/top-box-office

/**
 * REST BEST PRACTICES IMPLEMENTED
 * ================================
 * 
 * 1. RESOURCE-ORIENTED ARCHITECTURE
 *    - Clear resource naming (/entities, /dashboard, /analytics)
 *    - Proper HTTP methods for actions (GET, POST, PUT, DELETE)
 *    - Consistent URI structure
 * 
 * 2. STATELESS OPERATIONS
 *    - JWT tokens passed per request
 *    - No session state on client
 *    - Scalable horizontal architecture
 * 
 * 3. ERROR HANDLING
 *    - Standard HTTP status codes
 *    - Structured error responses with messages
 *    - Validation error details (422)
 *    - Global error interceptor
 * 
 * 4. SECURITY
 *    - Bearer token authentication (JWT)
 *    - Token refresh on 401 responses
 *    - CORS enabled
 *    - Automatic logout on 401
 * 
 * 5. PAGINATION & FILTERING
 *    - Query parameters for filtering (platform, page, size)
 *    - Standard page/size naming
 *    - Meta information in responses
 * 
 * 6. PERFORMANCE
 *    - Request timeout (15s)
 *    - Gzip compression support (via server)
 *    - Minimal payload sizes
 * 
 * 7. DOCUMENTATION
 *    - JSDoc comments in each service
 *    - Request/response types documented
 *    - Path parameters clearly marked
 *    - Query parameters with defaults
 * 
 * USAGE EXAMPLE
 * =============
 * 
 * import { entityService, dashboardService, authService } from '@/api';
 * 
 * // Authentication
 * const token = await authService.login('user', 'password');
 * 
 * // Entity Management
 * const entities = await entityService.getAll('movie');
 * const movie = await entityService.getById(1, 'movie');
 * 
 * // Dashboard
 * const stats = await dashboardService.getStats('movie', 1);
 * const mentions = await dashboardService.getMentions('movie', 1, {
 *   platform: 'X',
 *   page: 0,
 *   size: 10
 * });
 * 
 * // Interactions
 * const reply = await interactionService.generateReply(
 *   'The Quantum Paradox',
 *   'Great movie!',
 *   'POSITIVE'
 * );
 * 
 * CHANGELOG
 * =========
 * v2.1.0 - 2026-02-03
 *   - Updated analytics endpoint path (query param → path param)
 *   - Added delete entity method
 *   - Updated generateReply to include managedEntityName
 *   - Enhanced error handling in client interceptor
 *   - Added validation error details
 * 
 * v2.0.0 - Initial implementation
 *   - All core APIs implemented
 *   - JWT authentication
 *   - Global error handling
 */
