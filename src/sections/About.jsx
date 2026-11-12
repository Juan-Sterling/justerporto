import React, { useCallback, useEffect, useRef, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import AnimatedSection from '../components/AnimatedSection';
import { portfolioData } from '../data/portfolioData';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';
import { useTheme } from '../context/ThemeContext';
import { Home, MapPin, Calendar, Code2, Sparkles, AtSign } from 'lucide-react';

const ICON_MAP = {
  Home,
  MapPin,
  Calendar,
  Code2,
  AtSign,
};

/**
 * Renders the pass portrait with progressive halving on canvas when the source
 * image is much larger than the card slot, preventing browser >4x single-pass
 * downscale aliasing (e.g. moiré and bright speckles along thin high-contrast lines).
 */
function PassPhoto({ src, alt }) {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const [drawnSrc, setDrawnSrc] = useState(null);
  const canvasReady = drawnSrc === src;

  const renderDownscaled = useCallback((img, targetSrc) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.naturalWidth || !img.naturalHeight) return;
    if (img.getAttribute('src') !== targetSrc) return;

    const targetW = 560;
    const targetH = 700;
    const sW = img.naturalWidth;
    const sH = img.naturalHeight;

    if (sW <= targetW * 1.5) return;

    const targetAspect = targetW / targetH;
    const srcAspect = sW / sH;
    let sx = 0;
    let sy = 0;
    let cropW = sW;
    let cropH = sH;

    if (srcAspect > targetAspect) {
      cropW = sH * targetAspect;
      sx = (sW - cropW) / 2;
    } else {
      // Match CSS object-top framing
      cropH = sW / targetAspect;
      sy = 0;
    }

    let curW = Math.round(cropW);
    let curH = Math.round(cropH);
    let sourceEl = img;
    let srcRect = [sx, sy, cropW, cropH];

    while (curW * 0.5 > targetW) {
      const nextW = Math.max(targetW, Math.round(curW * 0.5));
      const nextH = Math.max(targetH, Math.round(curH * 0.5));
      const stepCanvas = document.createElement('canvas');
      stepCanvas.width = nextW;
      stepCanvas.height = nextH;
      const stepCtx = stepCanvas.getContext('2d');
      if (!stepCtx) return;
      stepCtx.imageSmoothingEnabled = true;
      stepCtx.imageSmoothingQuality = 'high';
      stepCtx.drawImage(sourceEl, srcRect[0], srcRect[1], srcRect[2], srcRect[3], 0, 0, nextW, nextH);
      sourceEl = stepCanvas;
      srcRect = [0, 0, nextW, nextH];
      curW = nextW;
      curH = nextH;
    }

    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, targetW, targetH);
    ctx.drawImage(sourceEl, srcRect[0], srcRect[1], srcRect[2], srcRect[3], 0, 0, targetW, targetH);
    setDrawnSrc(targetSrc);
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const rafId = requestAnimationFrame(() => renderDownscaled(img, src));
    return () => cancelAnimationFrame(rafId);
  }, [src, renderDownscaled]);

  return (
    <>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={(e) => renderDownscaled(e.currentTarget, src)}
        className="w-full h-full object-cover object-top"
        loading="eager"
        decoding="async"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full pointer-events-none ${canvasReady ? 'opacity-100' : 'opacity-0'
          }`}
      />
    </>
  );
}

export default function About() {
  const { about } = portfolioData;
  const { isDark } = useTheme();
  const passDetails = about?.passDetails;

  useEffect(() => {
    if (!passDetails?.photo || !passDetails?.photoLight) return;
    const preloadImg = new Image();
    preloadImg.src = isDark ? passDetails.photoLight : passDetails.photo;
  }, [isDark, passDetails?.photo, passDetails?.photoLight]);

  if (!about) return null;

  const { narrative, quickFacts, headline, title, subtitle } = about;
  const activePassPhoto = !isDark && passDetails?.photoLight ? passDetails.photoLight : passDetails?.photo;

  return (
    <section id="about" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title={title || "About Me"}
          subtitle={subtitle || "A backstage look into my background, core focus, and engineering journey."}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start mt-6 sm:mt-10">
          {/* Left Column: The Backstage All-Access ID Pass */}
          <div className="md:col-span-5 flex flex-col items-center">
            <AnimatedSection delay={100} direction="none" gpu={false} className="w-full max-w-[320px] mx-auto">
              {/* Lanyard Strap Slot */}
              <div className="w-16 h-3 mx-auto mb-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center shadow-xs">
                <div className="w-8 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              </div>

              {/* Pass Card Container */}
              <div className="group/pass relative rounded-2xl bg-white dark:bg-[#121318] border border-zinc-200/90 dark:border-zinc-800/90 p-4 sm:p-5 shadow-xl overflow-hidden transition-colors duration-300 hover:border-[#E11D2E]/50 hover:shadow-[0_0_30px_rgba(225,29,46,0.18)]">
                {/* Subtle Ambient Red Glow */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#E11D2E]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Pass Photo Card */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#EAE9E3] dark:bg-[#121318] border border-zinc-200 dark:border-zinc-800">
                  <PassPhoto
                    src={optimizeCloudinaryUrl(activePassPhoto, { width: 600 })}
                    alt={passDetails.name}
                  />

                  {/* Corner Tactical Brackets in Crimson */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#E11D2E] pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#E11D2E] pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#E11D2E] pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#E11D2E] pointer-events-none" />

                  {/* Watermark Tag */}
                  {/* <div className="absolute bottom-2 right-2.5 px-2 py-0.5 rounded bg-black/75 text-[9px] font-mono text-white/90 border border-white/10 uppercase tracking-wider">
                    ACCESS HOLDER
                  </div> */}
                </div>

                {/* Identity Info */}
                <div className="mt-3.5 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900 dark:text-white tracking-tight">
                        {passDetails.name}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                      STAGE ID
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#E11D2E] font-medium tracking-tight">
                    {passDetails.role}
                  </p>
                </div>

                {/* Bottom Barcode Decorative Strip */}
                <div className="mt-4 pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <svg className="h-5 w-28 opacity-75 dark:opacity-60 text-zinc-800 dark:text-zinc-300" viewBox="0 0 120 24" fill="currentColor" aria-hidden="true">
                    <rect x="0" y="0" width="2" height="24" />
                    <rect x="4" y="0" width="1" height="24" />
                    <rect x="7" y="0" width="3" height="24" />
                    <rect x="12" y="0" width="1" height="24" />
                    <rect x="15" y="0" width="2" height="24" />
                    <rect x="19" y="0" width="4" height="24" />
                    <rect x="25" y="0" width="1" height="24" />
                    <rect x="28" y="0" width="2" height="24" />
                    <rect x="32" y="0" width="3" height="24" />
                    <rect x="37" y="0" width="1" height="24" />
                    <rect x="40" y="0" width="2" height="24" />
                    <rect x="44" y="0" width="4" height="24" />
                    <rect x="50" y="0" width="2" height="24" />
                    <rect x="54" y="0" width="1" height="24" />
                    <rect x="57" y="0" width="3" height="24" />
                    <rect x="62" y="0" width="1" height="24" />
                    <rect x="65" y="0" width="2" height="24" />
                    <rect x="69" y="0" width="4" height="24" />
                    <rect x="75" y="0" width="1" height="24" />
                    <rect x="78" y="0" width="3" height="24" />
                    <rect x="83" y="0" width="2" height="24" />
                    <rect x="87" y="0" width="1" height="24" />
                    <rect x="90" y="0" width="4" height="24" />
                    <rect x="96" y="0" width="2" height="24" />
                    <rect x="100" y="0" width="1" height="24" />
                    <rect x="103" y="0" width="3" height="24" />
                    <rect x="108" y="0" width="2" height="24" />
                    <rect x="112" y="0" width="1" height="24" />
                    <rect x="115" y="0" width="3" height="24" />
                  </svg>
                  <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 tracking-wider">
                    ALL · ACCESS
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Narrative Story & Ticket Stub Spec Cards */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-6">
            <AnimatedSection delay={200}>
              {/* Narrative Headline */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white font-display tracking-tight">
                {headline}
              </h3>

              {/* Story Narrative Paragraphs */}
              <div className="mt-4 space-y-3.5 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed border-l-2 border-[#E11D2E]/50 pl-4">
                {narrative.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </AnimatedSection>

            {/* Quick Facts Bento Grid (Ticket Stubs) */}
            <AnimatedSection delay={300}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {quickFacts.map((fact) => {
                  const Icon = ICON_MAP[fact.icon] || Sparkles;
                  return (
                    <div
                      key={fact.label}
                      className="group relative p-3.5 rounded-xl bg-white/70 dark:bg-[#141416]/70 border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[#E11D2E]/50 transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-[#E11D2E]/5 overflow-hidden"
                    >
                      {/* Subtle Corner Glow on Hover */}
                      <div className="absolute top-0 right-0 w-14 h-14 bg-[#E11D2E]/5 rounded-bl-full pointer-events-none group-hover:bg-[#E11D2E]/10 transition-colors" />

                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-[#E11D2E] border border-zinc-200/80 dark:border-zinc-700/60 shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            {fact.label}
                          </span>
                          <span className="block font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white truncate">
                            {fact.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

