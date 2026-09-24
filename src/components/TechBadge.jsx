import React, { useState } from 'react';
import { getTechIconUrl } from '../utils/techIcons';
import { useSkillModal } from '../context/SkillModalContext';

export { getTechIconUrl };

export default function TechBadge({ name, size = 'default' }) {
  const { openSkillModal } = useSkillModal();
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const iconUrl = getTechIconUrl(name);
  const isGithub = name.toLowerCase() === 'github';

  const containerSize = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8';
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4 sm:w-4.5 sm:h-4.5';

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    openSkillModal(name);
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View architectural details for ${name}`}
    >
      {/* Icon Badge */}
      <div
        className={`${containerSize} rounded-md border transition-all duration-200 flex items-center justify-center p-1.5 cursor-pointer select-none active:scale-90 ${
          isHovered
            ? 'border-[#E11D2E] bg-white dark:bg-[#1C1C1C] -translate-y-0.5 shadow-md shadow-black/20 dark:shadow-black/70 ring-1 ring-[#E11D2E]/30'
            : 'bg-[#F4F4F5] dark:bg-[#090909] border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E]/60'
        }`}
        title={`Click to view details for ${name}`}
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
