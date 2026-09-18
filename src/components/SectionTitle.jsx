import React from 'react';
import TerminalPrompt from './TerminalPrompt';

export default function SectionTitle({ promptCommand, title, subtitle, className = "" }) {
  return (
    <div className={`space-y-3 mb-10 sm:mb-14 ${className}`}>
      {promptCommand && (
        <div>
          <TerminalPrompt command={promptCommand} />
        </div>
      )}
      <div className="flex items-center gap-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-['Space_Grotesk',sans-serif]">
          {title}
        </h2>
        <span className="h-2 w-2 rounded-full bg-[#E11D2E] inline-block" aria-hidden="true" />
      </div>
      {subtitle && (
        <p className="text-sm sm:text-base text-[#A1A1AA] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
