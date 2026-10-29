"use client";

import Link from "next/link";
import { ImageField, type MediaOption, inputClass } from "@/components/cms/fields";
import { HeroSlidesField } from "@/components/pages/HeroSlidesField";
import { parseHeroSlideUrls } from "@/lib/data/heroSlides";
import { homeExtraFields } from "@/lib/data/homeExtras";
import type { PageContent } from "@/lib/types";

/** Live homepage About photo fallback (same file as website AboutSection). */
const DEFAULT_HOME_ABOUT_IMAGE = "/uploads/1793021222636-x82thu.jpg";

function resolveHomeAboutImageUrl(
  page: PageContent,
  media: MediaOption[],
): string {
  const fromExtras = page.extras?.aboutImageUrl?.trim();
  if (fromExtras) return fromExtras;
  const fromMedia = media.find((item) => item.category === "about")?.url?.trim();
  if (fromMedia) return fromMedia;
  return DEFAULT_HOME_ABOUT_IMAGE;
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
  moduleHref,
  moduleLabel,
}: {
  title: string;
  children: React.ReactNode;
  open?: boolean;
  moduleHref?: string;
  moduleLabel?: string;
}) {
  return (
    <details
      open={open}
      className="rounded-xl border border-[var(--admin-border)] bg-white p-4"
    >
      <summary className="cursor-pointer text-sm font-semibold text-[var(--admin-forest)]">
        {title}
      </summary>
      {moduleHref ? (
        <p className="mt-2 text-xs text-[var(--admin-muted)]">
          Cards / list:{" "}
          <Link
            href={moduleHref}
            className="font-medium text-[var(--admin-forest)] underline-offset-2 hover:underline"
          >
            {moduleLabel ?? "Open module"}
          </Link>
        </p>
      ) : null}
      <div className="mt-4 space-y-4">{children}</div>
    </details>
  );
}

function extrasFor(group: string, page: PageContent) {
  return homeExtraFields
    .filter((field) => field.group === group)
    .filter(
      (field) =>
        field.key !== "aboutImageUrl" &&
        field.key !== "ctaAccentWords" &&
        field.key !== "heroSlide2Url" &&
        field.key !== "heroSlides",
    );
}

/**
 * Homepage sections in live-page order — copy + images + links to list modules.
 */
export function HomeSectionFields({
  page,
  media,
}: {
  page: PageContent;
  media: MediaOption[];
}) {
  const k = (name: string) => `${page.slug}-${name}-${page.updatedAt}`;
  const extras = page.extras ?? {};
  const heroUrls = parseHeroSlideUrls(page);

  return (
    <div className="space-y-4">
      <Group title="1 · Hero" open>
        <div key={k("hero")} className="space-y-4">
          <Field
            label="Headline — orange words"
            name="heroAccentWords"
            defaultValue={page.heroAccentWords ?? ""}
            hint='Words inside the headline shown in orange, e.g. “Better”.'
          />
          <HeroSlidesField initialUrls={heroUrls} media={media} />
          <p className="text-xs text-[var(--admin-muted)]">
            Stats bar numbers:{" "}
            <Link
              href="/admin/impact"
              className="font-medium text-[var(--admin-forest)] underline-offset-2 hover:underline"
            >
              Impact
            </Link>
            .
          </p>
        </div>
      </Group>

      <Group
        title="2 · Introduction"
        open
        moduleHref="/admin/work-areas"
        moduleLabel="Work Areas (4 focus cards + images)"
      >
        <div key={k("intro")} className="space-y-4">
          {extrasFor("Introduction", page).map((field) => (
            <Field
              key={field.key}
              label={field.label}
              name={`extra_${field.key}`}
              defaultValue={extras[field.key] ?? field.defaultValue}
              hint={field.hint}
            />
          ))}
          <Field label="Headline" name="introHeadline" defaultValue={page.introHeadline ?? ""} />
          <Field
            label="Headline — gold words"
            name="introAccentWords"
            defaultValue={page.introAccentWords ?? ""}
            hint='e.g. “Right Support.”'
          />
          <Field label="Body" name="introBody" rows={5} defaultValue={page.introBody ?? ""} />
          <Field label="Italic quote (with leaf)" name="quote" defaultValue={page.quote ?? ""} />
        </div>
      </Group>

      <Group title="3 · About callout" open>
        <div key={k("about")} className="space-y-4">
          {extrasFor("About", page).map((field) => (
            <Field
              key={field.key}
              label={field.label}
              name={`extra_${field.key}`}
              defaultValue={extras[field.key] ?? field.defaultValue}
              hint={field.hint}
              rows={field.multiline ? 3 : undefined}
            />
          ))}
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
          <p className="text-xs font-medium text-[var(--admin-forest)]">
            Same photo as the live homepage About section (kids / community shot)
          </p>
          <ImageField
            name="extra_aboutImageUrl"
            label="About section photo (homepage)"
            defaultValue={resolveHomeAboutImageUrl(page, media)}
            media={media}
            preferredCategory="about"
          />
          <p className="text-xs text-[var(--admin-muted)]">
            Change this to update the homepage About photo. Headline/body for
            this block:{" "}
            <Link href="/admin/pages" className="font-medium text-[var(--admin-forest)] underline-offset-2 hover:underline">
              Pages → About
            </Link>
            .
          </p>
        </div>
      </Group>

      <Group
        title="4 · Get Involved"
        moduleHref="/admin/involvement"
        moduleLabel="Involvement cards (content + images)"
      >
        <div key={k("involve")} className="space-y-4">
          {extrasFor("Get Involved", page).map((field) => (
            <Field
              key={field.key}
              label={field.label}
              name={`extra_${field.key}`}
              defaultValue={extras[field.key] ?? field.defaultValue}
              hint={field.hint}
            />
          ))}
        </div>
      </Group>

      <Group
        title="5 · Recent Causes"
        moduleHref="/admin/causes"
        moduleLabel="Causes cards (content + images)"
      >
        <div key={k("causes")} className="space-y-4">
          {extrasFor("Recent Causes", page).map((field) => (
            <Field
              key={field.key}
              label={field.label}
              name={`extra_${field.key}`}
              defaultValue={extras[field.key] ?? field.defaultValue}
              hint={field.hint}
            />
          ))}
        </div>
      </Group>

      <Group
        title="6 · Upcoming Events"
        moduleHref="/admin/events"
        moduleLabel="Events cards (content + images)"
      >
        <div key={k("events")} className="space-y-4">
          {extrasFor("Upcoming Events", page).map((field) => (
            <Field
              key={field.key}
              label={field.label}
              name={`extra_${field.key}`}
              rows={field.multiline ? 3 : undefined}
              defaultValue={extras[field.key] ?? field.defaultValue}
              hint={field.hint}
            />
          ))}
        </div>
      </Group>

      <Group title="7 · CTA banner" open>
        <div key={k("cta")} className="space-y-4">
          <Field label="Headline" name="ctaHeadline" defaultValue={page.ctaHeadline ?? ""} />
          <Field
            label="Headline — gold words"
            name="extra_ctaAccentWords"
            defaultValue={extras.ctaAccentWords ?? "Exclusive Services?"}
          />
          <Field label="Body" name="ctaBody" rows={3} defaultValue={page.ctaBody ?? ""} />
          <Field label="Button label" name="ctaButtonLabel" defaultValue={page.ctaButtonLabel ?? ""} />
          <Field label="Button link" name="ctaButtonHref" defaultValue={page.ctaButtonHref ?? ""} />
          <ImageField
            name="ctaImageUrl"
            label="CTA banner strip"
            defaultValue={
              page.ctaImageUrl?.trim() ||
              media.find((item) => item.category === "cta")?.url ||
              "/uploads/cta-corner.png"
            }
            media={media}
            preferredCategory="cta"
          />
          <p className="text-xs text-[var(--admin-muted)]">
            Use the wide strip asset (
            <code className="rounded bg-black/5 px-1">cta-corner.png</code>
            ) so green swooshes blend into the footer. Tall photos are ignored
            on the site to prevent footer overlap.
          </p>
        </div>
      </Group>
    </div>
  );
}
