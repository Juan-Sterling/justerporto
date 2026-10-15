import React from 'react';

/**
 * BaemonGeometricBackground Component - High-Performance Edition
 * 
 * 100% Procedural SVG Vector Recreation of "bg-geometric-shapes.jpg"
 * Optimized for 60-120 FPS on all devices (Mobile & Low-End GPUs):
 * - ZERO CSS filter: drop-shadow (eliminates Gaussian blur fill-rate bottlenecks)
 * - Pure crisp vector paths, matching the sharp editorial Swiss / Y2K style of the reference image
 * - Responsive Left and Right flanks pinned via xMin/xMax
 * - Full Dual-Theme (Dark Mode: White/Crimson, Light Mode: Black/Crimson)
 */
export default function BaemonGeometricBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none transition-colors duration-300"
      aria-hidden="true"
    >
      {/* Shared Global SVG Gradients & Definitions */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Hatched Diagonal Stripe Pattern - Dark Mode */}
          <pattern
            id="geoHatchDark"
            width="18"
            height="18"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="18" stroke="#262A34" strokeWidth="6" />
          </pattern>

          {/* Hatched Diagonal Stripe Pattern - Light Mode */}
          <pattern
            id="geoHatchLight"
            width="18"
            height="18"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="18" stroke="#E2E8F0" strokeWidth="6" />
          </pattern>

          {/* Fluid Crimson Gradient */}
          <linearGradient id="crimsonFluidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2A3C" />
            <stop offset="60%" stopColor="#E11D2E" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>

          {/* Plus Sign Symbol */}
          <g id="geoPlusMark">
            <line x1="-7" y1="0" x2="7" y2="0" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="0" y1="-7" x2="0" y2="7" strokeWidth="2.8" strokeLinecap="round" />
          </g>
        </defs>
      </svg>

      {/* =========================================================================
          LEFT FLANK: Pinned to the Left Viewport (Guaranteed visible on desktop)
          ========================================================================= */}
      <div className="absolute left-0 top-0 bottom-0 w-[45vw] max-w-[620px] min-w-[260px] pointer-events-none">
        <svg
          viewBox="0 0 500 1000"
          preserveAspectRatio="xMinYMid slice"
          className="w-full h-full block transform-gpu opacity-95 dark:opacity-90"
        >
          {/* 1. Left Hatched Texture Circle */}
          <circle
            cx="80"
            cy="700"
            r="120"
            className="fill-[url(#geoHatchLight)] dark:fill-[url(#geoHatchDark)]"
          />

          {/* 2. Top-Left Fluid Crimson Wave */}
          <path
            d="M -30 -30 L 460 -30 C 400 80 270 120 160 95 C 60 70 -30 40 -30 -30 Z"
            fill="url(#crimsonFluidGrad)"
          />

          {/* 3. Top-Left Thick Hollow Geometric Ring */}
          <circle
            cx="60"
            cy="150"
            r="82"
            fill="none"
            strokeWidth="24"
            className="stroke-[#18181B] dark:stroke-white transition-colors duration-300"
          />

          {/* 4. Left Diagonal Capsule Track with Double Arrowheads */}
          <g transform="translate(140, 410) rotate(-46)" className="transition-colors duration-300">
            {/* Red Outline Track */}
            <rect
              x="-18"
              y="-150"
              width="36"
              height="300"
              rx="18"
              fill="none"
              stroke="#E11D2E"
              strokeWidth="4"
            />
            {/* Arrow 1 */}
            <polygon
              points="0,-75 -15,-45 15,-45"
              className="fill-[#18181B] dark:fill-white"
            />
            {/* Arrow 2 */}
            <polygon
              points="0,-15 -15,15 15,15"
              className="fill-[#18181B] dark:fill-white"
            />
          </g>

          {/* 5. Bottom-Left Plus Matrix Grid ("+ + +") */}
          <g className="stroke-[#18181B] dark:stroke-white/90 transition-colors duration-300">
            <use href="#geoPlusMark" x="240" y="660" />
            <use href="#geoPlusMark" x="200" y="690" />
            <use href="#geoPlusMark" x="240" y="720" />
            <use href="#geoPlusMark" x="160" y="720" />
            <use href="#geoPlusMark" x="200" y="750" />
            <use href="#geoPlusMark" x="120" y="750" />
            <use href="#geoPlusMark" x="160" y="780" />
            <use href="#geoPlusMark" x="200" y="810" />
            <use href="#geoPlusMark" x="140" y="840" />
            <use href="#geoPlusMark" x="180" y="870" />
          </g>

          {/* 6. Bottom-Left Fluid Crimson Wave */}
          <path
            d="M -30 870 C 110 820 250 830 360 880 L 360 1030 L -30 1030 Z"
            fill="url(#crimsonFluidGrad)"
          />
        </svg>
      </div>

      {/* =========================================================================
          RIGHT FLANK: Pinned to the Right Viewport (Guaranteed visible on desktop)
          ========================================================================= */}
      <div className="absolute right-0 top-0 bottom-0 w-[45vw] max-w-[620px] min-w-[260px] pointer-events-none">
        <svg
          viewBox="0 0 500 1000"
          preserveAspectRatio="xMaxYMid slice"
          className="w-full h-full block transform-gpu opacity-95 dark:opacity-90"
        >
          {/* 1. Mid-Right Hatched Texture Circle */}
          <circle
            cx="380"
            cy="470"
            r="150"
            className="fill-[url(#geoHatchLight)] dark:fill-[url(#geoHatchDark)]"
          />

          {/* 2. Top-Right Plus Matrix Grid ("+ + +") */}
          <g className="stroke-[#18181B] dark:stroke-white/90 transition-colors duration-300">
            <use href="#geoPlusMark" x="440" y="80" />
            <use href="#geoPlusMark" x="400" y="110" />
            <use href="#geoPlusMark" x="440" y="140" />
            <use href="#geoPlusMark" x="360" y="140" />
            <use href="#geoPlusMark" x="400" y="170" />
            <use href="#geoPlusMark" x="320" y="170" />
            <use href="#geoPlusMark" x="360" y="200" />
            <use href="#geoPlusMark" x="400" y="230" />
            <use href="#geoPlusMark" x="340" y="260" />
          </g>

          {/* 3. Mid-Right Diagonal Capsule Track with Double Arrowheads */}
          <g transform="translate(390, 600) rotate(-46)" className="transition-colors duration-300">
            {/* Red Outline Track */}
            <rect
              x="-22"
              y="-170"
              width="44"
              height="340"
              rx="22"
              fill="none"
              stroke="#E11D2E"
              strokeWidth="4.5"
            />
            {/* Arrow 1 */}
            <polygon
              points="0,-85 -18,-50 18,-50"
              className="fill-[#18181B] dark:fill-white"
            />
            {/* Arrow 2 */}
            <polygon
              points="0,-20 -18,15 18,15"
              className="fill-[#18181B] dark:fill-white"
            />
          </g>

          {/* 4. Bottom-Right Concentric Thick Ring + Solid Core Circle over Fluid Wave */}
          <g className="transition-colors duration-300">
            {/* Outer Ring */}
            <circle
              cx="410"
              cy="900"
              r="125"
              fill="none"
              strokeWidth="32"
              className="stroke-[#18181B] dark:stroke-white"
            />
            {/* Solid Core Circle */}
            <circle
              cx="410"
              cy="900"
              r="52"
              className="fill-[#18181B] dark:fill-white"
            />
          </g>

          {/* 5. Bottom Fluid Crimson Wave */}
          <path
            d="M 60 1030 C 180 920 320 890 530 920 L 530 1030 Z"
            fill="url(#crimsonFluidGrad)"
          />
        </svg>
      </div>

      {/* Subtle Central Readability Shield (Linear opacity overlay, 0 blur filter) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAFAFA]/15 dark:via-[#0f1117]/25 to-transparent pointer-events-none" />
    </div>
  );
}
