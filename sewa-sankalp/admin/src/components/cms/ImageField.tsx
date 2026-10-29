"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import { MAX_UPLOAD_LABEL, validateUploadSize } from "@/lib/uploadLimits";

const inputClass =
  "w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2";

export interface MediaOption {
  title: string;
  url: string;
  category: string;
}

function previewSrc(url: string) {
  return resolveMediaUrl(url);
}

/** Image picker with direct upload, preview, and Media library suggestions. */
export function ImageField({
  name = "imageUrl",
  defaultValue = "",
  media,
  preferredCategory,
  label = "Image",
  className = "",
}: {
  name?: string;
  defaultValue?: string;
  media: MediaOption[];
  preferredCategory?: string;
  label?: string;
  className?: string;
}) {
  const listId = `media-${name}-${preferredCategory ?? "all"}`;
  const fileRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const sorted = [...media].sort(
    (a, b) =>
      Number(b.category === preferredCategory) -
      Number(a.category === preferredCategory),
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
      formData.set("category", preferredCategory || "general");
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
      setValue(result.url);
      if (fileRef.current) fileRef.current.value = "";
    });
  }

  return (
    <div className={`block text-sm ${className}`}>
      <span className="mb-1.5 block font-medium">{label}</span>

      {value ? (
        <div className="mb-2 overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewSrc(value)}
            alt="Selected"
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
            onClick={() => setValue("")}
            className="rounded-xl border border-[var(--admin-border)] px-3 py-2 text-sm"
          >
            Remove
          </button>
        ) : null}
        <span className="self-center text-xs text-[var(--admin-muted)]">
          Max {MAX_UPLOAD_LABEL}
        </span>
      </div>

      <input type="hidden" name={name} value={value} />

      <label className="mt-2 block">
        <span className="mb-1 block text-xs text-[var(--admin-muted)]">
          Or pick from Media library / paste URL
        </span>
        <input
          value={value}
          list={listId}
          onChange={(event) => setValue(event.target.value)}
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
      ) : (
        <span className="mt-1 block text-xs text-[var(--admin-muted)]">
          Upload here to set the photo, or leave empty for a placeholder.
        </span>
      )}
    </div>
  );
}
