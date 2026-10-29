import type { ReactNode } from "react";
import { NavPageManager } from "@/components/pages/NavPageManager";
import { getMediaOptions } from "@/lib/services/cms";
import { getPages } from "@/lib/services/pages";
import type { PageSlug } from "@/lib/types";

export async function renderNavPageEditor({
  slug,
  title,
  description,
  saveLabel,
  note,
}: {
  slug: PageSlug;
  title: string;
  description: string;
  saveLabel: string;
  note?: ReactNode;
}) {
  let pages;
  let media = [];
  try {
    [pages, media] = await Promise.all([getPages(), getMediaOptions()]);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not load page data.";
    return (
      <div className="admin-card space-y-2 border border-[#f0c2c2] bg-[#fff7f7] p-6 text-sm text-[#9b1c1c]">
        <p className="font-semibold">{title} could not load</p>
        <p>{message}</p>
      </div>
    );
  }

  const page = pages.find((row) => row.slug === slug);
  if (!page) {
    return (
      <div className="admin-card p-6 text-sm text-[var(--admin-muted)]">
        Page record “{slug}” not found. Start the backend so nav content can
        seed, then refresh.
      </div>
    );
  }

  return (
    <NavPageManager
      page={page}
      media={media}
      slug={slug}
      title={title}
      description={description}
      saveLabel={saveLabel}
      note={note}
    />
  );
}
