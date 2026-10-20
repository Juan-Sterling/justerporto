import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Radio, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * SideProfileNavbar
 * Header taktis untuk halaman /sideprofile
 * Dilengkapi tombol sticky [← Back to Portfolio], status telemetry HUD, dan switcher tema (Toxic Lab / Sterile Lab).
 */
export default function SideProfileNavbar({ onBack, isExiting = false, isReady = true }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{
        y: isExiting ? -30 : (isReady ? 0 : -30),
        opacity: isExiting ? 0 : (isReady ? 1 : 0),
      }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#f0fdf4]/90 dark:bg-[#090d0b]/90 border-b border-[#10b981]/30 dark:border-[#00f59b]/30 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Sticky Back to Portfolio Button */}
        <button
          onClick={onBack}
          type="button"
          aria-label="Back to Portfolio"
          className="group relative inline-flex items-center gap-2.5 px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 rounded-sm overflow-hidden bg-[#10b981]/15 hover:bg-[#10b981]/25 dark:bg-[#00f59b]/10 dark:hover:bg-[#00f59b]/20 text-[#064e3b] dark:text-[#00f59b] border border-[#10b981]/40 hover:border-[#059669] dark:border-[#00f59b]/40 dark:hover:border-[#00f59b] shadow-[0_2px_10px_rgba(16,185,129,0.15)] dark:shadow-[0_0_15px_rgba(0,245,155,0.15)] hover:shadow-[0_4px_15px_rgba(16,185,129,0.25)] dark:hover:shadow-[0_0_25px_rgba(0,245,155,0.35)] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
          {/* Subtle tactical corner indicator */}
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#10b981] dark:bg-[#00f59b] opacity-80" />
        </button>

        {/* Center: Tactical Telemetry Info (Hidden on very small screens) */}
        <div className="hidden md:flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#10b981]/15 dark:bg-[#10b981]/10 rounded border border-[#10b981]/30 dark:border-[#00f59b]/20">
            <Radio className="w-3.5 h-3.5 text-[#059669] dark:text-[#00f59b] animate-pulse" />
            <span className="text-[#065f46] dark:text-[#00f59b] font-semibold tracking-wider">
              SIDE PROFILE HUD
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#065f46] dark:text-[#6ee7b7]">
            <span>FUEL</span>
            <div className="w-16 h-2 bg-[#d1fae5] dark:bg-[#16221c] rounded-full overflow-hidden border border-[#10b981]/40 dark:border-[#00f59b]/30">
              <div className="w-full h-full bg-[#10b981] dark:bg-[#00f59b] animate-pulse shadow-[0_0_8px_#00f59b]" />
            </div>
            <span className="text-[10px] font-bold">100%</span>
          </div>
        </div>

        {/* Right: Lab Mode Switcher (Toxic Lab ⇄ Sterile Lab) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            type="button"
            title={`Switch to ${isDark ? 'Sterile Lab (Light)' : 'Toxic Lab (Dark)'}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#10b981]/40 dark:border-[#00f59b]/30 bg-[#10b981]/15 hover:bg-[#10b981]/25 dark:bg-[#10b981]/10 dark:hover:bg-[#00f59b]/20 text-[#064e3b] dark:text-[#00f59b] text-xs font-mono font-bold transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#00f59b]" />
                <span className="hidden sm:inline">Sterile Lab (Light)</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#064e3b]" />
                <span className="hidden sm:inline">Toxic Lab (Dark)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
