import React from 'react';

/**
 * Reusable Card component for consistent styling
 * Used throughout the app for cards, stats, and panels
 */
export function Card({
  children,
  className = '',
  variant = 'default',
  ...props
}) {
  const variantStyles = {
    default: 'bg-card border border-border',
    elevated: 'bg-card border border-border/50 shadow-lg shadow-black/10',
    subtle: 'bg-accent/30 border border-border/50',
    ghost: 'bg-transparent border border-border/25',
  };

  return (
    <div
      className={`
        rounded-lg p-6 transition-all
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card header - for titles and descriptions
 */
export function CardHeader({
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={`mb-4 pb-4 border-b border-border/50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card title - main heading
 */
export function CardTitle({
  children,
  className = '',
  ...props
}) {
  return (
    <h3
      className={`text-lg font-semibold text-foreground ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

/**
 * Card description - subtitle or description text
 */
export function CardDescription({
  children,
  className = '',
  ...props
}) {
  return (
    <p
      className={`text-sm text-muted-foreground mt-1 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

/**
 * Card content - main content area
 */
export function CardContent({
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={`space-y-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card footer - actions or footer content
 */
export function CardFooter({
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={`mt-6 pt-4 border-t border-border/50 flex items-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
