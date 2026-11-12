# 🧪 Modul Praktikum: Hands-on Building Mobile-First REST API
### Mata Kuliah: Pemrograman Berorientasi Web 2
**Dosen Pengampu / Pemateri**: Aditya Pratama  
**Pendekatan**: *freeCodeCamp Style* (*Challenge-Driven, Interactive, Step-by-Step*)

---

## 🧭 Petunjuk Pelaksanaan Praktikum
1. Praktikum ini dirancang dengan gaya **freeCodeCamp**: Setiap tahapan adalah sebuah **Challenge** modular yang harus diuji dan lolos verifikasi sebelum melanjutkan ke tahap berikutnya.
2. Mahasiswa diperkenankan menggunakan **AI Coding Assistant** (Antigravity, Cursor, Copilot) dengan prinsip **Vibe Coding**: Anda yang menentukan kontrak data dan arsitektur, AI yang membantu melengkapi implementasi, dan Anda yang memverifikasi hasilnya.
3. Alat uji yang digunakan: Terminal (cURL), VS Code REST Client (`.http`), Postman, atau Thunder Client.

---

## 🧩 CHALLENGE 01: Inisialisasi Proyek & Server Healthcheck Type-Safe
**Target**: Menjalankan server Node.js + TypeScript dengan endpoint status server yang dapat diakses oleh browser maupun emulator mobile.

### Langkah Kerja:
1. Buat folder proyek dan inisialisasi:
   ```bash
   mkdir mobile-api-lab && cd mobile-api-lab
   npm init -y
   npm install express zod cors dotenv
   npm install -D typescript @types/express @types/node @types/cors ts-node-dev
   npx tsc --init
   ```
2. Buat file `src/index.ts`:
   ```typescript
   import express, { Request, Response } from "express";
   import cors from "cors";

   const app = express();
   const PORT = process.env.PORT || 3000;

   app.use(cors());
   app.use(express.json());

   // Healthcheck Endpoint
   app.get("/health", (req: Request, res: Response) => {
     res.status(200).json({
       status: "healthy",
       timestamp: new Date().toISOString(),
       server: "Mobile-First API v1.0"
     });
   });

   app.listen(PORT, () => {
     console.log(`🚀 Mobile API Server berjalan di http://localhost:${PORT}`);
   });
   ```
3. Tambahkan script pada `package.json`:
   ```json
   "scripts": {
     "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
   }
   ```
4. Jalankan `npm run dev` dan buka `http://localhost:3000/health`.

✅ **Kriteria Lulus Challenge 01**: Server merespons status `200 OK` dengan payload JSON `{ status: "healthy", ... }`.

---

## 🧩 CHALLENGE 02: Desain Response Envelope & Middleware Validasi Zod
**Target**: Memastikan semua response (baik sukses maupun gagal) memiliki struktur yang seragam sehingga aplikasi mobile tidak mengalami crash saat terjadi error.

### Langkah Kerja:
1. Buat folder `src/middlewares/validate.ts`:
   ```typescript
   import { Request, Response, NextFunction } from "express";
   import { AnyZodObject, ZodError } from "zod";

   export const validate = (schema: AnyZodObject) => {
     return async (req: Request, res: Response, next: NextFunction) => {
       try {
         req.body = await schema.parseAsync(req.body);
         next();
       } catch (error) {
         if (error instanceof ZodError) {
           return res.status(400).json({
             success: false,
             error: {
               code: "VALIDATION_ERROR",
               message: "Payload yang dikirimkan tidak valid",
               details: error.errors.map(err => ({
                 field: err.path.join("."),
                 message: err.message
               }))
             }
           });
         }
         return res.status(500).json({
           success: false,
           error: { code: "INTERNAL_ERROR", message: "Terjadi kesalahan server" }
         });
       };
     };
   };
   ```

2. Buat skema registrasi mahasiswa di `src/schemas/auth.schema.ts`:
   ```typescript
   import { z } from "zod";

   export const RegisterSchema = z.object({
     nim: z.string().min(8, "NIM minimal 8 digit").max(12, "NIM maksimal 12 digit"),
     nama: z.string().min(3, "Nama minimal 3 karakter"),
     email: z.string().email("Format email salah"),
     password: z.string().min(6, "Password minimal 6 karakter")
   });
   ```

3. Uji endpoint dengan mengirim data yang salah (misal email salah dan password cuma 2 huruf).
   - Pastikan server mengembalikan HTTP `400` dengan daftar field error yang jelas dan detail.

✅ **Kriteria Lulus Challenge 02**: Mengembalikan format error seragam berisi `code`, `message`, dan `details`.

---

## 🧩 CHALLENGE 03: Cursor-Based Pagination untuk Infinite Scroll Mobile Feed
**Target**: Membangun endpoint berita/pengumuman kampus yang mendukung *infinite scroll* tanpa risiko duplikasi data saat scroll ke bawah di aplikasi mobile.

### Langkah Kerja:
1. Simulasikan data feed di `src/data/announcements.ts`:
   ```typescript
   export interface Announcement {
     id: string;
     title: string;
     category: "AKADEMIK" | "BEASISWA" | "EVENT";
     postedAt: string;
   }

   // 15 Contoh Data Berurutan Waktu Terbaru ke Terlama
   export const mockAnnouncements: Announcement[] = Array.from({ length: 15 }, (_, i) => ({
     id: `ann_${(100 - i).toString().padStart(3, "0")}`,
     title: `Pengumuman Penting Kampus #${100 - i}`,
     category: i % 2 === 0 ? "AKADEMIK" : "EVENT",
     postedAt: new Date(Date.now() - i * 3600000).toISOString()
   }));
   ```

2. Buat endpoint di `src/routes/announcements.ts`:
   ```typescript
   import { Router, Request, Response } from "express";
   import { mockAnnouncements } from "../data/announcements";

   const router = Router();

   router.get("/", (req: Request, res: Response) => {
     const cursor = req.query.cursor as string | undefined;
     const limit = parseInt(req.query.limit as string) || 5;

     let startIndex = 0;
     if (cursor) {
       const foundIndex = mockAnnouncements.findIndex(item => item.id === cursor);
       if (foundIndex !== -1) {
         startIndex = foundIndex + 1;
       }
     }

     const items = mockAnnouncements.slice(startIndex, startIndex + limit);
     const nextItem = mockAnnouncements[startIndex + limit];
     const nextCursor = nextItem ? items[items.length - 1].id : null;
     const hasMore = Boolean(nextCursor);

     return res.status(200).json({
       success: true,
       data: items,
       pagination: {
         nextCursor,
         hasMore,
         count: items.length
       }
     });
   });

   export default router;
   ```

3. **Uji Pagination Menggunakan cURL**:
   - Request batch 1: `curl http://localhost:3000/api/announcements?limit=3`
     - Perhatikan nilai `nextCursor` (misal: `ann_098`).
   - Request batch 2: `curl "http://localhost:3000/api/announcements?limit=3&cursor=ann_098"`
     - Perhatikan data yang muncul berlanjut mulus dari `ann_097`.

✅ **Kriteria Lulus Challenge 03**: Endpoint sukses mengembalikan pagination token `nextCursor` dan `hasMore` sesuai parameter limit.

---

## 🧩 CHALLENGE 04: Mobile Auth Flow (Bearer Token & Refresh Flow)
**Target**: Memahami mekanisme otentikasi mobile menggunakan header `Authorization: Bearer <token>` dan rute refresh token.

### Langkah Kerja:
1. Install paket pendukung:
   ```bash
   npm install jsonwebtoken
   npm install -D @types/jsonwebtoken
   ```
2. Buat router auth yang menghasilkan:
   - `accessToken`: Kadaluarsa dalam 15 menit (untuk transaksi data harian).
   - `refreshToken`: Kadaluarsa dalam 7 hari (disimpan aman di storage HP).
3. Buat middleware `authGuard` yang membaca header:
   ```typescript
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];
   if (!token) return res.status(401).json({ success: false, message: "Token tidak ditemukan" });
   ```
4. Buat endpoint `/api/auth/refresh` untuk menukar Refresh Token yang masih valid dengan Access Token baru tanpa harus login ulang.

✅ **Kriteria Lulus Challenge 04**: Endpoint yang dilindungi mengembalikan `401 Unauthorized` jika token salah/hilang, dan `200 OK` saat token valid disertakan.

---

## 🧩 CHALLENGE 05: Simulasi Upload Foto dari Kamera Mobile (Multipart/Form-Data)
**Target**: Menangani upload gambar/bukti kegiatan dari smartphone dengan filter ukuran dan kompresi tipe file.

### Langkah Kerja:
1. Install Multer:
   ```bash
   npm install multer
   npm install -D @types/multer
   ```
2. Konfigurasi penyimpanan lokal & validasi tipe file (hanya izinkan JPEG, PNG, dan WebP, maksimal ukuran 5 MB):
   ```typescript
   import multer from "multer";

   const upload = multer({
     limits: { fileSize: 5 * 1024 * 1024 },
     fileFilter: (req, file, cb) => {
       if (file.mimetype.startsWith("image/")) {
         cb(null, true);
       } else {
         cb(new Error("Hanya file gambar yang diperbolehkan!"));
       }
     }
   });
   ```
3. Buat endpoint `POST /api/media/upload` yang mengembalikan URL publik gambar.

✅ **Kriteria Lulus Challenge 05**: Berhasil mengunggah file foto dan menerima URL publik file tersebut dalam response JSON.

---

## 🧩 CHALLENGE 06 (BONUS AI): Endpoint Streaming AI Assistant (SSE) untuk Mobile Chat
**Target**: Mengirim balasan teks bertahap (*typing effect*) ke aplikasi mobile menggunakan protokol **Server-Sent Events (SSE)**.

### Langkah Kerja:
1. Buat endpoint `GET /api/ai/stream-assistant?prompt=...`:
   ```typescript
   router.get("/stream-assistant", (req: Request, res: Response) => {
     res.setHeader("Content-Type", "text/event-stream");
     res.setHeader("Cache-Control", "no-cache");
     res.setHeader("Connection", "keep-alive");

     const sampleAnswer = "Halo mahasiswa! Ini adalah balasan streaming dari AI Assistant mobile Anda secara real-time.";
     const words = sampleAnswer.split(" ");
     let index = 0;

     const interval = setInterval(() => {
       if (index < words.length) {
         res.write(`data: ${JSON.stringify({ token: words[index] + " " })}\n\n`);
         index++;
       } else {
         res.write(`data: [DONE]\n\n`);
         clearInterval(interval);
         res.end();
       }
     }, 120);

     req.on("close", () => {
       clearInterval(interval);
     });
   });
   ```
2. Uji endpoint langsung melalui browser atau `curl -N http://localhost:3000/api/ai/stream-assistant`. Kata-kata akan muncul satu per satu tanpa menunggu selesai.

✅ **Kriteria Lulus Challenge 06**: Header `text/event-stream` terpasang dengan benar dan payload terkirim potongan demi potongan (*chunk*).
