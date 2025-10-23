# Website Belajar Kanji

Website interaktif sederhana untuk mempelajari karakter Kanji Jepang dengan mini-game.

## Fitur

### 1. **Halaman Selamat Datang (index.html)**
- Input nama pengguna untuk pengalaman yang dipersonalisasi
- Antarmuka modern dan bersih dengan styling Bootstrap

### 2. **Halaman Belajar (study.html)**
- Jelajahi 15 karakter Kanji dasar
- Lihat pembacaan (pengucapan), arti, dan contoh penggunaan
- Tes cepat untuk memperkuat pembelajaran
- Navigasi antar karakter

### 3. **Empat Mini-Game**

#### 🔢 Belajar Angka (game1.html)
- Pengenalan angka 1-10 dalam Kanji
- Latihan menebak angka dalam bentuk Kanji
- Sistem skor dan umpan balik
- Maksimal 10 pertanyaan per sesi

#### 🔗 Pasangkan Gambar & Kanji (game2.html)
- Cocokkan gambar dengan karakter kanji yang sesuai
- Batas waktu 60 detik
- Klik gambar dan kanji untuk membuat pasangan
- Skor: 10 poin per pasangan

#### ⚡ Kuis Cepat (game3.html)
- Jawab sebanyak mungkin pertanyaan dalam 60 detik
- Pertanyaan pilihan ganda
- Pelacakan skor tertinggi dengan localStorage
- Papan peringkat 5 teratas

#### 🧩 Susun Kata Hiragana (game4.html)
- Temukan dan bentuk kata-kata Jepang dari grid hiragana 8×8
- Pilih karakter yang bersebelahan (horizontal atau vertikal)
- Validasi kata dan cocokkan dengan kanji yang benar
- Dukungan mouse drag dan touch untuk mobile
- Sistem skor berdasarkan panjang kata

## Teknologi yang Digunakan

- **HTML5**: Struktur dan konten
- **Bootstrap 5.3.2**: Desain responsif dan komponen UI (via CDN)
- **JavaScript**: Fungsi interaktif dan logika permainan
- **CSS3**: Styling kustom dan animasi
- **LocalStorage**: Penyimpanan nama pengguna dan skor tertinggi

## Struktur File

```
Project_PBJepang/
├── index.html          # Welcome/login page
├── study.html          # Main study page with kanji learning
├── game1.html          # Number Learning game
├── game2.html          # Image-Kanji Match game
├── game3.html          # Speed Quiz game
├── game4.html          # Hiragana Word Formation game
├── css/
│   └── style.css       # Custom styles
└── js/
    ├── main.js         # Utility functions
    ├── kanjiData.js    # Kanji and hiragana data
    ├── study.js        # Study page logic
    ├── game1.js        # Number Learning game logic
    ├── game2.js        # Image-Kanji Match game logic
    ├── game3.js        # Speed Quiz game logic
    └── game4.js        # Hiragana Word Formation game logic
```

## Cara Menggunakan

1. Buka `index.html` di web browser
2. Masukkan nama Anda untuk memulai
3. Pelajari karakter kanji di halaman belajar
4. Ikuti tes cepat untuk memperkuat pembelajaran
5. Mainkan tiga mini-game untuk berlatih
6. Coba kalahkan skor tertinggi Anda!

## Kanji yang Tersedia

Website ini mencakup 15 karakter kanji dasar:
- 日 (sun, day)
- 月 (moon, month)
- 火 (fire)
- 水 (water)
- 木 (tree, wood)
- 金 (gold, money)
- 土 (earth, soil)
- 人 (person)
- 山 (mountain)
- 川 (river)
- 田 (rice field)
- 本 (book, origin)
- 学 (study)
- 校 (school)
- 生 (life, birth)

## Fitur Utama

- ✅ Tidak perlu instalasi - langsung berjalan di browser
- ✅ Tidak perlu server - aplikasi client-side murni
- ✅ Desain responsif - berfungsi di mobile dan desktop
- ✅ Menggunakan CDN untuk Bootstrap - tanpa npm atau proses build
- ✅ Nama pengguna dan skor tertinggi persisten
- ✅ Pengalaman belajar interaktif dan menarik
- ✅ Bahasa Indonesia sebagai bahasa utama

## Kompatibilitas Browser

Berfungsi di semua browser modern:
- Chrome
- Firefox
- Safari
- Edge

## Pengembangan Masa Depan

Penambahan potensial:
- Lebih banyak karakter kanji
- Mode permainan tambahan
- Pengucapan audio
- Latihan menulis (urutan goresan)
- Pelacakan kemajuan
- Tingkat kesulitan

## Lisensi

Gratis untuk digunakan untuk tujuan pendidikan.
