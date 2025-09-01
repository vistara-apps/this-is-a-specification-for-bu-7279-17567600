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

type FilterType = 'all' | 'active' | 'completed';
type SortType = 'name' | 'streak' | 'lastCompleted';

export default function Dashboard({ user, onCreateHabit }: DashboardProps) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('lastCompleted');
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter habits based on current filter and search query
  const filteredHabits = habits.filter(habit => {
    // Apply search filter
    if (searchQuery && !habit.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !habit.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply status filter
    if (filter === 'active' && !habit.isActive) return false;
    if (filter === 'completed' && !completedToday.find(h => h.habitId === habit.habitId)) return false;
    
    return true;
  });

  // Sort habits based on current sort option
  const sortedHabits = [...filteredHabits].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'streak') {
      return b.streak - a.streak;
    }
    // Default: sort by lastCompleted (most recent first)
    if (!a.lastCompleted) return 1;
    if (!b.lastCompleted) return -1;
    return new Date(b.lastCompleted).getTime() - new Date(a.lastCompleted).getTime();
  });

  // Calculate streak stats
  const totalStreakDays = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const longestStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0;

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="card text-center bg-surface-light hover:bg-surface transition-colors duration-base">
          <div className="text-2xl font-bold text-accent">{activeHabits.length}</div>
          <div className="text-sm text-text-secondary">Active Habits</div>
        </div>
        <div className="card text-center bg-surface-light hover:bg-surface transition-colors duration-base">
          <div className="text-2xl font-bold text-accent">{completedToday.length}</div>
          <div className="text-sm text-text-secondary">Completed Today</div>
        </div>
        <div className="card text-center bg-surface-light hover:bg-surface transition-colors duration-base">
          <div className="text-2xl font-bold text-accent">{totalStreakDays}</div>
          <div className="text-sm text-text-secondary">Total Streak Days</div>
        </div>
        <div className="card text-center bg-surface-light hover:bg-surface transition-colors duration-base">
          <div className="text-2xl font-bold text-accent">{longestStreak}</div>
          <div className="text-sm text-text-secondary">Longest Streak</div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="heading-text">Your Habits</h2>
          <PrimaryButton
            variant="accent"
            onClick={onCreateHabit}
            className="text-sm"
            leftIcon={<span>+</span>}
          >
            Add Habit
          </PrimaryButton>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search habits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
              🔍
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-2 rounded-md text-sm transition-colors duration-base ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface hover:bg-surface-light text-text-secondary'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-2 rounded-md text-sm transition-colors duration-base ${
                filter === 'active' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface hover:bg-surface-light text-text-secondary'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-2 rounded-md text-sm transition-colors duration-base ${
                filter === 'completed' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface hover:bg-surface-light text-text-secondary'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Sort dropdown */}
        <div className="flex justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="bg-surface border border-white/20 rounded-md px-3 py-2 text-sm text-text-primary"
          >
            <option value="lastCompleted">Sort by: Recent</option>
            <option value="name">Sort by: Name</option>
            <option value="streak">Sort by: Streak</option>
          </select>
        </div>
      </div>

      {/* Habits List */}
      <div className="space-y-4">
        {habits.length === 0 ? (
          <div className="card text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4 animate-bounce-gentle">🌱</div>
            <h3 className="heading-text mb-2">No habits yet</h3>
            <p className="text-text-secondary mb-6">
              Start building better habits today!
            </p>
            <PrimaryButton 
              onClick={onCreateHabit}
              variant="accent"
              size="lg"
            >
              Create Your First Habit
            </PrimaryButton>
          </div>
        ) : sortedHabits.length === 0 ? (
          <div className="card text-center py-8 animate-fade-in">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="subheading-text mb-2">No matching habits</h3>
            <p className="text-text-secondary mb-4">
              Try adjusting your search or filters
            </p>
            <PrimaryButton 
              onClick={() => {
                setSearchQuery('');
                setFilter('all');
              }}
              variant="secondary"
            >
              Clear Filters
            </PrimaryButton>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedHabits.map(habit => (
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
