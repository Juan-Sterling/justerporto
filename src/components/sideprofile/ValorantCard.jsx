import React, { useState } from 'react';
import { Copy, Check, Crosshair, Award, Flame, Target, Sparkles, UserPlus } from 'lucide-react';

/**
 * ValorantCard
 * Highlight Utama 01: Valorant Showcase
 * Didesain lebih ekspresif, bebas, berjiwa gamer, dan tidak kaku (Dark & Light mode supported).
 */
export default function ValorantCard({ data }) {
  const [copied, setCopied] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(0);

  const fullRiotId = `${data.riotId}#${data.tagline}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullRiotId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy Riot ID', err);
    }
  };

  const activeAgent = data.signatureAgents[selectedAgent] || data.signatureAgents[0];

  return (
    <div className="relative rounded-lg p-5 sm:p-7 bg-white dark:bg-[#0c120e] border border-[#10b981]/30 dark:border-[#00f59b]/30 shadow-[0_4px_25px_rgba(16,185,129,0.08)] dark:shadow-[0_0_25px_rgba(0,245,155,0.08)] overflow-hidden transition-all duration-300">
      {/* Top Energetic Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10b981] via-[#00f59b] to-[#38bdf8]" />

      {/* Header Bar: Highlight Tag, Game Title, Gamer Badges & Copy ID */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#10b981]/20 dark:border-[#00f59b]/20">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-xs bg-[#10b981]/15 dark:bg-[#00f59b]/20 text-[#065f46] dark:text-[#00f59b]">
              <Sparkles className="w-3 h-3" />
              PRIMARY HIGHLIGHT 01
            </span>
            <span className="text-[11px] font-mono font-semibold text-[#059669] dark:text-[#6ee7b7]">
              TACTICAL FPS
            </span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-[#064e3b] dark:text-white tracking-wide">
            VALORANT: CLUTCH PROTOCOL
          </h3>

          {/* Personality Badges (Tidak Kaku) */}
          <div className="flex items-center gap-2 mt-2 flex-wrap text-xs font-mono">
            <span className="px-2 py-0.5 rounded-xs bg-[#ecfdf5] dark:bg-[#16221c] text-[#065f46] dark:text-[#6ee7b7] border border-[#10b981]/20 dark:border-[#00f59b]/20">
              Tactical Lineup Specialist
            </span>
            <span className="px-2 py-0.5 rounded-xs bg-[#ecfdf5] dark:bg-[#16221c] text-[#065f46] dark:text-[#6ee7b7] border border-[#10b981]/20 dark:border-[#00f59b]/20">
              Vandal Tap Specialist
            </span>
            <span className="px-2 py-0.5 rounded-xs bg-[#ecfdf5] dark:bg-[#16221c] text-[#065f46] dark:text-[#6ee7b7] border border-[#10b981]/20 dark:border-[#00f59b]/20">
              Controller Shotcaller
            </span>
          </div>
        </div>

        {/* Copy Riot ID Button with Gamer Friendly Call-to-action */}
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy Riot ID to Party Up"
          className="group relative self-start lg:self-auto inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xs bg-[#f0fdf4] dark:bg-[#16221c] border border-[#10b981]/40 dark:border-[#00f59b]/40 hover:border-[#059669] dark:hover:border-[#00f59b] text-[#064e3b] dark:text-[#00f59b] text-xs font-mono transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm"
        >
          <UserPlus className="w-4 h-4 text-[#059669] dark:text-[#00f59b] group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <div className="text-[10px] text-zinc-500 dark:text-gray-400">PARTY UP: RIOT ID</div>
            <div className="font-bold text-[#064e3b] dark:text-white tracking-wider text-sm">
              {fullRiotId}
            </div>
          </div>
          {copied ? (
            <Check className="w-4 h-4 text-[#059669] dark:text-[#00f59b] animate-bounce ml-1" />
          ) : (
            <Copy className="w-4 h-4 text-zinc-400 group-hover:text-[#059669] dark:group-hover:text-[#00f59b] ml-1" />
          )}

          {copied && (
            <span className="absolute -top-7 right-0 text-[10px] font-mono bg-[#059669] dark:bg-[#00f59b] text-white dark:text-black font-bold px-2 py-0.5 rounded shadow">
              RIOT ID COPIED!
            </span>
          )}
        </button>
      </div>

      {/* Dynamic Main Body: Left Spotlight Hero / Right Agent Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-5">
        {/* Left Column: Player Card Spotlight (Energetic & Visual) */}
        <div className="lg:col-span-5 p-4 sm:p-5 rounded-xs bg-[#f8fafc] dark:bg-[#131c17] border border-[#10b981]/25 dark:border-[#00f59b]/25 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle glow background */}
          <div
            className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: activeAgent.color || '#00f59b' }}
          />

          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#065f46] dark:text-[#6ee7b7] mb-2">
              <span className="font-bold">COMPETITIVE STANDING</span>
              <span className="px-2 py-0.5 rounded-xs bg-[#10b981]/15 dark:bg-[#00f59b]/15 text-[#059669] dark:text-[#00f59b]">
                {data.primaryRole}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <div className="font-display font-black text-3xl text-[#059669] dark:text-[#00f59b] drop-shadow-[0_0_12px_rgba(0,245,155,0.4)]">
                {data.highestRank}
              </div>
              <span className="text-xs font-mono text-zinc-500 dark:text-gray-400">
                (Peak Performance)
              </span>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-black/5 dark:border-white/5">
              <div>
                <div className="text-[11px] font-mono text-zinc-500 dark:text-gray-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#059669] dark:text-[#00f59b]" />
                  Win Rate
                </div>
                <div className="font-display font-black text-xl text-[#064e3b] dark:text-white mt-0.5">
                  {data.winRate}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-zinc-500 dark:text-gray-400 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-[#059669] dark:text-[#00f59b]" />
                  Headshot %
                </div>
                <div className="font-display font-black text-xl text-[#064e3b] dark:text-white mt-0.5">
                  {data.headshotPct}
                </div>
              </div>
            </div>
          </div>

          {/* Active Agent Highlight Quote */}
          <div className="mt-5 p-3 rounded-xs bg-white dark:bg-[#16221c] border border-[#10b981]/20 dark:border-[#00f59b]/20">
            <div className="text-[11px] font-mono text-zinc-500 dark:text-gray-400">
              Active Agent Focus: <span className="font-bold text-[#064e3b] dark:text-white">{activeAgent.name}</span>
            </div>
            <div className="text-xs italic font-mono text-[#059669] dark:text-[#00f59b] mt-0.5 font-medium">
              "{activeAgent.quote}"
            </div>
          </div>
        </div>

        {/* Right Column: Signature Agents Roster (Interactive & Lively) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-[#064e3b] dark:text-[#00f59b] uppercase">
              AGENT POOL: SIGNATURE ROSTER
            </span>
            <span className="text-zinc-500 dark:text-gray-400 text-[11px]">
              Click agent to preview
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
            {data.signatureAgents.map((agent, index) => {
              const isSelected = selectedAgent === index;
              return (
                <div
                  key={agent.name}
                  onClick={() => setSelectedAgent(index)}
                  className={`p-4 rounded-xs border cursor-pointer transition-all duration-300 flex flex-col justify-between ${isSelected
                      ? 'bg-[#f0fdf4] dark:bg-[#16221c] border-[#059669] dark:border-[#00f59b] shadow-[0_4px_15px_rgba(5,150,105,0.15)] dark:shadow-[0_0_20px_rgba(0,245,155,0.25)] scale-[1.02]'
                      : 'bg-[#f8fafc] dark:bg-[#131c17] border-[#10b981]/20 dark:border-[#00f59b]/20 hover:border-[#10b981]/50 dark:hover:border-[#00f59b]/50'
                    }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-display font-black text-lg text-[#064e3b] dark:text-white">
                        {agent.name}
                      </h4>
                      <span
                        className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded font-semibold"
                        style={{
                          backgroundColor: `${agent.color}20`,
                          color: agent.color,
                        }}
                      >
                        {agent.role}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-zinc-500 dark:text-gray-400">
                      {agent.matches} Matches Played
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500 dark:text-gray-400">Win Rate</span>
                      <span className="font-bold text-[#059669] dark:text-[#00f59b]">
                        {agent.winRate}
                      </span>
                    </div>
                    {/* Visual energy line */}
                    <div className="w-full bg-[#e2e8f0] dark:bg-[#1e2d24] h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: agent.winRate,
                          backgroundColor: agent.color || '#00f59b',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xs bg-[#f0fdf4] dark:bg-[#16221c]/70 border border-[#10b981]/20 dark:border-[#00f59b]/20 flex items-center justify-between text-[11px] font-mono text-zinc-600 dark:text-gray-400">
            <span>Preferred weapons: Vandal (First Bullet Accuracy) & Operator when holding angles.</span>
            <span className="text-[#059669] dark:text-[#00f59b] font-bold">READY TO DUO</span>
          </div>
        </div>
      </div>
    </div>
  );
}
