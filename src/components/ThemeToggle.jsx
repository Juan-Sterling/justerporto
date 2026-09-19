import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ variant = 'icon', className = '' }) {
  const { theme, isDark, toggleTheme, resetToSystem, setThemeExplicit, isSystem } = useTheme();

  if (variant === 'drawer') {
    return (
      <div className={`p-3 rounded-md bg-[#F4F4F5] dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] space-y-2.5 ${className}`}>
        <div className="flex items-center justify-between text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
          <span>// appearance mode</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] text-[#E11D2E] font-medium">
            {isSystem ? 'auto (device)' : theme}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-white/70 dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A]">
          <button
            type="button"
            onClick={resetToSystem}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-all cursor-pointer ${
              isSystem
                ? 'bg-[#E11D2E] text-white shadow-xs font-semibold'
                : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#141414]'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Auto</span>
          </button>

          <button
            type="button"
            onClick={() => setThemeExplicit('dark')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-all cursor-pointer ${
              !isSystem && isDark
                ? 'bg-[#E11D2E] text-white shadow-xs font-semibold'
                : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#141414]'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dark</span>
          </button>

          <button
            type="button"
            onClick={() => setThemeExplicit('light')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-all cursor-pointer ${
              !isSystem && !isDark
                ? 'bg-[#E11D2E] text-white shadow-xs font-semibold'
                : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#141414]'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Light</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 rounded-md border border-[#E4E4E7] dark:border-[#2A2A2A] bg-[#FFFFFF] dark:bg-[#141414] text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:border-[#E11D2E]/60 dark:hover:border-[#E11D2E]/60 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E11D2E] group/theme ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isSystem ? `Auto (Device: ${isDark ? 'Dark' : 'Light'}) - Click to toggle manual` : isDark ? "Dark Mode - Click to switch" : "Light Mode - Click to switch"}
    >
      <div className="relative w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 group-hover/theme:rotate-90 group-hover/theme:scale-110 transition-transform duration-300" />
        ) : (
          <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-indigo-600 group-hover/theme:-rotate-45 group-hover/theme:scale-110 transition-transform duration-300" />
        )}
      </div>
      {isSystem && (
        <span 
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E11D2E] ring-2 ring-white dark:ring-[#141414]" 
          title="Following system theme" 
        />
      )}
    </button>
  );
}
