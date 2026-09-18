import React, { useState, useEffect } from 'react';
import { ArrowDown, FileDown } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { portfolioData } from '../data/portfolioData';

const ROLES = [
  "Full Stack Developer",
  "Software Developer",
];

export default function Hero() {
  const { personal } = portfolioData;

  // Typewriter effect for terminal command whoami
  const [promptCharIndex, setPromptCharIndex] = useState(0);
  const targetPrompt = 'whoami';

  useEffect(() => {
    const timer = setInterval(() => {
      setPromptCharIndex((prev) => {
        if (prev >= targetPrompt.length) {
          clearInterval(timer);
          return targetPrompt.length;
        }
        return prev + 1;
      });
    }, 120);
    return () => clearInterval(timer);
  }, []);

  const typedPrompt = targetPrompt.slice(0, promptCharIndex);

  // Dynamic role typewriter cycle (typing 1-by-1, pause, deleting 1-by-1, pause)
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const currentWord = ROLES[roleIndex];
    let timer;

    if (isWaiting) {
      timer = setTimeout(() => {
        setIsWaiting(false);
        if (isDeleting) {
          // Finished deleting pause, start typing next role
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        } else {
          // Finished typing pause, start deleting
          setIsDeleting(true);
        }
      }, isDeleting ? 400 : 2200);
    } else if (isDeleting) {
      // Deleting 1 by 1 letter
      timer = setTimeout(() => {
        setCharIndex((prev) => {
          if (prev <= 1) {
            setIsWaiting(true);
            return 0;
          }
          return prev - 1;
        });
      }, 40);
    } else {
      // Typing 1 by 1 letter
      timer = setTimeout(() => {
        setCharIndex((prev) => {
          if (prev >= currentWord.length - 1) {
            setIsWaiting(true);
            return currentWord.length;
          }
          return prev + 1;
        });
      }, 90);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, isWaiting, roleIndex]);

  const displayedRole = ROLES[roleIndex].slice(0, charIndex);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-[92vh] flex flex-col justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none"
    >
      {/* 1. Subtle Developer Canvas Grid & Ambient Glow Animation */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#0000000d_1px,transparent_1px),linear-gradient(to_bottom,#0000000d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2A2A2A20_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A20_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[32rem] h-80 sm:h-[32rem] bg-[#E11D2E]/10 rounded-full blur-[100px] pointer-events-none animate-pulse"
        style={{ animationDuration: '6s' }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto w-full space-y-7 relative z-10">
        {/* 2. Top Row: Terminal Prompt + Live Availability Beacon */}
        <AnimatedSection delay={0}>
          <div className="flex flex-wrap items-center gap-3">
            {/* Terminal Prompt with authentic blinking cursor */}
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm px-3.5 py-1.5 rounded-md bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] shadow-xs hover:border-[#CBD5E1] dark:hover:border-[#3A3A3A] transition-colors">
              <span className="text-[#71717A] dark:text-[#A1A1AA]">{personal.terminalUser}</span>
              <span className="text-[#09090B] dark:text-white font-medium">{typedPrompt}</span>
              <span className="inline-block w-2 h-4 bg-[#E11D2E] animate-pulse rounded-xs" aria-hidden="true" />
            </div>

            {/* Pulsing Live Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] text-xs font-mono text-[#52525B] dark:text-[#D4D4D8] shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personal.availability}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* 3. Primary Identity with Dynamic Typewriter Role */}
        <AnimatedSection delay={120}>
          <div className="space-y-3">
            <h1 className="font-['Space_Grotesk',sans-serif] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#09090B] dark:text-white leading-none tracking-tighter">
              {personal.name}
            </h1>

            {/* Dynamic Role with Typewriter & Blinking Caret */}
            <div className="flex items-center gap-1 font-mono text-lg sm:text-xl md:text-2xl text-[#E11D2E] font-medium tracking-tight min-h-[2rem]">
              <span>// {displayedRole}</span>
              <span className="inline-block w-2.5 h-5 bg-[#E11D2E] animate-pulse" aria-hidden="true" />
            </div>
          </div>
        </AnimatedSection>

        {/* 4. Concise Professional Introduction */}
        <AnimatedSection delay={200}>
          <p className="text-base sm:text-lg md:text-xl text-[#52525B] dark:text-[#A1A1AA] leading-relaxed max-w-2xl font-sans font-normal">
            {personal.tagline}
          </p>
        </AnimatedSection>

        {/* 5. CTAs with Micro-Animations */}
        <AnimatedSection delay={280}>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('experience')}
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-md bg-[#E11D2E] hover:bg-[#FF3B4D] active:scale-95 text-white font-medium text-sm transition-all duration-200 shadow-md shadow-[#E11D2E]/25 hover:shadow-[#E11D2E]/50 cursor-pointer overflow-hidden"
            >
              {/* Shimmer sweep effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <span>View Experience</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <a
              href={personal.resumeUrl || "/CV_Juan_Sterling_Martua.pdf"}
              download="CV_Juan_Sterling_Martua.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-md bg-white dark:bg-[#141414] hover:bg-[#F4F4F5] dark:hover:bg-[#1c1c1c] active:scale-95 text-[#09090B] dark:text-white border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E]/60 font-medium text-sm transition-all duration-200 cursor-pointer shadow-xs"
              aria-label="Download CV Juan Sterling"
            >
              <FileDown className="w-4 h-4 text-[#71717A] dark:text-[#A1A1AA] group-hover:text-[#E11D2E] group-hover:translate-y-0.5 transition-all duration-200" />
              <span>Download CV</span>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
