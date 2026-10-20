import React, { useState } from 'react';
import { Copy, Check, Trophy, Sparkles, Star } from 'lucide-react';

/**
 * MlbbCard
 * Highlight Utama 02: Mobile Legends: Bang Bang Showcase
 * Didesain lebih ekspresif, bebas, berjiwa gamer, dan tidak kaku (Dark & Light mode supported).
 */
export default function MlbbCard({ accounts = [] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedId, setCopiedId] = useState(false);

  const activeAccount = accounts[activeTab] || accounts[0];
  const fullIdString = `${activeAccount.id} (${activeAccount.zoneId})`;

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(`${activeAccount.id} (${activeAccount.zoneId})`);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch (err) {
      console.error('Failed to copy ID', err);
    }
  };

  return (
    <div className="relative rounded-lg p-5 sm:p-7 bg-white dark:bg-[#0c120e] border border-[#10b981]/30 dark:border-[#00f59b]/30 shadow-[0_4px_25px_rgba(16,185,129,0.08)] dark:shadow-[0_0_25px_rgba(0,245,155,0.08)] overflow-hidden transition-all duration-300">
      {/* Top Energetic Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00f59b] to-[#10b981]" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#10b981]/20 dark:border-[#00f59b]/20">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-xs bg-[#10b981]/15 dark:bg-[#00f59b]/20 text-[#065f46] dark:text-[#00f59b]">
              <Sparkles className="w-3 h-3" />
              PRIMARY HIGHLIGHT 02
            </span>
            <span className="text-[11px] font-mono font-semibold text-[#059669] dark:text-[#6ee7b7]">
              MOBA ARENA
            </span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-[#064e3b] dark:text-white tracking-wide">
            MOBILE LEGENDS: RANKED BATTLES
          </h3>

          {/* Personality Badges (Bebas & Fun) */}
          <div className="flex items-center gap-2 mt-2 flex-wrap text-xs font-mono">
            <span className="px-2 py-0.5 rounded-xs bg-[#ecfdf5] dark:bg-[#16221c] text-[#065f46] dark:text-[#6ee7b7] border border-[#10b981]/20 dark:border-[#00f59b]/20">
              Kagura Umbrella Artist
            </span>
            <span className="px-2 py-0.5 rounded-xs bg-[#ecfdf5] dark:bg-[#16221c] text-[#065f46] dark:text-[#6ee7b7] border border-[#10b981]/20 dark:border-[#00f59b]/20">
              Peak Mythical Glory
            </span>
            <span className="px-2 py-0.5 rounded-xs bg-[#ecfdf5] dark:bg-[#16221c] text-[#065f46] dark:text-[#6ee7b7] border border-[#10b981]/20 dark:border-[#00f59b]/20">
              68% Winrate Demon
            </span>
          </div>
        </div>

        {/* Account Switcher Tabs */}
        <div className="flex items-center bg-[#f0fdf4] dark:bg-[#16221c] p-1 rounded-sm border border-[#10b981]/30 dark:border-[#00f59b]/30 self-start lg:self-auto">
          {accounts.map((acc, index) => (
            <button
              key={acc.id}
              onClick={() => setActiveTab(index)}
              type="button"
              className={`px-3.5 py-1.5 text-xs font-mono font-bold transition-all duration-200 rounded-xs cursor-pointer ${activeTab === index
                  ? 'bg-[#059669] dark:bg-[#00f59b] text-white dark:text-black shadow-[0_2px_8px_rgba(5,150,105,0.3)] dark:shadow-[0_0_12px_rgba(0,245,155,0.5)]'
                  : 'text-zinc-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
            >
              {acc.accountType}
            </button>
          ))}
        </div>
      </div>

      {/* Account Info Pill & Copy Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-4 p-3.5 rounded-xs bg-[#f8fafc] dark:bg-[#131c17] border border-[#10b981]/25 dark:border-[#00f59b]/25">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#10b981]/20 dark:bg-[#00f59b]/20 flex items-center justify-center text-[#059669] dark:text-[#00f59b] font-bold font-mono text-base border border-[#10b981]/40 dark:border-[#00f59b]/40">
            {activeAccount.ign.slice(0, 1)}
          </div>
          <div>
            <div className="text-[11px] text-zinc-500 dark:text-gray-400 font-mono">ACTIVE IN-GAME NAME</div>
            <div className="font-display font-black text-lg text-[#064e3b] dark:text-white">
              {activeAccount.ign}
            </div>
          </div>
        </div>

        {/* Copy ID Button */}
        <button
          onClick={handleCopyId}
          type="button"
          title="Click to copy MLBB ID & Zone"
          className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xs bg-[#f0fdf4] dark:bg-[#16221c] border border-[#10b981]/30 dark:border-[#00f59b]/30 hover:border-[#059669] dark:hover:border-[#00f59b] text-[#065f46] dark:text-[#00f59b] text-xs font-mono transition-all cursor-pointer shadow-xs"
        >
          <span className="text-zinc-500 dark:text-gray-400">ID:</span>
          <span className="font-bold text-[#064e3b] dark:text-white tracking-wider">{fullIdString}</span>
          {copiedId ? (
            <Check className="w-3.5 h-3.5 text-[#059669] dark:text-[#00f59b] animate-bounce" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#059669] dark:group-hover:text-[#00f59b]" />
          )}
          {copiedId && (
            <span className="absolute -top-7 right-0 text-[10px] font-mono bg-[#059669] dark:bg-[#00f59b] text-white dark:text-black font-bold px-2 py-0.5 rounded shadow">
              MLBB ID COPIED!
            </span>
          )}
        </button>
      </div>

      {/* Grid: Best Hero Showcase (MVP style) & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-4">
        {/* MVP Best Hero Card */}
        <div className="lg:col-span-7 p-5 rounded-xs bg-[#f8fafc] dark:bg-[#131c17] border border-[#10b981]/30 dark:border-[#00f59b]/30 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-xs bg-[#10b981]/15 dark:bg-[#00f59b]/20 text-[#065f46] dark:text-[#00f59b]">
                SIGNATURE HERO: MVP SPECIALIST
              </span>
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                {activeAccount.bestHero.badge}
              </span>
            </div>

            <div className="flex items-baseline justify-between mt-3">
              <div>
                <h4 className="font-display font-black text-3xl text-[#064e3b] dark:text-white">
                  {activeAccount.bestHero.name}
                </h4>
                <p className="text-xs font-mono text-[#059669] dark:text-[#6ee7b7] mt-0.5 font-medium">
                  Role: {activeAccount.bestHero.role} • Signature Mid Lane Shotcaller
                </p>
              </div>
              <div className="text-right">
                <div className="font-display font-black text-3xl text-[#059669] dark:text-[#00f59b] drop-shadow-[0_0_10px_rgba(0,245,155,0.4)]">
                  {activeAccount.bestHero.wr}
                </div>
                <div className="text-xs font-mono text-zinc-500 dark:text-gray-400">
                  {activeAccount.bestHero.matchCount} Matches Verified
                </div>
              </div>
            </div>

            {/* Glowing progress line */}
            <div className="w-full bg-[#d1fae5] dark:bg-[#1e2d24] h-2 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#10b981] to-[#00f59b] shadow-[0_0_10px_#00f59b]"
                style={{ width: activeAccount.bestHero.wr }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-black/5 dark:border-white/5 text-center text-xs font-mono">
            <div className="p-2 rounded bg-white dark:bg-[#16221c] border border-black/5 dark:border-white/5">
              <div className="text-[10px] text-zinc-500 dark:text-gray-400">PEAK RANK</div>
              <div className="font-bold text-[#064e3b] dark:text-[#00f59b] text-xs sm:text-sm mt-0.5 truncate">
                {activeAccount.rank}
              </div>
            </div>
            <div className="p-2 rounded bg-white dark:bg-[#16221c] border border-black/5 dark:border-white/5">
              <div className="text-[10px] text-zinc-500 dark:text-gray-400">OVERALL WR</div>
              <div className="font-bold text-[#064e3b] dark:text-white text-xs sm:text-sm mt-0.5">
                {activeAccount.overallWr}
              </div>
            </div>
            <div className="p-2 rounded bg-white dark:bg-[#16221c] border border-black/5 dark:border-white/5">
              <div className="text-[10px] text-zinc-500 dark:text-gray-400">TOTAL MATCHES</div>
              <div className="font-bold text-[#064e3b] dark:text-white text-xs sm:text-sm mt-0.5">
                {activeAccount.totalMatches}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements / Tournament Honors */}
        <div className="lg:col-span-5 p-5 rounded-xs bg-[#f8fafc] dark:bg-[#131c17] border border-[#10b981]/30 dark:border-[#00f59b]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-amber-500 dark:text-[#00f59b]" />
              <span className="text-xs font-mono font-bold tracking-wider text-[#064e3b] dark:text-[#00f59b] uppercase">
                HONORS & MILESTONES
              </span>
            </div>

            <div className="space-y-2.5">
              {activeAccount.achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xs bg-white dark:bg-[#16221c] border border-[#10b981]/20 dark:border-[#00f59b]/15 text-xs font-mono text-zinc-700 dark:text-gray-300"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#059669] dark:text-[#00f59b] shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded-xs bg-[#f0fdf4] dark:bg-[#16221c]/70 border border-[#10b981]/20 dark:border-[#00f59b]/20 text-[11px] font-mono text-zinc-600 dark:text-gray-400">
            Open for ranked 5-man squad lobbies & weekend competitive scrims!
          </div>
        </div>
      </div>
    </div>
  );
}
