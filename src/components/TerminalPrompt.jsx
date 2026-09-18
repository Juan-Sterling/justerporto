import React from 'react';

/**
 * TerminalPrompt Component
 * Displays a subtle, authentic terminal prompt as a section indicator or hero cue.
 * Consistent with Code First design principle.
 */
export default function TerminalPrompt({ 
  user = "juan@portfolio:~$", 
  command, 
  showCursor = true,
  className = "" 
}) {
  return (
    <div className={`inline-flex items-center gap-2 font-mono text-xs sm:text-sm px-3 py-1.5 rounded-md bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] shadow-xs select-none ${className}`}>
      <span className="text-[#71717A] dark:text-[#A1A1AA]">{user}</span>
      <span className="text-[#09090B] dark:text-white font-medium">{command}</span>
      {showCursor && (
        <span className="inline-block w-2 h-4 bg-[#E11D2E] animate-pulse rounded-xs" aria-hidden="true" />
      )}
    </div>
  );
}
