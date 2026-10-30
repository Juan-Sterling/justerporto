import React, { useEffect, useRef, useState } from 'react';

/**
 * TacticalCrosshair
 * Valorant-inspired Tactical FPS Crosshair & Gunshot Bullet Impact System.
 * 
 * Performance & Architecture:
 * - Active strictly on desktop PC with fine mouse pointer (zero overhead on mobile/tablet).
 * - 0 React re-renders during mouse movements: updates GPU transform directly on DOM refs.
 * - Mathematical pixel-perfect symmetry (Valorant 1-4-2-2 style crosshair).
 * - 100% Contrast in Light and Dark mode using 1px solid black bounding outline.
 * - Tactical Lock-On HUD Brackets when hovering clickable elements (buttons, links).
 * - Recoil kick + multi-particle bullet impact VFX on click (auto-cleaned in 400ms).
 * - Guaranteed restoration of native cursor when leaving the Side Profile.
 */
export default function TacticalCrosshair() {
  const [isDesktop, setIsDesktop] = useState(false);
  const crosshairRef = useRef(null);
  const impactsContainerRef = useRef(null);
  const isLockedRef = useRef(false);
  const isVisibleRef = useRef(false);

  // 1. Rigorous Desktop/Pointer Verification
  useEffect(() => {
    const checkPointer = () => {
      // Must have fine pointer (mouse) and hover capability, and NOT be a pure touch device
      const hasFinePointer =
        window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        !('ontouchstart' in window && navigator.maxTouchPoints > 2);
      setIsDesktop(hasFinePointer);
    };

    checkPointer();
    window.addEventListener('resize', checkPointer);
    return () => window.removeEventListener('resize', checkPointer);
  }, []);

  // 2. Tactical Cursor Engine (Direct GPU Updates & Event Listeners)
  useEffect(() => {
    if (!isDesktop) return;

    // Apply cursor-suppression class to document body
    document.body.classList.add('tactical-cursor-active');

    const handlePointerMove = (e) => {
      if (!crosshairRef.current) return;

      // Show crosshair if hidden
      if (!isVisibleRef.current) {
        crosshairRef.current.style.opacity = '1';
        isVisibleRef.current = true;
      }

      // 60-144+ FPS Direct GPU Translation (Zero React Render Cost)
      crosshairRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      // Target Locked Detection on Interactive Elements
      const target = e.target;
      const isInteractive = Boolean(
        target &&
        target.closest &&
        target.closest(
          'a, button, [role="button"], input, select, textarea, .cursor-pointer, [data-interactive="true"]'
        )
      );

      if (isInteractive !== isLockedRef.current) {
        isLockedRef.current = isInteractive;
        crosshairRef.current.classList.toggle('target-locked', isInteractive);
      }
    };

    const handlePointerDown = (e) => {
      if (!crosshairRef.current || !impactsContainerRef.current) return;

      // 1. Crosshair Recoil Kick Animation
      crosshairRef.current.classList.remove('recoil-kick');
      void crosshairRef.current.offsetWidth; // Force reflow to re-trigger rapid clicks
      crosshairRef.current.classList.add('recoil-kick');

      // 2. High-Performance Bullet Impact Spawner
      const x = e.clientX;
      const y = e.clientY;

      const impact = document.createElement('div');
      impact.className = 'tactical-bullet-impact';
      impact.style.left = `${x}px`;
      impact.style.top = `${y}px`;

      // 6 random directional spark rays
      const sparkCount = 6;
      let sparksHtml = '';
      for (let i = 0; i < sparkCount; i++) {
        const angle = (i * (360 / sparkCount) + (Math.random() * 30 - 15)) * (Math.PI / 180);
        const distance = 18 + Math.random() * 24; // px travel
        const sx = Math.cos(angle) * distance;
        const sy = Math.sin(angle) * distance;
        sparksHtml += `<span class="tactical-spark" style="--tx: ${sx.toFixed(1)}px; --ty: ${sy.toFixed(1)}px; --delay: ${(Math.random() * 0.03).toFixed(3)}s"></span>`;
      }

      impact.innerHTML = `
        <div class="tactical-muzzle-flash"></div>
        <div class="tactical-shockwave-ring"></div>
        <div class="tactical-bullet-hole"></div>
        ${sparksHtml}
      `;

      impactsContainerRef.current.appendChild(impact);

      // Auto-cleanup impact node once animation completes (400ms)
      setTimeout(() => {
        if (impact.parentNode) {
          impact.parentNode.removeChild(impact);
        }
      }, 420);
    };

    const handleMouseLeave = () => {
      if (crosshairRef.current) {
        crosshairRef.current.style.opacity = '0';
        isVisibleRef.current = false;
      }
    };

    const handleMouseEnter = () => {
      if (crosshairRef.current) {
        crosshairRef.current.style.opacity = '1';
        isVisibleRef.current = true;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      // Guaranteed Cleanup
      document.body.classList.remove('tactical-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Dynamic Scoped CSS for Tactical FPS Crosshair & Bullet Sparks */}
      <style>{`
        /* 1. Global cursor suppression when tactical mode is active */
        body.tactical-cursor-active,
        body.tactical-cursor-active * {
          cursor: none !important;
        }

        /* 2. Tactical Crosshair Root */
        .tactical-crosshair-root {
          position: fixed;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          pointer-events: none;
          z-index: 999999;
          opacity: 0;
          transition: opacity 0.15s ease-out;
          will-change: transform;
        }

        .tactical-crosshair-body {
          position: relative;
          width: 32px;
          height: 32px;
          margin-left: -16px;
          margin-top: -16px;
          pointer-events: none;
        }

        /* Valorant Crosshair Lines & Center Dot (Pixel-Perfect 1-4-2-2) */
        .tactical-center-dot {
          position: absolute;
          width: 2px;
          height: 2px;
          left: 15px;
          top: 15px;
          background-color: #00f5a0;
          box-shadow: 0 0 0 1px #000000;
          transition: background-color 0.12s ease, transform 0.12s ease;
        }

        .tactical-ch-bar {
          position: absolute;
          background-color: #00f5a0;
          box-shadow: 0 0 0 1px #000000;
          transition: transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.12s ease;
        }

        /* Top Bar */
        .tactical-ch-bar.top {
          width: 2px;
          height: 6px;
          left: 15px;
          top: 6px;
        }

        /* Bottom Bar */
        .tactical-ch-bar.bottom {
          width: 2px;
          height: 6px;
          left: 15px;
          bottom: 6px;
        }

        /* Left Bar */
        .tactical-ch-bar.left {
          width: 6px;
          height: 2px;
          left: 6px;
          top: 15px;
        }

        /* Right Bar */
        .tactical-ch-bar.right {
          width: 6px;
          height: 2px;
          right: 6px;
          top: 15px;
        }

        /* Tactical HUD Corner Brackets (Target Lock-On Indicators) */
        .tactical-hud-bracket {
          position: absolute;
          width: 5px;
          height: 5px;
          border-color: #ef4444;
          opacity: 0;
          transform: scale(1.4);
          transition: opacity 0.15s ease, transform 0.15s cubic-bezier(0.18, 0.89, 0.32, 1.28);
          filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.8));
        }

        .tactical-hud-bracket.tl {
          top: 2px;
          left: 2px;
          border-top: 1.5px solid #ef4444;
          border-left: 1.5px solid #ef4444;
        }

        .tactical-hud-bracket.tr {
          top: 2px;
          right: 2px;
          border-top: 1.5px solid #ef4444;
          border-right: 1.5px solid #ef4444;
        }

        .tactical-hud-bracket.bl {
          bottom: 2px;
          left: 2px;
          border-bottom: 1.5px solid #ef4444;
          border-left: 1.5px solid #ef4444;
        }

        .tactical-hud-bracket.br {
          bottom: 2px;
          right: 2px;
          border-bottom: 1.5px solid #ef4444;
          border-right: 1.5px solid #ef4444;
        }

        /* Target Locked State (Hovering buttons / links) */
        .tactical-crosshair-root.target-locked .tactical-center-dot {
          background-color: #ef4444;
          transform: scale(1.4);
          box-shadow: 0 0 0 1px #000000, 0 0 6px #ef4444;
        }

        .tactical-crosshair-root.target-locked .tactical-ch-bar {
          background-color: #ef4444;
          box-shadow: 0 0 0 1px #000000, 0 0 4px rgba(239, 68, 68, 0.5);
        }

        .tactical-crosshair-root.target-locked .tactical-ch-bar.top {
          transform: translateY(-2px);
        }

        .tactical-crosshair-root.target-locked .tactical-ch-bar.bottom {
          transform: translateY(2px);
        }

        .tactical-crosshair-root.target-locked .tactical-ch-bar.left {
          transform: translateX(-2px);
        }

        .tactical-crosshair-root.target-locked .tactical-ch-bar.right {
          transform: translateX(2px);
        }

        .tactical-crosshair-root.target-locked .tactical-hud-bracket {
          opacity: 1;
          transform: scale(1);
        }

        /* Recoil Kick Animation (Triggered instantaneously on Click) */
        .tactical-crosshair-root.recoil-kick .tactical-ch-bar.top {
          animation: recoilTop 0.14s ease-out forwards;
        }
        .tactical-crosshair-root.recoil-kick .tactical-ch-bar.bottom {
          animation: recoilBottom 0.14s ease-out forwards;
        }
        .tactical-crosshair-root.recoil-kick .tactical-ch-bar.left {
          animation: recoilLeft 0.14s ease-out forwards;
        }
        .tactical-crosshair-root.recoil-kick .tactical-ch-bar.right {
          animation: recoilRight 0.14s ease-out forwards;
        }

        @keyframes recoilTop {
          0% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
        @keyframes recoilBottom {
          0% { transform: translateY(5px); }
          100% { transform: translateY(0); }
        }
        @keyframes recoilLeft {
          0% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        @keyframes recoilRight {
          0% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }

        /* 3. Bullet Impact & Spark VFX */
        .tactical-impacts-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 999998;
          overflow: hidden;
        }

        .tactical-bullet-impact {
          position: absolute;
          width: 0;
          height: 0;
          pointer-events: none;
        }

        /* High-intensity muzzle flash at center */
        .tactical-muzzle-flash {
          position: absolute;
          width: 18px;
          height: 18px;
          left: -9px;
          top: -9px;
          border-radius: 50%;
          background: radial-gradient(circle, #ffffff 0%, #fef08a 35%, #00f5a0 70%, transparent 100%);
          box-shadow: 0 0 10px #00f5a0;
          animation: flashFade 0.15s ease-out forwards;
        }

        /* Expanding shockwave ring */
        .tactical-shockwave-ring {
          position: absolute;
          width: 10px;
          height: 10px;
          left: -5px;
          top: -5px;
          border-radius: 50%;
          border: 1.5px solid #00f5a0;
          box-shadow: 0 0 8px #00f5a0;
          animation: shockwaveExpand 0.28s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }

        /* Fleeting bullet impact crater */
        .tactical-bullet-hole {
          position: absolute;
          width: 6px;
          height: 6px;
          left: -3px;
          top: -3px;
          border-radius: 50%;
          background: #090d0b;
          border: 1px solid #10b981;
          animation: bulletMarkFade 0.38s ease-in forwards;
        }

        /* Flying high-velocity sparks */
        .tactical-spark {
          position: absolute;
          width: 2.5px;
          height: 2.5px;
          left: -1.25px;
          top: -1.25px;
          border-radius: 50%;
          background-color: #ffffff;
          box-shadow: 0 0 4px #fef08a, 0 0 8px #00f5a0;
          animation: sparkFly 0.32s cubic-bezier(0.15, 0.85, 0.35, 1) forwards;
          animation-delay: var(--delay, 0s);
        }

        @keyframes flashFade {
          0% { transform: scale(0.6); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.95; }
          100% { transform: scale(0.3); opacity: 0; }
        }

        @keyframes shockwaveExpand {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes bulletMarkFade {
          0% { opacity: 0.9; transform: scale(1); }
          60% { opacity: 0.6; transform: scale(0.9); }
          100% { opacity: 0; transform: scale(0.4); }
        }

        @keyframes sparkFly {
          0% {
            transform: translate3d(0, 0, 0) scale(1.5);
            opacity: 1;
          }
          60% {
            opacity: 0.9;
          }
          100% {
            transform: translate3d(var(--tx, 15px), var(--ty, 15px), 0) scale(0.2);
            opacity: 0;
          }
        }
      `}</style>

      {/* Crosshair Element */}
      <div ref={crosshairRef} className="tactical-crosshair-root">
        <div className="tactical-crosshair-body">
          {/* Tactical Target Lock-On Brackets */}
          <div className="tactical-hud-bracket tl" />
          <div className="tactical-hud-bracket tr" />
          <div className="tactical-hud-bracket bl" />
          <div className="tactical-hud-bracket br" />

          {/* Valorant 1-4-2-2 Crosshair Nodes */}
          <div className="tactical-center-dot" />
          <div className="tactical-ch-bar top" />
          <div className="tactical-ch-bar bottom" />
          <div className="tactical-ch-bar left" />
          <div className="tactical-ch-bar right" />
        </div>
      </div>

      {/* Bullet Impacts Overlay Container */}
      <div ref={impactsContainerRef} className="tactical-impacts-container" />
    </>
  );
}
