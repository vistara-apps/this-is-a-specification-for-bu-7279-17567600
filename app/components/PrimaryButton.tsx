'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

export default function PrimaryButton({
  children,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  onClick,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  ...props
}: PrimaryButtonProps) {
  // Map variant to class name
  const variantClasses = {
    default: 'btn-primary',
    outline: 'btn-outline',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
  };
  
  // Map size to class name
  const sizeClasses = {
    sm: 'text-sm px-3 py-2',
    md: 'px-4 py-3',
    lg: 'text-lg px-5 py-4',
  };

  const baseClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];
  const widthClass = fullWidth ? 'w-full' : '';
  const loadingClass = loading ? 'opacity-75' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClass} ${sizeClass} ${widthClass} ${loadingClass} ${className} 
                 flex items-center justify-center gap-2 transition-all duration-base`}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      
      {!loading && leftIcon && (
        <span className="flex-shrink-0">{leftIcon}</span>
      )}
      
      <span>{children}</span>
      
      {!loading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
}
