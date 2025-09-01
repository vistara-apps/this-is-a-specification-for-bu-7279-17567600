'use client';

import { useState } from 'react';
import { User } from '../types';
import { LocalStorage } from '../lib/storage';
import PrimaryButton from './PrimaryButton';
import Checkbox from './Checkbox';

interface OnboardingProps {
  onComplete: (user: User) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [allowNotifications, setAllowNotifications] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);

    try {
      // Simulate user ID generation (in real app, this would come from authentication)
      const userId = `user-${Date.now()}`;
      
      const user: User = {
        userId,
        preferences: {
          allowNotifications,
          quietHours: {
            start: '22:00',
            end: '08:00',
          },
          reminderStyle: 'gentle',
        },
        createdAt: new Date(),
      };

      LocalStorage.setUser(user);
      onComplete(user);
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="text-8xl animate-pulse-gentle">🌱</div>
        <h1 className="display-text">Welcome to HabitFlow</h1>
        <p className="text-text-secondary text-lg">
          Intelligent reminders for your best habits
        </p>
      </div>

      <div className="card text-left space-y-6">
        <h2 className="heading-text">Let's get started</h2>
        
        <div className="space-y-4">
          <Checkbox
            checked={allowNotifications}
            onChange={(e) => setAllowNotifications(e.target.checked)}
            label="Enable smart notifications for habit reminders"
          />
          
          <div className="text-sm text-text-secondary space-y-2">
            <p>• Get timely reminders based on your activity</p>
            <p>• Respect your quiet hours (10 PM - 8 AM by default)</p>
            <p>• Gentle nudges to build lasting habits</p>
          </div>
        </div>
      </div>

      <PrimaryButton
        onClick={handleComplete}
        loading={loading}
        className="w-full"
      >
        Set Up My First Habit
      </PrimaryButton>
    </div>
  );
}
