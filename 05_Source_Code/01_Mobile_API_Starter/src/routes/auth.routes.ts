import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RegisterSchema, LoginSchema } from "../schemas";
import { validateBody } from "../middlewares/validate";
import { JWT_SECRET } from "../middlewares/auth";

const router = Router();

// Mock database in-memory untuk demonstrasi praktikum
interface UserRecord {
  id: string;
  nim: string;
  nama: string;
  email: string;
  passwordHash: string;
}

export const usersDb: UserRecord[] = [
  {
    id: "usr_001",
    nim: "220101001",
    nama: "Aditya Pratama",
    email: "aditya@kampus.ac.id",
    passwordHash: "secret123" // Dalam produksi wajib di-hash dengan bcrypt
  }
];

// POST /api/auth/register
router.post("/register", validateBody(RegisterSchema), (req: Request, res: Response) => {
  const { nim, nama, email, password } = req.body;

  const existing = usersDb.find((u) => u.email === email || u.nim === nim);
  if (existing) {
    return res.status(409).json({
      success: false,
      error: {
        code: "USER_ALREADY_EXISTS",
        message: "NIM atau Email sudah terdaftar dalam sistem"
      }
    });
  }

  const newUser: UserRecord = {
    id: `usr_${Date.now()}`,
    nim,
    nama,
    email,
    passwordHash: password
  };
  usersDb.push(newUser);

  const accessToken = jwt.sign(
    { userId: newUser.id, email: newUser.email, nama: newUser.nama },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = `rf_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  return res.status(201).json({
    success: true,
    message: "Registrasi akun mobile berhasil",
    data: {
      accessToken,
      refreshToken,
      user: {
        id: newUser.id,
        nim: newUser.nim,
        nama: newUser.nama,
        email: newUser.email
      }
    }
  });
});

// POST /api/auth/login
router.post("/login", validateBody(LoginSchema), (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = usersDb.find((u) => u.email === email && u.passwordHash === password);
  if (!user) {
    return res.status(401).json({
      success: false,
      error: {
        code: "INVALID_CREDENTIALS",
        message: "Email atau password yang Anda masukkan salah"
      }
    });
  }

  const accessToken = jwt.sign(
    { userId: user.id, email: user.email, nama: user.nama },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = `rf_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  return res.status(200).json({
    success: true,
    message: "Login mobile berhasil",
    data: {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        nim: user.nim,
        nama: user.nama,
        email: user.email
      }
    }
  });
});

// POST /api/auth/refresh
router.post("/refresh", (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken || typeof refreshToken !== "string" || !refreshToken.startsWith("rf_")) {
    return res.status(400).json({
      success: false,
      error: {
        code: "INVALID_REFRESH_TOKEN",
        message: "Refresh token tidak valid atau tidak disertakan"
      }
    });
  }

  // Generate Access Token baru berumur 15 menit
  const newAccessToken = jwt.sign(
    { userId: "usr_001", email: "aditya@kampus.ac.id", nama: "Aditya Pratama" },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  return res.status(200).json({
    success: true,
    data: {
      accessToken: newAccessToken
    }
  });
});

export default router;
