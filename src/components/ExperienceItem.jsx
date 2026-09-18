import React from 'react';
import { GitCommit, Calendar, Building2 } from 'lucide-react';
import TechBadge from './TechBadge';

export default function ExperienceItem({ experience, isLast = false }) {
  const {
    period,
    position,
    organization,
    type,
    responsibilities,
    technologies,
  } = experience;

  return (
    <div className="relative pl-6 sm:pl-8 group">
      {/* Timeline vertical line */}
      {!isLast && (
        <div 
          className="absolute left-[11px] sm:left-[15px] top-6 bottom-0 w-[1px] bg-[#2A2A2A] group-hover:bg-[#3A3A3A] transition-colors" 
          aria-hidden="true" 
        />
      )}

      {/* Timeline Node Dot (Git commit inspired) */}
      <div 
        className="absolute left-0 sm:left-1 top-1.5 w-6 h-6 rounded-full bg-[#090909] border border-[#2A2A2A] flex items-center justify-center text-[#E11D2E] group-hover:border-[#E11D2E] group-hover:ring-4 group-hover:ring-[#E11D2E]/20 group-hover:scale-110 transition-all duration-300"
        aria-hidden="true"
      >
        <GitCommit className="w-3.5 h-3.5" />
      </div>

      {/* Experience Content Box */}
      <div className="rounded-lg bg-[#141414] border border-[#2A2A2A] p-5 sm:p-6 transition-all duration-300 group-hover:border-[#E11D2E]/40 group-hover:bg-[#181818] group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-black/50 mb-8">
        {/* Header Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-3 mb-4 border-b border-[#2A2A2A]">
          <div>
            <h3 className="font-['Space_Grotesk',sans-serif] text-lg font-bold text-white tracking-tight">
              {position}
            </h3>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#A1A1AA] mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-[#E11D2E]" />
              <span className="font-medium text-[#D4D4D8]">{organization}</span>
              {type && (
                <>
                  <span className="text-[#52525B]">•</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#090909] border border-[#2A2A2A] text-[#A1A1AA]">
                    {type}
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#A1A1AA] bg-[#090909] px-2.5 py-1 rounded border border-[#2A2A2A] self-start sm:self-center">
            <Calendar className="w-3 h-3 text-[#E11D2E]" />
            <span>{period}</span>
          </div>
        </div>

        {/* Responsibility bullets */}
        <ul className="space-y-2 mb-5">
          {responsibilities.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              <span className="font-mono text-[#E11D2E] text-xs select-none mt-0.5">&gt;</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Technologies used */}
        <div className="flex flex-wrap items-center gap-2 pt-3.5 border-t border-[#2A2A2A]/60">
          <span className="text-[11px] font-mono text-[#71717A] mr-1 select-none">stack:</span>
          {technologies.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>
    </div>
  );
}
