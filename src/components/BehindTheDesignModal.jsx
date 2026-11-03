import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ImageIcon } from 'lucide-react';

/**
 * Primary 3-color palette definition.
 * Pure CSS presentation without requiring external images.
 */
const COLOR_PALETTES = [
  {
    name: 'Laser Crimson',
    hex: '#E11D2E',
    role: 'Signature Accent & Energy',
    swatchBg: 'bg-[#E11D2E]',
    swatchBorder: 'border-[#E11D2E]/40',
    swatchText: 'text-white',
    description:
      'Captures BABYMONSTER’s fierce stage presence, calibrated to #E11D2E to drive interactive highlights, active states, and the iconic horn motif without overwhelming the eyes.',
  },
  {
    name: 'Deep Obsidian',
    hex: '#07080B',
    role: 'Dark Canvas & Foundation',
    swatchBg: 'bg-[#07080B]',
    swatchBorder: 'border-zinc-700/60 dark:border-zinc-800',
    swatchText: 'text-white',
    description:
      "Adapted from the group's dark aesthetic and tuned to #07080B instead of pure black, reducing screen eye strain while allowing crimson accents and typography to pop with sharp clarity",
  },
  {
    name: 'Off-White',
    hex: '#FAFAFA',
    role: 'Light Canvas & Clean Surface',
    swatchBg: 'bg-[#FAFAFA]',
    swatchBorder: 'border-zinc-300 dark:border-zinc-700',
    swatchText: 'text-zinc-950',
    description:
      'Balances the intense dark and red tones using #FAFAFA to prevent harsh screen glare, serving as a clean primary canvas in light mode and crisp text in dark mode',
  },
];

/**
 * Visual design breakdown elements (with image placeholders).
 * To insert your images, replace the empty string in the `image` field with
 * your local asset path (e.g., '/images/design/navbar-concept.png') or an image URL.
 */
const DESIGN_ELEMENTS = [
  {
    id: 'navbar',
    number: '02',
    tag: 'HORNED GEOMETRY',
    title: 'The Horned Silhouette: Emblem and Navigation',
    description:
      "Both the custom personal emblem and the floating navigation bar take direct inspiration from BABYMONSTER’s iconic horned logo. The sharp, upward-angled edges on the top-left and top-right corners of the navbar translate the group's signature monster motif into a functional UI frame, giving the interface an unmistakable visual identity right from the top of the screen.",
    image: '', // Put your image path or URL here
    imageAlt: 'Horned navbar frame inspiration and design breakdown',
    placeholderLabel: 'Navbar Horn Frame Asset',
  },
  {
    id: 'portal',
    number: '03',
    tag: 'THE PORTAL',
    title: 'Portal "O" and Dynamic Kinetic Wipes',
    description:
      'Directly inspired by the unique shape of the letter "O" in BABYMONSTER, this central motif serves as the welcoming portal and anchors the screen transition geometry',
    image: '', // Put your image path or URL here
    imageAlt: 'Portal O and transition inspiration breakdown',
    placeholderLabel: 'Portal "O" and Transition Asset',
  },
];

export default function BehindTheDesignModal({ isOpen, onClose }) {
  // Lock body scroll and pause Lenis while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.__lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent
      aria-labelledby="behind-design-title"
      className="fixed inset-0 z-[120] flex items-center justify-center p-2.5 sm:p-4 md:p-6"
    >
      {/* Lightweight Backdrop: optimized for low-end GPUs without heavy blur lag */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs transition-opacity duration-200 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container Shell */}
      <div
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl lg:max-w-3xl max-h-[92dvh] sm:max-h-[88vh] flex flex-col rounded-xl sm:rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-[#27272A] text-zinc-900 dark:text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(225,29,46,0.18)] overflow-hidden z-10 transform-gpu will-change-[transform,opacity] animate-scaleUp"
      >
        {/* Top Crimson Laser Horizon Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E11D2E] to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-4 py-3.5 sm:px-6 sm:pt-6 sm:pb-4 border-b border-zinc-200 dark:border-[#1F1F23] shrink-0 bg-white/95 dark:bg-[#0B0C10]/95 transition-colors">
          <div>
            {/* <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#E11D2E] uppercase">
              Design Case Study
            </span> */}
            <h2
              id="behind-design-title"
              className="mt-0.5 sm:mt-1 font-display text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight"
            >
              Behind the Design: The Monster Aesthetic
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 sm:p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div
          data-lenis-prevent
          style={{ WebkitOverflowScrolling: 'touch' }}
          className="overflow-y-auto flex-1 min-h-0 overscroll-contain px-4 py-4 sm:px-6 sm:py-6 space-y-5 sm:space-y-6 text-zinc-700 dark:text-[#D4D4D8]"
        >
          {/* Section 1: Philosophy Card */}
          <section className="space-y-2 p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-zinc-50 dark:bg-[#14151B]/70 border border-zinc-200 dark:border-[#27272A]/80 transition-colors">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-semibold text-[#E11D2E] tracking-wider uppercase">
                Philosophy
              </span>
              {/* <span className="text-zinc-400 dark:text-[#3F3F46]">·</span>
              <span className="font-mono text-[11px] sm:text-xs text-zinc-500 dark:text-[#A1A1AA]">
                Bold, High-Voltage, and Unapologetic
              </span> */}
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-wide">
              Why BABYMONSTER?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A1A1AA] leading-relaxed">
              As a proud MONSTIEZ (the official fandom of BABYMONSTER), I built this portfolio around the group’s fierce, high-energy aesthetic and their defining reputation as true "all-rounders." Just as every member effortlessly masters vocals, rap, and razor-sharp performance without being confined to a single role, I bring that exact same all-rounder mentality to the IT world as a full-stack developer. Rather than limiting myself to one side of the screen, I thrive across the entire technology stack by architecting complex, high-performance backend systems with the same precision and intensity that I pour into crafting dynamic, expressive frontend experiences.            </p>
          </section>

          {/* Section 2: Technical Execution and Visual Breakdown */}
          <section className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-1.5 border-b border-zinc-200 dark:border-[#1F1F23]">
              <h3 className="font-display text-sm sm:text-base font-bold text-zinc-900 dark:text-white tracking-wide">
                Technical Execution and Visual Breakdown
              </h3>
              <span className="font-mono text-[11px] sm:text-xs text-[#E11D2E]">
                Translating Visual Identity into Clean Architecture
              </span>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {/* Item 01: The 3 Primary Color Palettes (No Image Needed) */}
              <div className="rounded-lg sm:rounded-xl bg-white dark:bg-[#14151B] border border-zinc-200 dark:border-[#27272A] overflow-hidden transition-all duration-200 hover:border-zinc-300 dark:hover:border-[#3F3F46] p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="space-y-0.5">
                    <div className="inline-block px-2 py-0.5 rounded-xs font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-white/90 dark:bg-[#0A0B0E]/85 text-[#E11D2E] border border-[#E11D2E]/30">
                      01 · COLOR PALETTE
                    </div>
                    <h4 className="font-display text-sm sm:text-base font-bold text-zinc-900 dark:text-white tracking-wide">
                      The Triad: Red, Black, and White
                    </h4>
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500 dark:text-[#71717A]">
                    Primary Identity Colors
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A1A1AA] leading-relaxed">
                  Rooted in BABYMONSTER’s iconic color scheme, this core triad of red, black, and white uses custom-tuned hex values tailored specifically for digital screen performance. Vibrant crimson drives interactive energy, deep obsidian anchors the dark layout, and soft off-white ensures effortless readability across both light and dark themes.                </p>

                {/* 3 Color Swatches Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {COLOR_PALETTES.map((palette) => (
                    <div
                      key={palette.hex}
                      className="rounded-lg bg-zinc-50 dark:bg-[#0B0C10] border border-zinc-200 dark:border-[#27272A] p-3 space-y-2.5 transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700"
                    >
                      {/* Swatch Pill with Hex */}
                      <div
                        className={`h-11 rounded-md ${palette.swatchBg} ${palette.swatchText} border ${palette.swatchBorder} flex items-center justify-between px-3 shadow-xs`}
                      >
                        <span className="font-mono text-xs font-bold tracking-wider">
                          {palette.hex}
                        </span>
                        <span className="font-mono text-[9px] tracking-wider uppercase opacity-85">
                          SWATCH
                        </span>
                      </div>

                      {/* Swatch Info */}
                      <div className="space-y-1">
                        <div className="flex items-baseline justify-between gap-1">
                          <span className="font-display text-xs sm:text-[13px] font-bold text-zinc-900 dark:text-white">
                            {palette.name}
                          </span>
                        </div>
                        <div className="font-mono text-[10px] text-[#E11D2E] font-medium uppercase tracking-wide">
                          {palette.role}
                        </div>
                        <p className="text-[11px] text-zinc-500 dark:text-[#8E8E93] leading-normal pt-0.5">
                          {palette.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items 02 & 03: Visual Assets with Image Containers */}
              {DESIGN_ELEMENTS.map((element) => (
                <div
                  key={element.id}
                  className="rounded-lg sm:rounded-xl bg-white dark:bg-[#14151B] border border-zinc-200 dark:border-[#27272A] overflow-hidden transition-all duration-200 hover:border-zinc-300 dark:hover:border-[#3F3F46]"
                >
                  {/* Visual Asset Container (Image or Lightweight Placeholder) */}
                  <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full bg-zinc-100 dark:bg-[#0E0F14] border-b border-zinc-200 dark:border-[#27272A] flex items-center justify-center overflow-hidden">
                    {element.image ? (
                      <img
                        src={element.image}
                        alt={element.imageAlt || element.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
                      />
                    ) : (
                      /* Clean Minimal Placeholder matching ProjectCard */
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center select-none bg-gradient-to-br from-zinc-50 via-zinc-100/70 to-zinc-200/50 dark:from-[#16161E] dark:via-[#121217] dark:to-[#0B0B0E] relative">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-[#1E1E26] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#E11D2E] mb-2 shadow-xs">
                          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 max-w-[240px] leading-relaxed">
                          Sorry, I haven't provided the image yet
                        </p>
                      </div>
                    )}

                    {/* Tag Badge Overlay */}
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 py-0.5 rounded-xs font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-white/90 dark:bg-[#0A0B0E]/85 backdrop-blur-xs text-[#E11D2E] border border-[#E11D2E]/30 shadow-xs">
                      {element.number} · {element.tag}
                    </div>
                  </div>

                  {/* Text Description */}
                  <div className="p-3.5 sm:p-5 space-y-1">
                    <h4 className="font-display text-sm sm:text-base font-bold text-zinc-900 dark:text-white tracking-wide">
                      {element.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A1A1AA] leading-relaxed">
                      {element.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-4 py-3 sm:px-6 sm:py-3.5 border-t border-zinc-200 dark:border-[#1F1F23] bg-zinc-50 dark:bg-[#0E0F14] shrink-0 transition-colors">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 sm:py-2 rounded-lg font-mono text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-[#1F1F23] dark:hover:bg-[#27272A] border border-zinc-900 dark:border-[#3F3F46] hover:border-zinc-700 dark:hover:border-[#52525B] transition-colors cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
