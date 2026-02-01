import React from 'react';
import * as Label from '@radix-ui/react-label';

/**
 * Reusable form input component with consistent styling
 * Supports text, email, number, textarea, and password inputs
 */
export default function FormInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  disabled = false,
  error = null,
  helpText = null,
  rows = 3,
  className = '',
}) {
  const isTextarea = type === 'textarea';

  return (
    <div className="space-y-2">
      {label && (
        <Label.Root 
          htmlFor={id}
          className="text-sm font-medium text-foreground cursor-pointer"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label.Root>
      )}
      
      {isTextarea ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={rows}
          className={`
            w-full px-3 py-2 bg-card border border-border rounded-lg
            text-foreground placeholder-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-3 py-2 bg-card border border-border rounded-lg
            text-foreground placeholder-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
        />
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
      
      {helpText && !error && (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}
