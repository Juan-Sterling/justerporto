import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ROLES = [
  "Full Stack Developer",
  "Software Developer",
];

export default function Footer() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#2A2A2A] bg-[#000000] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Identity & Note */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-['Space_Grotesk',sans-serif] text-sm font-bold text-white">
              Juan Sterling
            </span>
            <span className="text-[#52525B]">•</span>
            <div className="inline-flex items-center overflow-hidden">
              <span
                className={`font-mono text-xs text-[#A1A1AA] transition-all duration-300 transform ${
                  isFading
                    ? 'opacity-0 -translate-y-2'
                    : 'opacity-100 translate-y-0 text-[#D4D4D8]'
                }`}
              >
                {ROLES[roleIndex]}
              </span>
            </div>
          </div>
          <p className="text-xs text-[#71717A]">
            Built with React.js &amp; Tailwind CSS.
          </p>
        </div>

        {/* Status code & Back to Top */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#52525B] select-none">
            process.exit(0)
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            className="group p-2.5 rounded-md bg-[#141414] border border-[#2A2A2A] text-[#A1A1AA] hover:text-white hover:border-[#E11D2E]/60 hover:bg-[#181818] active:scale-95 transition-all duration-200 cursor-pointer shadow-sm shadow-black/40"
            aria-label="Back to top of page"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
