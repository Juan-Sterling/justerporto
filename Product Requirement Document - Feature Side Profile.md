Product Requirement Document (PRD) 

# Fitur Side Profile Portfolio 

Spesifikasi Arsitektur & Kebutuhan Halaman Khusus Eksplorasi Personal Pengembang (/sideprofile) 

Domain Web justermp.my.id Rute URL /sideprofile Tema Utama BABYMONSTER Style Tema Side Profile Viper (Valorant) HUD 

## 1. Ringkasan Eksekutif & Konsep Dualitas Tema 

Dokumen ini menetapkan spesifikasi produk untuk halaman khusus /sideprofile pada website portofolio justermp.my.id. Berbeda dengan beranda utama yang mengusung tema BABYMONSTER (estetika modern, berani, dan bergaya streetwear pop), halaman /sideprofile mengadopsi tema Viper (Valorant) yang bernuansa taktis, laboratorium kimiawi, dan futuristik gelap. Halaman ini menjadi wadah ekspresi personal yang mencakup 3 pilar: Competitive Gaming (MLBB & Valorant), Aktivitas Olahraga, dan Soundtrack Musik. 

## 2. Arsitektur Navigasi & Diagram Alur Pengguna 

Pengguna beralih dari atmosfer BABYMONSTER ke zona personal bertema Viper secara mulus melalui perutean sisi klien (*client-side routing*). Efek transisi dirancang seperti aktivasi layar taktis (*Toxic Screen Transition*) dengan preservasi posisi gulir paling atas (*scroll to top*). 



<!-- Start of picture text -->
/sideprofile (Viper HUD) Interaksi Aksi Pengunjung<br>Beranda Utama Viper Protocol<br>• Toxic Tactical Gaming (Valorant & MLBB) Copy Riot & MLBB ID<br>Tema: BABYMONSTER Lightbox Preview Foto<br>• Athletic Feed & Spotify Soundstage<br>Putar Playlist Spotify<br>Navigasi: [← Back to Portfolio]<br><!-- End of picture text -->

Ketentuan Navigasi Sticky: Pada sudut kiri atas halaman /sideprofile, tombol sticky [ ← Back to Portfolio ] diberi aksen visual transisi agar pengunjung menyadari perpindahan kembali ke nuansa beranda BABYMONSTER tanpa membingungkan konteks navigasi. 

PRD: Feature Side Profile (/sideprofile) Halaman 1 dari 3 

## 3. Spesifikasi Fungsional: Modul 1 – Game Showcase 

Mengadopsi bahasa visual Viper Tactical HUD (bingkai bersudut tajam, aksen hijau racun #10b981, dan indikator persentase menyerupai fuel gauge). Modul terbagi ke dalam dua kompartemen: 

<mark>Valorant (Centerpiece)</mark> 

- Riot ID Display: Format RiotID#TAG dengan tombol salin otomatis bergaya HUD. • Highest Rank Badge: Lencana pangkat tertinggi dengan efek glow toksik. • Signature Agents: Kartu avatar agen favorit (menampilkan Viper, Controller/Duelist) lengkap dengan statistik peran. 

### Mobile Legends: Bang Bang 

- Multi-Account Switcher: Tab beralih akun utama dan alternatif tanpa reload. • Statistik & Role: IGN, User ID + Zone ID, Signature Role, dan Highest Rank. • Highest Win Rate: Kartu hero dengan win rate tertinggi (>500 match) dan galeri pencapaian/trofi turnamen. 

## 4. Spesifikasi Fungsional: Modul 2 – Aktivitas Olahraga 

## 6. Kontrak Data Statis (JSON Schema Architecture) 

// Struktur Model Data Halaman /sideprofile (sideprofile-data.json) interface SideProfileData { gaming: { mlbb: Array<{ id: string; zoneId: string; ign: string; rank: string; bestHero: { name: string; wr: string; matchCount: number }; achievements: string[] }>; valorant: { riotId: string; tagline: string; highestRank: string; signatureAgents: string[] }; }; sports: Array<{ id: string; title: string; category: string; imageUrl: string; date: string; notes?: string }>; music: { 

spotifyPlaylistEmbedUrl: string; onRepeatTracks: Array<{ title: string; artist: string; coverUrl: string; externalUrl: string }>; }; } 

## 7. Kebutuhan Non-Fungsional: Tema Viper, Responsivitas & Performa 

### <mark>Tema Viper (Light & Dark)</mark> 

### Multi-Device (HP/Tab/PC) 

- Dark (Toxic Lab): Latar karbon pekat (#090d0b),Dark (Toxic Lab): Latar karbon pekat (#090d0b),: Latar karbon pekat (#090d0b),#090d0b),), aksen neon toxic (#00f59b / #10b981), dan efek gas#00f59b / #10b981), dan efek gas / #10b981), dan efek gas#10b981), dan efek gas), dan efek gas halus. 

- Dark (Toxic Lab): Latar karbon pekat (#090d0b),Dark (Toxic Lab): Latar karbon pekat (#090d0b),: Latar karbon pekat (#090d0b),#090d0b),), • PC (>1024px): Tata letak modular 3 kolom HUD. aksen neon toxic (#00f59b / #10b981), dan efek gas#00f59b / #10b981), dan efek gas / #10b981), dan efek gas#10b981), dan efek gas), dan efek gas • Tablet (768-1024px): Adaptasi 2 kolom dinamis. halus. • HP (<768px): Stack 1 kolom linier dengan target • Light (Sterile Lab): Latar mint bersih (#f0fdf4), sentuh tombol (tap target) minimal 44×44px bebas teks emerald (#064e3b), batas presisi bedah. salah klik. • Kontras teks memenuhi standar WCAG AA. 

### Anti-Lag 60 FPS 

- Spotify Facade: Iframe musik hanya dimuat saat dipicu/diklik untuk menghemat memori. 

- Akselerasi GPU: Animasi transisi murni berbasis transform dan opacity. 

- Pemuatan foto WebP/AVIF lambat (*lazy loading*). 

## 8. Rencana Implementasi & Kriteria Penerimaan (DoD) 

Aspek Teknis Rincian Tugas Implementasi Kriteria Penerimaan (DoD) Estetika Viper konsisten, kontras Penerapan token warna racun (toxic green), kartu HUD teks terbaca jelas (WCAG AA), Desain Tema Viper bersudut tajam, serta mode Dark/Light Lab. dan transisi mode instan tanpa kedipan. Tata letak tidak bocor secara Responsivitas MultiPengujian breakpoint di HP (360px-480px), Tablet horizontal (*zero overflow*) dan Device (768px-1024px), dan PC (>1024px). navigasi nyaman dioperasikan satu jempol. Pengguliran halaman konstan di 60 Implementasi facade Spotify embed dan kompresi Performa Anti-Lag FPS; skor Lighthouse Performance gambar galeri olahraga (WebP/AVIF). ≥ 90 pada koneksi mobile. Semua tombol berfungsi akurat di Integrasi Konten & Aksi<sup>Fitur copy Riot ID & MLBB ID, pemilih akun MLBB,</sup> sistem operasi Android, iOS, lightbox olahraga, dan player Spotify. Windows, dan macOS. 

PRD: Feature Side Profile (/sideprofile) Halaman 3 dari 3 

