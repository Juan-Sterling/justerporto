import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * EncoreDiagonalShutterTransition (Education -> Contact Stage Wipe)
 * 
 * Inspired by Dual Diagonal Camera Iris / Stage Shutter:
 * - Pinned viewport on scroll.
 * - Center diagonal laser seam (1.5px crimson neon).
 * - Left shutter slides diagonally to top-left (xPercent: -108, yPercent: -42).
 * - Right shutter slides diagonally to bottom-right (xPercent: 108, yPercent: 42).
 * - "ENCORE" center watermark with crimson ambient glow.
 * - Clean stage title without blinking dots.
 * - 100% GPU accelerated (xPercent, yPercent, scale, force3D: true) for 60-120 FPS.
 */
export default function EncoreDiagonalShutterTransition() {
  const containerRef = useRef(null);
  const leftShutterRef = useRef(null);
  const rightShutterRef = useRef(null);
  const diagonalLaserRef = useRef(null);
  const watermarkRef = useRef(null);
  const stageAuraRef = useRef(null);
  const stageContentRef = useRef(null);
  const diagonalAccentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(leftShutterRef.current, { xPercent: 0, yPercent: 0, force3D: true });
      gsap.set(rightShutterRef.current, { xPercent: 0, yPercent: 0, force3D: true });
      gsap.set(diagonalLaserRef.current, { opacity: 0.9, scale: 1 });
      gsap.set(watermarkRef.current, { scale: 0.95, opacity: 0.95, force3D: true });
      gsap.set(stageAuraRef.current, { scale: 0.7, opacity: 0, force3D: true });
      gsap.set(stageContentRef.current, { y: 22, opacity: 0, force3D: true });
      gsap.set(diagonalAccentRef.current, { scaleY: 0.3, opacity: 0, force3D: true });

      // 2. Scroll-driven Pin & Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'encore-diagonal-transition',
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

      // Step 1: Laser diagonal seam glows and watermark pulses
      tl.to(watermarkRef.current, {
        scale: 1.06,
        opacity: 1,
        duration: 0.18,
        ease: 'power2.out',
      }, 0)
      .to(diagonalLaserRef.current, {
        opacity: 1,
        duration: 0.18,
      }, 0);

      // Step 2: Inner Stage lights up behind the shutters
      tl.to(stageAuraRef.current, {
        scale: 1.1,
        opacity: 0.9,
        duration: 0.35,
        ease: 'power2.out',
      }, 0.18)
      .to(stageContentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: 'power3.out',
      }, 0.22)
      .to(diagonalAccentRef.current, {
        scaleY: 1,
        opacity: 1,
        duration: 0.38,
        ease: 'power3.out',
      }, 0.24);

      // Step 3: Watermark expands and disperses
      tl.to(watermarkRef.current, {
        scale: 1.8,
        opacity: 0,
        duration: 0.28,
        ease: 'power3.out',
      }, 0.22);

      // Step 4: DUAL DIAGONAL SHUTTER SPLIT
      // Left shutter slides to top-left, right shutter slides to bottom-right
      tl.to(leftShutterRef.current, {
        xPercent: -108,
        yPercent: -42,
        duration: 0.6,
        ease: 'power3.inOut',
        force3D: true,
      }, 0.22)
      .to(rightShutterRef.current, {
        xPercent: 108,
        yPercent: 42,
        duration: 0.6,
        ease: 'power3.inOut',
        force3D: true,
      }, 0.22)
      .to(diagonalLaserRef.current, {
        opacity: 0,
        duration: 0.25,
      }, 0.35);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="education-to-contact-transition"
      className="relative w-full h-[100dvh] overflow-hidden select-none z-30 bg-[#FAFAFA] dark:bg-[#07080B]"
      aria-label="Transition Stage · Encore Diagonal Shutter"
    >
      {/* ----------------------------------------------------------- */}
      {/* INNER STAGE: Revealed as the diagonal shutters split open   */}
      {/* ----------------------------------------------------------- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden px-5 sm:px-8">
        {/* Diagonal Spotlight Wash (Lightweight radial ellipse) */}
        <div
          ref={stageAuraRef}
          className="absolute w-[340px] sm:w-[600px] h-[220px] sm:h-[320px] -rotate-12 bg-[radial-gradient(ellipse_at_center,rgba(225,29,46,0.22)_0%,rgba(225,29,46,0.05)_50%,transparent_75%)] pointer-events-none will-change-transform transform-gpu"
        />

        {/* Stage Headline Beacon: Diagonal Spotlight & Final Callout */}
        <div
          ref={stageContentRef}
          className="relative z-10 w-full max-w-2xl will-change-transform transform-gpu"
        >
          {/* Subtle Diagonal Laser Slash Echoing Shutter Cut Angle */}
          <div
            ref={diagonalAccentRef}
            aria-hidden="true"
            className="hidden sm:block pointer-events-none absolute -top-6 right-8 w-[1.5px] h-40 bg-gradient-to-b from-transparent via-[#E11D2E]/75 to-transparent rotate-[26deg] will-change-transform transform-gpu"
          />

          <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
            <span className="inline-block pb-1 border-b border-[#E11D2E]/60 font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#E11D2E] uppercase">
              FINAL STAGE · DIRECT DISPATCH
            </span>
          </div>

          <div className="mt-4 sm:mt-5 text-left sm:text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Get In Touch & Connect
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-lg sm:mx-auto leading-relaxed">
              Open for software roles, technical collaborations, and inquiries
            </p>
          </div>

          <div className="mt-6 flex items-center justify-start sm:justify-start">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E11D2E]/40 bg-[#E11D2E]/10 font-mono text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-[#E11D2E] uppercase">
              <span>STATUS · OPEN FOR COLLABORATION</span>
              <svg
                className="w-3.5 h-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* LEFT DIAGONAL SHUTTER (Slides to Top-Left)                  */}
      {/* ----------------------------------------------------------- */}
      <div
        ref={leftShutterRef}
        className="absolute inset-0 bg-[#F4F4F6] dark:bg-[#0B0C10] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between p-6 sm:p-12 overflow-hidden will-change-transform transform-gpu z-20"
        style={{
          clipPath: 'polygon(0% 0%, 75.1% 0%, 25.1% 100%, 0% 100%)',
        }}
      >
        {/* Top-Left Tag */}
        <div className="font-mono text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
          BABYMONSTER · DIAGONAL SHUTTER L
        </div>

        {/* Diagonal Warning Hazard Stripes (Subtle) */}
        <div
          className="absolute inset-x-0 bottom-0 h-4 opacity-10 dark:opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #E11D2E 0, #E11D2E 2px, transparent 0, transparent 16px)',
          }}
        />

        {/* Bottom Tag */}
        <div className="font-mono text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
          FINAL ACT · SECTOR A
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* RIGHT DIAGONAL SHUTTER (Slides to Bottom-Right)             */}
      {/* ----------------------------------------------------------- */}
      <div
        ref={rightShutterRef}
        className="absolute inset-0 bg-[#F4F4F6] dark:bg-[#0B0C10] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between p-6 sm:p-12 text-right overflow-hidden will-change-transform transform-gpu z-20"
        style={{
          clipPath: 'polygon(74.9% 0%, 100% 0%, 100% 100%, 24.9% 100%)',
        }}
      >
        {/* Top-Right Tag */}
        <div className="font-mono text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
          BABYMONSTER · DIAGONAL SHUTTER R
        </div>

        {/* Diagonal Warning Hazard Stripes (Subtle) */}
        <div
          className="absolute inset-x-0 top-0 h-4 opacity-10 dark:opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, #E11D2E 0, #E11D2E 2px, transparent 0, transparent 16px)',
          }}
        />

        {/* Bottom Tag */}
        <div className="font-mono text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
          ENCORE DISPATCH · SECTOR B
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* DIAGONAL LASER SEAM LINE (Across the cut angle)             */}
      {/* ----------------------------------------------------------- */}
      <svg
        ref={diagonalLaserRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-25 overflow-visible will-change-transform transform-gpu"
        aria-hidden="true"
      >
        <line
          x1="75%"
          y1="0%"
          x2="25%"
          y2="100%"
          stroke="#E11D2E"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="filter drop-shadow-[0_0_8px_#E11D2E] drop-shadow-[0_0_16px_rgba(225,29,46,0.8)]"
        />
      </svg>

      {/* ----------------------------------------------------------- */}
      {/* "ENCORE" CENTER WATERMARK                                   */}
      {/* ----------------------------------------------------------- */}
      <div
        ref={watermarkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none text-center px-4 will-change-transform transform-gpu"
        aria-hidden="true"
      >
        {/* Devil Horns Accent */}
        <div className="flex items-center justify-center gap-2 mb-2 text-[#E11D2E]">
          <svg className="w-5 h-5 -rotate-12 filter drop-shadow-[0_0_8px_rgba(225,29,46,0.7)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
          </svg>
          <span className="font-mono text-xs font-bold tracking-widest text-[#E11D2E] uppercase">
            FINAL ACT
          </span>
          <svg className="w-5 h-5 rotate-12 scale-x-[-1] filter drop-shadow-[0_0_8px_rgba(225,29,46,0.7)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
          </svg>
        </div>

        <span className="block font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-widest text-[#E11D2E] drop-shadow-[0_0_24px_rgba(225,29,46,0.9)]">
          ENCORE
        </span>
        <span className="mt-2 block font-mono text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] text-zinc-700 dark:text-zinc-300 uppercase">
          STAGE 05 · OPEN FOR ROLES
        </span>
      </div>
    </div>
  );
}

