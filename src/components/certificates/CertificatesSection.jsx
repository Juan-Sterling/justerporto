import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Maximize2, 
  FileCheck, 
  ChevronRight, 
  ShieldCheck, 
  GraduationCap, 
  Calendar,
  Sparkles,
  Download,
  X
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import TechBadge from '../TechBadge';

export default function CertificatesSection() {
  const certificates = portfolioData.certificates || [];
  const [selectedId, setSelectedId] = useState(certificates[0]?.id || '');
  const [previewCert, setPreviewCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Active certificate object
  const activeCert = certificates.find((c) => c.id === selectedId) || certificates[0];

  const handleOpenPreview = (cert) => {
    setPreviewCert(cert);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalOpen(true);
      });
    });
  };

  const handleClosePreview = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setPreviewCert(null);
    }, 200);
  };

  // Keyboard navigation & body scroll locking for lightbox
  useEffect(() => {
    if (!previewCert) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClosePreview();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previewCert]);

  // Helper to get category icon
  const getIssuerIcon = (category = '') => {
    if (category.toLowerCase().includes('academic') || category.toLowerCase().includes('dean')) {
      return <GraduationCap className="w-4 h-4 text-[#E11D2E]" />;
    }
    return <Award className="w-4 h-4 text-[#E11D2E]" />;
  };

  return (
    <div className="pt-10 sm:pt-14 border-t border-[#E4E4E7] dark:border-[#2A2A2A]/70">
      {/* Section Sub-Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E11D2E] animate-pulse" />
            <span className="text-xs font-mono text-[#E11D2E] uppercase tracking-wider font-semibold">
              // Spotlight Showcase
            </span>
          </div>
          <h3 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-bold text-[#09090B] dark:text-white tracking-tight">
            Certifications & Honors
          </h3>
          <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] mt-1.5 max-w-2xl leading-relaxed">
            A collection of certificates and honors that I have earned throughout my journey.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] text-xs font-mono text-[#52525B] dark:text-[#A1A1AA] shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>
            <strong className="text-[#09090B] dark:text-white font-semibold">{certificates.length}</strong> Verified Credentials
          </span>
        </div>
      </div>

      {/* Split 2-Panel Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Master List Index (5 Cols on Desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#71717A] dark:text-[#A1A1AA] px-1 mb-1">
            <span>INDEX ({certificates.length})</span>
            <span className="text-[11px] text-[#E11D2E]">Click to inspect</span>
          </div>

          {certificates.map((cert, index) => {
            const isSelected = cert.id === activeCert?.id;
            return (
              <button
                key={cert.id}
                type="button"
                onClick={() => setSelectedId(cert.id)}
                className={`w-full text-left relative p-4 rounded-xl transition-all duration-200 cursor-pointer border group ${
                  isSelected
                    ? 'bg-white dark:bg-[#151518] border-[#E11D2E] shadow-md dark:shadow-black/50 ring-1 ring-[#E11D2E]/25'
                    : 'bg-white/60 dark:bg-[#121214]/60 border-[#E4E4E7] dark:border-[#242426] hover:border-[#E11D2E]/40 hover:bg-white dark:hover:bg-[#161619]'
                }`}
              >
                {/* Active Indicator Bar */}
                <div
                  className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-colors ${
                    isSelected ? 'bg-[#E11D2E]' : 'bg-transparent group-hover:bg-[#E11D2E]/30'
                  }`}
                />

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Index Number & Icon */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                        isSelected
                          ? 'bg-[#E11D2E]/15 border-[#E11D2E]/30 text-[#E11D2E]'
                          : 'bg-[#F4F4F5] dark:bg-[#1A1A1D] border-[#E4E4E7] dark:border-[#2A2A2E] text-[#71717A] dark:text-[#A1A1AA] group-hover:text-[#E11D2E]'
                      }`}
                    >
                      {getIssuerIcon(cert.category)}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase font-semibold text-[#E11D2E] tracking-wider truncate">
                          {cert.category || 'Credential'}
                        </span>
                        <span className="text-[10px] font-mono text-[#71717A] dark:text-[#888891]">
                          • {cert.issueDate}
                        </span>
                      </div>

                      <h4
                        className={`text-sm font-semibold tracking-tight transition-colors line-clamp-2 ${
                          isSelected
                            ? 'text-[#09090B] dark:text-white'
                            : 'text-[#3F3F46] dark:text-[#D4D4D8] group-hover:text-[#09090B] dark:group-hover:text-white'
                        }`}
                      >
                        {cert.title}
                      </h4>

                      <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] truncate mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Right Chevron & Verified Check */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0 self-center">
                    {cert.verified && (
                      <span className="p-1 rounded-full text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" title="Verified by Issuer">
                        <CheckCircle2 className="w-3 h-3" />
                      </span>
                    )}
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isSelected
                          ? 'text-[#E11D2E] translate-x-0.5'
                          : 'text-[#A1A1AA] dark:text-[#52525B] group-hover:text-[#E11D2E] group-hover:translate-x-0.5'
                      }`}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Spotlight Detail Panel (7 Cols on Desktop) */}
        <div className="lg:col-span-7">
          {activeCert && (
            <div className="sticky top-24 rounded-2xl bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#27272A] p-5 sm:p-7 shadow-xl dark:shadow-black/60 transition-all duration-300">
              
              {/* Spotlight Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#E4E4E7] dark:border-[#222226]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-[#E11D2E]/10 text-[#E11D2E] border border-[#E11D2E]/25">
                    {activeCert.category || 'Specialized Credential'}
                  </span>
                  <span className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
                    {activeCert.issueDate}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {activeCert.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>Verified</span>
                    </span>
                  )}
                  {activeCert.image && (
                    <button
                      type="button"
                      onClick={() => handleOpenPreview(activeCert)}
                      className="p-1.5 rounded-lg text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#202024] transition-colors cursor-pointer"
                      title="Inspect full resolution"
                      aria-label="Inspect certificate fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Title & Issuer */}
              <div className="mb-4">
                <h4 className="font-['Space_Grotesk',sans-serif] text-xl sm:text-2xl font-bold text-[#09090B] dark:text-white tracking-tight leading-snug">
                  {activeCert.title}
                </h4>
                <div className="flex items-center gap-2 mt-1.5 text-xs sm:text-sm font-medium text-[#52525B] dark:text-[#A1A1AA]">
                  <span>Issued by {activeCert.issuer}</span>
                </div>
              </div>

              {/* Certificate Preview Image Slot */}
              <div className="relative mb-5 w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-[#E4E4E7] dark:border-[#26262B] bg-[#F4F4F5] dark:bg-[#0D0D10] group/preview">
                {activeCert.image && activeCert.image.trim() !== '' ? (
                  <>
                    <img
                      src={activeCert.image}
                      alt={`${activeCert.title} preview`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-105 cursor-pointer"
                      onClick={() => handleOpenPreview(activeCert)}
                    />
                    <button
                      type="button"
                      onClick={() => handleOpenPreview(activeCert)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white text-xs font-mono backdrop-blur-[2px] cursor-pointer"
                    >
                      <Maximize2 className="w-4 h-4 text-[#E11D2E]" />
                      <span>Inspect Certificate Fullscreen</span>
                    </button>
                  </>
                ) : (
                  /* Developer Blueprint Placeholder */
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-br from-[#FAFAFA] via-[#F4F4F5] to-[#EAEAEA] dark:from-[#131316] dark:via-[#0F0F12] dark:to-[#0A0A0C] relative">
                    <div
                      className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#FFFFFF08_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF08_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] pointer-events-none"
                      aria-hidden="true"
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center py-1">
                      <div className="w-11 h-11 rounded-xl bg-white dark:bg-[#1E1E22] border border-[#E4E4E7] dark:border-[#33333A] flex items-center justify-center text-[#71717A] dark:text-[#A1A1AA] mb-2.5 shadow-xs">
                        <FileCheck className="w-5 h-5 text-[#E11D2E]" />
                      </div>
                      <p className="text-xs sm:text-sm font-mono text-[#52525B] dark:text-[#A1A1AA] max-w-[240px] leading-relaxed text-center">
                        Sorry, I haven't provided the image yet
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {activeCert.description && (
                <div className="mb-5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#888891] block mb-1.5">
                    Curriculum & Scope
                  </span>
                  <p className="text-xs sm:text-sm text-[#3F3F46] dark:text-[#D4D4D8] leading-relaxed">
                    {activeCert.description}
                  </p>
                </div>
              )}

              {/* Verified Stack / Competencies */}
              {activeCert.skills && activeCert.skills.length > 0 && (
                <div className="mb-6 pt-4 border-t border-[#E4E4E7] dark:border-[#222226]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#888891] block mb-2">
                    Verified Competencies (Click to inspect)
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {activeCert.skills.map((skill) => (
                      <TechBadge key={skill} name={skill} size="sm" />
                    ))}
                  </div>
                </div>
              )}

              {/* Spotlight Footer Bar: Verification Action */}
              <div className="pt-4 border-t border-[#E4E4E7] dark:border-[#222226] flex items-center justify-end">
                {activeCert.credentialUrl ? (
                  <a
                    href={activeCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E11D2E] hover:bg-[#E11D2E]/90 text-white text-xs font-mono font-semibold transition-all shadow-xs group"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Official Institutional Honor</span>
                  </span>
                )}
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Lightbox Preview Modal (Full resolution theater mode) */}
      {previewCert &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${previewCert.title} full preview`}
            className={`fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm transition-opacity duration-200 ease-out ${
              isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={handleClosePreview}
          >
            <div
              className={`w-full max-w-4xl rounded-2xl bg-[#0F0F12] border border-[#2D2D35] overflow-hidden shadow-2xl shadow-black/80 flex flex-col max-h-[92vh] transition-all duration-200 transform ${
                isModalOpen
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 translate-y-3'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="px-5 py-3.5 bg-[#141418] border-b border-[#24242A] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-7 h-7 rounded-md bg-[#E11D2E]/20 text-[#E11D2E] border border-[#E11D2E]/30 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-sm font-semibold text-white truncate leading-tight">
                      {previewCert.title}
                    </h4>
                    <p className="text-[11px] font-mono text-[#A1A1AA] truncate">
                      {previewCert.issuer} • {previewCert.issueDate}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClosePreview}
                  className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  aria-label="Close certificate preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Image Body */}
              <div className="p-3 sm:p-5 flex items-center justify-center bg-[#09090B] overflow-auto flex-1 min-h-[300px]">
                {previewCert.image ? (
                  <img
                    src={previewCert.image}
                    alt={previewCert.title}
                    className="max-h-[65vh] w-auto object-contain rounded-lg border border-[#26262B] shadow-lg"
                  />
                ) : (
                  <div className="p-12 text-center text-[#71717A] font-mono text-sm">
                    Sorry, I haven't provided the image yet
                  </div>
                )}
              </div>

              {/* Modal Bottom Bar */}
              <div className="px-5 py-3 bg-[#141418] border-t border-[#24242A] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="text-[#A1A1AA] truncate flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-white font-medium">Verified by {previewCert.issuer}</span>
                </div>

                <div className="flex items-center gap-2">
                  {previewCert.image && (
                    <a
                      href={previewCert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-[#E11D2E]" />
                      <span>Original</span>
                    </a>
                  )}

                  {previewCert.credentialUrl && (
                    <a
                      href={previewCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E11D2E] hover:bg-[#E11D2E]/90 text-white font-semibold transition-colors shadow-xs"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={handleClosePreview}
                    className="px-3 py-1.5 rounded-lg text-[#A1A1AA] hover:text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
