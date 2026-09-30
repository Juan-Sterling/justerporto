# 🎀 Dokumentasi Animasi Exit BABYMONSTER (Portfolio Juan Sterling)

Dokumen ini mencatat seluruh konsep, implementasi teknis, dan panduan untuk mengaktifkan kembali ke-4 opsi animasi exit bertema **BABYMONSTER** pada Welcome Screen portfolio.

---

## 🎯 Status Saat Ini:
- **Animasi Aktif Default**: `sheesh` (Mode No. 1 — Diagonal Laser Claw Slash & Split Wipe)
- **Engine**: GSAP 3.15 + Lenis Smooth Scroll + Hardware GPU Compositing
- **FPS**: 60 / 120 FPS tanpa layout shift atau FOUC.

---

## 📖 Katalog 4 Konsep Animasi Exit

### 1. 🔥 `sheesh` — Diagonal Laser Claw Slash & Split Wipe *(AKTIF)*
- **Inspirasi**: Gestur *claw strike* ikonik pada lagu *"SHEESH"* BABYMONSTER.
- **Koreografi Visual**:
  1. Pada 2.80s, layar sedikit mengempis (*recoil / anticipation breath* `scale: 0.99`).
  2. Pada 2.88s, 3 cakar laser merah neon (SVG path) menyayat secara diagonal melintasi layar dari kiri-atas ke kanan-bawah.
  3. Layar memancarkan *Crimson Screen Flash* dan watermark tipografi glowing **"SHEESH!"** muncul di titik tengah.
  4. Layar terbelah presisi mengikuti garis sayatan laser (`clip-path: polygon(...)`) menjadi 2 panel segitiga yang meluncur cepat ke arah berlawanan (`power4.in`), mengungkap Hero Section di baliknya yang sedang mekar secara serempak.

---

### 2. ⚡ `batterup` — Double Stadium Blast Doors
- **Inspirasi**: Intro megah panggung konser dan video klip lagu debut *"BATTER UP"*.
- **Koreografi Visual**:
  1. Pada 2.82s, sebuah balok laser horizontal berwarna putih dengan glow crimson pekat (`shadow-[0_0_35px_#FF3B4D]`) ditarik dari tengah ke kedua ujung kiri dan kanan.
  2. Watermark stensil **"BATTER UP!"** berpijar terang di tengah garis laser.
  3. Layar terbelah menjadi 2 pintu hidrolik horizontal:
     - Pintu atas melesat naik (`yPercent: -102`) dengan *heavy inertia spring* (`power4.inOut`).
     - Pintu bawah meluncur turun (`yPercent: 102`).
  4. Balok laser horizontal memuai vertikal dan menghilang halus, membuka pandangan panggung Hero.

---

### 3. 💧 `drip` — Bass Drop Chromatic Glitch & Emblem Zoom Tunnel
- **Inspirasi**: *Beat drop* eksplosif pada lagu *"DRIP"*.
- **Koreografi Visual**:
  1. Pada 2.70s - 2.85s, layar mengalami getaran *micro chromatic glitch shake* (efek distorsi bass berat).
  2. Pada 2.86s, *BASS DROP* terjadi: teks headline, loading bar, dan equalizer runtuh/mengempis cepat ke tengah (`scale: 0.65, opacity: 0`).
  3. Emblem Devil Horns di tengah melesat maju menembus kamera secara eksponensial (`scale: 30, rotate: 15deg, ease: 'expo.in'`).
  4. Sebuah cincin gelombang kejut crimson (*shockwave ripple*) meledak membesar (`scale: 5`), diiringi kilatan watermark **"DRIP!"**.
  5. Seluruh layar Welcome larut langsung ke posisi Emblem Tanduk Iblis yang identik di Hero section.

---

### 4. 👑 `seven` — Staggered Concert LED Slits (7-Members)
- **Inspirasi**: Formasi 7 member lengkap BABYMONSTER (Ruka, Pharita, Asa, Ahyeon, Rami, Rora, Chiquita) dan tata panggung LED festival musik.
- **Koreografi Visual**:
  1. Pada 2.82s, 6 garis laser vertikal menyala terang membagi layar menjadi 7 kolom (`w-[14.28%]`).
  2. Tiap kolom menampilkan kode member di bagian bawah:
     - `01 RUKA`
     - `02 PHARITA`
     - `03 ASA`
     - `04 AHYEON`
     - `05 RAMI`
     - `06 RORA`
     - `07 CHIQUITA`
  3. Watermark **"7 MONSTERS"** berpijar di tengah.
  4. Pada 2.96s, ke-7 kolom vertikal meluncur secara berselang-seling (kolom genap ke atas, kolom ganjil ke bawah) dengan efek *stagger* dinamis (`stagger: 0.045s, ease: 'power4.inOut'`), seperti dinding LED panggung yang terbuka untuk menyambut penampilan utama.

---

## 🛠️ Cara Mengganti Animasi di Masa Depan

Kode untuk ke-4 animasi di atas **tetap tersimpan rapi dan utuh** di dalam `src/components/WelcomeScreen.jsx`.

### Opsi A: Ganti Default Mode di Kode
Buka file [`src/App.jsx`](file:///c:/Users/ASUS%20TUF/Documents/justerporto/src/App.jsx), lalu cari baris berikut:

```javascript
// Ganti 'sheesh' dengan mode lain yang diinginkan:
const [exitMode, setExitMode] = useState('sheesh'); 
// Pilihan: 'sheesh' | 'batterup' | 'drip' | 'seven'
```

### Opsi B: Membuka Kembali Bilah Preview Interaktif (Live Tester)
Jika Anda ingin mengetes atau melihat kembali keempatnya di browser kapan saja:
1. Buka browser dan tambahkan parameter `?preview=true` pada URL:
   `http://localhost:5173/?preview=true`
2. Bilah melayang interaktif di bawah layar akan otomatis muncul kembali, memungkinkan Anda mengklik dan memutar ulang ke-4 animasi kapan saja secara langsung.
