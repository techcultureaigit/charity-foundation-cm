"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  removeBlogPostAction,
  saveBlogPostAction,
} from "@/app/admin/actions/cms";
import { Badge } from "@/components/ui/Badge";
import { SideDrawer } from "@/components/ui/SideDrawer";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import type { BlogPostItem } from "@/lib/types";
import {
  AreaField,
  CheckField,
  ImageField,
  Notice,
  SelectField,
  TextField,
  type MediaOption,
} from "./fields";

const categories = [
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "environment", label: "Environment" },
  { value: "women", label: "Women" },
  { value: "community", label: "Community" },
  { value: "events", label: "Events" },
];

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ViewRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  const text =
    value === null || value === undefined || String(value).trim() === ""
      ? "—"
      : String(value);
  return (
    <div className="border-b border-[var(--admin-border)] py-2.5 last:border-b-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--admin-muted)]">
        {label}
      </p>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-[var(--admin-charcoal)]">
        {text}
      </p>
    </div>
  );
}

function ViewImage({ label, src }: { label: string; src?: string }) {
  const url = resolveMediaUrl(src);
  return (
    <div className="border-b border-[var(--admin-border)] py-2.5 last:border-b-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--admin-muted)]">
        {label}
      </p>
      {url ? (
        <div className="mt-2 overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="max-h-48 w-full object-cover" />
        </div>
      ) : (
        <p className="mt-1 text-sm text-[var(--admin-muted)]">—</p>
      )}
    </div>
  );
}

function BlogPostView({ item }: { item: BlogPostItem }) {
  return (
    <div className="rounded-xl border border-[var(--admin-border)] bg-white px-4 py-1">
      <ViewRow label="Title" value={item.title} />
      <ViewRow label="Short description" value={item.excerpt} />
      <ViewRow label="Date" value={item.dateLabel} />
      <ViewRow label="Category" value={item.category} />
      <ViewImage label="Photo" src={item.imageUrl || item.featureImageUrl} />
      <ViewRow label="Full story" value={item.intro || item.excerpt} />
      <ViewRow
        label="Published"
        value={item.isPublished ? "Yes — shown on website" : "No — draft"}
      />
    </div>
  );
}

export function BlogPostsManager({
  items,
  media,
}: {
  items: BlogPostItem[];
  media: MediaOption[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<BlogPostItem | "new" | null>(null);
  const [viewing, setViewing] = useState<BlogPostItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const current = selected && selected !== "new" ? selected : null;

  function close() {
    setSelected(null);
    setError(null);
  }

  function closeView() {
    setViewing(null);
  }

  return (
    <>
      <div className="admin-card mb-5 space-y-2 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-gold-deep)]">
          Website · Blog articles
        </p>
        <h2 className="font-[family-name:var(--font-admin-display)] text-2xl text-[var(--admin-forest)]">
          Blog posts
        </h2>
        <p className="max-w-2xl text-sm text-[var(--admin-muted)]">
          Simple fields only — title, short text, photo and story. URL is
          created automatically from the title.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--admin-muted)]">
          {items.length} post{items.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          onClick={() => {
            setMessage(null);
            setSelected("new");
          }}
          className="rounded-xl bg-[var(--admin-forest)] px-4 py-2 text-sm font-medium text-white"
        >
          Add blog post
        </button>
      </div>
      {message ? (
        <div className="mb-4">
          <Notice>{message}</Notice>
        </div>
      ) : null}

      <div className="admin-card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--admin-border)] bg-[var(--admin-ivory)] text-xs uppercase tracking-[0.12em] text-[var(--admin-muted)]">
            <tr>
              <th className="px-5 py-3 font-medium">Post</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {items.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="px-5 py-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-0.5 max-w-md text-[var(--admin-muted)]">
                    {item.excerpt}
                  </p>
                  <p className="mt-1 text-xs capitalize text-[var(--admin-muted)]">
                    {item.category}
                  </p>
                </td>
                <td className="px-5 py-4 text-[var(--admin-muted)]">
                  {item.dateLabel || "—"}
                </td>
                <td className="px-5 py-4">
                  <Badge tone={item.isPublished ? "green" : "muted"}>
                    {item.isPublished ? "Published" : "Draft"}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <button
                      type="button"
                      title="View fields"
                      onClick={() => {
                        setSelected(null);
                        setViewing(item);
                      }}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--admin-border)] text-[var(--admin-forest)] transition hover:border-[var(--admin-forest)] hover:bg-[var(--admin-forest)] hover:text-white"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMessage(null);
                        setViewing(null);
                        setSelected(item);
                      }}
                      className="rounded-lg border border-[var(--admin-border)] px-3 py-1.5 text-[var(--admin-forest)] transition hover:border-[var(--admin-forest)] hover:bg-[var(--admin-forest)] hover:text-white"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-8 text-center text-[var(--admin-muted)]"
                >
                  No blog posts yet. Add one to show stories on /blog.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <SideDrawer
        open={Boolean(viewing)}
        eyebrow="View post"
        title={viewing?.title ?? "Blog post"}
        subtitle="What you entered for this post"
        onClose={closeView}
      >
        {viewing ? (
          <div className="space-y-4">
            <BlogPostView item={viewing} />
            <div className="flex flex-wrap gap-3 border-t border-[var(--admin-border)] pt-4">
              <button
                type="button"
                onClick={() => {
                  const item = viewing;
                  closeView();
                  setSelected(item);
                }}
                className="rounded-xl bg-[var(--admin-forest)] px-4 py-2.5 text-sm font-medium text-white"
              >
                Edit this post
              </button>
              <button
                type="button"
                onClick={closeView}
                className="rounded-xl border border-[var(--admin-border)] px-4 py-2.5 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        ) : null}
      </SideDrawer>

      <SideDrawer
        open={Boolean(selected)}
        eyebrow="Blog post"
        title={current ? current.title : "New post"}
        subtitle="Keep it simple — only what the website needs"
        onClose={close}
      >
        {selected ? (
          <form
            key={current?.id ?? "new"}
            className="space-y-4"
            action={(formData) => {
              startTransition(async () => {
                setError(null);
                const result = await saveBlogPostAction(formData);
                if (!result.ok) {
                  setError(result.error);
                  return;
                }
                setMessage("Saved — blog updated");
                close();
                router.refresh();
              });
            }}
          >
            <input type="hidden" name="id" value={current?.id ?? ""} />
            <input type="hidden" name="slug" value={current?.slug ?? ""} />
            <input
              type="hidden"
              name="order"
              value={String(current?.order ?? items.length)}
            />

            <TextField
              label="Title"
              name="title"
              defaultValue={current?.title}
              required
            />
            <AreaField
              label="Short description"
              name="excerpt"
              defaultValue={current?.excerpt}
              rows={3}
              hint="Shown on the blog listing cards."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Date"
                name="dateLabel"
                defaultValue={current?.dateLabel ?? ""}
                placeholder="12 Oct 2024"
              />
              <SelectField
                label="Category"
                name="category"
                defaultValue={current?.category ?? "education"}
                options={categories}
              />
            </div>
            <ImageField
              name="imageUrl"
              label="Photo"
              defaultValue={current?.imageUrl || current?.featureImageUrl || ""}
              media={media}
              preferredCategory="general"
            />
            <AreaField
              label="Full story"
              name="intro"
              defaultValue={current?.intro || current?.excerpt || ""}
              rows={8}
              hint="Main article text on the blog detail page."
            />
            <CheckField
              label="Show on website"
              name="isPublished"
              defaultChecked={current ? current.isPublished : true}
            />

            {error ? <Notice tone="error">{error}</Notice> : null}

            <div className="flex flex-wrap items-center gap-3 border-t border-[var(--admin-border)] pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-xl bg-[var(--admin-forest)] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
              >
                {isPending
                  ? "Saving..."
                  : current
                    ? "Save changes"
                    : "Create post"}
              </button>
              <button
                type="button"
                onClick={close}
                className="rounded-xl border border-[var(--admin-border)] px-4 py-2.5 text-sm"
              >
                Cancel
              </button>
              {current ? (
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    if (!window.confirm(`Delete “${current.title}”?`)) return;
                    const data = new FormData();
                    data.set("id", current.id);
                    startTransition(async () => {
                      const result = await removeBlogPostAction(data);
                      if (!result.ok) {
                        setError(result.error);
                        return;
                      }
                      setMessage("Post deleted");
                      close();
                      router.refresh();
                    });
                  }}
                  className="ml-auto rounded-xl border border-[#e9b3b3] px-4 py-2.5 text-sm text-[#9b1c1c]"
                >
                  Delete
                </button>
              ) : null}
            </div>
          </form>
        ) : null}
      </SideDrawer>
    </>
  );
}
