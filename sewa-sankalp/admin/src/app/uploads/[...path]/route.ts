import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getUploadsDir, getSiteUrl } from "@/lib/uploads";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params;
  const filename = segments.join("/");

  if (!filename || filename.includes("..") || path.isAbsolute(filename)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(getUploadsDir(), filename);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(getUploadsDir()))) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const data = await readFile(resolved);
    const ext = path.extname(filename).toLowerCase();
    return new NextResponse(data, {
      headers: {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    // On Vercel the website hosts /uploads — proxy so admin previews still work.
    const site = getSiteUrl().replace(/\/$/, "");
    try {
      const upstream = await fetch(`${site}/uploads/${filename}`, {
        cache: "force-cache",
      });
      if (!upstream.ok) {
        return new NextResponse("Not found", { status: 404 });
      }
      const buf = Buffer.from(await upstream.arrayBuffer());
      const ext = path.extname(filename).toLowerCase();
      return new NextResponse(buf, {
        headers: {
          "Content-Type":
            upstream.headers.get("content-type") ||
            MIME[ext] ||
            "application/octet-stream",
          "Cache-Control": "public, max-age=86400",
        },
      });
    } catch {
      return new NextResponse("Not found", { status: 404 });
    }
  }
}
