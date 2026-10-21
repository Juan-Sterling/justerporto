/**
 * Data Statis untuk Fitur Side Profile (/sideprofile)
 * Sesuai dengan Kontrak Data Statis (JSON Schema Architecture) pada PRD
 */

export const sideProfileData = {
  profile: {
    name: "Juan Sterling",
    callsign: "OFF-DUTY PROTOCOL",
    status: "TOXIN CAPACITY STABLE",
    clearanceLevel: "LEVEL-04 TACTICAL CLEARANCE",
    protocolCode: "KINGDOM RADIANT DOSSIER 02",
    labLocation: "SEATTLE TOXICOLOGY FACILITY",
    bio: "Coding is part of the story, not the whole story. Operating at the intersection of clean software architecture, tactical clutch play, and disciplined physical conditioning.",
  },

  gaming: {
    valorant: {
      riotId: "Jestergen",
      tagline: "juans",
      highestRank: "Diamond 1",
      // Enter Valorant gameplay / screenshot URLs below:
      images: [
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80",
      ],
      // 3 Most played signature agents (Viper highlighted as primary):
      signatureAgents: [
        {
          name: "VIPER",
          role: "Controller",
          image: "https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png",
          fullPortrait: "https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/fullportrait.png",
          iconUrl: "https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png",
          color: "#10b981",
          accentColor: "#00f59b",
        },
        {
          name: "SOVA",
          role: "Initiator",
          image: "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png",
          fullPortrait: "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/fullportrait.png",
          iconUrl: "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png",
          color: "#3b82f6",
          accentColor: "#60a5fa",
        },
        {
          name: "SAGE",
          role: "Sentinel",
          image: "https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png",
          fullPortrait: "https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/fullportrait.png",
          iconUrl: "https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png",
          color: "#14b8a6",
          accentColor: "#2dd4bf",
        },
      ],
    },

    mlbb: {
      id: "853625750 (12392)",
      highestRank: "Mythical Immortal (100 Stars)",
      primaryRole: "Roam (Tank/Support)",
      // Enter Mobile Legends gameplay / victory screenshot URLs below:
      images: [
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
      ],
    },

    // Other Games: Title and official game logo
    otherGames: [
      {
        id: "honkai-star-rail",
        name: "Honkai Star Rail",
        title: "Honkai Star Rail",
        genre: "Space Fantasy RPG",
        image: "/images/games/honkai-star-rail.png",
        coverUrl: "/images/games/honkai-star-rail.png",
        accentColor: "#38bdf8",
      },
      {
        id: "delta-force",
        name: "Delta Force: Hawk Ops",
        title: "Delta Force: Hawk Ops",
        genre: "Tactical Military FPS",
        image: "/images/games/delta-force.svg",
        coverUrl: "/images/games/delta-force.svg",
        accentColor: "#00f59b",
      },
      {
        id: "apex-legends",
        name: "Apex Legends",
        title: "Apex Legends",
        genre: "Battle Royale",
        image: "/images/games/apex-legends.svg",
        coverUrl: "/images/games/apex-legends.svg",
        accentColor: "#ef4444",
      },
      {
        id: "cs2",
        name: "Counter Strike 2",
        title: "Counter Strike 2",
        genre: "Tactical FPS",
        image: "/images/games/cs2.svg",
        coverUrl: "/images/games/cs2.svg",
        accentColor: "#f59e0b",
      },
      {
        id: "simcity-build-it",
        name: "Simcity Build It",
        title: "Simcity Build It",
        genre: "City Builder & Sim",
        image: "/images/games/simcity-build-it.png",
        coverUrl: "/images/games/simcity-build-it.png",
        accentColor: "#06b6d4",
      },
    ],

  },

  sports: [
    // Enter your athletic photo URLs below.
    // 'aspect' can be 'tall' (portrait), 'wide' (landscape), or omitted for standard ratio.
    // The Round-Robin Masonry algorithm will automatically balance the column heights.
    {
      id: "sport-1",
      title: "Competitive Basketball",
      category: "Basketball",
      date: "Weekly Weekend Routine",
      imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
      aspect: "tall", // Portrait
      notes: "Fast breaks, perimeter defense, and 5v5 pickup runs. Keeping reflexes, stamina, and team chemistry sharp.",
      stats: { sessions: "Weekend Pickup", intensity: "High Cardio" },
    },
    {
      id: "sport-2",
      title: "Strength & Hypertrophy Routine",
      category: "Fitness & Gym",
      date: "3x / Week Regimen",
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      aspect: "wide", // Landscape
      notes: "Upper body strength, compound lifts, and core reinforcement to counteract hours of posture strain at the desk.",
      stats: { sessions: "3-4x / Week", intensity: "Hypertrophy" },
    },
    {
      id: "sport-3",
      title: "Lap Swimming & Lung Capacity",
      category: "Swimming",
      date: "Saturday Morning",
      imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
      aspect: "tall", // Portrait
      notes: "Freestyle laps and breath control drills in Olympic-sized pools. Low-impact full body resistance for cardiovascular health.",
      stats: { laps: "1,500m / Session", intensity: "Aerobic" },
    },
    {
      id: "sport-4",
      title: "Padel Court Rallies & Volleys",
      category: "Padel",
      date: "Midweek Conditioning",
      imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80",
      aspect: "wide", // Landscape
      notes: "High-intensity wall rebounds, fast drop shots, and quick volley exchanges in dynamic glass-court doubles matches.",
      stats: { matches: "Weekly Doubles", intensity: "Agility & Reflexes" },
    },
    {
      id: "sport-5",
      title: "Batting Drills & Field Defense",
      category: "Softball",
      date: "Sunday Wind-Down",
      imageUrl: "https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1200&q=80",
      aspect: "tall", // Portrait
      notes: "Line drive swing mechanics, infield grounder fielding, and base running drills under the weekend sun.",
      stats: { position: "Outfield / Infield", intensity: "Power & Sprints" },
    }
  ],

  music: {
    // =========================================================================
    // MULTI-PLAYLIST SPOTIFY SOUNDSTAGE
    // You can add as many public Spotify playlists here as you want!
    // To add a new playlist, simply copy one of the objects below, paste it,
    // and provide its title, public URL, description, curator, and badge.
    // =========================================================================
    playlists: [
      {
        id: "kpop-main",
        title: "KPOP",
        curator: "Juan Sterling",
        description: "High energy K-pop hits, fast tempos, and power anthems in daily heavy rotation.",
        url: "https://open.spotify.com/playlist/0ctaoVZ8zeP9UNIfuOhNWX?si=5d4d9496077447ef",
        badge: "",
      },
      {
        id: "pop-2026",
        title: "POP 2026",
        curator: "Juan Sterling",
        description: "",
        url: "https://open.spotify.com/playlist/0JnbL6PGCAlPLowOqknGJp?si=82641595c6a74d4c",
        badge: "",
      },
      {
        id: "edm",
        title: "EDM",
        curator: "Juan Sterling",
        description: "",
        url: "https://open.spotify.com/playlist/4rAozK1WRHW1E14xwSwejd?si=62100cf0f72940d3",
        badge: "",
      }
    ],
    // Backward compatibility fallbacks
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/0ctaoVZ8zeP9UNIfuOhNWX?si=5d4d9496077447ef",
    playlistTitle: "KPOP",
    playlistDescription: "High energy K-pop hits and power anthems from my public Spotify playlist.",
  },
};
