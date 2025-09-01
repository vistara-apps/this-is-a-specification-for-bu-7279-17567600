'use client';

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  usePrimaryButton,
  useNotification,
} from '@coinbase/onchainkit/minikit';
import { useEffect, useState } from 'react';
import { User } from './types';
import { LocalStorage } from './lib/storage';
import AppShell from './components/AppShell';
import Onboarding from './components/Onboarding';
import HabitSetup from './components/HabitSetup';
import Dashboard from './components/Dashboard';

type AppState = 'loading' | 'onboarding' | 'setup' | 'dashboard';

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [appState, setAppState] = useState<AppState>('loading');
  const [user, setUser] = useState<User | null>(null);
  const [frameAdded, setFrameAdded] = useState(false);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const sendNotification = useNotification();

  // Set up primary button based on app state
  usePrimaryButton(
    appState === 'onboarding' 
      ? { text: 'Get Started' }
      : appState === 'setup'
      ? { text: 'Create Habit' }
      : { text: 'Add Habit' },
    () => {
      if (appState === 'onboarding') {
        // This will be handled by the onboarding component
      } else if (appState === 'setup') {
        // This will be handled by the setup component
      } else if (appState === 'dashboard') {
        setAppState('setup');
      }
    }
  );

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  useEffect(() => {
    // Check if user exists and determine initial state
    const checkUserState = () => {
      // Try to get user from localStorage
      const savedUsers = Object.keys(localStorage || {})
        .filter(key => key.startsWith('user:'))
        .map(key => {
          try {
            return JSON.parse(localStorage.getItem(key) || '');
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      if (savedUsers.length > 0) {
        const currentUser = savedUsers[0] as User;
        setUser(currentUser);
        
        // Check if user has habits
        const habits = LocalStorage.getHabits(currentUser.userId);
        if (habits.length > 0) {
          setAppState('dashboard');
        } else {
          setAppState('setup');
        }
      } else {
        setAppState('onboarding');
      }
    };

    if (typeof window !== 'undefined') {
      checkUserState();
    }
  }, []);

  const handleOnboardingComplete = (newUser: User) => {
    setUser(newUser);
    setAppState('setup');
  };

  const handleHabitSetupComplete = () => {
    setAppState('dashboard');
  };

  const handleAddFrame = async () => {
    try {
      const result = await addFrame();
      if (result) {
        setFrameAdded(true);
        
        // Send a welcome notification
        setTimeout(async () => {
          try {
            await sendNotification({
              title: 'Welcome to HabitFlow! 🌱',
              body: 'Your habits are now ready to help you grow!'
            });
          } catch (error) {
            console.error('Failed to send notification:', error);
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to add frame:', error);
    }
  };

  const getTitle = () => {
    switch (appState) {
      case 'onboarding': return 'Welcome';
      case 'setup': return 'New Habit';
      case 'dashboard': return 'HabitFlow';
      default: return 'HabitFlow';
    }
  };

  const renderSaveFrameButton = () => {
    if (context && !context.client.added && !frameAdded) {
      return (
        <button
          onClick={handleAddFrame}
          className="text-accent hover:text-accent/80 transition-colors duration-base text-sm font-medium"
        >
          + Save App
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm text-accent animate-fade-in">
          <span>✓</span>
          <span>Saved</span>
        </div>
      );
    }

    return null;
  };

  if (appState === 'loading') {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell 
      title={getTitle()} 
      showBack={appState === 'setup'} 
      onBack={() => setAppState('dashboard')}
      rightContent={renderSaveFrameButton()}
    >
      {appState === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      
      {appState === 'setup' && user && (
        <HabitSetup
          user={user}
          onComplete={handleHabitSetupComplete}
          onBack={() => setAppState('dashboard')}
        />
      )}
      
      {appState === 'dashboard' && user && (
        <Dashboard
          user={user}
          onCreateHabit={() => setAppState('setup')}
        />
      )}
    </AppShell>
  );
}
