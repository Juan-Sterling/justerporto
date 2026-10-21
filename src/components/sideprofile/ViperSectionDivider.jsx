import React, { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { Radio, Activity } from 'lucide-react';

/**
 * ViperSectionDivider
 * Ultra-High-Performance Edge-to-Edge Tactical Hazard Marquee Divider.
 * Engineered for 60/120 FPS buttery smooth playback on all devices (mobile, tablet, PC):
 * - Runs 100% on the GPU compositor thread via pure CSS translate3d (Off-Main-Thread Animation).
 * - Pauses completely (0% CPU/GPU overhead) when scrolled off-screen via IntersectionObserver.
 * - Zero backdrop-blur on full-width moving content to eliminate mobile GPU fill-rate throttling.
 * - CSS layout & paint containment (contain: 'layout paint') prevents any reflows outside the marquee.
 * - Trimmed DOM footprint with 2 seamless mirror tracks instead of redundant nodes.
 */
export default function ViperSectionDivider({
  isToxinActive = false,
  lineCode = 'CONDUIT-01',
  fromSection = 'COMBAT PROTOCOLS',
  toSection = 'PHYSICAL BIO-METRICS',
  tickerText = 'ACTIVE COMBAT SIMULATION COMPLETE • ADVANCING TO CARDIOVASCULAR TELEMETRY • RADIANITE SYSTEM PURGE NOMINAL',
  pressure = '102.4 kPa',
  flow = '86.4 L/S',
}) {
  const [containerRef, isInView] = useInView({
    threshold: 0,
    rootMargin: '250px 0px 250px 0px',
    triggerOnce: false,
  });

  const fadeBgClass = isToxinActive
    ? 'from-[#cce6d6] dark:from-[#090d0b]'
    : 'from-[#dcefe3] dark:from-[#090d0b]';

  return (
    <div
      ref={containerRef}
      className="relative w-screen left-1/2 -translate-x-1/2 my-10 sm:my-14 select-none overflow-hidden"
      style={{ contain: 'layout paint' }}
    >
      {/* Edge-to-Edge Running Text Marquee Ribbon */}
      <div
        className={`relative w-full py-2.5 sm:py-3 px-0 overflow-hidden transition-colors duration-500 border-y ${
          isToxinActive
            ? 'bg-[#d8eedf] dark:bg-[#0c120e] border-[#047857] dark:border-[#00f59b] shadow-[0_0_35px_rgba(4,120,87,0.3)] dark:shadow-[0_0_35px_rgba(0,245,155,0.35)]'
            : 'bg-[#e7f4eb] dark:bg-[#0c120e] border-[#10b981]/30 dark:border-[#00f59b]/35 shadow-[0_2px_15px_rgba(16,185,129,0.08)] dark:shadow-[0_0_20px_rgba(0,245,155,0.08)]'
        }`}
      >
        {/* Subtle Hazard Caution Diagonal Stripes Watermark */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #10b981 0, #10b981 8px, transparent 8px, transparent 16px)',
          }}
        />

        {/* Left & Right Viewport Edge Fade Masks */}
        <div
          className={`absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r ${fadeBgClass} to-transparent z-10 pointer-events-none transition-colors duration-500`}
        />
        <div
          className={`absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l ${fadeBgClass} to-transparent z-10 pointer-events-none transition-colors duration-500`}
        />

        {/* Off-Main-Thread Hardware-Accelerated Marquee Track */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <div
            className="flex items-center gap-8 shrink-0 animate-viper-marquee"
            style={{
              animationPlayState: isInView ? 'running' : 'paused',
            }}
          >
            {/* Mirror Set 0 & Set 1 for seamless infinite loop with half the DOM nodes */}
            {[0, 1].map((setIdx) => (
              <div key={setIdx} className="flex items-center gap-8 shrink-0">
                {[0, 1].map((subIdx) => (
                  <div
                    key={subIdx}
                    className="flex items-center gap-6 text-xs sm:text-[13px] font-mono font-bold tracking-wider"
                  >
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-[#10b981]/15 dark:bg-[#00f59b]/15 text-[#065f46] dark:text-[#00f59b] border border-[#10b981]/30 dark:border-[#00f59b]/30">
                      <Radio className="w-3 h-3 animate-pulse" />
                      {lineCode}
                    </span>

                    <span className="text-[#064e3b] dark:text-zinc-200 uppercase">
                      {fromSection} <span className="text-[#10b981] dark:text-[#00f59b]">➔</span> {toSection}
                    </span>

                    <span className="text-zinc-400 dark:text-zinc-600">•</span>

                    <span className="text-zinc-600 dark:text-gray-300 uppercase">
                      {tickerText}
                    </span>

                    <span className="text-zinc-400 dark:text-zinc-600">•</span>

                    <span className="inline-flex items-center gap-1.5 min-w-[215px] text-[#059669] dark:text-[#34d399] transition-colors duration-500">
                      <Activity className="w-3 h-3" />
                      <span>{isToxinActive ? 'PRESSURE: 148.2 kPa (SURGE)' : `PRESSURE: ${pressure} (STABLE)`}</span>
                    </span>

                    <span className="text-zinc-400 dark:text-zinc-600">•</span>

                    <span className="inline-flex items-center gap-1 min-w-[110px] text-[#065f46] dark:text-[#6ee7b7] text-[11px] transition-colors duration-500">
                      <span>FLOW: {isToxinActive ? 'MAX SURGE' : flow}</span>
                    </span>

                    <span className="text-zinc-400 dark:text-zinc-600">•</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
