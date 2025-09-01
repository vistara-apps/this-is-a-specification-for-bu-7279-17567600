'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { 
    label, 
    error, 
    helperText,
    leftIcon,
    rightIcon,
    fullWidth = true,
    className = '', 
    id: propId,
    required,
    disabled,
    ...props 
  }, 
  ref
) {
  // Generate a unique ID for accessibility if not provided
  const generatedId = useId();
  const id = propId || `input-${generatedId}`;
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  
  // Determine border color based on state
  const borderClass = error 
    ? 'border-error focus:border-error' 
    : disabled
    ? 'border-white/10'
    : 'border-white/20 focus:border-accent';

  // Determine width class
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`space-y-2 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label 
          htmlFor={id}
          className="block text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
            {leftIcon}
          </div>
        )}
        
        <input
          id={id}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={errorId || helperId}
          disabled={disabled}
          required={required}
          className={`
            input-field ${borderClass} ${className} ${widthClass}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            transition-all duration-base
          `}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p id={errorId} className="text-sm text-error animate-fade-in">
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p id={helperId} className="text-sm text-text-secondary">
          {helperText}
        </p>
      )}
    </div>
  );
});

export default Input;
