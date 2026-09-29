import React, { useEffect, useRef } from 'react';

/**
 * BaemonBackground - Parametric Thin Red Wave Lines
 * 
 * Replaces the grid matrix with continuous, undulating thin red wave ribbons
 * inspired by 3D parametric silk wireframe curves.
 * The waves span continuously across all sections (Hero -> Experience -> Skills -> Education -> Contact)
 * creating a seamless, connected flow as the user scrolls down the page.
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

    // Smooth scroll tracking
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

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

    // Section IDs for dynamic height anchors
    const sectionIds = ['hero', 'experience', 'skills', 'education', 'contact'];

    // Dynamically calculate anchors based on section positions & heights
    const getDynamicAnchors = () => {
      const scrollY = window.scrollY;
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight * 4
      );

      const anchors = [];

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollY;
          const secHeight = Math.max(rect.height, height * 0.7);
          
          // Divide tall sections (like Experience) into multiple wave loops so no section is ever empty
          const loops = Math.max(1, Math.round(secHeight / (height * 0.85)));
          for (let step = 0; step < loops; step++) {
            const fraction = (step + 0.5) / loops;
            anchors.push({
              y: top + secHeight * fraction,
              section: id,
            });
          }
        }
      });

      // Fallback if elements not yet mounted
      if (anchors.length === 0) {
        const totalFallback = 7;
        for (let i = 0; i < totalFallback; i++) {
          anchors.push({
            y: ((i + 0.5) / totalFallback) * docHeight,
            section: 'fallback',
          });
        }
      }

      return { anchors, docHeight };
    };

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

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

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
      // Smooth scroll lerp with subtle inertia
      const scrollDiff = targetScrollY - currentScrollY;
      currentScrollY += scrollDiff * 0.065;
      scrollVelocity = (targetScrollY - lastScrollY) * 0.04;
      lastScrollY = targetScrollY;

      // Calm, subtle mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.025;
      mouseY += (targetMouseY - mouseY) * 0.025;
      const mouseParallaxX = ((mouseX / width) - 0.5) * 10;
      const mouseParallaxY = ((mouseY / height) - 0.5) * 8;

      // Slow, tranquil breathing animation speed so it doesn't cause dizziness
      time += prefersReducedMotion ? 0 : 0.0016;

      ctx.clearRect(0, 0, width, height);

      const { anchors, docHeight } = getDynamicAnchors();

      // Build continuous spine control points across all anchors
      // Alternating Left -> Right and Right -> Left with edge loops
      const buildSpines = () => {
        const pts1 = [];
        const pts2 = [];

        // Boundary entry point above document top
        pts1.push({ x: -width * 0.15, y: -height * 0.3 });
        pts2.push({ x: width * 1.15, y: -height * 0.3 });

        for (let i = 0; i < anchors.length; i++) {
          const yCenter = anchors[i].y;
          const yPrev = i > 0 ? anchors[i - 1].y : 0;
          const yNext = i < anchors.length - 1 ? anchors[i + 1].y : docHeight;
          const isEven = i % 2 === 0;

          // Gentle, subtle breathing oscillation (calm amplitude)
          const osc1 = Math.sin(time * 0.5 + i * 1.1) * (height * 0.016);
          const osc2 = Math.cos(time * 0.45 + i * 1.25) * (height * 0.016);
          const velReaction = Math.sin(i * 1.1) * Math.min(Math.max(scrollVelocity, -10), 10);

          if (isEven) {
            // Sweeps Left to Right
            // Entry point
            pts1.push({
              x: -width * 0.05 + mouseParallaxX,
              y: yCenter - height * 0.22 + osc1 + mouseParallaxY,
            });
            pts2.push({
              x: -width * 0.05 + mouseParallaxX,
              y: yCenter + height * 0.12 + osc2 + mouseParallaxY,
            });

            // Midpoint 1: Crossing point in the center-left
            pts1.push({
              x: width * 0.36 + mouseParallaxX * 0.5,
              y: yCenter + height * 0.14 + osc1 + velReaction,
            });
            pts2.push({
              x: width * 0.36 + mouseParallaxX * 0.5,
              y: yCenter - height * 0.08 + osc2 - velReaction,
            });

            // Midpoint 2: Ribbon 1 rises, Ribbon 2 dips
            pts1.push({
              x: width * 0.74,
              y: yCenter - height * 0.14 + osc2,
            });
            pts2.push({
              x: width * 0.74,
              y: yCenter + height * 0.16 + osc1,
            });

            // Continuous loop transition toward next anchor at right edge
            pts1.push({
              x: width * 1.08,
              y: (yCenter + yNext) * 0.5 - height * 0.04 + osc1,
            });
            pts2.push({
              x: width * 1.08,
              y: (yCenter + yNext) * 0.5 + height * 0.06 + osc2,
            });
          } else {
            // Sweeps Right to Left
            pts1.push({
              x: width * 1.05 - mouseParallaxX,
              y: yCenter - height * 0.2 + osc2 - mouseParallaxY,
            });
            pts2.push({
              x: width * 1.05 - mouseParallaxX,
              y: yCenter + height * 0.14 + osc1 - mouseParallaxY,
            });

            // Crossing point in center-right
            pts1.push({
              x: width * 0.64 - mouseParallaxX * 0.5,
              y: yCenter + height * 0.15 + osc2 - velReaction,
            });
            pts2.push({
              x: width * 0.64 - mouseParallaxX * 0.5,
              y: yCenter - height * 0.1 + osc1 + velReaction,
            });

            pts1.push({
              x: width * 0.26,
              y: yCenter - height * 0.14 + osc1,
            });
            pts2.push({
              x: width * 0.26,
              y: yCenter + height * 0.16 + osc2,
            });

            // Continuous loop transition toward next anchor at left edge
            pts1.push({
              x: -width * 0.08,
              y: (yCenter + yNext) * 0.5 + osc2,
            });
            pts2.push({
              x: -width * 0.08,
              y: (yCenter + yNext) * 0.5 + height * 0.08 + osc1,
            });
          }
        }

        // Boundary exit point below document bottom
        const lastY = anchors[anchors.length - 1].y;
        pts1.push({ x: width * 0.5, y: lastY + height * 0.6 });
        pts2.push({ x: width * 0.5, y: lastY + height * 0.6 });

        return { pts1, pts2 };
      };

      const { pts1, pts2 } = buildSpines();

      // Sample a Catmull-Rom spline array into dense segments
      const sampleSpline = (pts, samplesPerSegment = 26) => {
        const samples = [];
        for (let i = 1; i < pts.length - 2; i++) {
          const p0 = pts[i - 1];
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const p3 = pts[i + 2];

          // Vertical viewport cull to skip segments completely offscreen
          const minWorldY = Math.min(p0.y, p1.y, p2.y, p3.y);
          const maxWorldY = Math.max(p0.y, p1.y, p2.y, p3.y);
          const screenMin = minWorldY - currentScrollY;
          const screenMax = maxWorldY - currentScrollY;

          if (screenMax < -height * 0.4 || screenMin > height * 1.4) {
            continue;
          }

          for (let s = 0; s < samplesPerSegment; s++) {
            const t = s / samplesPerSegment;
            const x = catmullRom(p0.x, p1.x, p2.x, p3.x, t);
            const y = catmullRom(p0.y, p1.y, p2.y, p3.y, t);

            const dx = catmullRomDerivative(p0.x, p1.x, p2.x, p3.x, t);
            const dy = catmullRomDerivative(p0.y, p1.y, p2.y, p3.y, t);
            const len = Math.hypot(dx, dy) || 1;

            // Unit normal vector
            const nx = -dy / len;
            const ny = dx / len;

            // Global progress for twist parameter
            const globalProgress = (y / docHeight) * Math.PI * 10;

            samples.push({
              x,
              y: y - currentScrollY, // Screen coordinate
              nx,
              ny,
              progress: globalProgress,
            });
          }
        }
        return samples;
      };

      const samples1 = sampleSpline(pts1);
      const samples2 = sampleSpline(pts2);

      // Rendering configuration matching the reference image:
      // High line count with 3D twist and moiré diamond wireframe intersections
      const numLines = width < 640 ? 36 : 60;
      const ribbonWidth = width < 640 ? 120 : 230;

      // Dark mode: luminous crimson glow with screen/lighter composite
      // Light mode: elegant burgundy / crimson with soft alpha
      const baseAlpha = isDark ? 0.36 : 0.26;
      ctx.globalCompositeOperation = isDark ? 'screen' : 'source-over';

      const drawRibbon = (samples, phaseOffset = 0) => {
        if (samples.length < 2) return;

        for (let i = 0; i < numLines; i++) {
          const u = (i / (numLines - 1)) * 2 - 1; // [-1, 1]
          const absU = Math.abs(u);

          // Center lines are brighter, edge lines taper gracefully
          let lineAlpha = (1 - absU * 0.6) * baseAlpha;

          // Core highlights on bundling edge
          const isEdge = i === 0 || i === numLines - 1;
          const isCore = i === Math.floor(numLines / 2) || i === Math.floor(numLines / 2) - 1;

          if (isEdge || isCore) {
            lineAlpha = Math.min(lineAlpha * 1.6, isDark ? 0.8 : 0.45);
          }

          if (isDark) {
            // Radiant crimson with slight ruby highlight on bundled edges
            ctx.strokeStyle =
              isEdge || isCore
                ? `rgba(255, 65, 85, ${lineAlpha.toFixed(3)})`
                : `rgba(225, 29, 46, ${lineAlpha.toFixed(3)})`;
          } else {
            // Clean burgundy for light mode
            ctx.strokeStyle = `rgba(205, 25, 45, ${lineAlpha.toFixed(3)})`;
          }

          ctx.lineWidth = isEdge || isCore ? 1.15 : 0.8;
          ctx.beginPath();

          let started = false;

          for (let j = 0; j < samples.length; j++) {
            const pt = samples[j];

            // Gentle 3D twist modulation (tranquil, non-dizzying rotation)
            const twistAngle = pt.progress * 1.5 + time * 0.3 + phaseOffset;
            const twistFactor = Math.cos(twistAngle);
            const curl = (u * u - 0.33) * 16 * Math.sin(twistAngle * 0.5);

            // Soft width breathing
            const dynamicWidth = ribbonWidth * (0.8 + 0.2 * Math.sin(pt.progress * 1.8 + time * 0.35));

            // Displace along normal
            const px = pt.x + pt.nx * (u * dynamicWidth * twistFactor + curl);
            const py = pt.y + pt.ny * (u * dynamicWidth * twistFactor + curl);

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
        const visibleCenter = height * 0.5;
        const radialGrad = ctx.createRadialGradient(
          width * 0.5,
          visibleCenter,
          20,
          width * 0.5,
          visibleCenter,
          Math.min(width, height) * 0.7
        );
        radialGrad.addColorStop(0, 'rgba(225, 29, 46, 0.08)');
        radialGrad.addColorStop(0.5, 'rgba(225, 29, 46, 0.025)');
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
      window.removeEventListener('scroll', handleScroll);
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
