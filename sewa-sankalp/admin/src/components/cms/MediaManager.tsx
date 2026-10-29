"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  removeMediaAction,
  saveMediaMetaAction,
} from "@/app/admin/actions/cms";
import { Badge } from "@/components/ui/Badge";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import type { MediaItem } from "@/lib/types";

export function MediaManager({ items }: { items: MediaItem[] }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <form
        className="admin-card mb-5 grid gap-3 p-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const formData = new FormData(form);
          startTransition(async () => {
            setError(null);
            setMessage(null);
            const response = await fetch("/api/admin/media/upload", {
              method: "POST",
              body: formData,
            });
            const result = (await response.json()) as {
              ok: boolean;
              error?: string;
            };
            if (!result.ok) {
              setError(result.error || "Upload failed");
              return;
            }
            setMessage("Photo uploaded — visible on website after publish/consent");
            form.reset();
            router.refresh();
          });
        }}
      >
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block font-medium">Upload image</span>
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Title</span>
          <input
            name="title"
            required
            className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Category</span>
          <select
            name="category"
            defaultValue="general"
            className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
          >
            <option value="hero">Hero</option>
            <option value="about">About</option>
            <option value="cta">CTA banner</option>
            <option value="contact">Contact hero</option>
            <option value="work">Work</option>
            <option value="gallery">Gallery (page + footer)</option>
            <option value="focus">Focus card</option>
            <option value="cause">Cause</option>
            <option value="event">Event</option>
            <option value="involve">Involvement</option>
            <option value="general">General</option>
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block font-medium">Alt text</span>
          <input
            name="alt"
            required
            className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
          />
        </label>
        <label className="inline-flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="consentConfirmed" required />
          Consent / licensing confirmed
        </label>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-[var(--admin-forest)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60 sm:col-span-2 sm:w-fit"
        >
          {isPending ? "Uploading..." : "Upload to website"}
        </button>
      </form>

      {error ? (
        <p className="mb-4 rounded-xl bg-[#fde8e8] px-3 py-2 text-sm text-[#9b1c1c]">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="mb-4 rounded-xl bg-[rgba(23,59,49,0.08)] px-3 py-2 text-sm text-[var(--admin-forest)]">
          {message}
        </p>
      ) : null}

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--admin-border)] bg-white px-4 py-8 text-center text-sm text-[var(--admin-muted)]">
          No photos yet. Upload hero / about / work images to show on the website.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveMediaUrl(item.url)}
                alt={item.alt}
                className="h-40 w-full object-cover bg-[var(--admin-forest)]"
              />
              <form
                className="space-y-3 p-4"
                action={(formData) => {
                  startTransition(async () => {
                    const result = await saveMediaMetaAction(formData);
                    setMessage(
                      result.ok ? "Media details saved" : result.error,
                    );
                    if (result.ok) router.refresh();
                  });
                }}
              >
                <input type="hidden" name="id" value={item.id} />
                <div className="flex items-start justify-between gap-2">
                  <Badge tone="gold">{item.category}</Badge>
                  <Badge tone={item.consentConfirmed ? "green" : "danger"}>
                    {item.consentConfirmed ? "Consent OK" : "Needs consent"}
                  </Badge>
                </div>
                <input
                  name="title"
                  defaultValue={item.title}
                  className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2 text-sm outline-none ring-[var(--admin-forest)] focus:ring-2"
                />
                <input
                  name="alt"
                  defaultValue={item.alt}
                  className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2 text-sm outline-none ring-[var(--admin-forest)] focus:ring-2"
                />
                <select
                  name="category"
                  defaultValue={item.category}
                  className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2 text-sm outline-none ring-[var(--admin-forest)] focus:ring-2"
                >
                  <option value="hero">Hero</option>
                  <option value="about">About</option>
                  <option value="cta">CTA banner</option>
                  <option value="contact">Contact hero</option>
                  <option value="work">Work</option>
                  <option value="gallery">Gallery (page + footer)</option>
                  <option value="focus">Focus card</option>
                  <option value="cause">Cause</option>
                  <option value="event">Event</option>
                  <option value="involve">Involvement</option>
                  <option value="general">General</option>
                </select>
                <label className="inline-flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    name="consentConfirmed"
                    defaultChecked={item.consentConfirmed}
                  />
                  Consent confirmed
                </label>
                <label className="ml-3 inline-flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    name="isPublished"
                    defaultChecked={item.isPublished}
                  />
                  Publish on website
                </label>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-[var(--admin-forest)] px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    formAction={(formData) => {
                      startTransition(async () => {
                        await removeMediaAction(formData);
                        setMessage("Media removed");
                        router.refresh();
                      });
                    }}
                    className="rounded-lg border border-[var(--admin-border)] px-3 py-1.5 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </form>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
