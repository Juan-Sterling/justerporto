import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

/**
 * HoloTiltCard
 * Komponen interaktif 3D Tilt Physics dengan efek pantulan cahaya Holographic Specular Glare.
 */
export default function HoloTiltCard({
  children,
  className = '',
  accentColor = '#00f59b',
  glowOpacity = 0.25,
  maxTilt = 10,
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 25 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className={`relative ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative rounded-lg overflow-hidden transition-shadow duration-300"
      >
        <div style={{ transform: 'translateZ(10px)' }} className="w-full h-full relative z-10">
          {children}
        </div>

        {/* Dynamic Holographic Specular Glare Layer */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle 320px at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 40%, transparent 80%)`,
          }}
        />

        {/* Subtle Iridescent Holographic Foil Sheen */}
        <motion.div
          animate={{ opacity: isHovered ? 0.35 : 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 pointer-events-none z-20 mix-blend-color-dodge opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(255,0,128,0.12) 0%, rgba(0,255,255,0.15) 35%, rgba(0,245,155,0.18) 70%, rgba(255,215,0,0.12) 100%)',
          }}
        />

        {/* Ambient Corner Accent Glow */}
        <div
          className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-colors duration-500 -z-1"
          style={{
            backgroundColor: accentColor,
            opacity: isHovered ? glowOpacity * 1.5 : glowOpacity,
          }}
        />
      </motion.div>
    </div>
  );
}
