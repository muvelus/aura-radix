import React from 'react';
import { AlertCircle, BarChart3, FileQuestion } from 'lucide-react';

/**
 * EmptyState component - Displayed when no data is available
 * Provides user-friendly messaging for empty data states
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ComponentType} props.icon - Icon to display (defaults to BarChart3)
 * @param {string} props.title - Empty state title
 * @param {string} props.description - Empty state description
 * @param {React.ReactNode} props.action - Optional action button/link
 * @param {string} props.className - Additional CSS classes
 */
export function EmptyState({
  icon: Icon = BarChart3,
  title = 'No Data Available',
  description = 'There is no data to display at this time.',
  action = null,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
      role="status"
      aria-label={`Empty state: ${title}`}
      data-testid="empty-state"
    >
      <Icon className="w-12 h-12 text-muted-foreground mb-4" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}

/**
 * ErrorState component - Displayed when an error occurs
 * Provides error messaging and recovery options
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Error} props.error - Error object
 * @param {Function} props.onRetry - Retry callback function
 * @param {string} props.title - Error title (defaults to "Something Went Wrong")
 * @param {string} props.className - Additional CSS classes
 */
export function ErrorState({
  error,
  onRetry,
  title = 'Something Went Wrong',
  className = '',
}) {
  const errorMessage =
    error?.message || 'An unexpected error occurred. Please try again.';

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
      role="alert"
      aria-label={`Error: ${title}`}
      data-testid="error-state"
    >
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
        {errorMessage}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
          aria-label="Retry loading data"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

/**
 * LoadingState component - Displayed while data is loading
 * Shows skeleton loaders for better perceived performance
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.count - Number of skeleton items to show (default: 3)
 * @param {string} props.className - Additional CSS classes
 */
export function LoadingState({ count = 3, className = '' }) {
  return (
    <div
      className={`space-y-4 ${className}`}
      role="status"
      aria-busy="true"
      aria-label="Loading data"
      data-testid="loading-state"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="h-20 bg-muted rounded-lg animate-pulse"
          data-testid={`skeleton-loader-${idx}`}
        />
      ))}
    </div>
  );
}

EmptyState.displayName = 'EmptyState';
ErrorState.displayName = 'ErrorState';
LoadingState.displayName = 'LoadingState';
