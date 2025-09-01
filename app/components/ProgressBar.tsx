'use client';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  animated?: boolean;
}

export default function ProgressBar({
  value,
  max = 100,
  color = 'accent',
  size = 'md',
  showLabel = false,
  className = '',
  animated = true,
}: ProgressBarProps) {
  // Calculate percentage
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  // Determine height based on size
  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  // Determine color class
  const colors = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };
  
  // Determine animation class
  const animation = animated ? 'transition-all duration-500 ease-out' : '';
  
  return (
    <div className={`w-full ${className}`}>
      <div className="bg-white/10 rounded-full overflow-hidden">
        <div
          className={`${colors[color]} ${heights[size]} rounded-full ${animation}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      
      {showLabel && (
        <div className="mt-1 text-xs text-text-secondary flex justify-between">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}

