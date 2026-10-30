import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SideProfileNavbar from '../components/sideprofile/SideProfileNavbar';
import ViperHeroDossier from '../components/sideprofile/ViperHeroDossier';
import GamingBattleStation from '../components/sideprofile/GamingBattleStation';
import SportsFeed from '../components/sideprofile/SportsFeed';
import SpotifySoundstage from '../components/sideprofile/SpotifySoundstage';
import ViperSectionDivider from '../components/sideprofile/ViperSectionDivider';
import TacticalCrosshair from '../components/sideprofile/TacticalCrosshair';
import TacticalRangeArena from '../components/sideprofile/TacticalRangeArena';
import { sideProfileData } from '../data/sideProfileData';
import { ArrowLeft } from 'lucide-react';

/**
 * GPU-Accelerated Page Entrance & Exit Animation Variants
 * Distinct, silky smooth motion (transform + opacity only), zero-lag across mobile and PC.
 */
const pageContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.28,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

/**
 * GPU-Accelerated Scroll-Driven Entrance & Exit Animation Variants
 * Triggered dynamically as elements scroll into and out of view (whileInView with once: false).
 */
const scrollSectionVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.98,
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
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
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

/**
 * SideProfilePage (/sideprofile)
 * Tactical personal dossier themed after Viper from VALORANT.
 * 
 * Key Features:
 * - 100% English, strictly zero '//' and zero emoticons.
 * - Interactive Toxin deployment system with live fuel depletion/regeneration.
 * - Locked 60 FPS across Mobile, Tablet, and Desktop.
 * - Compatible with both Toxic Lab (Dark) and Sterile Lab (Light) modes.
 */
export default function SideProfilePage({ onBackToPortfolio, isReady = true }) {
  const [isExiting, setIsExiting] = useState(false);
  const [fuel, setFuel] = useState(100);
  const [isToxinActive, setIsToxinActive] = useState(false);
  const [isRangeActive, setIsRangeActive] = useState(false);
  const [rangeScore, setRangeScore] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Desktop Pointer Verification (PC Only)
  useEffect(() => {
    const checkPointer = () => {
      const hasFinePointer =
        window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        !('ontouchstart' in window && navigator.maxTouchPoints > 2);
      setIsDesktop(hasFinePointer);
    };

    checkPointer();
    window.addEventListener('resize', checkPointer);
    return () => window.removeEventListener('resize', checkPointer);
  }, []);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = 'Side Profile — Juan Sterling';

    return () => {
      document.title = 'Juan Sterling — Software Developer';
    };
  }, []);

  // Live Fuel Depletion and Regeneration loop
  useEffect(() => {
    let interval = null;
    if (isToxinActive) {
      interval = setInterval(() => {
        setFuel((prev) => {
          if (prev <= 1) {
            setIsToxinActive(false);
            return 0;
          }
          return Math.max(0, prev - 1);
        });
      }, 120); // ~12 seconds of active deployment
    } else if (fuel < 100) {
      interval = setInterval(() => {
        setFuel((prev) => Math.min(100, prev + 2)); // ~6 seconds recharge
      }, 120);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isToxinActive, fuel]);

  const handleToggleToxin = () => {
    if (!isToxinActive && fuel < 15) return;
    setIsToxinActive((prev) => !prev);
  };

  const handleBack = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      if (onBackToPortfolio) {
        onBackToPortfolio();
      }
    }, 100);
  };

  const animationState = isExiting ? 'exit' : (isReady ? 'visible' : 'hidden');

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate={animationState}
      className={`min-h-screen ${
        isToxinActive ? 'bg-[#cce6d6]' : 'bg-[#dcefe3]'
      } dark:bg-[#090d0b] text-[#09090b] dark:text-white transition-colors duration-700 relative selection:bg-[#00f59b]/30 selection:text-white overflow-x-hidden w-full max-w-full`}
    >
      {/* Tactical FPS Crosshair & Gunshot Bullet Impact (Active exclusively on PC) */}
      <TacticalCrosshair />

      {/* Tactical Practice Range Target Arena (Active on PC when Range Protocol is ON) */}
      <TacticalRangeArena
        isActive={isRangeActive}
        isDesktop={isDesktop}
        onTargetHit={() => setRangeScore((prev) => prev + 1)}
      />

      {/* Subtle Tactical Toxic Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#059669]/15 dark:bg-[#00f59b]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#047857]/15 dark:bg-[#10b981]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Active Toxic Screen: Anchored to Page Edges (Kanan, Kiri, Atas, Bawah Halaman) */}
      <div
        className={`absolute inset-0 pointer-events-none z-20 transition-all duration-700 overflow-hidden ${
          isToxinActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Page Perimeter Toxic Border & Chemical Edge Glow */}
        <div className="absolute inset-0 border-4 sm:border-8 border-[#047857] dark:border-[#00f59b] shadow-[inset_0_0_80px_rgba(4,120,87,0.35)] dark:shadow-[inset_0_0_80px_rgba(0,245,155,0.25)]" />

        {/* Top Edge of Page: Toxic Chemical Mist */}
        <div className="absolute top-0 left-0 right-0 h-28 sm:h-40 bg-gradient-to-b from-[#047857]/45 via-[#059669]/15 to-transparent dark:from-[#00f59b]/35 dark:via-[#00f59b]/10 dark:to-transparent" />

        {/* Bottom Edge of Page: Toxic Chemical Mist & Emitter Line */}
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 bg-gradient-to-t from-[#047857]/55 via-[#059669]/20 to-transparent dark:from-[#00f59b]/40 dark:via-[#00f59b]/15 dark:to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#047857] dark:bg-[#00f59b] shadow-[0_0_20px_#047857] dark:shadow-[0_0_20px_#00f59b]" />

        {/* Left Edge of Page: Toxic Screen Wall Curtain */}
        <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-12 bg-gradient-to-r from-[#047857]/40 via-[#059669]/10 to-transparent dark:from-[#00f59b]/30 dark:to-transparent" />

        {/* Right Edge of Page: Toxic Screen Wall Curtain */}
        <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-12 bg-gradient-to-l from-[#047857]/40 via-[#059669]/10 to-transparent dark:from-[#00f59b]/30 dark:to-transparent" />
      </div>

      {/* Floating Tactical Navbar with Live Fuel Meter & Screen Action */}
      <SideProfileNavbar
        onBack={handleBack}
        isExiting={isExiting}
        isReady={isReady}
        fuel={fuel}
        isToxinActive={isToxinActive}
        onToggleToxin={handleToggleToxin}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16 space-y-12">
        {/* Tactical Hero Banner: Viper Protocol Dossier */}
        <section className="transform-gpu">
          <ViperHeroDossier
            profile={sideProfileData.profile}
            fuel={fuel}
            isToxinActive={isToxinActive}
            onToggleToxin={handleToggleToxin}
            isReady={isReady}
            isExiting={isExiting}
            isRangeActive={isRangeActive}
            onToggleRange={() => setIsRangeActive((prev) => !prev)}
            rangeScore={rangeScore}
            onResetRangeScore={() => setRangeScore(0)}
            isDesktop={isDesktop}
          />
        </section>

        {/* Section 1: Combat Simulation Protocols (Gaming Universe) */}
        <section className="space-y-6">
          <motion.div
            initial="hidden"
            whileInView={isExiting ? 'exit' : 'visible'}
            viewport={{ once: false, amount: 0.4 }}
            variants={scrollSectionVariants}
            className="flex items-center justify-between transform-gpu"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-6 bg-[#10b981] dark:bg-[#00f59b] rounded-xs" />
              <h2 className="font-display font-black text-2xl sm:text-3xl tracking-wide uppercase text-[#064e3b] dark:text-white">
                SECTION 01: COMBAT SIMULATION PROTOCOLS
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 dark:text-gray-400 hidden sm:inline">
              CLUTCH FIELD REPORT AND SIGNATURE ROSTER
            </span>
          </motion.div>

          <GamingBattleStation gamingData={sideProfileData.gaming} isToxinActive={isToxinActive} />
        </section>

        {/* Tactical Section Divider 01: Combat to Bio-Metrics */}
        <motion.div
          initial="hidden"
          whileInView={isExiting ? 'exit' : 'visible'}
          viewport={{ once: false, amount: 0.25 }}
          variants={scrollSectionVariants}
          className="transform-gpu"
        >
          <ViperSectionDivider
            isToxinActive={isToxinActive}
            lineCode="CONDUIT-01"
            fromSection="SECTION 01: COMBAT PROTOCOLS"
            toSection="SECTION 02: ATHLETIC FEED"
            tickerText="ACTIVE COMBAT SIMULATION COMPLETE • ADVANCING TO CARDIOVASCULAR TELEMETRY • RADIANITE SYSTEM PURGE NOMINAL"
            pressure="102.4 kPa"
            flow="86.4 L/S"
          />
        </motion.div>

        {/* Section 2: Athletic Feed & Workout Log */}
        <section className="space-y-6">
          <motion.div
            initial="hidden"
            whileInView={isExiting ? 'exit' : 'visible'}
            viewport={{ once: false, amount: 0.4 }}
            variants={scrollSectionVariants}
            className="flex items-center justify-between transform-gpu"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-6 bg-[#10b981] dark:bg-[#00f59b] rounded-xs" />
              <h2 className="font-display font-black text-2xl sm:text-3xl tracking-wide uppercase text-[#064e3b] dark:text-white">
                SECTION 02: PHYSICAL BIO-METRICS AND ENDURANCE
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 dark:text-gray-400 hidden sm:inline">
              ATHLETIC DRILLS AND CARDIOVASCULAR CONDITIONING
            </span>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView={isExiting ? 'exit' : 'visible'}
            viewport={{ once: false, amount: 0.08 }}
            variants={scrollSectionVariants}
            className="transform-gpu"
          >
            <SportsFeed sports={sideProfileData.sports} isToxinActive={isToxinActive} />
          </motion.div>
        </section>

        {/* Tactical Section Divider 02: Bio-Metrics to Soundstage */}
        <motion.div
          initial="hidden"
          whileInView={isExiting ? 'exit' : 'visible'}
          viewport={{ once: false, amount: 0.25 }}
          variants={scrollSectionVariants}
          className="transform-gpu"
        >
          <ViperSectionDivider
            isToxinActive={isToxinActive}
            lineCode="CONDUIT-02"
            fromSection="SECTION 02: PHYSICAL BIO-METRICS"
            toSection="SECTION 03: AUDIO FREQUENCY"
            tickerText="BIOMETRIC ENDURANCE CYCLE LOGGED • SYNCHRONIZING SPOTIFY SOUNDSTAGE OSCILLATION • ACOUSTIC RESONANCE STABLE"
            pressure="98.7 kPa"
            flow="79.1 L/S"
          />
        </motion.div>

        {/* Section 3: Soundstage & Audio Frequency */}
        <section className="space-y-6">
          <motion.div
            initial="hidden"
            whileInView={isExiting ? 'exit' : 'visible'}
            viewport={{ once: false, amount: 0.4 }}
            variants={scrollSectionVariants}
            className="flex items-center justify-between transform-gpu"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-6 bg-[#10b981] dark:bg-[#00f59b] rounded-xs" />
              <h2 className="font-display font-black text-2xl sm:text-3xl tracking-wide uppercase text-[#064e3b] dark:text-white">
                SECTION 03: NEURAL AUDIO FREQUENCY
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 dark:text-gray-400 hidden sm:inline">
              SPOTIFY SOUNDSTAGE AND SOUNDTRACK ROTATION
            </span>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView={isExiting ? 'exit' : 'visible'}
            viewport={{ once: false, amount: 0.12 }}
            variants={scrollSectionVariants}
            className="transform-gpu"
          >
            <SpotifySoundstage musicData={sideProfileData.music} isToxinActive={isToxinActive} />
          </motion.div>
        </section>

        {/* Bottom Navigation Return */}
        <motion.div
          initial="hidden"
          whileInView={isExiting ? 'exit' : 'visible'}
          viewport={{ once: false, amount: 0.2 }}
          variants={scrollSectionVariants}
          className="pt-8 pb-12 flex flex-col items-center justify-center text-center space-y-4 border-t border-[#10b981]/20 dark:border-[#00f59b]/20 transform-gpu"
        >
          <p className="text-xs font-mono text-zinc-500 dark:text-gray-400">
            Finished exploring the personal zone?
          </p>

          <button
            onClick={handleBack}
            type="button"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-xs bg-[#059669] hover:bg-[#047857] dark:bg-[#00f59b] dark:hover:bg-[#34d399] text-white dark:text-black font-mono font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(5,150,105,0.3)] dark:shadow-[0_0_20px_rgba(0,245,155,0.4)] hover:shadow-[0_6px_25px_rgba(5,150,105,0.4)] dark:hover:shadow-[0_0_35px_rgba(0,245,155,0.7)] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Return to Main Portfolio</span>
          </button>

          <p className="text-[11px] font-mono text-zinc-500 dark:text-gray-400">
            Design inspired by{' '}
            <a
              id="footer-viper-link"
              href="https://playvalorant.com/en-us/agents/viper/"
              target="_blank"
              rel="noopener noreferrer"
              title="VIPER of VALORANT (Official Agent Dossier)"
              className="text-[#047857] dark:text-[#00f59b] font-semibold underline-offset-4 decoration-[#047857]/60 dark:decoration-[#00f59b]/60 hover:underline hover:text-[#065f46] dark:hover:text-[#6ee7b7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#047857]/50 dark:focus-visible:ring-[#00f59b]/50 rounded-xs transition-colors duration-200 cursor-pointer"
            >
              VIPER of VALORANT
            </a>
          </p>
        </motion.div>
      </main>

    </motion.div>
  );
}

