import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import SideProfileNavbar from '../components/sideprofile/SideProfileNavbar';
import GamingBattleStation from '../components/sideprofile/GamingBattleStation';
import SportsFeed from '../components/sideprofile/SportsFeed';
import SpotifySoundstage from '../components/sideprofile/SpotifySoundstage';
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
    y: 20,
    scale: 0.98,
    transition: {
      duration: 0.28,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

/**
 * GPU-Accelerated Scroll-Driven Entrance & Exit Animation Variants
 * Triggered dynamically as elements scroll into and out of view (whileInView with once: false).
 * - Scroll Down: Smooth slide-up entrance (y: 45 -> 0, opacity: 0 -> 1, scale: 0.98 -> 1)
 * - Scroll Away: Smooth exit (y: 20, opacity: 0, scale: 0.98)
 * - Click Back: Immediate crisp exit sequence
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
      ease: [0.22, 1, 0.36, 1], // Buttery cubic bezier
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
 * Halaman khusus eksplorasi personal bertema Tactical HUD
 * Dilengkapi animasi Entrance & Exit yang muncul secara dinamis saat melakukan scroll.
 */
export default function SideProfilePage({ onBackToPortfolio, isReady = true }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = 'Side Profile — Juan Sterling';

    return () => {
      document.title = 'Juan Sterling — Software Developer';
    };
  }, []);

  const handleBack = () => {
    if (isExiting) return;
    setIsExiting(true);
    // Berikan jeda 100ms agar user dapat melihat animasi exit halaman sebelum tirai racun menutup penuh
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
      className="min-h-screen bg-[#f0fdf4] dark:bg-[#090d0b] text-[#09090b] dark:text-white transition-colors duration-300 relative selection:bg-[#00f59b]/30 selection:text-white overflow-x-hidden w-full max-w-full transform-gpu"
    >
      {/* Subtle Tactical Toxic Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#10b981]/10 dark:bg-[#00f59b]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#059669]/10 dark:bg-[#10b981]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Sticky Tactical Navbar */}
      <SideProfileNavbar onBack={handleBack} isExiting={isExiting} isReady={isReady} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Tactical Banner / Identity Intro */}
        <motion.section
          initial="hidden"
          whileInView={isExiting ? 'exit' : 'visible'}
          viewport={{ once: false, amount: 0.2, margin: '-20px 0px -40px 0px' }}
          variants={scrollSectionVariants}
          className="relative rounded-lg p-6 sm:p-8 bg-white dark:bg-[#0c120e] border border-[#10b981]/30 dark:border-[#00f59b]/35 shadow-[0_4px_30px_rgba(16,185,129,0.1)] dark:shadow-[0_0_35px_rgba(0,245,155,0.1)] overflow-hidden transition-colors duration-300 transform-gpu"
        >
          {/* Angular corner cut accents */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#10b981] dark:border-[#00f59b] opacity-80" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#10b981] dark:border-[#00f59b] opacity-80" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#064e3b] dark:text-white tracking-tight uppercase">
                BEYOND THE CODE
              </h1>

              <p className="mt-3 text-sm sm:text-base font-mono text-zinc-600 dark:text-gray-300 leading-relaxed">
                {sideProfileData.profile.bio}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 1: Gaming Universe (Gaming Battle Station) */}
        <motion.section
          initial="hidden"
          whileInView={isExiting ? 'exit' : 'visible'}
          viewport={{ once: false, amount: 0.1, margin: '-20px 0px -40px 0px' }}
          variants={scrollSectionVariants}
          className="space-y-6 transform-gpu"
        >
          <GamingBattleStation gamingData={sideProfileData.gaming} />
        </motion.section>

        {/* Section 2: Athletic Feed & Workout Log */}
        <motion.section
          initial="hidden"
          whileInView={isExiting ? 'exit' : 'visible'}
          viewport={{ once: false, amount: 0.1, margin: '-20px 0px -40px 0px' }}
          variants={scrollSectionVariants}
          className="space-y-6 transform-gpu"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-6 bg-[#10b981] dark:bg-[#00f59b] rounded-xs" />
              <h2 className="font-display font-black text-2xl sm:text-3xl tracking-wide uppercase text-[#064e3b] dark:text-white">
                PILLAR 02 — ATHLETIC FEED
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 dark:text-gray-400 hidden sm:inline">
              PHYSICAL ENDURANCE & DRILLS
            </span>
          </div>

          <SportsFeed sports={sideProfileData.sports} />
        </motion.section>

        {/* Section 3: Soundstage & Audio Frequency */}
        <motion.section
          initial="hidden"
          whileInView={isExiting ? 'exit' : 'visible'}
          viewport={{ once: false, amount: 0.1, margin: '-20px 0px -40px 0px' }}
          variants={scrollSectionVariants}
          className="space-y-6 transform-gpu"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-6 bg-[#10b981] dark:bg-[#00f59b] rounded-xs" />
              <h2 className="font-display font-black text-2xl sm:text-3xl tracking-wide uppercase text-[#064e3b] dark:text-white">
                PILLAR 03 — MUSIC SOUNDSTAGE
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 dark:text-gray-400 hidden sm:inline">
              SPOTIFY SOUNDSTAGE
            </span>
          </div>

          <SpotifySoundstage musicData={sideProfileData.music} />
        </motion.section>

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

          <div className="text-[11px] font-mono text-zinc-500 dark:text-gray-500">
            Design Inspired by VIPER of VALORANT
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
