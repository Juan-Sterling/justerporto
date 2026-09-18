import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight IntersectionObserver hook for scroll-triggered entrance animations.
 * Automatically resets when scrolling away to enable bidirectional (scroll down & scroll up) animations.
 * Respects prefers-reduced-motion.
 */
export function useInView(options = { threshold: 0.1, triggerOnce: false }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const triggerOnce = options.triggerOnce ?? false;
    const threshold = options.threshold ?? 0.1;
    const rootMargin = options.rootMargin ?? '0px 0px -40px 0px';

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (triggerOnce) {
          observer.unobserve(el);
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    }, {
      threshold,
      rootMargin,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.triggerOnce, options.rootMargin]);

  return [ref, isInView];
}
