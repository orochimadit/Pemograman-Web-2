# 📘 Modul Pembelajaran: Merancang & Membangun REST API Modern untuk Aplikasi Mobile di Era AI
### Mata Kuliah: Pemrograman Berorientasi Web 2
**Dosen Pengampu / Pemateri**: Aditya Pratama  
**Pendekatan**: *freeCodeCamp Style* (*100% Hands-on, Modular, Project-Driven*) & *Vibe Coding Framework*

---

## 🎯 Capaian Pembelajaran (Learning Outcomes)
Setelah mempelajari modul ini, mahasiswa diharapkan mampu:
1. **Membedakan Karakteristik API Mobile vs Web Tradisional**: Menjelaskan mengapa API untuk mobile memerlukan optimasi payload, penanganan jaringan tidak stabil (*flaky network*), dan strategi hemat baterai/kuota.
2. **Menerapkan 7 Prinsip Emas API Mobile-First**: Merancang *Cursor-Based Pagination*, *Unified Error Handling*, *Bearer JWT Authentication*, dan *Idempotency Key*.
3. **Membangun API Type-Safe & Contract-First**: Menggunakan TypeScript dan Zod untuk validasi request payload secara ketat sebelum menyentuh logika bisnis.
4. **Mengintegrasikan Endpoint AI untuk Mobile**: Membangun endpoint *Server-Sent Events (SSE)* untuk teks streaming dan endpoint multimodal untuk menerima foto dari kamera HP.
5. **Menguasai Metode Vibe Coding**: Bertindak sebagai *API Architect* yang memandu AI Coding Agent (Cursor, Antigravity, GitHub Copilot) melalui PRD dan spesifikasi kontrak data yang terukur.

---

## 1. Mengapa API untuk Mobile Berbeda dari Web Biasa?

Banyak pengembang pemula membuat kesalahan fatal: **menggunakan API web lama secara mentah-mentah untuk aplikasi mobile**. Di perangkat mobile, kondisi lingkungannya jauh berbeda dari laptop/desktop yang terhubung Wi-Fi stabil:

```text
+------------------------+---------------------------------------+---------------------------------------+
| PARAMETER              | WEB BROWSER DESKTOP                   | MOBILE APP (iOS / Android)            |
+------------------------+---------------------------------------+---------------------------------------+
| Kondisi Jaringan       | Relatif stabil (Wi-Fi kantor / rumah) | Flaky (4G/5G, 지하철, lift, sinyal hilang) |
| Konsumsi Daya & Kuota  | Menggunakan daya listrik langsung     | Baterai terbatas & kuota data berbayar|
| Ukuran Layar           | Lebar, pagination halaman (1, 2, 3..) | Vertikal, Infinite Scroll (Tarik bawah)|
| Mekanisme Autentikasi  | HttpOnly Cookies / Session            | Bearer Token (JWT di SecureStore/Keychain)|
| Hardware Input         | Keyboard, Mouse, Webcam               | Kamera resolusi tinggi, GPS, Mic, Sensor|
| Penanganan Versi       | Sekali deploy web, semua user refresh | User lama enggan update APK di Playstore |
+------------------------+---------------------------------------+---------------------------------------+
```

---

## 2. 7 Prinsip Emas Desain API Khusus Mobile (*Mobile-First API*)

### 1️⃣ Minimal Payload & Anti Over-Fetching
Jangan kirim seluruh baris tabel database ke mobile. Hanya kirim field yang benar-benar ditampilkan di layar HP untuk menghemat transfer data dan mempercepat rendering UI.

```json
/* ❌ BURUK: Mengirim semua field database (3.8 KB per item) */
{
  "id": 108,
  "title": "Kopi Susu Gula Aren",
  "internal_sku": "SKU-992-XYZ",
  "supplier_tax_code": "TX-0091",
  "created_by_admin_id": 4,
  "created_at": "2026-10-12T04:12:00Z",
  "updated_at": "2026-11-01T12:00:00Z",
  "deleted_at": null,
  "cost_price": 8000,
  "selling_price": 18000
}

/* ✅ BAIK (Mobile-Friendly Payload: hanya 0.3 KB per item) */
{
  "id": "item_108",
  "name": "Kopi Susu Gula Aren",
  "price": 18000,
  "imageUrl": "https://cdn.kampus.ac.id/thumb/kopi.webp",
  "isAvailable": true
}
```

---

### 2️⃣ Cursor-Based Pagination (Wajib untuk Infinite Scroll)
Pada web desktop, kita terbiasa dengan `page=1&limit=10` (*Offset-based*). Namun pada mobile app dengan antarmuka **Infinite Scroll** (seperti Instagram, TikTok, Twitter/X), *Offset-based* menyebabkan **duplikasi data atau item terlewat** saat ada postingan baru masuk saat user sedang scroll.

```
+----------------------------------------------------------------------------------+
|                   OFFSET PAGINATION VS CURSOR PAGINATION                         |
|                                                                                  |
| OFFSET-BASED (?page=2&limit=2):                                                  |
| 1. User melihat Item A & Item B di halaman 1.                                    |
| 2. Tiba-tiba user lain posting Item X baru di posisi paling atas!                |
| 3. Saat mobile request page=2, Item B bergeser ke halaman 2 dan muncul 2x!       |
|                                                                                  |
| CURSOR-BASED (?cursor=item_B&limit=2):                                           |
| 1. Mobile request: "Beri saya 2 data SETELAH item_B".                            |
| 2. Mau ada 100 data baru masuk di atasnya, query database tetap mengambil data   |
|    persis setelah item_B. Tidak akan pernah ada data dobel!                      |
+----------------------------------------------------------------------------------+
```

#### Struktur Response Cursor Mobile Standar:
```json
{
  "success": true,
  "data": [
    { "id": "post_102", "caption": "Workshop Mobile AI", "likes": 42 },
    { "id": "post_101", "caption": "Belajar Vibe Coding seru!", "likes": 98 }
  ],
  "pagination": {
    "nextCursor": "post_101",
    "hasMore": true
  }
}
```

---

### 3️⃣ Format Response & Error Standar yang Konsisten
Aplikasi mobile (React Native/Flutter/Kotlin) sangat bergantung pada *strict type parsing*. Jika backend saat sukses mengembalikan object, tapi saat error mengembalikan string HTML atau struktur berbeda, mobile app akan langsung **CRASH** (*white screen of death*).

#### Format Standar JSON Response:
```json
/* Response Sukses */
{
  "success": true,
  "data": { ... },
  "message": "Operasi berhasil"
}

/* Response Gagal / Error Validasi */
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data input tidak valid",
    "details": [
      { "field": "phone", "message": "Nomor WhatsApp harus diawali 08 atau 62" }
    ]
  }
}
```

#### Aturan HTTP Status Codes untuk Mobile:
* `200 OK`: Permintaan sukses dan menghasilkan data.
* `201 Created`: Data baru berhasil dibuat (misal: register, upload, checkout).
* `400 Bad Request`: Payload JSON tidak lolos validasi skema.
* `401 Unauthorized`: Token JWT expired atau tidak disertakan di header.
* `403 Forbidden`: Token valid, tetapi user tidak punya hak akses ke resource tersebut.
* `404 Not Found`: Data yang dicari tidak ditemukan.
* `409 Conflict`: Data sudah ada (misal: email/NIM sudah terdaftar).
* `429 Too Many Requests`: Rate limit terlampaui (mencegah spamming request dari HP).
* `500 Internal Server Error`: Kesalahan server (harus disembunyikan stack trace-nya dari user mobile).

---

### 4️⃣ Unified Authentication: Bearer Token & Refresh Token Flow
Di mobile, aplikasi tidak menyimpan token di browser cookie (karena batasan Webview & native environment).
* **Access Token**: Berumur pendek (misal: 15 menit), dikirim lewat header:  
  `Authorization: Bearer <jwt_access_token>`
* **Refresh Token**: Berumur panjang (misal: 30 hari), disimpan aman di **SecureStore** (Expo/React Native) atau **Keychain** (iOS). Saat Access Token kedaluwarsa (HTTP 401), aplikasi mobile secara otomatis menembak endpoint `/api/auth/refresh` di background tanpa meminta user login ulang.

---

### 5️⃣ Idempotency Key (Mencegah Duplikasi Transaksi saat Sinyal Putus)
Pernahkah Anda menekan tombol "Bayar" atau "Kirim Pesanan" saat sinyal HP 1 bar, layar loading berputar, lalu Anda klik 3 kali karena panik?
* Tanpa **Idempotency Key**, server akan memproses 3 transaksi dan saldo terpotong 3 kali!
* **Solusi**: Client mobile membuat UUID acak sebelum request dikirim:  
  `X-Idempotency-Key: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d`
* Server mengecek: Jika ID ini sudah pernah diproses dalam 5 menit terakhir, server **tidak mengeksekusi ulang**, melainkan langsung mengembalikan hasil transaksi pertama yang tersimpan di cache.

---

### 6️⃣ Penanganan Upload Media / Kamera Mobile yang Efisien
Foto dari kamera smartphone modern rata-rata berukuran 5 MB – 15 MB.
* Mengirim file 15 MB langsung ke server backend via koneksi seluler akan lambat, membebani bandwidth server, dan rawan timeout.
* **Arsitektur Terbaik**:
  1. Mobile melakukan resize & kompresi lokal sebelum dikirim (format WebP/JPEG, max 1080px).
  2. Gunakan **Multipart/Form-Data** atau **Pre-signed URL S3/Cloudinary**:
     - Mobile minta upload URL ke backend: `POST /api/media/upload-url`
     - Backend memberi URL upload langsung ke S3 Cloud Storage.
     - Mobile mengunggah gambar langsung ke Cloud Storage tanpa membebani server aplikasi.

---

### 7️⃣ AI-Ready Architecture: Streaming Server-Sent Events (SSE)
Di era AI modern, user mobile mengharapkan interaksi cerdas (asisten chat, rangkuman otomatis, analisis gambar).
* Jika model AI membutuhkan waktu 6 detik untuk berpikir, jangan buat user menatap layar kosong selama 6 detik (*User Experience buruk*).
* Gunakan protokol **Server-Sent Events (SSE)** agar setiap kata yang di-generate oleh AI mengalir secara *real-time* ke antarmuka aplikasi mobile (*typing animation*).

```
+---------------+           GET /api/ai/stream           +----------------+
|               | -------------------------------------> |                |
|               | <------------------------------------- |  Node.js API   |
|               |      event: message, data: "Halo"      |   (Backend)    |
|  Mobile App   | <------------------------------------- |       |        |
|  (Expo / RN)  |      event: message, data: " saya"     |       v        |
|               | <------------------------------------- |  LLM Engine    |
|               |      event: message, data: " AI!"      | (Gemini/OpenAI)|
+---------------+                                        +----------------+
```

---

## 3. Implementasi Praktis: Type-Safe API dengan TypeScript & Zod

Berikut adalah struktur kode standar industri (*clean architecture*) yang mudah dikembangkan menggunakan pendekatan Vibe Coding:

```typescript
// src/schemas/post.schema.ts
import { z } from "zod";

// Kontrak Request Buat Postingan Baru dari Mobile
export const CreatePostSchema = z.object({
  caption: z.string().min(3, "Caption minimal 3 karakter").max(280, "Caption maksimal 280 karakter"),
  imageUrl: z.string().url("URL gambar tidak valid").optional(),
  tags: z.array(z.string()).max(5, "Maksimal 5 tags").default([])
});

// Kontrak Query Feed dengan Cursor Pagination
export const GetFeedQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(50).default(10)
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;
export type GetFeedQuery = z.infer<typeof GetFeedQuerySchema>;
```

```typescript
// src/routes/posts.ts
import { Router, Request, Response } from "express";
import { CreatePostSchema, GetFeedQuerySchema } from "../schemas/post.schema";

const router = Router();

// Endpoint Feed Khusus Mobile (Cursor-based)
router.get("/feed", (req: Request, res: Response) => {
  const parseResult = GetFeedQuerySchema.safeParse(req.query);
  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      error: {
        code: "INVALID_QUERY_PARAMS",
        message: "Parameter filter feed tidak valid",
        details: parseResult.error.flatten().fieldErrors
      }
    });
  }

  const { cursor, limit } = parseResult.data;
  // Contoh logika query database berdasarkan ID cursor
  // SELECT * FROM posts WHERE id < :cursor ORDER BY id DESC LIMIT :limit
  
  return res.status(200).json({
    success: true,
    data: [
      { id: "post_99", caption: "Ngoding API Mobile Seru!", likes: 12 }
    ],
    pagination: {
      nextCursor: "post_99",
      hasMore: false
    }
  });
});

export default router;
```

---

## 4. Panduan Vibe Coding: Memandu AI Membangun API Mobile

Sebagai mahasiswa dan *Software Architect*, jangan minta AI dengan prompt malas seperti:
> ❌ *"Buatkan saya API untuk mobile"* (Hasilnya akan acak-acakan, tanpa skema validasi, dan rawan error).

Gunakan **Structured Architectural Prompting**:
> ✅ *"Bertindaklah sebagai Senior Backend Architect. Saya sedang membangun REST API untuk aplikasi mobile (React Native Expo) menggunakan TypeScript, Express, dan Zod. Tolong buatkan router `auth.ts` dengan kriteria berikut:*  
> *1. Endpoint `POST /register` dan `POST /login` dengan validasi Zod ketat.*  
> *2. Response format standar: `{ success: boolean, data?: ..., error?: { code, message, details } }`.*  
> *3. Return Access Token (berlaku 15 menit) dan Refresh Token.*  
> *4. Sertakan penanganan jika email sudah terdaftar (HTTP 409 Conflict).*  
> *5. Tuliskan kode yang siap dijalankan dengan tipe TypeScript yang lengkap tanpa menggunakan tipe `any`."*

Dengan prompt berorientasi kontrak arsitektural seperti ini, AI akan menghasilkan kode yang bersih, aman, dan siap pakai.
