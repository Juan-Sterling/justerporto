import { useEffect, useState, useCallback, useSyncExternalStore } from 'react';

let curtainHeld = false;
const curtainListeners = new Set();

/**
 * Temporarily holds scroll-triggered entrance animations behind an active full-screen curtain
 * so elements reveal cleanly when the curtain opens rather than animating behind it.
 */
export function setInViewCurtainHold(held) {
  const next = Boolean(held);
  if (curtainHeld === next) return;
  curtainHeld = next;
  curtainListeners.forEach((listener) => listener());
}

function subscribeCurtainHold(listener) {
  curtainListeners.add(listener);
  return () => curtainListeners.delete(listener);
}

function getCurtainHoldSnapshot() {
  return curtainHeld;
}

function getPrefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  );
}

/**
 * Lightweight IntersectionObserver hook for scroll-triggered entrance animations.
 * Supports both standard and conditionally mounted elements via callback ref.
 * Automatically resets when scrolling away to enable bidirectional (scroll down & scroll up) animations.
 * Respects prefers-reduced-motion.
 */
export function useInView(options = { threshold: 0.1, triggerOnce: false }) {
  const [node, setNode] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const isCurtainHeld = useSyncExternalStore(
    subscribeCurtainHold,
    getCurtainHoldSnapshot,
    () => false
  );
  const reducedMotion = getPrefersReducedMotion();

  const ref = useCallback((element) => {
    setNode(element);
  }, []);

  useEffect(() => {
    if (!node || reducedMotion) return;

    const triggerOnce = options.triggerOnce ?? false;
    const threshold = options.threshold ?? 0.1;
    const rootMargin = options.rootMargin ?? '0px 0px -40px 0px';

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (triggerOnce) {
          observer.unobserve(node);
        }
      } else if (!triggerOnce) {
        setIsIntersecting(false);
      }
    }, {
      threshold,
      rootMargin,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, reducedMotion, options.threshold, options.triggerOnce, options.rootMargin]);

  const isInView = reducedMotion ? true : (isCurtainHeld ? false : isIntersecting);
  return [ref, isInView];
}
