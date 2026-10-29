"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { savePageAction } from "@/app/admin/actions/pages";
import { ImageField, type MediaOption, inputClass } from "@/components/cms/fields";
import { AboutPageFields } from "@/components/pages/AboutPageFields";
import { HomeSectionFields } from "@/components/pages/HomeSectionFields";
import { Badge } from "@/components/ui/Badge";
import { SideDrawer } from "@/components/ui/SideDrawer";
import type { PageContent } from "@/lib/types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function Field({
  label,
  name,
  defaultValue,
  rows,
  hint,
}: {
  label: string;
  name: string;
  defaultValue: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium">{label}</span>
      {rows ? (
        <textarea name={name} rows={rows} defaultValue={defaultValue} className={inputClass} />
      ) : (
        <input name={name} defaultValue={defaultValue} className={inputClass} />
      )}
      {hint ? (
        <span className="mt-1 block text-xs text-[var(--admin-muted)]">{hint}</span>
      ) : null}
    </label>
  );
}

export function PagesManager({
  pages: initialPages,
  media = [],
}: {
  pages: PageContent[];
  media?: MediaOption[];
}) {
  const router = useRouter();
  const [pages, setPages] = useState(initialPages);
  const [selected, setSelected] = useState<PageContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div className="admin-card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--admin-border)] bg-[var(--admin-ivory)] text-xs uppercase tracking-[0.12em] text-[var(--admin-muted)]">
            <tr>
              <th className="px-5 py-3 font-medium">Page</th>
              <th className="px-5 py-3 font-medium">Headline</th>
              <th className="px-5 py-3 font-medium">Updated</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {pages.map((page) => (
              <tr key={page.slug} className="align-top">
                <td className="px-5 py-4 font-medium text-[var(--admin-charcoal)]">
                  {page.title}
                </td>
                <td className="max-w-md px-5 py-4 text-[var(--admin-muted)]">
                  {page.headline}
                </td>
                <td className="px-5 py-4 text-[var(--admin-muted)]">
                  {formatDate(page.updatedAt)}
                </td>
                <td className="px-5 py-4">
                  <Badge tone="green">Published</Badge>
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setMessage(null);
                      setSelected(page);
                    }}
                    className="rounded-lg border border-[var(--admin-border)] px-3 py-1.5 text-[var(--admin-forest)] transition hover:border-[var(--admin-forest)] hover:bg-[var(--admin-forest)] hover:text-white"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SideDrawer
        open={Boolean(selected)}
        title={selected?.title ?? ""}
        subtitle="Saved to MongoDB · Keep claims verified"
        onClose={() => setSelected(null)}
      >
        {selected ? (
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

                setPages((current) =>
                  current.map((page) =>
                    page.slug === result.page.slug ? result.page : page,
                  ),
                );
                setSelected(result.page);
                setMessage("Saved to MongoDB");
                router.refresh();
              });
            }}
          >
            <input type="hidden" name="slug" value={selected.slug} />

            <label className="block text-sm">
              <span className="mb-1.5 block font-medium">Headline</span>
              <input
                key={`${selected.slug}-headline-${selected.updatedAt}`}
                name="headline"
                defaultValue={selected.headline}
                required
                className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block font-medium">Hero / main body</span>
              <textarea
                key={`${selected.slug}-body-${selected.updatedAt}`}
                name="body"
                rows={6}
                defaultValue={selected.body}
                required
                className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
              />
            </label>

            {selected.slug === "home" ? (
              <div className="space-y-3">
                <p className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2 text-xs text-[var(--admin-muted)]">
                  Prefer{" "}
                  <a
                    href="/admin/homepage"
                    className="font-medium text-[var(--admin-forest)] underline-offset-2 hover:underline"
                  >
                    Homepage
                  </a>{" "}
                  for the full section-wise editor. Same save fields below.
                </p>
                <HomeSectionFields page={selected} media={media} />
              </div>
            ) : selected.slug === "about" ? (
              <div className="space-y-4">
                <AboutPageFields page={selected} media={media} />
                <input type="hidden" name="introHeadline" value="" />
                <input type="hidden" name="introBody" value="" />
              </div>
            ) : selected.slug === "our-work" ? (
              <div className="space-y-4 rounded-xl border border-[var(--admin-border)] bg-white p-4">
                <p className="text-sm font-semibold text-[var(--admin-forest)]">
                  Our Work page images
                </p>
                <p className="text-xs text-[var(--admin-muted)]">
                  Focus cards + photos:{" "}
                  <a
                    href="/admin/work-areas"
                    className="font-medium text-[var(--admin-forest)] underline-offset-2 hover:underline"
                  >
                    Work Areas
                  </a>
                  .
                </p>
                <ImageField
                  name="heroImageUrl"
                  label="Page banner image"
                  defaultValue={
                    selected.heroImageUrl?.trim() || "/uploads/contact-hero.png"
                  }
                  media={media}
                  preferredCategory="work"
                />
                <ImageField
                  name="ctaImageUrl"
                  label="Bottom CTA photo"
                  defaultValue={
                    selected.ctaImageUrl?.trim() || "/uploads/education-cta.png"
                  }
                  media={media}
                  preferredCategory="work"
                />
                <input type="hidden" name="introHeadline" value="" />
                <input type="hidden" name="introBody" value="" />
              </div>
            ) : selected.slug === "get-involved" ? (
              <div className="space-y-4 rounded-xl border border-[var(--admin-border)] bg-white p-4">
                <p className="text-sm font-semibold text-[var(--admin-forest)]">
                  Get Involved page
                </p>
                <p className="text-xs text-[var(--admin-muted)]">
                  Homepage involve cards:{" "}
                  <a
                    href="/admin/involvement"
                    className="font-medium text-[var(--admin-forest)] underline-offset-2 hover:underline"
                  >
                    Involvement
                  </a>
                  .
                </p>
                <ImageField
                  name="heroImageUrl"
                  label="Page banner image"
                  defaultValue={
                    selected.heroImageUrl?.trim() || "/uploads/contact-hero.png"
                  }
                  media={media}
                  preferredCategory="involve"
                />
                <input type="hidden" name="introHeadline" value="" />
                <input type="hidden" name="introBody" value="" />
              </div>
            ) : selected.slug === "impact-contact" ? (
              <div className="space-y-4 rounded-xl border border-[var(--admin-border)] bg-white p-4">
                <p className="text-sm font-semibold text-[var(--admin-forest)]">
                  Contact page hero
                </p>
                <Field
                  label="Headline — orange word(s)"
                  name="heroAccentWords"
                  defaultValue={selected.heroAccentWords ?? "Us"}
                  hint='e.g. “Us” so the title reads Contact Us with “Us” in orange.'
                />
                <div>
                  <ImageField
                    name="heroImageUrl"
                    label="Hero photo (right side)"
                    defaultValue={
                      selected.heroImageUrl?.trim() ||
                      "/uploads/contact-hero.png"
                    }
                    media={media}
                    preferredCategory="contact"
                  />
                  <p className="mt-1 text-xs text-[var(--admin-muted)]">
                    Shows in the Contact Us page hero frame. Address / phone:{" "}
                    <a
                      href="/admin/settings/contact"
                      className="font-medium text-[var(--admin-forest)] underline-offset-2 hover:underline"
                    >
                      Contact Settings
                    </a>
                    .
                  </p>
                </div>
                <input type="hidden" name="introHeadline" value="" />
                <input type="hidden" name="introBody" value="" />
              </div>
            ) : (
              <>
                <input type="hidden" name="introHeadline" value="" />
                <input type="hidden" name="introBody" value="" />
              </>
            )}
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium">SEO title</span>
              <input
                key={`${selected.slug}-seoTitle-${selected.updatedAt}`}
                name="seoTitle"
                defaultValue={selected.seoTitle}
                required
                className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block font-medium">SEO description</span>
              <textarea
                key={`${selected.slug}-seoDescription-${selected.updatedAt}`}
                name="seoDescription"
                rows={3}
                defaultValue={selected.seoDescription}
                required
                className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
              />
            </label>

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

            <div className="flex flex-wrap items-center gap-3 border-t border-[var(--admin-border)] pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-xl bg-[var(--admin-forest)] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
              >
                {isPending ? "Saving..." : "Save changes"}
              </button>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-xl border border-[var(--admin-border)] px-4 py-2.5 text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : null}
      </SideDrawer>
    </>
  );
}
