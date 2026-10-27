"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { savePageAction } from "@/app/admin/actions/pages";
import { ImageField, type MediaOption, inputClass } from "@/components/cms/fields";
import { Badge } from "@/components/ui/Badge";
import { SideDrawer } from "@/components/ui/SideDrawer";
import { homeExtraFields, homeExtraGroups } from "@/lib/data/homeExtras";
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

function Group({
  title,
  children,
  open,
}: {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}) {
  return (
    <details
      open={open}
      className="rounded-xl border border-[var(--admin-border)] bg-white p-4"
    >
      <summary className="cursor-pointer text-sm font-semibold text-[var(--admin-forest)]">
        {title}
      </summary>
      <div className="mt-4 space-y-4">{children}</div>
    </details>
  );
}

/** Home-only fields: every homepage section's copy (hero → CTA) in one place. */
function HomeFields({
  page,
  media,
}: {
  page: PageContent;
  media: MediaOption[];
}) {
  const k = (name: string) => `${page.slug}-${name}-${page.updatedAt}`;
  const extras = page.extras ?? {};

  return (
    <div className="space-y-4">
      <Group title="1 · Hero (headline & body are the fields above)" open>
        <div key={k("heroAccent")}>
          <Field
            label="Hero headline — orange words"
            name="heroAccentWords"
            defaultValue={page.heroAccentWords ?? ""}
            hint="Words inside the headline shown in orange, e.g. “Better”. Stats come from Admin → Impact. Hero photo: Admin → Media → category “hero”."
          />
        </div>
      </Group>

      <Group title="2 · Introduction" open>
        <div key={k("intro")} className="space-y-4">
          <Field label="Headline" name="introHeadline" defaultValue={page.introHeadline ?? ""} />
          <Field
            label="Headline — gold words"
            name="introAccentWords"
            defaultValue={page.introAccentWords ?? ""}
            hint="e.g. “Right Support.”"
          />
          <Field label="Body" name="introBody" rows={5} defaultValue={page.introBody ?? ""} />
          <Field label="Italic quote (with leaf)" name="quote" defaultValue={page.quote ?? ""} />
        </div>
      </Group>

      <Group title="3 · About callout (headline/body come from the About page)">
        <div key={k("about")} className="space-y-4">
          <Field
            label="Callout title (01 …)"
            name="aboutObjectiveTitle"
            defaultValue={page.aboutObjectiveTitle ?? ""}
          />
          <Field
            label="Callout text"
            name="aboutObjectiveBody"
            rows={3}
            defaultValue={page.aboutObjectiveBody ?? ""}
          />
        </div>
      </Group>

      <Group title="7 · CTA banner (“Looking For Exclusive Services?”)" open>
        <div key={k("cta")} className="space-y-4">
          <Field label="Headline" name="ctaHeadline" defaultValue={page.ctaHeadline ?? ""} />
          <Field label="Body" name="ctaBody" rows={3} defaultValue={page.ctaBody ?? ""} />
          <Field label="Button label" name="ctaButtonLabel" defaultValue={page.ctaButtonLabel ?? ""} />
          <Field label="Button link" name="ctaButtonHref" defaultValue={page.ctaButtonHref ?? ""} />
          <div>
            <ImageField
              name="ctaImageUrl"
              label="CTA banner photo (right side)"
              defaultValue={page.ctaImageUrl ?? ""}
              media={media}
              preferredCategory="cta"
            />
            <p className="mt-1 text-xs text-[var(--admin-muted)]">
              Upload here — shows on the home page CTA next to “Contact Now”, like the reference design.
            </p>
          </div>
        </div>
      </Group>

      {homeExtraGroups.map((group) => (
        <Group key={group} title={`Section headings · ${group}`}>
          <div key={k(group)} className="space-y-4">
            {homeExtraFields
              .filter((field) => field.group === group)
              .map((field) => (
                <Field
                  key={field.key}
                  label={field.label}
                  name={`extra_${field.key}`}
                  rows={field.multiline ? 3 : undefined}
                  hint={field.hint}
                  defaultValue={extras[field.key] ?? field.defaultValue}
                />
              ))}
          </div>
        </Group>
      ))}

      <p className="text-xs text-[var(--admin-muted)]">
        Cards &amp; lists are managed in Work Areas, Involvement, Causes, Events, Impact and Media (gallery).
      </p>
    </div>
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
              <HomeFields page={selected} media={media} />
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
                    defaultValue={selected.heroImageUrl ?? ""}
                    media={media}
                    preferredCategory="contact"
                  />
                  <p className="mt-1 text-xs text-[var(--admin-muted)]">
                    Upload in Admin → Media with category “Contact hero”, then
                    pick it here — shows in the Contact Us page hero frame.
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
