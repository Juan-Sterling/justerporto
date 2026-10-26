import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import {
  Crosshair,
  Trophy,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  Gamepad2,
  Wand2,
  Radio,
  Image as ImageIcon,
} from 'lucide-react';

/**
 * Reusable Cinematic Screenshot Carousel with Motion Gestures & Lightbox Trigger
 */
function ScreenshotCarousel({
  images = [],
  title = '',
  accentColor = '#00f59b',
  onOpenLightbox,
}) {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage(([curr]) => {
      let next = curr + newDirection;
      if (next < 0) next = images.length - 1;
      if (next >= images.length) next = 0;
      return [next, newDirection];
    });
  };

  const imageIndex = Math.abs(page % (images.length || 1));
  const currentImage = images[imageIndex] || images[0];

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative group w-full rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/40 aspect-video select-none">
      {/* Dynamic Ambient Glow */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none blur-xl transition-colors duration-500"
        style={{ backgroundColor: accentColor }}
      />

      {/* Slide Image with Swipe Support */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={imageIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_e, { offset }) => {
            const swipeThreshold = 50;
            if (offset.x < -swipeThreshold) paginate(1);
            else if (offset.x > swipeThreshold) paginate(-1);
          }}
          onClick={() => onOpenLightbox && onOpenLightbox(imageIndex)}
          className="relative w-full h-full cursor-zoom-in overflow-hidden"
        >
          <img
            src={currentImage}
            alt={`${title} screenshot ${imageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';
            }}
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

          {/* Quick Expand Button on Image */}
          <div className="absolute top-3 right-3 p-1.5 sm:p-2 rounded-xs bg-black/60 backdrop-blur-md text-white/90 border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 text-[11px] font-mono pointer-events-none">
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Enlarge</span>
          </div>

          {/* Gallery Tag */}
          <div className="absolute top-3 left-3 px-2 sm:px-2.5 py-1 rounded-xs bg-black/60 backdrop-blur-md text-white/90 border border-white/15 text-[10px] font-mono tracking-wider flex items-center gap-1.5">
            <ImageIcon className="w-3 h-3 text-[#00f59b]" />
            <span>SCREENSHOT {imageIndex + 1} / {images.length}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next Glass Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              paginate(-1);
            }}
            type="button"
            aria-label="Previous screenshot"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-black/85 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-10 cursor-pointer shadow-lg opacity-85 hover:opacity-100"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              paginate(1);
            }}
            type="button"
            aria-label="Next screenshot"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-black/85 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-10 cursor-pointer shadow-lg opacity-85 hover:opacity-100"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPage([idx, idx > imageIndex ? 1 : -1]);
                }}
                aria-label={`Jump to screenshot ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${idx === imageIndex
                  ? 'w-5 h-1.5'
                  : 'w-1.5 h-1.5 opacity-50 hover:opacity-100'
                  }`}
                style={{
                  backgroundColor: idx === imageIndex ? accentColor : '#ffffff',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Fullscreen Lightbox Modal for Gameplay Screenshots
 */
function LightboxModal({
  images = [],
  initialIndex = 0,
  title = '',
  accentColor = '#00f59b',
  onClose,
}) {
  const [currIdx, setCurrIdx] = useState(initialIndex);

  const prev = useCallback(() => {
    setCurrIdx((prevIdx) => (prevIdx <= 0 ? images.length - 1 : prevIdx - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrIdx((prevIdx) => (prevIdx >= images.length - 1 ? 0 : prevIdx + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, prev, next]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
        >
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between pb-3 text-white">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <span className="font-display font-black tracking-wider uppercase text-sm sm:text-base">
                {title} — HIGHLIGHTS
              </span>
              <span className="text-xs font-mono text-zinc-400">
                ({currIdx + 1} of {images.length})
              </span>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-xs bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fullscreen Image Preview */}
          <div className="relative w-full rounded-lg overflow-hidden border border-white/20 bg-black flex items-center justify-center max-h-[75vh]">
            <img
              src={images[currIdx]}
              alt={`${title} detail`}
              className="w-full h-auto max-h-[75vh] object-contain"
            />

            {/* Lightbox Prev / Next Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  type="button"
                  aria-label="Previous"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/25 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={next}
                  type="button"
                  aria-label="Next"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/25 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Valorant Highlight Card
 * Tampilan highlight Valorant (tanpa emblem rank):
 * - Highest rank (text & badge)
 * - Riot ID (dengan quick copy)
 * - Beberapa gambar (carousel interaktif)
 * - 3 Agent yang sering dimainkan (visual agent cards)
 */
function ValorantHighlightCard({ valorant = {}, onOpenLightbox, isToxinActive = false }) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  const fullRiotId = `${valorant.riotId}#${valorant.tagline || '0001'}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullRiotId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy Riot ID', err);
    }
  };

  // GSAP 3D Parallax Tilt Effect on Desktop
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 5,
        rotateX: -y * 5,
        transformPerspective: 1200,
        ease: 'power2.out',
        duration: 0.4,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        ease: 'power2.out',
        duration: 0.6,
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-lg p-5 sm:p-6 backdrop-blur-md transition-all duration-500 overflow-hidden flex flex-col justify-between ${isToxinActive
          ? 'bg-[#d8eedf]/95 dark:bg-[#0c120e]/95 ring-2 ring-[#047857] dark:ring-[#00f59b] shadow-[0_0_40px_rgba(4,120,87,0.3)] dark:shadow-[0_0_40px_rgba(0,245,155,0.35)] border border-[#047857] dark:border-[#00f59b]'
          : 'bg-[#e7f4eb]/95 dark:bg-[#0c120e]/95 border border-[#059669]/30 dark:border-[#00f59b]/35 shadow-[0_4px_25px_rgba(5,150,105,0.12)] dark:shadow-[0_0_30px_rgba(0,245,155,0.08)]'
        }`}
    >
      {/* Angular tactical corner cut brackets */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#047857] dark:border-[#00f59b] opacity-90 pointer-events-none rounded-tr-lg m-0 z-10" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#047857] dark:border-[#00f59b] opacity-90 pointer-events-none rounded-bl-lg m-0 z-10" />

      {/* Top Accent Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10b981] via-[#00f59b] to-[#38bdf8]" />

      <div>
        {/* Header: Title, Highest Rank text & Riot ID (Emblem Dihapus) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 border-b border-[#10b981]/20 dark:border-[#00f59b]/20">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-xs bg-[#10b981]/15 dark:bg-[#00f59b]/20 text-[#065f46] dark:text-[#00f59b]">
                <Crosshair className="w-3 h-3" />
                TACTICAL FPS
              </span>
              <span className="text-[11px] font-mono font-bold text-[#059669] dark:text-[#00f59b] px-2 py-0.5 rounded-xs bg-[#ecfdf5] dark:bg-[#16221c] border border-[#10b981]/30 dark:border-[#00f59b]/20">
                HIGHEST: {valorant.highestRank || 'Ascendant 2'}
              </span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#064e3b] dark:text-white tracking-wide mt-1">
              VALORANT
            </h3>
          </div>

          {/* Riot ID Copy Badge */}
          <button
            onClick={handleCopy}
            type="button"
            className="group relative self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-xs bg-[#f0fdf4] dark:bg-[#16221c] border border-[#10b981]/30 dark:border-[#00f59b]/35 hover:border-[#059669] dark:hover:border-[#00f59b] text-[#064e3b] dark:text-[#00f59b] text-xs font-mono transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm"
          >
            <div className="text-left">
              <span className="text-[9px] text-zinc-500 dark:text-gray-400 block font-semibold">
                RIOT ID
              </span>
              <span className="font-bold text-xs sm:text-sm tracking-wide text-[#064e3b] dark:text-white">
                {fullRiotId}
              </span>
            </div>
            {copied ? (
              <Check className="w-4 h-4 text-[#059669] dark:text-[#00f59b] animate-bounce ml-1 shrink-0" />
            ) : (
              <Copy className="w-4 h-4 text-zinc-400 group-hover:text-[#059669] dark:group-hover:text-[#00f59b] ml-1 shrink-0" />
            )}
            {copied && (
              <span className="absolute -top-6 right-0 text-[10px] font-mono bg-[#059669] dark:bg-[#00f59b] text-white dark:text-black font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                COPIED!
              </span>
            )}
          </button>
        </div>

        {/* Screenshot Gallery Carousel */}
        <div className="my-4">
          <ScreenshotCarousel
            images={valorant.images || []}
            title="VALORANT"
            accentColor="#00f59b"
            onOpenLightbox={(idx) =>
              onOpenLightbox && onOpenLightbox('VALORANT', valorant.images, idx, '#00f59b')
            }
          />
        </div>

        {/* 3 Signature Agents Showcase */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-600 dark:text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-[#059669] dark:text-[#00f59b]" />
              3 MOST PLAYED AGENTS
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {(valorant.signatureAgents || []).slice(0, 3).map((agent) => (
              <motion.div
                key={agent.name}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group relative rounded-lg p-2 sm:p-2.5 bg-[#d9ece1] dark:bg-[#131c17] border border-[#059669]/30 dark:border-[#00f59b]/25 hover:border-[#047857] dark:hover:border-[#00f59b] transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
              >
                {/* Agent Ambient Glow */}
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: agent.color || '#00f59b' }}
                />

                {/* Agent Portrait Artwork */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-black/10 dark:bg-black/30 border border-black/10 dark:border-white/10 mb-1.5 flex items-center justify-center">
                  <img
                    src={agent.image || agent.iconUrl}
                    alt={agent.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-115"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                </div>

                <span className="font-display font-black text-xs sm:text-sm text-[#064e3b] dark:text-white tracking-wide">
                  {agent.name}
                </span>
                <span
                  className="text-[9px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.2 rounded-xs mt-0.5"
                  style={{
                    backgroundColor: `${agent.color || '#00f59b'}20`,
                    color: agent.color || '#00f59b',
                  }}
                >
                  {agent.role}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile Legends Highlight Card
 * Tampilan highlight MLBB (tanpa emblem rank):
 * - Highest rank (text & badge)
 * - ID (dengan quick copy)
 * - Beberapa gambar (carousel interaktif)
 * - Role utama saja
 */
function MlbbHighlightCard({ mlbb = {}, onOpenLightbox, isToxinActive = false }) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  const fullId = mlbb.id || '24891023 (2048)';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy MLBB ID', err);
    }
  };

  // GSAP 3D Parallax Tilt Effect on Desktop
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 5,
        rotateX: -y * 5,
        transformPerspective: 1200,
        ease: 'power2.out',
        duration: 0.4,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        ease: 'power2.out',
        duration: 0.6,
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-lg p-5 sm:p-6 backdrop-blur-md transition-all duration-500 overflow-hidden flex flex-col justify-between ${isToxinActive
          ? 'bg-[#d8eedf]/95 dark:bg-[#0c120e]/95 ring-2 ring-[#047857] dark:ring-[#00f59b] shadow-[0_0_40px_rgba(4,120,87,0.3)] dark:shadow-[0_0_40px_rgba(0,245,155,0.35)] border border-[#047857] dark:border-[#00f59b]'
          : 'bg-white/95 dark:bg-[#0c120e]/95 border border-amber-500/30 dark:border-amber-400/35 shadow-[0_4px_25px_rgba(245,158,11,0.08)] dark:shadow-[0_0_30px_rgba(245,158,11,0.08)]'
        }`}
    >
      {/* Angular tactical corner cut brackets */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#047857] dark:border-[#00f59b] opacity-90 pointer-events-none rounded-tr-lg m-0 z-10" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#047857] dark:border-[#00f59b] opacity-90 pointer-events-none rounded-bl-lg m-0 z-10" />

      {/* Top Accent Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

      <div>
        {/* Header: Title, Highest Rank text & Account ID (Emblem Dihapus) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 border-b border-amber-500/20 dark:border-amber-400/20">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-xs bg-amber-500/15 text-amber-700 dark:text-amber-300">
                <Trophy className="w-3 h-3" />
                5V5 MOBA
              </span>
              <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-xs bg-amber-50 dark:bg-[#1f1b10] border border-amber-500/30 dark:border-amber-400/25">
                HIGHEST: {mlbb.highestRank || 'Mythical Glory'}
              </span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white tracking-wide mt-1">
              MOBILE LEGENDS: BANG BANG
            </h3>
          </div>

          {/* MLBB ID Copy Badge */}
          <button
            onClick={handleCopy}
            type="button"
            className="group relative self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-xs bg-amber-50/60 dark:bg-[#1a1811] border border-amber-500/30 dark:border-amber-400/35 hover:border-amber-600 dark:hover:border-amber-300 text-amber-900 dark:text-amber-300 text-xs font-mono transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm"
          >
            <div className="text-left">
              <span className="text-[9px] text-zinc-500 dark:text-gray-400 block font-semibold">
                GAME ID (ZONE)
              </span>
              <span className="font-bold text-xs sm:text-sm tracking-wide text-zinc-900 dark:text-white">
                {fullId}
              </span>
            </div>
            {copied ? (
              <Check className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-bounce ml-1 shrink-0" />
            ) : (
              <Copy className="w-4 h-4 text-zinc-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 ml-1 shrink-0" />
            )}
            {copied && (
              <span className="absolute -top-6 right-0 text-[10px] font-mono bg-amber-500 text-black font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                COPIED!
              </span>
            )}
          </button>
        </div>

        {/* Screenshot Gallery Carousel */}
        <div className="my-4">
          <ScreenshotCarousel
            images={mlbb.images || []}
            title="MOBILE LEGENDS"
            accentColor="#f59e0b"
            onOpenLightbox={(idx) =>
              onOpenLightbox && onOpenLightbox('MOBILE LEGENDS', mlbb.images, idx, '#f59e0b')
            }
          />
        </div>

        {/* Role Utama Saja (Clean & Impactful) */}
        <div className="rounded-lg p-3 sm:p-3.5 bg-amber-50/70 dark:bg-[#17140b] border border-amber-500/30 dark:border-amber-400/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xs bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 dark:text-gray-400 block font-semibold">
                PRIMARY ROLE
              </span>
              <span className="font-display font-black text-sm sm:text-base text-zinc-900 dark:text-white">
                {mlbb.primaryRole || 'Mid Laner / Mage'}
              </span>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 shrink-0">
            SIGNATURE
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Other Games Vault
 * Menampilkan game sisanya HANYA dengan nama dan gambar!
 * Tanpa teks deskripsi yang kaku dan panjang.
 */
function OtherGamesVault({ games = [], isToxinActive = false }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 260;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!games || games.length === 0) return null;

  return (
    <div
      className={`relative rounded-lg p-5 sm:p-6 backdrop-blur-md transition-all duration-500 overflow-hidden ${isToxinActive
          ? 'bg-[#d8eedf]/95 dark:bg-[#0c120e]/95 ring-2 ring-[#047857] dark:ring-[#00f59b] shadow-[0_0_40px_rgba(4,120,87,0.3)] dark:shadow-[0_0_40px_rgba(0,245,155,0.35)] border border-[#047857] dark:border-[#00f59b]'
          : 'bg-[#e7f4eb]/95 dark:bg-[#0c120e]/95 border border-[#10b981]/30 dark:border-[#00f59b]/35 shadow-[0_4px_25px_rgba(16,185,129,0.08)] dark:shadow-[0_0_25px_rgba(0,245,155,0.08)]'
        }`}
    >
      {/* Angular tactical corner cut brackets */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#047857] dark:border-[#00f59b] opacity-90 pointer-events-none rounded-tr-lg m-0 z-10" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#047857] dark:border-[#00f59b] opacity-90 pointer-events-none rounded-bl-lg m-0 z-10" />

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#10b981]/20 dark:border-[#00f59b]/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xs bg-[#10b981]/15 dark:bg-[#00f59b]/15 text-[#059669] dark:text-[#00f59b] flex items-center justify-center">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-black text-xl sm:text-2xl text-[#064e3b] dark:text-white tracking-wide">
              OTHER GAMES VAULT
            </h4>
            <span className="text-xs font-mono text-zinc-500 dark:text-gray-400">
              Curated gaming library ({games.length} titles)
            </span>
          </div>
        </div>

        {/* Left / Right Scroll Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            type="button"
            aria-label="Scroll left"
            className="p-2 rounded-xs bg-white dark:bg-[#16221c] border border-black/10 dark:border-white/10 hover:border-[#10b981] dark:hover:border-[#00f59b] text-zinc-700 dark:text-white transition-all cursor-pointer shadow-xs hover:shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            type="button"
            aria-label="Scroll right"
            className="p-2 rounded-xs bg-white dark:bg-[#16221c] border border-black/10 dark:border-white/10 hover:border-[#10b981] dark:hover:border-[#00f59b] text-zinc-700 dark:text-white transition-all cursor-pointer shadow-xs hover:shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Responsive Poster Gallery */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none mt-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {games.map((game, index) => {
          const gameTitle = game.name || game.title || 'Game';
          const gameImg = game.image || game.coverUrl;
          const accentColor = game.accentColor || '#00f59b';

          return (
            <motion.div
              key={game.id || index}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={`group relative flex-none w-[175px] sm:w-[215px] aspect-[3/4] rounded-lg overflow-hidden flex flex-col justify-between bg-gradient-to-b from-[#111c16] via-[#0b130e] to-[#070c09] snap-start transition-all duration-300 select-none cursor-pointer ${isToxinActive
                  ? 'border-2 border-[#047857] dark:border-[#00f59b] shadow-[0_0_20px_rgba(4,120,87,0.3)] dark:shadow-[0_0_25px_rgba(0,245,155,0.3)]'
                  : 'border border-[#10b981]/25 dark:border-[#00f59b]/25 hover:border-[#10b981] dark:hover:border-[#00f59b] shadow-[0_4px_15px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
                }`}
            >
              {/* Tactical Corner Brackets */}
              <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#00f59b]/40 group-hover:border-[#00f59b] transition-colors pointer-events-none" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#00f59b]/40 group-hover:border-[#00f59b] transition-colors pointer-events-none" />
              <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#00f59b]/40 group-hover:border-[#00f59b] transition-colors pointer-events-none" />
              <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#00f59b]/40 group-hover:border-[#00f59b] transition-colors pointer-events-none" />

              {/* Ambient Radial Spotlight (Backlight Glow) */}
              <div
                className="absolute inset-0 opacity-25 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 45%, ${accentColor} 0%, transparent 70%)`,
                }}
              />

              {/* Tactical Tech Grid Texture Overlay */}
              <div
                className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Top Meta Header */}
              <div className="relative z-10 px-3.5 pt-3 flex items-center justify-between">
                <span className="text-[9px] font-mono tracking-widest text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/25 px-1.5 py-0.5 rounded-xs font-bold">
                  VAULT 0{index + 1}
                </span>
                {game.genre && (
                  <span className="text-[9px] font-mono text-zinc-400 truncate max-w-[90px] uppercase">
                    {game.genre}
                  </span>
                )}
              </div>

              {/* Center Game Logo Showcase */}
              <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-5">
                <img
                  src={gameImg}
                  alt={gameTitle}
                  className="max-w-[85%] max-h-[95px] sm:max-h-[115px] object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-out group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>

              {/* Game Name Badge (Bottom Bar) */}
              <div className="relative z-10 p-3 sm:p-3.5 bg-black/60 backdrop-blur-md border-t border-white/5">
                <span className="block font-display font-black text-xs sm:text-sm text-white tracking-wide truncate drop-shadow-md group-hover:text-[#00f59b] transition-colors duration-200">
                  {gameTitle}
                </span>
                <span className="block text-[9px] font-mono text-zinc-400 tracking-wider mt-0.5">
                  STATUS: VERIFIED
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Main GamingBattleStation Component
 * Langsung memakai Dual View:
 * - Desktop: 2 kolom berdampingan (Valorant & Mobile Legends)
 * - Tablet & HP: 1 kolom tersusun rapi (stacked responsive)
 * - Emblem rank dihapus di kedua game
 * - Other Games Vault (hanya nama dan gambar)
 */
export default function GamingBattleStation({ gamingData, isToxinActive = false }) {
  const [lightbox, setLightbox] = useState(null);

  const { valorant = {}, mlbb = {}, otherGames = [] } = gamingData || {};
  const activeMlbb = Array.isArray(mlbb) ? mlbb[0] : mlbb;

  const openLightbox = (title, images, index, accentColor) => {
    setLightbox({ title, images, index, accentColor });
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  return (
    <div className="relative w-full space-y-6">
      {/* Lightbox Modal (if active) */}
      {lightbox && (
        <LightboxModal
          images={lightbox.images}
          initialIndex={lightbox.index}
          title={lightbox.title}
          accentColor={lightbox.accentColor}
          onClose={closeLightbox}
        />
      )}

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-lg backdrop-blur-md transition-all duration-500 overflow-hidden ${isToxinActive
            ? 'bg-[#d8eedf]/95 dark:bg-[#0c120e]/95 ring-2 ring-[#047857] dark:ring-[#00f59b] shadow-[0_0_40px_rgba(4,120,87,0.3)] dark:shadow-[0_0_40px_rgba(0,245,155,0.35)] border border-[#047857] dark:border-[#00f59b]'
            : 'bg-white/90 dark:bg-[#0c120e]/90 border border-[#10b981]/30 dark:border-[#00f59b]/35 shadow-[0_4px_25px_rgba(16,185,129,0.08)] dark:shadow-[0_0_25px_rgba(0,245,155,0.08)]'
          }`}
      >
        {/* Angular tactical corner cut brackets */}
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#047857] dark:border-[#00f59b] opacity-90 pointer-events-none rounded-tr-lg m-0 z-10" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#047857] dark:border-[#00f59b] opacity-90 pointer-events-none rounded-bl-lg m-0 z-10" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-[#10b981]/15 dark:bg-[#00f59b]/15 border border-[#10b981]/30 dark:border-[#00f59b]/40 flex items-center justify-center text-[#059669] dark:text-[#00f59b]">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#065f46] dark:text-[#00f59b]">
                PILLAR 01: GAMING SPOTLIGHT
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-xs bg-[#10b981]/15 dark:bg-[#00f59b]/15 text-[#059669] dark:text-[#6ee7b7]">
                DUAL HIGHLIGHT
              </span>
            </div>
            <h2 className="font-display font-black text-2xl text-[#064e3b] dark:text-white tracking-wide">
              BATTLESTATION & HIGHLIGHTS
            </h2>
          </div>
        </div>
      </motion.div>

      {/* Dual View: 1 Column on Mobile & Tablet, 2 Columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="transform-gpu"
        >
          <ValorantHighlightCard
            valorant={valorant}
            onOpenLightbox={openLightbox}
            isToxinActive={isToxinActive}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="transform-gpu"
        >
          <MlbbHighlightCard
            mlbb={activeMlbb}
            onOpenLightbox={openLightbox}
            isToxinActive={isToxinActive}
          />
        </motion.div>
      </div>

      {/* Game Sisanya: HANYA Nama dan Gambar */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="transform-gpu"
      >
        <OtherGamesVault games={otherGames} isToxinActive={isToxinActive} />
      </motion.div>
    </div>
  );
}
