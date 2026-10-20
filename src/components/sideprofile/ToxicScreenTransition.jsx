import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Radio } from 'lucide-react';

/**
 * ToxicScreenTransition
 * Animasi layar taktis ala Toxic Curtain saat berpindah rute
 * Rhythmic 60FPS timing dengan stabilisasi HUD anti-kedip:
 * - 0ms - 320ms: Tirai racun menutup secara snappy (0.32s cubic ease-out)
 * - 320ms: Midpoint tercapai, rute halaman ditukar di balik tirai tertutup
 * - 320ms - 1100ms: Tampilan HUD alert (MAIN PORTFOLIO / SIDE PROFILE) stabil terbaca (~780ms) dengan fuel bar animasi
 * - 1100ms: Tirai racun membuka secara natural dan halus
 * - 1450ms: Transisi selesai & tirai dihilangkan
 */
export default function ToxicScreenTransition({
  isActive,
  targetName = 'SIDE PROFILE',
  onMidpoint,
  onOpenStart,
  onComplete,
}) {
  const [stage, setStage] = useState('idle'); // idle | entering | midpoint | exiting

  // Simpan callback dalam ref untuk mencegah re-trigger effect saat state route berubah di midpoint
  const onMidpointRef = useRef(onMidpoint);
  const onOpenStartRef = useRef(onOpenStart);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onMidpointRef.current = onMidpoint;
    onOpenStartRef.current = onOpenStart;
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    if (isActive) {
      setStage('entering');

      // 1. Snappy closing: mencapai posisi penuh pada 320ms
      const midTimer = setTimeout(() => {
        setStage('midpoint');
        if (onMidpointRef.current) onMidpointRef.current();
      }, 320);

      // 2. Membuka kembali secara natural pada 1100ms (memberi waktu ~780ms agar tulisan terbaca jelas tanpa terburu-buru)
      const exitTimer = setTimeout(() => {
        setStage('exiting');
        if (onOpenStartRef.current) onOpenStartRef.current();
      }, 1100);

      // 3. Selesai transisi penuh tepat pada 1450ms
      const finishTimer = setTimeout(() => {
        setStage('idle');
        if (onCompleteRef.current) onCompleteRef.current();
      }, 1450);

      return () => {
        clearTimeout(midTimer);
        clearTimeout(exitTimer);
        clearTimeout(finishTimer);
      };
    } else {
      setStage('idle');
    }
  }, [isActive]);

  if (!isActive && stage === 'idle') return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col justify-between overflow-hidden">
        {/* Layer 1: Split Tactical Toxic Curtain (Top Half) */}
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: stage === 'exiting' ? '-100%' : '0%' }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[calc(50%+2px)] bg-[#090d0b] border-b-2 border-[#00f59b] relative shadow-[0_0_50px_rgba(0,245,155,0.4)] transform-gpu will-change-transform"
        >
          {/* Subtle diagonal hazard lines */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #00f59b 0, #00f59b 1px, transparent 0, transparent 40%)',
              backgroundSize: '16px 16px',
            }}
          />
        </motion.div>

        {/* Center HUD Telemetry Alert */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{
            opacity: stage === 'midpoint' ? 1 : 0,
            scale: stage === 'midpoint' ? 1 : 0.96,
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center p-4 transform-gpu pointer-events-none"
        >
          <div className="bg-[#090d0b]/95 border border-[#00f59b]/70 backdrop-blur-md px-6 py-4 rounded-xs shadow-[0_0_40px_rgba(0,245,155,0.4)] flex flex-col items-center text-center max-w-sm">
            <div className="flex items-center gap-2 mb-1.5 text-[#00f59b]">
              <Radio className="w-4 h-4 animate-pulse" />
              <span className="font-mono text-xs tracking-widest uppercase font-bold text-[#00f59b]">
                TACTICAL HUD ENGAGED
              </span>
            </div>
            <div className="font-display font-black text-xl text-white tracking-wider uppercase mb-1">
              {targetName}
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#10b981]">
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              <span>CALIBRATING DISPLAY • INITIALIZING PROTOCOL</span>
            </div>

            {/* Fuel gauge simulation bar */}
            <div className="w-full bg-[#16221c] h-1.5 rounded-full mt-3 overflow-hidden border border-[#00f59b]/40">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: stage === 'midpoint' || stage === 'exiting' ? '100%' : '0%' }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#10b981] via-[#00f59b] to-[#34d399] shadow-[0_0_10px_#00f59b]"
              />
            </div>
          </div>
        </motion.div>

        {/* Layer 2: Split Tactical Toxic Curtain (Bottom Half) */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: stage === 'exiting' ? '100%' : '0%' }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[calc(50%+2px)] bg-[#090d0b] border-t-2 border-[#00f59b] relative shadow-[0_0_50px_rgba(0,245,155,0.4)] transform-gpu will-change-transform"
        >
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'repeating-linear-gradient(-45deg, #00f59b 0, #00f59b 1px, transparent 0, transparent 40%)',
              backgroundSize: '16px 16px',
            }}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
