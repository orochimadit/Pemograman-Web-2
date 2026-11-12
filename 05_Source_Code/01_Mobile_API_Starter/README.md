# 🚀 Mobile API Starter Kit (TypeScript + Zod + Express)
### Modul Pembelajaran: Pemrograman Berorientasi Web 2
**Dosen Pengampu**: Aditya Pratama

Proyek starter kit backend REST API yang dirancang secara spesifik untuk aplikasi mobile (React Native / Expo / Flutter / Android / iOS) dengan standar *type-safe*, *cursor pagination*, *token auth*, dan *streaming AI (SSE)*.

---

## 🛠️ Cara Menjalankan di Komputer Lokal

1. **Masuk ke folder starter**:
   ```bash
   cd "05_Source_Code/01_Mobile_API_Starter"
   ```

2. **Instalasi dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan dalam mode development (Auto-reload)**:
   ```bash
   npm run dev
   ```
   Server akan aktif di: `http://localhost:3000`

---

## 🧪 Cara Pengujian API
Anda dapat menguji semua endpoint menggunakan:
- **VS Code Extension**: [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) atau [Thunder Client](https://www.thunderclient.com/).
  - Cukup buka file `test_requests.http` dan klik tombol **Send Request**.
- **cURL di Terminal**:
  ```bash
  # Uji Healthcheck
  curl http://localhost:3000/health

  # Uji Infinite Scroll Feed Mobile (Limit 3)
  curl "http://localhost:3000/api/feed?limit=3"

  # Uji Streaming Respon AI (SSE)
  curl -N "http://localhost:3000/api/ai/stream-assistant?query=Halo"
  ```
