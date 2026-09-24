import React from 'react';
import { Award, CheckCircle2, ExternalLink, Maximize2, FileCheck } from 'lucide-react';
import TechBadge from '../TechBadge';

export default function CertificateCard({ certificate, onPreview }) {
  const {
    title,
    issuer,
    issueDate,
    credentialId,
    credentialUrl,
    skills = [],
    image,
    verified = true,
  } = certificate;

  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E]/60 transition-all duration-300 p-5 sm:p-6 shadow-xs hover:shadow-md dark:hover:shadow-black/50 hover:-translate-y-0.5">
      <div>
        {/* Top Header: Issuer, Verified Badge & Period */}
        <div className="flex items-start justify-between gap-3 pb-3 mb-3.5 border-b border-[#E4E4E7] dark:border-[#242424]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E11D2E]/10 dark:bg-[#E11D2E]/20 border border-[#E11D2E]/30 flex items-center justify-center text-[#E11D2E] shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#09090B] dark:text-white block leading-tight">
                {issuer}
              </span>
              {issueDate && (
                <span className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                  {issueDate}
                </span>
              )}
            </div>
          </div>

          {verified && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0 select-none">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>Verified</span>
            </span>
          )}
        </div>

        {/* Certificate Title */}
        <h4 className="font-['Space_Grotesk',sans-serif] text-base sm:text-lg font-bold text-[#09090B] dark:text-white tracking-tight mb-3 group-hover:text-[#E11D2E] transition-colors line-clamp-2">
          {title}
        </h4>

        {/* Certificate Preview Slot */}
        <div className="relative mb-4 w-full h-44 sm:h-48 rounded-lg overflow-hidden border border-[#E4E4E7] dark:border-[#262626] bg-[#F4F4F5] dark:bg-[#18181A] group/preview">
          {image && image.trim() !== '' ? (
            <>
              <img
                src={image}
                alt={`${title} certificate preview`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-105 cursor-pointer"
                onClick={() => onPreview && onPreview(certificate)}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fb = e.currentTarget.parentElement?.querySelector('.cert-fallback');
                  if (fb) fb.classList.remove('hidden');
                }}
              />
              {/* Fallback container */}
              <div className="cert-fallback hidden absolute inset-0 flex flex-col items-center justify-center p-4 bg-[#F4F4F5] dark:bg-[#181818]">
                <FileCheck className="w-8 h-8 text-[#A1A1AA] mb-2" />
                <span className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
                  Certificate preview available
                </span>
              </div>

              {/* Hover overlay with zoom button */}
              <button
                type="button"
                onClick={() => onPreview && onPreview(certificate)}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5 text-white text-xs font-mono backdrop-blur-[2px] cursor-pointer"
                aria-label="Inspect certificate"
              >
                <Maximize2 className="w-4 h-4 text-[#E11D2E]" />
                <span>View Certificate</span>
              </button>
            </>
          ) : (
            /* Clean Minimal Developer Placeholder when image not yet uploaded */
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center select-none bg-gradient-to-br from-[#FAFAFA] via-[#F4F4F5] to-[#EAEAEA] dark:from-[#18181A] dark:via-[#141416] dark:to-[#0D0D0E] relative">
              <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#FFFFFF08_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF08_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#202024] border border-[#E4E4E7] dark:border-[#333333] flex items-center justify-center text-[#71717A] dark:text-[#A1A1AA] mb-2 shadow-xs">
                  <FileCheck className="w-5 h-5 text-[#E11D2E]" />
                </div>
                <p className="text-xs font-mono text-[#52525B] dark:text-[#A1A1AA] max-w-[210px] leading-relaxed">
                  Sorry, I haven't provided the image yet
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Skills Associated with Certificate */}
        {skills && skills.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono text-[#71717A] mr-1 select-none">skills:</span>
            {skills.map((skill) => (
              <TechBadge key={skill} name={skill} size="sm" />
            ))}
          </div>
        )}
      </div>

      {/* Footer: Credential ID & External Verification Link */}
      <div className="pt-3 border-t border-[#E4E4E7] dark:border-[#242424] flex items-center justify-between gap-2">
        <div className="font-mono text-[11px] text-[#71717A] dark:text-[#A1A1AA] truncate">
          <span className="opacity-70">ID:</span>{' '}
          <span className="text-[#09090B] dark:text-white font-medium">{credentialId || 'VERIFIED'}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {image && (
            <button
              type="button"
              onClick={() => onPreview && onPreview(certificate)}
              className="p-1 rounded-md text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#1E1E1E] transition-colors cursor-pointer"
              title="Zoom certificate image"
              aria-label="Inspect certificate image"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}

          {credentialUrl && (
            <a
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F4F4F5] dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E] text-[11px] font-mono text-[#09090B] dark:text-white hover:text-[#E11D2E] transition-all group/btn shadow-xs"
            >
              <span>Verify</span>
              <ExternalLink className="w-2.5 h-2.5 text-[#E11D2E] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
