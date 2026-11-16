import React from 'react';

/**
 * Kerangka Bodi Navbar dengan Ujung Tanduk BABYMONSTER (Seamless Outer Flank).
 * Kontur sisi kiri dan kanan menyambung mulus dari ujung tanduk langsung ke dasar bawah
 * tanpa cekungan pinggang, serta konten diturunkan agar pas berada di tengah bodi navbar.
 */
const BAEMON_HORN_PATH =
  'M 18,2 ' +
  'C 20,4 26,10 34,16 ' +
  'C 46,21 64,22 82,22 ' +
  'L 918,22 ' +
  'C 936,22 954,21 966,16 ' +
  'C 974,10 980,4 982,2 ' +
  'C 992,8 996,24 995,45 ' +
  'C 994,76 972,88 946,88 ' +
  'L 54,88 ' +
  'C 28,88 6,76 5,45 ' +
  'C 4,24 8,8 18,2 Z';

export default function BaemonNavbarFrame({
  children,
  scrolled = false,
  className = '',
}) {
  return (
    <nav
      className={`group/baemon-nav relative flex items-center justify-between px-6 sm:px-9 py-3 sm:py-3.5 w-full max-w-5xl mx-auto ${className}`}
    >
      {/* Single clean backdrop blur layer positioned within navbar body (never wrapped in CSS filter) */}
      <div className="absolute inset-x-1.5 top-2.5 bottom-0 backdrop-blur-lg pointer-events-none rounded-[28px]" />

      {/* Kerangka Bodi Navbar dengan Ujung Tanduk BABYMONSTER Menyambung Mulus */}
      <svg
        className={`absolute inset-0 w-full -top-2.5 h-[calc(100%+10px)] pointer-events-none overflow-visible transition-[filter] duration-300 ${
          scrolled
            ? 'drop-shadow-[0_12px_28px_rgba(0,0,0,0.48)] dark:drop-shadow-[0_14px_32px_rgba(0,0,0,0.72)]'
            : 'drop-shadow-[0_8px_20px_rgba(0,0,0,0.32)] dark:drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]'
        }`}
        viewBox="0 0 1000 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={BAEMON_HORN_PATH}
          className={`transition-[fill,stroke] duration-300 ${
            scrolled
              ? 'fill-white/88 dark:fill-[#141218]/95 stroke-black/15 dark:stroke-white/20'
              : 'fill-white/78 dark:fill-[#141218]/90 stroke-black/10 dark:stroke-white/14'
          }`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Konten Navbar (relative z-10) - Diberi padding-top agar berada tepat di tengah vertikal bodi navbar */}
      <div className="relative z-10 flex w-full items-center justify-between pt-2.5 sm:pt-3 pb-0.5">
        {children}
      </div>
    </nav>
  );
}
