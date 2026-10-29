import { adminGet, adminSend } from "@/lib/api/backend";
import type { PageContent, PageSlug } from "@/lib/types";

export interface PageUpdateInput {
  headline: string;
  body: string;
  introHeadline?: string;
  introBody?: string;
  quote?: string;
  aboutObjectiveTitle?: string;
  aboutObjectiveBody?: string;
  ctaHeadline?: string;
  ctaBody?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
  ctaImageUrl?: string;
  heroImageUrl?: string;
  heroAccentWords?: string;
  introAccentWords?: string;
  extras?: Record<string, string>;
  seoTitle: string;
  seoDescription: string;
}

export async function getPages(): Promise<PageContent[]> {
  const result = await adminGet<PageContent[]>("/admin/pages");
  if (!result.ok) {
    throw new Error(
      result.error === "fetch failed"
        ? "Backend unreachable at API_URL. Start sewa-sankalp/backend (port 4000) and use http://127.0.0.1:4000/api in admin .env.local."
        : result.error,
    );
  }
  return result.data;
}

export async function updatePage(
  slug: PageSlug,
  data: PageUpdateInput,
): Promise<PageContent | null> {
  const payload: Record<string, unknown> = {
    headline: data.headline,
    body: data.body,
    introHeadline: data.introHeadline ?? "",
    introBody: data.introBody ?? "",
    quote: data.quote ?? "",
    aboutObjectiveTitle: data.aboutObjectiveTitle ?? "",
    aboutObjectiveBody: data.aboutObjectiveBody ?? "",
    ctaHeadline: data.ctaHeadline ?? "",
    ctaBody: data.ctaBody ?? "",
    ctaButtonLabel: data.ctaButtonLabel ?? "",
    ctaButtonHref: data.ctaButtonHref ?? "",
    ctaImageUrl: data.ctaImageUrl ?? "",
    heroImageUrl: data.heroImageUrl ?? "",
    heroAccentWords: data.heroAccentWords ?? "",
    introAccentWords: data.introAccentWords ?? "",
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
  };
  const extraSlugs: PageSlug[] = [
    "home",
    "about",
    "education",
    "campaigns",
    "gallery",
    "blog",
  ];
  if (extraSlugs.includes(slug) && data.extras) {
    payload.extras = data.extras;
  }

  const result = await adminSend<PageContent>(
    `/admin/pages/${slug}`,
    "PUT",
    payload,
  );
  if (!result.ok) {
    throw new Error(result.error || "Failed to save page");
  }
  return result.data;
}
