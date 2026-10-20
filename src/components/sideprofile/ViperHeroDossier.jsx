import React from 'react';
import { motion } from 'motion/react';
import {
  Crosshair,
  Activity,
  Radio,
  Zap,
  Terminal,
} from 'lucide-react';

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
 */
export default function ViperHeroDossier({
  profile = {},
  fuel = 100,
  isToxinActive = false,
  onToggleToxin,
}) {
  return (
    <div
      className={`relative rounded-lg p-5 sm:p-8 backdrop-blur-md overflow-hidden transition-all duration-500 transform-gpu ${isToxinActive
          ? 'bg-[#d8eedf]/95 dark:bg-[#0c120e]/95 ring-2 ring-[#047857] dark:ring-[#00f59b] shadow-[0_0_40px_rgba(4,120,87,0.3)] dark:shadow-[0_0_40px_rgba(0,245,155,0.35)] border border-[#047857] dark:border-[#00f59b]'
          : 'bg-[#e7f4eb]/95 dark:bg-[#0c120e]/95 border border-[#059669]/40 dark:border-[#00f59b]/35 shadow-[0_4px_30px_rgba(5,150,105,0.15)] dark:shadow-[0_0_35px_rgba(0,245,155,0.12)]'
        }`}
    >
      {/* Angular tactical corner cut brackets */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#047857] dark:border-[#00f59b] opacity-90 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#047857] dark:border-[#00f59b] opacity-90 pointer-events-none" />

      {/* Top Classification Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[#059669]/25 dark:border-[#00f59b]/20 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-xs bg-[#059669]/20 dark:bg-[#00f59b]/20 text-[#064e3b] dark:text-[#00f59b] font-bold tracking-widest uppercase text-[10px]">
            PERSONAL DOSSIER
          </span>
          <span className="text-[#059669] dark:text-zinc-600">•</span>
          <span className="text-[#047857] dark:text-[#34d399] font-bold">
            OFF-DUTY PROFILE ARCHIVE
          </span>
        </div>

        <div className="flex items-center gap-4 text-zinc-600 dark:text-gray-400 text-[11px]">
          <span className="hidden sm:inline font-medium">
            LOCATION : JAKARTA, INDONESIA
          </span>
          <div className="flex items-center gap-1.5 text-[#047857] dark:text-[#00f59b] font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>CLEARANCE LEVEL 04 TACTICAL</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Personal Intel | Right Thematic Valorant Key Art */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Personal Dossier & 3 Core Pillars */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            {/* <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-[#d2eadb] dark:bg-[#16221c] border border-[#047857]/35 dark:border-[#00f59b]/30 text-[#064e3b] dark:text-[#00f59b] text-xs font-mono font-bold mb-3 shadow-2xs">
              <Terminal className="w-3.5 h-3.5" />
              <span>SUBJECT : JUAN STERLING</span>
            </div> */}

            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#064e3b] dark:text-white tracking-tight uppercase leading-tight">
              BEYOND THE CODE
            </h1>
            <p className="font-mono text-sm sm:text-base font-bold text-[#047857] dark:text-[#00f59b] mt-1 tracking-wide">
              PERSONAL SIDE PROFILE : OFF-DUTY PURSUITS & DISCIPLINES
            </p>

            <p className="mt-4 text-sm sm:text-base font-mono text-[#143d2c] dark:text-gray-300 leading-relaxed font-medium">
              {profile.bio || 'Coding is part of the story, not the whole story. Operating at the intersection of clean software architecture, tactical clutch play, and disciplined physical conditioning.'}
            </p>
          </div>

          {/* Personal Pillar Badges (Gaming, Athletics, Audio) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xs bg-[#d9ece1] dark:bg-[#131c17] border border-[#059669]/30 dark:border-[#00f59b]/25 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#065f46] dark:text-gray-400 font-semibold">
                <Crosshair className="w-3.5 h-3.5 text-[#047857] dark:text-[#00f59b]" />
                <span>PILLAR 01 : GAMING</span>
              </div>
              <div className="font-display font-bold text-xs sm:text-sm text-[#064e3b] dark:text-white mt-1">
                VALORANT & MLBB
              </div>
            </div>

            <div className="p-3 rounded-xs bg-[#d9ece1] dark:bg-[#131c17] border border-[#059669]/30 dark:border-[#00f59b]/25 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#065f46] dark:text-gray-400 font-semibold">
                <Activity className="w-3.5 h-3.5 text-[#047857] dark:text-[#00f59b]" />
                <span>PILLAR 02 : ATHLETICS</span>
              </div>
              <div className="font-display font-bold text-xs sm:text-sm text-[#064e3b] dark:text-white mt-1">
                STRENGTH & CARDIO
              </div>
            </div>

            <div className="p-3 rounded-xs bg-[#d9ece1] dark:bg-[#131c17] border border-[#059669]/30 dark:border-[#00f59b]/25 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#065f46] dark:text-gray-400 font-semibold">
                <Radio className="w-3.5 h-3.5 text-[#047857] dark:text-[#00f59b]" />
                <span>PILLAR 03 : AUDIO</span>
              </div>
              <div className="font-display font-bold text-xs sm:text-sm text-[#064e3b] dark:text-white mt-1">
                SPOTIFY ROTATION
              </div>
            </div>
          </div>

          {/* Interactive Valorant Toxin Fuel Console */}
          <div className="p-4 sm:p-5 rounded-xs bg-[#cbe7d5] dark:bg-[#121c16] border border-[#047857]/45 dark:border-[#00f59b]/35 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#064e3b] dark:text-[#00f59b]">
                    VALORANT HUD : TOXIN CAPACITY
                  </span>
                  <span className="text-[#047857] dark:text-zinc-600 text-xs">•</span>
                  <span className="text-xs font-mono font-bold text-[#064e3b] dark:text-[#34d399]">
                    {Math.round(fuel)}% REMAINING
                  </span>
                </div>
                <div className="text-xs font-mono text-[#065f46] dark:text-gray-400 mt-0.5 font-medium">
                  {isToxinActive
                    ? 'Toxic Screen active: Discharging dense chemical vapor wall.'
                    : 'Tactical HUD standby: Ready to deploy interactive screen.'}
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
          </div>
        </div>

        {/* Right Column: Tactical Valorant Theme Key Art Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm rounded-lg overflow-hidden border border-[#047857]/45 dark:border-[#00f59b]/40 bg-gradient-to-b from-[#bce3cb] to-[#cee8d7] dark:from-[#131c17] dark:to-[#090d0b] shadow-[0_4px_25px_rgba(4,120,87,0.18)] dark:shadow-[0_0_35px_rgba(0,245,155,0.15)] group">
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
              <img
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
          </div>
        </div>
      </div>
    </div>
  );
}
