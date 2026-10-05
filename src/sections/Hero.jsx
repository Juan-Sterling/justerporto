import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowDown, FileText, ExternalLink, Mail, Code2, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import BaemonPortalO from '../components/BaemonPortalO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HERO_PHOTO_URL = 'https://res.cloudinary.com/og1jrvy3/image/upload/v1791215430/IMG_0996_gg.jpg';

const ROLES = [
  "Full Stack Developer",
  "Software Developer",
];

export default function Hero({ welcomeActive = false }) {
  const { personal } = portfolioData;
  const { scrollTo } = useSmoothScroll();

  // Root Hero Section Ref (Pinned by ScrollTrigger)
  const heroRef = useRef(null);

  // BaemonPortalO Animated Refs
  const portalContainerRef = useRef(null);
  const ringScaleRef = useRef(null);
  const leftHalfRef = useRef(null);
  const rightHalfRef = useRef(null);
  const portalAuraRef = useRef(null);

  // Hero Content Refs (Placed on the LEFT side)
  const contentWrapperRef = useRef(null);
  const leftColRef = useRef(null);
  const badgesRef = useRef(null);
  const headlineRef = useRef(null);
  const emblemRef = useRef(null);
  const roleRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);

  // Hero Portrait Photo Card Refs (Desktop Right Column & Mobile Top-Right)
  const photoCardRef = useRef(null);
  const mobilePhotoRef = useRef(null);

  // Dedicated Stage Aurora & Crimson Fog Atmosphere Refs (RESTORED)
  const auroraContainerRef = useRef(null);
  const auroraCenterRef = useRef(null);
  const fogLeftRef = useRef(null);
  const fogRightRef = useRef(null);

  // Dynamic role typewriter cycle
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  // GSAP Entrance & Scroll-Driven Portal Zoom Timeline
  useLayoutEffect(() => {
    // If welcome screen is still covering the screen, keep hero invisible
    if (welcomeActive) {
      if (heroRef.current) {
        gsap.set(heroRef.current, { opacity: 0 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // 0. Synchronously prime all initial hidden states BEFORE browser paints
      if (auroraContainerRef.current) gsap.set(auroraContainerRef.current, { opacity: 1 });
      if (auroraCenterRef.current) gsap.set(auroraCenterRef.current, { scale: 0.85, opacity: 0 });
      if (fogLeftRef.current) gsap.set(fogLeftRef.current, { scale: 0.9, opacity: 0 });
      if (fogRightRef.current) gsap.set(fogRightRef.current, { scale: 0.9, opacity: 0 });

      if (portalContainerRef.current) {
        gsap.set(portalContainerRef.current, {
          scale: 0.82,
          rotation: -90,
          opacity: 0,
          xPercent: -50,
          yPercent: -50,
          transformOrigin: '50% 50%',
        });
      }
      if (ringScaleRef.current) gsap.set(ringScaleRef.current, { scale: 1, transformOrigin: '50% 50%', force3D: true });
      if (leftHalfRef.current) gsap.set(leftHalfRef.current, { x: 0, transformOrigin: '200px 200px', force3D: true });
      if (rightHalfRef.current) gsap.set(rightHalfRef.current, { x: 0, transformOrigin: '200px 200px', force3D: true });
      if (portalAuraRef.current) gsap.set(portalAuraRef.current, { scale: 0.8, opacity: 0, force3D: true });

      if (contentWrapperRef.current) {
        gsap.set(contentWrapperRef.current, {
          scale: 1,
          x: 0,
          y: 0,
          opacity: 1,
          filter: 'none',
        });
      }
      if (leftColRef.current) gsap.set(leftColRef.current, { opacity: 1, x: 0, y: 0 });
      if (headlineRef.current) gsap.set(headlineRef.current, { scale: 1, opacity: 1 });
      if (badgesRef.current) gsap.set(badgesRef.current.children, { y: -24, opacity: 0, scale: 0.95 });
      gsap.set('.hero-word-inner', { yPercent: 125, opacity: 0 });
      if (emblemRef.current) gsap.set(emblemRef.current, { scale: 0, rotation: -25, opacity: 0 });
      if (roleRef.current) gsap.set(roleRef.current, { x: -20, opacity: 0 });
      if (taglineRef.current) gsap.set(taglineRef.current, { y: 22, opacity: 0 });
      if (ctaRef.current) gsap.set(ctaRef.current.children, { y: 22, opacity: 0, scale: 0.96 });
      if (photoCardRef.current) {
        gsap.set(photoCardRef.current, {
          scale: 0.88,
          opacity: 0,
          x: 35,
          y: 15,
          rotation: 2,
        });
      }
      if (mobilePhotoRef.current) {
        gsap.set(mobilePhotoRef.current, {
          scale: 0.86,
          opacity: 0,
          x: 18,
          y: 12,
          rotation: 2,
        });
      }

      // Reveal hero section container
      gsap.set(heroRef.current, { opacity: 1 });

      // 1. Entrance Timeline (Plays once welcome screen dismisses)
      const entranceTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.05,
      });

      // A. Stage Aurora & Crimson Fog Atmosphere blooms and expands
      if (auroraCenterRef.current) {
        entranceTl.to(auroraCenterRef.current, { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0);
      }
      if (fogLeftRef.current) {
        entranceTl.to(fogLeftRef.current, { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.08);
      }
      if (fogRightRef.current) {
        entranceTl.to(fogRightRef.current, { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.08);
      }

      // B. BaemonPortalO in Center Stage Scales in with 90° rotation into upright alignment
      if (portalContainerRef.current) {
        entranceTl.to(portalContainerRef.current, {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.25,
          ease: 'power3.out',
        }, 0.05);
      }
      if (portalAuraRef.current) {
        entranceTl.to(portalAuraRef.current, { scale: 1, opacity: 0.85, duration: 0.9, ease: 'power2.out' }, 0.1);
      }

      // C. Top Row: Availability Beacon + Location Badge slide down
      if (badgesRef.current) {
        entranceTl.to(badgesRef.current.children, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 }, 0.15);
      }

      // D. Staggered clip reveal for headline words ("Juan Sterling")
      entranceTl.to('.hero-word-inner', {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power4.out',
      }, 0.22);

      // E. BABYMONSTER Devil Emblem spring bounce
      if (emblemRef.current) {
        entranceTl.to(emblemRef.current, {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'back.out(2.2)',
        }, 0.45);
      }

      // F. Dynamic Typewriter Role bar slide in
      if (roleRef.current) {
        entranceTl.to(roleRef.current, { x: 0, opacity: 1, duration: 0.55 }, 0.55);
      }

      // G. Professional Tagline fade & float up
      if (taglineRef.current) {
        entranceTl.to(taglineRef.current, { y: 0, opacity: 1, duration: 0.65 }, 0.65);
      }

      // H. CTAs with spring stagger
      if (ctaRef.current) {
        entranceTl.to(ctaRef.current.children, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'back.out(1.4)',
        }, 0.75);
      }

      // I. Portrait Photo Card entrance (Desktop & Mobile)
      if (photoCardRef.current) {
        entranceTl.to(photoCardRef.current, {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1.05,
          ease: 'power3.out',
        }, 0.30);
      }
      if (mobilePhotoRef.current) {
        entranceTl.to(mobilePhotoRef.current, {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.95,
          ease: 'power3.out',
        }, 0.30);
      }

      // 2. Seamless Portal Zoom Timeline with pinSpacing: false
      // Explicitly locks all properties at timeline time 0 so that on SCROLL UP,
      // the Stage Aurora & Crimson Fog and all elements return 100% to their full opacity
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top', // Exactly 100vh scroll: connects directly to Experience with zero dead space
          pin: true,
          pinSpacing: false, // Eliminates the 800px gap completely!
          scrub: 0.65, // Silky smooth inertial damping matching Lenis scroll momentum
          fastScrollEnd: false, // CRITICAL: NEVER force to progress 1 on rapid scroll-up!
          preventOverlaps: true,
          anticipatePin: 1,
          onLeaveBack: () => {
            // Guarantee that when scrolled all the way to top, Hero & Aurora & Photos are 100% restored
            if (auroraContainerRef.current) gsap.set(auroraContainerRef.current, { opacity: 1, visibility: 'visible' });
            if (auroraCenterRef.current) gsap.set(auroraCenterRef.current, { opacity: 1, scale: 1 });
            if (fogLeftRef.current) gsap.set(fogLeftRef.current, { opacity: 1, scale: 1 });
            if (fogRightRef.current) gsap.set(fogRightRef.current, { opacity: 1, scale: 1 });
            if (contentWrapperRef.current) gsap.set(contentWrapperRef.current, { opacity: 1, scale: 1, x: 0, y: 0, visibility: 'visible' });
            if (leftColRef.current) gsap.set(leftColRef.current, { opacity: 1, x: 0, y: 0, visibility: 'visible' });
            if (portalContainerRef.current) gsap.set(portalContainerRef.current, { opacity: 1, scale: 1, rotation: 0, xPercent: -50, yPercent: -50, visibility: 'visible' });
            if (photoCardRef.current) gsap.set(photoCardRef.current, { opacity: 1, scale: 1, rotation: 0, x: 0, y: 0, visibility: 'visible' });
            if (mobilePhotoRef.current) gsap.set(mobilePhotoRef.current, { opacity: 1, scale: 1, rotation: 0, x: 0, y: 0, visibility: 'visible' });
            if (ringScaleRef.current) gsap.set(ringScaleRef.current, { scale: 1 });
            if (leftHalfRef.current) gsap.set(leftHalfRef.current, { x: 0 });
            if (rightHalfRef.current) gsap.set(rightHalfRef.current, { x: 0 });
            if (portalAuraRef.current) gsap.set(portalAuraRef.current, { opacity: 0, scale: 0.8 });
          },
        },
      });

      // Step 1: Dispersal on Scroll (0.0 -> 0.24)
      // Desktop: Left Column drifts left, Right Photo drifts right (opening stage for portal)
      // Mobile: Content dissolves smoothly with subtle upward float, eliminating horizontal left-drift
      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

      if (leftColRef.current) {
        scrollTl.fromTo(
          leftColRef.current,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
          },
          {
            autoAlpha: 0,
            x: isDesktop ? -32 : 0,
            y: isDesktop ? 0 : -14,
            duration: 0.24,
            ease: 'sine.out',
          },
          0
        );
      }

      if (photoCardRef.current) {
        scrollTl.fromTo(
          photoCardRef.current,
          {
            autoAlpha: 1,
            x: 0,
          },
          {
            autoAlpha: 0,
            x: 35,
            duration: 0.24,
            ease: 'sine.out',
          },
          0
        );
      }

      if (mobilePhotoRef.current) {
        scrollTl.fromTo(
          mobilePhotoRef.current,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
          },
          {
            autoAlpha: 0,
            scale: 0.94,
            y: -10,
            duration: 0.22,
            ease: 'sine.out',
          },
          0
        );
      }

      if (contentWrapperRef.current) {
        scrollTl.fromTo(
          contentWrapperRef.current,
          {
            autoAlpha: 1,
            scale: 1,
          },
          {
            autoAlpha: 0,
            scale: 0.98,
            duration: 0.26,
            ease: 'sine.out',
          },
          0
        );
      }

      // Step 3: Center Aperture Core Light blooms (0.04 -> 0.50)
      if (portalAuraRef.current) {
        scrollTl.fromTo(
          portalAuraRef.current,
          {
            scale: 1,
            opacity: 0.85,
          },
          {
            scale: 3.5,
            opacity: 0.75,
            duration: 0.30,
            ease: 'sine.out',
          },
          0.04
        );
        scrollTl.to(
          portalAuraRef.current,
          {
            opacity: 0,
            duration: 0.20,
            ease: 'sine.inOut',
          },
          0.34
        );
      }

      // Step 4: BaemonPortalO GPU-Safe Scale-Up Zoom (0.04 -> 0.66)
      // Responsive scale (12 on mobile, 15 on desktop) guarantees the aperture engulfs
      // the screen while keeping the GPU texture well within hardware cache limits (<4096px)
      const targetScale = typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 15;
      if (ringScaleRef.current) {
        scrollTl.fromTo(
          ringScaleRef.current,
          {
            scale: 1,
          },
          {
            scale: targetScale,
            duration: 0.62,
            ease: 'sine.inOut',
          },
          0.04
        );
      }

      // Step 5: Split Halves part outward via clean SVG vector translation (0.04 -> 0.66)
      if (leftHalfRef.current) {
        scrollTl.fromTo(
          leftHalfRef.current,
          {
            x: 0,
          },
          {
            x: -48,
            duration: 0.62,
            ease: 'sine.inOut',
          },
          0.04
        );
      }
      if (rightHalfRef.current) {
        scrollTl.fromTo(
          rightHalfRef.current,
          {
            x: 0,
          },
          {
            x: 48,
            duration: 0.62,
            ease: 'sine.inOut',
          },
          0.04
        );
      }

      // Step 6: Stage Aurora & Crimson Fog dissolves smoothly as portal expands into Experience (0.34 -> 0.68)
      // autoAlpha frees GPU fill-rate resources while browsing Experience and subsequent sections
      if (auroraContainerRef.current) {
        scrollTl.set(auroraContainerRef.current, { autoAlpha: 1 }, 0);
        scrollTl.fromTo(
          auroraContainerRef.current,
          {
            autoAlpha: 1,
          },
          {
            autoAlpha: 0,
            duration: 0.34,
            ease: 'sine.inOut',
          },
          0.34
        );
      }

      // Step 7: Portal Fade-out and layer deactivation as it clears the screen (0.48 -> 0.70)
      // autoAlpha automatically toggles visibility: 'hidden' to eliminate compositing overhead
      if (portalContainerRef.current) {
        scrollTl.fromTo(
          portalContainerRef.current,
          {
            autoAlpha: 1,
          },
          {
            autoAlpha: 0,
            duration: 0.22,
            ease: 'sine.inOut',
          },
          0.48
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [welcomeActive]);

  // Role typewriter logic
  useEffect(() => {
    const currentWord = ROLES[roleIndex];
    let timer;

    if (isWaiting) {
      timer = setTimeout(() => {
        setIsWaiting(false);
        if (isDeleting) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        } else {
          setIsDeleting(true);
        }
      }, isDeleting ? 400 : 2200);
    } else if (isDeleting) {
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
    scrollTo(`#${id}`, { offset: -70 });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{ opacity: 0 }}
      className={`relative w-full h-screen min-h-[620px] flex items-center justify-center overflow-hidden select-none will-change-transform z-10 ${
        welcomeActive ? 'pointer-events-none' : ''
      }`}
    >
      {/* 1. Dedicated Stage Aurora / Crimson Fog Atmosphere (RESTORED & Guaranteed on Scroll-Up) */}
      <div
        ref={auroraContainerRef}
        className="absolute inset-0 pointer-events-none overflow-hidden select-none will-change-transform bg-[#FAFAFA] dark:bg-[#07080B] z-0"
        aria-hidden="true"
      >
        {/* Soft Stage Vignette Mask */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(225,29,46,0.06),rgba(250,250,250,0.75)_65%,rgba(250,250,250,1)_100%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(225,29,46,0.18),rgba(7,8,11,0.85)_70%,rgba(7,8,11,1)_100%)] pointer-events-none" />

        {/* Primary Volumetric Crimson Aurora Fog (Center Top) */}
        <div
          ref={auroraCenterRef}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] sm:w-[50rem] h-[22rem] sm:h-[30rem] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(225,29,46,0.14)_0%,rgba(225,29,46,0.05)_45%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(225,29,46,0.34)_0%,rgba(225,29,46,0.12)_50%,transparent_80%)] blur-xl sm:blur-2xl pointer-events-none will-change-transform transform-gpu"
        />

        {/* Deep Ruby Ambient Smoke (Left Flank) */}
        <div
          ref={fogLeftRef}
          className="absolute top-1/3 left-[15%] -translate-x-1/2 -translate-y-1/2 w-[22rem] sm:w-[28rem] h-[18rem] sm:h-[24rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(225,29,46,0.08)_0%,rgba(136,8,21,0.04)_45%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(136,8,21,0.26)_0%,rgba(225,29,46,0.10)_45%,transparent_70%)] blur-lg sm:blur-xl pointer-events-none will-change-transform transform-gpu"
        />

        {/* Soft Peach-Crimson Rim Glow (Right Flank) */}
        <div
          ref={fogRightRef}
          className="absolute top-1/4 left-[85%] -translate-x-1/2 -translate-y-1/2 w-[20rem] sm:w-[26rem] h-[16rem] sm:h-[22rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,59,77,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,59,77,0.20)_0%,transparent_70%)] blur-lg sm:blur-xl pointer-events-none will-change-transform transform-gpu"
        />

        {/* Smooth Bottom Dissolve to blend seamlessly with main page */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent dark:from-[#0f1117] dark:via-[#0f1117]/60 pointer-events-none" />
      </div>

      {/* 2. BaemonPortalO Emblem: Positioned in the exact CENTER of the screen */}
      <div
        ref={portalContainerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center will-change-transform opacity-0 transform-gpu"
      >
        <BaemonPortalO
          ringScaleRef={ringScaleRef}
          leftHalfRef={leftHalfRef}
          rightHalfRef={rightHalfRef}
          portalAuraRef={portalAuraRef}
        />
      </div>

      {/* 3. Hero Content Wrapper: Split cleanly above/below portal on mobile, left column on desktop */}
      <div
        ref={contentWrapperRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pointer-events-auto will-change-transform h-full flex flex-col justify-between py-20 sm:py-24 lg:h-auto lg:block lg:py-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full h-full lg:h-auto">
          {/* Left Column / Mobile Responsive Wrapper */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between h-full lg:h-auto lg:justify-start lg:space-y-6 max-w-md lg:max-w-[400px] xl:max-w-[440px] text-center sm:text-left items-center sm:items-start mx-auto sm:mx-0 w-full will-change-transform"
          >
            {/* Upper Group (Above portal on mobile, top of column on desktop) */}
            <div className="flex flex-col items-start text-left space-y-2.5 sm:space-y-3.5 w-full">
              {/* Top Row: Live Availability Beacon + Location Badge */}
              <div ref={badgesRef} className="flex flex-wrap items-center justify-start gap-2 sm:gap-2.5 w-full">
                {/* Development Status Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-[#141414] border border-zinc-200/90 dark:border-[#2A2A2A] text-xs font-mono text-zinc-700 dark:text-[#D4D4D8] shadow-xs hover:border-[#E11D2E]/40 transition-colors will-change-transform">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 dark:bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)] dark:shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
                  </span>
                  <span className="font-medium">{personal.availability}</span>
                </div>

                {/* Current Location Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-[#141414] border border-zinc-200/90 dark:border-[#2A2A2A] text-xs font-mono text-zinc-700 dark:text-[#D4D4D8] shadow-xs hover:border-[#E11D2E]/40 transition-colors will-change-transform">
                  <MapPin className="w-3.5 h-3.5 text-[#E11D2E]" />
                  <span className="font-medium">{personal.location || "North Jakarta, Indonesia"}</span>
                </div>
              </div>

              {/* Identity Row: On mobile, Name + Typewriter on Left, Photo Card on Right (Level with Name!) */}
              <div className="flex items-start justify-between gap-3 sm:gap-4 w-full pt-1">
                {/* Primary Identity with Dynamic Typewriter Role */}
                <div className="flex-1 space-y-1.5 sm:space-y-2.5 min-w-0">
                  <h1
                    ref={headlineRef}
                    className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.08] tracking-tighter will-change-transform flex flex-col items-start gap-0.5 sm:gap-1"
                  >
                    <span className="sr-only">{personal.name}</span>
                    <span aria-hidden="true" className="block overflow-hidden py-0.5 -my-0.5">
                      <span className="hero-word-inner inline-block will-change-transform opacity-0 text-zinc-950 dark:text-white hover:text-[#E11D2E] transition-colors">
                        Juan
                      </span>
                    </span>
                    <div aria-hidden="true" className="flex items-center gap-2 sm:gap-3 flex-wrap justify-start">
                      <span className="inline-block overflow-hidden py-0.5 -my-0.5">
                        <span className="hero-word-inner inline-block will-change-transform opacity-0 text-zinc-950 dark:text-white hover:text-[#E11D2E] transition-colors">
                          Sterling
                        </span>
                      </span>

                      {/* BABYMONSTER Devil Emblem */}
                      <div 
                        ref={emblemRef}
                        className="relative inline-flex flex-col items-center justify-center shrink-0 -mt-1 select-none group cursor-default will-change-transform opacity-0"
                        title="BAEMON // 07"
                      >
                        {/* Stylized Devil Horns */}
                        <div className="flex items-center justify-between w-7 sm:w-9 -mb-1 px-0.5 text-[#E11D2E] filter drop-shadow-[0_0_6px_rgba(225,29,46,0.5)] dark:drop-shadow-[0_0_8px_rgba(225,29,46,0.8)] group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 -rotate-12 transform" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
                          </svg>
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 rotate-12 transform scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
                          </svg>
                        </div>

                        {/* Badge Container */}
                        <div className="p-1 sm:p-2 rounded-xl bg-white dark:bg-[#090909] border border-[#E11D2E]/35 dark:border-[#E11D2E]/50 shadow-md shadow-[#E11D2E]/10 dark:shadow-[#E11D2E]/20 group-hover:shadow-lg group-hover:shadow-[#E11D2E]/25 dark:group-hover:shadow-[#E11D2E]/35 group-hover:border-[#E11D2E] transition-all duration-300 relative">
                          <div className="absolute inset-0 rounded-xl bg-[#E11D2E]/8 dark:bg-[#E11D2E]/20 blur-xs pointer-events-none animate-pulse" />
                          <Code2 className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#E11D2E] relative z-10" />
                        </div>
                      </div>
                    </div>
                  </h1>

                  {/* Dynamic Role with Typewriter & Blinking Caret */}
                  <div ref={roleRef} className="inline-flex items-center gap-2 font-mono text-xs sm:text-base md:text-xl font-semibold tracking-tight min-h-[1.75rem] sm:min-h-[2.25rem] opacity-0 will-change-transform">
                    <span className="text-[#E11D2E] font-bold select-none">//</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium tracking-normal">
                      {displayedRole}
                    </span>
                    <span className="inline-block w-2 sm:w-2.5 h-3.5 sm:h-6 bg-[#E11D2E] animate-pulse rounded-xs shadow-[0_0_6px_rgba(225,29,46,0.6)] dark:shadow-[0_0_8px_rgba(225,29,46,0.8)]" aria-hidden="true" />
                  </div>
                </div>

                {/* Mobile / Tablet Portrait Photo Card (Sejajar dengan nama pada HP!) */}
                <div
                  ref={mobilePhotoRef}
                  className="lg:hidden shrink-0 self-start mt-2 sm:mt-1 opacity-0 will-change-transform"
                >
                  <div className="relative group">
                    {/* Soft crimson ambient backlight */}
                    <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#E11D2E]/25 via-[#FF3B4D]/15 to-transparent blur-md rounded-2xl -z-10 dark:opacity-80 opacity-40 pointer-events-none" />

                    {/* Frame */}
                    <div className="relative w-20 h-28 sm:w-24 sm:h-34 rounded-2xl overflow-hidden border border-zinc-200/90 dark:border-white/10 shadow-lg shadow-black/10 dark:shadow-[#E11D2E]/20 bg-zinc-100 dark:bg-[#121214]">
                      <img
                        src={HERO_PHOTO_URL}
                        alt="Juan Sterling"
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                        decoding="async"
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/20 dark:ring-white/10 rounded-2xl pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lower Group (Below portal on mobile, bottom of column on desktop) */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-4 w-full pt-4 sm:pt-6 lg:pt-0">
              {/* Concise Professional Introduction */}
              <div ref={taglineRef} className="opacity-0 will-change-transform max-w-xs sm:max-w-md lg:max-w-[390px] xl:max-w-[420px]">
                <p className="text-xs sm:text-base md:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans font-normal">
                  {personal.tagline}
                </p>
              </div>

              {/* CTAs with Micro-Animations */}
              <div ref={ctaRef} className="pt-1 sm:pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 w-full max-w-[420px]">
                <button
                  type="button"
                  onClick={() => scrollToSection('experience')}
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 h-10 sm:h-12 rounded-md bg-[#E11D2E] hover:bg-[#FF3B4D] active:scale-95 text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-md shadow-[#E11D2E]/25 hover:shadow-[#E11D2E]/50 cursor-pointer overflow-hidden whitespace-nowrap will-change-transform"
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
                  className="flex-1 sm:flex-initial group inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 h-10 sm:h-12 rounded-md bg-white/95 dark:bg-[#141414] hover:bg-zinc-50 dark:hover:bg-[#1c1c1c] active:scale-95 text-zinc-900 dark:text-white border border-zinc-200/90 dark:border-[#2A2A2A] hover:border-[#E11D2E]/60 font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm whitespace-nowrap will-change-transform"
                  aria-label="View CV Juan Sterling"
                >
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 dark:text-[#A1A1AA] group-hover:text-[#E11D2E] transition-colors shrink-0" />
                  <span>View CV</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 dark:text-zinc-500 group-hover:text-[#E11D2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="flex-1 sm:flex-initial group inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 h-10 sm:h-12 rounded-md bg-white/95 dark:bg-[#141414] hover:bg-zinc-50 dark:hover:bg-[#1c1c1c] active:scale-95 text-zinc-900 dark:text-white border border-zinc-200/90 dark:border-[#2A2A2A] hover:border-[#E11D2E]/60 font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm whitespace-nowrap will-change-transform"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 dark:text-[#A1A1AA] group-hover:text-[#E11D2E] transition-colors shrink-0" />
                  <span>Contact Me</span>
                  <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 dark:text-[#A1A1AA] group-hover:text-[#E11D2E] group-hover:translate-y-0.5 transition-all duration-200 shrink-0" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Portrait Photo Card on Desktop (Refined Compact Size) */}
          <div
            ref={photoCardRef}
            className="hidden lg:flex lg:col-span-7 xl:col-span-7 justify-end items-center h-full will-change-transform opacity-0 pointer-events-auto"
          >
            <div className="relative">
              {/* Volumetric Soft Crimson Aura behind Portrait */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#E11D2E]/20 via-[#FF3B4D]/10 to-transparent blur-2xl rounded-3xl -z-10 dark:opacity-90 opacity-40 pointer-events-none" />

              {/* Minimalist Precision Photo Frame (Refined compact dimensions for PC) */}
              <div className="relative w-[210px] lg:w-[230px] xl:w-[255px] 2xl:w-[280px] aspect-[3/4] rounded-2xl xl:rounded-3xl overflow-hidden border border-zinc-200/90 dark:border-white/10 shadow-2xl shadow-zinc-950/15 dark:shadow-black/70 bg-zinc-100 dark:bg-[#121214]">
                <img
                  src={HERO_PHOTO_URL}
                  alt="Juan Sterling"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  decoding="async"
                />

                {/* Subtle Inner Glass Highlight */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/25 dark:ring-white/10 rounded-2xl xl:rounded-3xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
