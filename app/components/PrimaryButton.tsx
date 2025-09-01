'use client';

import { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  variant?: 'default' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export default function PrimaryButton({
  children,
  variant = 'default',
  onClick,
  disabled = false,
  loading = false,
  className = '',
}: PrimaryButtonProps) {
  const baseClass = variant === 'outline' ? 'btn-outline' : 'btn-primary';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const loadingClass = loading ? 'opacity-75' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClass} ${disabledClass} ${loadingClass} ${className} flex items-center justify-center space-x-2`}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      <span>{children}</span>
    </button>
  );
}
