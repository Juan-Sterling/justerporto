import React, { useEffect, useState, useRef, useCallback } from 'react';

/**
 * TacticalRangeArena
 * Interactive Valorant-style "The Range" Holographic Drone Target Practice.
 * 
 * Performance & Architecture:
 * - Active strictly on desktop PC when Range Protocol is toggled ON.
 * - Single target in DOM at any time (zero memory leak, zero frame drops).
 * - Safe viewport positioning (respects top navbar and bottom margins).
 * - Target Lock-On feedback integration with TacticalCrosshair.
 * - Holographic shatter particle explosion + floating combat text on hit.
 * - Zero touch footprint / 0% CPU consumption when inactive.
 */
export default function TacticalRangeArena({
  isActive = false,
  isDesktop = false,
  onTargetHit,
}) {
  const [target, setTarget] = useState(null);
  const [hitEffects, setHitEffects] = useState([]);
  const spawnTimerRef = useRef(null);
  const despawnTimerRef = useRef(null);
  const targetIdCounter = useRef(1);

  // Generate safe coordinates inside current viewport
  const getRandomSafePosition = useCallback(() => {
    if (typeof window === 'undefined') return { x: 200, y: 200 };

    const paddingX = 60;
    const paddingTop = 120; // clear floating navbar
    const paddingBottom = 100;

    const maxX = Math.max(100, window.innerWidth - paddingX - 60);
    const minX = paddingX;
    const maxY = Math.max(paddingTop + 50, window.innerHeight - paddingBottom - 60);
    const minY = paddingTop;

    const x = Math.floor(minX + Math.random() * (maxX - minX));
    const y = Math.floor(minY + Math.random() * (maxY - minY));

    return { x, y };
  }, []);

  // Spawn new target drone
  const spawnTarget = useCallback(() => {
    if (!isActive || !isDesktop) return;

    const pos = getRandomSafePosition();
    const id = targetIdCounter.current++;

    setTarget({
      id,
      x: pos.x,
      y: pos.y,
      spawnTime: Date.now(),
    });

    // Auto-despawn after 7.5 seconds if not shot
    if (despawnTimerRef.current) clearTimeout(despawnTimerRef.current);
    despawnTimerRef.current = setTimeout(() => {
      setTarget((curr) => (curr && curr.id === id ? null : curr));

      // Schedule next spawn in 2.2 seconds
      spawnTimerRef.current = setTimeout(() => {
        spawnTarget();
      }, 2200);
    }, 7500);
  }, [isActive, isDesktop, getRandomSafePosition]);

  // Main lifecycle loop
  useEffect(() => {
    if (isActive && isDesktop) {
      // Initial spawn after 800ms
      spawnTimerRef.current = setTimeout(() => {
        spawnTarget();
      }, 800);
    } else {
      setTarget(null);
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
      if (despawnTimerRef.current) clearTimeout(despawnTimerRef.current);
    }

    return () => {
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
      if (despawnTimerRef.current) clearTimeout(despawnTimerRef.current);
    };
  }, [isActive, isDesktop, spawnTarget]);

  // Handle Target Destruction
  const handleTargetClick = (e, targetItem) => {
    e.stopPropagation();

    // Call score counter callback
    if (onTargetHit) onTargetHit();

    const hitX = targetItem.x + 26; // Center of 52px drone
    const hitY = targetItem.y + 26;

    const combatTexts = [
      '+100 HEADSHOT',
      'TARGET ELIMINATED',
      'CRITICAL HIT',
      'CLEAN SHOT',
      'RADIANITE PURGED',
    ];
    const text = combatTexts[Math.floor(Math.random() * combatTexts.length)];

    const hitId = Date.now();
    setHitEffects((prev) => [
      ...prev.slice(-4), // keep max 4 effects in memory
      { id: hitId, x: hitX, y: hitY, text },
    ]);

    // Auto-clean hit effect after 750ms
    setTimeout(() => {
      setHitEffects((prev) => prev.filter((item) => item.id !== hitId));
    }, 750);

    // Remove active target
    setTarget(null);
    if (despawnTimerRef.current) clearTimeout(despawnTimerRef.current);

    // Schedule next target spawn after 1.4 seconds
    spawnTimerRef.current = setTimeout(() => {
      spawnTarget();
    }, 1400);
  };

  if (!isActive || !isDesktop) return null;

  return (
    <>
      <style>{`
        /* Floating Drone Hover Motion */
        @keyframes droneFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.02);
          }
        }

        /* Drone Reticle Ring Rotation */
        @keyframes reticleRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Target Warp In */
        @keyframes targetWarpIn {
          0% {
            opacity: 0;
            transform: scale(0.2) rotate(-90deg);
          }
          70% {
            transform: scale(1.1) rotate(10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        /* Combat Floating Text */
        @keyframes combatTextFloat {
          0% {
            opacity: 0;
            transform: translate3d(-50%, 0, 0) scale(0.7);
          }
          20% {
            opacity: 1;
            transform: translate3d(-50%, -15px, 0) scale(1.1);
          }
          100% {
            opacity: 0;
            transform: translate3d(-50%, -45px, 0) scale(0.9);
          }
        }

        /* Hologram Shatter Particles */
        @keyframes shatterParticle {
          0% {
            transform: translate3d(0, 0, 0) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--sx), var(--sy), 0) scale(0.1);
            opacity: 0;
          }
        }

        .tactical-drone-container {
          animation: targetWarpIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .tactical-drone-body {
          animation: droneFloat 3s ease-in-out infinite;
        }

        .tactical-drone-ring {
          animation: reticleRotate 8s linear infinite;
        }
      `}</style>

      {/* Target Arena Layer */}
      <div className="fixed inset-0 pointer-events-none z-[999990] overflow-hidden select-none">
        {/* Active Target Drone */}
        {target && (
          <div
            key={target.id}
            onClick={(e) => handleTargetClick(e, target)}
            data-interactive="true"
            className="tactical-drone-container absolute pointer-events-auto cursor-pointer"
            style={{
              left: `${target.x}px`,
              top: `${target.y}px`,
              width: '52px',
              height: '52px',
            }}
          >
            <div className="tactical-drone-body relative w-full h-full flex items-center justify-center group">
              {/* Outer Rotating Tactical Reticle Ring */}
              <div className="tactical-drone-ring absolute inset-0 rounded-full border-2 border-dashed border-[#059669] dark:border-[#00f5a0] shadow-[0_0_12px_rgba(5,150,105,0.4)] dark:shadow-[0_0_15px_rgba(0,245,160,0.5)] group-hover:border-[#ef4444] transition-colors" />

              {/* Pulsing Target Radar Glow */}
              <div className="absolute inset-1.5 rounded-full bg-[#059669]/15 dark:bg-[#00f5a0]/15 group-hover:bg-[#ef4444]/25 transition-colors animate-pulse" />

              {/* Four Cardinal Aim Markers */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#047857] dark:bg-[#00f5a0] shadow-[0_0_0_1px_#000]" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#047857] dark:bg-[#00f5a0] shadow-[0_0_0_1px_#000]" />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#047857] dark:bg-[#00f5a0] shadow-[0_0_0_1px_#000]" />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#047857] dark:bg-[#00f5a0] shadow-[0_0_0_1px_#000]" />

              {/* Center Radianite Core Diamond */}
              <div className="relative w-4 h-4 rotate-45 bg-[#047857] dark:bg-[#00f5a0] border border-black shadow-[0_0_8px_#00f5a0] group-hover:bg-[#ef4444] group-hover:shadow-[0_0_12px_#ef4444] transition-all transform-gpu group-hover:scale-125" />

              {/* Hover Badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold tracking-widest text-[#064e3b] dark:text-[#00f5a0] bg-white/80 dark:bg-black/75 px-1.5 py-0.2 rounded-xs border border-[#047857]/40 dark:border-[#00f5a0]/40 shadow-xs whitespace-nowrap opacity-85 group-hover:opacity-100 group-hover:text-[#ef4444] group-hover:border-[#ef4444]">
                TARGET
              </div>
            </div>
          </div>
        )}

        {/* Combat Floating Hit Texts & Shatter VFX */}
        {hitEffects.map((hit) => (
          <div
            key={hit.id}
            className="absolute pointer-events-none"
            style={{ left: `${hit.x}px`, top: `${hit.y}px` }}
          >
            {/* Hologram Shatter Particles (8 directional fragments) */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const dist = 28 + Math.random() * 20;
              const sx = `${(Math.cos(rad) * dist).toFixed(1)}px`;
              const sy = `${(Math.sin(rad) * dist).toFixed(1)}px`;

              return (
                <span
                  key={i}
                  className="absolute w-2 h-2 rounded-xs bg-[#00f5a0] border border-black shadow-[0_0_6px_#00f5a0]"
                  style={{
                    '--sx': sx,
                    '--sy': sy,
                    animation: 'shatterParticle 0.42s ease-out forwards',
                  }}
                />
              );
            })}

            {/* Floating Combat Callout Text */}
            <div
              className="absolute font-mono font-black text-xs sm:text-sm tracking-wider uppercase text-[#ef4444] dark:text-[#00f5a0] whitespace-nowrap"
              style={{
                textShadow: '0 0 8px rgba(0,0,0,0.9), 0 0 14px rgba(0,245,160,0.6)',
                animation: 'combatTextFloat 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              {hit.text}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

