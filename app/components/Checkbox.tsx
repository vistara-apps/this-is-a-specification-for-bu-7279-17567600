'use client';

import { InputHTMLAttributes, forwardRef, useId } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { 
    label, 
    description,
    error,
    size = 'md',
    className = '',
    id: propId,
    disabled,
    ...props 
  }, 
  ref
) {
  // Generate a unique ID for accessibility
  const generatedId = useId();
  const id = propId || `checkbox-${generatedId}`;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  
  // Determine size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  return (
    <div className="space-y-1">
      <label 
        htmlFor={id}
        className={`flex items-start space-x-3 cursor-pointer ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <div className="relative flex items-center justify-center pt-0.5">
          <input
            id={id}
            ref={ref}
            type="checkbox"
            aria-describedby={descriptionId || errorId}
            disabled={disabled}
            className={`${sizeClasses[size]} checkbox transition-all duration-base ${className}`}
            {...props}
          />
        </div>
        
        {(label || description) && (
          <div className="flex-1">
            {label && (
              <span className="block text-sm font-medium text-text-primary select-none">
                {label}
              </span>
            )}
            
            {description && !error && (
              <p id={descriptionId} className="mt-1 text-xs text-text-secondary">
                {description}
              </p>
            )}
          </div>
        )}
      </label>
      
      {error && (
        <p id={errorId} className="text-xs text-error ml-8">
          {error}
        </p>
      )}
    </div>
  );
});

export default Checkbox;
