import React, { useState, useEffect } from 'react';
import { Code2 } from 'lucide-react';

export default function WelcomeScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Prevent background scrolling while welcome screen is active
    document.body.style.overflow = 'hidden';

    // Progress counter animation from 0% to 100%
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = prev < 50 ? 4 : prev < 85 ? 6 : 9;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    // Exit transition trigger
    const exitTimer = setTimeout(() => {
      handleExit();
    }, 2100);

    return () => {
      document.body.style.overflow = '';
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
    };
  }, []);

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 500);
  };

  return (
    <aside
      aria-label="Welcome Screen"
      className={`fixed inset-0 z-[9999] flex flex-col justify-between bg-[#FAFAFA] dark:bg-[#000000] p-6 sm:p-12 select-none transition-all duration-500 ease-in-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Ambient Background Grid & Crimson Glow */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#E11D2E0C_1px,transparent_1px),linear-gradient(to_bottom,#E11D2E0C_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#E11D2E08_1px,transparent_1px),linear-gradient(to_bottom,#E11D2E08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[38rem] h-80 sm:h-[38rem] bg-[#E11D2E]/10 dark:bg-[#E11D2E]/20 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none animate-pulse"
        style={{ animationDuration: '4s' }}
        aria-hidden="true"
      />

      {/* 2. Top Bar: Baemon Inspired System Tag */}
      <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D2E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E11D2E]" />
          </span>
          <span className="tracking-widest uppercase text-[11px] text-[#52525B] dark:text-[#A1A1AA] font-semibold">
            BAEMON // 07
          </span>
        </div>

        <div className="text-[11px] font-mono tracking-widest text-[#71717A] dark:text-[#52525B]">
          MONSTIEZ // 2026.SYS
        </div>
      </div>

      {/* 3. Centerpiece: BABYMONSTER Inspired Welcome Stage */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4">
        {/* Devil Horns Crown Motif + Monogram */}
        <div className="relative mb-5 flex flex-col items-center">
          {/* Stylized Devil Horns (Iconic BABYMONSTER Motif) */}
          <div className="flex items-center justify-between w-16 -mb-1 px-1 text-[#E11D2E] filter drop-shadow-[0_0_8px_rgba(225,29,46,0.5)] dark:drop-shadow-[0_0_12px_rgba(225,29,46,0.9)]">
            {/* Left Horn */}
            <svg className="w-6 h-6 -rotate-12 transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
            </svg>
            {/* Right Horn */}
            <svg className="w-6 h-6 rotate-12 transform scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
            </svg>
          </div>

          {/* Badge Container */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#090909] border border-[#E11D2E]/40 dark:border-[#E11D2E]/50 shadow-xl shadow-[#E11D2E]/15 dark:shadow-2xl dark:shadow-[#E11D2E]/30 relative group">
            <div className="absolute inset-0 rounded-2xl bg-[#E11D2E]/10 dark:bg-[#E11D2E]/20 blur-md pointer-events-none animate-pulse" />
            <Code2 className="w-8 h-8 text-[#E11D2E] relative z-10" />
          </div>
        </div>

        {/* Dynamic Animated WELCOME Headline with Red Glow */}
        <div className="min-h-[4.5rem] sm:min-h-[6rem] flex items-center justify-center overflow-hidden">
          <h1 className="font-['Space_Grotesk',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-[#09090B] dark:text-white drop-shadow-[0_0_25px_rgba(225,29,46,0.25)] dark:drop-shadow-[0_0_35px_rgba(225,29,46,0.5)] animate-in fade-in zoom-in-95 duration-300">
            WELCOME
          </h1>
        </div>

        {/* Catchphrase Homage: "BABY, I'M A DEVELOPER" */}
        <div className="mt-2 flex items-center justify-center gap-1.5 font-mono text-xs sm:text-sm md:text-base">
          <span className="text-[#E11D2E] font-bold text-base sm:text-lg select-none">"</span>
          <span className="tracking-widest uppercase font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#09090B] via-[#E11D2E] to-[#09090B] dark:from-white dark:via-[#FF4D5E] dark:to-white">
            BABY, I'M A DEVELOPER
          </span>
          <span className="text-[#E11D2E] font-bold text-base sm:text-lg select-none">"</span>
        </div>

        {/* 7-Member Pulsing Equalizer Bars (Homage to 7 Members) */}
        <div className="flex items-center justify-center gap-1.5 h-6 my-4" title="7 Members Equalizer">
          {[45, 80, 100, 65, 90, 55, 85].map((height, i) => (
            <span
              key={i}
              className="w-1 bg-gradient-to-t from-[#E11D2E] to-[#FF4D5E] rounded-full animate-pulse shadow-[0_0_6px_rgba(225,29,46,0.4)] dark:shadow-[0_0_8px_rgba(225,29,46,0.9)]"
              style={{
                height: `${height}%`,
                animationDuration: `${0.6 + (i % 4) * 0.18}s`,
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>

        {/* Subtitle */}
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-[#52525B] dark:text-[#71717A]">
          <span className="text-[#E11D2E] font-semibold">//</span>
          <span className="tracking-wide">Juan Sterling — Software Developer</span>
        </div>

        {/* Laser Loading Bar (Batter Up Theme) */}
        <div className="mt-8 w-full max-w-sm sm:max-w-md space-y-2.5">
          <div className="w-full h-2 sm:h-2.5 bg-[#E4E4E7] dark:bg-[#1F1F23] rounded-full overflow-hidden relative p-[1px] border border-[#E4E4E7] dark:border-[#2A2A2A]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#E11D2E] via-[#FF3B4D] to-[#FF4D5E] transition-all duration-150 shadow-[0_0_12px_rgba(225,29,46,0.6)] dark:shadow-[0_0_16px_rgba(225,29,46,0.95)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
            <span className="tracking-wider font-medium">BATTER UP // LOADING</span>
            <span className="text-[#09090B] dark:text-white font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Footer: Baemon Swagger */}
      <div className="relative z-10 w-full flex items-center justify-between text-[11px] font-mono text-[#71717A] dark:text-[#52525B]">
        <span>MONSTERS IN THE BUILDING</span>
        <span className="hidden sm:inline">SHEESH // DRIP // FOREVER</span>
        <span>INDONESIA</span>
      </div>
    </aside>
  );
}
