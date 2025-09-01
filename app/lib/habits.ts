import { Habit, HabitPreset } from '../types';

export const HABIT_PRESETS: HabitPreset[] = [
  {
    id: 'hydration',
    name: 'Stay Hydrated',
    description: 'Drink water regularly throughout the day',
    category: 'hydration',
    defaultFrequency: {
      type: 'hourly',
      interval: 60, // every hour
    },
    icon: '💧',
    color: 'hsl(210, 80%, 50%)',
  },
  {
    id: 'work-break',
    name: 'Take Breaks',
    description: 'Regular breaks to rest your eyes and stretch',
    category: 'break',
    defaultFrequency: {
      type: 'hourly',
      interval: 30, // every 30 minutes
    },
    icon: '🧘',
    color: 'hsl(120, 60%, 50%)',
  },
  {
    id: 'exercise',
    name: 'Daily Exercise',
    description: 'Move your body every day',
    category: 'exercise',
    defaultFrequency: {
      type: 'daily',
      interval: 1,
      times: ['09:00'],
    },
    icon: '🏃',
    color: 'hsl(30, 80%, 55%)',
  },
  {
    id: 'mindfulness',
    name: 'Mindful Moment',
    description: 'Take a moment to breathe and center yourself',
    category: 'mindfulness',
    defaultFrequency: {
      type: 'daily',
      interval: 1,
      times: ['12:00', '18:00'],
    },
    icon: '🌸',
    color: 'hsl(280, 60%, 60%)',
  },
];

export function createHabitFromPreset(preset: HabitPreset, userId: string): Omit<Habit, 'habitId'> {
  return {
    userId,
    name: preset.name,
    description: preset.description,
    frequency: preset.defaultFrequency,
    reminderSettings: {
      enabled: true,
      smart: true,
      snoozeMinutes: 15,
    },
    isActive: true,
    category: preset.category,
    streak: 0,
    createdAt: new Date(),
  };
}

export function calculateNextReminder(habit: Habit): Date {
  const now = new Date();
  
  if (habit.frequency.type === 'hourly') {
    return new Date(now.getTime() + habit.frequency.interval * 60 * 1000);
  }
  
  if (habit.frequency.type === 'daily' && habit.frequency.times) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Find next time today or tomorrow
    for (const time of habit.frequency.times) {
      const [hours, minutes] = time.split(':').map(Number);
      const reminderTime = new Date(today);
      reminderTime.setHours(hours, minutes, 0, 0);
      
      if (reminderTime > now) {
        return reminderTime;
      }
    }
    
    // If no time today, use first time tomorrow
    const [hours, minutes] = habit.frequency.times[0].split(':').map(Number);
    tomorrow.setHours(hours, minutes, 0, 0);
    return tomorrow;
  }
  
  // Default to 1 hour from now
  return new Date(now.getTime() + 60 * 60 * 1000);
}

export function isInQuietHours(quietHours: { start: string; end: string }): boolean {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const [startHour, startMin] = quietHours.start.split(':').map(Number);
  const [endHour, endMin] = quietHours.end.split(':').map(Number);
  
  const startTime = startHour * 60 + startMin;
  const endTime = endHour * 60 + endMin;
  
  if (startTime <= endTime) {
    return currentTime >= startTime && currentTime <= endTime;
  } else {
    // Overnight quiet hours
    return currentTime >= startTime || currentTime <= endTime;
  }
}
