import React, { useState } from 'react';
import { Terminal } from 'lucide-react';

export default function SkillCard({ skill }) {
  const [imgError, setImgError] = useState(false);
  const { name, icon } = skill;

  return (
    <div className="group relative flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-lg bg-[#141414] border border-[#2A2A2A] hover:border-[#E11D2E]/50 hover:bg-[#181818] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 select-none">
      {/* Glow highlight on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#E11D2E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Tech Logo */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#090909] border border-[#2A2A2A] group-hover:border-[#3A3A3A] flex items-center justify-center p-2 mb-2.5 transition-colors shrink-0">
        {!imgError && icon ? (
          <img
            src={icon}
            alt={`${name} logo`}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <Terminal className="w-5 h-5 text-[#E11D2E]" />
        )}
      </div>

      {/* Skill Name */}
      <h3 className="font-['Space_Grotesk',sans-serif] text-xs sm:text-sm font-semibold text-white tracking-tight group-hover:text-white line-clamp-1">
        {name}
      </h3>
    </div>
  );
}
