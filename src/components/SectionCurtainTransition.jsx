import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * SectionCurtainTransition
 * Double-Layer Stage Sweep curtain transition for main portfolio navbar navigation.
 *
 * Motion sequence (~1.29s total, 100% GPU-accelerated transform & opacity):
 * - 0.00s -> 0.32s : Leading crimson accent (#E11D2E) sweeps upward from bottom.
 * - 0.05s -> 0.37s : Main adaptive stage panel follows, leaving a crisp crimson leading edge.
 * - 0.20s -> 0.54s : Editorial section title & rule reveal cleanly at center.
 * - 0.38s          : Midpoint (100% covered) -> triggers instant scroll jump to target section.
 * - 0.54s -> 0.86s : Clean dwell pause so section title remains clearly readable.
 * - 0.86s -> 1.04s : Title & rule exit cleanly.
 * - 0.92s -> 1.24s : Main panel exits upward first.
 * - 0.97s -> 1.29s : Crimson layer trails upward, leaving a crimson trailing edge.
 */
export default function SectionCurtainTransition({
  transitionRequest,
  onMidpoint,
  onComplete,
}) {
  const containerRef = useRef(null);
  const accentLayerRef = useRef(null);
  const mainLayerRef = useRef(null);
  const titleRef = useRef(null);
  const ruleRef = useRef(null);

  const onMidpointRef = useRef(onMidpoint);
  const onCompleteRef = useRef(onComplete);

  useLayoutEffect(() => {
    onMidpointRef.current = onMidpoint;
    onCompleteRef.current = onComplete;
  });

  useLayoutEffect(() => {
    if (!transitionRequest) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (onMidpointRef.current) onMidpointRef.current(transitionRequest);
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      gsap.set([accentLayerRef.current, mainLayerRef.current], {
        yPercent: 102,
        force3D: true,
      });
      gsap.set(titleRef.current, {
        yPercent: 105,
        opacity: 0,
        force3D: true,
      });
      gsap.set(ruleRef.current, {
        scaleX: 0,
        opacity: 0,
        transformOrigin: 'center center',
        force3D: true,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = prevBodyOverflow;
          document.documentElement.style.overflow = prevHtmlOverflow;
          if (onCompleteRef.current) onCompleteRef.current();
        },
      });

      // 1. Enter sweep (bottom -> center): Crimson leads, main stage panel follows
      tl.to(
        accentLayerRef.current,
        {
          yPercent: 0,
          duration: 0.32,
          ease: 'power4.inOut',
        },
        0
      )
        .to(
          mainLayerRef.current,
          {
            yPercent: 0,
            duration: 0.32,
            ease: 'power4.inOut',
          },
          0.05
        )
        // 2. Editorial center title reveal (longer dwell so text is clearly readable)
        .to(
          titleRef.current,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.28,
            ease: 'power3.out',
          },
          0.22
        )
        .to(
          ruleRef.current,
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.28,
            ease: 'power3.out',
          },
          0.26
        )
        // 3. Midpoint: screen is 100% covered, jump scroll cleanly behind curtain
        .add(() => {
          if (onMidpointRef.current) onMidpointRef.current(transitionRequest);
        }, 0.38)
        // 4. Exit typography cleanly after readable dwell pause
        .to(
          titleRef.current,
          {
            y: -14,
            opacity: 0,
            duration: 0.18,
            ease: 'power2.in',
          },
          0.86
        )
        .to(
          ruleRef.current,
          {
            scaleX: 0,
            opacity: 0,
            duration: 0.16,
            ease: 'power2.in',
          },
          0.86
        )
        // 5. Exit sweep (center -> top): Main panel leaves first, crimson trails
        .to(
          mainLayerRef.current,
          {
            yPercent: -102,
            duration: 0.32,
            ease: 'power4.inOut',
          },
          0.92
        )
        .to(
          accentLayerRef.current,
          {
            yPercent: -102,
            duration: 0.32,
            ease: 'power4.inOut',
          },
          0.97
        );
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [transitionRequest]);

  if (!transitionRequest) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="fixed inset-0 z-[9990] pointer-events-auto select-none touch-none overflow-hidden"
    >
      {/* Layer 1: Leading / Trailing Crimson Accent */}
      <div
        ref={accentLayerRef}
        className="absolute inset-0 z-10 bg-[#E11D2E] transform-gpu will-change-transform"
      />

      {/* Layer 2: Main Adaptive Stage Panel */}
      <div
        ref={mainLayerRef}
        className="absolute inset-0 z-20 bg-[#FAFAFA] dark:bg-[#09090B] text-[#09090B] dark:text-white flex flex-col items-center justify-center px-6 transform-gpu will-change-transform"
      >
        {/* Subtle static stage ambient glow (lightweight, zero blur filter) */}
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(225,29,46,0.08)_0%,transparent_58%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(225,29,46,0.16)_0%,transparent_58%)]"
          aria-hidden="true"
        />

        {/* Crisp top & bottom crimson stage edges */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-[#E11D2E]" />
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#E11D2E]" />

        {/* Editorial Section Title */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
          <div className="overflow-hidden py-1">
            <div
              ref={titleRef}
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-none text-[#09090B] dark:text-white"
            >
              {transitionRequest.label}
            </div>
          </div>

          <div
            ref={ruleRef}
            className="w-16 sm:w-24 h-[2px] bg-[#E11D2E] mt-4 sm:mt-5"
          />
        </div>
      </div>
    </div>
  );
}
