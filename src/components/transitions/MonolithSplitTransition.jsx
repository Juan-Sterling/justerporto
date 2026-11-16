import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * MonolithSplitTransition (Skills -> Education Stage Wipe)
 * 
 * Inspired by BABYMONSTER "FOREVER" Dual Monolith Chrome & Obsidian Split Gate:
 * - Pinned viewport on scroll.
 * - Center vertical laser seam ignites.
 * - Left monolith gate slides LEFT (xPercent: -105).
 * - Right monolith gate slides RIGHT (xPercent: 105).
 * - "FOREVER · ACADEMIC ORIGIN" center watermark.
 * - Reveals the Academic Foundation & Credentials stage behind it.
 * - 100% GPU accelerated (xPercent, scale, opacity, force3D: true).
 */
export default function MonolithSplitTransition() {
  const containerRef = useRef(null);
  const leftGateRef = useRef(null);
  const rightGateRef = useRef(null);
  const verticalLaserRef = useRef(null);
  const watermarkRef = useRef(null);
  const stageAuraRef = useRef(null);
  const stageContentRef = useRef(null);
  const centerSpineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(leftGateRef.current, { xPercent: 0, force3D: true });
      gsap.set(rightGateRef.current, { xPercent: 0, force3D: true });
      gsap.set(verticalLaserRef.current, { scaleY: 0, opacity: 0, transformOrigin: 'center center' });
      gsap.set(watermarkRef.current, { scale: 0.9, opacity: 0.9, force3D: true });
      gsap.set(stageAuraRef.current, { scaleY: 0.6, opacity: 0, force3D: true });
      gsap.set(stageContentRef.current, { y: 18, opacity: 0, force3D: true });
      gsap.set(centerSpineRef.current, { scaleY: 0, opacity: 0, transformOrigin: 'center center', force3D: true });

      // 2. Scroll-driven Pin & Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'monolith-transition',
          trigger: containerRef.current,
          start: 'top top',
          end: '+=115%', // Generous scroll travel so watermark, gates, and beacon glide smoothly
          pin: true,
          pinSpacing: true,
          scrub: true, // Syncs 1:1 with Lenis smooth scroll (avoids double-damping lag/jumps)
          fastScrollEnd: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 2,
        },
      });

      // Step 1: Vertical laser beam ignites along the central seam (0.00 -> 0.22)
      tl.to(verticalLaserRef.current, {
        scaleY: 1,
        opacity: 1,
        duration: 0.22,
        ease: 'sine.inOut',
      }, 0)
      .to(watermarkRef.current, {
        scale: 1.08,
        opacity: 1,
        duration: 0.22,
        ease: 'sine.inOut',
      }, 0);

      // Step 2: Inner Stage lights up behind the gates (0.20 -> 0.66)
      tl.to(stageAuraRef.current, {
        scaleY: 1,
        opacity: 0.9,
        duration: 0.42,
        ease: 'sine.inOut',
      }, 0.20)
      .to(stageContentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.40,
        ease: 'power2.out',
      }, 0.26)
      .to(centerSpineRef.current, {
        scaleY: 1,
        opacity: 1,
        duration: 0.40,
        ease: 'power2.out',
      }, 0.26);

      // Step 3: Watermark expands and disperses smoothly (0.22 -> 0.56)
      tl.to(watermarkRef.current, {
        scale: 1.75,
        opacity: 0,
        duration: 0.34,
        ease: 'power2.inOut',
      }, 0.22);

      // Step 4: Left and Right Monolith Gates slide outward (0.22 -> 0.80)
      tl.to(leftGateRef.current, {
        xPercent: -106,
        duration: 0.58,
        ease: 'power2.inOut',
        force3D: true,
      }, 0.22)
      .to(rightGateRef.current, {
        xPercent: 106,
        duration: 0.58,
        ease: 'power2.inOut',
        force3D: true,
      }, 0.22)
      .to(verticalLaserRef.current, {
        opacity: 0,
        duration: 0.22,
      }, 0.54);

      // Step 5: Brief settled hold while beacon stays visible before natural scroll-out
      tl.to({}, { duration: 0.14 }, 0.80);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="skills-to-education-transition"
      className="relative w-full h-[100svh] sm:h-screen overflow-hidden select-none z-30 bg-[#FAFAFA] dark:bg-[#07080B]"
      aria-label="Transition Stage · Forever Monolith"
    >
      {/* ----------------------------------------------------------- */}
      {/* INNER STAGE: Revealed behind the gates                      */}
      {/* ----------------------------------------------------------- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden px-5 sm:px-8">
        {/* Vertical Monolith Shaft Wash (Lightweight radial ellipse) */}
        <div
          ref={stageAuraRef}
          className="absolute w-64 sm:w-96 h-[68vh] bg-[radial-gradient(ellipse_at_center,rgba(225,29,46,0.16)_0%,rgba(225,29,46,0.04)_48%,transparent_72%)] pointer-events-none will-change-transform transform-gpu"
        />

        {/* Stage Headline Beacon: Dual-Column Split Around Vertical Seam */}
        <div
          ref={stageContentRef}
          className="relative z-10 w-full max-w-3xl flex flex-col sm:grid sm:grid-cols-[1fr_1.5px_1.35fr] sm:items-center gap-4 sm:gap-8 will-change-transform transform-gpu"
        >
          {/* Left Column: Stage Number & Origin Classification */}
          <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
            <div className="flex items-baseline sm:flex-col sm:items-end gap-3 sm:gap-1">
              <span className="font-display text-4xl sm:text-6xl md:text-7xl font-black leading-none tracking-tighter text-zinc-900 dark:text-white">
                04
              </span>
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#E11D2E] uppercase">
                STAGE 04 · ACADEMIC ROOTS
              </span>
            </div>

            <span className="mt-2 font-mono text-[10px] sm:text-xs tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
              DISCIPLINE · ENGINEERING
            </span>
          </div>

          {/* Mobile Horizontal Hairline Divider */}
          <div
            className="sm:hidden w-full h-[1px] bg-gradient-to-r from-[#E11D2E] via-zinc-300 dark:via-zinc-700 to-transparent"
            aria-hidden="true"
          />

          {/* Desktop Center Vertical Seam Spine (Echoes Monolith Split) */}
          <div
            ref={centerSpineRef}
            className="hidden sm:block w-[1.5px] h-32 md:h-36 bg-gradient-to-b from-transparent via-[#E11D2E] to-transparent will-change-transform transform-gpu"
            aria-hidden="true"
          />

          {/* Right Column: Section Title & Description */}
          <div className="flex flex-col items-start text-left">
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
              Formal Education & Credentials
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
              Academic foundation, coursework, and degree milestones
            </p>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* LEFT MONOLITH GATE (Slides Left)                            */}
      {/* ----------------------------------------------------------- */}
      <div
        ref={leftGateRef}
        className="absolute top-0 bottom-0 left-0 w-[50.2%] bg-[#F4F4F6] dark:bg-[#0B0C10] border-r border-zinc-300 dark:border-zinc-800 shadow-2xl flex flex-col justify-between p-6 sm:p-12 overflow-hidden will-change-transform transform-gpu z-20"
      >
        {/* Top-Left Tag */}
        <div className="font-mono text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
          04 · ORIGIN
        </div>

        {/* Bottom-Left Tag */}
        <div className="font-mono text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
          ACADEMIC BACKGROUND
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* RIGHT MONOLITH GATE (Slides Right)                          */}
      {/* ----------------------------------------------------------- */}
      <div
        ref={rightGateRef}
        className="absolute top-0 bottom-0 right-0 w-[50.2%] bg-[#F4F4F6] dark:bg-[#0B0C10] border-l border-zinc-300 dark:border-zinc-800 shadow-2xl flex flex-col justify-between p-6 sm:p-12 text-right overflow-hidden will-change-transform transform-gpu z-20"
      >
        {/* Top-Right Tag */}
        <div className="font-mono text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
          ARCHIVE
        </div>

        {/* Bottom-Right Tag */}
        <div className="font-mono text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
          STAGE 04
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* CENTER VERTICAL LASER SEAM BEAM                             */}
      {/* ----------------------------------------------------------- */}
      <div
        ref={verticalLaserRef}
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2.5px] bg-gradient-to-b from-transparent via-[#E11D2E] to-transparent shadow-[0_0_16px_#E11D2E,0_0_32px_rgba(225,29,46,0.8)] z-30 pointer-events-none will-change-transform transform-gpu"
        aria-hidden="true"
      />

      {/* ----------------------------------------------------------- */}
      {/* "FOREVER" CENTER WATERMARK                                  */}
      {/* ----------------------------------------------------------- */}
      <div
        ref={watermarkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none text-center px-4 will-change-transform transform-gpu"
        aria-hidden="true"
      >
        <span className="block font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest text-zinc-950 dark:text-white [text-shadow:0_0_12px_rgba(225,29,46,0.75),0_0_24px_rgba(225,29,46,0.5)]">
          FOREVER
        </span>
        <span className="mt-1 block font-mono text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] text-[#E11D2E] uppercase">
          STAGE 04 · ACADEMIC ROOTS
        </span>
      </div>
    </div>
  );
}

