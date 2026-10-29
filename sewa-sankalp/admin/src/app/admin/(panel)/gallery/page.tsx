import Link from "next/link";
import { connection } from "next/server";
import { renderNavPageEditor } from "@/lib/adminNavPageLoad";

export const instant = false;

export default async function AdminGalleryPage() {
  await connection();
  return renderNavPageEditor({
    slug: "gallery",
    title: "Gallery",
    description: "Hero copy for /gallery.",
    saveLabel: "Save gallery page",
    note: (
      <>
        Album photos come from{" "}
        <Link
          href="/admin/media"
          className="font-medium text-[var(--admin-forest)] underline-offset-2 hover:underline"
        >
          Media
        </Link>{" "}
        — use category <strong>gallery</strong> when uploading.
      </>
    ),
  });
}
