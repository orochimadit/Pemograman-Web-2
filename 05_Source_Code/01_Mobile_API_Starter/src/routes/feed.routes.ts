import { Router, Response } from "express";
import { CreatePostSchema, FeedQuerySchema } from "../schemas";
import { validateBody, validateQuery } from "../middlewares/validate";
import { requireMobileAuth, AuthenticatedRequest } from "../middlewares/auth";

const router = Router();

interface FeedItem {
  id: string;
  authorName: string;
  caption: string;
  category: string;
  imageUrl?: string;
  likesCount: number;
  createdAt: string;
}

// Memory Database Simulasi Feed Kampus
const feedDb: FeedItem[] = Array.from({ length: 25 }, (_, i) => ({
  id: `post_${(200 - i).toString().padStart(4, "0")}`,
  authorName: i % 3 === 0 ? "Budi Santoso" : "Siti Nurhaliza",
  caption: `Diskusi Proyek Web & Mobile di era AI ke-${200 - i} 🚀 #VibeCoding #MobileDev`,
  category: i % 2 === 0 ? "AKADEMIK" : "DISKUSI",
  imageUrl: i % 4 === 0 ? "https://picsum.photos/400/300" : undefined,
  likesCount: Math.floor(Math.random() * 50) + 5,
  createdAt: new Date(Date.now() - i * 1800000).toISOString()
}));

// Memory Cache untuk Idempotency Key (Mencegah submit ganda saat sinyal HP drop)
const idempotencyStore = new Map<string, { response: any; timestamp: number }>();

// GET /api/feed -> Infinite Scroll Cursor Pagination Khusus Mobile
router.get("/", validateQuery(FeedQuerySchema), (req, res: Response) => {
  const { cursor, limit } = req.query as unknown as { cursor?: string; limit: number };

  let startIndex = 0;
  if (cursor) {
    const foundIdx = feedDb.findIndex((item) => item.id === cursor);
    if (foundIdx !== -1) {
      startIndex = foundIdx + 1;
    }
  }

  const items = feedDb.slice(startIndex, startIndex + limit);
  const nextItem = feedDb[startIndex + limit];
  const nextCursor = nextItem && items.length > 0 ? items[items.length - 1].id : null;
  const hasMore = Boolean(nextCursor);

  return res.status(200).json({
    success: true,
    data: items,
    pagination: {
      nextCursor,
      hasMore,
      returnedCount: items.length
    }
  });
});

// POST /api/feed -> Posting Baru dengan Idempotency Key & Bearer Auth
router.post(
  "/",
  requireMobileAuth,
  validateBody(CreatePostSchema),
  (req: AuthenticatedRequest, res: Response) => {
    const idempotencyKey = req.headers["x-idempotency-key"] as string | undefined;

    // Cek apakah key sudah pernah diproses (mencegah klik 2x di HP)
    if (idempotencyKey) {
      const cached = idempotencyStore.get(idempotencyKey);
      if (cached && Date.now() - cached.timestamp < 300000) {
        // Return respons sebelumnya (HTTP 200) tanpa duplikasi
        return res.status(200).json({
          ...cached.response,
          _idempotentReplay: true
        });
      }
    }

    const { caption, category, imageUrl } = req.body;
    const author = req.user?.nama || "Mahasiswa Anonim";

    const newPost: FeedItem = {
      id: `post_${Date.now()}`,
      authorName: author,
      caption,
      category,
      imageUrl,
      likesCount: 0,
      createdAt: new Date().toISOString()
    };

    // Masukkan ke posisi paling atas feed
    feedDb.unshift(newPost);

    const responsePayload = {
      success: true,
      message: "Postingan berhasil dipublikasikan ke feed mobile",
      data: newPost
    };

    if (idempotencyKey) {
      idempotencyStore.set(idempotencyKey, {
        response: responsePayload,
        timestamp: Date.now()
      });
    }

    return res.status(201).json(responsePayload);
  }
);

export default router;
