import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

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

export default function Footer() {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E4E4E7] dark:border-[#2A2A2A] bg-white dark:bg-[#000000] py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Identity & Note */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-['Space_Grotesk',sans-serif] text-sm font-bold text-[#09090B] dark:text-white">
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
          <div className="min-h-[1.5rem] flex items-center justify-center sm:justify-start overflow-hidden">
            <p
              className={`text-xs text-[#71717A] transition-all duration-300 transform ${isTaglineFading
                ? 'opacity-0 -translate-y-2'
                : 'opacity-100 translate-y-0'
                }`}
            >
              {TAGLINES[taglineIndex]}
            </p>
          </div>
        </div>

        {/* Status code & Back to Top */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#71717A] dark:text-[#52525B] select-none">
            process.exit(0)
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            className="group p-2.5 rounded-md bg-[#F4F4F5] dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:border-[#E11D2E]/60 hover:bg-white dark:hover:bg-[#181818] active:scale-95 transition-all duration-200 cursor-pointer shadow-xs"
            aria-label="Back to top of page"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
