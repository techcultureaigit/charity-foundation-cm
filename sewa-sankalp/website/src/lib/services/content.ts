import { requireDynamicDb } from "@/lib/db/runtime";
import { PageModel } from "@/lib/models/Page";
import { WorkAreaModel } from "@/lib/models/WorkArea";
import { ImpactModel } from "@/lib/models/Impact";
import { ContactSettingsModel } from "@/lib/models/ContactSettings";
import { MediaModel } from "@/lib/models/Media";
import { InvolvementCardModel } from "@/lib/models/InvolvementCard";
import { CauseModel } from "@/lib/models/Cause";
import { EventModel } from "@/lib/models/Event";
import {
  fallbackCauses,
  fallbackContact,
  fallbackEvents,
  fallbackImpact,
  fallbackInvolvement,
  fallbackMediaByCategory,
  fallbackPages,
  fallbackWorkAreas,
} from "@/lib/content/fallback";
import { homeExtraDefaults } from "@/lib/content/homeExtras";
import type {
  Cause,
  ContactSettings,
  EventItem,
  EventTheme,
  FocusTheme,
  ImpactHighlight,
  InvolvementCard,
  InvolvementTheme,
  MediaCategory,
  MediaItem,
  PageContent,
  PageSlug,
  WorkArea,
} from "@/lib/types";

export async function getPage(slug: PageSlug): Promise<PageContent> {
  const fallback = fallbackPages[slug];
  try {
    await requireDynamicDb();
    const doc = await PageModel.findOne({ slug }).lean();
    if (!doc) return withHomeExtras(fallback);
    const page: PageContent = {
      slug,
      title: doc.title || fallback.title,
      headline: doc.headline || fallback.headline,
      body: doc.body || fallback.body,
      introHeadline: doc.introHeadline || fallback.introHeadline || "",
      introBody: doc.introBody || fallback.introBody || "",
      quote: doc.quote || fallback.quote || "",
      aboutObjectiveTitle:
        doc.aboutObjectiveTitle || fallback.aboutObjectiveTitle || "",
      aboutObjectiveBody:
        doc.aboutObjectiveBody || fallback.aboutObjectiveBody || "",
      ctaHeadline: doc.ctaHeadline || fallback.ctaHeadline || "",
      ctaBody: doc.ctaBody || fallback.ctaBody || "",
      ctaButtonLabel: doc.ctaButtonLabel || fallback.ctaButtonLabel || "",
      ctaButtonHref: doc.ctaButtonHref || fallback.ctaButtonHref || "",
      ctaImageUrl: doc.ctaImageUrl || fallback.ctaImageUrl || "",
      heroImageUrl: doc.heroImageUrl || fallback.heroImageUrl || "",
      heroAccentWords: doc.heroAccentWords ?? fallback.heroAccentWords ?? "",
      introAccentWords:
        doc.introAccentWords ?? fallback.introAccentWords ?? "",
      extras: doc.extras as Record<string, string> | undefined,
      seoTitle: doc.seoTitle || fallback.seoTitle,
      seoDescription: doc.seoDescription || fallback.seoDescription,
    };
    return withHomeExtras(page);
  } catch {
    return withHomeExtras(fallback);
  }
}

/** Home page only: merge DB-edited extras over defaults (empty value = default). */
function withHomeExtras(page: PageContent): PageContent {
  if (page.slug !== "home") return page;
  const merged: Record<string, string> = { ...homeExtraDefaults };
  for (const [key, value] of Object.entries(page.extras ?? {})) {
    if (typeof value === "string" && value.trim() !== "") merged[key] = value;
  }
  return { ...page, extras: merged };
}

export async function getWorkAreas(): Promise<WorkArea[]> {
  try {
    await requireDynamicDb();
    const docs = await WorkAreaModel.find({ isPublished: true })
      .sort({ order: 1 })
      .lean();
    if (!docs.length) return fallbackWorkAreas;
    return docs.map((doc) => ({
      id: String(doc._id),
      order: doc.order ?? 0,
      title: doc.title ?? "",
      subtitle: doc.subtitle ?? "",
      description: doc.description ?? "",
      imageUrl: doc.imageUrl || "",
      theme: (doc.theme as FocusTheme | undefined) || undefined,
      iconKey: doc.iconKey || "",
      href: doc.href || "",
    }));
  } catch {
    return fallbackWorkAreas;
  }
}

export async function getInvolvementCards(): Promise<InvolvementCard[]> {
  try {
    await requireDynamicDb();
    const docs = await InvolvementCardModel.find({ isPublished: true })
      .sort({ order: 1 })
      .lean();
    if (!docs.length) {
      const total = await InvolvementCardModel.estimatedDocumentCount();
      return total === 0 ? fallbackInvolvement : [];
    }
    return docs.map((doc) => ({
      id: String(doc._id),
      order: doc.order ?? 0,
      title: doc.title ?? "",
      description: doc.description ?? "",
      imageUrl: doc.imageUrl || "",
      iconKey: doc.iconKey || "",
      theme: (doc.theme as InvolvementTheme) || "cream",
      ctaLabel: doc.ctaLabel || "Learn More",
      ctaHref: doc.ctaHref || "/get-involved",
    }));
  } catch {
    return fallbackInvolvement;
  }
}

export async function getCauses(): Promise<Cause[]> {
  try {
    await requireDynamicDb();
    const docs = await CauseModel.find({ isPublished: true })
      .sort({ order: 1 })
      .lean();
    if (!docs.length) {
      const total = await CauseModel.estimatedDocumentCount();
      return total === 0 ? fallbackCauses : [];
    }
    return docs.map((doc) => ({
      id: String(doc._id),
      order: doc.order ?? 0,
      title: doc.title ?? "",
      description: doc.description ?? "",
      imageUrl: doc.imageUrl || "",
      iconKey: doc.iconKey || "",
      helpedCount: doc.helpedCount ?? 0,
      goalCount: doc.goalCount ?? 0,
      href: doc.href || "/our-work",
    }));
  } catch {
    return fallbackCauses;
  }
}

export async function getEvents(): Promise<EventItem[]> {
  try {
    await requireDynamicDb();
    const docs = await EventModel.find({ isPublished: true })
      .sort({ order: 1 })
      .lean();
    if (!docs.length) {
      const total = await EventModel.estimatedDocumentCount();
      return total === 0 ? fallbackEvents : [];
    }
    return docs.map((doc) => ({
      id: String(doc._id),
      order: doc.order ?? 0,
      title: doc.title ?? "",
      description: doc.description ?? "",
      imageUrl: doc.imageUrl || "",
      iconKey: doc.iconKey || "",
      dateLabel: doc.dateLabel || "",
      location: doc.location || "",
      ticketInfo: doc.ticketInfo || "",
      isFeatured: Boolean(doc.isFeatured),
      theme: (doc.theme as EventTheme) || "green",
      href: doc.href || "/get-involved",
    }));
  } catch {
    return fallbackEvents;
  }
}

export async function getPublishedImpact(): Promise<ImpactHighlight[]> {
  try {
    await requireDynamicDb();
    const docs = await ImpactModel.find({
      isVerified: true,
      isPublished: true,
      value: { $nin: ["", null] },
    })
      .sort({ _id: 1 })
      .lean();
    return docs.map((doc) => ({
      id: String(doc._id),
      label: doc.label ?? "",
      value: doc.value ?? "",
    }));
  } catch {
    return fallbackImpact;
  }
}

export async function getContactSettings(): Promise<ContactSettings> {
  try {
    await requireDynamicDb();
    const doc = await ContactSettingsModel.findOne({ key: "primary" }).lean();
    if (!doc) return fallbackContact;
    return {
      address: doc.address || fallbackContact.address,
      phone: doc.phone || fallbackContact.phone,
      email: doc.email || fallbackContact.email,
      website: doc.website || fallbackContact.website,
      socialLinks: {
        facebook: doc.socialLinks?.facebook || undefined,
        instagram: doc.socialLinks?.instagram || undefined,
        twitter: doc.socialLinks?.twitter || undefined,
        youtube: doc.socialLinks?.youtube || undefined,
        linkedin: doc.socialLinks?.linkedin || undefined,
      },
      footerTagline: doc.footerTagline || fallbackContact.footerTagline,
    };
  } catch {
    return fallbackContact;
  }
}

function mediaFallback(category?: MediaCategory): MediaItem[] {
  if (!category) return [];
  return fallbackMediaByCategory[category] ?? [];
}

export async function getPublishedMedia(
  category?: MediaCategory,
): Promise<MediaItem[]> {
  try {
    await requireDynamicDb();
    const filter: Record<string, unknown> = {
      isPublished: true,
      consentConfirmed: true,
      url: { $exists: true, $ne: "" },
    };
    if (category) filter.category = category;
    const docs = await MediaModel.find(filter).sort({ createdAt: -1 }).lean();
    if (docs.length === 0) return mediaFallback(category);
    return docs.map((doc) => ({
      id: String(doc._id),
      title: doc.title ?? "",
      alt: doc.alt ?? "",
      url: doc.url ?? "",
      category: (doc.category ?? "general") as MediaCategory,
    }));
  } catch {
    return mediaFallback(category);
  }
}
