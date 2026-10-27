import { requireDynamicDb } from "@/lib/db/runtime";
import { ensureSeedData } from "@/lib/db/seed";
import { PageModel } from "@/lib/models/Page";
import { homeExtraDefaults } from "@/lib/data/homeExtras";
import type { PageContent, PageSlug } from "@/lib/types";

const FALLBACK_ISO = "1970-01-01T00:00:00.000Z";

type PageLean = {
  slug: string;
  title: string;
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
  updatedAt?: Date;
};

function toPageContent(doc: PageLean): PageContent {
  const isHome = doc.slug === "home";
  return {
    slug: doc.slug as PageSlug,
    title: doc.title,
    headline: doc.headline,
    body: doc.body,
    introHeadline: doc.introHeadline || "",
    introBody: doc.introBody || "",
    quote: doc.quote || "",
    aboutObjectiveTitle: doc.aboutObjectiveTitle || "",
    aboutObjectiveBody: doc.aboutObjectiveBody || "",
    ctaHeadline: doc.ctaHeadline || "",
    ctaBody: doc.ctaBody || "",
    ctaButtonLabel: doc.ctaButtonLabel || "",
    ctaButtonHref: doc.ctaButtonHref || "",
    ctaImageUrl: doc.ctaImageUrl || "",
    heroImageUrl: doc.heroImageUrl || "",
    heroAccentWords: doc.heroAccentWords || "",
    introAccentWords: doc.introAccentWords || "",
    extras: isHome ? { ...homeExtraDefaults, ...(doc.extras ?? {}) } : undefined,
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    updatedAt: doc.updatedAt
      ? new Date(doc.updatedAt).toISOString()
      : FALLBACK_ISO,
  };
}

export async function getPages(): Promise<PageContent[]> {
  await requireDynamicDb();
  await ensureSeedData();

  const docs = await PageModel.find().sort({ title: 1 }).lean();
  const order: PageSlug[] = [
    "home",
    "about",
    "our-work",
    "get-involved",
    "impact-contact",
  ];

  return order
    .map((slug) => docs.find((doc) => doc.slug === slug))
    .filter(Boolean)
    .map((doc) => toPageContent(doc!));
}

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

export async function updatePage(
  slug: PageSlug,
  data: PageUpdateInput,
): Promise<PageContent | null> {
  await requireDynamicDb();

  const update: Record<string, unknown> = {
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
  if (slug === "home" && data.extras) update.extras = data.extras;

  const doc = await PageModel.findOneAndUpdate({ slug }, update, {
    new: true,
  }).lean();

  return doc ? toPageContent(doc) : null;
}
