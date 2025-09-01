'use client';

import { useState, useEffect } from 'react';
import { Habit, User } from '../types';
import { LocalStorage } from '../lib/storage';
import HabitCard from './HabitCard';
import PrimaryButton from './PrimaryButton';

interface DashboardProps {
  user: User;
  onCreateHabit: () => void;
}

export default function Dashboard({ user, onCreateHabit }: DashboardProps) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHabits = () => {
      const userHabits = LocalStorage.getHabits(user.userId);
      setHabits(userHabits);
      setLoading(false);
    };

    loadHabits();
  }, [user.userId]);

  const handleCompleteHabit = (habitId: string) => {
    const habit = habits.find(h => h.habitId === habitId);
    if (!habit) return;

    const now = new Date();
    const updatedHabit = {
      ...habit,
      lastCompleted: now,
      streak: habit.streak + 1,
    };

    LocalStorage.updateHabit(habitId, updatedHabit);
    setHabits(prev => prev.map(h => h.habitId === habitId ? updatedHabit : h));

    // Add to reminder log
    LocalStorage.addReminderLog({
      logId: `${habitId}-${Date.now()}`,
      habitId,
      triggeredAt: now,
      respondedAt: now,
      status: 'completed',
    });
  };

  const handleToggleHabit = (habitId: string) => {
    const habit = habits.find(h => h.habitId === habitId);
    if (!habit) return;

    const updatedHabit = {
      ...habit,
      isActive: !habit.isActive,
    };

    LocalStorage.updateHabit(habitId, updatedHabit);
    setHabits(prev => prev.map(h => h.habitId === habitId ? updatedHabit : h));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activeHabits = habits.filter(h => h.isActive);
  const completedToday = habits.filter(h => {
    if (!h.lastCompleted) return false;
    const today = new Date();
    const completed = new Date(h.lastCompleted);
    return completed.toDateString() === today.toDateString();
  });

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-accent">{activeHabits.length}</div>
          <div className="text-sm text-text-secondary">Active Habits</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-accent">{completedToday.length}</div>
          <div className="text-sm text-text-secondary">Completed Today</div>
        </div>
      </div>

      {/* Habits List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="heading-text">Your Habits</h2>
          <PrimaryButton
            variant="outline"
            onClick={onCreateHabit}
            className="text-sm"
          >
            + Add Habit
          </PrimaryButton>
        </div>

        {habits.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="heading-text mb-2">No habits yet</h3>
            <p className="text-text-secondary mb-6">
              Start building better habits today!
            </p>
            <PrimaryButton onClick={onCreateHabit}>
              Create Your First Habit
            </PrimaryButton>
          </div>
        ) : (
          <div className="space-y-4">
            {habits.map(habit => (
              <HabitCard
                key={habit.habitId}
                habit={habit}
                variant={completedToday.find(h => h.habitId === habit.habitId) ? 'completed' : 'active'}
                onComplete={handleCompleteHabit}
                onToggle={handleToggleHabit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
