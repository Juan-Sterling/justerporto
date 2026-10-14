import React, { useMemo } from 'react';

/**
 * BaemonRainBackground - Concept B (Refined: Official BABYMONSTER Lightstick & Dual Theme)
 * 
 * An atmospheric visual cascade of BABYMONSTER-themed rain attributes:
 * - Official BABYMONSTER Lightstick (Iconic devil horns on luminous globe, sleek handle & tail charm)
 * - Cyber Audio Equalizers (YG Hip-hop beat frequency bars)
 * - Crimson Devil Horns & Razor Claw Slashes (sleek and transparent)
 * - Precision Tech-HUD Target Reticles & Audio Wave Glyphs
 * - Liquid Crimson Droplets & Laser Needles
 * - Ambient Atmospheric Backlight Mesh: subtly brightens Dark Mode to eliminate void-blackness
 *   and adds luxury warmth to Light Mode.
 * 
 * Powered by GSAP ScrollSmoother data-speed (parallax depth) and data-lag (inertia drift).
 * 100% pointer-events-none and GPU-accelerated.
 */

// 1. Official BABYMONSTER Lightstick Vector Component
function BaemonLightstick({ size = 32, className = '' }) {
  const width = size;
  const height = size * 1.6;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`filter drop-shadow-[0_2px_8px_rgba(225,29,46,0.3)] dark:drop-shadow-[0_0_12px_rgba(255,42,60,0.7)] ${className}`}
    >
      <defs>
        {/* Glowing Head Dome Gradient - Dark Mode */}
        <radialGradient id="lightstickGlobeDark" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#FFE4E6" />
          <stop offset="70%" stopColor="#FF3B4D" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#E11D2E" stopOpacity="0.95" />
        </radialGradient>

        {/* Head Dome Gradient - Light Mode */}
        <radialGradient id="lightstickGlobeLight" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F4F4F5" />
          <stop offset="85%" stopColor="#FECDD3" />
          <stop offset="100%" stopColor="#E11D2E" />
        </radialGradient>

        {/* Devil Horns Gradient */}
        <linearGradient id="lsHornGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF3B4D" />
          <stop offset="50%" stopColor="#E11D2E" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>

        {/* Handle Gradient */}
        <linearGradient id="lsHandleGradDark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#18181B" />
          <stop offset="50%" stopColor="#27272A" />
          <stop offset="100%" stopColor="#09090B" />
        </linearGradient>
        <linearGradient id="lsHandleGradLight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#52525B" />
          <stop offset="50%" stopColor="#71717A" />
          <stop offset="100%" stopColor="#3F3F46" />
        </linearGradient>
      </defs>

      {/* 1. Curved Devil/Monster Horns (Mounted on Top of Globe) */}
      {/* Left Horn */}
      <path
        d="M 18 20 C 14 12 7 6 0 1 C 8 4 16 12 19 22 Z"
        fill="url(#lsHornGrad)"
        className="filter drop-shadow-[0_0_4px_rgba(225,29,46,0.6)]"
      />
      {/* Right Horn */}
      <path
        d="M 42 20 C 46 12 53 6 60 1 C 52 4 44 12 41 22 Z"
        fill="url(#lsHornGrad)"
        className="filter drop-shadow-[0_0_4px_rgba(225,29,46,0.6)]"
      />

      {/* 2. Luminous Translucent Globe / Head */}
      <circle
        cx="30"
        cy="28"
        r="19"
        className="fill-[url(#lightstickGlobeLight)] dark:fill-[url(#lightstickGlobeDark)] stroke-[#E11D2E]/40 dark:stroke-white/80"
        strokeWidth="1.2"
      />

      {/* Specular Glint Highlight on Head */}
      <ellipse
        cx="24"
        cy="20"
        rx="5"
        ry="2.5"
        transform="rotate(-30 24 20)"
        fill="#FFFFFF"
        opacity="0.75"
      />

      {/* 3. Collar Ring (Crimson Accent between Head & Handle) */}
      <rect
        x="22"
        y="45"
        width="16"
        height="3.5"
        rx="1.75"
        fill="#E11D2E"
        className="filter drop-shadow-[0_0_4px_rgba(225,29,46,0.8)]"
      />

      {/* 4. Tapered Ergonomic Handle */}
      <path
        d="M 23 48 L 24.5 76 C 24.5 78 26 80 28 80 L 32 80 C 34 80 35.5 78 35.5 76 L 37 48 Z"
        className="fill-[url(#lsHandleGradLight)] dark:fill-[url(#lsHandleGradDark)] stroke-[#27272A] dark:stroke-zinc-700/60"
        strokeWidth="0.8"
      />

      {/* 5. Center Power Button / BABYMONSTER "BM" Icon */}
      <circle
        cx="30"
        cy="60"
        r="3.2"
        fill="#E11D2E"
        className="filter drop-shadow-[0_0_4px_rgba(225,29,46,0.7)]"
      />
      <circle cx="30" cy="60" r="1.2" fill="#FFFFFF" />

      {/* 6. Base Devil Tail Charm Dangling at Bottom */}
      <path
        d="M 30 80 C 30 84 35 87 35 90 C 35 92 32 94 30 94"
        stroke="#E11D2E"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrow tip of the devil tail */}
      <polygon
        points="30,95 27,91 33,91"
        fill="#E11D2E"
      />
    </svg>
  );
}

// 2. Cyber Audio Equalizer (Replacing Monogram Badges - Pure Translucent Music Rhythm)
function CyberEqualizer({ className = '' }) {
  return (
    <div className={`inline-flex flex-col items-center gap-1 pointer-events-none select-none ${className}`}>
      {/* Translucent EQ Bar Cluster */}
      <div className="flex items-end gap-1 h-7 px-2 py-1 rounded-md bg-white/70 dark:bg-white/[0.04] border border-[#E11D2E]/25 dark:border-[#FF2A3C]/35 backdrop-blur-md shadow-[0_2px_8px_rgba(225,29,46,0.1)] dark:shadow-[0_0_12px_rgba(225,29,46,0.25)]">
        <span className="w-1 rounded-full bg-gradient-to-t from-[#E11D2E] to-[#FF3B4D] h-3 animate-pulse opacity-85" />
        <span className="w-1 rounded-full bg-gradient-to-t from-[#E11D2E] to-[#FF3B4D] h-5.5 opacity-95 shadow-[0_0_6px_rgba(225,29,46,0.5)]" />
        <span className="w-1 rounded-full bg-gradient-to-t from-[#E11D2E] to-[#FF3B4D] h-2 opacity-75" />
        <span className="w-1 rounded-full bg-gradient-to-t from-[#E11D2E] to-[#FF3B4D] h-4.5 opacity-90 shadow-[0_0_5px_rgba(225,29,46,0.4)]" />
        <span className="w-1 rounded-full bg-gradient-to-t from-[#E11D2E] to-[#FF3B4D] h-3.5 opacity-80" />
      </div>
      <span className="font-mono text-[8px] font-bold tracking-widest text-[#E11D2E] dark:text-[#FF3B4D] opacity-80 uppercase">
        BM // 07 BPM
      </span>
    </div>
  );
}

// 3. BABYMONSTER Horns Silhouette (Adaptive Ruby to Glowing Crimson)
function MonsterHorns({ size = 30, className = '' }) {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 60 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`filter drop-shadow-[0_2px_6px_rgba(225,29,46,0.25)] dark:drop-shadow-[0_0_10px_rgba(225,29,46,0.7)] ${className}`}
    >
      <defs>
        <linearGradient id="hornGradDual" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF3B4D" />
          <stop offset="60%" stopColor="#E11D2E" />
          <stop offset="100%" stopColor="#880815" />
        </linearGradient>
      </defs>
      {/* Left Horn */}
      <path
        d="M 24 40 C 20 28 10 14 2 2 C 12 8 22 22 26 38 Z"
        fill="url(#hornGradDual)"
        className="opacity-90"
      />
      {/* Right Horn */}
      <path
        d="M 36 40 C 40 28 50 14 58 2 C 48 8 38 22 34 38 Z"
        fill="url(#hornGradDual)"
        className="opacity-90"
      />
    </svg>
  );
}

// 4. Claw Slash (Sharp Red Razor Scratch)
function ClawSlash({ size = 26, className = '' }) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 40 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`filter drop-shadow-[0_2px_5px_rgba(225,29,46,0.3)] dark:drop-shadow-[0_0_8px_rgba(255,42,60,0.6)] ${className}`}
    >
      <path
        d="M 6 0 L 2 52 M 20 5 L 15 55 M 34 2 L 29 50"
        className="stroke-[#E11D2E] dark:stroke-[#FF2A3C]"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="45 8"
      />
    </svg>
  );
}

// 5. Tech Reticle HUD (Precise Target Crosshair)
function TechReticle({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`filter drop-shadow-[0_1px_4px_rgba(225,29,46,0.2)] dark:drop-shadow-[0_0_6px_rgba(255,59,77,0.4)] ${className}`}
    >
      <circle cx="30" cy="30" r="22" className="stroke-[#E11D2E] dark:stroke-[#FF3B4D]" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <circle cx="30" cy="30" r="10" className="stroke-zinc-500 dark:stroke-white" strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="2" x2="30" y2="12" className="stroke-[#E11D2E] dark:stroke-[#FF2A3C]" strokeWidth="1.5" />
      <line x1="30" y1="48" x2="30" y2="58" className="stroke-[#E11D2E] dark:stroke-[#FF2A3C]" strokeWidth="1.5" />
      <line x1="2" y1="30" x2="12" y2="30" className="stroke-[#E11D2E] dark:stroke-[#FF2A3C]" strokeWidth="1.5" />
      <line x1="48" y1="30" x2="58" y2="30" className="stroke-[#E11D2E] dark:stroke-[#FF2A3C]" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="2" className="fill-[#E11D2E] dark:fill-[#FF2A3C]" />
    </svg>
  );
}

// 6. Liquid Crimson Droplet (Clean Ruby Glass in Light, Neon Laser in Dark)
function LiquidDroplet({ height = 65, className = '' }) {
  return (
    <div
      className={`relative flex flex-col items-center pointer-events-none ${className}`}
      style={{ height: `${height}px` }}
    >
      {/* Needle streak trail */}
      <div className="w-[1.5px] h-full bg-gradient-to-b from-transparent via-[#E11D2E]/35 dark:via-[#FF2A3C]/40 to-[#E11D2E] dark:to-[#FF2A3C]" />
      {/* Glowing droplet head */}
      <div className="w-2 h-2 rounded-full bg-[#E11D2E] dark:bg-[#FF3B4D] shadow-[0_1px_6px_rgba(225,29,46,0.4)] dark:shadow-[0_0_10px_#FF2A3C] -mt-1" />
    </div>
  );
}

export default function BaemonRainBackground() {
  // Pre-calculated distribution of 32 distinct rain charms across the entire scroll height
  // Spanning from Hero (top 6%) to Footer (bottom 98%)
  const rainItems = useMemo(() => [
    // Top Section (Near Hero / Transition to Experience)
    { id: 1, type: 'lightstick', top: 6, left: 8, speed: 0.6, lag: 0.2, scale: 0.95, opacity: 0.85, animDelay: '0s' },
    { id: 2, type: 'droplet', top: 9, left: 24, speed: 1.8, lag: 0.5, height: 75, opacity: 0.8, animDelay: '0.4s' },
    { id: 3, type: 'horns', top: 12, left: 88, speed: 0.4, lag: 0.1, scale: 0.85, opacity: 0.65, animDelay: '0.8s' },
    { id: 4, type: 'equalizer', top: 15, left: 78, speed: 1.1, lag: 0.3, opacity: 0.85, animDelay: '0.2s' },
    { id: 5, type: 'claw', top: 18, left: 5, speed: 2.1, lag: 0.6, scale: 1.1, opacity: 0.7, animDelay: '1.2s' },
    { id: 6, type: 'droplet', top: 21, left: 92, speed: 1.6, lag: 0.4, height: 60, opacity: 0.6, animDelay: '0.5s' },
    { id: 7, type: 'reticle', top: 23, left: 16, speed: 0.5, lag: 0.15, scale: 0.75, opacity: 0.5, animDelay: '1.5s' },

    // Work Experience Section Range
    { id: 8, type: 'lightstick', top: 28, left: 91, speed: 1.9, lag: 0.55, scale: 1.1, opacity: 0.9, animDelay: '0.6s' },
    { id: 9, type: 'droplet', top: 31, left: 6, speed: 1.4, lag: 0.35, height: 80, opacity: 0.75, animDelay: '0.9s' },
    { id: 10, type: 'equalizer', top: 34, left: 82, speed: 0.9, lag: 0.25, opacity: 0.8, animDelay: '0.3s' },
    { id: 11, type: 'horns', top: 37, left: 12, speed: 2.2, lag: 0.7, scale: 1.05, opacity: 0.7, animDelay: '1.1s' },
    { id: 12, type: 'droplet', top: 40, left: 86, speed: 1.7, lag: 0.45, height: 70, opacity: 0.65, animDelay: '0.1s' },
    { id: 13, type: 'reticle', top: 43, left: 7, speed: 0.45, lag: 0.1, scale: 0.8, opacity: 0.45, animDelay: '1.8s' },
    { id: 14, type: 'claw', top: 46, left: 94, speed: 2.0, lag: 0.6, scale: 0.95, opacity: 0.6, animDelay: '0.7s' },

    // Transition & Skills Section Range
    { id: 15, type: 'lightstick', top: 51, left: 14, speed: 0.5, lag: 0.2, scale: 0.85, opacity: 0.75, animDelay: '0.5s' },
    { id: 16, type: 'equalizer', top: 54, left: 89, speed: 1.3, lag: 0.4, opacity: 0.85, animDelay: '1.0s' },
    { id: 17, type: 'droplet', top: 57, left: 4, speed: 2.3, lag: 0.65, height: 85, opacity: 0.8, animDelay: '0.2s' },
    { id: 18, type: 'horns', top: 60, left: 80, speed: 0.85, lag: 0.3, scale: 0.9, opacity: 0.65, animDelay: '1.4s' },
    { id: 19, type: 'reticle', top: 63, left: 18, speed: 1.7, lag: 0.5, scale: 0.9, opacity: 0.5, animDelay: '0.8s' },
    { id: 20, type: 'claw', top: 66, left: 92, speed: 0.4, lag: 0.1, scale: 1.0, opacity: 0.55, animDelay: '1.6s' },
    { id: 21, type: 'droplet', top: 69, left: 9, speed: 1.5, lag: 0.35, height: 65, opacity: 0.7, animDelay: '0.3s' },

    // Education Section Range
    { id: 22, type: 'lightstick', top: 73, left: 87, speed: 2.1, lag: 0.6, scale: 1.15, opacity: 0.85, animDelay: '0.9s' },
    { id: 23, type: 'equalizer', top: 76, left: 6, speed: 0.95, lag: 0.25, opacity: 0.8, animDelay: '0.4s' },
    { id: 24, type: 'droplet', top: 79, left: 93, speed: 1.8, lag: 0.45, height: 75, opacity: 0.75, animDelay: '1.2s' },
    { id: 25, type: 'horns', top: 82, left: 11, speed: 0.5, lag: 0.15, scale: 0.85, opacity: 0.6, animDelay: '0.7s' },
    { id: 26, type: 'claw', top: 84, left: 84, speed: 2.2, lag: 0.65, scale: 1.1, opacity: 0.65, animDelay: '1.5s' },
    { id: 27, type: 'reticle', top: 87, left: 8, speed: 1.2, lag: 0.3, scale: 0.8, opacity: 0.45, animDelay: '0.6s' },

    // Contact Section & Footer Range
    { id: 28, type: 'lightstick', top: 90, left: 15, speed: 0.45, lag: 0.15, scale: 0.95, opacity: 0.8, animDelay: '1.1s' },
    { id: 29, type: 'equalizer', top: 92, left: 81, speed: 1.4, lag: 0.4, opacity: 0.85, animDelay: '0.3s' },
    { id: 30, type: 'droplet', top: 94, left: 5, speed: 2.4, lag: 0.7, height: 90, opacity: 0.85, animDelay: '0.8s' },
    { id: 31, type: 'horns', top: 96, left: 90, speed: 0.7, lag: 0.2, scale: 0.95, opacity: 0.7, animDelay: '0.5s' },
    { id: 32, type: 'claw', top: 98, left: 18, speed: 1.9, lag: 0.55, scale: 1.0, opacity: 0.6, animDelay: '1.3s' },
  ], []);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <style>{`
        @keyframes baemonRainFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(2deg);
          }
        }
        .animate-baemon-idle {
          animation: baemonRainFloat 6s ease-in-out infinite;
        }
      `}</style>

      {/* 
        Atmospheric Stage Light Mesh:
        Lifts Dark Mode from flat pitch-black into an alluring deep crimson theater glow,
        and adds subtle luxury warmth to Light Mode.
      */}
      <div className="absolute top-[18%] left-[5%] w-[45rem] h-[45rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(225,29,46,0.035)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(225,29,46,0.11)_0%,rgba(136,8,21,0.05)_45%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-[52%] right-[5%] w-[50rem] h-[50rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,59,77,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(225,29,46,0.09)_0%,rgba(255,42,60,0.04)_50%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-[82%] left-[10%] w-[42rem] h-[42rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(225,29,46,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(225,29,46,0.10)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      {/* Parallax Rain Elements with GSAP data-speed and data-lag */}
      {rainItems.map((item) => (
        <div
          key={item.id}
          data-speed={item.speed}
          data-lag={item.lag}
          className="absolute will-change-transform transform-gpu pointer-events-none"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            opacity: item.opacity,
            transform: `scale(${item.scale || 1})`,
          }}
        >
          <div
            className="animate-baemon-idle"
            style={{ animationDelay: item.animDelay }}
          >
            {item.type === 'lightstick' && <BaemonLightstick size={item.scale ? item.scale * 32 : 32} />}
            {item.type === 'horns' && <MonsterHorns size={item.scale ? item.scale * 32 : 32} />}
            {item.type === 'claw' && <ClawSlash size={item.scale ? item.scale * 28 : 28} />}
            {item.type === 'equalizer' && <CyberEqualizer />}
            {item.type === 'reticle' && <TechReticle size={item.scale ? item.scale * 34 : 34} />}
            {item.type === 'droplet' && <LiquidDroplet height={item.height || 65} />}
          </div>
        </div>
      ))}
    </div>
  );
}
