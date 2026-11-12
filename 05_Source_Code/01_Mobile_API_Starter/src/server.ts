import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import feedRoutes from "./routes/feed.routes";
import aiRoutes from "./routes/ai.routes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Global
app.use(cors());
app.use(express.json());

// Endpoint Root & Healthcheck
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "Mobile-First API Engine (Web 2)",
    docs: "/api/endpoints"
  });
});

// Routing Modul
app.use("/api/auth", authRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/ai", aiRoutes);

// Fallback 404 Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: "ROUTE_NOT_FOUND",
      message: `Endpoint '${req.method} ${req.originalUrl}' tidak ditemukan`
    }
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Mobile API Server Aktif: http://localhost:${PORT}`);
  console.log(`📱 Healthcheck Endpoint : http://localhost:${PORT}/health`);
  console.log(`📜 Modul Terhubung      : /api/auth, /api/feed, /api/ai`);
  console.log(`====================================================`);
});
