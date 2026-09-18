import React from 'react';
import { useInView } from '../hooks/useInView';

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up' | 'none'
}) {
  // triggerOnce is false so animation triggers both when scrolling down and scrolling up
  const [ref, isInView] = useInView({ threshold: 0.12, triggerOnce: false });

  const getTransformClass = () => {
    if (direction === 'up') return 'translate-y-7';
    return '';
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isInView ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-600 ease-out will-change-transform ${
        isInView
          ? 'opacity-100 translate-y-0'
          : `opacity-0 ${getTransformClass()}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
