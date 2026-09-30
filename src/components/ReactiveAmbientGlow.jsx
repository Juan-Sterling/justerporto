import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ReactiveAmbientGlow
 * Atmospheric crimson radial glow that dynamically glides across the background
 * to illuminate whichever section is currently active:
 * - Hero: Center-Top (framing title & badges)
 * - Experience: Drifts to Left (framing vertical laser timeline)
 * - Skills: Centers and Expands (illuminating tech stack grid)
 * - Education: Drifts to Right (framing certificate cards)
 * - Contact: Centers at bottom (framing contact form & footer)
 */
export default function ReactiveAmbientGlow() {
  const containerRef = useRef(null);
  const primaryOrbRef = useRef(null);
  const secondaryOrbRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State (At Hero: 0 opacity so Hero's dedicated stage aurora shines alone)
      gsap.set(primaryOrbRef.current, {
        top: '18%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        scale: 1,
        opacity: 0,
      });

      gsap.set(secondaryOrbRef.current, {
        top: '32%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        scale: 0.8,
        opacity: 0,
      });

      // 2. Continuous Scroll-Driven Atmosphere Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2, // Smooth follow-through inertia driven by Lenis
        },
      });

      // Step 1: Scroll into Experience (Orb drifts to the left along timeline)
      tl.to(primaryOrbRef.current, {
        top: '30%',
        left: '26%',
        scale: 1.15,
        opacity: 0.9,
        ease: 'power1.inOut',
      }, 0.15)
      .to(secondaryOrbRef.current, {
        top: '38%',
        left: '40%',
        scale: 0.9,
        opacity: 0.6,
        ease: 'power1.inOut',
      }, 0.15);

      // Step 2: Scroll into Skills (Orb centers and blooms wide across tech badges)
      tl.to(primaryOrbRef.current, {
        top: '50%',
        left: '50%',
        scale: 1.35,
        opacity: 0.95,
        ease: 'power1.inOut',
      }, 0.40)
      .to(secondaryOrbRef.current, {
        top: '56%',
        left: '65%',
        scale: 1.05,
        opacity: 0.65,
        ease: 'power1.inOut',
      }, 0.40);

      // Step 3: Scroll into Education (Orb drifts to the right along certificate cards)
      tl.to(primaryOrbRef.current, {
        top: '70%',
        left: '72%',
        scale: 1.2,
        opacity: 0.85,
        ease: 'power1.inOut',
      }, 0.68)
      .to(secondaryOrbRef.current, {
        top: '68%',
        left: '30%',
        scale: 0.85,
        opacity: 0.5,
        ease: 'power1.inOut',
      }, 0.68);

      // Step 4: Scroll into Contact (Orb centers at bottom)
      tl.to(primaryOrbRef.current, {
        top: '88%',
        left: '50%',
        scale: 1.1,
        opacity: 0.9,
        ease: 'power1.inOut',
      }, 0.92)
      .to(secondaryOrbRef.current, {
        top: '84%',
        left: '50%',
        scale: 0.9,
        opacity: 0.6,
        ease: 'power1.inOut',
      }, 0.92);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Primary Reactive Radial Glow Orb */}
      <div
        ref={primaryOrbRef}
        className="absolute w-[34rem] sm:w-[48rem] h-[34rem] sm:h-[48rem] rounded-full bg-[#E11D2E]/12 dark:bg-[#E11D2E]/18 blur-[120px] sm:blur-[160px] will-change-transform"
      />

      {/* Secondary Soft Rim Accent Orb */}
      <div
        ref={secondaryOrbRef}
        className="absolute w-72 sm:w-[30rem] h-72 sm:h-[30rem] rounded-full bg-[#FF4D5E]/8 dark:bg-[#FF4D5E]/12 blur-[100px] sm:blur-[140px] will-change-transform"
      />
    </div>
  );
}
