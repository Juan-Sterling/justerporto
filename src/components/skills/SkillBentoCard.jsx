import React from 'react';
import { getTechIconUrl } from '../../utils/techIcons';
import { Terminal, ArrowUpRight } from 'lucide-react';

export default function SkillBentoCard({
  skill,
  isSelected,
  onClick,
  delay = 0,
  isInView = true,
}) {
  const iconUrl = getTechIconUrl(skill.name);
  const isGithub = skill.name.toLowerCase() === 'github';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
        transitionDelay: `${delay}ms`,
      }}
      className={`group relative flex flex-col justify-start p-3 sm:p-3.5 rounded-xl border transition-all duration-500 ease-out text-left select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E11D2E]/50 overflow-hidden hover:-translate-y-1 active:scale-[0.98] will-change-transform ${
        isSelected
          ? 'bg-white dark:bg-[#1A1A1A] border-[#E11D2E] ring-1 ring-[#E11D2E] shadow-md shadow-[#E11D2E]/15'
          : 'bg-white dark:bg-[#121212] hover:bg-[#FAFAFA] dark:hover:bg-[#181818] border-[#E4E4E7] dark:border-[#242424] hover:border-[#E11D2E]/60 dark:hover:border-[#E11D2E]/60 shadow-xs hover:shadow-lg hover:shadow-[#E11D2E]/10'
      }`}
    >
      {/* Light sheen shimmer sweep on hover */}
      <div 
        className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-[#E11D2E]/10 to-transparent -rotate-45 translate-x-[-130%] group-hover:translate-x-[130%] transition-transform duration-1000 ease-out" 
        aria-hidden="true" 
      />

      {/* Top Header: Logo + Arrow affordance */}
      <div className="flex items-start justify-between gap-2 mb-2.5 relative z-10">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#F4F4F5] dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#2C2C2C] p-1.5 flex items-center justify-center shrink-0 group-hover:border-[#E11D2E]/60 group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(225,29,46,0.25)] transition-all duration-300">
          {iconUrl ? (
            <img
              src={iconUrl}
              alt=""
              className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 ${
                isGithub ? 'dark:invert' : ''
              }`}
              loading="lazy"
            />
          ) : (
            <Terminal className="w-4 h-4 text-[#71717A] dark:text-[#A1A1AA] group-hover:text-[#E11D2E] transition-colors" />
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <ArrowUpRight className="w-3.5 h-3.5 text-[#A1A1AA] dark:text-[#52525B] group-hover:text-[#E11D2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </div>
      </div>

      {/* Body: Title and Role */}
      <div className="relative z-10">
        <h4 className="font-display font-bold text-sm sm:text-[15px] text-[#09090B] dark:text-white group-hover:text-[#E11D2E] transition-colors duration-200 leading-tight">
          {skill.name}
        </h4>
        <p className="text-[11px] sm:text-xs text-[#71717A] dark:text-[#A1A1AA] line-clamp-2 leading-relaxed mt-1 group-hover:text-[#3F3F46] dark:group-hover:text-[#D4D4D8] transition-colors">
          {skill.role}
        </p>
      </div>
    </div>
  );
}
