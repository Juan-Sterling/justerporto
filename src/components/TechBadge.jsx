import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';

// Fallback dictionary for common technologies that might not be in portfolioData.skills directly
const FALLBACK_ICONS = {
  linux: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
  'cloud computing': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
  cloud: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
  odbc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'open database connectivity (odbc)': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'rest api': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
  api: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  'next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  github: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
};

export function getTechIconUrl(name) {
  if (!name) return null;
  const normalized = name.trim().toLowerCase();

  // 1. Search in portfolioData.skills
  const foundSkill = portfolioData.skills?.find(
    (s) => s.name.trim().toLowerCase() === normalized
  );
  if (foundSkill?.icon) {
    return foundSkill.icon;
  }

  // 2. Check fallback map
  if (FALLBACK_ICONS[normalized]) {
    return FALLBACK_ICONS[normalized];
  }

  // 3. Normalized matching (e.g. 'react' matches 'react.js')
  const partialSkill = portfolioData.skills?.find(
    (s) =>
      s.name.toLowerCase().includes(normalized) ||
      normalized.includes(s.name.toLowerCase())
  );
  if (partialSkill?.icon) {
    return partialSkill.icon;
  }

  return null;
}

export default function TechBadge({ name, size = 'default' }) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const iconUrl = getTechIconUrl(name);
  const isGithub = name.toLowerCase() === 'github';

  const containerSize = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8';
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4 sm:w-4.5 sm:h-4.5';

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Icon Badge */}
      <div
        className={`${containerSize} rounded-md border transition-all duration-200 flex items-center justify-center p-1.5 cursor-pointer ${
          isHovered
            ? 'border-[#E11D2E] bg-white dark:bg-[#1C1C1C] -translate-y-0.5 shadow-md shadow-black/20 dark:shadow-black/70 ring-1 ring-[#E11D2E]/30'
            : 'bg-[#F4F4F5] dark:bg-[#090909] border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E]/60'
        }`}
        aria-label={name}
        title={name}
      >
        {iconUrl && !imgError ? (
          <img
            src={iconUrl}
            alt={name}
            className={`${iconSize} object-contain transition-transform duration-200 ${
              isHovered ? 'scale-110' : ''
            } ${isGithub ? 'dark:invert' : ''}`}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="font-mono text-[10px] font-bold text-[#71717A] dark:text-[#A1A1AA] uppercase">
            {name.slice(0, 2)}
          </span>
        )}
      </div>

      {/* Floating Hover Tooltip */}
      <div
        role="tooltip"
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-[#18181B] border border-[#3F3F46] text-white text-[11px] font-mono rounded shadow-2xl whitespace-nowrap pointer-events-none transition-all duration-200 z-40 flex flex-col items-center ${
          isHovered
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 translate-y-1 invisible'
        }`}
      >
        <span>{name}</span>
        {/* Subtle downward caret */}
        <span className="w-1.5 h-1.5 bg-[#18181B] border-r border-b border-[#3F3F46] transform rotate-45 -mb-1 mt-0.5" />
      </div>
    </div>
  );
}
