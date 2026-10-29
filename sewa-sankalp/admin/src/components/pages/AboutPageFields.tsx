"use client";

import Link from "next/link";
import { ImageField, type MediaOption, inputClass } from "@/components/cms/fields";
import { JourneyItemsField } from "@/components/pages/JourneyItemsField";
import {
  aboutExtraFields,
  aboutExtraGroups,
} from "@/lib/data/aboutExtras";
import type { PageContent } from "@/lib/types";

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
        <textarea
          name={name}
          rows={rows}
          defaultValue={defaultValue}
          className={inputClass}
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          className={inputClass}
        />
      )}
      {hint ? (
        <span className="mt-1 block text-xs text-[var(--admin-muted)]">
          {hint}
        </span>
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

const IMAGE_KEYS = new Set(["journeyImageUrl", "ctaBgImageUrl", "journeyItems"]);

/**
 * Full About page editor — hero, who we are, pillars, journey, CTA.
 * Page headline/body above still feed the homepage About text column.
 */
export function AboutPageFields({
  page,
  media,
}: {
  page: PageContent;
  media: MediaOption[];
}) {
  const extras = page.extras ?? {};
  const k = (name: string) => `about-${name}-${page.updatedAt}`;

  return (
    <div className="space-y-4">
      <p className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2 text-xs text-[var(--admin-muted)]">
        Headline / body above = homepage About text column. Everything below =
        live <code className="rounded bg-black/5 px-1">/about</code> page.
        Homepage About photo:{" "}
        <Link
          href="/admin/homepage"
          className="font-medium text-[var(--admin-forest)] underline-offset-2 hover:underline"
        >
          Homepage → 3 · About callout
        </Link>
        . Numbers band uses{" "}
        <Link
          href="/admin/impact"
          className="font-medium text-[var(--admin-forest)] underline-offset-2 hover:underline"
        >
          Impact
        </Link>{" "}
        when published.
      </p>

      <Group title="About page · Hero" open>
        <div key={k("hero")} className="space-y-4">
          <ImageField
            name="heroImageUrl"
            label="Banner image"
            defaultValue={
              page.heroImageUrl?.trim() || "/uploads/contact-hero.png"
            }
            media={media}
            preferredCategory="about"
          />
          {aboutExtraFields
            .filter((field) => field.group === "Hero")
            .map((field) => (
              <Field
                key={field.key}
                label={field.label}
                name={`extra_${field.key}`}
                defaultValue={extras[field.key] ?? field.defaultValue}
                rows={field.multiline ? 3 : undefined}
                hint={field.hint}
              />
            ))}
        </div>
      </Group>

      <Group title="About page · Who We Are" open>
        <div key={k("who")} className="space-y-4">
          <ImageField
            name="ctaImageUrl"
            label="Who We Are photo (designed frame asset)"
            defaultValue={
              page.ctaImageUrl?.trim() || "/uploads/about-who-we-are.png"
            }
            media={media}
            preferredCategory="about"
          />
          <p className="text-xs text-[var(--admin-muted)]">
            Keep the designed PNG (
            <code className="rounded bg-black/5 px-1">about-who-we-are.png</code>
            ) so frame, leaves and quote stay in the UI. Do not use the
            homepage About callout photo here.
          </p>
          {aboutExtraFields
            .filter((field) => field.group === "Who We Are")
            .map((field) => (
              <Field
                key={field.key}
                label={field.label}
                name={`extra_${field.key}`}
                defaultValue={extras[field.key] ?? field.defaultValue}
                rows={field.multiline ? 3 : undefined}
              />
            ))}
        </div>
      </Group>

      {aboutExtraGroups
        .filter((group) => group === "Pillars" || group === "Impact band")
        .map((group) => (
          <Group key={group} title={`About page · ${group}`} open={group === "Pillars"}>
            <div key={k(group)} className="space-y-4">
              {aboutExtraFields
                .filter((field) => field.group === group)
                .map((field) => (
                  <Field
                    key={field.key}
                    label={field.label}
                    name={`extra_${field.key}`}
                    defaultValue={extras[field.key] ?? field.defaultValue}
                    rows={field.multiline ? 3 : undefined}
                  />
                ))}
            </div>
          </Group>
        ))}

      <Group title="About page · Our Journey" open>
        <div key={k("journey")} className="space-y-4">
          <ImageField
            name="extra_journeyImageUrl"
            label="Journey photo"
            defaultValue={
              extras.journeyImageUrl?.trim() || "/uploads/about-journey.png"
            }
            media={media}
            preferredCategory="about"
          />
          {aboutExtraFields
            .filter(
              (field) =>
                field.group === "Journey" && !IMAGE_KEYS.has(field.key),
            )
            .map((field) => (
              <Field
                key={field.key}
                label={field.label}
                name={`extra_${field.key}`}
                defaultValue={extras[field.key] ?? field.defaultValue}
                rows={field.multiline ? 4 : undefined}
              />
            ))}
          <JourneyItemsField defaultValue={extras.journeyItems} />
        </div>
      </Group>

      <Group title="About page · Bottom CTA" open>
        <div key={k("cta")} className="space-y-4">
          <ImageField
            name="extra_ctaBgImageUrl"
            label="CTA background image"
            defaultValue={
              extras.ctaBgImageUrl?.trim() || "/uploads/about-cta-bg.png"
            }
            media={media}
            preferredCategory="about"
          />
          {aboutExtraFields
            .filter(
              (field) =>
                field.group === "Bottom CTA" && field.key !== "ctaBgImageUrl",
            )
            .map((field) => (
              <Field
                key={field.key}
                label={field.label}
                name={`extra_${field.key}`}
                defaultValue={extras[field.key] ?? field.defaultValue}
                rows={field.multiline ? 3 : undefined}
              />
            ))}
        </div>
      </Group>
    </div>
  );
}
