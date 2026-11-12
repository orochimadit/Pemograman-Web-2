# 📝 Lembar Tugas Mahasiswa: Pengembangan REST API Khusus Mobile di Era AI
### Mata Kuliah: Pemrograman Berorientasi Web 2
**Dosen Pengampu / Pemateri**: Aditya Pratama  
**Tahun Akademik**: 2026/2027  
**Batas Pengumpulan Take-Home**: H-1 Sebelum Pertemuan Berikutnya (Pukul 23.59 WIB)  
**Media Pengumpulan**: LMS Kampus (Google Classroom / Moodle / GitHub Classroom)

---

## 📌 Ketentuan Umum & Filosofi Vibe Coding
Dalam mata kuliah ini, Anda **sangat dianjurkan** memanfaatkan alat bantu AI Coding Agent (Antigravity, Cursor, GitHub Copilot, Claude Code). Namun, **aturan mutlaknya**:
1. Anda bertindak sebagai **Software Architect** dan **Quality Verifier**.
2. Anda **dilarang keras** mengumpulkan kode yang tidak Anda pahami atau belum Anda uji jalankan secara lokal.
3. Setiap tugas wajib menyertakan dokumen **`PROMPT_LOG.md`** yang mencatat bagaimana Anda mengarahkan AI dari *ide/spesifikasi* hingga menjadi *kode yang lolos pengujian*.

---

## 🧪 BAGIAN A: TUGAS IN-LAB (Dikerjakan di Kelas / Jam Praktikum - Durasi: 45 Menit)

### 🎯 Judul Kasus: *Mini Ticket Support System API for Mobile*
Aplikasi mobile kampus membutuhkan API sederhana untuk mahasiswa yang ingin melaporkan kendala fasilitas lab komputer atau jaringan kampus.

### Instruksi Tugas In-Lab:
1. **Fase 1 - Manual Schema & PRD (15 Menit)**:
   - Buat skema Zod untuk tiket pengaduan (`CreateTicketSchema`):
     - `kategori`: enum (`"HARDWARE" | "JARINGAN" | "SOFTWARE" | "LAINNYA"`)
     - `lokasiRuangan`: string (minimal 3 karakter, misal: `"Lab Jaringan 301"`)
     - `deskripsi`: string (minimal 10 karakter, maksimal 500 karakter)
     - `prioritas`: enum (`"RENDAH" | "SEDANG" | "TINGGI"`, default `"SEDANG"`)
2. **Fase 2 - Vibe Coding Implementation (20 Menit)**:
   - Berikan instruksi ke AI assistant untuk membuat endpoint:
     - `POST /api/tickets`: Validasi body dengan skema Zod di atas, kembalikan status `201 Created` dengan `ticketId` acak bertipe UUID, status awal `"PENDING"`, dan waktu pembuatan ISO.
     - `GET /api/tickets`: Mendukung filter query `kategori` dan pagination limit.
     - Pastikan format error terstandarisasi (`{ success: false, error: { code, message, details } }`).
3. **Fase 3 - Verifikasi & Peer-Testing (10 Menit)**:
   - Lakukan uji coba menggunakan cURL atau Thunder Client:
     - *Test Case 1*: Kirim payload valid -> pastikan HTTP status 201.
     - *Test Case 2*: Kirim deskripsi cuma 3 huruf -> pastikan server menolak dengan HTTP status 400 dan pesan error yang ramah pengguna mobile.
   - Panggil Asisten Lab / Dosen untuk melakukan *cek uji petik* di meja Anda.

---

## 🏠 BAGIAN B: TUGAS TAKE-HOME (Tugas Mandiri Berbasis Kasus Nyata)

### 🎯 Judul Proyek: *Sistem API Mobile "KampusHub Mobile-First"*
Anda diminta merancang dan membangun backend REST API yang siap dikonsumsi oleh aplikasi mobile (iOS / Android) untuk kebutuhan portal aktivitas mahasiswa kampus.

### 📋 Spesifikasi Kebutuhan Fungsional (PRD):

#### 1. Modul Autentikasi Mobile (`/api/auth`)
* **`POST /api/auth/register`**: Pendaftaran mahasiswa (NIM, Nama Lengkap, Email Kampus, Password). Password wajib di-hash menggunakan `bcrypt`.
* **`POST /api/auth/login`**: Mengembalikan:
  - `accessToken` (JWT berlaku 15 menit).
  - `refreshToken` (JWT / random UUID berlaku 30 hari).
  - `user`: Data profil ringkas (tanpa password hash!).
* **`POST /api/auth/refresh`**: Mengeluarkan `accessToken` baru ketika yang lama kedaluwarsa.

#### 2. Modul Feed Aktivitas Mahasiswa dengan Cursor Pagination (`/api/activities`)
* **`GET /api/activities?cursor=<id>&limit=5`**:
  - Mengembalikan daftar aktivitas/acara kampus terurut dari yang paling baru.
  - Wajib menerapkan **Cursor-Based Pagination** (bukan *offset page=1,2,3*).
  - Response menyertakan objek pagination: `{ nextCursor: string | null, hasMore: boolean }`.
* **`POST /api/activities` (Protected: Wajib Header Bearer Token)**:
  - Membuat aktivitas baru dengan validasi skema Zod ketat.
  - Mendukung header **`X-Idempotency-Key`**: Jika client mobile mengirim request kedua dengan kunci idempotensi yang sama, server mengembalikan data aktivitas yang sudah tersimpan tanpa membuat duplikasi di database.

#### 3. Modul Upload Bukti Foto / Kartu Mahasiswa (`/api/media/upload`)
* **`POST /api/media/upload`**:
  - Menerima file `multipart/form-data` dari kamera HP.
  - Filter ukuran file: Maksimal 5 MB.
  - Filter format: Hanya menerima `.jpg`, `.jpeg`, `.png`, dan `.webp`.
  - Mengembalikan URL gambar yang tersimpan lokal atau di cloud simulator.

#### 4. Modul Integrasi AI: Asisten Rangkuman Akademik (`/api/ai/summarize-stream`)
* **`GET /api/ai/summarize-stream?topic=<topik>`**:
  - Menggunakan protokol **Server-Sent Events (SSE)** (`Content-Type: text/event-stream`).
  - Mengalirkan respons rangkuman kata per kata secara berkala (simulasi respons model LLM atau sambungkan ke API Gemini/OpenAI jika memiliki API Key).
  - Diakhiri dengan event `data: [DONE]`.

---

## 📄 Format Dokumen `PROMPT_LOG.md` (Wajib Dilampirkan)

Buat satu file bernama `PROMPT_LOG.md` di root folder tugas Anda dengan format berikut:

```markdown
# Catatan Perancangan & Vibe Coding
Nama Mahasiswa: [Nama Lengkap Anda]
NIM: [NIM Anda]
Tools AI yang digunakan: [Cursor / Antigravity / Claude Code / Copilot]

### 1. Perancangan Awal (Arsitektur Mandiri)
- Model data yang saya rancang: ...
- Alasan pemilihan Cursor pagination dibanding Offset: ...

### 2. Riwayat Prompt ke AI & Hasil Evaluasi
#### Iterasi 1: Pembuatan Middleware Idempotency Key
- **Prompt yang saya berikan**:
  > "..."
- **Hasil dari AI**: AI membuat middleware menggunakan map memory...
- **Koreksi / Review yang saya lakukan**: Saya menemukan AI lupa menghapus key lama setelah 10 menit, sehingga memori bisa bocor. Saya meminta AI menambahkan TTL expiration.

#### Iterasi 2: Pembuatan SSE Endpoint
- **Prompt yang saya berikan**:
  > "..."
- **Uji coba & Verifikasi**: Berhasil diuji menggunakan `curl -N`, teks muncul per token.
```

---

## 📊 Rubrik Penilaian Tugas (Total Nilai: 100 Poin)

| Kriteria | Sub-Kriteria & Bobot | Indikator Penilaian Penuh |
| :--- | :---: | :--- |
| **Arsitektur & Mobile-Friendliness** | **25 Poin** | Menerapkan Cursor-Based Pagination dengan benar, payload compact (tanpa over-fetching), dan response envelope seragam. |
| **Validasi & Type-Safety** | **20 Poin** | Semua request divalidasi dengan Zod schema, kode bebas dari tipe `any` (TypeScript strict), pesan error jelas dan terstruktur. |
| **Keamanan & Autentikasi** | **20 Poin** | Password ter-hash aman (`bcrypt`), JWT Bearer Token diterapkan pada endpoint privat, ada mekanisme refresh token. |
| **Fitur Lanjutan (Upload & AI SSE)** | **15 Poin** | Upload foto berjalan dengan filter ukuran/tipe, endpoint streaming SSE mengalirkan chunk data secara realtime. |
| **Kualitas Vibe Coding (`PROMPT_LOG.md`)** | **10 Poin** | Dokumentasi interaksi AI runtut, menunjukkan pemikiran arsitektural mahasiswa sebagai reviewer, bukan sekadar copas. |
| **Kerapian Repositori & Uji Coba** | **10 Poin** | Terdapat file uji coba (`test_requests.http` atau script curl), instruksi instalasi `README.md` jelas, dan folder teratur. |

---

## 📦 Cara Pengumpulan
1. Buat folder tugas dengan format nama: `TUGAS_WEB2_API_[NIM]_[NAMA]` (contoh: `TUGAS_WEB2_API_220101001_BUDI`).
2. Pastikan folder **`node_modules`** TIDAK diikutsertakan (gunakan `.gitignore`).
3. Commit dan push ke repository GitHub pribadi Anda, lalu serahkan link repositori dan file zip ke LMS kampus.
