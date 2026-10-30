import React from 'react';
import { motion } from 'motion/react';
import {
  Crosshair,
  Activity,
  Radio,
  Zap,
  Target,
  RotateCcw,
} from 'lucide-react';

/**
 * Tactical GPU-accelerated entrance and exit animation variants
 * Automatically triggers entrance on approach, exits on scroll-past, and re-entrances on return.
 * Synchronized with ToxicScreenTransition on initial page load / refresh.
 */
const dossierContainerVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97,
    transition: {
      duration: 0.35,
      ease: [0.32, 0, 0.67, 0],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
};

const cornerBracketTopVariants = {
  hidden: { scale: 0, opacity: 0, x: 8, y: -8, transition: { duration: 0.2 } },
  visible: {
    scale: 1,
    opacity: 0.9,
    x: 0,
    y: 0,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.08 },
  },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
};

const cornerBracketBottomVariants = {
  hidden: { scale: 0, opacity: 0, x: -8, y: 8, transition: { duration: 0.2 } },
  visible: {
    scale: 1,
    opacity: 0.9,
    x: 0,
    y: 0,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.08 },
  },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
};

const headerStripVariants = {
  hidden: { opacity: 0, y: -16, transition: { duration: 0.25 } },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

const nameVariants = {
  hidden: { opacity: 0, y: 28, transition: { duration: 0.25 } },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
  },
  exit: { opacity: 0, y: 15, transition: { duration: 0.2 } },
};

const subtitleVariants = {
  hidden: { opacity: 0, x: -22, transition: { duration: 0.25 } },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
  exit: { opacity: 0, x: -15, transition: { duration: 0.2 } },
};

const bioVariants = {
  hidden: { opacity: 0, y: 16, transition: { duration: 0.25 } },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

const pillarItemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.94, transition: { duration: 0.25 } },
  visible: (customIndex = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.3, 0.64, 1],
      delay: 0.28 + customIndex * 0.07,
    },
  }),
  exit: { opacity: 0, y: 15, scale: 0.96, transition: { duration: 0.2 } },
};

const consoleVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.97, transition: { duration: 0.25 } },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.42 },
  },
  exit: { opacity: 0, y: 15, scale: 0.98, transition: { duration: 0.2 } },
};

const keyArtCardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.88,
    x: 35,
    y: 15,
    rotate: 2,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.18,
    },
  },
  exit: { opacity: 0, scale: 0.92, y: 15, transition: { duration: 0.2 } },
};

const viperImageVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 25, transition: { duration: 0.3 } },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.3,
    },
  },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.2 } },
};

/**
 * ViperHeroDossier
 * Tactical personal dossier showcase framed in VALORANT Viper aesthetic.
 * Focuses directly on Juan Sterling's personal side profile, passions, and off-duty pursuits.
 * 
 * Design Standards:
 * - 100% English copywriting.
 * - Strictly zero double slashes ('//') and zero emoticons.
 * - Non-white clinical laboratory aesthetic in Light Mode and deep bunker in Dark Mode.
 * - Fully responsive: Mobile, Tablet, and Desktop.
 * - GPU-accelerated (transform and opacity only), ensuring locked 60 FPS.
 * - Multi-directional scroll entrance and exit: enters when viewed, exits when passed, re-enters on return.
 */
export default function ViperHeroDossier({
  profile = {},
  fuel = 100,
  isToxinActive = false,
  onToggleToxin,
  isReady = true,
  isExiting = false,
  isRangeActive = false,
  onToggleRange,
  rangeScore = 0,
  onResetRangeScore,
  isDesktop = false,
}) {
  return (
    <motion.div
      variants={dossierContainerVariants}
      initial="hidden"
      whileInView={isExiting ? 'exit' : (isReady ? 'visible' : 'hidden')}
      viewport={{ once: false, amount: 0.15 }}
      className={`relative rounded-lg p-5 sm:p-8 backdrop-blur-md overflow-hidden transition-all duration-500 transform-gpu ${isToxinActive
        ? 'bg-[#d8eedf]/95 dark:bg-[#0c120e]/95 ring-2 ring-[#047857] dark:ring-[#00f59b] shadow-[0_0_40px_rgba(4,120,87,0.3)] dark:shadow-[0_0_40px_rgba(0,245,155,0.35)] border border-[#047857] dark:border-[#00f59b]'
        : 'bg-[#e7f4eb]/95 dark:bg-[#0c120e]/95 border border-[#059669]/40 dark:border-[#00f59b]/35 shadow-[0_4px_30px_rgba(5,150,105,0.15)] dark:shadow-[0_0_35px_rgba(0,245,155,0.12)]'
        }`}
    >
      {/* Angular tactical corner cut brackets */}
      <motion.div
        variants={cornerBracketTopVariants}
        className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#047857] dark:border-[#00f59b] opacity-90 pointer-events-none rounded-tr-lg m-0 z-10"
      />
      <motion.div
        variants={cornerBracketBottomVariants}
        className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#047857] dark:border-[#00f59b] opacity-90 pointer-events-none rounded-bl-lg m-0 z-10"
      />

      {/* Top Classification Header Strip */}
      <motion.div
        variants={headerStripVariants}
        className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[#059669]/25 dark:border-[#00f59b]/20 text-xs font-mono"
      >
        <div className="flex items-center gap-4 text-zinc-600 dark:text-gray-400 text-[11px]">
          <span className="hidden sm:inline font-medium">
            LOCATION : JAKARTA, INDONESIA
          </span>
        </div>
      </motion.div>

      {/* Main Grid: Left Personal Intel | Right Thematic Valorant Key Art */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Personal Dossier & 3 Core Pillars */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <motion.h1
              variants={nameVariants}
              className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#064e3b] dark:text-white tracking-tight uppercase leading-tight"
            >
              JUAN STERLING
            </motion.h1>
            <motion.p
              variants={subtitleVariants}
              className="font-mono text-sm sm:text-base font-bold text-[#047857] dark:text-[#00f59b] mt-1 tracking-wide"
            >
              PERSONAL SIDE PROFILE
            </motion.p>

            <motion.p
              variants={bioVariants}
              className="mt-4 text-sm sm:text-base font-mono text-[#143d2c] dark:text-gray-300 leading-relaxed font-medium"
            >
              {profile.bio || 'Coding is part of the story, not the whole story.'}
            </motion.p>
          </div>

          {/* Personal Pillar Badges (Gaming, Athletics, Audio) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <motion.div
              custom={0}
              variants={pillarItemVariants}
              className="p-3 rounded-xs bg-[#d9ece1] dark:bg-[#131c17] border border-[#059669]/30 dark:border-[#00f59b]/25 shadow-2xs hover:border-[#047857] dark:hover:border-[#00f59b] transition-colors"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#065f46] dark:text-gray-400 font-semibold">
                <Crosshair className="w-3.5 h-3.5 text-[#047857] dark:text-[#00f59b]" />
                <span>PILLAR 01 : GAMING</span>
              </div>
              <div className="font-display font-bold text-xs sm:text-sm text-[#064e3b] dark:text-white mt-1">
                FAV GAMES
              </div>
            </motion.div>

            <motion.div
              custom={1}
              variants={pillarItemVariants}
              className="p-3 rounded-xs bg-[#d9ece1] dark:bg-[#131c17] border border-[#059669]/30 dark:border-[#00f59b]/25 shadow-2xs hover:border-[#047857] dark:hover:border-[#00f59b] transition-colors"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#065f46] dark:text-gray-400 font-semibold">
                <Activity className="w-3.5 h-3.5 text-[#047857] dark:text-[#00f59b]" />
                <span>PILLAR 02 : ATHLETICS</span>
              </div>
              <div className="font-display font-bold text-xs sm:text-sm text-[#064e3b] dark:text-white mt-1">
                SPORT
              </div>
            </motion.div>

            <motion.div
              custom={2}
              variants={pillarItemVariants}
              className="p-3 rounded-xs bg-[#d9ece1] dark:bg-[#131c17] border border-[#059669]/30 dark:border-[#00f59b]/25 shadow-2xs hover:border-[#047857] dark:hover:border-[#00f59b] transition-colors"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#065f46] dark:text-gray-400 font-semibold">
                <Radio className="w-3.5 h-3.5 text-[#047857] dark:text-[#00f59b]" />
                <span>PILLAR 03 : AUDIO</span>
              </div>
              <div className="font-display font-bold text-xs sm:text-sm text-[#064e3b] dark:text-white mt-1">
                SPOTIFY PUBLIC PLAYLIST
              </div>
            </motion.div>
          </div>

          {/* Interactive Valorant Toxin Fuel Console */}
          <motion.div
            variants={consoleVariants}
            className="p-4 sm:p-5 rounded-xs bg-[#cbe7d5] dark:bg-[#121c16] border border-[#047857]/45 dark:border-[#00f59b]/35 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#064e3b] dark:text-[#00f59b]">
                    TOXIN CAPACITY
                  </span>
                  <span className="text-[#047857] dark:text-zinc-600 text-xs">•</span>
                  <span className="text-xs font-mono font-bold text-[#064e3b] dark:text-[#34d399]">
                    {Math.round(fuel)}% REMAINING
                  </span>
                </div>
                <div className="text-xs font-mono text-[#065f46] dark:text-gray-400 mt-0.5 font-medium">
                  {isToxinActive
                    ? 'Toxic Screen active: Discharging dense chemical vapor wall.'
                    : 'Ready to deploy interactive screen.'}
                </div>
              </div>

              {/* Dynamic Action Button */}
              <button
                type="button"
                onClick={onToggleToxin}
                disabled={!isToxinActive && fuel < 15}
                className={`group inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xs text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 select-none ${isToxinActive
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse'
                  : fuel < 15
                    ? 'bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-[#047857] hover:bg-[#065f46] dark:bg-[#00f59b] dark:hover:bg-[#34d399] text-white dark:text-black shadow-[0_4px_15px_rgba(4,120,87,0.35)] dark:shadow-[0_0_20px_rgba(0,245,155,0.35)]'
                  }`}
              >
                <Zap className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>
                  {isToxinActive
                    ? 'VENT TOXIN SCREEN'
                    : fuel < 15
                      ? 'RECHARGING FUEL...'
                      : 'DEPLOY TOXIC SCREEN'}
                </span>
              </button>
            </div>

            {/* Fuel Bar Progress */}
            <div className="w-full bg-[#afd8bd] dark:bg-[#1b2820] h-2.5 rounded-full overflow-hidden border border-[#047857]/40 dark:border-[#00f59b]/30">
              <div
                className={`h-full transition-all duration-300 rounded-full ${isToxinActive
                  ? 'bg-red-500 shadow-[0_0_10px_#ef4444]'
                  : 'bg-[#047857] dark:bg-[#00f59b] shadow-[0_0_10px_rgba(4,120,87,0.6)]'
                  }`}
                style={{ width: `${fuel}%` }}
              />
            </div>
          </motion.div>

          {/* Tactical Practice Range Console (Easter Egg • Desktop PC Exclusive) */}
          {isDesktop && (
            <motion.div
              variants={consoleVariants}
              className={`p-4 sm:p-5 rounded-xs border transition-all duration-300 shadow-xs ${
                isRangeActive
                  ? 'bg-[#c3e3ce] dark:bg-[#14231b] border-[#047857] dark:border-[#00f59b] shadow-[0_0_25px_rgba(4,120,87,0.25)] dark:shadow-[0_0_25px_rgba(0,245,155,0.2)]'
                  : 'bg-[#cbe7d5]/70 dark:bg-[#121c16]/70 border-[#047857]/30 dark:border-[#00f59b]/25 hover:border-[#047857]/50 dark:hover:border-[#00f59b]/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#064e3b] dark:text-[#00f59b] flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-[#047857] dark:text-[#00f59b]" />
                      RANGE PROTOCOL
                    </span>
                    <span className="text-[#047857] dark:text-zinc-600 text-xs">•</span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        isRangeActive
                          ? 'text-[#047857] dark:text-[#00f59b]'
                          : 'text-zinc-500 dark:text-gray-400'
                      }`}
                    >
                      {isRangeActive ? 'SIMULATION ACTIVE' : 'STANDBY'}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#065f46] dark:text-gray-400 mt-0.5 font-medium flex flex-wrap items-center gap-2">
                    <span>
                      {isRangeActive
                        ? 'Radianite training drones deployed. Aim and shoot to eliminate.'
                        : 'Deploy holographic training drones for target practice.'}
                    </span>
                    {rangeScore > 0 && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-[#047857]/15 dark:bg-[#00f59b]/15 text-[#047857] dark:text-[#00f59b] font-bold text-[10px]">
                        SCORE: {rangeScore}
                      </span>
                    )}
                  </div>
                </div>

                {/* Range Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {rangeScore > 0 && (
                    <button
                      type="button"
                      onClick={onResetRangeScore}
                      title="Reset practice score"
                      className="p-2.5 rounded-xs bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onToggleRange}
                    className={`group inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xs text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer select-none ${
                      isRangeActive
                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-[0_0_15px_rgba(217,119,6,0.4)]'
                        : 'bg-[#047857] hover:bg-[#065f46] dark:bg-[#00f59b] dark:hover:bg-[#34d399] text-white dark:text-black shadow-[0_4px_15px_rgba(4,120,87,0.3)] dark:shadow-[0_0_20px_rgba(0,245,155,0.3)]'
                    }`}
                  >
                    <Crosshair className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
                    <span>{isRangeActive ? 'CEASE FIRE (OFF)' : 'START PRACTICE (ON)'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: Tactical Valorant Theme Key Art Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            variants={keyArtCardVariants}
            className="relative w-full max-w-sm rounded-lg overflow-hidden border border-[#047857]/45 dark:border-[#00f59b]/40 bg-gradient-to-b from-[#bce3cb] to-[#cee8d7] dark:from-[#131c17] dark:to-[#090d0b] shadow-[0_4px_25px_rgba(4,120,87,0.18)] dark:shadow-[0_0_35px_rgba(0,245,155,0.15)] group"
          >
            {/* Top Badge Overlay */}
            <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between text-[10px] font-mono text-white dark:text-gray-300 bg-[#064e3b] dark:bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-xs border border-[#047857]/40 dark:border-white/10 shadow-xs">
              <span className="font-bold text-[#6ee7b7] dark:text-[#00f59b]">
                THEMATIC INSPIRATION
              </span>
              <span>VIPER : VALORANT</span>
            </div>

            {/* Subtle Toxic Vapor Background Glow */}
            <div className="absolute inset-0 bg-radial from-[#059669]/25 via-transparent to-transparent opacity-70 pointer-events-none" />

            {/* Viper Full Portrait Artwork */}
            <div className="relative pt-12 pb-4 px-4 flex items-center justify-center min-h-[300px] sm:min-h-[340px]">
              <motion.img
                variants={viperImageVariants}
                src="https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/fullportrait.png"
                alt="Viper Valorant Agent Full Portrait"
                loading="eager"
                className="w-auto h-[280px] sm:h-[320px] object-contain drop-shadow-[0_8px_25px_rgba(4,120,87,0.4)] dark:drop-shadow-[0_8px_25px_rgba(0,245,155,0.3)] transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png';
                }}
              />
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="p-3 bg-[#bce3cb]/90 dark:bg-[#0c120e]/90 border-t border-[#047857]/30 dark:border-[#00f59b]/25 flex items-center justify-between text-[11px] font-mono">
              <div className="text-[#064e3b] dark:text-gray-400">
                <span className="font-bold text-[#064e3b] dark:text-white">DESIGN THEME:</span> VALORANT CONTROLLER
              </div>

              {/* Vector Barcode Graphic */}
              <div className="flex items-center gap-0.5 opacity-70 text-[#064e3b] dark:text-gray-300">
                <span className="w-0.5 h-3 bg-current" />
                <span className="w-1 h-3 bg-current" />
                <span className="w-0.5 h-3 bg-current" />
                <span className="w-1.5 h-3 bg-current" />
                <span className="w-0.5 h-3 bg-current" />
                <span className="w-1 h-3 bg-current" />
                <span className="w-0.5 h-3 bg-current" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
