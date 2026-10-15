import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SmoothScrollContext = createContext({
  smoother: null,
  scrollTo: () => {},
});

export function SmoothScrollProvider({ children, isLocked = false }) {
  const [smootherInstance, setSmootherInstance] = useState(null);
  const smootherRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const wrapper = document.getElementById('smooth-wrapper');
    const content = document.getElementById('smooth-content');
    if (!wrapper || !content) return;

    // Detect if device is touch-based (mobile/tablet)
    const isTouchDevice =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0);

    // Create GSAP ScrollSmoother
    // CRITICAL: smoothTouch: 0 guarantees that mobile/touch devices use 100% native hardware momentum (120Hz/60Hz compositor thread)
    // Desktop mouse wheels get luxurious smooth damping (1.0s)
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: isTouchDevice ? 0 : 1.0, // Native 0-lag on mobile, smooth on desktop
      smoothTouch: 0, // Never hijack native touch momentum scrolling
      effects: true, // Enables data-speed & data-lag
      normalizeScroll: false,
      ignoreMobileResize: true,
    });

    smootherRef.current = smoother;
    setSmootherInstance(smoother);

    // Refresh ScrollTrigger calculations
    ScrollTrigger.refresh();

    window.__smoother = smoother;

    return () => {
      smoother.kill();
      smootherRef.current = null;
      setSmootherInstance(null);
      delete window.__smoother;
    };
  }, []);

  // Handle dynamic locking/unlocking (e.g. welcome screen or modals)
  useEffect(() => {
    if (!smootherRef.current) return;
    smootherRef.current.paused(isLocked);
  }, [isLocked]);

  const scrollTo = (target, options = {}) => {
    if (smootherRef.current) {
      const isTop = target === 0 || target === '#hero' || target === 'top';
      if (isTop) {
        smootherRef.current.scrollTo(0, true);
      } else {
        const offset = options.offset !== undefined ? options.offset : -70;
        const position = offset < 0 ? `top ${Math.abs(offset)}px` : 'top top';
        smootherRef.current.scrollTo(target, true, position);
      }
    } else {
      // Fallback
      const selector = typeof target === 'string' ? target : '';
      const element = selector.startsWith('#')
        ? document.getElementById(selector.slice(1))
        : target instanceof HTMLElement
        ? target
        : null;

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (target === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ smoother: smootherInstance, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
