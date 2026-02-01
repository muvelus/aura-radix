/**
 * Custom hooks for analytics functionality
 * These provide a clean API for components to interact with the analytics store
 */

import { useAnalyticsStore } from '../store/analyticsStore';

/**
 * Hook to fetch and manage top movies data
 * @returns {Object} { topMovies, isLoading, error, refetch }
 */
export function useTopMovies() {
  const topMovies = useAnalyticsStore((state) => state.topMovies);
  const isLoading = useAnalyticsStore((state) => state.isLoading);
  const error = useAnalyticsStore((state) => state.error);
  const fetchTopMovies = useAnalyticsStore((state) => state.fetchTopMovies);
  const clearError = useAnalyticsStore((state) => state.clearError);

  return {
    topMovies,
    isLoading,
    error,
    refetch: fetchTopMovies,
    clearError,
  };
}

/**
 * Hook to fetch and manage genres data
 * @returns {Object} { genres, isLoading, error, refetch }
 */
export function useGenres() {
  const genres = useAnalyticsStore((state) => state.genres);
  const isLoading = useAnalyticsStore((state) => state.isLoading);
  const error = useAnalyticsStore((state) => state.error);
  const fetchGenres = useAnalyticsStore((state) => state.fetchGenres);
  const clearError = useAnalyticsStore((state) => state.clearError);

  return {
    genres,
    isLoading,
    error,
    refetch: fetchGenres,
    clearError,
  };
}

/**
 * Hook to fetch and manage sentiments data
 * @returns {Object} { sentiments, isLoading, error, refetch }
 */
export function useSentiments() {
  const sentiments = useAnalyticsStore((state) => state.sentiments);
  const isLoading = useAnalyticsStore((state) => state.isLoading);
  const error = useAnalyticsStore((state) => state.error);
  const fetchSentiments = useAnalyticsStore((state) => state.fetchSentiments);
  const clearError = useAnalyticsStore((state) => state.clearError);

  return {
    sentiments,
    isLoading,
    error,
    refetch: fetchSentiments,
    clearError,
  };
}

/**
 * Hook to fetch and manage celebrities data
 * @returns {Object} { celebrities, isLoading, error, refetch }
 */
export function useCelebrities() {
  const celebrities = useAnalyticsStore((state) => state.celebrities);
  const isLoading = useAnalyticsStore((state) => state.isLoading);
  const error = useAnalyticsStore((state) => state.error);
  const fetchCelebrities = useAnalyticsStore((state) => state.fetchCelebrities);
  const clearError = useAnalyticsStore((state) => state.clearError);

  return {
    celebrities,
    isLoading,
    error,
    refetch: fetchCelebrities,
    clearError,
  };
}

/**
 * Hook to fetch and manage metrics data
 * @returns {Object} { metrics, isLoading, error, refetch }
 */
export function useMetrics() {
  const metrics = useAnalyticsStore((state) => state.metrics);
  const isLoading = useAnalyticsStore((state) => state.isLoading);
  const error = useAnalyticsStore((state) => state.error);
  const fetchMetrics = useAnalyticsStore((state) => state.fetchMetrics);
  const clearError = useAnalyticsStore((state) => state.clearError);

  return {
    metrics,
    isLoading,
    error,
    refetch: fetchMetrics,
    clearError,
  };
}

/**
 * Hook to access store utilities
 * @returns {Object} { resetStore, error, clearError }
 */
export function useAnalyticsStoreUtils() {
  const resetStore = useAnalyticsStore((state) => state.resetStore);
  const error = useAnalyticsStore((state) => state.error);
  const clearError = useAnalyticsStore((state) => state.clearError);

  return {
    resetStore,
    error,
    clearError,
  };
}
