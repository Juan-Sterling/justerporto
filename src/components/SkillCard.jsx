import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import { getTechIconUrl } from '../utils/techIcons';

export default function SkillCard({ skill }) {
  const [imgError, setImgError] = useState(false);
  const name = typeof skill === 'string' ? skill : skill.name;
  const icon = (typeof skill === 'object' && skill.icon) ? skill.icon : getTechIconUrl(name);
  const isGithub = name?.toLowerCase() === 'github';

  return (
    <div className="group relative flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-lg bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E]/50 hover:bg-[#FAFAFA] dark:hover:bg-[#181818] transition-all duration-200 hover:-translate-y-0.5 shadow-xs hover:shadow-md dark:hover:shadow-black/40 select-none">
      {/* Glow highlight on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#E11D2E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Tech Logo */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#F4F4F5] dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] group-hover:border-[#CBD5E1] dark:group-hover:border-[#3A3A3A] flex items-center justify-center p-2 mb-2.5 transition-colors shrink-0">
        {!imgError && icon ? (
          <img
            src={icon}
            alt={`${name} logo`}
            className={`w-full h-full object-contain group-hover:scale-110 transition-transform duration-200 ${
              isGithub ? 'dark:invert' : ''
            }`}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <Terminal className="w-5 h-5 text-[#E11D2E]" />
        )}
      </div>

      {/* Skill Name */}
      <h3 className="font-['Space_Grotesk',sans-serif] text-xs sm:text-sm font-semibold text-[#09090B] dark:text-white tracking-tight group-hover:text-[#E11D2E] dark:group-hover:text-white line-clamp-1">
        {name}
      </h3>
    </div>
  );
}
