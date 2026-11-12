# 🚀 PENUGASAN PROYEK BESAR: PENGEMBANGAN REST API KHUSUS MOBILE DI ERA AI
### MATA KULIAH: PEMROGRAMAN BERORIENTASI WEB 2
**Dosen Pengampu / Pemateri**: Aditya Pratama  
**Tahun Akademik**: 2026/2027  
**Model Pengerjaan**: Individu (*1 Mahasiswa = 1 Topik Unik Spesifik*)  
**Batas Waktu**: Dikumpulkan bertahap (Progress Check di UTS Minggu 8, Final Showcase di UAS Minggu 16)

---

## 📌 Standar Arsitektur Wajib (*Architectural Requirements*)
Seluruh mahasiswa **wajib** mengimplementasikan 6 pilar arsitektur mobile-first berikut pada proyek masing-masing:
1. **Type-Safe & Contract-First**: Menggunakan TypeScript dan Zod untuk validasi seluruh request payload (body, query, params). Bebas dari tipe `any`.
2. **Response Envelope Seragam**: 
   - Sukses: `{ "success": true, "data": ..., "message"?: string }`
   - Gagal: `{ "success": false, "error": { "code": string, "message": string, "details"?: any } }`
3. **Cursor-Based Pagination**: Endpoint list/feed utama wajib menggunakan cursor token (bukan offset `page=1,2,3`) untuk mendukung *Infinite Scroll* pada aplikasi smartphone.
4. **Mobile Bearer Auth**: Akses endpoint privat menggunakan JWT di header `Authorization: Bearer <token>`, dilengkapi endpoint `/api/auth/refresh`.
5. **Idempotency Key**: Endpoint transaksi pembuatan data wajib mendukung header `X-Idempotency-Key` untuk mencegah duplikasi jika koneksi HP tidak stabil.
6. **Integrasi AI / Streaming SSE**: Memiliki minimal 1 endpoint bertenaga kecerdasan buatan (menggunakan Server-Sent Events untuk streaming teks atau analisis multimodal foto dari kamera).
7. **Dokumentasi Vibe Coding (`PROMPT_LOG.md`)**: Wajib menyertakan catatan instruksi prompt AI dan proses review mahasiswa sebagai arsitek sistem.

---

## 📋 Distribusi Topik Proyek 16 Mahasiswa

---

### 1. Akmal Fahmi Alamsyah (NIM: T0122003)
* **Nama Proyek**: **FitTrack AI — API Pelacak Kebugaran & Nutrisi Harian Mobile**
* **Studi Kasus**: Aplikasi smartphone bagi mahasiswa/pengguna yang ingin mencatat asupan makanan, berat badan, dan aktivitas olahraga.
* **Entitas Data**: `User`, `FoodLog`, `WorkoutSession`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/logs/feed?cursor=<id>&limit=10` (Infinite scroll riwayat log kalori & olahraga)
  - `POST /api/logs/workout` (Input latihan baru dengan header `X-Idempotency-Key`)
  - `POST /api/media/upload-food` (Upload foto makanan dari kamera HP)
  - `GET /api/ai/nutrition-coach?goal=<target>` (Streaming SSE rekomendasi menu & evaluasi kalori)

---

### 2. Muhammad Riski (NIM: T0123001)
* **Nama Proyek**: **KopiVibe Mobile — API Smart Cafe Ordering & Live Barista Queue**
* **Studi Kasus**: API pemesanan kopi dan makanan kafe langsung dari meja pelanggan via HP tanpa perlu antre di kasir.
* **Entitas Data**: `User`, `MenuItem`, `Order`, `PaymentProof`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/menu/feed?cursor=<id>&category=KOPI` (Katalog menu responsif mobile)
  - `POST /api/orders/checkout` (Checkout pesanan dengan `X-Idempotency-Key` anti-double bayar)
  - `POST /api/media/upload-receipt` (Upload bukti pembayaran QRIS dari galeri HP)
  - `GET /api/ai/flavor-recommender?mood=<suasana>` (Streaming SSE rekomendasi racikan kopi sesuai preferensi)

---

### 3. Muhamad Iqbal Yahya (NIM: T0123002)
* **Nama Proyek**: **MedikaMobile — API Telekonsultasi & Booking Antrean Klinik Kampus**
* **Studi Kasus**: Sistem booking antrean dokter dan konsultasi awal kesehatan mahasiswa berbasis smartphone.
* **Entitas Data**: `Pasien`, `Dokter`, `JanjiTemu`, `RekamMedis`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/appointments/live-queue?cursor=<id>` (Live tracking nomor antrean klinik di HP)
  - `POST /api/appointments/book` (Booking jadwal dokter dengan `X-Idempotency-Key`)
  - `POST /api/media/upload-prescription` (Upload foto resep obat atau surat sakit)
  - `GET /api/ai/symptom-triage?symptoms=<gejala>` (Streaming SSE pemilahan awal gejala ringan & saran pertolongan pertama)

---

### 4. Asmaul Husna (NIM: T0123004)
* **Nama Proyek**: **HijabStyle AI — API Fashion Muslimah & Virtual Personal Stylist**
* **Studi Kasus**: E-commerce katalog fashion muslimah mobile dengan fitur asisten pencocokan warna hijab dan outfit.
* **Entitas Data**: `User`, `FashionItem`, `Wishlist`, `StylingConsultation`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/fashion/catalog?cursor=<id>&tag=GAMIS` (Infinite scroll katalog busana muslimah)
  - `POST /api/fashion/wishlist` (Simpan favorit dengan `X-Idempotency-Key`)
  - `POST /api/media/upload-outfit` (Upload foto pakaian yang dimiliki user untuk dicocokkan)
  - `GET /api/ai/style-match?color=<warna>` (Streaming SSE saran perpaduan warna hijab, gamis, dan aksesoris)

---

### 5. Muhammad Rizal (NIM: T0123006)
* **Nama Proyek**: **BengkelKu — API Mobile Booking Servis Kendaraan & Montir Panggilan**
* **Studi Kasus**: API untuk pemilik sepeda motor/mobil memesan jadwal servis rutin atau memanggil montir darurat ke lokasi GPS.
* **Entitas Data**: `User`, `Kendaraan`, `ServiceBooking`, `KerusakanReport`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/services/history?cursor=<id>` (Riwayat perawatan kendaraan di HP)
  - `POST /api/services/request-emergency` (Panggil montir dengan koordinat GPS & `X-Idempotency-Key`)
  - `POST /api/media/upload-damage` (Upload foto bagian mesin/kendaraan yang rusak)
  - `GET /api/ai/diagnose-vehicle?sound=<suara_gejala>` (Streaming SSE analisa estimasi sparepart yang rusak)

---

### 6. Wira Syahbandi (NIM: T0123008)
* **Nama Proyek**: **KostHunter — API Pencarian & Booking Kamar Kost Mahasiswa**
* **Studi Kasus**: Aplikasi mobile pencari kost dekat kampus dengan informasi fasilitas, ketersediaan kamar, dan review jujur.
* **Entitas Data**: `User`, `KostListing`, `BookingKamar`, `ReviewKost`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/kosts/feed?cursor=<id>&maxPrice=800000` (Infinite scroll daftar kost mahasiswa)
  - `POST /api/kosts/book` (Booking DP kamar dengan `X-Idempotency-Key`)
  - `POST /api/media/upload-room` (Upload foto kamar oleh pemilik kost)
  - `GET /api/ai/kost-advisor?budget=<dana>&kampus=<nama>` (Streaming SSE rekomendasi area kost paling efisien dan aman)

---

### 7. Aldi Cator Pangestu (NIM: T0123009)
* **Nama Proyek**: **AgriSmart — API Mobile Deteksi Hama Tanaman & Pasar Tani**
* **Studi Kasus**: Platform mobile untuk petani lokal mendeteksi penyakit tanaman lewat kamera HP dan memantau harga komoditas pasar.
* **Entitas Data**: `Petani`, `CropReport`, `MarketPrice`, `TokoTani`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/market/prices?cursor=<id>` (Feed update harga komoditas pangan harian)
  - `POST /api/crops/report` (Kirim laporan serangan hama baru dengan `X-Idempotency-Key`)
  - `POST /api/media/upload-leaf` (Upload foto daun/tanaman sakit dari kamera ponsel)
  - `GET /api/ai/crop-doctor?cropName=<tanaman>` (Streaming SSE panduan penanganan obat/pupuk organik)

---

### 8. Diva Arini (NIM: T0123010)
* **Nama Proyek**: **EventKuy — API Mobile Ticketing & Komunitas Event Kampus**
* **Studi Kasus**: API portal tiket konser, perlombaan, seminar, dan workshop kampus dengan QR Code tiket digital.
* **Entitas Data**: `User`, `Event`, `TicketOrder`, `EventReview`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/events/explore?cursor=<id>&category=MUSIC` (Infinite scroll daftar event terkini)
  - `POST /api/tickets/purchase` (Klaim/Beli tiket event dengan `X-Idempotency-Key`)
  - `POST /api/media/upload-poster` (Upload poster pamflet kegiatan kampus)
  - `GET /api/ai/event-planner?interest=<minat>` (Streaming SSE rekomendasi kegiatan penunjang CV mahasiswa)

---

### 9. Muchlas (NIM: T0123012)
* **Nama Proyek**: **TrashHero — API Mobile Bank Sampah & Reward Daur Ulang**
* **Studi Kasus**: API aplikasi penjemputan sampah anorganik (plastik, kardus, minyak jelantah) yang ditukar dengan poin pulsa/e-wallet.
* **Entitas Data**: `Warga`, `SetoranSampah`, `RewardPoin`, `KatalogHadiah`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/trash/history?cursor=<id>` (Infinite scroll riwayat kilogram sampah yang disetor)
  - `POST /api/trash/pickup-request` (Pesan penjemputan armada dengan `X-Idempotency-Key`)
  - `POST /api/media/upload-trash-photo` (Upload foto tumpukan sampah untuk verifikasi jenis)
  - `GET /api/ai/recycle-guide?material=<jenis>` (Streaming SSE panduan cara membersihkan dan memilah sampah daur ulang)

---

### 10. Aidil Hidayat (NIM: T0123014)
* **Nama Proyek**: **RumahPustaka — API Mobile Perpustakaan Digital & Tracker Baca**
* **Studi Kasus**: Mobile client membaca katalog buku perpustakaan, tracking jumlah halaman baca harian, dan peminjaman buku fisik.
* **Entitas Data**: `Mahasiswa`, `Buku`, `Peminjaman`, `ReadingNote`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/books/catalog?cursor=<id>&genre=TEKNOLOGI` (Infinite scroll katalog koleksi buku)
  - `POST /api/books/borrow` (Pinjam buku dengan `X-Idempotency-Key`)
  - `POST /api/media/upload-barcode` (Upload foto barcode ISBN buku dari kamera smartphone)
  - `GET /api/ai/book-summary?title=<judul_buku>` (Streaming SSE rangkuman inti sari buku & poin penting pembelajaran)

---

### 11. Rodianto (NIM: T0123015)
* **Nama Proyek**: **LogistikExpress — API Mobile Kurir & Pelacakan Paket Pengiriman**
* **Studi Kasus**: Aplikasi pengantar paket untuk kurir lapangan dan pelacakan checkpoint posisi resi paket oleh konsumen.
* **Entitas Data**: `Kurir`, `Paket`, `TrackingCheckpoint`, `BuktiPenerima`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/shipments/assigned?cursor=<id>` (Infinite scroll daftar paket yang harus diantar hari ini)
  - `POST /api/shipments/update-status` (Update status terkirim dengan `X-Idempotency-Key`)
  - `POST /api/media/upload-delivery-proof` (Upload foto paket di depan rumah dan tanda tangan penerima)
  - `GET /api/ai/route-optimizer?destination=<titik_lokasi>` (Streaming SSE urutan prioritas antar paket terdekat)

---

### 12. Ahmed Zidan Albatawi (NIM: T0123018)
* **Nama Proyek**: **KulinerPontianak — API Mobile Direktori Wisata Kuliner & Food Review**
* **Studi Kasus**: Panduan wisata kuliner khas lokal untuk wisatawan, lengkap dengan jam operasional, kisaran harga, dan rating.
* **Entitas Data**: `User`, `WarungKuliner`, `ReviewMakanan`, `Bookmark`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/culinary/feed?cursor=<id>&halalOnly=true` (Infinite scroll spot kuliner viral)
  - `POST /api/culinary/add-review` (Tulis review & rating dengan `X-Idempotency-Key`)
  - `POST /api/media/upload-food-pic` (Upload foto makanan lezat dari kamera HP)
  - `GET /api/ai/food-guide?budget=<uang>&preferensi=<pedas/manis>` (Streaming SSE rekomendasi warung makan tersembunyi (*hidden gem*))

---

### 13. Lilis Lasmini (NIM: T0123025)
* **Nama Proyek**: **EduTutor — API Mobile Bimbingan Belajar Privat & Homework Helper**
* **Studi Kasus**: Menghubungkan siswa sekolah dengan tutor privat mahasiswa, serta konsultasi pemecahan soal ujian yang sulit.
* **Entitas Data**: `Siswa`, `Tutor`, `JadwalLes`, `PertanyaanPR`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/tutors/explore?cursor=<id>&matpel=MATEMATIKA` (Infinite scroll daftar tutor berpengalaman)
  - `POST /api/tutoring/book-session` (Booking jadwal les privat dengan `X-Idempotency-Key`)
  - `POST /api/media/upload-homework-photo` (Upload foto soal buku cetak yang ingin ditanyakan)
  - `GET /api/ai/homework-hint?topic=<materi_soal>` (Streaming SSE panduan konsep dasar dan rumus tanpa memberikan kunci jawaban langsung)

---

### 14. Fazrul (NIM: T0123035)
* **Nama Proyek**: **GameHub Mobile — API Komunitas & Turnamen E-Sports Kampus**
* **Studi Kasus**: Platform pendaftaran turnamen game mobile (Mobile Legends, PUBG Mobile, Valorant), jadwal tanding, dan leaderboard tim.
* **Entitas Data**: `Gamer`, `Team`, `Tournament`, `MatchResult`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/tournaments/feed?cursor=<id>&game=MLBB` (Infinite scroll daftar turnamen terbuka)
  - `POST /api/tournaments/register-team` (Daftarkan squad tim dengan `X-Idempotency-Key`)
  - `POST /api/media/upload-match-score` (Upload screenshot scoreboard hasil kemenangan game)
  - `GET /api/ai/meta-analyst?hero=<nama_hero>` (Streaming SSE analisa strategi counter pick dan build item)

---

### 15. Abrar Arrabani (NIM: T0123037)
* **Nama Proyek**: **CucianKilat — API Mobile Smart Laundry Antar-Jemput**
* **Studi Kasus**: API layanan jasa laundry kiloan dan satuan untuk mahasiswa kos dengan estimasi waktu selesai cuci dan kurir pickup.
* **Entitas Data**: `Pelanggan`, `LaundryOrder`, `DriverPickup`, `Invoice`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/laundry/orders-history?cursor=<id>` (Infinite scroll histori cucian mahasiswa)
  - `POST /api/laundry/create-order` (Order jemput cucian dengan `X-Idempotency-Key`)
  - `POST /api/media/upload-clothes-photo` (Upload foto barang pakaian sensitif/berharga)
  - `GET /api/ai/fabric-care?fabric=<jenis_kain>` (Streaming SSE instruksi suhu pencucian dan deterjen terbaik)

---

### 16. Syahbandi (NIM: T0124014)
* **Nama Proyek**: **ParkirPintar — API Mobile Monitoring Slot Parkir & Karcis Digital**
* **Studi Kasus**: Aplikasi mobile pengendara kampus untuk mengecek ketersediaan sisa slot parkir mobil/motor dan barcode tiket keluar.
* **Entitas Data**: `Pengendara`, `Kendaraan`, `ParkirTicket`, `SlotParkir`
* **Daftar Endpoint Wajib**:
  - `POST /api/auth/register` & `POST /api/auth/login`
  - `GET /api/parking/spots-live?cursor=<id>` (Infinite scroll zona parkir dan jumlah kuota kosong)
  - `POST /api/parking/check-in` (Check-in gate masuk dengan `X-Idempotency-Key`)
  - `POST /api/media/upload-plate-photo` (Upload foto plat nomor motor/mobil dari kamera portal)
  - `GET /api/ai/parking-assistant?vehicleType=<motor/mobil>` (Streaming SSE rekomendasi blok parkir yang paling dekat dengan gedung kuliah)

---

## 📦 Berkas yang Wajib Dikumpulkan Mahasiswa
Setiap mahasiswa wajib menyusun folder proyek dengan struktur berikut:
```text
TUGAS_WEB2_API_[NIM]_[NAMA]/
├── src/
│   ├── schemas/              # File skema validasi Zod
│   ├── middlewares/          # Auth JWT & validation middleware
│   ├── routes/               # Rute endpoint (auth, feed, transaksi, media, ai)
│   └── server.ts             # File utama express/hono
├── test_requests.http        # File pengujian endpoint lengkap (bisa di-klik di VS Code)
├── package.json              # Dependensi proyek
├── tsconfig.json             # Konfigurasi TypeScript
├── PROMPT_LOG.md             # Log interaksi Vibe Coding dan review perbaikan kode
└── README.md                 # Dokumentasi cara setup & deskripsi proyek
```

---

## 🏆 Rubrik Penilaian Proyek (Skala 100)

| Komponen | Bobot | Indikator Keberhasilan |
| :--- | :---: | :--- |
| **Kesesuaian Spesifikasi Topik** | **20%** | Seluruh entitas dan endpoint spesifik yang ditugaskan berhasil dibuat dan berfungsi. |
| **Mobile-First Optimization** | **20%** | Menggunakan Cursor Pagination, payload ringkas, dan format response envelope standar. |
| **Type-Safety & Robustness** | **20%** | Validasi skema Zod pada setiap input, tidak menggunakan `any`, dan memiliki penanganan error yang baik. |
| **Security & Idempotency** | **15%** | Bearer Token JWT pada route privat dan implementasi `X-Idempotency-Key` pada route pembuatan data. |
| **Integrasi AI / SSE Stream** | **15%** | Endpoint AI berfungsi mengalirkan teks bertahap dengan Server-Sent Events (`text/event-stream`). |
| **Vibe Coding Discipline (`PROMPT_LOG.md`)** | **10%** | Catatan arsitektural menunjukkan mahasiswa bertindak sebagai konduktor/reviewer kode, bukan hanya copy-paste. |
