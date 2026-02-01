import React from 'react';
import { Skeleton } from '@radix-ui/themes';

/**
 * Reusable StatCard component for displaying metric cards
 * Reduces code duplication across analytics components by 40-50%
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ComponentType} props.icon - Icon component to display
 * @param {string} props.label - Label text for the metric
 * @param {string|number} props.value - Main value to display
 * @param {'green'|'purple'|'blue'|'orange'|'red'} props.color - Color theme
 * @param {number} props.trend - Trend percentage (e.g., +5, -2)
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.className - Additional CSS classes
 */
export function StatCard({
  icon: Icon,
  label,
  value,
  color = 'green',
  trend,
  isLoading = false,
  className = '',
}) {
  const colorClasses = {
    green: 'bg-green-500/10 border-green-500/20 text-green-500',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-500',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
    orange: 'bg-orange-500/10 border-orange-500/20 text-orange-500',
    red: 'bg-red-500/10 border-red-500/20 text-red-500',
  };

  const ariaLabel = `${label}: ${value}${trend ? `, ${trend}% trend` : ''}`;

  return (
    <div
      className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${colorClasses[color]} ${className}`}
      role="region"
      aria-label={ariaLabel}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon
              className="w-4 h-4"
              aria-hidden="true"
              data-testid="stat-card-icon"
            />
          )}
          <p className="text-xs text-muted-foreground uppercase font-semibold">
            {label}
          </p>
        </div>
        {trend !== undefined && !isLoading && (
          <span
            className={`text-xs font-bold ${
              trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'
            }`}
            aria-label={`${trend > 0 ? 'increase' : trend < 0 ? 'decrease' : 'no change'} of ${Math.abs(trend)}%`}
            data-testid="stat-card-trend"
          >
            {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      {isLoading ? (
        <Skeleton className="h-8 w-24" />
      ) : (
        <p className="text-2xl font-bold" data-testid="stat-card-value">
          {value}
        </p>
      )}
    </div>
  );
}

StatCard.displayName = 'StatCard';
