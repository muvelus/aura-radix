import React from 'react';

/**
 * Grid container for organizing StatCards
 * Provides consistent layout and responsive behavior
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.stats - Array of stat objects to render
 * @param {number} props.columns - Number of columns (default: 3)
 * @param {boolean} props.isLoading - Loading state for all cards
 * @param {string} props.className - Additional CSS classes
 */
export function StatsGrid({
  stats = [],
  columns = 3,
  isLoading = false,
  className = '',
  children,
}) {
  if (children) {
    // If children are passed, use flex layout for custom content
    return (
      <div className={`grid gap-4 ${className}`} role="region" aria-label="Statistics">
        {children}
      </div>
    );
  }

  if (!stats.length) {
    return null;
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-4 ${className}`}
      role="region"
      aria-label="Statistics Grid"
      data-testid="stats-grid"
    >
      {stats.map((stat, idx) => (
        <React.Fragment key={`stat-${stat.label}-${idx}`}>
          {typeof stat === 'object' && stat.component ? (
            stat.component
          ) : (
            <div data-testid={`stat-item-${idx}`}>{stat}</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

StatsGrid.displayName = 'StatsGrid';
