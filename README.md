# 🌐 Pemrograman Berorientasi Web 2
### Fullstack Web & Mobile Interconnection di Era AI (freeCodeCamp Style & Vibe Coding)
**Dosen Pengampu / Pemateri**: Aditya Pratama

Repositori resmi materi mata kuliah **Pemrograman Berorientasi Web 2**. Kurikulum ini berfokus pada **bagaimana sistem Web terhubung dengan Mobile secara mulus** di era kecerdasan buatan (AI), mengadopsi pendekatan **Vibe Coding** (AI-assisted engineering) dan pedagogi praktis ala **freeCodeCamp** (*100% hands-on, learn-by-building, modular challenges*).

---

## 🎯 Fokus Utama Mata Kuliah

1. **🔗 Web to Mobile Interoperability**: Membangun satu arsitektur backend/API terpusat yang melayani Web Dashboard dan Mobile App secara bersamaan, lengkap dengan autentikasi terpadu dan sinkronisasi data real-time.
2. **🤖 Integrasi AI di Era Modern**: Bukan sekadar teori prompt, melainkan menghubungkan LLM API, Streaming Responses (SSE), Multimodal Input (kamera/voice HP dikirim ke AI dan hasilnya muncul di Web), serta Function Calling.
3. **⚡ Vibe Coding Workflow**: Menguasai cara kerja engineer modern—mahasiswa bertindak sebagai *Software Architect & Quality Reviewer*, sementara AI Coding Agent (Cursor, Antigravity, Claude Code) mengeksekusi kode secara cepat, terstruktur, dan teruji (*type-safe*).
4. **🛠️ freeCodeCamp Pedagogy**: Teori to-the-point, langsung praktik ngoding per modul, tantangan langkah-demi-langkah, dan berbasis proyek nyata (*real-world apps*).

---

## 📂 Struktur Direktori

```text
Pemrograman Berorientasi Web 2/
├── 00_Silabus_dan_RPS/             # Silabus perkuliahan & RPS 16 pertemuan lengkap
├── 01_Materi_dan_Slide/            # Modul pembelajaran M01 - M16 & rangkuman konsep
├── 02_Modul_Praktikum/             # Hands-on challenges ala freeCodeCamp per minggu
├── 03_Tugas_dan_Latihan/           # Latihan mandiri, PRD mini, dan prompt logs
├── 04_Tugas_Besar_Proyek/          # Panduan proyek akhir (Web + Mobile + AI App)
├── 05_Source_Code/                 # Starter kit, API backend, Web app, & Mobile client
├── .gitignore                      # Ignore rule untuk node_modules, build, env
└── README.md                       # Dokumentasi utama perkuliahan
```

---

## 🗓️ Peta 16 Pertemuan Perkuliahan

| Pertemuan | Topik Materi Perkuliahan | Fokus Pembelajaran | Output Hands-on |
| :---: | :--- | :--- | :--- |
| **01** | **Paradigma Vibe Coding & Arsitektur Multi-Client** | Ekosistem Web modern, arsitektur decoupled (Web + Mobile), prinsip Vibe Coding | Setup environment, run first cross-device API |
| **02** | **Desain API Type-Safe & Kontrak Data** | RESTful design, Zod schema validation, Contract-First development | CRUD API type-safe siap pakai di Web & Mobile |
| **03** | **Database Modern, ORM, & Cloud Media Storage** | PostgreSQL/SQLite, Prisma/Drizzle ORM, Multipart image upload | Media upload endpoint untuk kamera HP & Web |
| **04** | **Unified Authentication (JWT & Secure Storage)** | Auth satu pintu: Cookie/LocalStorage di Web vs SecureStore di Mobile | Sistem login & register terpadu |
| **05** | **Web Client: Modern Dashboard (React/Next.js)** | Responsive web UI, Shadcn UI, caching dengan React Query / SWR | Web dashboard interaktif pemantau data |
| **06** | **Mobile Client: Universal App dengan Expo** | React Native, Expo Router, akses sensor & kamera smartphone | Mobile client membaca data API yang sama |
| **07** | **State Sync Antar Perangkat & Offline-First** | Optimistic UI updates, caching data, latency handling | Sinkronisasi data real-time web & mobile |
| **08** | **UTS: Live Hackathon (freeCodeCamp Style)** | Ujian praktikum mandiri membangun API + Mobile Client dari PRD | Proyek terhubung dalam 120 menit |
| **09** | **Fondasi AI: LLM API & Structured Outputs** | Mengintegrasikan model AI, JSON mode, response parsing | Fitur smart summary & auto-tagging |
| **10** | **Streaming Responses (SSE) di Web & Mobile** | Server-Sent Events, stream chunks, typing effect UX | Chat/AI stream interaktif di Web & HP |
| **11** | **Multimodal AI: Kamera HP ke Web Dashboard** | Vision AI, OCR, pengiriman gambar HP ke AI inference | Foto struk/dokumen di HP -> analisa di Web |
| **12** | **Function Calling & AI Action Execution** | Tool calling, agentic actions, database modification via AI | AI Assistant yang dapat melakukan CRUD nyata |
| **13** | **Realtime WebSockets & Push Notifications** | Socket.io, event-driven architecture, Expo Push Notifications | Notifikasi instan di HP saat ada event di Web |
| **14** | **Vibe Coding Hardening & Automated Testing** | Agentic refactoring, unit test, error boundary, security check | Hardening codebase bebas bug |
| **15** | **Deployment Fullstack: Web, API, & Mobile** | Cloud deployment (Vercel, Render/Railway), Expo EAS preview | Live production URL & runnable mobile preview |
| **16** | **UAS: Grand Showcase Proyek Terpadu** | Presentasi produk fullstack nyata (Web + Mobile + AI) | Live demo aplikasi utuh yang telah terdeploy |

---

## 🛠️ Tech Stack & Alat Pendukung
- **Bahasa**: TypeScript / JavaScript (ESNext)
- **Backend / API**: Node.js, Hono / Express, Prisma / Drizzle ORM
- **Web**: React / Next.js, Tailwind CSS, Shadcn UI
- **Mobile**: React Native (Expo Go & Expo Router)
- **AI & Integrasi**: OpenAI / Google Gemini API, Vercel AI SDK
- **Vibe Coding Tools**: Cursor, Antigravity, Claude Code, GitHub Copilot

---

> 📖 **Dokumen Silabus & RPS Lengkap**: [Lihat RPS Pemrograman Web 2](file:///d:/Badra/project/Materi%20Perkuliahan/Pemrograman%20Berorientasi%20Web%202/00_Silabus_dan_RPS/RPS_Pemrograman_Web_2_VibeCoding.md)
