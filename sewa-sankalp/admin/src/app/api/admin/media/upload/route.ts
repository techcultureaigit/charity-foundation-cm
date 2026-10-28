import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { adminUpload } from "@/lib/api/backend";
import type { MediaCategory } from "@/lib/types";

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

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const title = String(formData.get("title") ?? "").trim();
    const alt = String(formData.get("alt") ?? "").trim();
    const category = oneOfCategory(String(formData.get("category") ?? "general"));
    const consentConfirmed = formData.get("consentConfirmed") === "on";

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { ok: false, error: "Please choose an image file" },
        { status: 400 },
      );
    }
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

    const payload = new FormData();
    payload.set("file", file);
    payload.set("title", title);
    payload.set("alt", alt);
    payload.set("category", category);
    payload.set("consentConfirmed", "true");
    payload.set("isPublished", "true");

    const uploaded = await adminUpload<{ id: string; url: string }>(
      "/admin/media/upload",
      payload,
    );
    if (!uploaded.ok) {
      return NextResponse.json(
        { ok: false, error: uploaded.error },
        { status: 502 },
      );
    }

    revalidatePath("/admin");
    revalidatePath("/admin/media");

    return NextResponse.json({
      ok: true,
      url: uploaded.data.url,
      item: uploaded.data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 },
    );
  }
}
