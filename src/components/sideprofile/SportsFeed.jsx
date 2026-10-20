import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
} from 'lucide-react';

/**
 * Custom Hook untuk mendeteksi jumlah kolom masonry secara dinamis
 * - Mobile (<640px): 1 kolom
 * - Tablet (640px - 1023px): 2 kolom
 * - Desktop (>=1024px): 3 kolom
 */
function useMasonryColumns() {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumns(1);
      } else if (width < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return columns;
}

/**
 * SportsFeed with Round-Robin Balanced Masonry Grid
 * Sesuai instruksi: CUKUP TAMPILKAN FOTO DAN NAMA OLAHRAGANYA DI BADGES
 * Tanpa teks paragraf panjang, deskripsi, atau catatan berlebih.
 */
export default function SportsFeed({ sports = [] }) {
  const columnCount = useMasonryColumns();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Algoritma Round-Robin & Greedy Height Balancing
  // Menjaga tinggi akumulasi setiap kolom agar seimbang tanpa celah timpang (tidak jomplang)
  const distributedColumns = useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => []);
    const colHeights = Array(columnCount).fill(0);

    sports.forEach((item) => {
      // Cari kolom dengan tinggi saat ini yang paling pendek
      let minCol = 0;
      for (let i = 1; i < columnCount; i++) {
        if (colHeights[i] < colHeights[minCol]) {
          minCol = i;
        }
      }

      // Estimasi bobot tinggi berdasarkan aspect ratio
      const isTall = item.aspect === 'tall' || item.aspectRatio === 'portrait';
      const isWide = item.aspect === 'wide' || item.aspectRatio === 'landscape';
      const weight = isTall ? 1.35 : isWide ? 0.8 : 1.0;

      cols[minCol].push(item);
      colHeights[minCol] += weight;
    });

    return cols;
  }, [sports, columnCount]);

  const openLightbox = (item) => {
    const idx = sports.findIndex((s) => s.id === item.id);
    setLightboxIndex(idx !== -1 ? idx : 0);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev <= 0 ? sports.length - 1 : prev - 1
    );
  }, [sports.length]);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev >= sports.length - 1 ? 0 : prev + 1
    );
  }, [sports.length]);

  // Keyboard navigation untuk Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, prevLightbox, nextLightbox]);

  const currentSport = lightboxIndex !== null ? sports[lightboxIndex] : null;

  return (
    <div className="relative rounded-lg p-5 sm:p-6 bg-white/95 dark:bg-[#0c120e]/95 backdrop-blur-md border border-[#10b981]/30 dark:border-[#00f59b]/35 shadow-[0_4px_25px_rgba(16,185,129,0.08)] dark:shadow-[0_0_25px_rgba(0,245,155,0.08)] overflow-hidden transition-all duration-300">
      {/* Tactical Top Bar Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10b981] via-[#00f59b] to-[#34d399]" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#10b981]/20 dark:border-[#00f59b]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-[#10b981]/15 dark:bg-[#00f59b]/15 border border-[#10b981]/30 dark:border-[#00f59b]/40 flex items-center justify-center text-[#059669] dark:text-[#00f59b] shadow-[0_2px_10px_rgba(16,185,129,0.2)] dark:shadow-[0_0_15px_rgba(0,245,155,0.25)]">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded-xs bg-[#10b981]/15 dark:bg-[#00f59b]/20 text-[#065f46] dark:text-[#00f59b] font-bold">
                ATHLETIC GALLERY
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-xs bg-zinc-100 dark:bg-[#16221c] text-zinc-600 dark:text-gray-400">
                BALANCED MASONRY ({sports.length} PHOTOS)
              </span>
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-[#064e3b] dark:text-white tracking-wide mt-0.5">
              ATHLETIC FEED — WORKOUT LOG
            </h3>
          </div>
        </div>
      </div>

      {/* Balanced Masonry Grid Columns (Hanya Foto & Nama di Badges) */}
      <div
        className={`grid gap-4 sm:gap-5 mt-5 ${columnCount === 1
            ? 'grid-cols-1'
            : columnCount === 2
              ? 'grid-cols-2'
              : 'grid-cols-3'
          }`}
      >
        {distributedColumns.map((colItems, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-4 sm:gap-5">
            {colItems.map((item) => {
              const isTall = item.aspect === 'tall';
              const isWide = item.aspect === 'wide';
              const sportName = item.category || item.name || item.title || 'Sport';

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 35, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  whileHover={{ y: -5, scale: 1.015 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => openLightbox(item)}
                  className="group relative cursor-pointer rounded-lg overflow-hidden bg-zinc-950 border border-[#10b981]/25 dark:border-[#00f59b]/25 hover:border-[#059669] dark:hover:border-[#00f59b] transition-all duration-300 shadow-sm hover:shadow-lg dark:shadow-none dark:hover:shadow-[0_0_25px_rgba(0,245,155,0.22)] select-none transform-gpu"
                >
                  {/* Photo Container with Dynamic Aspect Ratio */}
                  <div
                    className={`relative w-full overflow-hidden ${isTall
                        ? 'aspect-[3/4]'
                        : isWide
                          ? 'aspect-[16/10]'
                          : 'aspect-[4/3]'
                      }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={sportName}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />

                    {/* Gradient Overlay for high-contrast badge visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-85 group-hover:opacity-95 transition-opacity pointer-events-none" />

                    {/* Hover Zoom Prompt Badge */}
                    <div className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-xs bg-black/60 backdrop-blur-md text-white/90 border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-[10px] font-mono pointer-events-none">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Enlarge</span>
                    </div>

                    {/* Sport Name Badge (Sesuai instruksi: Foto dan Nama Olahraga di Badges) */}
                    <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#090d0b]/90 text-[#00f59b] border border-[#00f59b]/40 backdrop-blur-md text-xs font-mono font-bold tracking-wider uppercase shadow-lg group-hover:border-[#00f59b] group-hover:bg-[#00f59b] group-hover:text-black transition-all duration-300">
                        <Activity className="w-3.5 h-3.5 shrink-0" />
                        <span>{sportName}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Lightbox Modal with Photo Carousel Cycling */}
      <AnimatePresence>
        {currentSport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-[#0c120e] border border-[#00f59b]/40 rounded-lg overflow-hidden shadow-[0_0_60px_rgba(0,245,155,0.25)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar with Navigation & Close */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#131c17] border-b border-[#00f59b]/30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00f59b]" />
                  <span className="text-xs font-mono font-bold text-[#00f59b] uppercase tracking-wider">
                    ATHLETIC HUD — {currentSport.category || currentSport.name || currentSport.title}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    ({lightboxIndex + 1} of {sports.length})
                  </span>
                </div>

                <button
                  onClick={closeLightbox}
                  type="button"
                  className="p-1.5 rounded-xs text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photo Display with Prev/Next Controls */}
              <div className="relative max-h-[70vh] w-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={currentSport.imageUrl}
                  alt={currentSport.category || currentSport.title}
                  className="max-h-[70vh] w-full object-contain"
                />

                {/* Left / Right Arrow Navigation in Lightbox */}
                {sports.length > 1 && (
                  <>
                    <button
                      onClick={prevLightbox}
                      type="button"
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextLightbox}
                      type="button"
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Lightbox Bottom Bar */}
              <div className="px-5 py-3.5 bg-[#0c120e] border-t border-[#00f59b]/20 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#00f59b]/15 text-[#00f59b] border border-[#00f59b]/30 font-mono text-xs font-bold uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{currentSport.category || currentSport.name || currentSport.title}</span>
                </span>
                <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                  Use ← → arrow keys to navigate photos
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
