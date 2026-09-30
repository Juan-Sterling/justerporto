import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * LaserSectionDivider
 * Minimalist, high-tech horizontal laser divider with center core spark.
 * Uses GSAP ScrollTrigger with scrub to expand from center outwards as user scrolls.
 */
export default function LaserSectionDivider() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const coreRef = useRef(null);
  const bloomRef = useRef(null);
  const flareRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State: Laser is closed at center
      gsap.set(lineRef.current, { scaleX: 0, opacity: 0, transformOrigin: 'center center' });
      gsap.set(bloomRef.current, { scaleX: 0, opacity: 0, transformOrigin: 'center center' });
      gsap.set(coreRef.current, { scale: 0, opacity: 0 });
      gsap.set(flareRef.current, { scale: 0.3, opacity: 0 });

      // 2. Scroll-driven timeline (scrubbed with Lenis scroll)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 92%',
          end: 'top 48%',
          scrub: 0.6,
        },
      });

      // Step 1: Center core spark lights up
      tl.to(coreRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out',
      }, 0);

      // Step 2: Soft radial crimson flare glows outward
      tl.to(flareRef.current, {
        scale: 1.3,
        opacity: 0.75,
        duration: 0.35,
        ease: 'power2.out',
      }, 0.05);

      // Step 3: Razor-sharp laser line shoots across from center to edges
      tl.to(lineRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
      }, 0.1);

      // Step 4: Secondary neon bloom expands
      tl.to(bloomRef.current, {
        scaleX: 1,
        opacity: 0.85,
        duration: 0.65,
        ease: 'power2.out',
      }, 0.15);

      // Step 5: Soft steady state when passing viewport center
      tl.to(flareRef.current, {
        opacity: 0.4,
        scale: 0.9,
        duration: 0.3,
      }, 0.75);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto h-8 sm:h-12 flex items-center justify-center pointer-events-none select-none overflow-visible px-4 my-2 sm:my-4"
      aria-hidden="true"
    >
      {/* Soft Center Crimson Glow Flare */}
      <div
        ref={flareRef}
        className="absolute w-48 sm:w-80 h-10 rounded-full bg-[#E11D2E]/25 blur-xl pointer-events-none will-change-transform"
      />

      {/* Secondary Soft Neon Bloom Line */}
      <div
        ref={bloomRef}
        className="absolute left-1/6 right-1/6 h-[3px] bg-gradient-to-r from-transparent via-[#FF3B4D] to-transparent blur-[2.5px] pointer-events-none will-change-transform"
      />

      {/* Primary Razor-Sharp Crimson Laser Line */}
      <div
        ref={lineRef}
        className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E11D2E] to-transparent shadow-[0_0_12px_rgba(225,29,46,0.9)] will-change-transform"
      />

      {/* Center White Core Spark */}
      <div
        ref={coreRef}
        className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#FFFFFF,0_0_18px_#E11D2E] z-10 will-change-transform"
      />
    </div>
  );
}
