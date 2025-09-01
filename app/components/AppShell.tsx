'use client';

import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export default function AppShell({ 
  children, 
  title = 'HabitFlow',
  showBack = false,
  onBack 
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="app-container">
        <header className="flex items-center justify-between py-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            {showBack && (
              <button
                onClick={onBack}
                className="p-2 -ml-2 text-text-secondary hover:text-text-primary transition-colors duration-base"
              >
                ←
              </button>
            )}
            <h1 className="heading-text">{title}</h1>
          </div>
          <div className="text-2xl">🌱</div>
        </header>
        
        <main className="py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
