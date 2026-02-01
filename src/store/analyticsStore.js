import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * Analytics Store - Centralized state management for analytics data
 * Uses Zustand with devtools and persist middleware
 * 
 * Features:
 * - Caches data to prevent unnecessary API calls
 * - DevTools integration for debugging
 * - Persists data to localStorage
 * - Loading and error states
 */

export const useAnalyticsStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        topMovies: [],
        genres: [],
        sentiments: [],
        celebrities: [],
        metrics: null,
        isLoading: false,
        error: null,
        lastFetch: null,

        // Actions - Setters
        setTopMovies: (data) => set({ topMovies: data, lastFetch: Date.now() }),
        setGenres: (data) => set({ genres: data, lastFetch: Date.now() }),
        setSentiments: (data) => set({ sentiments: data, lastFetch: Date.now() }),
        setCelebrities: (data) => set({ celebrities: data, lastFetch: Date.now() }),
        setMetrics: (data) => set({ metrics: data, lastFetch: Date.now() }),
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        clearError: () => set({ error: null }),

        // Async Actions - Data fetching
        fetchTopMovies: async () => {
          const state = get();
          
          // Return cached data if available and recent (< 5 minutes)
          if (state.topMovies.length && state.lastFetch && Date.now() - state.lastFetch < 300000) {
            return state.topMovies;
          }

          set({ isLoading: true, error: null });
          try {
            // Mock data - replace with actual API call
            const data = await fetch('/api/analytics/movies')
              .then(r => r.json())
              .catch(() => {
                // Fallback: use dummy data if API unavailable
                console.warn('API unavailable, using cached data');
                return state.topMovies;
              });

            set({ topMovies: data, isLoading: false, lastFetch: Date.now() });
            return data;
          } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to fetch movies');
            set({ error, isLoading: false });
            throw error;
          }
        },

        fetchGenres: async () => {
          const state = get();
          
          if (state.genres.length && state.lastFetch && Date.now() - state.lastFetch < 300000) {
            return state.genres;
          }

          set({ isLoading: true, error: null });
          try {
            const data = await fetch('/api/analytics/genres')
              .then(r => r.json())
              .catch(() => state.genres);

            set({ genres: data, isLoading: false, lastFetch: Date.now() });
            return data;
          } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to fetch genres');
            set({ error, isLoading: false });
            throw error;
          }
        },

        fetchSentiments: async () => {
          const state = get();
          
          if (state.sentiments.length && state.lastFetch && Date.now() - state.lastFetch < 300000) {
            return state.sentiments;
          }

          set({ isLoading: true, error: null });
          try {
            const data = await fetch('/api/analytics/sentiments')
              .then(r => r.json())
              .catch(() => state.sentiments);

            set({ sentiments: data, isLoading: false, lastFetch: Date.now() });
            return data;
          } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to fetch sentiments');
            set({ error, isLoading: false });
            throw error;
          }
        },

        fetchCelebrities: async () => {
          const state = get();
          
          if (state.celebrities.length && state.lastFetch && Date.now() - state.lastFetch < 300000) {
            return state.celebrities;
          }

          set({ isLoading: true, error: null });
          try {
            const data = await fetch('/api/analytics/celebrities')
              .then(r => r.json())
              .catch(() => state.celebrities);

            set({ celebrities: data, isLoading: false, lastFetch: Date.now() });
            return data;
          } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to fetch celebrities');
            set({ error, isLoading: false });
            throw error;
          }
        },

        fetchMetrics: async () => {
          const state = get();
          
          if (state.metrics && state.lastFetch && Date.now() - state.lastFetch < 300000) {
            return state.metrics;
          }

          set({ isLoading: true, error: null });
          try {
            const data = await fetch('/api/analytics/metrics')
              .then(r => r.json())
              .catch(() => state.metrics);

            set({ metrics: data, isLoading: false, lastFetch: Date.now() });
            return data;
          } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to fetch metrics');
            set({ error, isLoading: false });
            throw error;
          }
        },

        // Utility Actions
        resetStore: () =>
          set({
            topMovies: [],
            genres: [],
            sentiments: [],
            celebrities: [],
            metrics: null,
            isLoading: false,
            error: null,
            lastFetch: null,
          }),
      }),
      {
        name: 'analytics-store', // Key used to store in localStorage
        version: 1,
      }
    ),
    { name: 'Analytics Store' } // DevTools name
  )
);

// Selectors - Memoized accessors for better performance
export const selectTopMovies = (state) => state.topMovies;
export const selectGenres = (state) => state.genres;
export const selectSentiments = (state) => state.sentiments;
export const selectCelebrities = (state) => state.celebrities;
export const selectMetrics = (state) => state.metrics;
export const selectIsLoading = (state) => state.isLoading;
export const selectError = (state) => state.error;
export const selectLastFetch = (state) => state.lastFetch;
