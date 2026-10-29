"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { savePageAction } from "@/app/admin/actions/pages";
import { inputClass, type MediaOption } from "@/components/cms/fields";
import { HomeSectionFields } from "@/components/pages/HomeSectionFields";
import type { PageContent } from "@/lib/types";

export function HomepageManager({
  page: initialPage,
  media = [],
}: {
  page: PageContent;
  media?: MediaOption[];
}) {
  const router = useRouter();
  const [page, setPage] = useState(initialPage);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-5">
      <div className="admin-card space-y-2 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-gold-deep)]">
          Website · Homepage
        </p>
        <h2 className="font-[family-name:var(--font-admin-display)] text-2xl text-[var(--admin-forest)]">
          Home page modules
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--admin-muted)]">
          Sections match the live homepage order. Edit copy and images here;
          card lists open in their own modules (Work Areas, Involvement, Causes,
          Events, Impact, Media).
        </p>
      </div>

      <form
        className="space-y-4"
        action={(formData) => {
          startTransition(async () => {
            setError(null);
            setMessage(null);
            const result = await savePageAction(formData);
            if (!result.ok) {
              setError(result.error);
              return;
            }
            setPage(result.page);
            setMessage("Homepage saved · live site will refresh");
            router.refresh();
          });
        }}
      >
        <input type="hidden" name="slug" value="home" />

        <div className="admin-card space-y-4 p-5">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Hero headline</span>
            <input
              key={`headline-${page.updatedAt}`}
              name="headline"
              defaultValue={page.headline}
              required
              className={inputClass}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Hero body</span>
            <textarea
              key={`body-${page.updatedAt}`}
              name="body"
              rows={5}
              defaultValue={page.body}
              required
              className={inputClass}
            />
          </label>
        </div>

        <HomeSectionFields page={page} media={media} />

        <div className="admin-card space-y-4 p-5">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">SEO title</span>
            <input
              key={`seoTitle-${page.updatedAt}`}
              name="seoTitle"
              defaultValue={page.seoTitle}
              required
              className={inputClass}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">SEO description</span>
            <textarea
              key={`seoDescription-${page.updatedAt}`}
              name="seoDescription"
              rows={3}
              defaultValue={page.seoDescription}
              required
              className={inputClass}
            />
          </label>
        </div>

        {error ? (
          <p className="rounded-xl bg-[#fde8e8] px-3 py-2 text-sm text-[#9b1c1c]">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="rounded-xl bg-[rgba(23,59,49,0.08)] px-3 py-2 text-sm text-[var(--admin-forest)]">
            {message}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 pb-8">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-[var(--admin-forest)] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
          >
            {isPending ? "Saving..." : "Save homepage"}
          </button>
        </div>
      </form>
    </div>
  );
}
