'use client';

import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightContent?: ReactNode;
}

export default function AppShell({ 
  children, 
  title = 'HabitFlow',
  showBack = false,
  onBack,
  rightContent
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <div className="app-container flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-bg/95 backdrop-blur-sm flex items-center justify-between py-4 border-b border-white/10 px-4 sm:px-0">
          <div className="flex items-center space-x-3">
            {showBack && (
              <button
                onClick={onBack}
                aria-label="Go back"
                className="p-2 -ml-2 text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-full transition-all duration-base focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
            )}
            <h1 className="heading-text flex items-center">
              <span className="text-2xl mr-2">🌱</span>
              {title}
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {rightContent}
          </div>
        </header>
        
        <main className="py-6 px-4 sm:px-0 flex-1">
          {children}
        </main>
        
        <footer className="py-4 border-t border-white/10 text-center text-sm text-text-secondary">
          <div className="flex items-center justify-center space-x-1">
            <span>Built with</span>
            <span className="text-accent">♥</span>
            <span>for better habits</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
