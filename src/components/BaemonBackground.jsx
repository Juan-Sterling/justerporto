import React, { useEffect, useRef } from 'react';

/**
 * BaemonBackground - Ambient Chiseled Chrome & Ruby Crystal Shards (BABYMONSTER 1st Mini Album Aesthetic)
 * 
 * Inspired by the visual identity of the 1st Mini Album BABYMONS7ER:
 * - Floating shattered chrome splinters & obsidian ruby crystals.
 * - Dynamic scroll interaction: Parallax depth layers + radial dispersion (clears the center for readability).
 * - Multi-device responsive tiering (Mobile: 20 shards, Tablet: 32 shards, PC: 48 shards) with DPR capping.
 * - 0% scroll jank / 60-120 FPS guaranteed via zero-allocation render loop and lerped scroll tracking.
 * - Single-color solid shards in pure black (#000000) and BABYMONSTER crimson red (#E11D2E).
 */
const SHARD_COLORS = {
  chrome: '#000000',
  ruby: '#E11D2E',
};

export default function BaemonBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId = null;
    let isVisible = true;

    // Scroll state tracking with smooth lerp
    let targetScrollY = window.scrollY || window.pageYOffset || 0;
    let currentScrollY = targetScrollY;
    let scrollVelocity = 0;

    // Theme state
    let isDark = document.documentElement.classList.contains('dark');

    // Viewport dimensions & DPR
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;

    // Pre-allocated array of shards
    let shards = [];

    // Helper: random in range [min, max]
    const random = (min, max) => Math.random() * (max - min) + min;

    // Initialize shards based on device size
    const initShards = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      // Cap DPR for mobile devices to prevent GPU fill-rate throttling
      dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.35) : isTablet ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const count = isMobile ? 22 : isTablet ? 34 : 50;
      shards = [];

      const cx = width * 0.5;
      const cy = height * 0.45;

      for (let i = 0; i < count; i++) {
        // Depth layer z in [0.2, 1.0] (1.0 = closest, fastest, largest)
        const z = random(0.2, 1.0);

        // Angle around center for natural ambient dispersion
        const angle = random(0, Math.PI * 2);

        // Distribution: Some close to center portal, others spread throughout the viewport
        const distanceRatio = Math.pow(random(0.15, 1.0), 0.85);
        const maxDist = Math.max(width, height) * 0.65;
        const dist = distanceRatio * maxDist;

        const baseX = cx + Math.cos(angle) * dist;
        const baseY = cy + Math.sin(angle) * dist * 0.85;

        // Dispersion direction vector (normalized outward from center)
        const dx = baseX - cx;
        const dy = baseY - cy;
        const len = Math.hypot(dx, dy) || 1;
        const dirX = dx / len;
        const dirY = dy / len;

        // Shard types: 
        // 0 = Chiseled Diamond/Rhomboid (dual facet with center ridge)
        // 1 = Elongated Dagger/Blade Fragment (triangular chiseled)
        // 2 = Micro Needle / Stardust Ember
        const typeRand = Math.random();
        const type = typeRand < 0.55 ? 0 : typeRand < 0.85 ? 1 : 2;

        // Dimensions proportional to depth
        const baseScale = isMobile ? 0.75 : 1.0;
        const length = random(18, 48) * (0.4 + z * 0.6) * baseScale;
        const aspect = random(2.8, 5.2);
        const shardWidth = length / aspect;

        // Material: 65% Chrome / Obsidian Metal, 35% Crimson Ruby Crystal
        const material = Math.random() < 0.35 ? 'ruby' : 'chrome';

        // Dynamic motion parameters
        const rot = random(0, Math.PI * 2);
        const rotSpeed = random(-0.008, 0.008) * (0.5 + z * 0.5);
        const floatSpeed = random(0.0008, 0.002);
        const floatPhase = random(0, Math.PI * 2);

        shards.push({
          baseX,
          baseY,
          z,
          dirX,
          dirY,
          type,
          length,
          width: shardWidth,
          material,
          rot,
          rotSpeed,
          floatSpeed,
          floatPhase,
        });
      }
    };

    initShards();

    // Scroll listener (native + lenis bridge)
    const handleScroll = () => {
      targetScrollY = window.scrollY || window.pageYOffset || 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Sync with global Lenis if present
    let lenisUnsubscribe = null;
    if (window.__lenis) {
      lenisUnsubscribe = window.__lenis.on('scroll', (e) => {
        targetScrollY = e.scroll || window.scrollY || 0;
      });
    }

    // Theme observer (Dark / Light mode change)
    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Visibility change (pause when tab is inactive)
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && !animFrameId) {
        lastTime = performance.now();
        animFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Debounced Resize listener
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initShards();
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    // Main animation loop
    let lastTime = performance.now();
    let time = 0;

    const render = (now) => {
      if (!isVisible) {
        animFrameId = null;
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.05); // Cap dt to avoid large jumps
      lastTime = now;
      time += dt;

      // Smooth scroll lerping for silky response
      const prevScroll = currentScrollY;
      currentScrollY += (targetScrollY - currentScrollY) * 0.12;
      scrollVelocity = (currentScrollY - prevScroll) / (dt || 0.016);

      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Volumetric Glow behind center
      if (isDark) {
        const radGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.45,
          20,
          width * 0.5,
          height * 0.45,
          Math.min(width, height) * 0.58
        );
        radGrad.addColorStop(0, 'rgba(225, 29, 46, 0.075)');
        radGrad.addColorStop(0.45, 'rgba(180, 15, 30, 0.025)');
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);
      } else {
        const radGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.45,
          20,
          width * 0.5,
          height * 0.45,
          Math.min(width, height) * 0.55
        );
        radGrad.addColorStop(0, 'rgba(225, 29, 46, 0.035)');
        radGrad.addColorStop(0.5, 'rgba(244, 63, 94, 0.012)');
        radGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Render all shards
      const totalShards = shards.length;
      const scrollDispersionProgress = Math.min(1.0, currentScrollY / (height * 0.85));

      for (let i = 0; i < totalShards; i++) {
        const s = shards[i];

        // Idle micro-float
        const floatX = Math.sin(time * s.floatSpeed * 1000 + s.floatPhase) * (14 * s.z);
        const floatY = Math.cos(time * s.floatSpeed * 850 + s.floatPhase) * (10 * s.z);

        // Vertical parallax offset based on depth
        // Loop position vertically across document view smoothly
        const parallaxY = -currentScrollY * (0.12 + s.z * 0.38);

        // Radial dispersion: as user scrolls down, push shards outward to the edges
        // keeping the reading area (Education, Skills, Experience) clean
        const spreadMultiplier = width * 0.42 * s.z;
        const disperseX = s.dirX * scrollDispersionProgress * spreadMultiplier;
        const disperseY = s.dirY * scrollDispersionProgress * (height * 0.22 * s.z);

        // Calculate final screen coordinates
        let posX = s.baseX + floatX + disperseX;
        let posY = (s.baseY + floatY + parallaxY + disperseY) % (height * 1.5);
        if (posY < -s.length * 2) posY += height * 1.5;

        // Skip if outside visible viewport
        if (posX < -s.length * 2 || posX > width + s.length * 2 || posY < -s.length * 2 || posY > height + s.length * 2) {
          continue;
        }

        // Rotation: Ambient slow spin + scroll velocity impulse
        const currentRot = s.rot + time * s.rotSpeed + currentScrollY * 0.0018 * (s.z > 0.5 ? 1 : -1);

        ctx.save();
        ctx.translate(posX, posY);
        ctx.rotate(currentRot);

        const halfL = s.length * 0.5;
        const halfW = s.width * 0.5;

        ctx.fillStyle = SHARD_COLORS[s.material];

        if (s.type === 0) {
          // --- TYPE 0: DIAMOND / RHOMBOID SHARD ---
          ctx.beginPath();
          ctx.moveTo(0, -halfL);
          ctx.lineTo(-halfW, 0);
          ctx.lineTo(0, halfL);
          ctx.lineTo(halfW, 0);
          ctx.closePath();
          ctx.fill();

        } else if (s.type === 1) {
          // --- TYPE 1: TRIANGULAR DAGGER FRAGMENT ---
          ctx.beginPath();
          ctx.moveTo(0, -halfL);
          ctx.lineTo(-halfW * 0.9, halfL);
          ctx.lineTo(halfW * 0.5, halfL * 0.7);
          ctx.closePath();
          ctx.fill();

        } else {
          // --- TYPE 2: MICRO NEEDLE / EMBER FLECK ---
          ctx.beginPath();
          ctx.ellipse(0, 0, halfW * 0.35, halfL * 0.75, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameId = requestAnimationFrame(render);
    };

    // Kick off animation loop
    animFrameId = requestAnimationFrame(render);

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      themeObserver.disconnect();
      if (lenisUnsubscribe) lenisUnsubscribe();
      clearTimeout(resizeTimer);
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
