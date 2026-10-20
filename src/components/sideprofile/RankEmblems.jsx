import React from 'react';

/**
 * ValorantAscendantBadge
 * Visual emblem taktis terinspirasi rank Ascendant Valorant (Emerald Crystal Facets).
 */
export function ValorantAscendantBadge({ className = "w-14 h-14", tier = "2" }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(0,245,155,0.5)]"
      >
        <defs>
          <linearGradient id="ascendantEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#00f59b" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="facetHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00f59b" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#ascendantEmerald)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="animate-spin-slow opacity-60"
        />

        <polygon
          points="50,12 84,32 84,68 50,88 16,68 16,32"
          fill="#062e20"
          stroke="url(#ascendantEmerald)"
          strokeWidth="2.5"
        />

        <polygon
          points="50,16 50,50 20,40 18,34"
          fill="#059669"
          opacity="0.75"
        />

        <polygon
          points="50,16 82,34 80,40 50,50"
          fill="url(#ascendantEmerald)"
          opacity="0.9"
        />

        <polygon
          points="50,50 80,66 50,84 20,66"
          fill="#047857"
          opacity="0.85"
        />

        <polygon
          points="50,28 66,50 50,72 34,50"
          fill="url(#facetHighlight)"
          stroke="#00f59b"
          strokeWidth="1.5"
        />

        <path
          d="M40 50 L50 40 L60 50"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M42 58 L50 50 L58 58"
          stroke="#00f59b"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#064e3b] border border-[#00f59b] text-[#00f59b] text-[10px] font-mono font-black flex items-center justify-center shadow-[0_0_8px_#00f59b]">
        {tier}
      </span>
    </div>
  );
}

/**
 * MlbbGloryBadge
 * Visual emblem taktis terinspirasi rank Mythical Glory MLBB (Golden Winged Crest & Orbit Stars).
 */
export function MlbbGloryBadge({ className = "w-14 h-14", stars = "78" }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_14px_rgba(245,158,11,0.5)]"
      >
        <defs>
          <linearGradient id="gloryGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <radialGradient id="gloryCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#gloryGold)"
          strokeWidth="1.2"
          strokeDasharray="6 4"
          className="animate-spin-slow opacity-60"
        />

        <path
          d="M50 35 C35 22 14 30 10 52 C15 58 26 58 35 52 L50 62 Z"
          fill="url(#gloryGold)"
          opacity="0.8"
        />

        <path
          d="M50 35 C65 22 86 30 90 52 C85 58 74 58 65 52 L50 62 Z"
          fill="url(#gloryGold)"
          opacity="0.95"
        />

        <polygon
          points="50,18 64,36 78,54 50,86 22,54 36,36"
          fill="url(#gloryCore)"
          stroke="url(#gloryGold)"
          strokeWidth="2"
        />

        <polygon
          points="50,34 54,44 64,44 56,50 59,60 50,54 41,60 44,50 36,44 46,44"
          fill="#ffffff"
          stroke="#f59e0b"
          strokeWidth="1"
          className="drop-shadow-[0_0_6px_#fbbf24]"
        />

        <circle cx="50" cy="12" r="2.5" fill="#fef08a" />
        <circle cx="38" cy="18" r="1.8" fill="#f59e0b" />
        <circle cx="62" cy="18" r="1.8" fill="#f59e0b" />
      </svg>

      <span className="absolute -bottom-1 -right-1 px-1.5 h-5 rounded-full bg-[#451a03] border border-amber-400 text-amber-300 text-[10px] font-mono font-black flex items-center justify-center shadow-[0_0_8px_#f59e0b]">
        {stars}★
      </span>
    </div>
  );
}
