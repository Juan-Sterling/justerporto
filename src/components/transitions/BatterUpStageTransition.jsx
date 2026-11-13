import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * BatterUpStageTransition (Experience -> Skills Stage Wipe)
 * 
 * Inspired by BABYMONSTER "BATTER UP" Double Stadium Blast Doors:
 * - Pinned viewport on scroll.
 * - Center horizontal laser seam with crimson flare.
 * - Top door retracts upward (yPercent: -105).
 * - Bottom door retracts downward (yPercent: 105).
 * - "BATTER UP · TECH ARSENAL" center watermark.
 * - Reveals the Technical Capabilities & Bento Grid stage behind it.
 * - 100% GPU accelerated (yPercent, scale, opacity, force3D: true).
 */
export default function BatterUpStageTransition() {
  const containerRef = useRef(null);
  const topDoorRef = useRef(null);
  const bottomDoorRef = useRef(null);
  const laserBeamRef = useRef(null);
  const watermarkRef = useRef(null);
  const stageAuraRef = useRef(null);
  const stageContentRef = useRef(null);
  const hudRulesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(topDoorRef.current, { yPercent: 0, force3D: true });
      gsap.set(bottomDoorRef.current, { yPercent: 0, force3D: true });
      gsap.set(laserBeamRef.current, { scaleX: 0, opacity: 0, transformOrigin: 'center center' });
      gsap.set(watermarkRef.current, { scale: 0.9, opacity: 0.9, force3D: true });
      gsap.set(stageAuraRef.current, { scaleX: 0.55, opacity: 0, force3D: true });
      gsap.set(stageContentRef.current, { y: 18, opacity: 0, force3D: true });
      gsap.set(hudRulesRef.current, { scaleX: 0.3, opacity: 0, transformOrigin: 'center center', force3D: true });

      // 2. Scroll-driven Pin & Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'batterup-transition',
          trigger: containerRef.current,
          start: 'top top',
          end: '+=85%', // Snappy ~85vh scroll distance
          pin: true,
          pinSpacing: true,
          scrub: 0.45,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      // Step 1: Laser beam ignites horizontally along the center seam
      tl.to(laserBeamRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.2,
        ease: 'power3.out',
      }, 0)
      .to(watermarkRef.current, {
        scale: 1.08,
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      }, 0);

      // Step 2: Inner Stage lights up behind the blast doors
      tl.to(stageAuraRef.current, {
        scaleX: 1,
        opacity: 0.9,
        duration: 0.35,
        ease: 'power2.out',
      }, 0.2)
      .to(stageContentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: 'power3.out',
      }, 0.25)
      .to(hudRulesRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      }, 0.25);

      // Step 3: Watermark expands and disperses
      tl.to(watermarkRef.current, {
        scale: 1.8,
        opacity: 0,
        duration: 0.28,
        ease: 'power3.out',
      }, 0.25);

      // Step 4: Double Stadium Blast Doors split open (Top UP, Bottom DOWN)
      tl.to(topDoorRef.current, {
        yPercent: -106,
        duration: 0.55,
        ease: 'power3.inOut',
        force3D: true,
      }, 0.25)
      .to(bottomDoorRef.current, {
        yPercent: 106,
        duration: 0.55,
        ease: 'power3.inOut',
        force3D: true,
      }, 0.25);

      // Step 5: Fade beam and hand over to Skills
      tl.to(laserBeamRef.current, {
        opacity: 0,
        duration: 0.2,
      }, 0.6);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="experience-to-skills-transition"
      className="relative w-full h-[100dvh] overflow-hidden select-none z-30 bg-[#FAFAFA] dark:bg-[#07080B]"
      aria-label="Transition Stage · Batter Up"
    >
      {/* ----------------------------------------------------------- */}
      {/* INNER STAGE: Revealed behind the blast doors                */}
      {/* ----------------------------------------------------------- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden px-4 sm:px-6">
        {/* Horizontal Stadium Spotlight Wash (Lightweight radial ellipse) */}
        <div
          ref={stageAuraRef}
          className="absolute w-full max-w-4xl h-44 sm:h-60 bg-[radial-gradient(ellipse_at_center,rgba(225,29,46,0.22)_0%,rgba(225,29,46,0.05)_50%,transparent_75%)] pointer-events-none will-change-transform transform-gpu"
        />

        {/* Stage Headline Beacon: Wide Stadium HUD Frame */}
        <div className="relative z-10 w-full max-w-2xl">
          {/* Top & Bottom Expanding Horizontal Laser Rules */}
          <div
            ref={hudRulesRef}
            className="pointer-events-none absolute inset-0 will-change-transform transform-gpu"
            aria-hidden="true"
          >
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E11D2E]/80 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E11D2E]/80 to-transparent" />
            {/* Corner HUD Brackets */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E11D2E]" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E11D2E]" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E11D2E]" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E11D2E]" />
          </div>

          <div
            ref={stageContentRef}
            className="relative flex flex-col items-center text-center px-5 py-7 sm:px-10 sm:py-9 will-change-transform transform-gpu"
          >
            <span className="inline-flex items-center px-2.5 py-1 border border-[#E11D2E]/50 bg-[#E11D2E]/10 font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#E11D2E] uppercase">
              STAGE 03 · TECHNICAL CAPABILITIES
            </span>

            <h2 className="mt-4 font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Engineering Arsenal & Skills
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
              Unlocking languages, frameworks, architecture and development proficiencies
            </p>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* TOP BLAST DOOR (Retracts Upward)                           */}
      {/* ----------------------------------------------------------- */}
      <div
        ref={topDoorRef}
        className="absolute top-0 left-0 right-0 h-[50.2%] bg-[#F4F4F6] dark:bg-[#0B0C10] border-b border-zinc-300 dark:border-zinc-800 shadow-2xl flex flex-col justify-between p-6 sm:p-12 overflow-hidden will-change-transform transform-gpu z-20"
      >
        {/* Top Header Tag */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
          <span>BABYMONSTER · STADIUM GATES</span>
          <span>STAGE 03 · GATE A</span>
        </div>

        {/* Diagonal Warning Hazard Stripes (Subtle) */}
        <div
          className="absolute inset-x-0 bottom-0 h-4 opacity-10 dark:opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #E11D2E 0, #E11D2E 2px, transparent 0, transparent 16px)',
          }}
        />
      </div>

      {/* ----------------------------------------------------------- */}
      {/* BOTTOM BLAST DOOR (Retracts Downward)                       */}
      {/* ----------------------------------------------------------- */}
      <div
        ref={bottomDoorRef}
        className="absolute bottom-0 left-0 right-0 h-[50.2%] bg-[#F4F4F6] dark:bg-[#0B0C10] border-t border-zinc-300 dark:border-zinc-800 shadow-2xl flex flex-col justify-between p-6 sm:p-12 overflow-hidden will-change-transform transform-gpu z-20"
      >
        {/* Diagonal Warning Hazard Stripes (Subtle) */}
        <div
          className="absolute inset-x-0 top-0 h-4 opacity-10 dark:opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, #E11D2E 0, #E11D2E 2px, transparent 0, transparent 16px)',
          }}
        />

        {/* Bottom Footer Tag */}
        <div className="mt-auto flex items-center justify-between font-mono text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
          <span>HYDRAULIC SHUTTER SYSTEM</span>
          <span>ARSENAL UNLOCKED</span>
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* CENTER HORIZONTAL LASER SEAM BEAM                           */}
      {/* ----------------------------------------------------------- */}
      <div
        ref={laserBeamRef}
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2.5px] bg-gradient-to-r from-transparent via-[#E11D2E] to-transparent shadow-[0_0_16px_#E11D2E,0_0_32px_rgba(225,29,46,0.8)] z-30 pointer-events-none will-change-transform transform-gpu"
        aria-hidden="true"
      />

      {/* ----------------------------------------------------------- */}
      {/* "BATTER UP!" CENTER WATERMARK                               */}
      {/* ----------------------------------------------------------- */}
      <div
        ref={watermarkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none text-center px-4 will-change-transform transform-gpu"
        aria-hidden="true"
      >
        <span className="block font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest text-[#E11D2E] drop-shadow-[0_0_24px_rgba(225,29,46,0.9)]">
          BATTER UP!
        </span>
        <span className="mt-1 block font-mono text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] text-zinc-700 dark:text-zinc-300 uppercase">
          STAGE 03 · TECHNICAL ARSENAL
        </span>
      </div>
    </div>
  );
}

