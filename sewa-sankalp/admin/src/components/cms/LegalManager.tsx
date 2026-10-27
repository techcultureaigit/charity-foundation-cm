"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { saveLegalAction } from "@/app/admin/actions/cms";
import { Badge } from "@/components/ui/Badge";
import type { LegalPage } from "@/lib/types";

export function LegalManager({ pages }: { pages: LegalPage[] }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-4">
      {message ? (
        <p className="rounded-xl bg-[rgba(23,59,49,0.08)] px-3 py-2 text-sm text-[var(--admin-forest)]">
          {message}
        </p>
      ) : null}
      {pages.map((page) => (
        <form
          key={page.id}
          className="rounded-2xl border border-[var(--admin-border)] bg-white p-5"
          action={(formData) => {
            startTransition(async () => {
              const result = await saveLegalAction(formData);
              setMessage(result.ok ? "Legal page saved" : result.error);
              if (result.ok) router.refresh();
            });
          }}
        >
          <input type="hidden" name="id" value={page.id} />
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-[var(--admin-muted)]">/{page.slug}</p>
            <Badge tone={page.isPublished ? "green" : "muted"}>
              {page.isPublished ? "Published" : "Draft"}
            </Badge>
          </div>
          <label className="mt-3 block text-sm">
            <span className="mb-1.5 block font-medium">Title</span>
            <input
              name="title"
              defaultValue={page.title}
              required
              className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
            />
          </label>
          <label className="mt-3 block text-sm">
            <span className="mb-1.5 block font-medium">Content</span>
            <textarea
              name="content"
              rows={8}
              defaultValue={page.content}
              required
              className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
            />
          </label>
          <label className="mt-3 inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={page.isPublished}
            />
            Publish after legal review
          </label>
          <button
            type="submit"
            disabled={isPending}
            className="mt-4 rounded-xl bg-[var(--admin-forest)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {isPending ? "Saving..." : "Save draft"}
          </button>
        </form>
      ))}
    </div>
  );
}
