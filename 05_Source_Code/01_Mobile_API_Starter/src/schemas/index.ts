import { z } from "zod";

// Schema Register Akun Mahasiswa
export const RegisterSchema = z.object({
  nim: z.string().min(8, "NIM minimal 8 digit").max(12, "NIM maksimal 12 digit"),
  nama: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Format email salah"),
  password: z.string().min(6, "Password minimal 6 karakter")
});

// Schema Login
export const LoginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password tidak boleh kosong")
});

// Schema Buat Postingan Baru dari Mobile
export const CreatePostSchema = z.object({
  caption: z.string().min(3, "Caption minimal 3 karakter").max(280, "Caption maksimal 280 karakter"),
  imageUrl: z.string().url("URL gambar tidak valid").optional(),
  category: z.enum(["AKADEMIK", "KEGIATAN", "DISKUSI", "UMUM"]).default("UMUM")
});

// Schema Query Cursor Pagination Feed Mobile
export const FeedQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(20).default(5)
});
