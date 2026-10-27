import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { createMediaItem } from "@/lib/services/cms";
import type { MediaCategory } from "@/lib/types";
import { saveUploadedFile } from "@/lib/uploads";

const mediaCategories = [
  "hero",
  "work",
  "about",
  "general",
  "gallery",
  "focus",
  "cause",
  "event",
  "involve",
  "cta",
  "contact",
] as const satisfies readonly MediaCategory[];

function oneOfCategory(value: string): MediaCategory {
  return (mediaCategories as readonly string[]).includes(value)
    ? (value as MediaCategory)
    : "general";
}

function revalidateSiteContent() {
  revalidatePath("/admin");
  revalidatePath("/admin/media");
  revalidatePath("/admin/work-areas");
  revalidatePath("/admin/involvement");
  revalidatePath("/admin/causes");
  revalidatePath("/admin/events");
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not read upload (file may be too large)" },
      { status: 413 },
    );
  }

  const file = formData.get("file");
  const mode = String(formData.get("mode") ?? "full");
  const category = oneOfCategory(String(formData.get("category") ?? "general"));

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { ok: false, error: "Please choose an image file" },
      { status: 400 },
    );
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { ok: false, error: "Image must be under 10 MB" },
      { status: 413 },
    );
  }

  try {
    if (mode === "quick") {
      const baseName = (file.name || "photo")
        .replace(/\.[^.]+$/, "")
        .replace(/[_-]+/g, " ")
        .trim()
        .slice(0, 80);
      const title = baseName || "Photo";
      const saved = await saveUploadedFile(file);
      const item = await createMediaItem({
        title,
        alt: title,
        url: saved.url,
        category,
        consentConfirmed: true,
      });
      revalidateSiteContent();
      return NextResponse.json({ ok: true, url: saved.url, item });
    }

    const title = String(formData.get("title") ?? "").trim();
    const alt = String(formData.get("alt") ?? "").trim();
    const consentConfirmed =
      formData.get("consentConfirmed") === "on" ||
      formData.get("consentConfirmed") === "true";

    if (!title || !alt) {
      return NextResponse.json(
        { ok: false, error: "Title and alt text are required" },
        { status: 400 },
      );
    }
    if (!consentConfirmed) {
      return NextResponse.json(
        { ok: false, error: "Confirm photo consent before publishing" },
        { status: 400 },
      );
    }

    const saved = await saveUploadedFile(file);
    const item = await createMediaItem({
      title,
      alt,
      url: saved.url,
      category,
      consentConfirmed,
    });
    revalidateSiteContent();
    return NextResponse.json({ ok: true, url: saved.url, item });
  } catch (error) {
    console.error("Media upload failed:", error);
    return NextResponse.json(
      { ok: false, error: "Upload failed — try a smaller image" },
      { status: 500 },
    );
  }
}
