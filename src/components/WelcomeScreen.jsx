/**
 * =============================================================================
 * 🎀 BABYMONSTER THEMED WELCOME SCREEN & EXIT ANIMATIONS
 * =============================================================================
 * Komponen ini menyediakan 4 mode animasi exit bertema BABYMONSTER yang
 * didorong oleh GSAP timeline berkecepatan 60/120fps GPU-accelerated:
 *
 * 1. 'sheesh' (AKTIF / DEFAULT):
 *    - Konsep: "SHEESH" — Diagonal Laser Claw Slash & Split Wipe.
 *    - Visual: 3 cakar laser merah neon menyayat diagonal layar, watermark "SHEESH!"
 *              berpijar, lalu 2 panel poligon meluncur menjauh secara agresif.
 *
 * 2. 'batterup':
 *    - Konsep: "BATTER UP" — Double Stadium Blast Doors.
 *    - Visual: Garis laser merah horizontal menyala di tengah, watermark "BATTER UP!"
 *              meledak, lalu pintu atas dan bawah terbuka vertikal dengan heavy inertia.
 *
 * 3. 'drip':
 *    - Konsep: "DRIP" — Bass Drop Chromatic Glitch & Devil Horns Hyper Zoom Tunnel.
 *    - Visual: Micro-shake glitch, teks runtuh cepat, lalu Emblem Devil Horns melesat
 *              zoom-in tembus kamera dengan gelombang kejut radial (shockwave).
 *
 * 4. 'seven':
 *    - Konsep: "7-MEMBERS" — Staggered Concert LED Slits.
 *    - Visual: Layar terbelah 7 kolom vertikal (01 RUKA s.d. 07 CHIQUITA) dengan laser divider,
 *              kemudian meluncur bergantian (selang-seling atas-bawah).
 *
 * CARA MENGGANTI ANIMASI EXIT:
 * Di src/App.jsx, ubah nilai state `exitMode`:
 *   const [exitMode, setExitMode] = useState('sheesh'); // opsi: 'sheesh' | 'batterup' | 'drip' | 'seven'
 * =============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { Code2 } from 'lucide-react';
import gsap from 'gsap';

const GREETINGS = [
  { text: 'HELLO', lang: 'EN' },
  { text: '안녕하세요', lang: 'KR' },
  { text: 'こんにちは', lang: 'JP' },
];

const MEMBERS = ['RUKA', 'PHARITA', 'ASA', 'AHYEON', 'RAMI', 'RORA', 'CHIQUITA'];

export default function WelcomeScreen({ exitMode = 'sheesh', onStartExit, onComplete }) {
  const containerRef = useRef(null);
  const flashRef = useRef(null);
  const flareRef = useRef(null);

  // Mode 1: Sheesh refs
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const slashSvgRef = useRef(null);
  const slashMainRef = useRef(null);
  const clawTopRef = useRef(null);
  const clawBottomRef = useRef(null);
  const sheeshBadgeRef = useRef(null);

  // Mode 2: Batter Up refs
  const doorTopRef = useRef(null);
  const doorBottomRef = useRef(null);
  const centerBeamRef = useRef(null);
  const batterBadgeRef = useRef(null);

  // Mode 3: Drip refs
  const dripPanelRef = useRef(null);
  const dripEmblemRef = useRef(null);
  const shockwaveRef = useRef(null);
  const dripBadgeRef = useRef(null);

  // Mode 4: 7-Members refs
  const slitRefs = useRef([]);
  const sevenBadgeRef = useRef(null);

  const onStartExitRef = useRef(onStartExit);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onStartExitRef.current = onStartExit;
    onCompleteRef.current = onComplete;
  });

  const [activeGreeting, setActiveGreeting] = useState(GREETINGS[0].text);

  useEffect(() => {
    // Prevent background scrolling while welcome screen is active
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          onCompleteRef.current?.();
        },
      });

      // ------------------------------------------
      // 1. Initial State Setup (All Modes)
      // ------------------------------------------
      gsap.set('.welcome-emblem', { scale: 0, rotation: -25, opacity: 0 });
      gsap.set('.welcome-laser', { width: '0%' });
      gsap.set('.welcome-dev-word', { maxWidth: '0px', opacity: 0, scale: 0.9 });
      gsap.set('.welcome-progress-bar', { width: '0%' });
      gsap.set(flashRef.current, { opacity: 0 });
      gsap.set(flareRef.current, { scale: 0.4, opacity: 0 });

      // Mode-specific initial setups
      if (exitMode === 'sheesh') {
        gsap.set(slashSvgRef.current, { opacity: 0 });
        gsap.set([slashMainRef.current, clawTopRef.current, clawBottomRef.current], {
          strokeDasharray: 1400,
          strokeDashoffset: 1400,
        });
        if (sheeshBadgeRef.current) gsap.set(sheeshBadgeRef.current, { scale: 0.7, opacity: 0 });
      } else if (exitMode === 'batterup') {
        gsap.set(centerBeamRef.current, { width: '0%', opacity: 0 });
        if (batterBadgeRef.current) gsap.set(batterBadgeRef.current, { scale: 0.7, opacity: 0 });
      } else if (exitMode === 'drip') {
        gsap.set(shockwaveRef.current, { scale: 0.2, opacity: 0 });
        if (dripBadgeRef.current) gsap.set(dripBadgeRef.current, { scale: 0.7, opacity: 0 });
      } else if (exitMode === 'seven') {
        gsap.set('.slit-laser-divider', { opacity: 0 });
        if (sevenBadgeRef.current) gsap.set(sevenBadgeRef.current, { scale: 0.7, opacity: 0 });
      }

      // ------------------------------------------
      // 2. Emblem Pop-in (0.05s)
      // ------------------------------------------
      tl.to('.welcome-emblem', {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'back.out(2)',
      }, 0.05);

      // ------------------------------------------
      // 3. Progress Counter (0% to 100%)
      // ------------------------------------------
      const progressObj = { value: 0 };
      tl.to(progressObj, {
        value: 100,
        duration: 2.7,
        ease: 'power2.inOut',
        onUpdate: () => {
          const rounded = Math.round(progressObj.value);
          const bars = containerRef.current?.querySelectorAll('.welcome-progress-bar');
          const texts = containerRef.current?.querySelectorAll('.welcome-progress-text');
          if (bars) bars.forEach(b => { b.style.width = `${rounded}%`; });
          if (texts) texts.forEach(t => { t.textContent = `${rounded}%`; });
        },
      }, 0.1);

      // ------------------------------------------
      // 4. Strikethrough laser draw on "MONSTER"
      // ------------------------------------------
      tl.to('.welcome-laser', {
        width: '100%',
        duration: 0.6,
        ease: 'power2.inOut',
      }, 0.75);

      tl.to('.welcome-monster', {
        color: '#71717A',
        duration: 0.4,
      }, 0.85);

      // ------------------------------------------
      // 5. Expand "DEVELOPER"
      // ------------------------------------------
      tl.to('.welcome-dev-word', {
        maxWidth: '160px',
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: 'power3.out',
      }, 0.95);

      // ------------------------------------------
      // 6. Multilingual Greeting Cross-fades (HELLO -> KR -> JP)
      // ------------------------------------------
      // Switch to Korean
      tl.to('.welcome-greeting-text', {
        opacity: 0,
        y: -14,
        scale: 0.95,
        duration: 0.16,
        ease: 'power2.in',
        onComplete: () => {
          setActiveGreeting(GREETINGS[1].text);
          const greetings = containerRef.current?.querySelectorAll('.welcome-greeting-text');
          if (greetings) greetings.forEach(g => { g.textContent = GREETINGS[1].text; });
        },
      }, 0.95);

      tl.to('.welcome-greeting-text', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: 'power3.out',
      }, 1.15);

      // Switch to Japanese
      tl.to('.welcome-greeting-text', {
        opacity: 0,
        y: -14,
        scale: 0.95,
        duration: 0.16,
        ease: 'power2.in',
        onComplete: () => {
          setActiveGreeting(GREETINGS[2].text);
          const greetings = containerRef.current?.querySelectorAll('.welcome-greeting-text');
          if (greetings) greetings.forEach(g => { g.textContent = GREETINGS[2].text; });
        },
      }, 1.85);

      tl.to('.welcome-greeting-text', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: 'power3.out',
      }, 2.05);

      // ==========================================
      // 7. EXIT ANIMATION ROUTER BY THEME
      // ==========================================

      if (exitMode === 'sheesh') {
        // ----------------------------------------
        // MODE 1: "SHEESH" — Laser Claw Slash Split
        // ----------------------------------------
        tl.to(containerRef.current, { scale: 0.99, duration: 0.08, ease: 'power2.out' }, 2.80);

        tl.call(() => { onStartExitRef.current?.(); }, null, 2.88);

        tl.set(slashSvgRef.current, { opacity: 1 }, 2.88);
        tl.to(flareRef.current, { opacity: 0.85, scale: 1.3, duration: 0.12, ease: 'power2.out' }, 2.88);

        // Slash lines draw across
        tl.to([slashMainRef.current, clawTopRef.current, clawBottomRef.current], {
          strokeDashoffset: 0,
          duration: 0.16,
          ease: 'power4.inOut',
        }, 2.88);

        // Flash
        tl.to(flashRef.current, { opacity: 0.4, duration: 0.06, ease: 'power2.in' }, 2.94);
        tl.to(flashRef.current, { opacity: 0, duration: 0.18, ease: 'power2.out' }, 3.00);

        if (sheeshBadgeRef.current) {
          tl.to(sheeshBadgeRef.current, { opacity: 1, scale: 1, duration: 0.15, ease: 'back.out(2)' }, 2.92);
        }

        const splitTime = 3.02;
        tl.set(containerRef.current, { pointerEvents: 'none' }, splitTime);

        // Split panels fly apart diagonally
        tl.to(topPanelRef.current, {
          xPercent: -22,
          yPercent: -26,
          rotate: -2.5,
          opacity: 0,
          duration: 0.58,
          ease: 'power4.in',
        }, splitTime);

        tl.to(bottomPanelRef.current, {
          xPercent: 22,
          yPercent: 26,
          rotate: 2.5,
          opacity: 0,
          duration: 0.58,
          ease: 'power4.in',
        }, splitTime);

        if (sheeshBadgeRef.current) {
          tl.to(sheeshBadgeRef.current, { scale: 2.2, opacity: 0, duration: 0.45, ease: 'power3.out' }, splitTime + 0.04);
        }
        tl.to(slashSvgRef.current, { scale: 1.15, opacity: 0, duration: 0.42, ease: 'power3.out' }, splitTime + 0.04);
        tl.to(flareRef.current, { scale: 2.6, opacity: 0, duration: 0.48, ease: 'power3.out' }, splitTime);

      } else if (exitMode === 'batterup') {
        // ----------------------------------------
        // MODE 2: "BATTER UP" — Double Stadium Blast Doors
        // ----------------------------------------
        tl.to(containerRef.current, { scale: 0.992, duration: 0.08, ease: 'power2.out' }, 2.78);

        tl.call(() => { onStartExitRef.current?.(); }, null, 2.85);

        // Center horizontal laser beam expands across
        tl.to(centerBeamRef.current, {
          width: '100%',
          opacity: 1,
          duration: 0.16,
          ease: 'power3.inOut',
        }, 2.82);

        // Crimson Flash on blast
        tl.to(flashRef.current, { opacity: 0.45, duration: 0.06, ease: 'power2.in' }, 2.92);
        tl.to(flashRef.current, { opacity: 0, duration: 0.2, ease: 'power2.out' }, 2.98);

        if (batterBadgeRef.current) {
          tl.to(batterBadgeRef.current, { opacity: 1, scale: 1, duration: 0.15, ease: 'back.out(2)' }, 2.90);
        }

        const doorSplitTime = 3.00;
        tl.set(containerRef.current, { pointerEvents: 'none' }, doorSplitTime);

        // Top door shoots up
        tl.to(doorTopRef.current, {
          yPercent: -102,
          duration: 0.62,
          ease: 'power4.inOut',
        }, doorSplitTime);

        // Bottom door shoots down
        tl.to(doorBottomRef.current, {
          yPercent: 102,
          duration: 0.62,
          ease: 'power4.inOut',
        }, doorSplitTime);

        // Center beam blossoms and dissolves
        tl.to(centerBeamRef.current, {
          scaleY: 15,
          opacity: 0,
          duration: 0.38,
          ease: 'power3.out',
        }, doorSplitTime + 0.04);

        if (batterBadgeRef.current) {
          tl.to(batterBadgeRef.current, { scale: 1.8, opacity: 0, duration: 0.42, ease: 'power3.out' }, doorSplitTime + 0.04);
        }

      } else if (exitMode === 'drip') {
        // ----------------------------------------
        // MODE 3: "DRIP" — Bass Drop Glitch & Emblem Hyper Zoom Tunnel
        // ----------------------------------------
        // Micro-glitch shake build-up
        tl.to(containerRef.current, { x: -4, duration: 0.03, ease: 'none' }, 2.70);
        tl.to(containerRef.current, { x: 5, duration: 0.03, ease: 'none' }, 2.73);
        tl.to(containerRef.current, { x: -3, duration: 0.03, ease: 'none' }, 2.76);
        tl.to(containerRef.current, { x: 3, duration: 0.03, ease: 'none' }, 2.79);
        tl.to(containerRef.current, { x: 0, duration: 0.03, ease: 'none' }, 2.82);

        tl.call(() => { onStartExitRef.current?.(); }, null, 2.86);

        // Heavy bass drop flash
        tl.to(flashRef.current, { opacity: 0.5, duration: 0.08, ease: 'power2.in' }, 2.86);
        tl.to(flashRef.current, { opacity: 0, duration: 0.25, ease: 'power2.out' }, 2.94);

        // Collapse texts, loading bar, and equalizer
        tl.to('.drip-collapse', {
          scale: 0.65,
          opacity: 0,
          duration: 0.16,
          ease: 'power2.in',
        }, 2.86);

        // DRIP Badge
        if (dripBadgeRef.current) {
          tl.to(dripBadgeRef.current, { opacity: 1, scale: 1, duration: 0.15, ease: 'back.out(2)' }, 2.88);
          tl.to(dripBadgeRef.current, { scale: 2.2, opacity: 0, duration: 0.45, ease: 'power3.out' }, 2.98);
        }

        // Devil Horns Emblem zooms exponentially into the camera
        tl.set(dripEmblemRef.current, { zIndex: 60 }, 2.86);
        tl.to(dripEmblemRef.current, {
          scale: 30,
          rotate: 15,
          opacity: 0,
          duration: 0.58,
          ease: 'expo.in',
        }, 2.90);

        // Shockwave ring explosion
        tl.set(shockwaveRef.current, { opacity: 1, scale: 0.3 }, 2.88);
        tl.to(shockwaveRef.current, {
          scale: 5,
          opacity: 0,
          duration: 0.52,
          ease: 'power3.out',
        }, 2.90);

        // Entire screen fades into Hero
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.45,
          ease: 'power3.inOut',
          pointerEvents: 'none',
        }, 3.08);

      } else if (exitMode === 'seven') {
        // ----------------------------------------
        // MODE 4: "7-MEMBERS" — Staggered Concert LED Slits
        // ----------------------------------------
        tl.to(containerRef.current, { scale: 0.99, duration: 0.08, ease: 'power2.out' }, 2.78);

        tl.call(() => { onStartExitRef.current?.(); }, null, 2.86);

        // Vertical laser dividers ignite
        tl.to('.slit-laser-divider', {
          opacity: 1,
          duration: 0.12,
          ease: 'power2.out',
        }, 2.82);

        // Flash
        tl.to(flashRef.current, { opacity: 0.4, duration: 0.06, ease: 'power2.in' }, 2.88);
        tl.to(flashRef.current, { opacity: 0, duration: 0.18, ease: 'power2.out' }, 2.94);

        if (sevenBadgeRef.current) {
          tl.to(sevenBadgeRef.current, { opacity: 1, scale: 1, duration: 0.15, ease: 'back.out(2)' }, 2.90);
        }

        const sevenTime = 2.96;
        tl.set(containerRef.current, { pointerEvents: 'none' }, sevenTime);

        // Staggered vertical slide (alternating up and down)
        slitRefs.current.forEach((slitEl, i) => {
          if (!slitEl) return;
          const isUp = i % 2 === 0;
          tl.to(slitEl, {
            yPercent: isUp ? -110 : 110,
            duration: 0.6,
            ease: 'power4.inOut',
          }, sevenTime + i * 0.045);
        });

        if (sevenBadgeRef.current) {
          tl.to(sevenBadgeRef.current, { scale: 1.8, opacity: 0, duration: 0.42, ease: 'power3.out' }, sevenTime + 0.15);
        }
      }

    }, containerRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [exitMode]);

  // Reusable visual layout rendered inside the cut panels
  const renderPanelContent = (panelId, options = {}) => (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-12 select-none relative">
      {/* 1. Ambient Background Grid & Crimson Glow */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#E11D2E0C_1px,transparent_1px),linear-gradient(to_bottom,#E11D2E0C_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#E11D2E08_1px,transparent_1px),linear-gradient(to_bottom,#E11D2E08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[38rem] h-80 sm:h-[38rem] bg-[#E11D2E]/10 dark:bg-[#E11D2E]/20 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none animate-pulse"
        style={{ animationDuration: '4s' }}
        aria-hidden="true"
      />

      {/* 2. Top Bar: Baemon Inspired System Tag */}
      <div className={`relative z-10 w-full flex items-center justify-between text-xs font-mono ${options.isDrip ? 'drip-collapse' : ''}`}>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D2E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E11D2E]" />
          </span>
          <span className="tracking-widest uppercase text-[11px] text-[#52525B] dark:text-[#A1A1AA] font-semibold">
            BAEMON // 07
          </span>
        </div>

        <div className="text-[11px] font-mono tracking-widest text-[#71717A] dark:text-[#52525B]">
          MONSTIEZ // 2026.SYS
        </div>
      </div>

      {/* 3. Centerpiece: BABYMONSTER Inspired Welcome Stage */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4">
        {/* Devil Horns Crown Motif + Monogram */}
        <div
          ref={options.isDrip ? dripEmblemRef : null}
          className="welcome-emblem relative mb-5 flex flex-col items-center will-change-transform"
        >
          {/* Stylized Devil Horns (Iconic BABYMONSTER Motif) */}
          <div className="flex items-center justify-between w-16 -mb-1 px-1 text-[#E11D2E] filter drop-shadow-[0_0_8px_rgba(225,29,46,0.5)] dark:drop-shadow-[0_0_12px_rgba(225,29,46,0.9)]">
            <svg className="w-6 h-6 -rotate-12 transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
            </svg>
            <svg className="w-6 h-6 rotate-12 transform scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
            </svg>
          </div>

          {/* Badge Container */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#090909] border border-[#E11D2E]/40 dark:border-[#E11D2E]/50 shadow-xl shadow-[#E11D2E]/15 dark:shadow-2xl dark:shadow-[#E11D2E]/30 relative group">
            <div className="absolute inset-0 rounded-2xl bg-[#E11D2E]/10 dark:bg-[#E11D2E]/20 blur-md pointer-events-none animate-pulse" />
            <Code2 className="w-8 h-8 text-[#E11D2E] relative z-10" />
          </div>
        </div>

        {/* Dynamic Multilingual Greeting Headline (EN -> KR -> JP) with Red Glow */}
        <div className={`min-h-[4.5rem] sm:min-h-[6rem] md:min-h-[7rem] flex items-center justify-center overflow-hidden ${options.isDrip ? 'drip-collapse' : ''}`}>
          <h1
            className="welcome-greeting-text font-['Space_Grotesk',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-[#09090B] dark:text-white drop-shadow-[0_0_25px_rgba(225,29,46,0.3)] dark:drop-shadow-[0_0_35px_rgba(225,29,46,0.6)] select-none will-change-transform"
          >
            {activeGreeting}
          </h1>
        </div>

        {/* Catchphrase Homage: "BABY, I'M A MONSTER -> DEVELOPER" */}
        <div className={`mt-2.5 flex items-center justify-center font-mono text-[11px] sm:text-sm md:text-base select-none max-w-full px-1 ${options.isDrip ? 'drip-collapse' : ''}`}>
          {/* Opening Quote */}
          <span className="text-[#E11D2E] font-bold text-sm sm:text-base select-none">"</span>

          {/* Intro Text */}
          <span className="tracking-wider sm:tracking-widest uppercase font-bold text-[#09090B] dark:text-white ml-0.5 sm:ml-1">
            BABY, I'M A
          </span>

          {/* MONSTER word: starts white, dims to gray with GSAP */}
          <span className="relative inline-flex items-center px-1 font-bold uppercase tracking-wider sm:tracking-widest">
            <span className="welcome-monster text-[#09090B] dark:text-white transition-colors duration-300">
              MONSTER
            </span>
            {/* Animated Red Strikethrough Line (GSAP drawn laser) */}
            <span
              className="welcome-laser absolute left-0 h-[2px] sm:h-[2.5px] bg-[#E11D2E] rounded-full shadow-[0_0_8px_rgba(225,29,46,0.9)]"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
              aria-hidden="true"
            />
          </span>

          {/* Smoothly expanding DEVELOPER Word */}
          <span className="welcome-dev-word inline-flex items-center overflow-hidden will-change-transform">
            <span className="pl-0.5 sm:pl-1.5 tracking-wider sm:tracking-widest uppercase font-extrabold text-[#E11D2E] whitespace-nowrap drop-shadow-[0_0_10px_rgba(225,29,46,0.7)]">
              DEVELOPER
            </span>
          </span>

          {/* Closing Quote */}
          <span className="text-[#E11D2E] font-bold text-sm sm:text-base select-none">"</span>
        </div>

        {/* 7-Member Pulsing Equalizer Bars (Homage to 7 Members) */}
        <div className={`flex items-center justify-center gap-1.5 h-6 my-4 ${options.isDrip ? 'drip-collapse' : ''}`} title="7 Members Equalizer">
          {[45, 80, 100, 65, 90, 55, 85].map((height, i) => (
            <span
              key={`${panelId}-eq-${i}`}
              className="w-1 bg-gradient-to-t from-[#E11D2E] to-[#FF4D5E] rounded-full animate-pulse shadow-[0_0_6px_rgba(225,29,46,0.4)] dark:shadow-[0_0_8px_rgba(225,29,46,0.9)]"
              style={{
                height: `${height}%`,
                animationDuration: `${0.6 + (i % 4) * 0.18}s`,
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>

        {/* Subtitle */}
        <div className={`flex items-center gap-2 font-mono text-xs sm:text-sm text-[#52525B] dark:text-[#71717A] ${options.isDrip ? 'drip-collapse' : ''}`}>
          <span className="text-[#E11D2E] font-semibold">//</span>
          <span className="tracking-wide">Juan Sterling — Software Developer</span>
        </div>

        {/* Laser Loading Bar (Batter Up Theme) */}
        <div className={`mt-8 w-full max-w-sm sm:max-w-md space-y-2.5 ${options.isDrip ? 'drip-collapse' : ''}`}>
          <div className="w-full h-2 sm:h-2.5 bg-[#E4E4E7] dark:bg-[#1F1F23] rounded-full overflow-hidden relative p-[1px] border border-[#E4E4E7] dark:border-[#2A2A2A]">
            <div className="welcome-progress-bar h-full rounded-full bg-gradient-to-r from-[#E11D2E] via-[#FF3B4D] to-[#FF4D5E] shadow-[0_0_12px_rgba(225,29,46,0.6)] dark:shadow-[0_0_16px_rgba(225,29,46,0.95)] will-change-transform" />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
            <span className="tracking-wider font-medium">BATTER UP // LOADING</span>
            <span className="welcome-progress-text text-[#09090B] dark:text-white font-bold">0%</span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Footer: Baemon Swagger */}
      <div className={`relative z-10 w-full flex items-center justify-between text-[11px] font-mono text-[#71717A] dark:text-[#52525B] ${options.isDrip ? 'drip-collapse' : ''}`}>
        <span>DESIGN INSPIRED BY BABYMONSTER</span>
        <span className="hidden sm:inline">SHEESH // DRIP // FOREVER</span>
        <span>INDONESIA</span>
      </div>
    </div>
  );

  return (
    <aside
      ref={containerRef}
      aria-label="Welcome Screen"
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto bg-transparent select-none will-change-transform"
    >
      {/* ---------------------------------------------------- */}
      {/* MODE 1: "SHEESH" — Diagonal Claw / Laser Slash Split */}
      {/* ---------------------------------------------------- */}
      {exitMode === 'sheesh' && (
        <>
          {/* Upper-Left Sliced Panel */}
          <div
            ref={topPanelRef}
            className="absolute inset-0 bg-[#FAFAFA] dark:bg-[#0f1117] overflow-hidden will-change-transform"
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 65.2%, 0% 35.2%)' }}
          >
            {renderPanelContent('top')}
          </div>

          {/* Lower-Right Sliced Panel */}
          <div
            ref={bottomPanelRef}
            aria-hidden="true"
            className="absolute inset-0 bg-[#FAFAFA] dark:bg-[#0f1117] overflow-hidden will-change-transform"
            style={{ clipPath: 'polygon(0% 34.8%, 100% 64.8%, 100% 100%, 0% 100%)' }}
          >
            {renderPanelContent('bottom')}
          </div>

          {/* 3-Claw Laser Slash SVG */}
          <svg
            ref={slashSvgRef}
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-40 opacity-0 overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <filter id="sheesh-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur1" />
                <feGaussianBlur stdDeviation="14" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="laser-core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF4D5E" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E11D2E" />
              </linearGradient>
            </defs>

            <path
              ref={clawTopRef}
              d="M -50 250 L 1050 580"
              stroke="#E11D2E"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#sheesh-glow)"
              opacity="0.85"
            />
            <path
              ref={slashMainRef}
              d="M -100 320 L 1100 680"
              stroke="url(#laser-core-grad)"
              strokeWidth="7"
              strokeLinecap="round"
              filter="url(#sheesh-glow)"
            />
            <path
              ref={clawBottomRef}
              d="M -50 420 L 1050 750"
              stroke="#E11D2E"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#sheesh-glow)"
              opacity="0.85"
            />
          </svg>

          {/* "SHEESH!" Impact Typography */}
          <div
            ref={sheeshBadgeRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none select-none text-center opacity-0"
            aria-hidden="true"
          >
            <span className="font-['Space_Grotesk',sans-serif] text-5xl sm:text-7xl md:text-8xl font-black italic tracking-widest text-white drop-shadow-[0_0_20px_#E11D2E] drop-shadow-[0_0_40px_#E11D2E]">
              SHEESH!
            </span>
          </div>
        </>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODE 2: "BATTER UP" — Double Stadium Blast Doors     */}
      {/* ---------------------------------------------------- */}
      {exitMode === 'batterup' && (
        <>
          {/* Top Door (Retracts Upward) */}
          <div
            ref={doorTopRef}
            className="absolute inset-0 bg-[#FAFAFA] dark:bg-[#0f1117] overflow-hidden will-change-transform"
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 50.2%, 0% 50.2%)' }}
          >
            {renderPanelContent('top')}
          </div>

          {/* Bottom Door (Retracts Downward) */}
          <div
            ref={doorBottomRef}
            aria-hidden="true"
            className="absolute inset-0 bg-[#FAFAFA] dark:bg-[#0f1117] overflow-hidden will-change-transform"
            style={{ clipPath: 'polygon(0% 49.8%, 100% 49.8%, 100% 100%, 0% 100%)' }}
          >
            {renderPanelContent('bottom')}
          </div>

          {/* Center Horizontal Laser Energy Beam */}
          <div
            ref={centerBeamRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[4px] bg-white rounded-full z-40 pointer-events-none shadow-[0_0_15px_#E11D2E,0_0_35px_#FF3B4D] will-change-transform"
            style={{ width: '0%' }}
            aria-hidden="true"
          />

          {/* "BATTER UP!" Stencil Typography */}
          <div
            ref={batterBadgeRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none select-none text-center opacity-0"
            aria-hidden="true"
          >
            <span className="font-['Space_Grotesk',sans-serif] text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-widest text-[#E11D2E] drop-shadow-[0_0_20px_#FFFFFF] drop-shadow-[0_0_40px_rgba(225,29,46,0.9)]">
              BATTER UP!
            </span>
          </div>
        </>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODE 3: "DRIP" — Bass Drop Glitch & Emblem Zoom      */}
      {/* ---------------------------------------------------- */}
      {exitMode === 'drip' && (
        <div
          ref={dripPanelRef}
          className="absolute inset-0 bg-[#FAFAFA] dark:bg-[#0f1117] overflow-hidden will-change-transform"
        >
          {renderPanelContent('drip', { isDrip: true })}

          {/* Radial Shockwave Explosion Ring */}
          <div
            ref={shockwaveRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-4 border-[#E11D2E] shadow-[0_0_35px_#E11D2E] opacity-0 pointer-events-none z-35 will-change-transform"
            aria-hidden="true"
          />

          {/* "DRIP!" Watermark */}
          <div
            ref={dripBadgeRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none select-none text-center opacity-0"
            aria-hidden="true"
          >
            <span className="font-['Space_Grotesk',sans-serif] text-6xl sm:text-8xl md:text-9xl font-black italic tracking-widest text-[#E11D2E] drop-shadow-[0_0_30px_#FF3B4D] drop-shadow-[0_0_60px_#E11D2E]">
              DRIP!
            </span>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODE 4: "7-MEMBERS" — Staggered Concert LED Slits    */}
      {/* ---------------------------------------------------- */}
      {exitMode === 'seven' && (
        <>
          {MEMBERS.map((memberName, i) => {
            const leftPct = i * (100 / 7);
            const rightPct = (i + 1) * (100 / 7) + 0.15; // tiny overlap to prevent hairline
            return (
              <div
                key={`slit-${memberName}`}
                ref={(el) => (slitRefs.current[i] = el)}
                className="absolute inset-0 bg-[#FAFAFA] dark:bg-[#0f1117] overflow-hidden will-change-transform"
                style={{
                  clipPath: `polygon(${leftPct}% 0%, ${rightPct}% 0%, ${rightPct}% 100%, ${leftPct}% 100%)`,
                }}
                aria-hidden={i > 0 ? 'true' : undefined}
              >
                {renderPanelContent(`slit-${i}`)}

                {/* Vertical Laser Divider Line */}
                {i < 6 && (
                  <div
                    className="slit-laser-divider absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#E11D2E] via-[#FFFFFF] to-[#E11D2E] shadow-[0_0_10px_#E11D2E] pointer-events-none z-30 opacity-0"
                    style={{ left: `${(i + 1) * (100 / 7)}%` }}
                  />
                )}

                {/* Member Badge at bottom of each slit */}
                <div
                  className="absolute bottom-16 sm:bottom-20 z-20 pointer-events-none text-center font-mono text-[9px] sm:text-[11px] font-bold tracking-widest text-[#E11D2E]/80"
                  style={{
                    left: `${leftPct}%`,
                    width: `${100 / 7}%`,
                  }}
                >
                  0{i + 1} {memberName}
                </div>
              </div>
            );
          })}

          {/* "7 MONSTERS" Watermark */}
          <div
            ref={sevenBadgeRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none select-none text-center opacity-0"
            aria-hidden="true"
          >
            <span className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-widest text-white drop-shadow-[0_0_20px_#E11D2E] drop-shadow-[0_0_40px_#E11D2E]">
              7 MONSTERS
            </span>
          </div>
        </>
      )}

      {/* Global Crimson Flash Overlay (Impact FX) */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-[#E11D2E] opacity-0 pointer-events-none z-30"
        aria-hidden="true"
      />

      {/* Global Impact Center Flare */}
      <div
        ref={flareRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[36rem] h-80 sm:h-[36rem] bg-[#E11D2E]/30 rounded-full blur-[80px] sm:blur-[120px] opacity-0 pointer-events-none z-30"
        aria-hidden="true"
      />
    </aside>
  );
}
