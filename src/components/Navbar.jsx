import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

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
          ? 'bg-[#000000]/90 backdrop-blur-md border-b border-[#2A2A2A] shadow-lg shadow-black/40 py-3.5'
          : 'bg-[#000000]/60 backdrop-blur-sm border-b border-[#2A2A2A]/40 py-5'
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
          className="group flex items-center gap-2 text-white font-semibold tracking-tight text-base sm:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E] rounded-md px-1"
          aria-label="Juan Sterling Home"
        >
          <span className="font-mono text-[#E11D2E] text-sm group-hover:scale-110 transition-transform">
            &gt;
          </span>
          <span className="font-['Space_Grotesk',sans-serif] group-hover:text-white transition-colors">
            Juan Sterling
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
        </a>

        {/* Desktop Navigation (Exactly 4 items) */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
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
                  isActive ? 'text-white font-semibold' : 'text-[#A1A1AA] hover:text-white'
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
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-md border border-[#2A2A2A] bg-[#141414] text-[#A1A1AA] hover:text-white hover:border-[#E11D2E]/50 transition-all"
          >
            <span>get_in_touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#E11D2E]" />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#141414] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#E11D2E]"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#090909] border-b border-[#2A2A2A] px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-xs font-mono text-[#A1A1AA] px-3 py-1 border-b border-[#2A2A2A]/50 mb-2">
            // navigation menu
          </div>
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
                    ? 'bg-[#141414] text-[#E11D2E] border-l-2 border-[#E11D2E]'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-[#141414]/60'
                }`}
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-[#52525B]">#{item.id}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
