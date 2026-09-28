import React, { createContext, useContext, useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

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

  const applyThemeWithTransition = (nextTheme, e, manual = true) => {
    // View Transitions API with circular ripple expanding from the button (pure GPU compositor)
    const isAppearanceTransition =
      typeof document !== 'undefined' &&
      document.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAppearanceTransition) {
      executeThemeChange(nextTheme, manual);
      return;
    }

    const x = e?.clientX ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    const y = e?.clientY ?? (typeof window !== 'undefined' ? 40 : 0);
    const endRadius = Math.hypot(
      Math.max(x, typeof window !== 'undefined' ? window.innerWidth - x : 1000),
      Math.max(y, typeof window !== 'undefined' ? window.innerHeight - y : 1000)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        executeThemeChange(nextTheme, manual);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 320,
          easing: 'ease-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  const toggleTheme = (e) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    applyThemeWithTransition(nextTheme, e, true);
  };

  const resetToSystem = (e) => {
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const sysTheme = systemPrefersDark ? 'dark' : systemPrefersLight ? 'light' : 'dark';
    applyThemeWithTransition(sysTheme, e, false);
  };

  const setThemeExplicit = (mode, e) => {
    if (mode === 'system') {
      resetToSystem(e);
      return;
    }
    if (mode === theme) return;
    applyThemeWithTransition(mode, e, true);
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
