export interface User {
  userId: string;
  farcasterId?: string;
  preferences: {
    allowNotifications: boolean;
    quietHours: {
      start: string;
      end: string;
    };
    reminderStyle: 'gentle' | 'persistent' | 'minimal';
  };
  createdAt: Date;
}

export interface Habit {
  habitId: string;
  userId: string;
  name: string;
  description: string;
  frequency: {
    type: 'daily' | 'hourly' | 'custom';
    interval: number; // minutes for hourly, days for daily
    times?: string[]; // specific times for daily habits
  };
  reminderSettings: {
    enabled: boolean;
    smart: boolean; // use contextual awareness
    snoozeMinutes: number;
  };
  isActive: boolean;
  category: 'hydration' | 'break' | 'exercise' | 'mindfulness' | 'custom';
  streak: number;
  lastCompleted?: Date;
  createdAt: Date;
}

export interface ReminderLog {
  logId: string;
  habitId: string;
  triggeredAt: Date;
  respondedAt?: Date;
  status: 'pending' | 'completed' | 'snoozed' | 'dismissed';
  contextData?: {
    userActive: boolean;
    lastActivity: Date;
  };
}

export type HabitPreset = {
  id: string;
  name: string;
  description: string;
  category: Habit['category'];
  defaultFrequency: Habit['frequency'];
  icon: string;
  color: string;
};
