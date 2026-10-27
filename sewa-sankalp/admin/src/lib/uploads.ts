import { mkdir, writeFile } from "fs/promises";
import path from "path";

export function getUploadsDir() {
  return path.join(process.cwd(), "..", "website", "public", "uploads");
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
}

export async function saveUploadedFile(file: File) {
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name || "").toLowerCase() || ".jpg";
  const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)
    ? ext
    : ".jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`;
  const dir = getUploadsDir();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), bytes);
  return {
    filename,
    url: `/uploads/${filename}`,
    absoluteUrl: `${getSiteUrl()}/uploads/${filename}`,
  };
}
