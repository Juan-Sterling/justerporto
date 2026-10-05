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
      // 1. Initial State (At Hero: 0 opacity & hidden so Hero's dedicated stage aurora shines alone)
      gsap.set(primaryOrbRef.current, {
        top: 0,
        left: 0,
        xPercent: -50,
        yPercent: -50,
        x: '50vw',
        y: '20vh',
        scale: 1,
        autoAlpha: 0,
      });

      gsap.set(secondaryOrbRef.current, {
        top: 0,
        left: 0,
        xPercent: -50,
        yPercent: -50,
        x: '50vw',
        y: '30vh',
        scale: 0.8,
        autoAlpha: 0,
      });

      // 2. Continuous Scroll-Driven Atmosphere Timeline (Hardware-accelerated transforms only)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35, // Snappy, responsive scrub without trailing animation lag
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      // Step 1: Scroll into Experience (Orb drifts to the left along timeline)
      tl.to(primaryOrbRef.current, {
        x: '26vw',
        y: '32vh',
        scale: 1.15,
        autoAlpha: 0.85,
        ease: 'power1.inOut',
      }, 0.12)
      .to(secondaryOrbRef.current, {
        x: '38vw',
        y: '40vh',
        scale: 0.9,
        autoAlpha: 0.55,
        ease: 'power1.inOut',
      }, 0.12);

      // Step 2: Scroll into Skills (Orb centers and blooms wide across tech badges)
      tl.to(primaryOrbRef.current, {
        x: '50vw',
        y: '50vh',
        scale: 1.25,
        autoAlpha: 0.9,
        ease: 'power1.inOut',
      }, 0.40)
      .to(secondaryOrbRef.current, {
        x: '62vw',
        y: '56vh',
        scale: 1.0,
        autoAlpha: 0.6,
        ease: 'power1.inOut',
      }, 0.40);

      // Step 3: Scroll into Education (Orb drifts to the right along certificate cards)
      tl.to(primaryOrbRef.current, {
        x: '72vw',
        y: '70vh',
        scale: 1.15,
        autoAlpha: 0.85,
        ease: 'power1.inOut',
      }, 0.68)
      .to(secondaryOrbRef.current, {
        x: '30vw',
        y: '68vh',
        scale: 0.85,
        autoAlpha: 0.5,
        ease: 'power1.inOut',
      }, 0.68);

      // Step 4: Scroll into Contact (Orb centers at bottom)
      tl.to(primaryOrbRef.current, {
        x: '50vw',
        y: '86vh',
        scale: 1.1,
        autoAlpha: 0.85,
        ease: 'power1.inOut',
      }, 0.92)
      .to(secondaryOrbRef.current, {
        x: '50vw',
        y: '82vh',
        scale: 0.9,
        autoAlpha: 0.55,
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
      {/* Primary Reactive Radial Glow Orb (Pure GPU radial gradient shader, 0 runtime convolution lag) */}
      <div
        ref={primaryOrbRef}
        className="absolute w-[22rem] sm:w-[36rem] h-[22rem] sm:h-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(225,29,46,0.12)_0%,rgba(225,29,46,0.05)_45%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(225,29,46,0.22)_0%,rgba(225,29,46,0.08)_50%,transparent_70%)] blur-md sm:blur-xl will-change-transform transform-gpu"
      />

      {/* Secondary Soft Rim Accent Orb (Hidden on mobile to save GPU fill rate) */}
      <div
        ref={secondaryOrbRef}
        className="absolute hidden sm:block w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,77,94,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,77,94,0.15)_0%,transparent_70%)] blur-sm sm:blur-lg will-change-transform transform-gpu"
      />
    </div>
  );
}
