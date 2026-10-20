import React, { useState } from 'react';
import { Gamepad2, Trophy, Clock, Sparkles, Flame, CheckCircle2, Coffee, Layers } from 'lucide-react';

/**
 * OtherGamesCard
 * Komponen Game Showcase Ekstensi (Game Lain di luar 2 Highlight Utama)
 * Dirancang dengan gaya yang bebas, fun, tidak kaku, dan adaptif untuk Dark & Light mode.
 */
export default function OtherGamesCard({ games = [] }) {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Titles' },
    { id: 'completed', label: 'Completed' },
    { id: 'playing', label: 'Active Play' },
    { id: 'casual', label: 'Casual Chill' },
  ];

  const filteredGames = filter === 'all'
    ? games
    : games.filter((g) => g.statusType === filter);

  return (
    <div className="relative rounded-lg p-5 sm:p-6 bg-white dark:bg-[#0c120e] border border-[#10b981]/30 dark:border-[#00f59b]/30 shadow-[0_4px_25px_rgba(16,185,129,0.08)] dark:shadow-[0_0_25px_rgba(0,245,155,0.08)] overflow-hidden transition-all duration-300">
      {/* Top Accent Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10b981] via-[#00f59b] to-[#6366f1]" />

      {/* Header with Title & Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#10b981]/20 dark:border-[#00f59b]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-[#10b981]/15 dark:bg-[#00f59b]/15 border border-[#10b981]/30 dark:border-[#00f59b]/40 flex items-center justify-center text-[#059669] dark:text-[#00f59b] shadow-[0_2px_10px_rgba(16,185,129,0.2)] dark:shadow-[0_0_15px_rgba(0,245,155,0.25)]">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded-xs bg-[#10b981]/15 dark:bg-[#00f59b]/20 text-[#065f46] dark:text-[#00f59b] font-bold">
                BEYOND HIGHLIGHTS
              </span>
              <span className="text-[11px] font-mono text-[#065f46] dark:text-[#6ee7b7]">
                GAMING VAULT & ADVENTURES
              </span>
            </div>
            <h3 className="font-display font-black text-xl text-[#064e3b] dark:text-white tracking-wide mt-0.5">
              OTHER FAVORITE GAMES
            </h3>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#f0fdf4] dark:bg-[#16221c] p-1 rounded-sm border border-[#10b981]/30 dark:border-[#00f59b]/30 self-start sm:self-auto flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              type="button"
              className={`px-3 py-1 text-xs font-mono font-bold transition-all duration-200 rounded-xs cursor-pointer ${filter === cat.id
                  ? 'bg-[#059669] dark:bg-[#00f59b] text-white dark:text-black shadow-xs'
                  : 'text-zinc-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Other Games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="group relative rounded-sm bg-[#f8fafc] dark:bg-[#131c17] border border-[#10b981]/25 dark:border-[#00f59b]/25 hover:border-[#059669] dark:hover:border-[#00f59b] overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md dark:shadow-none dark:hover:shadow-[0_0_20px_rgba(0,245,155,0.2)] flex flex-col justify-between"
          >
            {/* Top Cover Banner */}
            <div className="relative h-36 w-full overflow-hidden bg-black/40">
              <img
                src={game.coverUrl}
                alt={game.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-2.5 left-2.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#090d0b]/90 text-[#00f59b] border border-[#00f59b]/40 backdrop-blur-xs">
                  {game.statusType === 'completed' && <Trophy className="w-3 h-3 text-amber-400" />}
                  {game.statusType === 'playing' && <Flame className="w-3 h-3 text-emerald-400" />}
                  {game.statusType === 'casual' && <Coffee className="w-3 h-3 text-indigo-400" />}
                  <span>{game.status}</span>
                </span>
              </div>

              {/* Platform Tag */}
              <div className="absolute top-2.5 right-2.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-xs bg-black/70 text-gray-200 border border-white/20 backdrop-blur-xs">
                  {game.platform}
                </span>
              </div>

              {/* Bottom Title on Image */}
              <div className="absolute bottom-2.5 left-3 right-3">
                <h4 className="font-display font-black text-lg text-white group-hover:text-[#00f59b] transition-colors drop-shadow">
                  {game.title}
                </h4>
                <p className="text-[11px] font-mono text-zinc-300">
                  {game.category} • {game.playtime}
                </p>
              </div>
            </div>

            {/* Info Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                {/* Vibe / Mood */}
                <div className="inline-block text-[11px] font-mono italic text-[#059669] dark:text-[#6ee7b7] mb-1.5 font-medium">
                  "{game.vibe}"
                </div>

                {/* Personal Notes */}
                <p className="text-xs font-mono text-zinc-600 dark:text-gray-400 leading-relaxed">
                  {game.notes}
                </p>
              </div>

              {/* Build / Playstyle Tag */}
              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-500 dark:text-gray-400 truncate max-w-[190px]">
                  Build: {game.favoriteBuild}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-xs bg-[#10b981]/15 dark:bg-[#00f59b]/15 text-[#065f46] dark:text-[#00f59b] border border-[#10b981]/25 dark:border-[#00f59b]/25 shrink-0">
                  {game.badge}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
