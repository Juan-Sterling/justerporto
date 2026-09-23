import React from 'react';
import { getTechIconUrl } from '../../utils/techIcons';
import { Terminal, ArrowUpRight } from 'lucide-react';

export default function SkillBentoCard({
  skill,
  isSelected,
  onClick,
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
      className={`group relative flex flex-col justify-start p-3 sm:p-3.5 rounded-xl border transition-all duration-200 text-left select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E11D2E]/50 ${
        isSelected
          ? 'bg-white dark:bg-[#1A1A1A] border-[#E11D2E] ring-1 ring-[#E11D2E] shadow-md shadow-[#E11D2E]/10'
          : 'bg-white dark:bg-[#121212] hover:bg-[#FAFAFA] dark:hover:bg-[#181818] border-[#E4E4E7] dark:border-[#242424] hover:border-[#E11D2E]/60 dark:hover:border-[#E11D2E]/60 shadow-xs hover:shadow-md hover:shadow-[#E11D2E]/5'
      }`}
    >
      {/* Top Header: Logo + Arrow affordance */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#F4F4F5] dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#2C2C2C] p-1.5 flex items-center justify-center shrink-0 group-hover:border-[#E11D2E]/40 transition-colors">
          {iconUrl ? (
            <img
              src={iconUrl}
              alt=""
              className={`w-full h-full object-contain ${
                isGithub ? 'dark:invert' : ''
              }`}
              loading="lazy"
            />
          ) : (
            <Terminal className="w-4 h-4 text-[#71717A] dark:text-[#A1A1AA]" />
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {isSelected && (
            <span className="w-2 h-2 rounded-full bg-[#E11D2E] animate-pulse" />
          )}
          <ArrowUpRight className="w-3.5 h-3.5 text-[#A1A1AA] dark:text-[#52525B] group-hover:text-[#E11D2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>

      {/* Body: Title and Role */}
      <div>
        <h4 className="font-['Space_Grotesk',sans-serif] font-bold text-sm sm:text-[15px] text-[#09090B] dark:text-white group-hover:text-[#E11D2E] transition-colors leading-tight">
          {skill.name}
        </h4>
        <p className="text-[11px] sm:text-xs text-[#71717A] dark:text-[#A1A1AA] line-clamp-2 leading-relaxed mt-1">
          {skill.role}
        </p>
      </div>
    </div>
  );
}
