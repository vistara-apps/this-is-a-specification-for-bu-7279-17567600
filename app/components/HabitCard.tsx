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

  // Calculate progress percentage for the visual indicator
  const getProgressIndicator = () => {
    // This is a simplified version - in a real app, you'd calculate based on completion history
    if (isCompleted) return 100;
    if (habit.streak > 10) return 90;
    if (habit.streak > 5) return 70;
    if (habit.streak > 0) return 50;
    return 20;
  };

  const progressPercent = getProgressIndicator();

  return (
    <div className={`${cardClass} animate-fade-in relative overflow-hidden group`}>
      {/* Progress indicator */}
      <div 
        className={`absolute left-0 bottom-0 h-1 ${isCompleted ? 'bg-accent' : 'bg-accent/60'} transition-all duration-500 ease-out`}
        style={{ width: `${progressPercent}%` }}
      />
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`text-2xl p-2 rounded-md ${isCompleted ? 'bg-accent/20' : 'bg-white/5'} transition-colors duration-base`}>
            {getCategoryIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-text-primary">{habit.name}</h3>
            <p className="text-sm text-text-secondary flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-white/20"></span>
              {getFrequencyText()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {habit.streak > 0 && (
            <div className={`flex items-center space-x-1 ${isCompleted ? 'text-accent' : 'text-accent/80'} text-sm font-medium px-2 py-1 rounded-md bg-accent/10 animate-pulse-gentle`}>
              <span>🔥</span>
              <span>{habit.streak}</span>
            </div>
          )}
          
          <button
            onClick={() => onToggle?.(habit.habitId)}
            aria-label={habit.isActive ? "Deactivate habit" : "Activate habit"}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-base 
                      hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg focus:ring-accent/50 ${
              habit.isActive 
                ? 'border-accent bg-accent shadow-sm' 
                : 'border-white/30 bg-transparent hover:border-white/50'
            }`}
          >
            {habit.isActive && (
              <span className="text-white text-xs">✓</span>
            )}
          </button>
        </div>
      </div>
      
      <p className="text-text-secondary text-sm mb-5 line-clamp-2">{habit.description}</p>
      
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="text-xs text-text-secondary">
          {habit.lastCompleted ? (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent/60"></span>
              Last: {format(new Date(habit.lastCompleted), 'MMM d, HH:mm')}
            </span>
          ) : (
            <span className="text-text-tertiary">Not completed yet</span>
          )}
        </div>
        
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(habit.habitId)}
              aria-label="Edit habit"
              className="icon-button text-xs text-text-secondary hover:text-text-primary"
            >
              <span className="flex items-center gap-1">
                <span>✏️</span>
                <span>Edit</span>
              </span>
            </button>
          )}
          {onComplete && !isCompleted && (
            <button
              onClick={() => onComplete(habit.habitId)}
              aria-label="Complete habit"
              className="btn-accent text-xs px-3 py-1 flex items-center gap-1"
            >
              <span>✓</span>
              <span>Complete</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-base"></div>
    </div>
  );
}
