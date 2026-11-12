import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, FileText, ExternalLink, Mail, Code2, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import BaemonPortalO from '../components/BaemonPortalO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  "Full Stack Developer",
  "Software Developer",
];

const TAGLINE_VARIANT_ORDER = ['solid', 'crimson', 'split'];

const TAGLINE_VARIANT_CLASSES = {
  solid: 'text-zinc-950 dark:text-white',
  crimson: 'text-[#E11D2E] dark:drop-shadow-[0_0_12px_rgba(225,29,46,0.55)]',
};

/**
 * Splits a keyword into two halves for the dual-tone split variant (e.g. TECH + NOLOGY).
 */
function splitKeywordHalves(keyword) {
  const lower = keyword.toLowerCase();
  const splitIndex = lower.startsWith('tech') && keyword.length > 4
    ? 4
    : Math.ceil(keyword.length / 2);

  return [keyword.slice(0, splitIndex), keyword.slice(splitIndex)];
}

/**
 * Splits a tagline entry into a light connector prefix and bold emphasized keyword.
 */
function parseTaglineLine(entry, index) {
  const defaultVariant = TAGLINE_VARIANT_ORDER[index % TAGLINE_VARIANT_ORDER.length];
  if (entry && typeof entry === 'object') {
    return {
      prefix: entry.prefix ?? '',
      keyword: entry.keyword ?? '',
      variant: entry.variant ?? defaultVariant,
    };
  }

  const text = String(entry ?? '').trim();
  const splitAt = text.lastIndexOf(' ');
  if (splitAt === -1) {
    return { prefix: '', keyword: text, variant: defaultVariant };
  }

  return {
    prefix: text.slice(0, splitAt),
    keyword: text.slice(splitAt + 1),
    variant: defaultVariant,
  };
}

/**
 * Renders the multi-line editorial tagline block with vertical accent bar
 * and sequential line-by-line scale highlight animation.
 */
function TaglineBlock({
  isTaglineArray,
  taglineEntries,
  fallbackText,
  desktop = false,
  activeIndex = -1,
}) {
  const containerClass = desktop
    ? 'pl-4 xl:pl-5 py-1 gap-2.5 xl:gap-3.5 items-start text-left'
    : 'py-0.5 gap-1 sm:gap-1.5 items-center text-center';
  const lineTextClass = desktop
    ? 'lg:text-[19px] xl:text-[1.4rem] 2xl:text-[1.6rem] leading-snug'
    : 'text-xs sm:text-sm md:text-base leading-snug';
  const hasSpotlight = activeIndex >= 0;
  const activeScale = desktop ? 1.1 : 1.06;

  return (
    <div className={`relative flex flex-col ${containerClass}`}>
      {desktop ? (
        <span
          aria-hidden="true"
          className="absolute left-0 top-0.5 bottom-0.5 w-[3px] rounded-full bg-gradient-to-b from-[#E11D2E] via-[#E11D2E] to-[#E11D2E]/35 dark:shadow-[0_0_10px_rgba(225,29,46,0.45)]"
        />
      ) : (
        <span
          aria-hidden="true"
          className="w-10 h-[2px] mb-1 rounded-full bg-gradient-to-r from-[#E11D2E]/25 via-[#E11D2E] to-[#E11D2E]/25 dark:shadow-[0_0_8px_rgba(225,29,46,0.45)]"
        />
      )}
      {isTaglineArray ? (
        taglineEntries.map(({ prefix, keyword, variant }, index) => {
          const [splitLead, splitTail] = variant === 'split' && keyword
            ? splitKeywordHalves(keyword)
            : ['', ''];
          const variantClass = TAGLINE_VARIANT_CLASSES[variant] || TAGLINE_VARIANT_CLASSES.solid;
          const isActive = hasSpotlight && index === activeIndex;

          return (
            <motion.p
              key={`${index}-${keyword}`}
              animate={{
                scale: isActive ? activeScale : 1,
                opacity: !hasSpotlight || isActive ? 1 : 0.68,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 22,
                mass: 0.9,
              }}
              style={{ transformOrigin: desktop ? 'left center' : 'center center' }}
              className={`${lineTextClass} font-sans will-change-transform`}
            >
              {prefix && (
                <span className="font-light tracking-[0.08em] text-zinc-600 dark:text-zinc-400 mr-1">
                  {prefix}{' '}
                </span>
              )}
              {keyword && (
                variant === 'split' ? (
                  <span className="font-extrabold tracking-[0.05em]">
                    <span className={TAGLINE_VARIANT_CLASSES.crimson}>{splitLead}</span>
                    <span className={TAGLINE_VARIANT_CLASSES.solid}>{splitTail}</span>
                  </span>
                ) : (
                  <span className={`font-extrabold tracking-[0.05em] ${variantClass}`}>
                    {keyword}
                  </span>
                )
              )}
            </motion.p>
          );
        })
      ) : (
        <p className={`${lineTextClass} text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans font-normal`}>
          {fallbackText}
        </p>
      )}
    </div>
  );
}

export default function Hero({ welcomeActive = false, portalEntranceTrigger = null }) {
  const { personal } = portfolioData;
  const { scrollTo } = useSmoothScroll();

  // Root Hero Section Ref (Pinned by ScrollTrigger)
  const heroRef = useRef(null);

  // BaemonPortalO Animated Refs
  const portalContainerRef = useRef(null);
  const portalEntranceRef = useRef(null);
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

  // Hero Right-Column Tagline Ref (Desktop)
  const desktopTaglineRef = useRef(null);

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
  const [activeTaglineIndex, setActiveTaglineIndex] = useState(0);

  // 0. Synchronously prime all initial hidden states for ALL Hero elements
  const primeAllHeroElements = useCallback(() => {
    // Kill existing tweens on hero entrance elements
    const elementsToKill = [
      auroraCenterRef.current,
      fogLeftRef.current,
      fogRightRef.current,
      portalContainerRef.current,
      portalEntranceRef.current,
      portalAuraRef.current,
      badgesRef.current?.children,
      emblemRef.current,
      roleRef.current,
      taglineRef.current,
      ctaRef.current?.children,
      desktopTaglineRef.current,
    ].filter(Boolean);
    gsap.killTweensOf(elementsToKill);
    if (heroRef.current) {
      gsap.killTweensOf(heroRef.current.querySelectorAll('.hero-word-inner'));
    }

    if (auroraContainerRef.current) gsap.set(auroraContainerRef.current, { opacity: 1 });
    if (auroraCenterRef.current) gsap.set(auroraCenterRef.current, { scale: 0.85, opacity: 0 });
    if (fogLeftRef.current) gsap.set(fogLeftRef.current, { scale: 0.9, opacity: 0 });
    if (fogRightRef.current) gsap.set(fogRightRef.current, { scale: 0.9, opacity: 0 });

    if (portalContainerRef.current) {
      gsap.set(portalContainerRef.current, {
        autoAlpha: 1,
        scale: 1,
        rotation: 0,
        y: 0,
      });
    }
    if (portalEntranceRef.current) {
      gsap.set(portalEntranceRef.current, {
        scale: 0.82,
        rotation: -90,
        autoAlpha: 0,
        y: 0,
        transformOrigin: '50% 50%',
        force3D: true,
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
    if (badgesRef.current?.children) gsap.set(badgesRef.current.children, { y: -24, opacity: 0, scale: 0.95 });
    if (heroRef.current) {
      const words = heroRef.current.querySelectorAll('.hero-word-inner');
      if (words.length > 0) gsap.set(words, { yPercent: 125, opacity: 0 });
    }
    if (emblemRef.current) gsap.set(emblemRef.current, { scale: 0, rotation: -25, opacity: 0 });
    if (roleRef.current) gsap.set(roleRef.current, { x: -20, opacity: 0 });
    if (taglineRef.current) gsap.set(taglineRef.current, { y: 22, opacity: 0 });
    if (ctaRef.current?.children) gsap.set(ctaRef.current.children, { y: 22, opacity: 0, scale: 0.96 });
    if (desktopTaglineRef.current) {
      gsap.set(desktopTaglineRef.current, {
        x: 24,
        y: 16,
        opacity: 0,
      });
    }

    if (heroRef.current) gsap.set(heroRef.current, { opacity: 1 });
  }, []);

  // 1. Entrance Timeline for ALL Hero elements
  const playFullHeroEntrance = useCallback(() => {
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
    if (portalEntranceRef.current) {
      entranceTl.to(portalEntranceRef.current, {
        scale: 1,
        rotation: 0,
        autoAlpha: 1,
        y: 0,
        duration: 1.25,
        ease: 'power3.out',
        force3D: true,
      }, 0.08);
    }
    if (portalAuraRef.current) {
      entranceTl.to(portalAuraRef.current, { scale: 1, opacity: 0.85, duration: 0.9, ease: 'power2.out' }, 0.12);
    }

    // C. Top Row: Availability Beacon + Location Badge slide down
    if (badgesRef.current?.children) {
      entranceTl.to(badgesRef.current.children, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 }, 0.15);
    }

    // D. Staggered clip reveal for headline words ("Juan Sterling")
    if (heroRef.current) {
      const words = heroRef.current.querySelectorAll('.hero-word-inner');
      if (words.length > 0) {
        entranceTl.to(words, {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power4.out',
        }, 0.22);
      }
    }

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

    // G. Mobile Editorial Tagline fade & float up (below BaemonPortalO on mobile)
    if (taglineRef.current) {
      entranceTl.to(taglineRef.current, { y: 0, opacity: 1, duration: 0.65 }, 0.60);
    }

    // H. CTAs with spring stagger
    if (ctaRef.current?.children) {
      entranceTl.to(ctaRef.current.children, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        stagger: 0.08,
        ease: 'back.out(1.4)',
      }, 0.75);
    }

    // I. Desktop Right-Column Tagline entrance
    if (desktopTaglineRef.current) {
      entranceTl.to(desktopTaglineRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
      }, 0.50);
    }

    return entranceTl;
  }, []);

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
      primeAllHeroElements();

      // 1. Entrance Timeline (Plays once welcome screen dismisses)
      playFullHeroEntrance();

      // 2. Seamless Portal Zoom Timeline with pinSpacing: false
      // Explicitly locks all properties at timeline time 0 so that on SCROLL UP,
      // the Stage Aurora & Crimson Fog and all elements return 100% to their full opacity
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          id: 'hero',
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
            if (portalContainerRef.current) gsap.set(portalContainerRef.current, { opacity: 1, scale: 1, rotation: 0, visibility: 'visible' });
            if (desktopTaglineRef.current) gsap.set(desktopTaglineRef.current, { opacity: 1, x: 0, y: 0, visibility: 'visible' });
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
            immediateRender: false,
          },
          0
        );
      }

      if (desktopTaglineRef.current) {
        scrollTl.fromTo(
          desktopTaglineRef.current,
          {
            autoAlpha: 1,
            x: 0,
          },
          {
            autoAlpha: 0,
            x: 35,
            duration: 0.24,
            ease: 'sine.out',
            immediateRender: false,
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
            immediateRender: false,
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
            immediateRender: false,
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
            immediateRender: false,
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
            immediateRender: false,
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
            immediateRender: false,
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
        scrollTl.set(portalContainerRef.current, { autoAlpha: 1 }, 0);
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

  // Handle Hero Initial Prime State on return from Side Profile (behind WelcomeScreen)
  useEffect(() => {
    if (!portalEntranceTrigger || !portalEntranceTrigger.phase) return;

    if (portalEntranceTrigger.phase === 'prime') {
      primeAllHeroElements();
    }
  }, [portalEntranceTrigger, primeAllHeroElements]);

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
  const isTaglineArray = Array.isArray(personal.tagline);
  const taglineEntries = isTaglineArray
    ? personal.tagline.filter(Boolean).map(parseTaglineLine)
    : [];
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const effectiveTaglineIndex =
    prefersReducedMotion || !isTaglineArray || taglineEntries.length <= 1
      ? -1
      : activeTaglineIndex;

  useEffect(() => {
    if (welcomeActive || prefersReducedMotion || !isTaglineArray || taglineEntries.length <= 1) {
      return;
    }

    const lineCount = taglineEntries.length;
    const intervalId = window.setInterval(() => {
      setActiveTaglineIndex((prev) => (prev + 1) % lineCount);
    }, 1350);

    return () => window.clearInterval(intervalId);
  }, [welcomeActive, prefersReducedMotion, isTaglineArray, taglineEntries.length]);

  const scrollToSection = (id) => {
    scrollTo(`#${id}`, { offset: -70 });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{ opacity: 0 }}
      className={`relative w-full h-screen min-h-[620px] flex items-center justify-center overflow-hidden select-none will-change-transform z-10 ${welcomeActive ? 'pointer-events-none' : ''
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

      {/* 2. BaemonPortalO Emblem: Centered in Hero section */}
      <div
        ref={portalContainerRef}
        className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center will-change-transform"
      >
        <div
          ref={portalEntranceRef}
          className="flex items-center justify-center will-change-transform opacity-0"
        >
          <BaemonPortalO
            ringScaleRef={ringScaleRef}
            leftHalfRef={leftHalfRef}
            rightHalfRef={rightHalfRef}
            portalAuraRef={portalAuraRef}
          />
        </div>
      </div>

      {/* 3. Hero Content Wrapper: Split cleanly above/below portal on mobile, left column on desktop */}
      <div
        ref={contentWrapperRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pointer-events-auto will-change-transform h-full flex flex-col justify-between pt-[86px] pb-24 sm:pt-24 sm:pb-28 lg:h-auto lg:block lg:py-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full h-full lg:h-auto">
          {/* Left Column / Mobile Responsive Wrapper */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between h-full lg:h-auto lg:justify-start lg:space-y-6 max-w-lg lg:max-w-[500px] xl:max-w-[540px] text-center lg:text-left items-center lg:items-start mx-auto lg:mx-0 w-full will-change-transform"
          >
            {/* Upper Group (Centered above portal on mobile, top of column on desktop) */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-1.5 sm:space-y-2.5 w-full">
              {/* Top Row: Location Badge + Live Availability Status (Side-by-Side & Mobile Responsive) */}
              <div ref={badgesRef} className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2.5 w-full flex-nowrap">
                {/* 1. Current Location Badge */}
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 dark:bg-[#141414] border border-zinc-200/90 dark:border-[#2A2A2A] text-[11px] sm:text-xs font-mono text-zinc-700 dark:text-[#D4D4D8] shadow-xs hover:border-[#E11D2E]/40 transition-colors will-change-transform cursor-default shrink-0"
                >
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E11D2E]" />
                  <span className="font-medium whitespace-nowrap">
                    North Jakarta<span className="hidden sm:inline">, Indonesia</span>
                  </span>
                </motion.div>

                {/* 2. Development Status Badge (Dipindah ke samping tulisan North Jakarta) */}
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 dark:bg-[#141414] border border-zinc-200/90 dark:border-[#2A2A2A] text-[11px] sm:text-xs font-mono text-zinc-700 dark:text-[#D4D4D8] shadow-xs hover:border-[#E11D2E]/40 transition-colors will-change-transform cursor-default shrink-0"
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 dark:bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)] dark:shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
                  </span>
                  <span className="font-medium whitespace-nowrap">
                    Under Development<span className="hidden md:inline"> • Feel Free to Explore</span>
                  </span>
                </motion.div>
              </div>

              {/* Identity Row: Side-by-side name above portal on mobile (horn centered below), stacked left on desktop */}
              <div className="flex flex-col items-center lg:items-start w-full pt-3 sm:pt-4 lg:pt-1">
                {/* Primary Identity with Dynamic Typewriter Role */}
                <div className="space-y-1.5 sm:space-y-2.5 min-w-0 flex flex-col items-center lg:items-start">
                  <h1
                    ref={headlineRef}
                    className="font-display text-[2.1rem] xs:text-4xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.05] tracking-tighter will-change-transform flex flex-row flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1.5 lg:grid lg:grid-cols-[auto_auto] lg:items-center lg:justify-start lg:gap-x-2.5 lg:gap-y-1"
                  >
                    <span className="sr-only">{personal.name}</span>
                    <span aria-hidden="true" className="block overflow-hidden py-0.5 -my-0.5 lg:col-span-2 lg:justify-self-start">
                      <span className="hero-word-inner inline-block will-change-transform opacity-0 text-zinc-950 dark:text-white hover:text-[#E11D2E] transition-colors">
                        Juan
                      </span>
                    </span>
                    <span aria-hidden="true" className="block overflow-hidden py-0.5 -my-0.5 lg:justify-self-start">
                      <span className="hero-word-inner inline-block will-change-transform opacity-0 text-zinc-950 dark:text-white hover:text-[#E11D2E] transition-colors">
                        Sterling
                      </span>
                    </span>

                    {/* BABYMONSTER Devil Emblem */}
                    <div aria-hidden="true" className="basis-full flex justify-center lg:basis-auto lg:inline-flex lg:justify-start">
                      <div
                        ref={emblemRef}
                        className="relative inline-flex flex-col items-center justify-center shrink-0 mt-0.5 lg:-mt-1 select-none group cursor-default will-change-transform opacity-0"
                        title="BAEMON // 07"
                      >
                        {/* Stylized Devil Horns */}
                        <div className="flex items-center justify-between w-8 sm:w-9 -mb-0.5 sm:-mb-1 px-0.5 text-[#E11D2E] filter drop-shadow-[0_0_6px_rgba(225,29,46,0.5)] dark:drop-shadow-[0_0_8px_rgba(225,29,46,0.8)] group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 -rotate-12 transform" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
                          </svg>
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 rotate-12 transform scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
                          </svg>
                        </div>

                        {/* Badge Container */}
                        <div className="p-1.5 sm:p-2 rounded-xl bg-white dark:bg-[#090909] border border-[#E11D2E]/35 dark:border-[#E11D2E]/50 shadow-md shadow-[#E11D2E]/10 dark:shadow-[#E11D2E]/20 group-hover:shadow-lg group-hover:shadow-[#E11D2E]/25 dark:group-hover:shadow-[#E11D2E]/35 group-hover:border-[#E11D2E] transition-all duration-300 relative">
                          <div className="absolute inset-0 rounded-xl bg-[#E11D2E]/8 dark:bg-[#E11D2E]/20 blur-xs pointer-events-none animate-pulse" />
                          <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#E11D2E] relative z-10" />
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
              </div>
            </div>

            {/* Lower Group (Centered below portal on mobile, CTAs on left column for desktop) */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-7 lg:space-y-4 w-full lg:pt-0">
              {/* Mobile / Tablet Editorial Tagline (Centered below BaemonPortalO) */}
              <div
                ref={taglineRef}
                className="lg:hidden opacity-0 will-change-transform self-center text-center max-w-xs sm:max-w-md"
              >
                <TaglineBlock
                  isTaglineArray={isTaglineArray}
                  taglineEntries={taglineEntries}
                  fallbackText={personal.tagline}
                  activeIndex={effectiveTaglineIndex}
                />
              </div>

              {/* CTAs with Motion Micro-Animations */}
              <div ref={ctaRef} className="pt-1 sm:pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 w-full max-w-[420px]">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={() => scrollToSection('experience')}
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 h-10 sm:h-12 rounded-md bg-[#E11D2E] hover:bg-[#FF3B4D] text-white font-medium text-xs sm:text-sm transition-colors duration-200 shadow-md shadow-[#E11D2E]/25 hover:shadow-[#E11D2E]/50 cursor-pointer overflow-hidden whitespace-nowrap will-change-transform"
                >
                  {/* Shimmer sweep effect */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  <span>View Experience</span>
                  <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-0.5 transition-transform shrink-0" />
                </motion.button>

                <motion.a
                  href={personal.resumeUrl || "https://drive.google.com/file/d/1g20NBQXWuKxJ4v7qwXC4Py855tLvzRNJ/view?usp=sharing"}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="flex-1 sm:flex-initial group inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 h-10 sm:h-12 rounded-md bg-white/95 dark:bg-[#141414] hover:bg-zinc-50 dark:hover:bg-[#1c1c1c] text-zinc-900 dark:text-white border border-zinc-200/90 dark:border-[#2A2A2A] hover:border-[#E11D2E]/60 font-medium text-xs sm:text-sm transition-colors duration-200 cursor-pointer shadow-xs hover:shadow-sm whitespace-nowrap will-change-transform"
                  aria-label="View CV Juan Sterling"
                >
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 dark:text-[#A1A1AA] group-hover:text-[#E11D2E] transition-colors shrink-0" />
                  <span>View CV</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 dark:text-zinc-500 group-hover:text-[#E11D2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                </motion.a>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={() => scrollToSection('contact')}
                  className="flex-1 sm:flex-initial group inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 h-10 sm:h-12 rounded-md bg-white/95 dark:bg-[#141414] hover:bg-zinc-50 dark:hover:bg-[#1c1c1c] text-zinc-900 dark:text-white border border-zinc-200/90 dark:border-[#2A2A2A] hover:border-[#E11D2E]/60 font-medium text-xs sm:text-sm transition-colors duration-200 cursor-pointer shadow-xs hover:shadow-sm whitespace-nowrap will-change-transform"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 dark:text-[#A1A1AA] group-hover:text-[#E11D2E] transition-colors shrink-0" />
                  <span>Contact Me</span>
                  <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 dark:text-[#A1A1AA] group-hover:text-[#E11D2E] group-hover:translate-y-0.5 transition-all duration-200 shrink-0" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Tagline Replacing Hero Portrait on Desktop */}
          <div
            ref={desktopTaglineRef}
            className="hidden lg:flex lg:col-span-7 xl:col-span-7 justify-end items-center h-full will-change-transform opacity-0 pointer-events-auto lg:pr-6 xl:pr-8"
          >
            <div className="text-left max-w-[380px] xl:max-w-[460px] 2xl:max-w-[520px]">
              <TaglineBlock
                isTaglineArray={isTaglineArray}
                taglineEntries={taglineEntries}
                fallbackText={personal.tagline}
                desktop
                activeIndex={effectiveTaglineIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
