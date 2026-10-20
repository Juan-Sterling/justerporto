import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Music,
  ExternalLink,
  ListMusic,
  Radio,
  PlayCircle,
  Layers,
} from 'lucide-react';

/**
 * Normalizes any Spotify URL format into the official Spotify Embed URL
 */
function formatSpotifyEmbedUrl(url) {
  if (!url) {
    return 'https://open.spotify.com/embed/playlist/0ctaoVZ8zeP9UNIfuOhNWX?utm_source=generator&theme=0';
  }

  if (url.includes('/embed/')) {
    return url.includes('utm_source=generator')
      ? url
      : `${url}${url.includes('?') ? '&' : '?'}utm_source=generator&theme=0`;
  }

  const match = url.match(
    /spotify\.com\/(playlist|album|track|artist)\/([a-zA-Z0-9]+)/
  );
  if (match) {
    const [, type, id] = match;
    return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
  }

  const uriMatch = url.match(
    /spotify:(playlist|album|track|artist):([a-zA-Z0-9]+)/
  );
  if (uriMatch) {
    const [, type, id] = uriMatch;
    return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
  }

  return url;
}

/**
 * Extracts raw Spotify URL for direct external app opening
 */
function getRawSpotifyUrl(url) {
  if (!url) return 'https://open.spotify.com';
  if (url.includes('/embed/')) {
    return url.replace('/embed/', '/').split('?')[0];
  }
  return url.split('?')[0];
}

/**
 * SpotifySoundstage Component
 * Features:
 * - Scalable multi-playlist support (easily add 1, 3, 5, 10+ public playlists)
 * - Full-width dedicated Spotify Soundstage console
 * - Instant playlist tab switching with Motion animations
 * - Direct "Open in Spotify App" button for the currently selected playlist
 * - Clean 100% English tactical HUD layout without redundant cards or broken track listeners
 */
export default function SpotifySoundstage({ musicData = {} }) {
  // Normalize playlists list
  const playlists = musicData.playlists && musicData.playlists.length > 0
    ? musicData.playlists
    : [
      {
        id: 'kpop-main',
        title: musicData.playlistTitle || 'KPOP',
        curator: 'Juan Sterling',
        description: musicData.playlistDescription || 'High energy K-pop hits and power anthems.',
        url: musicData.spotifyPlaylistUrl || 'https://open.spotify.com/playlist/0ctaoVZ8zeP9UNIfuOhNWX?si=5d4d9496077447ef',
        badge: 'Main Rotation',
      },
    ];

  const [activePlaylistIndex, setActivePlaylistIndex] = useState(0);
  const activePlaylist = playlists[activePlaylistIndex] || playlists[0];

  const [iframeLoading, setIframeLoading] = useState(true);

  const activeUrl = activePlaylist.url || 'https://open.spotify.com/playlist/0ctaoVZ8zeP9UNIfuOhNWX';
  const embedUrl = formatSpotifyEmbedUrl(activeUrl);
  const externalSpotifyLink = getRawSpotifyUrl(activeUrl);

  const handleSelectPlaylist = (idx) => {
    if (idx === activePlaylistIndex) return;
    setIframeLoading(true);
    setActivePlaylistIndex(idx);
  };

  return (
    <div className="relative rounded-lg p-5 sm:p-7 bg-white/95 dark:bg-[#0c120e]/95 backdrop-blur-md border border-[#10b981]/30 dark:border-[#00f59b]/35 shadow-[0_4px_25px_rgba(16,185,129,0.08)] dark:shadow-[0_0_25px_rgba(0,245,155,0.08)] overflow-hidden transition-all duration-300">
      {/* Tactical Top Bar Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10b981] via-[#00f59b] to-[#1db954]" />

      {/* Header — 100% English, No '//' */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#10b981]/20 dark:border-[#00f59b]/20">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-sm bg-[#1db954]/15 border border-[#1db954]/30 flex items-center justify-center text-[#1db954] shadow-[0_2px_12px_rgba(29,185,84,0.25)]">
            <Music className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-xs bg-[#1db954]/15 text-[#1db954] font-bold">
                SPOTIFY SOUNDSTAGE
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-xs bg-zinc-100 dark:bg-[#16221c] text-zinc-600 dark:text-gray-400 font-semibold flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#1db954]" />
                {playlists.length} PUBLIC {playlists.length === 1 ? 'PLAYLIST' : 'PLAYLISTS'}
              </span>
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-[#064e3b] dark:text-white tracking-wide mt-1">
              SPOTIFY SOUNDSTAGE — PUBLIC PLAYLISTS
            </h3>
          </div>
        </div>
      </div>

      {/* Multi-Playlist Selector Bar (Easily scales to 5, 10+ playlists) */}
      <div className="pt-5 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-zinc-600 dark:text-gray-300 flex items-center gap-1.5">
            <ListMusic className="w-4 h-4 text-[#1db954]" />
            SELECT PLAYLIST ROTATION ({activePlaylistIndex + 1}/{playlists.length}):
          </span>
          <span className="text-[11px] font-mono text-zinc-500 dark:text-gray-400 hidden sm:block">
            Click any tab to load playlist
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
          {playlists.map((pl, idx) => {
            const isSelected = activePlaylistIndex === idx;
            return (
              <button
                key={pl.id || idx}
                type="button"
                onClick={() => handleSelectPlaylist(idx)}
                className={`group relative px-4 py-2 rounded-xs text-xs font-mono font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 border ${isSelected
                    ? 'border-[#1db954] text-white dark:text-black shadow-[0_2px_10px_rgba(29,185,84,0.3)]'
                    : 'border-black/10 dark:border-white/10 bg-zinc-100/80 dark:bg-[#16221c]/80 text-zinc-700 dark:text-gray-300 hover:border-[#1db954]/50 hover:text-black dark:hover:text-white'
                  }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeSpotifyPlaylist"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="absolute inset-0 rounded-xs bg-[#1db954] -z-1"
                  />
                )}
                <span className="tracking-wide">{pl.title}</span>
                {pl.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-xs font-semibold ${isSelected
                        ? 'bg-black/20 text-white dark:text-black'
                        : 'bg-zinc-200/90 dark:bg-zinc-800 text-zinc-600 dark:text-gray-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200'
                      }`}
                  >
                    {pl.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Playlist Details Strip */}
      <div className="mt-2 mb-4 p-4 rounded-lg bg-zinc-50 dark:bg-[#121c16] border border-[#10b981]/20 dark:border-[#00f59b]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#00f59b] font-bold">
              NOW ACTIVE
            </span>
            <span className="text-zinc-400 dark:text-zinc-600 text-xs">•</span>
            <span className="text-xs font-mono text-zinc-500 dark:text-gray-400">
              {activePlaylist.curator ? `Curated by ${activePlaylist.curator}` : 'Public Playlist'}
            </span>
          </div>
          <h4 className="font-display font-black text-lg sm:text-xl text-[#064e3b] dark:text-white truncate mt-0.5">
            {activePlaylist.title}
          </h4>
          {activePlaylist.description && (
            <p className="text-xs font-mono text-zinc-600 dark:text-gray-400 mt-1 line-clamp-2">
              {activePlaylist.description}
            </p>
          )}
        </div>

        {/* Direct Action: Open in Spotify */}
        <a
          href={externalSpotifyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xs bg-[#1db954] hover:bg-[#1aa34a] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_2px_12px_rgba(29,185,84,0.3)] hover:shadow-[0_4px_20px_rgba(29,185,84,0.5)] shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <Music className="w-4 h-4" />
          <span>Open in Spotify App</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Full-Width Interactive Spotify Embed Player */}
      <div className="relative w-full rounded-lg overflow-hidden border border-black/15 dark:border-white/10 bg-black/5 dark:bg-black/60 shadow-lg min-h-[440px] sm:min-h-[460px]">
        {/* Loading Skeleton */}
        {iframeLoading && (
          <div className="absolute inset-0 bg-zinc-100 dark:bg-[#0c120e] flex flex-col items-center justify-center gap-3 z-10 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full border-2 border-[#1db954] border-t-transparent animate-spin" />
            <span className="text-xs font-mono text-zinc-500 dark:text-gray-400 tracking-wider">
              LOADING SPOTIFY SOUNDSTAGE...
            </span>
          </div>
        )}

        <iframe
          key={activeUrl}
          src={embedUrl}
          width="100%"
          height="450"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={`Spotify Playlist: ${activePlaylist.title}`}
          onLoad={() => setIframeLoading(false)}
          className="w-full relative z-0 block rounded-lg min-h-[440px] sm:min-h-[460px]"
        />
      </div>

      {/* Tactical Footnote HUD */}
      <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-zinc-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-3.5 h-3.5 text-[#1db954] shrink-0" />
          <span>Click any track in the player to stream directly. Log in to Spotify for full unmuted tracks.</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 text-[#059669] dark:text-[#00f59b] font-semibold">
          <Radio className="w-3.5 h-3.5" />
          <span>SPOTIFY CLOUD SYNC ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
