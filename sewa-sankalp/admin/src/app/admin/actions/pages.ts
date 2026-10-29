"use server";

import { revalidatePath } from "next/cache";
import { connection } from "next/server";
import { aboutExtraFields } from "@/lib/data/aboutExtras";
import { homeExtraFields } from "@/lib/data/homeExtras";
import {
  getNavPageExtraFields,
  navPageExtraFields,
  type NavShellSlug,
} from "@/lib/data/navPageExtras";
import { updatePage } from "@/lib/services/pages";
import type { PageSlug } from "@/lib/types";

const validSlugs: PageSlug[] = [
  "home",
  "about",
  "education",
  "campaigns",
  "gallery",
  "blog",
  "our-work",
  "get-involved",
  "impact-contact",
];

const websitePathBySlug: Partial<Record<PageSlug, string>> = {
  home: "/",
  about: "/about",
  education: "/objective/education",
  campaigns: "/campaigns",
  gallery: "/gallery",
  blog: "/blog",
  "our-work": "/our-work",
  "get-involved": "/get-involved",
  "impact-contact": "/impact-contact",
};

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function buildExtras(
  slug: PageSlug,
  formData: FormData,
): Record<string, string> | undefined {
  if (slug === "home") {
    return Object.fromEntries(
      homeExtraFields.map((field) => [
        field.key,
        text(formData, `extra_${field.key}`),
      ]),
    );
  }
  if (slug === "about") {
    return Object.fromEntries(
      aboutExtraFields.map((field) => [
        field.key,
        text(formData, `extra_${field.key}`),
      ]),
    );
  }
  const navFields = getNavPageExtraFields(slug);
  if (navFields) {
    return Object.fromEntries(
      navFields.map((field) => [
        field.key,
        text(formData, `extra_${field.key}`),
      ]),
    );
  }
  return undefined;
}

export async function savePageAction(formData: FormData) {
  await connection();
  const slug = String(formData.get("slug") ?? "") as PageSlug;

  if (!validSlugs.includes(slug)) {
    return { ok: false as const, error: "Invalid page" };
  }

  const headline = text(formData, "headline");
  const body = text(formData, "body");
  const seoTitle = text(formData, "seoTitle");
  const seoDescription = text(formData, "seoDescription");

  if (!headline || !body || !seoTitle || !seoDescription) {
    return { ok: false as const, error: "All fields are required" };
  }

  const isHome = slug === "home";
  const isContact = slug === "impact-contact";
  const isAbout = slug === "about";
  const isOurWork = slug === "our-work";
  const isGetInvolved = slug === "get-involved";
  const isNavShell =
    slug === "education" ||
    slug === "campaigns" ||
    slug === "gallery" ||
    slug === "blog";

  const hasHeroImage =
    isHome ||
    isContact ||
    isAbout ||
    isOurWork ||
    isGetInvolved ||
    isNavShell;
  const hasCtaImage = isHome || isAbout || isOurWork;
  const hasHeroAccent = isHome || isContact || slug === "education";

  const extras = buildExtras(slug, formData);

  let updated;
  try {
    updated = await updatePage(slug, {
      headline,
      body,
      introHeadline: text(formData, "introHeadline"),
      introBody: text(formData, "introBody"),
      quote: isHome ? text(formData, "quote") : "",
      aboutObjectiveTitle: isHome ? text(formData, "aboutObjectiveTitle") : "",
      aboutObjectiveBody: isHome ? text(formData, "aboutObjectiveBody") : "",
      ctaHeadline: isHome ? text(formData, "ctaHeadline") : "",
      ctaBody: isHome ? text(formData, "ctaBody") : "",
      ctaButtonLabel: isHome ? text(formData, "ctaButtonLabel") : "",
      ctaButtonHref: isHome ? text(formData, "ctaButtonHref") : "",
      ctaImageUrl: hasCtaImage ? text(formData, "ctaImageUrl") : "",
      heroImageUrl: hasHeroImage ? text(formData, "heroImageUrl") : "",
      heroAccentWords: hasHeroAccent ? text(formData, "heroAccentWords") : "",
      introAccentWords: isHome ? text(formData, "introAccentWords") : "",
      extras,
      seoTitle,
      seoDescription,
    });
  } catch (err) {
    return {
      ok: false as const,
      error: err instanceof Error ? err.message : "Save failed",
    };
  }

  if (!updated) {
    return { ok: false as const, error: "Page not found" };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/homepage");
  if (isHome) revalidatePath("/");
  if (isAbout) {
    revalidatePath("/about");
    revalidatePath("/admin/about");
  }
  if (isOurWork) revalidatePath("/our-work");
  if (isGetInvolved) revalidatePath("/get-involved");
  if (isContact) {
    revalidatePath("/impact-contact");
    revalidatePath("/admin/contact-page");
  }
  if (isNavShell) {
    revalidatePath(`/admin/${slug}`);
    const path = websitePathBySlug[slug as NavShellSlug];
    if (path) revalidatePath(path);
  }

  return { ok: true as const, page: updated };
}
