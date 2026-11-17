import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';

/**
 * Kerangka Bodi Navbar dengan Ujung Tanduk BABYMONSTER (Seamless Outer Flank).
 * Kontur sisi kiri dan kanan menyambung mulus dari ujung tanduk langsung ke dasar bawah
 * tanpa cekungan pinggang, serta konten diturunkan agar pas berada di tengah bodi navbar.
 */
const FALLBACK_HORN_PATH =
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

const HORN_OVERHANG_PX = 10;

/**
 * Generates an exact-pixel SVG path for the BABYMONSTER horn navbar frame so that
 * corners, horn tips, and stroke weights stay crisp and un-squished across all viewports.
 */
function buildBaemonHornPath(width, height) {
  const w = Math.max(180, width);
  const h = Math.max(56, height);

  const yTip = 2;
  const yBodyTop = 22;
  const yBottom = h - 2;
  const bodyH = yBottom - yBodyTop;

  // Scale end-cap proportions evenly with body height so mobile bottom corners stay smooth & round
  const s = Math.max(0.7, Math.min(1, bodyH / 66, w / 360));
  const sy = bodyH / 66;

  const xOuter = 5;
  const xTip = xOuter + 13 * s;
  const xHornMid = xOuter + 29 * s;
  const xHornEnd = xOuter + 77 * s;
  const xBottomCorner = xOuter + 49 * s;

  const xIn1C1 = xOuter + 15 * s;
  const xIn1C2 = xOuter + 21 * s;
  const xIn2C1 = xOuter + 41 * s;
  const xIn2C2 = xOuter + 59 * s;
  const xFlankC1 = xOuter - 1 * s;
  const xFlankC2 = xOuter + 3 * s;
  const xBotC1 = xOuter + 23 * s;
  const xBotC2 = xOuter + 1 * s;

  const yMid = yBodyTop + 23 * sy;
  const yFlankC1 = yBodyTop + 2 * sy;
  const yFlankC2 = 8;
  const yBotC2 = yBottom - 12 * sy;

  const f = (n) => Number(n.toFixed(2));
  const rx = (x) => f(w - x);

  return (
    `M ${f(xTip)},${yTip} ` +
    `C ${f(xIn1C1)},4 ${f(xIn1C2)},10 ${f(xHornMid)},16 ` +
    `C ${f(xIn2C1)},21 ${f(xIn2C2)},22 ${f(xHornEnd)},${yBodyTop} ` +
    `L ${rx(xHornEnd)},${yBodyTop} ` +
    `C ${rx(xIn2C2)},22 ${rx(xIn2C1)},21 ${rx(xHornMid)},16 ` +
    `C ${rx(xIn1C2)},10 ${rx(xIn1C1)},4 ${rx(xTip)},${yTip} ` +
    `C ${rx(xFlankC2)},${yFlankC2} ${rx(xFlankC1)},${f(yFlankC1)} ${rx(xOuter)},${f(yMid)} ` +
    `C ${rx(xBotC2)},${f(yBotC2)} ${rx(xBotC1)},${f(yBottom)} ${rx(xBottomCorner)},${f(yBottom)} ` +
    `L ${f(xBottomCorner)},${f(yBottom)} ` +
    `C ${f(xBotC1)},${f(yBottom)} ${f(xBotC2)},${f(yBotC2)} ${f(xOuter)},${f(yMid)} ` +
    `C ${f(xFlankC1)},${f(yFlankC1)} ${f(xFlankC2)},${yFlankC2} ${f(xTip)},${yTip} Z`
  );
}

export default function BaemonNavbarFrame({
  children,
  scrolled = false,
  className = '',
}) {
  const navRef = useRef(null);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return undefined;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      const nextWidth = Math.round(rect.width * 10) / 10;
      const nextHeight = Math.round((rect.height + HORN_OVERHANG_PX) * 10) / 10;
      setSvgSize((prev) =>
        prev.width === nextWidth && prev.height === nextHeight
          ? prev
          : { width: nextWidth, height: nextHeight }
      );
    };

    updateSize();

    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hasExactSize = svgSize.width > 0 && svgSize.height > 0;
  const hornPath = useMemo(
    () =>
      hasExactSize
        ? buildBaemonHornPath(svgSize.width, svgSize.height)
        : FALLBACK_HORN_PATH,
    [hasExactSize, svgSize.width, svgSize.height]
  );

  return (
    <nav
      ref={navRef}
      className={`group/baemon-nav relative flex items-center justify-between px-6 sm:px-9 py-3 sm:py-3.5 w-full max-w-5xl mx-auto ${className}`}
    >
      {/* Single clean backdrop blur layer clipped to exact navbar contour (never wrapped in CSS filter) */}
      <div
        className={
          hasExactSize
            ? 'absolute inset-x-0 -top-2.5 h-[calc(100%+10px)] backdrop-blur-lg pointer-events-none'
            : 'absolute inset-x-1.5 top-2.5 bottom-0 backdrop-blur-lg pointer-events-none rounded-[28px]'
        }
        style={
          hasExactSize
            ? { clipPath: `path('${hornPath}')`, WebkitClipPath: `path('${hornPath}')` }
            : undefined
        }
      />

      {/* Kerangka Bodi Navbar dengan Ujung Tanduk BABYMONSTER Menyambung Mulus */}
      <svg
        className={`absolute inset-0 w-full -top-2.5 h-[calc(100%+10px)] pointer-events-none overflow-visible transition-[filter] duration-300 ${
          scrolled
            ? 'drop-shadow-[0_12px_28px_rgba(0,0,0,0.48)] dark:drop-shadow-[0_14px_32px_rgba(0,0,0,0.72)]'
            : 'drop-shadow-[0_8px_20px_rgba(0,0,0,0.32)] dark:drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]'
        }`}
        viewBox={hasExactSize ? `0 0 ${svgSize.width} ${svgSize.height}` : '0 0 1000 90'}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={hornPath}
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
