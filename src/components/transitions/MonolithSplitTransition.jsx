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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(leftGateRef.current, { xPercent: 0, force3D: true });
      gsap.set(rightGateRef.current, { xPercent: 0, force3D: true });
      gsap.set(verticalLaserRef.current, { scaleY: 0, opacity: 0, transformOrigin: 'center center' });
      gsap.set(watermarkRef.current, { scale: 0.9, opacity: 0.9, force3D: true });
      gsap.set(stageAuraRef.current, { scale: 0.5, opacity: 0 });
      gsap.set(stageContentRef.current, { y: 20, opacity: 0 });

      // 2. Scroll-driven Pin & Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'monolith-transition',
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

      // Step 1: Vertical laser beam ignites along the central seam
      tl.to(verticalLaserRef.current, {
        scaleY: 1,
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

      // Step 2: Inner Stage lights up behind the gates
      tl.to(stageAuraRef.current, {
        scale: 1.25,
        opacity: 0.85,
        duration: 0.35,
        ease: 'power2.out',
      }, 0.2)
      .to(stageContentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: 'power3.out',
      }, 0.25);

      // Step 3: Watermark expands and disperses
      tl.to(watermarkRef.current, {
        scale: 1.8,
        opacity: 0,
        duration: 0.28,
        ease: 'power3.out',
      }, 0.25);

      // Step 4: Left and Right Monolith Gates slide outward (Left to LEFT, Right to RIGHT)
      tl.to(leftGateRef.current, {
        xPercent: -106,
        duration: 0.55,
        ease: 'power3.inOut',
        force3D: true,
      }, 0.25)
      .to(rightGateRef.current, {
        xPercent: 106,
        duration: 0.55,
        ease: 'power3.inOut',
        force3D: true,
      }, 0.25);

      // Step 5: Fade vertical laser and complete reveal
      tl.to(verticalLaserRef.current, {
        opacity: 0,
        duration: 0.2,
      }, 0.6);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="skills-to-education-transition"
      className="relative w-full h-[100dvh] overflow-hidden select-none z-30 bg-[#FAFAFA] dark:bg-[#07080B]"
      aria-label="Transition Stage · Forever Monolith"
    >
      {/* ----------------------------------------------------------- */}
      {/* INNER STAGE: Revealed behind the gates                      */}
      {/* ----------------------------------------------------------- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
        {/* Stage Aurora / Ambient Crimson Flare */}
        <div
          ref={stageAuraRef}
          className="absolute w-[320px] sm:w-[540px] h-[320px] sm:h-[540px] rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.30)_0%,rgba(225,29,46,0.06)_50%,transparent_75%)] blur-2xl pointer-events-none will-change-transform transform-gpu"
        />

        {/* Stage Headline Beacon */}
        <div
          ref={stageContentRef}
          className="relative z-10 flex flex-col items-center text-center px-4 will-change-transform transform-gpu"
        >
          <div className="flex items-center justify-center mb-3">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#E11D2E] uppercase">
              STAGE 04 · ACADEMIC ROOTS
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-xl">
            Formal Education & Credentials
          </h2>

          <p className="mt-2 text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400">
            Academic foundation, coursework, and degree milestones
          </p>

          {/* Downward laser beacon line */}
          <div className="w-[1.5px] h-12 sm:h-16 mt-4 bg-gradient-to-b from-[#E11D2E] via-[#FF3B4D] to-transparent shadow-[0_0_10px_rgba(225,29,46,0.8)]" />
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
        <span className="block font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest text-zinc-950 dark:text-white drop-shadow-[0_0_24px_rgba(225,29,46,0.9)]">
          FOREVER
        </span>
        <span className="mt-1 block font-mono text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] text-[#E11D2E] uppercase">
          STAGE 04 · ACADEMIC ROOTS
        </span>
      </div>
    </div>
  );
}

