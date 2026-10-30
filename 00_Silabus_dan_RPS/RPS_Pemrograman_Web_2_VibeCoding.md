# 📘 RENCANA PEMBELAJARAN SEMESTER (RPS)
## MATA KULIAH: PEMROGRAMAN BERORIENTASI WEB 2
### Pendekatan: Fullstack Web & Mobile Interconnection, Modern AI Era, & Vibe Coding Framework (freeCodeCamp Style)

---

### 🎯 Informasi Mata Kuliah
- **Mata Kuliah**: Pemrograman Berorientasi Web 2 (Advanced Web & Mobile Interconnection)
- **Dosen Pengampu / Pemateri**: Aditya Pratama
- **Bobot**: 3 SKS (1 Teori Konsep, 2 Praktikum Hands-on / Project-based)
- **Metode Pembelajaran**: 
  - **freeCodeCamp Style**: *Zero-fluff*, 100% *learn-by-building*, tantangan modular interaktif, implementasi langkah-demi-langkah.
  - **Vibe Coding Framework**: Mahasiswa berperan sebagai *System Architect*, *Prompt Engineer*, dan *Quality Verifier* menggunakan AI Coding Agents (Cursor, Antigravity, Claude Code, GitHub Copilot).
- **Core Tech Stack**:
  - **Backend & API Ecosystem**: TypeScript, Node.js / Hono / Express, RESTful API, Server-Sent Events (SSE), WebSockets.
  - **Web Client**: React / Next.js (Tailwind CSS, Shadcn UI).
  - **Mobile Client**: React Native (Expo) - Universal cross-platform.
  - **AI & Vibe Engineering**: OpenAI/Gemini/Anthropic API, LLM Function Calling, Streaming UI, Multimodal inputs (Kamera HP & Voice -> AI backend -> Web Dashboard).

---

### 🏆 Capaian Pembelajaran Mata Kuliah (CPMK)
1. **CPMK-1 (API & System Architecture)**: Mahasiswa mampu merancang arsitektur API yang tangguh (*contract-first*, type-safe, REST & WebSocket) yang melayani client Web dan Mobile secara simultan.
2. **CPMK-2 (Web-Mobile Interoperability)**: Mahasiswa mampu membangun frontend Web dan aplikasi Mobile (Expo) yang saling terhubung secara *real-time*, sinkronisasi data antar device, dan *unified authentication* (JWT/OAuth).
3. **CPMK-3 (AI-Powered Applications)**: Mahasiswa mampu mengintegrasikan model AI (LLM, vision, speech-to-text) ke dalam pipeline web dan mobile dengan streaming responses dan function calling.
4. **CPMK-4 (Vibe Coding Mastery)**: Mahasiswa mampu menerapkan metode *Vibe Coding* yang disiplin: merancang *Product Requirement Document (PRD)*, *System Prompting*, *Iterative AI Refinement*, serta *Code Review & Testing* tanpa terjebak *AI hallucination*.

---

### 🗓️ Rencana 16 Pertemuan Perkuliahan

```text
SEMESTER ROADMAP (freeCodeCamp Project-Driven):
├── BLOK 1: FONDASI VIBE CODING & ARSITEKTUR API UNTUK MULTI-CLIENT (Minggu 1 - 3)
├── BLOK 2: KONEKSI WEB & MOBILE SATU BACKEND (Minggu 4 - 7)
├── EVALUASI TENGAH SEMESTER (Minggu 8: UTS - Live Build Fullstack API + Mobile Client)
├── BLOK 3: INTEGRASI AI DI WEB & MOBILE (LLM, STREAMING, & MULTIMODAL) (Minggu 9 - 12)
├── BLOK 4: REALTIME SYNC, AGENTIC WORKFLOW & TUGAS BESAR (Minggu 13 - 15)
└── EVALUASI AKHIR SEMESTER (Minggu 16: UAS - Grand Showcase "Connected AI-First App")
```

---

#### 📌 BLOK 1: FONDASI VIBE CODING & ARSITEKTUR API UNTUK MULTI-CLIENT

##### Minggu 01: Paradigma Vibe Coding & Arsitektur Web-Mobile Modern
- **Materi Konsep**:
  - Evolusi Web 2.0 ke era AI: Dari monolithic web ke decoupled multi-client (Web + Mobile + AI Agents).
  - Apa itu *Vibe Coding*? Mengubah ide menjadi produk nyata dengan AI tanpa kehilangan kontrol arsitektural.
  - Prinsip *freeCodeCamp*: *Show me the code & build something that runs in day one*.
- **Hands-on Challenge**:
  - Setup environment: Node.js, TypeScript, Expo Go, Antigravity/Cursor.
  - Membuat API endpoint pertama dengan Hono/Express & mengonsumsinya langsung dari browser dan emulator ponsel.

##### Minggu 02: Desain API Type-Safe & Kontrak Data (Contract-First Design)
- **Materi Konsep**:
  - Mengapa mobile dan web butuh kontrak yang ketat? Validasi schema dengan Zod & TypeBox.
  - RESTful best practices: Status codes, idempotent methods, JSON error handling standar.
- **Hands-on Challenge**:
  - Merancang skema data aplikasi (e.g., E-Commerce / Smart Note).
  - Vibe Coding: Memerintahkan AI membuat API CRUD lengkap dengan validasi skema dan unit test otomatis.

##### Minggu 03: Database Relasional, ORM Modern, & Cloud Storage
- **Materi Konsep**:
  - Database PostgreSQL / SQLite dengan Prisma / Drizzle ORM.
  - Penanganan media: Upload file/gambar dari mobile dan web ke Object Storage (S3 / Supabase / Cloudinary).
- **Hands-on Challenge**:
  - Membangun media upload endpoint dengan thumbnail processing.
  - Menguji upload dari form Web dan simulasi multipart mobile request.

---

#### 📌 BLOK 2: KONEKSI WEB & MOBILE SATU BACKEND

##### Minggu 04: Unified Authentication (JWT, Refresh Tokens, & Secure Storage)
- **Materi Konsep**:
  - Perbedaan auth di browser (Cookie HttpOnly / LocalStorage) vs Mobile (SecureStore / Keychain).
  - Arsitektur Access Token & Refresh Token anti-pembajakan.
- **Hands-on Challenge**:
  - Membuat sistem Login & Register satu backend yang dipakai bersamaan oleh Web (Next.js) dan Mobile (Expo).

##### Minggu 05: Membangun Web Dashboard Responsif (React / Tailwind / UI Components)
- **Materi Konsep**:
  - Desain antarmuka modern ala Vercel / Linear (Clean, Accessible, Fast).
  - Data fetching di Web: React Query / SWR untuk auto-caching dan revalidation.
- **Hands-on Challenge**:
  - Vibe coding UI web dashboard dengan library komponen modern (Shadcn UI).
  - Menampilkan data realtime dari API backend.

##### Minggu 06: Membangun Aplikasi Mobile Native dengan Expo (React Native)
- **Materi Konsep**:
  - Konsep native layout: Flexbox, Safe Area, Navigasi Tabs & Stacks (Expo Router).
  - Mengakses hardware ponsel: Kamera, Geolocation, Storage.
- **Hands-on Challenge**:
  - Membuat mobile app yang membaca data dari database backend yang sama dengan Web Dashboard.
  - Fitur ambil foto dari kamera HP dan upload langsung ke cloud backend.

##### Minggu 07: Sinkronisasi Data Antar Device & State Management
- **Materi Konsep**:
  - Masalah offline-first & network latency pada perangkat mobile.
  - Optimistic UI updates (tampilan langsung berubah sebelum server merespons).
- **Hands-on Challenge**:
  - Implementasi state management (Zustand / TanStack Query) di mobile & web.
  - Simulasi update data di HP dan langsung ter-update di Web saat refresh.

---

#### 📌 MINGGU 08: EVALUASI TENGAH SEMESTER (UTS)
- **Bentuk**: *Live Hackathon / Practical Exam (freeCodeCamp Style)*.
- **Tugas**: Mahasiswa diberikan spesifikasi PRD (*Product Requirement Document*). Dengan teknik Vibe Coding, mahasiswa membangun backend API, Web Admin, dan Mobile Client sederhana yang terhubung dalam waktu 120 menit.

---

#### 📌 BLOK 3: INTEGRASI AI DI WEB & MOBILE (LLM, STREAMING, & MULTIMODAL)

##### Minggu 09: Fondasi Integrasi AI (LLM API, System Prompts, & Structured Outputs)
- **Materi Konsep**:
  - Menghubungkan aplikasi web & mobile ke LLM (OpenAI / Gemini / Anthropic).
  - Structured JSON outputs: Menjamin balasan AI selalu berbentuk objek yang bisa di-*render* oleh UI.
- **Hands-on Challenge**:
  - Membangun fitur smart summary & auto-tagging pada aplikasi catatan yang tersinkron web-mobile.

##### Minggu 10: Streaming Responses (SSE) di Web dan Mobile
- **Materi Konsep**:
  - Kenapa user experience AI harus streaming? (Mengurangi *perceived latency*).
  - Server-Sent Events (SSE) vs HTTP polling.
- **Hands-on Challenge**:
  - Implementasi efek *typing / streaming response* chatbot atau assistant di Web dan React Native secara mulus.

##### Minggu 11: Multimodal AI: Mobile Camera & Voice ke Web AI Pipeline
- **Materi Konsep**:
  - Mobile adalah input device terbaik: Kamera, Microphone, GPS.
  - Mengirim audio (Whisper/Speech-to-Text) dan foto dokumen/objek dari HP ke backend AI untuk dianalisis.
- **Hands-on Challenge**:
  - Mini project: User memfoto struk belanja / menu makanan lewat HP, backend AI mengekstrak data JSON, dan web dashboard langsung menampilkan grafik keuangannya.

##### Minggu 12: Function Calling & Tool Calling (AI yang Menjalankan Aksi Nyata)
- **Materi Konsep**:
  - Mengubah AI dari sekadar "penjawab chat" menjadi "agen pelaksana".
  - Memberi AI kemampuan memanggil API backend (e.g. *“Pesan tiket”*, *“Kirim notifikasi ke HP”*).
- **Hands-on Challenge**:
  - Membuat AI Assistant di HP yang dapat menjalankan aksi nyata di database backend (CRUD via Natural Language).

---

#### 📌 BLOK 4: REALTIME SYNC, AGENTIC WORKFLOW & TUGAS BESAR

##### Minggu 13: Realtime WebSockets & Push Notifications
- **Materi Konsep**:
  - Komunikasi dua arah: WebSocket (Socket.io) vs Webhook.
  - Push notification ke ponsel saat ada event di Web (Expo Push Notifications).
- **Hands-on Challenge**:
  - Saat ada order/transaksi baru dibuat di Web, HP staf seketika berbunyi dan menampilkan notifikasi popup.

##### Minggu 14: Vibe Coding Advanced: Autonomous AI Agents & Coding Workflows
- **Materi Konsep**:
  - Menggunakan Agentic AI tools (Antigravity workflows, Cursor Composer, PRD-to-code pipelines).
  - Menjaga kualitas kode: Linting, static analysis, type checking, dan automated tests di era AI.
- **Hands-on Challenge**:
  - Refactoring & hardening proyek akhir: Menginstruksikan AI untuk mencari bug keamanan, missing edge-cases, dan optimasi performa.

##### Minggu 15: Deployment Fullstack (Cloud Web, Cloud API, & Mobile APK/Expo Preview)
- **Materi Konsep**:
  - Deployment Backend & Database (Railway / Render / Supabase / VPS).
  - Deployment Frontend Web (Vercel / Cloudflare).
  - Build & Distribution Mobile (Expo EAS Build / QR Code sharing).
- **Hands-on Challenge**:
  - Melakukan live deploy proyek fullstack terpadu hingga dapat diakses via domain publik dan di-scan QR-nya oleh mahasiswa lain via HP.

---

#### 📌 MINGGU 16: EVALUASI AKHIR SEMESTER (UAS)
- **Bentuk**: **Grand Showcase Proyek Akhir ("Connected AI-First App")**.
- **Deskripsi**: Setiap mahasiswa/tim mendemokan produk fullstack nyata yang menggabungkan:
  1. Backend API terpusat.
  2. Web Dashboard interaktif.
  3. Mobile App (Expo) yang terhubung.
  4. Fitur kecerdasan buatan (AI) yang menyelesaikan problem nyata.
  5. Dokumentasi Vibe Coding (Prompt Logs & Architecture Diagram).

---

### 📊 Komponen & Bobot Penilaian
| Komponen | Deskripsi | Bobot |
| :--- | :--- | :---: |
| **Weekly Hands-on Challenges** | Tugas mingguan gaya freeCodeCamp (Lab & Vibe Coding) | 30% |
| **Evaluasi Tengah Semester (UTS)** | Ujian praktikum live coding pembuatan API & Mobile Client | 25% |
| **Proyek Akhir & Showcase (UAS)** | Aplikasi Fullstack Web + Mobile + AI nyata yang ter-deploy | 35% |
| **Partisipasi & Prompt Discipline** | Kerapian PRD, etika AI-assisted coding, & kolaborasi | 10% |
