import React from 'react';
import { useInView } from '../hooks/useInView';

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up' | 'none'
}) {
  // Bidirectional in-view trigger with subtle margin to prevent pop-in jitter
  const [ref, isInView] = useInView({ threshold: 0.08, triggerOnce: false, rootMargin: '20px 0px -20px 0px' });

  const getTransformClass = () => {
    if (direction === 'up') return 'translate-y-5';
    return '';
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isInView ? `${delay}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-500 ease-out transform-gpu ${
        isInView
          ? 'opacity-100 translate-y-0'
          : `opacity-0 ${getTransformClass()}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
