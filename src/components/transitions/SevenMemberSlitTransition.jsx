import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MEMBERS = [
  {
    id: '01',
    name: 'RUKA',
    roles: ['Main Dancer', 'Main Rapper'],
  },
  {
    id: '02',
    name: 'PHARITA',
    roles: ['Lead Vocalist', 'Visual'],
  },
  {
    id: '03',
    name: 'ASA',
    roles: ['Main Rapper', 'Lead Dancer', 'Sub-Vocalist'],
  },
  {
    id: '04',
    name: 'AHYEON',
    roles: ['Center', 'Main Vocalist', 'Lead Rapper', 'Lead Dancer', 'Visual'],
  },
  {
    id: '05',
    name: 'RAMI',
    roles: ['Main Vocalist', 'Lead Dancer', 'Sub-Rapper', 'Visual'],
  },
  {
    id: '06',
    name: 'RORA',
    roles: ['Vocalist', 'Dancer', 'Visual'],
  },
  {
    id: '07',
    name: 'CHIQUITA',
    roles: ['Vocalist', 'Dancer'],
  },
];

/**
 * SevenMemberSlitTransition (About -> Experience Full-Screen Stage Wipe)
 * 
 * Inspired by BABYMONSTER 7-Member Concert Curtain Wipe:
 * - Viewport pins as user scrolls past About.
 * - 7 full-height vertical columns cover the screen (01 RUKA to 07 CHIQUITA).
 * - "7 MONSTERS" center watermark with crimson ambient shockwave.
 * - Alternating vertical slide (columns 1, 3, 5, 7 slide UP, columns 2, 4, 6 slide DOWN).
 * - Reveals the Work Experience stage smoothly behind it.
 * - 100% GPU accelerated (yPercent, scale, opacity) & mobile optimized.
 */
export default function SevenMemberSlitTransition() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const slitRefs = useRef([]);
  const watermarkRef = useRef(null);
  const stageAuraRef = useRef(null);
  const stageContentRef = useRef(null);
  const stageTicksRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Setup
      gsap.set(slitRefs.current, { yPercent: 0, force3D: true });
      gsap.set(watermarkRef.current, { scale: 0.9, opacity: 0.9, force3D: true });
      gsap.set(stageAuraRef.current, { scale: 0.65, opacity: 0, force3D: true });
      gsap.set(stageContentRef.current, { y: 20, opacity: 0, force3D: true });
      gsap.set(stageTicksRef.current, { scaleX: 0.4, opacity: 0, transformOrigin: 'left center', force3D: true });

      // 2. Scroll-driven Pin & Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'seven-slit-transition',
          trigger: containerRef.current,
          start: 'top top',
          end: '+=90%', // Snappy ~90vh scroll distance for optimal pacing
          pin: true,
          pinSpacing: true,
          scrub: 0.45,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      // Step 1: Laser watermark surges
      tl.to(watermarkRef.current, {
        scale: 1.08,
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      }, 0);

      // Step 2: Inner Stage Entrance lights up behind the slits
      tl.to(stageAuraRef.current, {
        scale: 1.15,
        opacity: 0.9,
        duration: 0.4,
        ease: 'power2.out',
      }, 0.2)
        .to(stageContentRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: 'power3.out',
        }, 0.25)
        .to(stageTicksRef.current, {
          scaleX: 1,
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
        }, 0.32);

      // Step 3: Watermark expands and disperses
      tl.to(watermarkRef.current, {
        scale: 1.8,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.out',
      }, 0.25);

      // Step 4: Staggered 7-Slit Vertical Curtain Wipe (Alternating UP and DOWN)
      slitRefs.current.forEach((slitEl, i) => {
        if (!slitEl) return;
        const isUp = i % 2 === 0; // Columns 0, 2, 4, 6 go UP; Columns 1, 3, 5 go DOWN
        tl.to(slitEl, {
          yPercent: isUp ? -108 : 108,
          duration: 0.55,
          ease: 'power3.inOut',
          force3D: true,
        }, 0.25 + i * 0.035);
      });

      // Step 5: Smooth exit into Experience
      tl.to(stageContentRef.current, {
        opacity: 0.95,
        duration: 0.15,
      }, 0.75);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="about-to-experience-transition"
      className="relative w-full h-[100dvh] overflow-hidden select-none z-30 bg-[#FAFAFA] dark:bg-[#07080B]"
      aria-label="Transition Stage · 7 Monsters"
    >
      {/* ----------------------------------------------------------- */}
      {/* INNER STAGE: Revealed behind the slits as they part        */}
      {/* ----------------------------------------------------------- */}
      <div
        ref={stageRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden"
      >
        {/* Stage Left-Biased Ambient Crimson Wash (GPU-friendly, no heavy blur filter) */}
        <div
          ref={stageAuraRef}
          className="absolute w-[340px] sm:w-[640px] h-[340px] sm:h-[520px] rounded-full bg-[radial-gradient(ellipse_at_28%_50%,rgba(225,29,46,0.20)_0%,rgba(225,29,46,0.05)_48%,transparent_72%)] pointer-events-none will-change-transform transform-gpu"
        />

        {/* Stage Headline Beacon: Editorial Career Ledger */}
        <div
          ref={stageContentRef}
          className="relative z-10 w-full max-w-2xl px-6 sm:px-10 text-left will-change-transform transform-gpu"
        >
          {/* Giant Background Stage Index */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-8 sm:-top-12 left-4 sm:left-6 font-display text-[5.5rem] sm:text-[8rem] font-black leading-none tracking-tighter text-zinc-900/[0.06] dark:text-white/[0.06]"
          >
            02
          </span>

          {/* Left Crimson Timeline Accent Block */}
          <div className="relative border-l-2 border-[#E11D2E] pl-4 sm:pl-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#E11D2E] uppercase">
                STAGE 02 · WORK HISTORY
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
              Engineering Roles & Experience
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
              Scroll down to explore production contributions and software milestones
            </p>
          </div>

          {/* 7-Column Staggered Sequence Bar (Echoing 7 Slit Curtains) */}
          <div
            ref={stageTicksRef}
            className="mt-6 pl-4 sm:pl-6 flex items-center gap-1.5 sm:gap-2 will-change-transform transform-gpu"
            aria-hidden="true"
          >
            {MEMBERS.map((m, idx) => (
              <span
                key={`tick-${m.id}`}
                className={
                  idx === 1
                    ? 'h-[3px] w-8 sm:w-12 rounded-full bg-[#E11D2E]'
                    : 'h-[2px] w-4 sm:w-6 rounded-full bg-zinc-300 dark:bg-zinc-700'
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* 7 VERTICAL SLITS CURTAIN (Sliding alternately UP & DOWN)    */}
      {/* ----------------------------------------------------------- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {MEMBERS.map((member, i) => {
          const leftPercent = (i * 100) / 7;
          const widthPercent = 100 / 7 + 0.12; // Tiny overlap to prevent 1px subpixel rendering gap

          return (
            <div
              key={member.id}
              ref={(el) => { slitRefs.current[i] = el; }}
              className="absolute top-0 bottom-0 bg-[#F4F4F6] dark:bg-[#0B0C10] border-r border-zinc-300/80 dark:border-zinc-800/90 shadow-2xl flex flex-col items-center justify-between py-6 sm:py-10 md:py-12 overflow-hidden will-change-transform transform-gpu z-20"
              style={{
                left: `${leftPercent}%`,
                width: `${widthPercent}%`,
              }}
            >
              {/* Vertical Laser Divider Glow along the right edge */}
              <div className="absolute top-0 bottom-0 right-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#E11D2E]/75 to-transparent pointer-events-none shadow-[0_0_8px_rgba(225,29,46,0.6)]" />

              {/* Top Member Number */}
              <div className="flex flex-col items-center gap-1 z-10 shrink-0">
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#E11D2E] tracking-widest">
                  {member.id}
                </span>
                <span className="w-1 h-2.5 sm:h-3 rounded-full bg-[#E11D2E]/40" />
              </div>

              {/* Center Member Name in Elegant Vertical Typography */}
              <div className="z-10 flex flex-col items-center justify-center my-auto py-2">
                <span className="[writing-mode:vertical-rl] rotate-180 font-display text-[11px] sm:text-sm md:text-base lg:text-lg font-black tracking-[0.25em] text-zinc-800 dark:text-zinc-200 uppercase select-none">
                  {member.name}
                </span>
              </div>

              {/* Bottom Roles Stack */}
              <div className="flex flex-col items-center gap-0.5 sm:gap-1 z-10 w-full px-0.5 sm:px-1 text-center shrink-0">
                <span className="w-1 h-2 sm:h-2.5 rounded-full bg-[#E11D2E]/40 mb-0.5" />
                {member.roles.map((roleText, rIdx) => (
                  <span
                    key={`${member.id}-role-${rIdx}`}
                    className="font-sans sm:font-mono text-[6.5px] sm:text-[7.5px] md:text-[8.5px] lg:text-[9.5px] font-semibold text-zinc-600 dark:text-zinc-400 tracking-tight leading-tight uppercase max-w-full truncate block"
                    title={roleText}
                  >
                    {roleText}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ----------------------------------------------------------- */}
      {/* "BABY, I’M A MONSTER" CENTER WATERMARK (Zooms and disperses) */}
      {/* ----------------------------------------------------------- */}
      <div
        ref={watermarkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none text-center px-4 will-change-transform transform-gpu"
        aria-hidden="true"
      >
        <span className="block font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-widest text-zinc-950 dark:text-white drop-shadow-[0_0_24px_rgba(225,29,46,0.85)]">
          BABY, I’M A MONSTER
        </span>
      </div>
    </div>
  );
}

