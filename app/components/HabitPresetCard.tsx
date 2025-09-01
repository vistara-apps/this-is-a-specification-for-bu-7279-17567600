'use client';

import { HabitPreset } from '../types';

interface HabitPresetCardProps {
  preset: HabitPreset;
  onSelect: (preset: HabitPreset) => void;
}

export default function HabitPresetCard({ preset, onSelect }: HabitPresetCardProps) {
  const getFrequencyText = () => {
    if (preset.defaultFrequency.type === 'hourly') {
      return `Every ${preset.defaultFrequency.interval} minutes`;
    }
    if (preset.defaultFrequency.type === 'daily') {
      if (preset.defaultFrequency.times) {
        return `Daily at ${preset.defaultFrequency.times.join(', ')}`;
      }
      return 'Daily';
    }
    return 'Custom schedule';
  };

  return (
    <button
      onClick={() => onSelect(preset)}
      className="card text-left w-full hover:border-accent/50 transition-colors duration-base group"
    >
      <div className="flex items-start space-x-4">
        <div className="text-3xl group-hover:scale-110 transition-transform duration-base">
          {preset.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-text-primary mb-1">{preset.name}</h3>
          <p className="text-sm text-text-secondary mb-2">{preset.description}</p>
          <p className="text-xs text-accent">{getFrequencyText()}</p>
        </div>
      </div>
    </button>
  );
}
