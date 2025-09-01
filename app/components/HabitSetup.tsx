'use client';

import { useState } from 'react';
import { HabitPreset, User } from '../types';
import { HABIT_PRESETS, createHabitFromPreset } from '../lib/habits';
import { LocalStorage } from '../lib/storage';
import HabitPresetCard from './HabitPresetCard';
import PrimaryButton from './PrimaryButton';
import Input from './Input';

interface HabitSetupProps {
  user: User;
  onComplete: () => void;
  onBack: () => void;
}

export default function HabitSetup({ user, onComplete, onBack }: HabitSetupProps) {
  const [selectedPreset, setSelectedPreset] = useState<HabitPreset | null>(null);
  const [customName, setCustomName] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateHabit = async () => {
    if (!selectedPreset) return;

    setLoading(true);

    try {
      let habitData = createHabitFromPreset(selectedPreset, user.userId);

      // If custom preset, use custom name and description
      if (selectedPreset.id === 'custom') {
        habitData = {
          ...habitData,
          name: customName,
          description: customDescription,
          category: 'custom',
        };
      }

      const habit = {
        ...habitData,
        habitId: `habit-${Date.now()}`,
      };

      LocalStorage.addHabit(habit);
      onComplete();
    } catch (error) {
      console.error('Failed to create habit:', error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    if (!selectedPreset) return false;
    if (selectedPreset.id === 'custom') {
      return customName.trim() && customDescription.trim();
    }
    return true;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="display-text mb-2">Choose a Habit</h2>
        <p className="text-text-secondary">
          Select a preset or create your own custom habit
        </p>
      </div>

      <div className="space-y-4">
        {HABIT_PRESETS.map(preset => (
          <HabitPresetCard
            key={preset.id}
            preset={preset}
            onSelect={setSelectedPreset}
          />
        ))}

        {/* Custom Habit Option */}
        <button
          onClick={() => setSelectedPreset({
            id: 'custom',
            name: 'Custom Habit',
            description: 'Create your own habit',
            category: 'custom',
            defaultFrequency: {
              type: 'daily',
              interval: 1,
              times: ['09:00'],
            },
            icon: '⭐',
            color: 'hsl(280, 60%, 60%)',
          })}
          className="card text-left w-full hover:border-accent/50 transition-colors duration-base group"
        >
          <div className="flex items-start space-x-4">
            <div className="text-3xl group-hover:scale-110 transition-transform duration-base">
              ⭐
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-1">Custom Habit</h3>
              <p className="text-sm text-text-secondary">Create your own personalized habit</p>
            </div>
          </div>
        </button>
      </div>

      {selectedPreset?.id === 'custom' && (
        <div className="card space-y-4">
          <Input
            label="Habit Name"
            placeholder="e.g., Read for 15 minutes"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />
          <Input
            label="Description"
            placeholder="e.g., Daily reading to expand knowledge"
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
          />
        </div>
      )}

      {selectedPreset && (
        <div className="card bg-accent/10 border-accent/30">
          <h3 className="font-semibold text-accent mb-2">Selected: {selectedPreset.name}</h3>
          <p className="text-sm text-text-secondary">
            {selectedPreset.id === 'custom' ? customDescription : selectedPreset.description}
          </p>
        </div>
      )}

      <div className="flex space-x-3">
        <PrimaryButton
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </PrimaryButton>
        <PrimaryButton
          onClick={handleCreateHabit}
          disabled={!isFormValid()}
          loading={loading}
          className="flex-1"
        >
          Create Habit
        </PrimaryButton>
      </div>
    </div>
  );
}
