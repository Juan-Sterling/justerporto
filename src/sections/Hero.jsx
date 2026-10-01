import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowDown, FileText, ExternalLink, Mail, Code2, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import gsap from 'gsap';

const ROLES = [
  "Full Stack Developer",
  "Software Developer",
];

export default function Hero({ welcomeActive = false }) {
  const { personal } = portfolioData;
  const { scrollTo } = useSmoothScroll();

  const heroRef = useRef(null);
  const portalRef = useRef(null);
  const glowRef = useRef(null);
  const badgesRef = useRef(null);
  const headlineRef = useRef(null);
  const emblemRef = useRef(null);
  const roleRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);

  // Stage Aurora & Step-back Parallax refs
  const contentWrapperRef = useRef(null);
  const auroraContainerRef = useRef(null);
  const auroraCenterRef = useRef(null);
  const fogLeftRef = useRef(null);
  const fogRightRef = useRef(null);

  // Theatrical Iris Pinch Refs
  const irisRingRef = useRef(null);
  const irisFlashRef = useRef(null);

  // Dynamic role typewriter cycle (typing 1-by-1, pause, deleting 1-by-1, pause)
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  // GSAP Entrance & Scroll Parallax (useLayoutEffect runs BEFORE paint to eliminate FOUC flash)
  useLayoutEffect(() => {
    // If welcome screen is still covering the screen, keep hero completely invisible
    if (welcomeActive) {
      if (heroRef.current) {
        gsap.set(heroRef.current, { opacity: 0 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // 0. Synchronously prime all initial hidden states BEFORE browser paints
      if (portalRef.current) {
        gsap.set(portalRef.current, {
          clipPath: 'circle(150% at 50% 42%)',
          WebkitClipPath: 'circle(150% at 50% 42%)',
        });
      }
      if (auroraContainerRef.current) {
        gsap.set(auroraContainerRef.current, {
          opacity: 0,
        });
      }
      if (irisRingRef.current) gsap.set(irisRingRef.current, { scale: 1, opacity: 0 });
      if (irisFlashRef.current) gsap.set(irisFlashRef.current, { scale: 0.1, opacity: 0 });
      if (contentWrapperRef.current) {
        gsap.set(contentWrapperRef.current, {
          scale: 1,
          yPercent: 0,
          opacity: 1,
          transformOrigin: '50% 38%',
          filter: 'none',
        });
      }
      if (headlineRef.current) gsap.set(headlineRef.current, { scale: 1, yPercent: 0, xPercent: 0, rotation: 0, opacity: 1 });
      if (glowRef.current) gsap.set(glowRef.current, { scale: 0.65, opacity: 0 });
      if (badgesRef.current) gsap.set(badgesRef.current.children, { y: -24, xPercent: 0, rotation: 0, opacity: 0, scale: 0.95 });
      gsap.set('.hero-word-inner', { yPercent: 125, opacity: 0 });
      if (emblemRef.current) gsap.set(emblemRef.current, { scale: 0, rotation: -25, opacity: 0, filter: 'none' });
      if (roleRef.current) gsap.set(roleRef.current, { x: -20, yPercent: 0, xPercent: 0, rotation: 0, opacity: 0 });
      if (taglineRef.current) gsap.set(taglineRef.current, { y: 22, yPercent: 0, rotation: 0, opacity: 0 });
      if (ctaRef.current) gsap.set(ctaRef.current.children, { x: 0, y: 22, yPercent: 0, rotation: 0, opacity: 0, scale: 0.96 });

      // Now that all children are primed to opacity 0, reveal the section container
      gsap.set(heroRef.current, { opacity: 1 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.05,
      });

      // 1. Stage Aurora & Crimson Fog Atmosphere expands and blooms
      if (auroraContainerRef.current) {
        tl.to(
          auroraContainerRef.current,
          { opacity: 1, duration: 1.2, ease: 'power2.out' },
          0
        );
      }

      // 2. Top Row: Availability Beacon + Location Badge slide down
      if (badgesRef.current) {
        tl.to(
          badgesRef.current.children,
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
          0.1
        );
      }

      // 3. Staggered clip reveal for headline words ("Juan Sterling")
      tl.to(
        '.hero-word-inner',
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power4.out',
        },
        0.2
      );

      // 4. BABYMONSTER Devil Emblem spring bounce
      if (emblemRef.current) {
        tl.to(
          emblemRef.current,
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'back.out(2.2)',
          },
          0.45
        );
      }

      // 5. Dynamic Typewriter Role bar slide in
      if (roleRef.current) {
        tl.to(
          roleRef.current,
          { x: 0, opacity: 1, duration: 0.55 },
          0.55
        );
      }

      // 6. Professional Tagline fade & float up
      if (taglineRef.current) {
        tl.to(
          taglineRef.current,
          { y: 0, opacity: 1, duration: 0.65 },
          0.65
        );
      }

      // 7. CTAs with spring stagger
      if (ctaRef.current) {
        tl.to(
          ctaRef.current.children,
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: 'back.out(1.4)',
          },
          0.75
        );
      }

      // 8. Theatrical Iris Pinch & Gravitational Singularity Vortex (scrub linked with Lenis inertia)
      const scrollExitTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom 5%',
          scrub: 0.25, // Snappy 0.25s scrub eliminating lag on rapid flicks & trackpad scrolls
          fastScrollEnd: false, // Smooth on rapid mobile flick scrolls without abrupt snapping
          preventOverlaps: true,
        },
      });

      // Calculate real physical vector from any element's center directly into the singularity aperture epicenter (50% 42%)
      const getSingularityDelta = (el) => {
        if (!el || !heroRef.current) return { dx: 0, dy: -220 };
        const hRect = heroRef.current.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        const targetCenterX = hRect.left + hRect.width * 0.5;
        const targetCenterY = hRect.top + hRect.height * 0.42;

        return {
          dx: targetCenterX - (elRect.left + elRect.width / 2),
          dy: targetCenterY - (elRect.top + elRect.height / 2),
        };
      };

      // 1) Iris Aperture: Circular singularity portal contracts
      if (portalRef.current) {
        scrollExitTl.to(
          portalRef.current,
          {
            clipPath: 'circle(0% at 50% 42%)',
            WebkitClipPath: 'circle(0% at 50% 42%)',
            duration: 1,
            ease: 'power1.out',
          },
          0
        );
      }

      // 2) Glowing Crimson Iris Border Ring: shrinks alongside the aperture
      if (irisRingRef.current) {
        scrollExitTl.to(
          irisRingRef.current,
          {
            scale: 0,
            duration: 1,
            ease: 'power1.out',
          },
          0
        );
        scrollExitTl.to(
          irisRingRef.current,
          {
            opacity: 0.9,
            duration: 0.15,
            ease: 'power1.out',
          },
          0
        );
        scrollExitTl.to(
          irisRingRef.current,
          {
            opacity: 0,
            duration: 0.15,
            ease: 'power1.in',
          },
          0.85
        );
      }

      // 3) Epicenter Core Flash: bursts right as the components & iris collapse at the center
      if (irisFlashRef.current) {
        scrollExitTl.to(
          irisFlashRef.current,
          {
            scale: 1.8,
            opacity: 1,
            duration: 0.12,
            ease: 'power1.out',
          },
          0.82
        );
        scrollExitTl.to(
          irisFlashRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.08,
            ease: 'power1.in',
          },
          0.94
        );
      }

      // 4) Content Wrapper: Clean fade out inside the shrinking circle
      if (contentWrapperRef.current) {
        scrollExitTl.to(
          contentWrapperRef.current,
          {
            opacity: 0,
            duration: 0.72,
            ease: 'power1.out',
          },
          0
        );
      }

      // 5) Badges (Top Row): Sucked downward directly into the center singularity
      if (badgesRef.current) {
        const badges = Array.from(badgesRef.current.children);
        badges.forEach((badge, idx) => {
          const { dx, dy } = getSingularityDelta(badge);
          scrollExitTl.to(
            badge,
            {
              x: dx,
              y: dy,
              scale: 0,
              rotation: idx === 0 ? 15 : -15,
              opacity: 0,
              duration: 0.74,
              ease: 'power1.out',
            },
            0
          );
        });
      }

      // 6) Headline ("Juan Sterling"): Swallowed inward into the center singularity
      if (headlineRef.current) {
        const { dx, dy } = getSingularityDelta(headlineRef.current);
        scrollExitTl.to(
          headlineRef.current,
          {
            x: dx,
            y: dy,
            scale: 0,
            rotation: -8,
            opacity: 0,
            duration: 0.75,
            ease: 'power1.out',
          },
          0
        );
      }

      // 7) BABYMONSTER Devil Emblem: Gravitational singularity epicenter - spins rapidly into a point
      if (emblemRef.current) {
        const { dx: eDx, dy: eDy } = getSingularityDelta(emblemRef.current);
        scrollExitTl.to(
          emblemRef.current,
          {
            x: eDx,
            y: eDy,
            scale: 1.5,
            rotation: 360,
            duration: 0.72,
            ease: 'power1.out',
          },
          0
        );
        scrollExitTl.to(
          emblemRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.08,
            ease: 'power1.out',
          },
          0.72
        );
      }

      // 8) Dynamic Typewriter Role: Sucked upward and inward toward the center
      if (roleRef.current) {
        const { dx, dy } = getSingularityDelta(roleRef.current);
        scrollExitTl.to(
          roleRef.current,
          {
            x: dx,
            y: dy,
            scale: 0,
            rotation: 8,
            opacity: 0,
            duration: 0.74,
            ease: 'power1.out',
          },
          0
        );
      }

      // 9) Tagline Introduction: Sucked upward toward the vortex
      if (taglineRef.current) {
        const { dx, dy } = getSingularityDelta(taglineRef.current);
        scrollExitTl.to(
          taglineRef.current,
          {
            x: dx,
            y: dy,
            scale: 0,
            rotation: -6,
            opacity: 0,
            duration: 0.74,
            ease: 'power1.out',
          },
          0
        );
      }

      // 10) CTA Buttons: ALL buttons physically sucked directly into the center on BOTH desktop and mobile
      if (ctaRef.current) {
        const buttons = Array.from(ctaRef.current.children);
        buttons.forEach((btn, idx) => {
          const { dx, dy } = getSingularityDelta(btn);
          const spin = dx >= 0 ? 25 + idx * 6 : -25 - idx * 6;

          scrollExitTl.to(
            btn,
            {
              x: dx,
              y: dy,
              scale: 0,
              rotation: spin,
              opacity: 0,
              duration: 0.76,
              ease: 'power1.out',
            },
            0
          );
        });
      }

      // 11) Atmosphere Container & Volumetric Orbs (Lightweight GPU fade-out without layout recomputation)
      if (auroraCenterRef.current) {
        scrollExitTl.to(
          auroraCenterRef.current,
          {
            opacity: 0,
            scale: 0.7,
            duration: 0.8,
            ease: 'power1.in',
          },
          0
        );
      }

      if (fogLeftRef.current) {
        scrollExitTl.to(
          fogLeftRef.current,
          {
            opacity: 0,
            duration: 0.75,
            ease: 'power1.in',
          },
          0
        );
      }

      if (fogRightRef.current) {
        scrollExitTl.to(
          fogRightRef.current,
          {
            opacity: 0,
            duration: 0.75,
            ease: 'power1.in',
          },
          0
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [welcomeActive]);

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
  const nameWords = (personal.name || 'Juan Sterling').trim().split(/\s+/);

  const scrollToSection = (id) => {
    scrollTo(`#${id}`, { offset: -70 });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{ opacity: 0 }}
      className={`min-h-[92vh] relative overflow-hidden select-none will-change-transform ${welcomeActive ? 'pointer-events-none' : ''}`}
    >
      {/* Theatrical Circular Iris Singularity Stage (Masks both stage backdrop & interactive content into a true circle) */}
      <div
        ref={portalRef}
        className="relative w-full min-h-[92vh] flex flex-col justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden will-change-transform"
        style={{
          clipPath: 'circle(150% at 50% 42%)',
          WebkitClipPath: 'circle(150% at 50% 42%)',
        }}
      >
        {/* 1. Dedicated Stage Aurora / Crimson Fog Atmosphere (Covers wavy lines specifically on Hero) */}
        <div
          ref={auroraContainerRef}
          className="absolute inset-0 pointer-events-none overflow-hidden select-none will-change-transform opacity-0 bg-[#FAFAFA] dark:bg-[#07080B] z-0"
          aria-hidden="true"
        >
          {/* Soft Stage Vignette Mask - Adaptive Light & Dark Mode */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_25%,rgba(225,29,46,0.06),rgba(250,250,250,0.75)_65%,rgba(250,250,250,1)_100%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_25%,rgba(225,29,46,0.16),rgba(7,8,11,0.85)_70%,rgba(7,8,11,1)_100%)] pointer-events-none" />

          {/* Primary Volumetric Crimson Aurora Fog (Center Top) */}
          <div
            ref={auroraCenterRef}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] sm:w-[56rem] h-[24rem] sm:h-[34rem] rounded-[100%] bg-gradient-to-b from-[#E11D2E]/10 via-[#E11D2E]/5 to-transparent dark:from-[#E11D2E]/25 dark:via-[#E11D2E]/15 blur-[65px] sm:blur-[100px] pointer-events-none will-change-transform"
          />

          {/* Deep Ruby Ambient Smoke (Left Flank) */}
          <div
            ref={fogLeftRef}
            className="absolute top-1/3 left-[15%] -translate-x-1/2 -translate-y-1/2 w-[24rem] sm:w-[32rem] h-[20rem] sm:h-[26rem] rounded-full bg-[#E11D2E]/6 dark:bg-[#880815]/22 blur-[55px] sm:blur-[85px] pointer-events-none will-change-transform"
          />

          {/* Soft Peach-Crimson Rim Glow (Right Flank) */}
          <div
            ref={fogRightRef}
            className="absolute top-1/4 left-[85%] -translate-x-1/2 -translate-y-1/2 w-[22rem] sm:w-[30rem] h-[18rem] sm:h-[24rem] rounded-full bg-[#FF3B4D]/8 dark:bg-[#FF3B4D]/18 blur-[50px] sm:blur-[80px] pointer-events-none will-change-transform"
          />

          {/* Smooth Bottom Dissolve to seamlessly blend with main page */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent dark:from-[#0f1117] dark:via-[#0f1117]/60 pointer-events-none" />
        </div>

        {/* 2. Hero Interactive Content Wrapper (Animated on Step-Back Exit & Re-entrance) */}
        <div
          ref={contentWrapperRef}
          className="max-w-4xl mx-auto w-full space-y-7 relative z-10 will-change-transform"
        >
        {/* 2. Top Row: Live Availability Beacon + Location Badge */}
        <div ref={badgesRef} className="flex flex-wrap items-center gap-3">
          {/* Development Status Badge */}
          <div className="opacity-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-[#141414] border border-zinc-200/90 dark:border-[#2A2A2A] text-xs font-mono text-zinc-700 dark:text-[#D4D4D8] shadow-xs hover:border-[#E11D2E]/40 transition-colors will-change-transform">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 dark:bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)] dark:shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
            </span>
            <span className="font-medium">{personal.availability}</span>
          </div>

          {/* Current Location Badge */}
          <div className="opacity-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-[#141414] border border-zinc-200/90 dark:border-[#2A2A2A] text-xs font-mono text-zinc-700 dark:text-[#D4D4D8] shadow-xs hover:border-[#E11D2E]/40 transition-colors will-change-transform">
            <MapPin className="w-3.5 h-3.5 text-[#E11D2E]" />
            <span className="font-medium">{personal.location || "North Jakarta, Indonesia"}</span>
          </div>
        </div>

        {/* 3. Primary Identity with Dynamic Typewriter Role */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <h1
              ref={headlineRef}
              className="font-['Space_Grotesk',sans-serif] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-950 dark:text-white leading-none tracking-tighter flex flex-wrap items-center gap-x-3 sm:gap-x-4 will-change-transform"
            >
              <span className="sr-only">{personal.name}</span>
              <span aria-hidden="true" className="inline-flex flex-wrap items-center gap-x-3 sm:gap-x-4">
                {nameWords.map((word, idx) => (
                  <span
                    key={`${word}-${idx}`}
                    className="inline-block overflow-hidden py-1 sm:py-2 -my-1 sm:-my-2"
                  >
                    <span className="hero-word-inner inline-block will-change-transform opacity-0 text-zinc-950 dark:text-white hover:text-[#E11D2E] transition-colors">
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            </h1>

            {/* BABYMONSTER Devil Emblem with GSAP Spring-Bounce Entrance & Parallax */}
            <div 
              ref={emblemRef}
              className="relative inline-flex flex-col items-center justify-center shrink-0 -mt-1 sm:-mt-2 select-none group cursor-default will-change-transform opacity-0"
              title="BAEMON // 07"
            >
              {/* Stylized Devil Horns */}
              <div className="flex items-center justify-between w-9 sm:w-11 -mb-1 px-0.5 text-[#E11D2E] filter drop-shadow-[0_0_6px_rgba(225,29,46,0.5)] dark:drop-shadow-[0_0_8px_rgba(225,29,46,0.8)] group-hover:scale-110 transition-transform duration-300">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 -rotate-12 transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
                </svg>
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-12 transform scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
                </svg>
              </div>

              {/* Badge Container */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-[#090909] border border-[#E11D2E]/35 dark:border-[#E11D2E]/50 shadow-md shadow-[#E11D2E]/10 dark:shadow-[#E11D2E]/20 group-hover:shadow-lg group-hover:shadow-[#E11D2E]/25 dark:group-hover:shadow-[#E11D2E]/35 group-hover:border-[#E11D2E] transition-all duration-300 relative">
                <div className="absolute inset-0 rounded-xl bg-[#E11D2E]/8 dark:bg-[#E11D2E]/20 blur-xs pointer-events-none animate-pulse" />
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#E11D2E] relative z-10" />
              </div>
            </div>
          </div>

          {/* Dynamic Role with Typewriter & Blinking Caret */}
          <div ref={roleRef} className="inline-flex items-center gap-2 font-mono text-lg sm:text-xl md:text-2xl font-semibold tracking-tight min-h-[2.25rem] opacity-0 will-change-transform">
            <span className="text-[#E11D2E] font-bold select-none">//</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-medium tracking-normal drop-shadow-none dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {displayedRole}
            </span>
            <span className="inline-block w-2.5 h-5 sm:h-6 bg-[#E11D2E] animate-pulse rounded-xs shadow-[0_0_6px_rgba(225,29,46,0.6)] dark:shadow-[0_0_8px_rgba(225,29,46,0.8)]" aria-hidden="true" />
          </div>
        </div>

        {/* 4. Concise Professional Introduction */}
        <div ref={taglineRef} className="opacity-0 will-change-transform">
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-sans font-normal">
            {personal.tagline}
          </p>
        </div>

        {/* 5. CTAs with Micro-Animations */}
        <div ref={ctaRef} className="pt-2 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
          <button
            type="button"
            onClick={() => scrollToSection('experience')}
            className="opacity-0 group relative inline-flex items-center justify-center gap-2 w-full sm:w-48 h-11 sm:h-12 rounded-md bg-[#E11D2E] hover:bg-[#FF3B4D] active:scale-95 text-white font-medium text-xs sm:text-sm transition-[color,background-color,box-shadow] duration-200 shadow-md shadow-[#E11D2E]/25 hover:shadow-[#E11D2E]/50 cursor-pointer overflow-hidden whitespace-nowrap will-change-transform"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            <span>View Experience</span>
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-0.5 transition-transform shrink-0" />
          </button>

          <a
            href={personal.resumeUrl || "https://drive.google.com/file/d/1g20NBQXWuKxJ4v7qwXC4Py855tLvzRNJ/view?usp=sharing"}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group inline-flex items-center justify-center gap-2 w-full sm:w-48 h-11 sm:h-12 rounded-md bg-white/95 dark:bg-[#141414] hover:bg-zinc-50 dark:hover:bg-[#1c1c1c] active:scale-95 text-zinc-900 dark:text-white border border-zinc-200/90 dark:border-[#2A2A2A] hover:border-[#E11D2E]/60 font-medium text-xs sm:text-sm transition-[color,background-color,border-color,box-shadow] duration-200 cursor-pointer shadow-xs hover:shadow-sm whitespace-nowrap will-change-transform"
            aria-label="View CV Juan Sterling"
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 dark:text-[#A1A1AA] group-hover:text-[#E11D2E] transition-colors shrink-0" />
            <span>View CV</span>
            <ExternalLink className="w-3 h-3 text-zinc-400 dark:text-zinc-500 group-hover:text-[#E11D2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
          </a>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="opacity-0 group inline-flex items-center justify-center gap-2 w-full sm:w-48 h-11 sm:h-12 rounded-md bg-white/95 dark:bg-[#141414] hover:bg-zinc-50 dark:hover:bg-[#1c1c1c] active:scale-95 text-zinc-900 dark:text-white border border-zinc-200/90 dark:border-[#2A2A2A] hover:border-[#E11D2E]/60 font-medium text-xs sm:text-sm transition-[color,background-color,border-color,box-shadow] duration-200 cursor-pointer shadow-xs hover:shadow-sm whitespace-nowrap will-change-transform col-span-2 sm:col-span-1"
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 dark:text-[#A1A1AA] group-hover:text-[#E11D2E] transition-colors shrink-0" />
            <span>Contact Me</span>
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 dark:text-[#A1A1AA] group-hover:text-[#E11D2E] group-hover:translate-y-0.5 transition-all duration-200 shrink-0" />
          </button>
        </div>
      </div>
    </div>

      {/* 1.5. Theatrical Iris Flare Elements (Active during Theatrical Iris Pinch mode - outside portal so glowing bloom is unclipped) */}
      <div
        ref={irisRingRef}
        className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130vmax] h-[130vmax] rounded-full border border-[#E11D2E]/70 shadow-[0_0_40px_rgba(225,29,46,0.6)] pointer-events-none z-20 will-change-transform opacity-0"
        aria-hidden="true"
      />

      <div
        ref={irisFlashRef}
        className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 will-change-transform opacity-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="absolute w-[24rem] sm:w-[36rem] h-[3px] bg-gradient-to-r from-transparent via-[#FF3B4D] to-transparent shadow-[0_0_25px_#E11D2E]" />
        <div className="w-12 h-12 rounded-full bg-white shadow-[0_0_40px_#E11D2E,0_0_80px_#FF3B4D] blur-xs" />
      </div>
    </section>
  );
}
