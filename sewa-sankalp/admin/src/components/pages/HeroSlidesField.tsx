"use client";

import { useId, useRef, useState, useTransition } from "react";
import type { MediaOption } from "@/components/cms/ImageField";
import {
  MAX_HERO_SLIDES,
  serializeHeroSlides,
} from "@/lib/data/heroSlides";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import { validateUploadSize } from "@/lib/uploadLimits";

const inputClass =
  "w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2";

function previewSrc(url: string) {
  return resolveMediaUrl(url);
}

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `slide-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

type SlideRow = { id: string; url: string };

function SlidePicker({
  label,
  value,
  media,
  onChange,
  onRemove,
  canRemove,
}: {
  label: string;
  value: string;
  media: MediaOption[];
  onChange: (url: string) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const listId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const sorted = [...media].sort(
    (a, b) => Number(b.category === "hero") - Number(a.category === "hero"),
  );

  function onFileChange(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    const sizeError = validateUploadSize(file);
    if (sizeError) {
      setError(sizeError);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("category", "hero");
      formData.set("mode", "quick");
      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        ok: boolean;
        url?: string;
        error?: string;
      };
      if (!result.ok || !result.url) {
        setError(result.error || "Upload failed");
        return;
      }
      onChange(result.url);
      if (fileRef.current) fileRef.current.value = "";
    });
  }

  return (
    <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)]/50 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-sm font-medium">{label}</span>
        {canRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className="rounded-lg border border-[var(--admin-border)] px-2.5 py-1 text-xs"
          >
            Remove slide
          </button>
        ) : null}
      </div>

      {value ? (
        <div className="mb-2 overflow-hidden rounded-xl border border-[var(--admin-border)] bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewSrc(value)}
            alt=""
            className="h-36 w-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          onChange={(event) => onFileChange(event.target.files)}
        />
        <button
          type="button"
          disabled={isPending}
          onClick={() => fileRef.current?.click()}
          className="rounded-xl bg-[var(--admin-forest)] px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {isPending ? "Uploading…" : "Upload image"}
        </button>
        {value ? (
          <button
            type="button"
            disabled={isPending}
            onClick={() => onChange("")}
            className="rounded-xl border border-[var(--admin-border)] px-3 py-2 text-sm"
          >
            Clear
          </button>
        ) : null}
      </div>

      <label className="mt-2 block">
        <span className="mb-1 block text-xs text-[var(--admin-muted)]">
          Or pick from Media library / paste URL
        </span>
        <input
          value={value}
          list={listId}
          onChange={(event) => onChange(event.target.value)}
          placeholder="/uploads/… or https://…"
          className={inputClass}
        />
        <datalist id={listId}>
          {sorted.map((item) => (
            <option key={item.url} value={item.url}>
              {`${item.title} (${item.category})`}
            </option>
          ))}
        </datalist>
      </label>

      {error ? (
        <span className="mt-1 block text-xs text-[#9b1c1c]">{error}</span>
      ) : null}
    </div>
  );
}

/** Dynamic homepage hero slideshow editor — add/remove as many slides as needed. */
export function HeroSlidesField({
  initialUrls,
  media,
}: {
  initialUrls: string[];
  media: MediaOption[];
}) {
  const [slides, setSlides] = useState<SlideRow[]>(() => {
    const seed = initialUrls.length ? initialUrls : [""];
    return seed.map((url) => ({ id: newId(), url }));
  });

  const urls = slides.map((slide) => slide.url.trim()).filter(Boolean);
  const canAdd = slides.length < MAX_HERO_SLIDES;

  return (
    <div className="space-y-3">
      <input type="hidden" name="extra_heroSlides" value={serializeHeroSlides(urls)} />
      <input type="hidden" name="heroImageUrl" value={urls[0] ?? ""} />
      <input type="hidden" name="extra_heroSlide2Url" value={urls[1] ?? ""} />

      <p className="text-xs font-medium text-[var(--admin-forest)]">
        Homepage hero slideshow — same photos as the live site
      </p>

      {slides.map((slide, index) => (
        <SlidePicker
          key={slide.id}
          label={`Hero slide ${index + 1}`}
          value={slide.url}
          media={media}
          canRemove={slides.length > 1}
          onChange={(url) =>
            setSlides((current) =>
              current.map((row) =>
                row.id === slide.id ? { ...row, url } : row,
              ),
            )
          }
          onRemove={() =>
            setSlides((current) =>
              current.length <= 1
                ? current
                : current.filter((row) => row.id !== slide.id),
            )
          }
        />
      ))}

      <button
        type="button"
        disabled={!canAdd}
        onClick={() =>
          setSlides((current) =>
            current.length >= MAX_HERO_SLIDES
              ? current
              : [...current, { id: newId(), url: "" }],
          )
        }
        className="rounded-xl border border-dashed border-[var(--admin-forest)]/40 px-3 py-2.5 text-sm font-medium text-[var(--admin-forest)] hover:bg-[var(--admin-forest)]/5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        + Add hero slide
      </button>

      <p className="text-xs text-[var(--admin-muted)]">
        Add as many images as you need (max {MAX_HERO_SLIDES}). Empty rows are
        ignored on save. Order here is the slideshow order on the homepage.
      </p>
    </div>
  );
}
