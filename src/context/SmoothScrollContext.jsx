import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollContext = createContext({
  lenis: null,
  scrollTo: () => {},
});

export function SmoothScrollProvider({ children, isLocked = false }) {
  const [lenisInstance, setLenisInstance] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
      autoRaf: false, // GSAP ticker drives the RAF loop directly
      syncTouch: false, // Let mobile touch scrolling run with native 120Hz hardware momentum
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Hook Lenis RAF into GSAP's master ticker for 0-jitter, single-loop performance
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    // Disable lagSmoothing so GSAP does not clamp time or stutter when crossing sections
    gsap.ticker.lagSmoothing(0);

    // Expose lenis globally for debugging or direct access if needed
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
      lenisRef.current = null;
      setLenisInstance(null);
      delete window.__lenis;
    };
  }, []);

  // Handle dynamic locking/unlocking (e.g. welcome screen or modals)
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isLocked) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isLocked]);

  const scrollTo = (target, options = {}) => {
    if (lenisRef.current) {
      const isTop = target === 0 || target === '#hero' || target === 'top';
      const defaultOffset = isTop ? 0 : -70;
      const offset = options.offset !== undefined ? options.offset : defaultOffset;
      const duration = options.duration ?? (isTop ? 1.4 : 1.2);

      lenisRef.current.scrollTo(target, {
        offset,
        duration,
        easing: options.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -8 * t))),
        immediate: options.immediate ?? false,
      });
    } else {
      // Fallback if Lenis is disabled or not initialized
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
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
