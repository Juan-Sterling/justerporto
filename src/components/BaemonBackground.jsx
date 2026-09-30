import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * BaemonBackground - Parametric Thin Red Wave Lines
 * 
 * Standalone dynamic ambient wave ribbons in the viewport.
 * Hidden on Hero section to give Hero a dedicated darkroom stage.
 * Fades in seamlessly as user scrolls down into Experience, Skills, Education, Contact.
 */
export default function BaemonBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Interactive pointer parallax
    let mouseX = width * 0.5;
    let mouseY = height * 0.5;
    let targetMouseX = width * 0.5;
    let targetMouseY = height * 0.5;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Detect dark mode
    let isDark = document.documentElement.classList.contains('dark');
    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Catmull-Rom spline interpolation
    const catmullRom = (p0, p1, p2, p3, t) => {
      const t2 = t * t;
      const t3 = t2 * t;
      return (
        0.5 *
        (2 * p1 +
          (-p0 + p2) * t +
          (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
          (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
      );
    };

    // Catmull-Rom derivative for analytical tangent
    const catmullRomDerivative = (p0, p1, p2, p3, t) => {
      const t2 = t * t;
      return (
        0.5 *
        (-p0 +
          p2 +
          2 * (2 * p0 - 5 * p1 + 4 * p2 - p3) * t +
          3 * (-p0 + 3 * p1 - 3 * p2 + p3) * t2)
      );
    };

    let time = 0;

    const render = () => {
      // Smooth mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.025;
      mouseY += (targetMouseY - mouseY) * 0.025;
      const mouseParallaxX = ((mouseX / width) - 0.5) * 14;
      const mouseParallaxY = ((mouseY / height) - 0.5) * 10;

      // Slow, steady, calm breathing animation (independent of scroll)
      time += prefersReducedMotion ? 0 : 0.0016;

      ctx.clearRect(0, 0, width, height);

      const t = time;

      // Harmonic breathing oscillations for viewport control points (pure time-based, constant speed)
      const osc1_0 = Math.sin(t * 0.5) * (height * 0.035);
      const osc1_1 = Math.cos(t * 0.45 + 0.9) * (height * 0.04);
      const osc1_2 = Math.sin(t * 0.52 + 2.0) * (height * 0.045);
      const osc1_3 = Math.cos(t * 0.48 + 3.1) * (height * 0.04);
      const osc1_4 = Math.sin(t * 0.56 + 4.2) * (height * 0.035);

      const osc2_0 = Math.cos(t * 0.48 + 0.4) * (height * 0.035);
      const osc2_1 = Math.sin(t * 0.54 + 1.7) * (height * 0.04);
      const osc2_2 = Math.cos(t * 0.42 + 2.8) * (height * 0.045);
      const osc2_3 = Math.sin(t * 0.58 + 3.6) * (height * 0.04);
      const osc2_4 = Math.cos(t * 0.46 + 4.8) * (height * 0.035);

      const isMobile = width < 768;

      // Ribbon 1 & Ribbon 2 Viewport Spine Control Points
      // On mobile screens, use broader, more expansive curves and node spacing so the ribbons
      // breathe generously across the portrait aspect ratio without feeling cramped or pinched.
      const pts1 = isMobile
        ? [
            { x: -width * 0.35, y: height * 0.22 + osc1_0 },
            { x: -width * 0.08, y: height * 0.28 + osc1_0 + mouseParallaxY * 0.3 },
            { x: width * 0.34 + mouseParallaxX * 0.4, y: height * 0.52 + osc1_1 + mouseParallaxY * 0.4 },
            { x: width * 0.72 - mouseParallaxX * 0.4, y: height * 0.36 + osc1_2 - mouseParallaxY * 0.4 },
            { x: width * 1.08, y: height * 0.60 + osc1_3 },
            { x: width * 1.35, y: height * 0.66 + osc1_4 },
          ]
        : [
            { x: -width * 0.25, y: height * 0.25 + osc1_0 },
            { x: -width * 0.05, y: height * 0.32 + osc1_0 + mouseParallaxY * 0.4 },
            { x: width * 0.26 + mouseParallaxX * 0.6, y: height * 0.58 + osc1_1 + mouseParallaxY * 0.6 },
            { x: width * 0.50 + mouseParallaxX * 0.3, y: height * 0.42 + osc1_2 + mouseParallaxY * 0.3 },
            { x: width * 0.74 - mouseParallaxX * 0.5, y: height * 0.62 + osc1_3 - mouseParallaxY * 0.5 },
            { x: width * 1.05, y: height * 0.38 + osc1_4 },
            { x: width * 1.25, y: height * 0.45 + osc1_4 },
          ];

      const pts2 = isMobile
        ? [
            { x: -width * 0.35, y: height * 0.70 + osc2_0 },
            { x: -width * 0.08, y: height * 0.62 + osc2_0 - mouseParallaxY * 0.3 },
            { x: width * 0.30 - mouseParallaxX * 0.4, y: height * 0.36 + osc2_1 - mouseParallaxY * 0.4 },
            { x: width * 0.68 + mouseParallaxX * 0.4, y: height * 0.56 + osc2_2 + mouseParallaxY * 0.4 },
            { x: width * 1.08, y: height * 0.30 + osc2_3 },
            { x: width * 1.35, y: height * 0.36 + osc2_4 },
          ]
        : [
            { x: -width * 0.25, y: height * 0.72 + osc2_0 },
            { x: -width * 0.05, y: height * 0.65 + osc2_0 - mouseParallaxY * 0.4 },
            { x: width * 0.26 - mouseParallaxX * 0.6, y: height * 0.38 + osc2_1 - mouseParallaxY * 0.6 },
            { x: width * 0.50 - mouseParallaxX * 0.3, y: height * 0.58 + osc2_2 - mouseParallaxY * 0.3 },
            { x: width * 0.74 + mouseParallaxX * 0.5, y: height * 0.35 + osc2_3 + mouseParallaxY * 0.5 },
            { x: width * 1.05, y: height * 0.62 + osc2_4 },
            { x: width * 1.25, y: height * 0.55 + osc2_4 },
          ];

      // Sample a Catmull-Rom spline array into dense segments
      const sampleSpline = (pts, samplesPerSegment = 30) => {
        const samples = [];
        const totalSegments = pts.length - 3;

        for (let i = 1; i < pts.length - 2; i++) {
          const p0 = pts[i - 1];
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const p3 = pts[i + 2];

          for (let s = 0; s < samplesPerSegment; s++) {
            const tSeg = s / samplesPerSegment;
            const x = catmullRom(p0.x, p1.x, p2.x, p3.x, tSeg);
            const y = catmullRom(p0.y, p1.y, p2.y, p3.y, tSeg);

            const dx = catmullRomDerivative(p0.x, p1.x, p2.x, p3.x, tSeg);
            const dy = catmullRomDerivative(p0.y, p1.y, p2.y, p3.y, tSeg);
            const len = Math.hypot(dx, dy) || 1;

            // Unit normal vector
            const nx = -dy / len;
            const ny = dx / len;

            // Global progression along ribbon for twist parameter
            const segmentIndex = i - 1;
            const progress = (segmentIndex + tSeg) / totalSegments;

            samples.push({
              x,
              y,
              nx,
              ny,
              progress,
            });
          }
        }
        return samples;
      };

      const samples1 = sampleSpline(pts1);
      const samples2 = sampleSpline(pts2);

      // Rendering configuration:
      // High line count with 3D twist and moiré wireframe intersections
      const numLines = isMobile ? 38 : 58;
      // Generous ribbon width on mobile so it doesn't look thin or constricted
      const ribbonWidth = isMobile ? Math.max(width * 0.44, 170) : 210;

      // Dark mode: luminous crimson glow with screen composite
      // Light mode: elegant burgundy with soft alpha
      const baseAlpha = isDark ? (isMobile ? 0.38 : 0.35) : 0.24;
      ctx.globalCompositeOperation = isDark ? 'screen' : 'source-over';

      const drawRibbon = (samples, phaseOffset = 0) => {
        if (samples.length < 2) return;

        for (let i = 0; i < numLines; i++) {
          const u = (i / (numLines - 1)) * 2 - 1; // [-1, 1]
          const absU = Math.abs(u);

          // Center lines are bright, edge lines taper gracefully
          let lineAlpha = (1 - absU * 0.58) * baseAlpha;

          // Core highlights on bundling edges
          const isEdge = i === 0 || i === numLines - 1;
          const isCore = i === Math.floor(numLines / 2) || i === Math.floor(numLines / 2) - 1;

          if (isEdge || isCore) {
            lineAlpha = Math.min(lineAlpha * 1.55, isDark ? 0.78 : 0.42);
          }

          if (isDark) {
            // Radiant crimson with ruby highlight on bundled edges
            ctx.strokeStyle =
              isEdge || isCore
                ? `rgba(255, 65, 85, ${lineAlpha.toFixed(3)})`
                : `rgba(225, 29, 46, ${lineAlpha.toFixed(3)})`;
          } else {
            // Clean burgundy for light mode
            ctx.strokeStyle = `rgba(205, 25, 45, ${lineAlpha.toFixed(3)})`;
          }

          ctx.lineWidth = isEdge || isCore ? 1.1 : 0.75;
          ctx.beginPath();

          let started = false;

          for (let j = 0; j < samples.length; j++) {
            const pt = samples[j];

            // 3D continuous volumetric ribbon projection
            // Pure trigonometric formulation guarantees C-infinity smoothness with zero discontinuities or tears
            const twistFreq = isMobile ? Math.PI * 1.6 : Math.PI * 3.5;
            const twistAngle = pt.progress * twistFreq + time * 0.35 + phaseOffset;
            const cosT = Math.cos(twistAngle);
            const sinT = Math.sin(twistAngle);

            // Volumetric ribbon depth: gives the ribbon an elegant arched silk fold when viewed edge-on
            // completely avoiding any pinching or flat collapses without any discontinuous operations
            const depthWidth = isMobile ? ribbonWidth * 0.32 : ribbonWidth * 0.26;
            const breathFreq = isMobile ? Math.PI * 2.2 : Math.PI * 4;
            const dynamicWidth = ribbonWidth * (0.88 + 0.12 * Math.sin(pt.progress * breathFreq + time * 0.4));

            // Continuous 3D surface displacement:
            // - u * dynamicWidth * cosT: primary flat ribbon spread
            // - (1 - u * u) * depthWidth * sinT: 3D arch depth when twisting
            // - subtle secondary wave curl
            const displacement =
              u * dynamicWidth * cosT +
              (1 - u * u) * depthWidth * sinT +
              (u * u - 0.33) * 12 * Math.sin(twistAngle * 2);

            // Displace along normal vector
            const px = pt.x + pt.nx * displacement;
            const py = pt.y + pt.ny * displacement;

            if (!started) {
              ctx.moveTo(px, py);
              started = true;
            } else {
              ctx.lineTo(px, py);
            }
          }

          ctx.stroke();
        }
      };

      // Draw Ribbon 1
      drawRibbon(samples1, 0);

      // Draw Ribbon 2 (crossing strand that forms the diamond wireframe mesh)
      drawRibbon(samples2, Math.PI * 0.65);

      // Ambient Volumetric Glow behind the main intersection in visible screen
      if (isDark) {
        ctx.globalCompositeOperation = 'screen';
        const radialGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          20,
          width * 0.5,
          height * 0.5,
          Math.min(width, height) * 0.65
        );
        radialGrad.addColorStop(0, 'rgba(225, 29, 46, 0.07)');
        radialGrad.addColorStop(0.5, 'rgba(225, 29, 46, 0.02)');
        radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = radialGrad;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />
    </div>
  );
}
