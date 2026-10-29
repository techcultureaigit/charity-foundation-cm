"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { savePageAction } from "@/app/admin/actions/pages";
import { ImageField, inputClass, type MediaOption } from "@/components/cms/fields";
import { AboutPageFields } from "@/components/pages/AboutPageFields";
import { getNavPageExtraFields } from "@/lib/data/navPageExtras";
import type { PageContent, PageSlug } from "@/lib/types";

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
        <input name={name} defaultValue={defaultValue} className={inputClass} />
      )}
      {hint ? (
        <span className="mt-1 block text-xs text-[var(--admin-muted)]">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

export function NavPageManager({
  page: initialPage,
  media = [],
  slug,
  title,
  description,
  saveLabel,
  note,
}: {
  page: PageContent;
  media?: MediaOption[];
  slug: PageSlug;
  title: string;
  description: string;
  saveLabel: string;
  note?: ReactNode;
}) {
  const router = useRouter();
  const [page, setPage] = useState(initialPage);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const extras = page.extras ?? {};
  const navExtraFields = getNavPageExtraFields(slug);
  const isAbout = slug === "about";
  const isContact = slug === "impact-contact";
  const isEducation = slug === "education";

  const heroCategory =
    slug === "gallery"
      ? "gallery"
      : slug === "blog"
        ? "general"
        : slug === "campaigns"
          ? "cause"
          : isContact
            ? "contact"
            : "about";

  return (
    <div className="space-y-5">
      <div className="admin-card space-y-2 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-gold-deep)]">
          Website · {title}
        </p>
        <h2 className="font-[family-name:var(--font-admin-display)] text-2xl text-[var(--admin-forest)]">
          {title} page
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--admin-muted)]">
          {description}
        </p>
        {note ? (
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--admin-muted)]">
            {note}
          </p>
        ) : null}
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
            setMessage(`${title} saved · live site will refresh`);
            router.refresh();
          });
        }}
      >
        <input type="hidden" name="slug" value={slug} />

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

        {isAbout ? (
          <AboutPageFields page={page} media={media} />
        ) : (
          <div className="admin-card space-y-4 p-5">
            <p className="text-sm font-semibold text-[var(--admin-forest)]">
              Page hero
            </p>
            {isContact ? (
              <Field
                label="Headline — orange word(s)"
                name="heroAccentWords"
                defaultValue={page.heroAccentWords ?? "Us"}
                hint='e.g. “Us” so the title reads Contact Us with “Us” in orange.'
              />
            ) : null}
            {isEducation ? (
              <Field
                label="Headline — accent word(s)"
                name="heroAccentWords"
                defaultValue={page.heroAccentWords ?? "Education"}
              />
            ) : null}
            <ImageField
              name="heroImageUrl"
              label="Banner image"
              defaultValue={
                page.heroImageUrl?.trim() || "/uploads/contact-hero.png"
              }
              media={media}
              preferredCategory={heroCategory}
            />
            {navExtraFields?.map((field) =>
              field.image ? (
                <ImageField
                  key={field.key}
                  name={`extra_${field.key}`}
                  label={field.label}
                  defaultValue={
                    extras[field.key]?.trim() || field.defaultValue
                  }
                  media={media}
                  preferredCategory={field.preferredCategory ?? "general"}
                />
              ) : (
                <Field
                  key={field.key}
                  label={field.label}
                  name={`extra_${field.key}`}
                  defaultValue={extras[field.key] ?? field.defaultValue}
                  rows={field.multiline ? 3 : undefined}
                  hint={field.hint}
                />
              ),
            )}
            {isContact ? (
              <p className="text-xs text-[var(--admin-muted)]">
                Address / phone / email:{" "}
                <Link
                  href="/admin/settings/contact"
                  className="font-medium text-[var(--admin-forest)] underline-offset-2 hover:underline"
                >
                  Contact Settings
                </Link>
                .
              </p>
            ) : null}
            <input type="hidden" name="introHeadline" value="" />
            <input type="hidden" name="introBody" value="" />
          </div>
        )}

        {isAbout ? (
          <>
            <input type="hidden" name="introHeadline" value="" />
            <input type="hidden" name="introBody" value="" />
          </>
        ) : null}

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

        <div className="flex flex-wrap items-center gap-3 pb-2">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-[var(--admin-forest)] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
          >
            {isPending ? "Saving..." : saveLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
