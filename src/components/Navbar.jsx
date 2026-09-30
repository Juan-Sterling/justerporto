import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useSmoothScroll } from '../context/SmoothScrollContext';

const NAV_ITEMS = [
  { id: 'experience', label: 'Work Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ activeSection = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [clickedSection, setClickedSection] = useState(null);
  const { scrollTo } = useSmoothScroll();

  const effectiveActive = clickedSection || activeSection;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth sliding pill indicator tracking active section tab
  useEffect(() => {
    const updatePill = () => {
      if (!navRef.current) return;
      if (!effectiveActive) {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const activeEl = navRef.current.querySelector(`[data-nav-id="${effectiveActive}"]`);
      if (activeEl) {
        const navRect = navRef.current.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();
        setPillStyle({
          left: elRect.left - navRect.left,
          width: elRect.width,
          opacity: 1,
        });
      } else {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updatePill();
    window.addEventListener('resize', updatePill);

    if (document.fonts?.ready) {
      document.fonts.ready.then(updatePill);
    }

    return () => window.removeEventListener('resize', updatePill);
  }, [effectiveActive]);

  // When activeSection prop catches up to clickedSection, clear clickedSection
  useEffect(() => {
    if (clickedSection && activeSection === clickedSection) {
      setClickedSection(null);
    }
  }, [activeSection, clickedSection]);

  // Close mobile drawer on Escape key or desktop resize
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (id) => {
    setIsOpen(false);
    setClickedSection(id);
    scrollTo(`#${id}`, { offset: -80 });

    // Safety clear clicked override after transition & scroll completes
    setTimeout(() => {
      setClickedSection(null);
    }, 1000);
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60 backdrop-blur-xs md:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Pill Header Wrapper */}
      <header
        className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none transition-all duration-300"
      >
        {/* Floating Pill Bar */}
        <div
          className={`pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300 flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 ${
            scrolled
              ? 'bg-white/65 dark:bg-[#161b22]/55 backdrop-blur-2xl backdrop-saturate-200 border border-white/70 dark:border-white/15 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.8),0_12px_36px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),0_12px_40px_rgba(0,0,0,0.45),0_0_20px_rgba(225,29,46,0.1)]'
              : 'bg-white/50 dark:bg-[#161b22]/40 backdrop-blur-xl backdrop-saturate-180 border border-white/60 dark:border-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.6),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15),0_8px_30px_rgba(0,0,0,0.35)]'
          }`}
        >
          {/* Brand Name / Wordmark with BABYMONSTER Devil Horns & Code Badge */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              setClickedSection(null);
              scrollTo(0, { offset: 0, duration: 1.4 });
            }}
            className="group flex items-center gap-2 sm:gap-2.5 text-[#09090B] dark:text-white font-semibold tracking-tight text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E] rounded-full py-1 px-1.5 sm:px-2 hover:bg-white/40 dark:hover:bg-white/[0.06] transition-colors"
            aria-label="Juan Sterling Home"
          >
            {/* Devil Horns + Code Badge Motif */}
            <div className="relative flex flex-col items-center justify-center shrink-0 pt-0.5">
              {/* Stylized Devil Horns */}
              <div className="flex items-center justify-between w-6 -mb-0.5 px-0.5 text-[#E11D2E] filter drop-shadow-[0_0_4px_rgba(225,29,46,0.7)] group-hover:scale-110 transition-transform duration-200">
                {/* Left Horn */}
                <svg className="w-2 h-2 -rotate-12 transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
                </svg>
                {/* Right Horn */}
                <svg className="w-2 h-2 rotate-12 transform scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
                </svg>
              </div>

              {/* Code Badge Container */}
              <div className="p-1 rounded-md bg-white/70 dark:bg-white/[0.06] backdrop-blur-md border border-[#E11D2E]/40 dark:border-[#E11D2E]/50 shadow-xs shadow-[#E11D2E]/20 group-hover:border-[#E11D2E] group-hover:shadow-md group-hover:shadow-[#E11D2E]/30 relative transition-all duration-200">
                <div className="absolute inset-0 rounded-md bg-[#E11D2E]/10 dark:bg-[#E11D2E]/20 blur-xs pointer-events-none" />
                <Code2 className="w-3.5 h-3.5 text-[#E11D2E] relative z-10" />
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-['Space_Grotesk',sans-serif] group-hover:text-[#E11D2E] dark:group-hover:text-white transition-colors font-bold text-sm sm:text-base">
                Juan Sterling
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E] animate-pulse" />
            </div>
          </a>

          {/* Desktop Navigation Capsule */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <nav
              ref={navRef}
              className="relative flex items-center gap-1 p-1 rounded-full bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-md border border-black/[0.05] dark:border-white/[0.08]"
              aria-label="Main Navigation"
            >
              {/* Smooth Sliding Active Pill Indicator */}
              <div
                className="absolute left-0 top-1 bottom-1 rounded-full bg-white dark:bg-white/[0.14] border border-black/[0.06] dark:border-white/20 shadow-xs backdrop-blur-md transition-all duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none will-change-transform"
                style={{
                  transform: `translateX(${pillStyle.left}px)`,
                  width: `${pillStyle.width}px`,
                  opacity: pillStyle.opacity,
                }}
                aria-hidden="true"
              />

              {NAV_ITEMS.map((item) => {
                const isActive = effectiveActive === item.id;
                return (
                  <a
                    key={item.id}
                    data-nav-id={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E] flex items-center gap-1.5 select-none ${
                      isActive
                        ? 'text-[#09090B] dark:text-white font-semibold'
                        : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-white/30 dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full bg-[#E11D2E] shadow-[0_0_6px_rgba(225,29,46,0.8)] transition-all duration-300 ${
                        isActive ? 'scale-100 opacity-100 animate-pulse' : 'scale-0 opacity-0 -ml-2 w-0'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center pl-2 border-l border-white/40 dark:border-white/10">
              {/* Theme Toggle Button */}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Header Actions */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Quick Theme Toggle on mobile pill */}
            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white bg-white/60 dark:bg-white/[0.06] backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/[0.12] border border-white/60 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#E11D2E] cursor-pointer transition-all shadow-xs"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Floating Card Dropdown */}
        {isOpen && (
          <div className="pointer-events-auto w-full max-w-md mt-2 rounded-2xl bg-white/75 dark:bg-[#161b22]/75 backdrop-blur-2xl backdrop-saturate-200 border border-white/60 dark:border-white/15 p-3.5 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.3),0_20px_50px_rgba(0,0,0,0.5)] space-y-3 animate-in fade-in slide-in-from-top-3 duration-200 md:hidden z-50">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = effectiveActive === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-white/80 dark:bg-white/[0.12] text-[#E11D2E] dark:text-white font-semibold border-l-2 border-[#E11D2E] backdrop-blur-md'
                        : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E] shadow-[0_0_6px_rgba(225,29,46,0.8)]" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Theme Switcher in mobile drawer */}
            <div className="pt-2 border-t border-white/40 dark:border-white/10">
              <ThemeToggle variant="drawer" />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
