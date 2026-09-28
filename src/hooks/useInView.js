import { useEffect, useState, useCallback } from 'react';

/**
 * Lightweight IntersectionObserver hook for scroll-triggered entrance animations.
 * Supports both standard and conditionally mounted elements via callback ref.
 * Automatically resets when scrolling away to enable bidirectional (scroll down & scroll up) animations.
 * Respects prefers-reduced-motion.
 */
export function useInView(options = { threshold: 0.1, triggerOnce: false }) {
  const [node, setNode] = useState(null);
  const [isInView, setIsInView] = useState(false);

  const ref = useCallback((element) => {
    setNode(element);
  }, []);

  useEffect(() => {
    if (!node) return;

    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
          observer.unobserve(node);
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    }, {
      threshold,
      rootMargin,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, options.threshold, options.triggerOnce, options.rootMargin]);

  return [ref, isInView];
}
