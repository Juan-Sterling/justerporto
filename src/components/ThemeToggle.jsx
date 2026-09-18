import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ variant = 'icon', className = '' }) {
  const { theme, isDark, toggleTheme, resetToSystem, isSystem } = useTheme();

  if (variant === 'drawer') {
    return (
      <div className={`p-3 rounded-md bg-[#F4F4F5] dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] space-y-2 ${className}`}>
        <div className="flex items-center justify-between text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
          <span>// appearance mode</span>
          {isSystem && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E4E4E7] dark:bg-[#090909] text-[#E11D2E]">
              auto (device)
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-white dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] text-xs font-medium text-[#09090B] dark:text-white hover:border-[#E11D2E] transition-all cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Switch to Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span>Switch to Dark</span>
              </>
            )}
          </button>
          {!isSystem && (
            <button
              type="button"
              onClick={resetToSystem}
              title="Reset to device system setting"
              className="p-2 rounded-md bg-white dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] text-[#71717A] hover:text-[#09090B] dark:hover:text-white hover:border-[#E11D2E] text-xs transition-all cursor-pointer"
              aria-label="Follow device theme"
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
          )}
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
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="relative w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 group-hover/theme:rotate-90 group-hover/theme:scale-110 transition-transform duration-300" />
        ) : (
          <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-indigo-600 group-hover/theme:-rotate-45 group-hover/theme:scale-110 transition-transform duration-300" />
        )}
      </div>
    </button>
  );
}
