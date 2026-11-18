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
    threshold: 0.08,
    triggerOnce: false,
    rootMargin: '20px 0px -30px 0px',
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
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#09090B] dark:text-white font-display flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1"
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
                  className={`inline-block transition-transform ${
                    isInView ? 'duration-700' : 'duration-300'
                  } ease-out will-change-transform text-[#09090B] dark:text-white`}
                  style={{
                    transform: isInView ? 'translateY(0)' : 'translateY(115%)',
                    transitionDelay: isInView ? `${idx * 60 + 80}ms` : '0ms',
                  }}
                >
                  {word}
                </span>
              </span>
            ))}

            {/* Last word that wraps naturally */}
            {lastWord && (
              <span className="inline-block overflow-hidden px-5 -mx-5 py-3 -my-3">
                <span
                  className={`inline-block ease-out will-change-transform ${
                    highlightLastWord
                      ? 'text-[#E11D2E] [text-shadow:0_0_6px_rgba(225,29,46,0.28)] group-hover/title:[text-shadow:0_0_6px_rgba(225,29,46,0.78),0_0_14px_rgba(225,29,46,0.48)]'
                      : 'text-[#09090B] dark:text-white'
                  }`}
                  style={{
                    transform: isInView ? 'translateY(0)' : 'translateY(170%)',
                    transitionProperty: 'transform, text-shadow',
                    transitionDuration: isInView ? '700ms, 300ms' : '300ms, 300ms',
                    transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1), ease',
                    transitionDelay: isInView ? `${leadingWords.length * 60 + 80}ms, 0ms` : '0ms, 0ms',
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
            className={`w-[68px] h-[2px] bg-gradient-to-r from-[#E11D2E] via-[#FF3B4D] to-transparent rounded-full transition-transform ${
              isInView ? 'duration-700' : 'duration-300'
            } ease-out origin-left group-hover/title:scale-x-125 group-hover/title:shadow-[0_0_10px_rgba(225,29,46,0.8)]`}
            style={{
              transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: isInView ? '240ms' : '0ms',
            }}
          />
          {/* Secondary Tech Track Line */}
          <div
            className={`w-[42px] h-[2px] bg-[#D4D4D8] dark:bg-zinc-600 dark:bg-white/30 rounded-full transition-transform ${
              isInView ? 'duration-700' : 'duration-300'
            } ease-out origin-left`}
            style={{
              transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: isInView ? '380ms' : '0ms',
            }}
          />
          {/* Micro Tech Hash Marks */}
          <span
            className={`font-mono text-[11px] text-[#71717A] dark:text-zinc-400 tracking-widest transition-all ${
              isInView ? 'duration-700' : 'duration-300'
            } ease-out font-medium`}
            style={{
              opacity: isInView ? 0.9 : 0,
              transform: isInView ? 'translateX(0)' : 'translateX(-8px)',
              transitionDelay: isInView ? '480ms' : '0ms',
            }}
          >
            ///
          </span>
        </div>
      )}

      {/* 4. Subtitle with Staggered Fade Up */}
      {subtitle && (
        <p
          className={`text-sm sm:text-base text-[#52525B] dark:text-[#A1A1AA] max-w-2xl leading-relaxed transition-all ${
            isInView ? 'duration-700' : 'duration-300'
          } ease-out will-change-transform pt-1`}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(12px)',
            transitionDelay: isInView ? '320ms' : '0ms',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
