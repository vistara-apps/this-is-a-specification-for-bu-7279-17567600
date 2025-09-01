'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';
import { base } from 'wagmi/chains';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { ToastContainer, useToast } from './components/Toast';

// Create a context for the toast functionality
type ToastContextType = ReturnType<typeof useToast> | null;
const ToastContext = createContext<ToastContextType>(null);

// Custom hook to use the toast context
export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}

// Toast provider component
function ToastProvider({ children }: { children: ReactNode }) {
  const toast = useToast();
  
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </ToastContext.Provider>
  );
}

// Theme context for light/dark mode
type ThemeType = 'dark' | 'light';
type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function ThemeProvider({ children }: { children: ReactNode }) {
  // Default to dark theme
  const [theme, setTheme] = useState<ThemeType>('dark');
  
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Main providers component
export function Providers(props: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: 'dark',
          theme: 'habitflow',
          name: 'HabitFlow',
          logo: '/logo.png',
        },
      }}
    >
      <ThemeProvider>
        <ToastProvider>
          {props.children}
        </ToastProvider>
      </ThemeProvider>
    </MiniKitProvider>
  );
}
