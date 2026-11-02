import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ImageIcon
} from 'lucide-react';
import TechBadge from '../TechBadge';
import { optimizeCloudinaryUrl } from '../../utils/cloudinary';
import { useSkillModal } from '../../context/SkillModalContext';

function GithubIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { activeSkill } = useSkillModal();

  // Maintain body scroll lock & lenis stop while modal is open, even after nested skill modal closes
  useEffect(() => {
    if (isOpen && !activeSkill) {
      document.body.style.overflow = 'hidden';
      window.__lenis?.stop();
    }
  }, [isOpen, activeSkill]);

  // Handle body scroll locking & keyboard ESC listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        // If skill inspection modal is open on top, let it close first
        if (activeSkill) return;
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
  }, [isOpen, onClose, activeSkill]);

  if (!isOpen || !project) return null;

  const {
    title,
    period,
    description,
    technologies = [],
    liveUrl,
    githubUrl,
    image,
    details = {},
  } = project;

  const effectiveGithubUrl =
    githubUrl || (liveUrl && liveUrl.includes('github.com') ? liveUrl : '');
  const effectiveLiveUrl =
    liveUrl && !liveUrl.includes('github.com') ? liveUrl : '';

  // Extract gallery images or fallback to primary image
  const rawGallery = details.gallery && Array.isArray(details.gallery) ? details.gallery : [];
  const galleryItems =
    rawGallery.length > 0
      ? rawGallery
      : image && image.trim() !== ''
        ? [
          {
            url: image,
            caption: `${title} Overview`,
            description: details.overview || description || 'Project screenshot preview.',
          },
        ]
        : [
          {
            url: '',
            caption: `${title} Preview`,
            description: details.overview || description || 'Image preview to be updated.',
          },
        ];

  const currentGalleryItem = galleryItems[activeImageIndex] || galleryItems[0] || {};
  const hasMultipleImages = galleryItems.length > 1;

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Modal Card Shell */}
      <div
        data-lenis-prevent
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-[#0C0C10] border border-zinc-200 dark:border-[#22222A] shadow-2xl overflow-hidden transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-4 bg-zinc-50/90 dark:bg-[#121217]/90 border-b border-zinc-200 dark:border-[#1E1E26] flex items-center justify-between gap-3 shrink-0">
          <div className="truncate">
            {period && (
              <div className="mb-1">
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-200/60 dark:bg-zinc-800/80 px-2 py-0.5 rounded">
                  {period}
                </span>
              </div>
            )}
            <h3
              id="project-modal-title"
              className="font-display text-base sm:text-xl font-bold text-zinc-900 dark:text-white truncate"
            >
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-4 sm:px-6 py-5 space-y-6 flex-1 overscroll-contain">
          {/* Section 1: Multi-Image Showcase & Detailed Image Captions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">

              {hasMultipleImages && (
                <div className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800">
                  IMAGE {String(activeImageIndex + 1).padStart(2, '0')} OF {String(galleryItems.length).padStart(2, '0')}
                </div>
              )}
            </div>

            {/* Main Image Stage Box */}
            <div className="relative w-full h-56 sm:h-72 md:h-96 rounded-xl overflow-hidden bg-zinc-100 dark:bg-[#15151C] border border-zinc-200 dark:border-[#22222A] flex items-center justify-center group/stage select-none">
              {currentGalleryItem.url && currentGalleryItem.url.trim() !== '' ? (
                <>
                  <img
                    src={optimizeCloudinaryUrl(currentGalleryItem.url)}
                    alt={currentGalleryItem.caption || `${title} screenshot ${activeImageIndex + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain object-center transition-transform duration-300 group-hover/stage:scale-[1.01]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement?.querySelector('.modal-img-fallback');
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />

                  {/* Fallback container if broken URL */}
                  <div className="modal-img-fallback hidden absolute inset-0 flex flex-col items-center justify-center p-4 bg-zinc-100 dark:bg-[#15151C]">
                    <ImageIcon className="w-8 h-8 text-zinc-400 mb-2" />
                    <span className="text-xs font-mono text-zinc-500">Image unavailable</span>
                  </div>
                </>
              ) : (
                /* Minimalist Placeholder when image is not provided yet */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-zinc-50 dark:bg-[#131318]">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1E1E26] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#E11D2E] mb-3 shadow-xs">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
                    Sorry, I haven't provided the image yet
                  </p>
                </div>
              )}

              {/* Prev / Next Stage Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-white/80 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700 shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
                    aria-label="Previous gallery image"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#E11D2E]" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-white/80 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700 shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
                    aria-label="Next gallery image"
                  >
                    <ChevronRight className="w-4 h-4 text-[#E11D2E]" />
                  </button>
                </>
              )}
            </div>

            {/* Dedicated Caption & Detailed Description Box for Active Image */}
            {currentGalleryItem.url && (currentGalleryItem.caption || currentGalleryItem.description) && (
              <div className="rounded-xl p-3.5 sm:p-4 bg-zinc-50 dark:bg-[#13131A] border-l-4 border-l-[#E11D2E] border border-zinc-200 dark:border-[#22222A]">
                {currentGalleryItem.caption && (
                  <h4 className="font-display font-bold text-sm text-zinc-900 dark:text-white mb-1">
                    {currentGalleryItem.caption}
                  </h4>
                )}
                {currentGalleryItem.description && (
                  <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                    {currentGalleryItem.description}
                  </p>
                )}
              </div>
            )}

            {/* Thumbnail Strip (if multiple images) */}
            {hasMultipleImages && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5">
                {galleryItems.map((item, idx) => {
                  const isActive = idx === activeImageIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative shrink-0 w-20 sm:w-24 h-14 sm:h-16 rounded-lg overflow-hidden border transition-all cursor-pointer ${isActive
                          ? 'border-[#E11D2E] ring-2 ring-[#E11D2E]/40'
                          : 'border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100'
                        }`}
                    >
                      {item.url && item.url.trim() !== '' ? (
                        <img
                          src={optimizeCloudinaryUrl(item.url, { width: 180 })}
                          alt={item.caption || `Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-mono text-zinc-500">
                          Thumb {idx + 1}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 2: Overview Description */}
          <div className="space-y-2">
            <h4 className="font-display font-bold text-sm tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#E11D2E] rounded-full" />
              Project Overview
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {(() => {
                const rawOverview = details.overview || description;
                if (Array.isArray(rawOverview)) {
                  return rawOverview.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ));
                }
                if (typeof rawOverview === 'string') {
                  const paragraphs = rawOverview.split(/\n\s*\n/).filter((p) => p.trim() !== '');
                  if (paragraphs.length > 1) {
                    return paragraphs.map((para, idx) => (
                      <p key={idx} className="whitespace-pre-line">{para.trim()}</p>
                    ));
                  }
                  return <p className="whitespace-pre-line">{rawOverview}</p>;
                }
                return null;
              })()}
            </div>
          </div>

          {/* Stacks Section */}
          {technologies && technologies.length > 0 && (
            <div className="pt-2 space-y-2">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Stacks
              </h4>
              <div className="flex flex-wrap items-center gap-1.5">
                {technologies.map((tech) => (
                  <TechBadge key={tech} name={tech} size="sm" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Action Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-zinc-50 dark:bg-[#121217] border-t border-zinc-200 dark:border-[#1E1E26] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {Boolean(effectiveLiveUrl && effectiveLiveUrl.trim()) && (
              <a
                href={effectiveLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#E11D2E] hover:bg-[#FF2A3D] text-white text-xs font-medium transition-all shadow-xs"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {Boolean(effectiveGithubUrl && effectiveGithubUrl.trim()) && (
              <a
                href={effectiveGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-medium border border-zinc-300 dark:border-zinc-700 transition-all shadow-xs"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>View Repository</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-mono transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}