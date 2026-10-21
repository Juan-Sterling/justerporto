import React, { useState, useEffect } from 'react';
import { Compass, ArrowRight } from 'lucide-react';

const ROLES = [
  "Full Stack Developer",
  "Software Developer",
];

const TAGLINES = [
  '“Baby, I’m a Developer”',
  '"We Code Up"',
  '“Keep the code DRIPPIN”',
  '“Code by day, BAEMON on repeat”',
  '“Drip, Debug, Deploy”',
  '“Passion, Ambition, and a Little Bit of Code”',
  '“I Like It When the Code Just Works.”',
];

export default function Footer({ onNavigateToSideProfile }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isTaglineFading, setIsTaglineFading] = useState(false);

  // Role rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setIsFading(false);
      }, 300);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // BABYMONSTER tagline rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTaglineFading(true);
      setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
        setIsTaglineFading(false);
      }, 300);
    }, 3600);

    return () => clearInterval(interval);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 rounded-t-[1.75rem] sm:rounded-t-[2.5rem] border border-b-0 border-[#E4E4E7] dark:border-[#1F1F23] bg-[#FFFFFF] dark:bg-[#000000] shadow-[0_-8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.5)] py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-4">
        {/* Tactical Side Profile Portal Entry Button (Compact & Proportional) */}
        {onNavigateToSideProfile && (
          <div className="my-1">
            <button
              onClick={onNavigateToSideProfile}
              type="button"
              id="footer-sideprofile-trigger"
              aria-label="Access Side Profile: There's Another Side That You Don't Know"
              className="group relative inline-flex items-center gap-3 px-3.5 py-2 rounded-xs bg-[#f0fdf4] dark:bg-[#090d0b] border border-[#10b981]/30 dark:border-[#00f59b]/35 hover:border-[#059669] dark:hover:border-[#00f59b] shadow-2xs hover:shadow-[0_0_15px_rgba(0,245,155,0.2)] transition-all duration-300 cursor-pointer overflow-hidden text-left"
            >
              {/* Tactical diagonal hazard lines background */}
              <div
                className="absolute inset-0 opacity-10 dark:opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #10b981 0, #10b981 1px, transparent 0, transparent 20%)',
                  backgroundSize: '16px 16px',
                }}
              />

              <div className="relative z-10 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xs bg-[#10b981]/15 dark:bg-[#00f59b]/20 border border-[#10b981]/30 dark:border-[#00f59b]/50 flex items-center justify-center text-[#059669] dark:text-[#00f59b] group-hover:scale-105 transition-transform shrink-0">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#059669] dark:text-[#6ee7b7] font-semibold tracking-wider">
                    PERSONAL SIDE
                  </div>
                  <div className="font-display font-bold text-xs sm:text-[13px] text-[#064e3b] dark:text-white tracking-wide group-hover:text-[#059669] dark:group-hover:text-[#00f59b] transition-colors leading-tight">
                    There's Another Side That You Don't Know
                  </div>
                </div>
              </div>

              <div className="relative z-10 hidden sm:flex items-center gap-1 pl-2.5 text-[11px] font-mono font-bold text-[#059669] dark:text-[#00f59b] group-hover:translate-x-0.5 transition-transform border-l border-[#10b981]/25 dark:border-[#00f59b]/25 shrink-0">
                <span>EXPLORE</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          </div>
        )}

        {/* Identity & Rotating Role */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="font-display text-sm font-bold text-[#09090B] dark:text-white">
            Juan Sterling
          </span>
          <span className="text-[#A1A1AA] dark:text-[#52525B]">•</span>
          <div className="inline-flex items-center overflow-hidden">
            <span
              className={`font-mono text-xs transition-all duration-300 transform ${isFading
                ? 'opacity-0 -translate-y-2'
                : 'opacity-100 translate-y-0 text-[#E11D2E]'
                }`}
            >
              {ROLES[roleIndex]}
            </span>
          </div>
        </div>

        {/* Rotating Tagline */}
        <div className="min-h-[1.5rem] flex items-center justify-center overflow-hidden">
          <p
            className={`text-xs text-[#52525B] dark:text-[#A1A1AA] transition-all duration-300 transform ${isTaglineFading
              ? 'opacity-0 -translate-y-2'
              : 'opacity-100 translate-y-0'
              }`}
          >
            {TAGLINES[taglineIndex]}
          </p>
        </div>

        {/* Copyright notice */}
        <div className="pt-2 text-xs font-mono text-[#52525B] dark:text-[#A1A1AA] flex items-center justify-center gap-1.5 flex-wrap">
          <span>&copy; {currentYear} Juan Sterling.</span>
          <span className="hidden sm:inline text-[#A1A1AA] dark:text-[#52525B]">•</span>
          <span>All rights reserved.</span>
        </div>

        {/* BABYMONSTER Inspiration Credit */}
        <p className="text-[11px] font-mono text-[#71717A]">
          Design inspired by{' '}
          <a
            id="footer-babymonster-link"
            // href="https://www.google.com/search?q=BABYMONSTER"
            href="https://ygfamily.com/en/artists/babymonster/main"
            target="_blank"
            rel="noopener noreferrer"
            title="BABYMONSTER (Google Search)"
            className="text-[#E11D2E] font-semibold underline-offset-4 decoration-[#E11D2E]/60 hover:underline hover:text-[#FF3B4D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E]/50 rounded-sm transition-colors duration-200 cursor-pointer"
          >
            BABYMONSTER
          </a>
        </p>
      </div>
    </footer>
  );
}
