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
        top: 0,
        left: 0,
        xPercent: -50,
        yPercent: -50,
        x: '50vw',
        y: '20vh',
        scale: 1,
        opacity: 0,
      });

      gsap.set(secondaryOrbRef.current, {
        top: 0,
        left: 0,
        xPercent: -50,
        yPercent: -50,
        x: '50vw',
        y: '30vh',
        scale: 0.8,
        opacity: 0,
      });

      // 2. Continuous Scroll-Driven Atmosphere Timeline (Hardware-accelerated transforms only)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8, // Snappy 0.8s responsive scrub
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      // Step 1: Scroll into Experience (Orb drifts to the left along timeline)
      tl.to(primaryOrbRef.current, {
        x: '26vw',
        y: '32vh',
        scale: 1.15,
        opacity: 0.85,
        ease: 'power1.inOut',
      }, 0.15)
      .to(secondaryOrbRef.current, {
        x: '38vw',
        y: '40vh',
        scale: 0.9,
        opacity: 0.55,
        ease: 'power1.inOut',
      }, 0.15);

      // Step 2: Scroll into Skills (Orb centers and blooms wide across tech badges)
      tl.to(primaryOrbRef.current, {
        x: '50vw',
        y: '50vh',
        scale: 1.3,
        opacity: 0.9,
        ease: 'power1.inOut',
      }, 0.40)
      .to(secondaryOrbRef.current, {
        x: '62vw',
        y: '56vh',
        scale: 1.0,
        opacity: 0.6,
        ease: 'power1.inOut',
      }, 0.40);

      // Step 3: Scroll into Education (Orb drifts to the right along certificate cards)
      tl.to(primaryOrbRef.current, {
        x: '72vw',
        y: '70vh',
        scale: 1.2,
        opacity: 0.85,
        ease: 'power1.inOut',
      }, 0.68)
      .to(secondaryOrbRef.current, {
        x: '30vw',
        y: '68vh',
        scale: 0.85,
        opacity: 0.5,
        ease: 'power1.inOut',
      }, 0.68);

      // Step 4: Scroll into Contact (Orb centers at bottom)
      tl.to(primaryOrbRef.current, {
        x: '50vw',
        y: '86vh',
        scale: 1.1,
        opacity: 0.85,
        ease: 'power1.inOut',
      }, 0.92)
      .to(secondaryOrbRef.current, {
        x: '50vw',
        y: '82vh',
        scale: 0.9,
        opacity: 0.55,
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
        className="absolute w-[30rem] sm:w-[44rem] h-[30rem] sm:h-[44rem] rounded-full bg-[#E11D2E]/10 dark:bg-[#E11D2E]/16 blur-[60px] sm:blur-[90px] will-change-transform"
      />

      {/* Secondary Soft Rim Accent Orb */}
      <div
        ref={secondaryOrbRef}
        className="absolute w-64 sm:w-[26rem] h-64 sm:h-[26rem] rounded-full bg-[#FF4D5E]/8 dark:bg-[#FF4D5E]/12 blur-[50px] sm:blur-[80px] will-change-transform"
      />
    </div>
  );
}
