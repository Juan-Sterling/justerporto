import React, { useState, useEffect } from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import BehindTheDesignModal from './BehindTheDesignModal';
import MonsterCrewWordmark from './MonsterCrewWordmark';

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
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isTaglineFading, setIsTaglineFading] = useState(false);

  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);

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
    <footer className="relative z-10 rounded-t-[2rem] sm:rounded-t-[2.75rem] border-t border-[#E4E4E7] dark:border-[#1F1F23] bg-[#FFFFFF] dark:bg-[#07080B] shadow-[0_-8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.5)] pt-6 sm:pt-8 pb-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 overflow-hidden">
      {/* Top Laser Accent Horizon Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#E11D2E]/40 to-transparent pointer-events-none" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-28 bg-[#E11D2E]/5 dark:bg-[#E11D2E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Interactive Giant "JUSTER" Wordmark & Little Monster Crew */}
        <MonsterCrewWordmark />

        {/* Centered Tagline & Side Profile Portal Finale */}
        <div className="mt-4 sm:mt-6 flex flex-col items-center text-center gap-5 sm:gap-6">
          {/* Larger Rotating BABYMONSTER Tagline */}
          <div className="min-h-[1.75rem] sm:min-h-[2.25rem] flex items-center justify-center overflow-hidden px-2">
            <p
              className={`text-sm sm:text-base md:text-lg font-medium text-[#27272A] dark:text-[#E4E4E7] font-mono tracking-tight transition-all duration-300 transform ${
                isTaglineFading ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              {TAGLINES[taglineIndex]}
            </p>
          </div>

          {/* Centered Tactical Side Profile Portal Entry Button */}
          {onNavigateToSideProfile && (
            <div className="flex justify-center">
              <button
                onClick={onNavigateToSideProfile}
                type="button"
                id="footer-sideprofile-trigger"
                aria-label="Access Side Profile: There's Another Side That You Don't Know"
                className="group relative inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#f0fdf4] dark:bg-[#090d0b] border border-[#10b981]/30 dark:border-[#00f59b]/35 hover:border-[#059669] dark:hover:border-[#00f59b] shadow-2xs hover:shadow-[0_0_15px_rgba(0,245,155,0.2)] transition-all duration-300 cursor-pointer overflow-hidden text-left"
              >
                {/* Tactical diagonal hazard lines background */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, #10b981 0, #10b981 1px, transparent 0, transparent 20%)',
                    backgroundSize: '16px 16px',
                  }}
                />

                <div className="relative z-10 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#10b981]/15 dark:bg-[#00f59b]/20 border border-[#10b981]/30 dark:border-[#00f59b]/50 flex items-center justify-center text-[#059669] dark:text-[#00f59b] group-hover:scale-105 transition-transform shrink-0">
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
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 mt-7 sm:mt-8 border-t border-[#E4E4E7]/70 dark:border-[#1F1F23]/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#71717A] text-center sm:text-left">
          {/* Copyright notice */}
          <div>
            &copy; {currentYear} Juan Sterling. All rights reserved.
          </div>

          {/* BABYMONSTER Inspiration Credit & Design Case Study Modal */}
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end text-[11px] font-mono">
            <span>
              Design inspired by{' '}
              <a
                id="footer-babymonster-link"
                href="https://ygfamily.com/en/artists/babymonster/main"
                target="_blank"
                rel="noopener noreferrer"
                title="BABYMONSTER"
                className="text-[#E11D2E] font-semibold underline-offset-4 decoration-[#E11D2E]/60 hover:underline hover:text-[#FF3B4D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E]/50 rounded-sm transition-colors duration-200 cursor-pointer"
              >
                BABYMONSTER
              </a>
            </span>
            <span className="text-[#A1A1AA] dark:text-[#3F3F46]">•</span>
            <button
              type="button"
              id="footer-behind-design-trigger"
              onClick={() => setIsDesignModalOpen(true)}
              aria-label="Read Behind the Design case study"
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium tracking-wide uppercase transition-all duration-200 cursor-pointer text-[#E11D2E] dark:text-[#FF4A5A] bg-[#E11D2E]/10 hover:bg-[#E11D2E]/20 border border-[#E11D2E]/30 hover:border-[#E11D2E]/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E11D2E]"
            >
              Behind the Design
            </button>
          </div>
        </div>
      </div>

      {/* Behind The Design Modal */}
      <BehindTheDesignModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
      />
    </footer>
  );
}
