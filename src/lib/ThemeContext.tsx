"use client";

import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with a safe default on first render (avoids SSR/no-op).
  const [theme, setTheme] = useState<Theme>('light');

  // On mount (before paint) try to pick up saved preference or OS preference.
  useLayoutEffect(() => {
    try {
      // Prefer explicit saved preference.
      const saved = typeof window !== 'undefined' ? localStorage.getItem('phishguard-theme') : null;
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
        document.documentElement.classList.toggle('dark', saved === 'dark');
        return;
      }

      // Fallback to prefers-color-scheme.
      if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    } catch (e) {
      // ignore and stick with default
    }
  }, []);

  // Persist changes and keep document class in sync.
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('phishguard-theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    } catch (e) {
      // ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
