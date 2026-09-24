import React, { useState } from 'react';
import { ExternalLink, ImageIcon, ChevronDown } from 'lucide-react';
import TechBadge from './TechBadge';

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

export default function ProjectCard({ project }) {
  const {
    title,
    description,
    technologies = [],
    liveUrl,
    githubUrl,
    period,
    image,
  } = project;

  const [isExpanded, setIsExpanded] = useState(false);
  const isLongDescription = Boolean(description && description.length > 130);

  const effectiveGithubUrl =
    githubUrl || (liveUrl && liveUrl.includes('github.com') ? liveUrl : '');
  const effectiveLiveUrl =
    liveUrl && !liveUrl.includes('github.com') ? liveUrl : '';

  return (
    <div className="group relative rounded-xl bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] p-4 sm:p-5 transition-all duration-300 hover:border-[#D4D4D8] dark:hover:border-[#383838] hover:bg-[#FAFAFA] dark:hover:bg-[#181818] shadow-xs hover:shadow-md dark:hover:shadow-black/50">
      <div className="flex flex-col md:flex-row gap-4 sm:gap-5 items-stretch">
        {/* Left Column: Project Preview Image Slot / Fallback */}
        <div className="w-full md:w-5/12 lg:w-[44%] shrink-0 flex flex-col">
          {image && image.trim() !== '' ? (
            <div className="relative w-full h-40 sm:h-44 md:h-full md:min-h-[200px] rounded-lg overflow-hidden bg-[#F4F4F5] dark:bg-[#1C1C1C] border border-[#E4E4E7] dark:border-[#2A2A2A] group/preview">
              <img
                src={image}
                alt={`${title} preview`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.img-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              {/* Fallback container if image URL fails */}
              <div className="img-fallback hidden absolute inset-0 flex flex-col items-center justify-center p-3 bg-[#F4F4F5] dark:bg-[#181818]">
                <ImageIcon className="w-7 h-7 text-[#A1A1AA] mb-1.5" />
                <span className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                  Image unavailable
                </span>
              </div>

              {/* Quick live link chip on image */}
              {Boolean(effectiveLiveUrl && effectiveLiveUrl.trim()) && (
                <a
                  href={effectiveLiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 hover:bg-[#E11D2E] text-white text-[10px] font-mono backdrop-blur-xs flex items-center gap-1 transition-colors shadow-xs"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ) : (
            /* Clean Minimal Placeholder when image is not yet provided */
            <div className="relative w-full h-40 sm:h-44 md:h-full md:min-h-[200px] rounded-lg overflow-hidden bg-gradient-to-br from-[#FAFAFA] via-[#F4F4F5] to-[#EAEAEA] dark:from-[#18181A] dark:via-[#141416] dark:to-[#0D0D0E] border border-[#E4E4E7] dark:border-[#2A2A2A] p-4 flex flex-col items-center justify-center text-center select-none group/placeholder">
              {/* Subtle developer grid pattern in placeholder */}
              <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#FFFFFF08_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF08_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] pointer-events-none"
                aria-hidden="true"
              />

              {/* Center Graphic & Label */}
              <div className="relative z-10 flex flex-col items-center justify-center py-1">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#1E1E22] border border-[#E4E4E7] dark:border-[#333333] flex items-center justify-center text-[#71717A] dark:text-[#A1A1AA] group-hover/placeholder:text-[#E11D2E] group-hover/placeholder:border-[#E11D2E]/50 group-hover/placeholder:scale-105 transition-all shadow-xs mb-2">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <p className="text-xs font-mono text-[#52525B] dark:text-[#A1A1AA] max-w-[210px] leading-relaxed">
                  Sorry, I haven't provided the image yet
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Project Details, Meta, & Stack */}
        <div className="w-full md:w-7/12 lg:w-[56%] flex flex-col justify-between">
          <div>
            {/* Top Bar: Period & External Action Links */}
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#E4E4E7] dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                {period && (
                  <span className="font-mono text-[11px] text-[#52525B] dark:text-[#A1A1AA] bg-[#F4F4F5] dark:bg-[#090909] px-2 py-0.5 rounded border border-[#E4E4E7] dark:border-[#2A2A2A]">
                    {period}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                {Boolean(effectiveGithubUrl && effectiveGithubUrl.trim()) && (
                  <a
                    href={effectiveGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View GitHub Repository"
                    className="p-1 rounded-md text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#090909] border border-transparent hover:border-[#E4E4E7] dark:border-[#2A2A2A] transition-all"
                    aria-label={`View GitHub repository for ${title}`}
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}

                {Boolean(effectiveLiveUrl && effectiveLiveUrl.trim()) && (
                  <a
                    href={effectiveLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={effectiveLiveUrl}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#F4F4F5] dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E] hover:bg-[#E11D2E]/10 text-[11px] font-mono text-[#09090B] dark:text-white transition-all group/btn shadow-xs max-w-[160px] sm:max-w-[210px]"
                  >
                    <span className="truncate">{effectiveLiveUrl}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-[#E11D2E] shrink-0 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>

            {/* Title & Description */}
            <h4 className="font-['Space_Grotesk',sans-serif] text-base sm:text-lg font-bold text-[#E11D2E] tracking-tight mb-1.5">
              {title}
            </h4>
            <div className="mb-3">
              <p
                className={`text-xs sm:text-[13px] text-[#52525B] dark:text-[#A1A1AA] leading-relaxed transition-all duration-300 ${
                  !isExpanded && isLongDescription ? 'line-clamp-3' : ''
                }`}
              >
                {description}
              </p>

              {isLongDescription && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded((prev) => !prev);
                  }}
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[#E11D2E] hover:text-[#E11D2E]/80 transition-colors cursor-pointer select-none group/more"
                  aria-expanded={isExpanded}
                >
                  <span>{isExpanded ? 'Show less' : 'Read more'}</span>
                  <ChevronDown
                    className={`w-3 h-3 text-[#E11D2E] transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : 'group-hover/more:translate-y-0.5'
                    }`}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Tech Stack Chips */}
          {technologies && technologies.length > 0 && (
            <div className="pt-2.5 border-t border-[#E4E4E7] dark:border-[#2A2A2A]/60 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#71717A] mr-1 select-none">stack:</span>
              {technologies.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
