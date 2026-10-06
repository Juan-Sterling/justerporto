import React from 'react';
import { useInView } from '../hooks/useInView';

export default function SectionTitle({
  title = '',
  subtitle = '',
  className = '',
  showAccentLine = true,
  highlightLastWord = true,
}) {
  const [containerRef, isInView] = useInView({
    threshold: 0.05,
    triggerOnce: true,
    rootMargin: '120px 0px 0px 0px',
  });

  // Split title into words for staggered slide-up mask animation
  const words = (title || '').trim().split(/\s+/).filter(Boolean);
  const leadingWords = words.slice(0, -1);
  const lastWord = words.length > 0 ? words[words.length - 1] : '';

  return (
    <div
      ref={containerRef}
      className={`space-y-3 mb-10 sm:mb-14 group/title cursor-default ${className}`}
    >
      {/* Main Title with Word-by-Word Slide Up & Dynamic Radar Beacon */}
      <div>
        <h2
          aria-label={title}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#09090B] dark:text-white font-['Space_Grotesk',sans-serif] flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1"
        >
          <span className="sr-only">{title}</span>
          
          <span aria-hidden="true" className="contents">
            {/* Leading words that wrap naturally */}
            {leadingWords.map((word, idx) => (
              <span
                key={`${word}-${idx}`}
                className="inline-block overflow-hidden py-1 -my-1"
              >
                <span
                  className="inline-block transition-transform duration-700 ease-out will-change-transform text-[#09090B] dark:text-white"
                  style={{
                    transform: isInView ? 'translateY(0)' : 'translateY(115%)',
                    transitionDelay: `${idx * 60 + 80}ms`,
                  }}
                >
                  {word}
                </span>
              </span>
            ))}

            {/* Last word that wraps naturally */}
            {lastWord && (
              <span className="inline-block overflow-hidden py-1 -my-1">
                <span
                  className={`inline-block transition-transform duration-700 ease-out will-change-transform ${
                    highlightLastWord
                      ? 'text-[#E11D2E] drop-shadow-[0_0_10px_rgba(225,29,46,0.3)] group-hover/title:drop-shadow-[0_0_14px_rgba(225,29,46,0.7)]'
                      : 'text-[#09090B] dark:text-white'
                  }`}
                  style={{
                    transform: isInView ? 'translateY(0)' : 'translateY(115%)',
                    transitionDelay: `${leadingWords.length * 60 + 80}ms`,
                  }}
                >
                  {lastWord}
                </span>
              </span>
            )}
          </span>
        </h2>
      </div>

      {/* 3. Animated Decorative Tech Line */}
      {showAccentLine && (
        <div
          className="relative flex items-center gap-2 pt-0.5 overflow-hidden select-none"
          aria-hidden="true"
        >
          {/* Primary Crimson Animated Accent Line */}
          <div
            className="h-[2px] bg-gradient-to-r from-[#E11D2E] via-[#FF3B4D] to-transparent rounded-full transition-all duration-700 ease-out will-change-all origin-left group-hover/title:w-24 sm:group-hover/title:w-28 group-hover/title:shadow-[0_0_10px_rgba(225,29,46,0.8)]"
            style={{
              width: isInView ? '68px' : '0px',
              transitionDelay: '240ms',
            }}
          />
          {/* Secondary Tech Track Line */}
          <div
            className="h-[2px] bg-[#D4D4D8] dark:bg-zinc-600 dark:bg-white/30 rounded-full transition-all duration-700 ease-out will-change-all origin-left"
            style={{
              width: isInView ? '42px' : '0px',
              transitionDelay: '380ms',
            }}
          />
          {/* Micro Tech Hash Marks */}
          <span
            className="font-mono text-[11px] text-[#71717A] dark:text-zinc-400 tracking-widest transition-all duration-700 ease-out font-medium"
            style={{
              opacity: isInView ? 0.9 : 0,
              transform: isInView ? 'translateX(0)' : 'translateX(-8px)',
              transitionDelay: '480ms',
            }}
          >
            ///
          </span>
        </div>
      )}

      {/* 4. Subtitle with Staggered Fade Up */}
      {subtitle && (
        <p
          className="text-sm sm:text-base text-[#52525B] dark:text-[#A1A1AA] max-w-2xl leading-relaxed transition-all duration-700 ease-out will-change-transform pt-1"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(12px)',
            transitionDelay: '320ms',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
