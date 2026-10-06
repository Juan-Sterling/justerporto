import React, { forwardRef } from 'react';

/**
 * BaemonPortalO Component
 * 
 * Signature BABYMONSTER-inspired split "O" portal emblem:
 * - Two geometric semi-donut halves (Left and Right) separated by a clean vertical slit
 * - Clean interior aperture opening directly into the Work Experience section
 * - Light Mode: Sleek Obsidian Graphite with clean accents
 * - Dark Mode: Iconic Radiant Crimson Red
 * - 100% Vector & GPU-safe: Uses SVG <g> groups for transforms to eliminate all pixelation artifacts
 */
const BaemonPortalO = forwardRef(function BaemonPortalO(
  {
    ringScaleRef,
    leftHalfRef,
    rightHalfRef,
    portalAuraRef,
    className = '',
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-center select-none transform-gpu ${className}`}
      aria-hidden="true"
    >
      {/* 1. Luminous Ambient Backlight Aura (Fixed behind portal) */}
      <div
        className="absolute w-[220px] h-[220px] sm:w-[290px] sm:h-[290px] lg:w-[390px] lg:h-[390px] rounded-full bg-radial from-[#FF3B4D]/25 via-[#E11D2E]/10 to-transparent blur-2xl pointer-events-none dark:opacity-85 opacity-50 transform-gpu will-change-transform"
      />

      {/* 2. The Baemon "O" Main Stage Container */}
      <div className="relative w-[190px] h-[190px] sm:w-[250px] sm:h-[250px] lg:w-[350px] lg:h-[350px] xl:w-[380px] xl:h-[380px] flex items-center justify-center transform-gpu">

        {/* 3. Center Aperture Core Light */}
        <div
          ref={portalAuraRef}
          className="absolute w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full bg-radial from-[#FF3B4D]/35 via-[#E11D2E]/15 to-transparent blur-xl pointer-events-none opacity-0 transform-gpu will-change-transform"
        />

        {/* 4. Scalable Outer Ring Container (GSAP scales this cleanly on GPU) */}
        <div
          ref={ringScaleRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none will-change-transform transform-gpu"
        >
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full overflow-visible pointer-events-none transform-gpu"
            aria-hidden="true"
          >
            {/* LEFT HALF of the Baemon "O" (Solid Black in Light Mode, Solid Crimson Red in Dark Mode) */}
            <g ref={leftHalfRef} className="will-change-transform">
              <path
                d="M 188 25.41 A 175 175 0 0 0 188 374.59 L 188 294.24 A 95 95 0 0 1 188 105.76 Z"
                className="fill-black dark:fill-[#E11D2E] transition-colors duration-200"
              />
            </g>

            {/* RIGHT HALF of the Baemon "O" (Solid Black in Light Mode, Solid Crimson Red in Dark Mode) */}
            <g ref={rightHalfRef} className="will-change-transform">
              <path
                d="M 212 25.41 A 175 175 0 0 1 212 374.59 L 212 294.24 A 95 95 0 0 0 212 105.76 Z"
                className="fill-black dark:fill-[#E11D2E] transition-colors duration-200"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
});

export default BaemonPortalO;
