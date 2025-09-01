import { User, Habit, ReminderLog } from '../types';

// Simple localStorage wrapper for demo purposes
// In production, this would connect to a proper database

export class LocalStorage {
  private static getItem<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  private static setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle storage quota exceeded
    }
  }

  static getUser(userId: string): User | null {
    return this.getItem<User>(`user:${userId}`);
  }

  static setUser(user: User): void {
    this.setItem(`user:${user.userId}`, user);
  }

  static getHabits(userId: string): Habit[] {
    return this.getItem<Habit[]>(`habits:${userId}`) || [];
  }

  static setHabits(userId: string, habits: Habit[]): void {
    this.setItem(`habits:${userId}`, habits);
  }

  static addHabit(habit: Habit): void {
    const habits = this.getHabits(habit.userId);
    habits.push(habit);
    this.setHabits(habit.userId, habits);
  }

  static updateHabit(habitId: string, updates: Partial<Habit>): void {
    const userId = updates.userId || '';
    const habits = this.getHabits(userId);
    const index = habits.findIndex(h => h.habitId === habitId);
    
    if (index !== -1) {
      habits[index] = { ...habits[index], ...updates };
      this.setHabits(userId, habits);
    }
  }

  static removeHabit(userId: string, habitId: string): void {
    const habits = this.getHabits(userId);
    const filtered = habits.filter(h => h.habitId !== habitId);
    this.setHabits(userId, filtered);
  }

  static addReminderLog(log: ReminderLog): void {
    const logs = this.getItem<ReminderLog[]>('reminderLogs') || [];
    logs.push(log);
    this.setItem('reminderLogs', logs);
  }

  static getReminderLogs(habitId: string): ReminderLog[] {
    const logs = this.getItem<ReminderLog[]>('reminderLogs') || [];
    return logs.filter(log => log.habitId === habitId);
  }
}
