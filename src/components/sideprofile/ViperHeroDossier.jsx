import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  Crosshair,
  Zap,
  Activity,
  Radio,
  MapPin,
  Waves,
} from 'lucide-react';

/**
 * Ultra-lightweight GPU-accelerated motion variants
 * 100% Zero-lag across 60Hz-144Hz+ displays.
 */
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const textStaggerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 + i * 0.06 },
  }),
  exit: { opacity: 0, y: 10, transition: { duration: 0.15 } },
};

/**
 * Parametric Fluid Soundwave Ribbon (Option 2)
 * High-end 3D parametric undulating soundwave ribbon & digital silk fluid mesh.
 * Combines acoustic frequency oscillation (Spotify/Music) with fluid toxic chemical vapor aesthetics.
 * Undulates and ripples smoothly in 3D space with zero clipping across PC & HP.
 */
function ParametricSoundwaveRibbon({ isToxinActive = false }) {
  return (
    <div className="relative w-72 h-64 sm:w-96 sm:h-80 lg:w-[440px] lg:h-[420px] xl:w-[500px] xl:h-[460px] flex items-center justify-center select-none pointer-events-none">

      {/* Intense Ambient Radial Bloom behind the ribbons */}
      <div
        className={`absolute inset-0 bg-radial from-[#00f59b]/30 via-[#047857]/15 to-transparent blur-3xl pointer-events-none transform-gpu transition-opacity duration-700 ${isToxinActive ? 'opacity-100 scale-110' : 'opacity-70 scale-100'
          }`}
      />

      <svg
        viewBox="0 0 540 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_35px_rgba(0,245,155,0.4)]"
      >
        <defs>
          {/* Ribbon 3D Surface Gradients */}
          <linearGradient id="ribbonGradPrimary" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00f59b" stopOpacity={isToxinActive ? 0.9 : 0.75} />
            <stop offset="40%" stopColor="#10b981" stopOpacity={isToxinActive ? 0.6 : 0.45} />
            <stop offset="75%" stopColor="#047857" stopOpacity={isToxinActive ? 0.35 : 0.2} />
            <stop offset="100%" stopColor="#020805" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="ribbonGradSecondary" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity={isToxinActive ? 0.85 : 0.65} />
            <stop offset="50%" stopColor="#059669" stopOpacity={isToxinActive ? 0.5 : 0.35} />
            <stop offset="100%" stopColor="#02140b" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="ribbonGradUnder" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#047857" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#022c22" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#010a05" stopOpacity="0" />
          </linearGradient>

          {/* Wireframe Contour Stroke Gradient */}
          <linearGradient id="strandGlowGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00f59b" stopOpacity="0.3" />
            <stop offset="35%" stopColor="#00f59b" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#34d399" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.25" />
          </linearGradient>

          {/* Node Glow Flare */}
          <radialGradient id="nodeGlowFlare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#00f59b" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#00f59b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ============================================================== */}
        {/* 1. ACOUSTIC TELEMETRY HUD ACCENTS                              */}
        {/* ============================================================== */}
        <g opacity="0.45">
          <circle cx="270" cy="240" r="225" stroke="#00f59b" strokeWidth="0.8" strokeDasharray="4 8" />
          <circle cx="270" cy="240" r="195" stroke="#047857" strokeWidth="0.6" strokeDasharray="16 12" />

          {/* Telemetry Coordinate Readouts */}
          <text x="270" y="32" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="2">
            PARAMETRIC ACOUSTIC FLUID // 48.0 kHz
          </text>
          <text x="270" y="460" fill="#00f59b" fontSize="7.5" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">
            {isToxinActive ? 'WAVE OSCILLATION : RESONANT SURGE' : 'HARMONIC FREQUENCY : STABLE'}
          </text>
        </g>

        {/* ============================================================== */}
        {/* 2. LAYERED TRANSLUCENT 3D RIBBON BODIES (Undulating Silk Waves) */}
        {/* ============================================================== */}

        {/* Ribbon Layer 1: Deep Translucent Base Underside */}
        <path
          d="M 50,290 C 140,170 220,150 310,250 C 400,350 450,320 490,200 L 490,240 C 450,360 400,390 310,290 C 220,190 140,210 50,330 Z"
          fill="url(#ribbonGradUnder)"
        >
          <animate
            attributeName="d"
            values="
              M 50,290 C 140,170 220,150 310,250 C 400,350 450,320 490,200 L 490,240 C 450,360 400,390 310,290 C 220,190 140,210 50,330 Z;
              M 50,310 C 150,210 210,130 300,220 C 390,320 460,340 490,230 L 490,270 C 460,380 390,360 300,260 C 210,170 150,250 50,350 Z;
              M 50,290 C 140,170 220,150 310,250 C 400,350 450,320 490,200 L 490,240 C 450,360 400,390 310,290 C 220,190 140,210 50,330 Z
            "
            dur="8s"
            repeatCount="indefinite"
          />
        </path>

        {/* Ribbon Layer 2: Secondary Intertwining Counter-Wave */}
        <path
          d="M 55,200 C 145,310 235,340 325,240 C 415,140 455,180 485,290 L 485,250 C 455,150 415,110 325,200 C 235,300 145,270 55,160 Z"
          fill="url(#ribbonGradSecondary)"
        >
          <animate
            attributeName="d"
            values="
              M 55,200 C 145,310 235,340 325,240 C 415,140 455,180 485,290 L 485,250 C 455,150 415,110 325,200 C 235,300 145,270 55,160 Z;
              M 55,170 C 135,270 245,360 335,270 C 425,170 445,150 485,260 L 485,220 C 445,120 425,140 335,230 C 245,320 135,230 55,130 Z;
              M 55,200 C 145,310 235,340 325,240 C 415,140 455,180 485,290 L 485,250 C 455,150 415,110 325,200 C 235,300 145,270 55,160 Z
            "
            dur="7s"
            repeatCount="indefinite"
          />
        </path>

        {/* Ribbon Layer 3: Primary Glowing Silk Mesh Surface */}
        <path
          d="M 45,250 C 135,130 225,110 315,210 C 405,310 445,280 485,160 L 485,195 C 445,315 405,345 315,245 C 225,145 135,165 45,285 Z"
          fill="url(#ribbonGradPrimary)"
        >
          <animate
            attributeName="d"
            values="
              M 45,250 C 135,130 225,110 315,210 C 405,310 445,280 485,160 L 485,195 C 445,315 405,345 315,245 C 225,145 135,165 45,285 Z;
              M 45,270 C 145,170 215,90 305,180 C 395,280 455,300 485,190 L 485,225 C 455,335 395,315 305,215 C 215,125 145,205 45,305 Z;
              M 45,250 C 135,130 225,110 315,210 C 405,310 445,280 485,160 L 485,195 C 445,315 405,345 315,245 C 225,145 135,165 45,285 Z
            "
            dur="6s"
            repeatCount="indefinite"
          />
        </path>

        {/* ============================================================== */}
        {/* 3. PARAMETRIC WIREFRAME STRANDS (Harmonic Silk Curves)         */}
        {/* ============================================================== */}
        {/* Strand 1: Main Crest Line */}
        <path
          d="M 45,250 C 135,130 225,110 315,210 C 405,310 445,280 485,160"
          stroke="url(#strandGlowGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <animate
            attributeName="d"
            values="
              M 45,250 C 135,130 225,110 315,210 C 405,310 445,280 485,160;
              M 45,270 C 145,170 215,90 305,180 C 395,280 455,300 485,190;
              M 45,250 C 135,130 225,110 315,210 C 405,310 445,280 485,160
            "
            dur="6s"
            repeatCount="indefinite"
          />
        </path>

        {/* Strand 2: Inner Contour Parallel Offset */}
        <path
          d="M 45,260 C 135,140 225,120 315,220 C 405,320 445,290 485,170"
          stroke="#00f59b"
          strokeWidth="1.8"
          strokeDasharray="14 6"
          opacity="0.85"
        >
          <animate
            attributeName="d"
            values="
              M 45,260 C 135,140 225,120 315,220 C 405,320 445,290 485,170;
              M 45,280 C 145,180 215,100 305,190 C 395,290 455,310 485,200;
              M 45,260 C 135,140 225,120 315,220 C 405,320 445,290 485,170
            "
            dur="6s"
            repeatCount="indefinite"
          />
        </path>

        {/* Strand 3: Counter-Wave Crest Line */}
        <path
          d="M 55,200 C 145,310 235,340 325,240 C 415,140 455,180 485,290"
          stroke="#34d399"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.9"
        >
          <animate
            attributeName="d"
            values="
              M 55,200 C 145,310 235,340 325,240 C 415,140 455,180 485,290;
              M 55,170 C 135,270 245,360 335,270 C 425,170 445,150 485,260;
              M 55,200 C 145,310 235,340 325,240 C 415,140 455,180 485,290
            "
            dur="7s"
            repeatCount="indefinite"
          />
        </path>

        {/* Strand 4: Counter-Wave Dash Accent */}
        <path
          d="M 55,215 C 145,325 235,355 325,255 C 415,155 455,195 485,305"
          stroke="#00f59b"
          strokeWidth="1.5"
          strokeDasharray="8 8"
          opacity="0.7"
        >
          <animate
            attributeName="d"
            values="
              M 55,215 C 145,325 235,355 325,255 C 415,155 455,195 485,305;
              M 55,185 C 135,285 245,375 335,285 C 425,185 445,165 485,275;
              M 55,215 C 145,325 235,355 325,255 C 415,155 455,195 485,305
            "
            dur="7s"
            repeatCount="indefinite"
          />
        </path>

        {/* Strand 5 & 6: Ambient Background Filament Ribbons */}
        <path
          d="M 60,230 C 150,150 240,170 320,270 C 400,370 440,300 480,220"
          stroke="#047857"
          strokeWidth="1"
          opacity="0.5"
        />
        <path
          d="M 70,270 C 160,350 250,330 330,230 C 410,130 450,200 475,260"
          stroke="#047857"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* ============================================================== */}
        {/* 4. HARMONIC FREQUENCY NODES (Glowing Crest Points)             */}
        {/* ============================================================== */}
        {/* Node 1 (Peak 1) */}
        <g>
          <circle cx="185" cy="120" r="5" fill="url(#nodeGlowFlare)">
            <animate attributeName="r" values="3.5;6;3.5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="185" cy="120" r="2" fill="#ffffff" />
        </g>

        {/* Node 2 (Intersection Knot) */}
        <g>
          <circle cx="270" cy="225" r="5.5" fill="url(#nodeGlowFlare)">
            <animate attributeName="r" values="4;7;4" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="270" cy="225" r="2.5" fill="#ffffff" />
        </g>

        {/* Node 3 (Peak 2) */}
        <g>
          <circle cx="360" cy="305" r="5" fill="url(#nodeGlowFlare)">
            <animate attributeName="r" values="3.5;6;3.5" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="360" cy="305" r="2" fill="#ffffff" />
        </g>

        {/* Node 4 (Counter-Peak) */}
        <g>
          <circle cx="375" cy="155" r="4.5" fill="url(#nodeGlowFlare)">
            <animate attributeName="r" values="3;5.5;3" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="375" cy="155" r="1.8" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

export default function ViperHeroDossier({
  profile = {},
  fuel = 100,
  isToxinActive = false,
  onToggleToxin,
  isReady = true,
  isExiting = false,
}) {
  const handleScrollToContent = () => {
    const target =
      document.getElementById('sideprofile-content') ||
      document.querySelector('main > section:nth-of-type(1)');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollBy({ top: 720, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      variants={heroVariants}
      initial="hidden"
      whileInView={isExiting ? 'exit' : isReady ? 'visible' : 'hidden'}
      viewport={{ once: false, amount: 0.1 }}
      className={`relative w-full min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden transition-colors duration-500 select-none ${isToxinActive ? 'bg-[#040e08]' : 'bg-[#030805]'
        }`}
    >
      {/* ===================================================================== */}
      {/* 1. SEAMLESS UNIFIED BACKGROUND (DIAGONAL TOXIC SMOKE WAVE)             */}
      {/* ===================================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">

        {/* Continuous Ambient Glow Blooms */}
        <div className="absolute top-1/4 -left-20 w-[450px] sm:w-[550px] h-[450px] sm:h-[550px] bg-radial from-[#059669]/20 via-transparent to-transparent blur-3xl opacity-60 pointer-events-none transform-gpu" />
        <div
          className={`absolute top-1/3 right-1/4 w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] bg-radial from-[#00f59b]/25 via-[#047857]/15 to-transparent blur-3xl pointer-events-none transform-gpu transition-opacity duration-700 ${isToxinActive ? 'opacity-100' : 'opacity-70'
            }`}
        />
        <div className="absolute bottom-0 right-10 w-[450px] sm:w-[600px] h-[350px] sm:h-[450px] bg-radial from-[#00f59b]/20 via-transparent to-transparent blur-3xl pointer-events-none transform-gpu" />
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#020503] via-[#020503]/80 to-transparent z-10 pointer-events-none" />

        {/* Master Scalable Vector Canvas: Continuous Diagonal Smoke Flow */}
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="smokeCloudDense" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#00f59b" stopOpacity={isToxinActive ? 0.8 : 0.6} />
              <stop offset="45%" stopColor="#10b981" stopOpacity={isToxinActive ? 0.5 : 0.35} />
              <stop offset="80%" stopColor="#047857" stopOpacity={isToxinActive ? 0.25 : 0.12} />
              <stop offset="100%" stopColor="#020805" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="smokeCloudDeep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#34d399" stopOpacity={isToxinActive ? 0.75 : 0.5} />
              <stop offset="50%" stopColor="#059669" stopOpacity={isToxinActive ? 0.4 : 0.25} />
              <stop offset="85%" stopColor="#022c22" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="smokeWaveCurtain" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00f59b" stopOpacity={isToxinActive ? 0.75 : 0.55} />
              <stop offset="40%" stopColor="#059669" stopOpacity={isToxinActive ? 0.55 : 0.35} />
              <stop offset="80%" stopColor="#022c22" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#020503" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Top-Left Framing Smoke Plume */}
          <path
            d="M 0,90 C 140,50 260,130 420,95 C 540,70 640,120 780,60 L 780,0 L 0,0 Z"
            fill="url(#smokeWaveCurtain)"
            opacity={isToxinActive ? 0.65 : 0.4}
          />
          <path
            d="M 0,90 C 140,50 260,130 420,95 C 540,70 640,120 780,60"
            stroke="#00f59b"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Diagonal Volumetric Clouds */}
          <ellipse cx="1180" cy="180" rx="220" ry="140" fill="url(#smokeCloudDense)" />
          <ellipse cx="960" cy="360" rx="260" ry="170" fill="url(#smokeCloudDeep)" />
          <ellipse cx="740" cy="540" rx="290" ry="190" fill="url(#smokeCloudDense)" />
          <ellipse cx="480" cy="720" rx="320" ry="210" fill="url(#smokeCloudDeep)" />
          <ellipse cx="240" cy="860" rx="360" ry="240" fill="url(#smokeCloudDense)" />

          {/* Deep Diagonal Smoke Curtain Fill */}
          <path
            d="M 1220,0 C 1060,180 900,280 760,450 C 620,620 480,750 220,900 L 1600,900 L 1600,0 Z"
            fill="url(#smokeWaveCurtain)"
            opacity={isToxinActive ? 0.75 : 0.55}
          />

          {/* Vivid Glowing Diagonal Smoke Ridge */}
          <path
            d="M 1220,0 C 1060,180 900,280 760,450 C 620,620 480,750 220,900"
            stroke="#00f59b"
            strokeWidth={isToxinActive ? 5 : 3.5}
            strokeLinecap="round"
            opacity={isToxinActive ? 1 : 0.85}
          />

          {/* Secondary Parallel Dashed Vapor Trace */}
          <path
            d="M 1255,0 C 1095,180 935,280 795,450 C 655,620 515,750 255,900"
            stroke="#34d399"
            strokeWidth="1.8"
            strokeDasharray="8 6"
            opacity="0.55"
          />

          {/* Swirling Smoke Tendrils */}
          <path
            d="M 880,310 Q 950,250 910,180 Q 860,120 920,50"
            stroke="#00f59b"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.75"
          >
            <animate
              attributeName="d"
              values="M 880,310 Q 950,250 910,180 Q 860,120 920,50; M 880,310 Q 920,270 950,190 Q 900,110 940,50; M 880,310 Q 950,250 910,180 Q 860,120 920,50"
              dur="6.5s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M 640,580 Q 560,630 600,700 Q 640,760 580,820"
            stroke="#00f59b"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          >
            <animate
              attributeName="d"
              values="M 640,580 Q 560,630 600,700 Q 640,760 580,820; M 640,580 Q 590,610 570,680 Q 610,770 560,820; M 640,580 Q 560,630 600,700 Q 640,760 580,820"
              dur="7s"
              repeatCount="indefinite"
            />
          </path>

          {/* Floating Toxic Bubbles & Radianite Embers */}
          {[
            { cx: 1140, cy: 160, r: 4, dur: '3.6s', delay: '0s' },
            { cx: 1010, cy: 280, r: 5.5, dur: '4.2s', delay: '0.5s' },
            { cx: 880, cy: 390, r: 3.5, dur: '3.2s', delay: '1s' },
            { cx: 760, cy: 510, r: 6, dur: '4.8s', delay: '0.2s' },
            { cx: 620, cy: 630, r: 4.5, dur: '3.8s', delay: '1.2s' },
            { cx: 480, cy: 750, r: 5, dur: '4.5s', delay: '0.7s' },
            { cx: 340, cy: 850, r: 3.5, dur: '3.4s', delay: '1.5s' },
            { cx: 1250, cy: 500, r: 4.5, dur: '5.0s', delay: '0.3s' },
            { cx: 1380, cy: 640, r: 5, dur: '4.2s', delay: '0.8s' },
            { cx: 940, cy: 720, r: 6.5, dur: '4.6s', delay: '0.4s' },
            { cx: 1100, cy: 820, r: 4, dur: '3.9s', delay: '1.1s' },
          ].map((bubble, i) => (
            <g key={i}>
              <circle cx={bubble.cx} cy={bubble.cy} r={bubble.r} fill="#00f59b" opacity="0.75">
                <animate attributeName="opacity" values="0.2;0.85;0.2" dur={bubble.dur} begin={bubble.delay} repeatCount="indefinite" />
                <animate attributeName="cy" values={`${bubble.cy};${bubble.cy - 45};${bubble.cy}`} dur={bubble.dur} begin={bubble.delay} repeatCount="indefinite" />
                <animate attributeName="r" values={`${bubble.r * 0.75};${bubble.r * 1.25};${bubble.r * 0.75}`} dur={bubble.dur} begin={bubble.delay} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </svg>
      </div>

      {/* ===================================================================== */}
      {/* 2. FOREGROUND CONTENT: RESPONSIVE SPLIT ON PC, STACKED ON HP          */}
      {/* ===================================================================== */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-14 lg:pb-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">

        {/* Left Column: Personal Intel & Interactive Controls */}
        <div className="w-full lg:max-w-xl xl:max-w-2xl space-y-5 sm:space-y-7">

          {/* Top Location Bar */}
          <motion.div
            custom={0}
            variants={textStaggerVariants}
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 font-medium"
          >
            <MapPin className="w-3.5 h-3.5 text-[#00f59b] shrink-0" />
            <span>JAKARTA, INDONESIA</span>
          </motion.div>

          {/* Headline Stage */}
          <div className="space-y-2 sm:space-y-3">
            <motion.p
              custom={1}
              variants={textStaggerVariants}
              className="font-mono text-[11px] sm:text-sm font-bold tracking-widest uppercase text-[#34d399] drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]"
            >
              WELCOME TO MY SIDE PROFILE
            </motion.p>

            <motion.h1
              custom={2}
              variants={textStaggerVariants}
              className="font-display font-black text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-[0.98] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] break-words"
            >
              {profile.name || 'JUAN STERLING'}
            </motion.h1>
          </div>

          {/* Bio Mantra */}
          <motion.p
            custom={3}
            variants={textStaggerVariants}
            className="text-xs sm:text-base lg:text-lg font-mono text-zinc-300 leading-relaxed font-medium max-w-xl"
          >
            {profile.bio || 'Coding is part of the story, not the whole story.'}{' '}
            An off-duty dossier covering competitive tactical FPS, physical bio-metrics, and audio soundstage curation.
          </motion.p>

          {/* 3 Core Pillars: Responsive Grid on HP, Row on PC */}
          <motion.div
            custom={4}
            variants={textStaggerVariants}
            className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3.5 pt-1"
          >
            <div className="inline-flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-black/45 hover:bg-black/60 backdrop-blur-md border border-[#059669]/40 hover:border-[#00f59b] transition-all duration-300 text-[10px] sm:text-xs font-mono shadow-xs group cursor-default">
              <Crosshair className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00f59b] shrink-0" />
              <span className="font-bold text-white tracking-wide truncate">GAMING</span>
            </div>

            <div className="inline-flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-black/45 hover:bg-black/60 backdrop-blur-md border border-[#059669]/40 hover:border-[#00f59b] transition-all duration-300 text-[10px] sm:text-xs font-mono shadow-xs group cursor-default">
              <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00f59b] shrink-0" />
              <span className="font-bold text-white tracking-wide truncate">ATHLETICS</span>
            </div>

            <div className="inline-flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-black/45 hover:bg-black/60 backdrop-blur-md border border-[#059669]/40 hover:border-[#00f59b] transition-all duration-300 text-[10px] sm:text-xs font-mono shadow-xs group cursor-default">
              <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00f59b] shrink-0" />
              <span className="font-bold text-white tracking-wide truncate">AUDIO</span>
            </div>
          </motion.div>

          {/* Action Row: Full-width stacked on HP, Side-by-side on PC */}
          <motion.div
            custom={5}
            variants={textStaggerVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 pt-2"
          >
            {/* Main Glowing EXPLORE Action Button */}
            <button
              type="button"
              onClick={handleScrollToContent}
              className="group inline-flex items-center justify-center gap-3 px-6 sm:px-9 py-3 sm:py-4 rounded-xl font-mono text-xs sm:text-sm font-black uppercase tracking-widest text-black bg-[#00f59b] hover:bg-[#34d399] transition-all duration-300 shadow-[0_0_35px_rgba(0,245,155,0.7)] hover:shadow-[0_0_55px_rgba(0,245,155,0.95)] hover:scale-105 active:scale-95 cursor-pointer select-none"
            >
              <span>EXPLORE</span>
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            </button>

            {/* Tactical Toxin Screen Deploy Trigger */}
            <button
              type="button"
              onClick={onToggleToxin}
              disabled={!isToxinActive && fuel < 15}
              className={`group inline-flex items-center justify-center gap-2.5 px-5 py-3 sm:py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer select-none border backdrop-blur-md ${isToxinActive
                  ? 'bg-red-600/90 hover:bg-red-700 text-white border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.5)] animate-pulse'
                  : fuel < 15
                    ? 'bg-zinc-800/80 text-zinc-500 border-zinc-700 cursor-not-allowed'
                    : 'bg-black/50 hover:bg-black/75 text-zinc-200 hover:text-white border-[#059669]/50 hover:border-[#00f59b] shadow-[0_0_20px_rgba(0,245,155,0.2)]'
                }`}
            >
              <Zap className="w-4 h-4 text-[#00f59b] transition-transform group-hover:scale-110 shrink-0" />
              <span>
                {isToxinActive ? 'VENT TOXIN' : `TOXIN SCREEN (${Math.round(fuel)}%)`}
              </span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Parametric Fluid Soundwave Ribbon (Opsi 2: Perfectly fitted for both PC & HP) */}
        <motion.div
          custom={6}
          variants={textStaggerVariants}
          className="w-full lg:w-auto flex items-center justify-center select-none pointer-events-none py-2 lg:py-0"
        >
          <ParametricSoundwaveRibbon isToxinActive={isToxinActive} />
        </motion.div>
      </div>
    </motion.section>
  );
}
