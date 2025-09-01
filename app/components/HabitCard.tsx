'use client';

import { Habit } from '../types';
import { format } from 'date-fns';

interface HabitCardProps {
  habit: Habit;
  variant?: 'active' | 'completed';
  onComplete?: (habitId: string) => void;
  onEdit?: (habitId: string) => void;
  onToggle?: (habitId: string) => void;
}

export default function HabitCard({ 
  habit, 
  variant = 'active',
  onComplete,
  onEdit,
  onToggle 
}: HabitCardProps) {
  const isCompleted = variant === 'completed';
  const cardClass = isCompleted ? 'habit-card-completed' : 'habit-card-active';
  
  const getFrequencyText = () => {
    if (habit.frequency.type === 'hourly') {
      return `Every ${habit.frequency.interval} minutes`;
    }
    if (habit.frequency.type === 'daily') {
      if (habit.frequency.times) {
        return `Daily at ${habit.frequency.times.join(', ')}`;
      }
      return 'Daily';
    }
    return 'Custom schedule';
  };

  const getCategoryIcon = () => {
    const icons = {
      hydration: '💧',
      break: '🧘',
      exercise: '🏃',
      mindfulness: '🌸',
      custom: '⭐',
    };
    return icons[habit.category] || '⭐';
  };

  return (
    <div className={`${cardClass} animate-fade-in`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getCategoryIcon()}</span>
          <div>
            <h3 className="font-semibold text-text-primary">{habit.name}</h3>
            <p className="text-sm text-text-secondary">{getFrequencyText()}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {habit.streak > 0 && (
            <div className="flex items-center space-x-1 text-accent text-sm font-medium">
              <span>🔥</span>
              <span>{habit.streak}</span>
            </div>
          )}
          
          <button
            onClick={() => onToggle?.(habit.habitId)}
            className={`w-6 h-6 rounded-full border-2 transition-colors duration-base ${
              habit.isActive 
                ? 'border-accent bg-accent' 
                : 'border-white/30 bg-transparent'
            }`}
          >
            {habit.isActive && (
              <span className="text-white text-xs">✓</span>
            )}
          </button>
        </div>
      </div>
      
      <p className="text-text-secondary text-sm mb-4">{habit.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="text-xs text-text-secondary">
          {habit.lastCompleted && (
            <span>Last: {format(new Date(habit.lastCompleted), 'MMM d, HH:mm')}</span>
          )}
        </div>
        
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(habit.habitId)}
              className="px-3 py-1 text-xs text-text-secondary hover:text-text-primary transition-colors duration-base"
            >
              Edit
            </button>
          )}
          {onComplete && !isCompleted && (
            <button
              onClick={() => onComplete(habit.habitId)}
              className="btn-primary text-xs px-3 py-1"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
