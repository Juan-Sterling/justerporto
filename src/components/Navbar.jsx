import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ activeSection = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#000000]/90 backdrop-blur-md border-b border-[#E4E4E7] dark:border-[#2A2A2A] shadow-sm dark:shadow-lg dark:shadow-black/40 py-3.5'
          : 'bg-white/70 dark:bg-[#000000]/60 backdrop-blur-sm border-b border-[#E4E4E7]/60 dark:border-[#2A2A2A]/40 py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Name / Wordmark (No JUAN.SYS) */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2 text-[#09090B] dark:text-white font-semibold tracking-tight text-base sm:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E] rounded-md px-1"
          aria-label="Juan Sterling Home"
        >
          <span className="font-mono text-[#E11D2E] text-sm group-hover:scale-110 transition-transform">
            &gt;
          </span>
          <span className="font-['Space_Grotesk',sans-serif] group-hover:text-[#E11D2E] dark:group-hover:text-white transition-colors">
            Juan Sterling
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
        </a>

        {/* Desktop Navigation & Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-7" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`relative py-1 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:text-white ${
                    isActive
                      ? 'text-[#09090B] dark:text-white font-semibold'
                      : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#E11D2E] rounded-full transition-all duration-300"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 pl-2 border-l border-[#E4E4E7] dark:border-[#2A2A2A]">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Get in touch direct link */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-md border border-[#E4E4E7] dark:border-[#2A2A2A] bg-[#F4F4F5] dark:bg-[#141414] text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:border-[#E11D2E]/50 transition-all shadow-xs"
            >
              <span>get_in_touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#E11D2E]" />
            </a>
          </div>
        </div>

        {/* Mobile Header Actions */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Quick Theme Toggle on mobile header */}
          <ThemeToggle />

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white bg-white dark:bg-[#141414] hover:bg-[#F4F4F5] dark:hover:bg-[#181818] border border-[#E4E4E7] dark:border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#E11D2E]"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#090909] border-b border-[#E4E4E7] dark:border-[#2A2A2A] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA] px-3 py-1 border-b border-[#E4E4E7]/60 dark:border-[#2A2A2A]/50 mb-1">
            // navigation menu
          </div>
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F4F4F5] dark:bg-[#141414] text-[#E11D2E] border-l-2 border-[#E11D2E] font-semibold'
                      : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#141414]/60'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[#A1A1AA] dark:text-[#52525B]">#{item.id}</span>
                </a>
              );
            })}
          </div>

          {/* Theme Switcher in mobile drawer */}
          <div className="pt-2 border-t border-[#E4E4E7] dark:border-[#2A2A2A]/60">
            <ThemeToggle variant="drawer" />
          </div>
        </div>
      )}
    </header>
  );
}
