import React, { useState } from 'react';
import { ExternalLink, ImageIcon, Eye, ArrowUpRight } from 'lucide-react';
import TechBadge from './TechBadge';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

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

export default function ProjectCard({ 
  project, 
  onOpenDetail,
  isExpanded: _controlledExpanded, 
  onToggleExpand: _onToggleExpand 
}) {
  const {
    title,
    description,
    technologies = [],
    liveUrl,
    githubUrl,
    period,
    image,
  } = project;

  const [imgError, setImgError] = useState(false);

  const effectiveGithubUrl =
    githubUrl || (liveUrl && liveUrl.includes('github.com') ? liveUrl : '');
  const effectiveLiveUrl =
    liveUrl && !liveUrl.includes('github.com') ? liveUrl : '';

  const handleCardClick = () => {
    if (onOpenDetail) {
      onOpenDetail(project);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative rounded-xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-[#24242C] p-4 sm:p-5 transition-all duration-200 hover:border-[#E11D2E] dark:hover:border-[#E11D2E] hover:shadow-lg cursor-pointer select-none overflow-hidden"
    >
      {/* Top Bar: Period Badge & Action Links */}
      <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-zinc-200/80 dark:border-[#22222A]">
        <div>
          {period ? (
            <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-[#1A1A22] px-2.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800">
              {period}
            </span>
          ) : (
            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase">
              Project
            </span>
          )}
        </div>

        {/* Quick Action Links */}
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {Boolean(effectiveGithubUrl && effectiveGithubUrl.trim()) && (
            <a
              href={effectiveGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View GitHub Repository"
              className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#1A1A22] border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer"
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
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-[#1A1A22] border border-zinc-200 dark:border-zinc-800 hover:border-[#E11D2E] hover:bg-[#E11D2E]/10 text-[11px] font-mono text-zinc-900 dark:text-white transition-all group/btn shadow-xs max-w-[140px] sm:max-w-[190px] cursor-pointer"
            >
              <span className="truncate">{effectiveLiveUrl}</span>
              <ExternalLink className="w-2.5 h-2.5 text-[#E11D2E] shrink-0 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 sm:gap-5 items-stretch">
        {/* Left Column: Visual Showcase Preview */}
        <div className="w-full md:w-5/12 lg:w-[44%] shrink-0">
          <div className="relative w-full h-44 sm:h-48 md:h-[200px] rounded-lg overflow-hidden bg-zinc-100 dark:bg-[#16161E] border border-zinc-200 dark:border-[#22222A] group/preview flex items-center justify-center">
            {image && image.trim() !== '' && !imgError ? (
              <>
                <img
                  src={optimizeCloudinaryUrl(image)}
                  alt={`${title} preview`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/preview:scale-105"
                  onError={() => setImgError(true)}
                />
                
                {/* Subtle Vignette on Dark Mode */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover/preview:opacity-20 transition-opacity" />

                {/* Detail Peek Overlay */}
                <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white text-xs font-mono">
                  <div className="px-3 py-1.5 rounded-full bg-[#E11D2E] text-white flex items-center gap-1.5 shadow-md font-semibold tracking-wide">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </div>
                </div>
              </>
            ) : (
              /* Clean Minimal Placeholder */
              <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center select-none bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 dark:from-[#16161E] dark:via-[#121217] dark:to-[#0B0B0E] relative">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1E1E26] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#E11D2E] mb-2 shadow-xs group-hover:scale-105 transition-transform">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 max-w-[210px] leading-relaxed">
                  Sorry, I haven't provided the image yet
                </p>
                <div className="mt-2 text-[10px] font-mono text-[#E11D2E] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to inspect details
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Title, Description & Tech Stack */}
        <div className="w-full md:w-7/12 lg:w-[56%] flex flex-col justify-between">
          <div>
            {/* Title */}
            <h4 className="font-display text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-[#E11D2E] transition-colors mb-2">
              {title}
            </h4>

            {/* Description Clamped to 3 lines */}
            <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-3">
              {description}
            </p>
          </div>

          <div>
            {/* Tech Stack Chips */}
            {technologies && technologies.length > 0 && (
              <div className="pt-2.5 border-t border-zinc-200/80 dark:border-[#22222A] flex flex-wrap items-center gap-1.5 mb-3">
                <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 mr-1 select-none">
                  stack:
                </span>
                {technologies.slice(0, 5).map((tech) => (
                  <TechBadge key={tech} name={tech} size="sm" />
                ))}
                {technologies.length > 5 && (
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                    +{technologies.length - 5}
                  </span>
                )}
              </div>
            )}

            {/* Card Footer: Detail Trigger Button */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                Click card for full details
              </span>

              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#E11D2E] group-hover:translate-x-1 transition-transform">
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}