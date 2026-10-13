import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * WorkBackground
 * 
 * Standalone background layer for the Work / Experience section.
 * Positioned fixed at z-0 (parallel / alongside BaemonBackground) so that
 * Hero's BaemonPortalO and foreground content at z-10 are NEVER cut off
 * or horizontally cropped by the section container.
 */
export default function WorkBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const experienceEl = document.getElementById('experience');
    if (!experienceEl || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create scroll-driven fade in / out tied strictly to the Experience section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: experienceEl,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 0.3,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      // 1. Fade in smoothly as user scrolls towards Experience
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: 'power2.out' }
      );

      // 2. Sustain 100% opacity throughout the Work section content
      tl.to(containerRef.current, { opacity: 1, duration: 0.70 });

      // 3. Fade out smoothly as user exits into Skills
      tl.to(containerRef.current, { opacity: 0, duration: 0.15, ease: 'power2.in' });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-0 will-change-[opacity]"
      aria-hidden="true"
    >
      {/* Geometric Shapes Wallpaper - Locked to Viewport */}
      <div className="absolute inset-0 bg-[url('/images/backgrounds/bg-geometric-shapes.jpg')] bg-cover bg-center bg-no-repeat opacity-45 dark:opacity-75 transition-opacity duration-300" />

      {/* Atmospheric Vignette & Soft Tint for maximum text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA]/70 via-[#FAFAFA]/20 to-[#FAFAFA]/70 dark:from-[#07080B]/80 dark:via-black/35 dark:to-[#07080B]/80 transition-colors duration-300" />
    </div>
  );
}
