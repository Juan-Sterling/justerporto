import React, { useState } from 'react';
import { GitCommit, Calendar, Building2, MapPin, ExternalLink } from 'lucide-react';
import TechBadge from './TechBadge';
import { useInView } from '../hooks/useInView';

export default function ExperienceItem({ 
  experience, 
  isLast = false, 
  delay = 0 
}) {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const {
    period,
    position,
    organization,
    location,
    type,
    responsibilities,
    technologies,
    logo = '',
    websiteUrl = '',
  } = experience;

  const [imgError, setImgError] = useState(false);

  return (
    <div 
      ref={ref}
      className="relative pl-6 sm:pl-8 group z-10"
    >
      {/* Timeline Node Dot (Git commit inspired) with spring animation & laser glow bloom */}
      <div 
        className={`absolute left-0 sm:left-1 top-1.5 w-6 h-6 rounded-full bg-white dark:bg-[#090909] flex items-center justify-center text-[#E11D2E] group-hover:border-[#E11D2E] group-hover:ring-4 group-hover:ring-[#E11D2E]/20 group-hover:scale-110 transition-all duration-500 shadow-xs z-10 will-change-transform ${
          isInView
            ? 'border border-[#E11D2E]/60 shadow-[0_0_12px_rgba(225,29,46,0.4)]'
            : 'border border-[#E4E4E7] dark:border-[#2A2A2A]'
        }`}
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'scale(1)' : 'scale(0)',
          transitionDelay: `${delay}ms`,
        }}
        aria-hidden="true"
      >
        <GitCommit className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
      </div>

      {/* Experience Content Box with Bottom-to-Top (translateY) Animation */}
      <div 
        className="rounded-lg bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] p-5 sm:p-6 transition-all duration-700 ease-out hover:border-[#E11D2E]/40 hover:bg-[#FAFAFA] dark:hover:bg-[#181818] hover:-translate-y-1 shadow-xs hover:shadow-md dark:hover:shadow-black/50 mb-8 will-change-transform"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(44px)',
          transitionDelay: `${delay + 60}ms`,
        }}
      >
        {/* Header Metadata with Logo & Link */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 mb-4 border-b border-[#E4E4E7] dark:border-[#2A2A2A]">
          <div className="flex items-start gap-3.5">
            {/* Company Logo Slot */}
            {websiteUrl ? (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F4F4F5] dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#2C2C2C] flex items-center justify-center shrink-0 overflow-hidden hover:border-[#E11D2E]/60 transition-all shadow-xs group/logo"
                title={`Visit ${organization}`}
              >
                {logo && !imgError ? (
                  <img
                    src={logo}
                    alt={organization}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover/logo:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center text-[#71717A] dark:text-[#A1A1AA] group-hover/logo:text-[#E11D2E] transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                )}
              </a>
            ) : (
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F4F4F5] dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#2C2C2C] flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                {logo && !imgError ? (
                  <img
                    src={logo}
                    alt={organization}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain p-1.5"
                  />
                ) : (
                  <div className="flex items-center justify-center text-[#71717A] dark:text-[#A1A1AA]">
                    <Building2 className="w-5 h-5" />
                  </div>
                )}
              </div>
            )}

            <div className="min-w-0">
              <h3 className="font-display text-lg font-bold text-[#09090B] dark:text-white tracking-tight leading-snug">
                {position}
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] mt-1 flex-wrap">
                {websiteUrl ? (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[#09090B] dark:text-[#F4F4F5] hover:text-[#E11D2E] dark:hover:text-[#E11D2E] transition-colors group/org"
                  >
                    <span>{organization}</span>
                    <ExternalLink className="w-3 h-3 text-[#71717A] dark:text-[#A1A1AA] group-hover/org:text-[#E11D2E] transition-colors" />
                  </a>
                ) : (
                  <span className="font-medium text-[#52525B] dark:text-[#D4D4D8]">{organization}</span>
                )}
                {location && (
                  <>
                    <span className="text-[#A1A1AA] dark:text-[#52525B]">•</span>
                    <span className="text-xs text-[#71717A] dark:text-[#A1A1AA] flex items-center gap-1 font-mono">
                      <MapPin className="w-3 h-3 text-[#E11D2E]" />
                      {location}
                    </span>
                  </>
                )}
                {type && (
                  <>
                    <span className="text-[#A1A1AA] dark:text-[#52525B]">•</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#F4F4F5] dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] text-[#52525B] dark:text-[#A1A1AA]">
                      {type}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#52525B] dark:text-[#A1A1AA] bg-[#F4F4F5] dark:bg-[#090909] px-2.5 py-1 rounded border border-[#E4E4E7] dark:border-[#2A2A2A] self-start sm:self-center shrink-0">
            <Calendar className="w-3 h-3 text-[#E11D2E]" />
            <span>{period}</span>
          </div>
        </div>

        {/* Responsibility bullets */}
        <ul className="space-y-2 mb-5">
          {responsibilities.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
              <span className="font-mono text-[#E11D2E] text-xs select-none mt-0.5">&gt;</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Technologies used */}
        <div className="flex flex-wrap items-center gap-2 pt-3.5 border-t border-[#E4E4E7] dark:border-[#2A2A2A]/60">
          <span className="text-[11px] font-mono text-[#71717A] mr-1 select-none">stack:</span>
          {technologies.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>
    </div>
  );
}
