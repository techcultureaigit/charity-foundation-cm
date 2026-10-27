"use server";

import { revalidatePath } from "next/cache";
import { connection } from "next/server";
import { homeExtraFields } from "@/lib/data/homeExtras";
import { updatePage } from "@/lib/services/pages";
import type { PageSlug } from "@/lib/types";

const validSlugs: PageSlug[] = [
  "home",
  "about",
  "our-work",
  "get-involved",
  "impact-contact",
];

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
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

  const extras: Record<string, string> | undefined = isHome
    ? Object.fromEntries(
        homeExtraFields.map((field) => [
          field.key,
          text(formData, `extra_${field.key}`),
        ]),
      )
    : undefined;

  const updated = await updatePage(slug, {
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
    ctaImageUrl: isHome ? text(formData, "ctaImageUrl") : "",
    heroImageUrl: isContact ? text(formData, "heroImageUrl") : "",
    heroAccentWords: isHome || isContact ? text(formData, "heroAccentWords") : "",
    introAccentWords: isHome ? text(formData, "introAccentWords") : "",
    extras,
    seoTitle,
    seoDescription,
  });

  if (isContact) {
    revalidatePath("/impact-contact");
  }

  if (!updated) {
    return { ok: false as const, error: "Page not found" };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/pages");

  return { ok: true as const, page: updated };
}
