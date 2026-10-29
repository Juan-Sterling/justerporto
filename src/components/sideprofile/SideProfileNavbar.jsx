import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * SideProfileNavbar
 * Floating pill navbar for /sideprofile, matching the aesthetics of the main portfolio navbar.
 * 
 * Features:
 * - Floating rounded pill bar with backdrop blur and responsive layout.
 * - Unified Toxin Screen toggle button seamlessly attached to the fuel gauge.
 * - Sterile Lab (Light) / Toxic Lab (Dark) theme switcher.
 * - 100% English, strictly zero '//' and zero emoticons.
 */
export default function SideProfileNavbar({
  onBack,
  isExiting = false,
  isReady = true,
  fuel = 100,
  isToxinActive = false,
  onToggleToxin,
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{
        y: isExiting ? -40 : (isReady ? 0 : -40),
        opacity: isExiting ? 0 : (isReady ? 1 : 0),
      }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none transition-all duration-300"
    >
      {/* Floating Pill Container */}
      <div
        className={`pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300 flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 ${
          scrolled
            ? 'bg-[#dcefe3]/90 dark:bg-[#0c120e]/85 backdrop-blur-2xl backdrop-saturate-200 border border-[#059669]/40 dark:border-[#00f59b]/30 shadow-[0_12px_36px_rgba(5,150,105,0.22)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(0,245,155,0.15)]'
            : 'bg-[#dcefe3]/80 dark:bg-[#0c120e]/70 backdrop-blur-xl backdrop-saturate-180 border border-[#059669]/30 dark:border-[#00f59b]/20 shadow-[0_8px_24px_rgba(5,150,105,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
        } ${
          isToxinActive
            ? 'ring-2 ring-[#047857] dark:ring-[#00f59b] shadow-[0_0_30px_rgba(4,120,87,0.4)] dark:shadow-[0_0_30px_rgba(0,245,155,0.3)]'
            : ''
        }`}
      >
        {/* Left: Return to Portfolio Button (Pill shaped) */}
        <button
          onClick={onBack}
          type="button"
          aria-label="Back to Portfolio"
          className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 rounded-full bg-[#059669]/15 hover:bg-[#059669]/25 dark:bg-[#00f59b]/15 dark:hover:bg-[#00f59b]/25 text-[#064e3b] dark:text-[#00f59b] border border-[#059669]/40 hover:border-[#047857] dark:border-[#00f59b]/40 dark:hover:border-[#00f59b] shadow-xs hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="hidden sm:inline">Back to Portfolio</span>
          <span className="sm:hidden">Portfolio</span>
        </button>

        {/* Center: Attached Toxin Screen Action & Fuel Gauge Capsule */}
        <div className="flex items-center rounded-full p-0.5 bg-black/5 dark:bg-white/5 border border-[#059669]/30 dark:border-[#00f59b]/25 shadow-xs">
          {/* Toxin Screen Toggle Button with Dynamic Mobile Energy Fill */}
          <button
            type="button"
            onClick={onToggleToxin}
            disabled={!isToxinActive && fuel < 15}
            title={isToxinActive ? 'Vent Toxic Screen' : 'Deploy Toxic Screen'}
            className={`group relative overflow-hidden inline-flex items-center rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 ${
              fuel < 15 && !isToxinActive
                ? 'bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : isToxinActive
                ? 'bg-[#16221c] sm:bg-red-600 sm:hover:bg-red-700 text-white shadow-[0_0_12px_rgba(239,68,68,0.35)]'
                : 'bg-[#afd8bd] dark:bg-[#16221c] sm:bg-[#047857] sm:hover:bg-[#065f46] sm:dark:bg-[#00f59b] sm:dark:hover:bg-[#34d399] sm:text-white sm:dark:text-black shadow-[0_2px_10px_rgba(4,120,87,0.2)] dark:shadow-[0_0_15px_rgba(0,245,155,0.25)]'
            }`}
          >
            {/* Mobile Energy Fill Layer (Solid color matching previous fuel gauge, zero gradient) */}
            <div
              className={`sm:hidden absolute inset-y-0 left-0 transition-all duration-300 pointer-events-none ${
                isToxinActive
                  ? 'bg-red-600 shadow-[0_0_8px_#ef4444]'
                  : fuel < 15
                  ? 'bg-zinc-400 dark:bg-zinc-700'
                  : 'bg-[#00f59b] dark:bg-[#00f59b] shadow-[0_0_8px_#00f59b]'
              }`}
              style={{ width: `${fuel}%` }}
            />

            {/* Foreground Content */}
            <span
              className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 transition-colors duration-200 ${
                isToxinActive
                  ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                  : 'text-[#062013] dark:text-black sm:text-white sm:dark:text-black'
              }`}
            >
              <Zap className="w-3.5 h-3.5 transition-transform group-hover:scale-110 shrink-0" />
              <span className="hidden sm:inline">
                {isToxinActive ? 'VENT TOXIN' : 'TOXIN SCREEN'}
              </span>
              <span className="sm:hidden font-bold">
                {isToxinActive ? 'VENT' : 'TOXIN'}
              </span>
              <span className="sm:hidden text-[10px] font-mono font-bold tracking-normal ml-0.5 opacity-90">
                {Math.round(fuel)}%
              </span>
            </span>
          </button>

          {/* Desktop Attached Fuel Progress Gauge (Hidden on mobile for ultra-compact layout) */}
          <div className="hidden sm:flex items-center gap-2 text-[#064e3b] dark:text-[#6ee7b7] px-2.5 sm:px-3 py-1">
            <span className="font-bold text-[11px] hidden xs:inline">FUEL</span>
            <div className="w-12 sm:w-16 h-2 bg-[#afd8bd] dark:bg-[#16221c] rounded-full overflow-hidden border border-[#059669]/35 dark:border-[#00f59b]/30">
              <div
                className={`h-full transition-all duration-300 ${
                  isToxinActive
                    ? 'bg-red-500 shadow-[0_0_8px_#ef4444]'
                    : 'bg-[#047857] dark:bg-[#00f59b] shadow-[0_0_8px_#00f59b]'
                }`}
                style={{ width: `${fuel}%` }}
              />
            </div>
            <span className="text-[10px] font-bold w-7 text-right">{Math.round(fuel)}%</span>
          </div>
        </div>

        {/* Right: Lab Mode Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleTheme}
            type="button"
            title={`Switch to ${isDark ? 'Sterile Lab (Light)' : 'Toxic Lab (Dark)'}`}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#059669]/35 dark:border-[#00f59b]/30 bg-[#059669]/15 hover:bg-[#059669]/25 dark:bg-[#00f59b]/10 dark:hover:bg-[#00f59b]/20 text-[#064e3b] dark:text-[#00f59b] text-xs font-mono font-bold transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#00f59b]" />
                <span className="hidden lg:inline">Sterile Lab</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#064e3b]" />
                <span className="hidden lg:inline">Toxic Lab</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
