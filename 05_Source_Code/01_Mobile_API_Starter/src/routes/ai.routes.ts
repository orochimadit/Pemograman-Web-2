import { Router, Request, Response } from "express";

const router = Router();

// GET /api/ai/stream-assistant?query=...
// Protokol Server-Sent Events (SSE) untuk efek ketikan real-time di antarmuka mobile
router.get("/stream-assistant", (req: Request, res: Response) => {
  const query = (req.query.query as string) || "Bagaimana cara menghubungkan mobile ke API?";

  // Pasang Header Wajib SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const aiAnswer = `Halo mahasiswa! Anda bertanya: "${query}". Untuk menghubungkan mobile app ke API modern, pastikan Anda menggunakan: 1) Bearer Token JWT tersimpan di SecureStore, 2) Cursor-based pagination untuk feed infinite scroll, 3) Validasi skema Zod di backend, dan 4) Protokol SSE ini agar respon AI tampil mengalir tanpa membuat pengguna menunggu lama!`;

  const tokens = aiAnswer.split(" ");
  let currentIndex = 0;

  const timer = setInterval(() => {
    if (currentIndex < tokens.length) {
      const payload = {
        token: tokens[currentIndex] + " ",
        progress: Math.round(((currentIndex + 1) / tokens.length) * 100)
      };
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
      currentIndex++;
    } else {
      res.write(`data: [DONE]\n\n`);
      clearInterval(timer);
      res.end();
    }
  }, 100);

  req.on("close", () => {
    clearInterval(timer);
  });
});

export default router;
