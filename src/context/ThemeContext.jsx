import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
      return 'dark';
    }
    return 'dark';
  });

  const [isSystem, setIsSystem] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('theme');
    }
    return true;
  });

  const [bgTheme, setBgThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bg_theme') || 'matrix';
    }
    return 'matrix';
  });

  const setBgTheme = (newBgTheme) => {
    setBgThemeState(newBgTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bg_theme', newBgTheme);
    }
  };

  // Apply theme class to documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  // Listen to system preference changes if user hasn't explicitly set a preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemChange);
      return () => mediaQuery.removeListener(handleSystemChange);
    }
  }, []);

  const executeThemeChange = (nextTheme, manual = true) => {
    setTheme(nextTheme);
    if (manual) {
      setIsSystem(false);
      localStorage.setItem('theme', nextTheme);
    } else {
      setIsSystem(true);
      localStorage.removeItem('theme');
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    executeThemeChange(nextTheme, true);
  };

  const resetToSystem = () => {
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const sysTheme = systemPrefersDark ? 'dark' : systemPrefersLight ? 'light' : 'dark';
    executeThemeChange(sysTheme, false);
  };

  const setThemeExplicit = (mode) => {
    if (mode === 'system') {
      resetToSystem();
      return;
    }
    if (mode === theme) return;
    executeThemeChange(mode, true);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        resetToSystem,
        setThemeExplicit,
        isSystem,
        bgTheme,
        setBgTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
