import { apiGet } from "@/lib/api/backend";
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
  ImpactHighlight,
  InvolvementCard,
  MediaCategory,
  MediaItem,
  PageContent,
  PageSlug,
  WorkArea,
} from "@/lib/types";

/** Home page only: merge DB-edited extras over defaults (empty value = default). */
function withHomeExtras(page: PageContent): PageContent {
  if (page.slug !== "home") return page;
  const merged: Record<string, string> = { ...homeExtraDefaults };
  for (const [key, value] of Object.entries(page.extras ?? {})) {
    if (typeof value === "string" && value.trim() !== "") merged[key] = value;
  }
  return { ...page, extras: merged };
}

export async function getPage(slug: PageSlug): Promise<PageContent> {
  const fallback = fallbackPages[slug];
  const data = await apiGet<PageContent>(`/pages/${slug}`);
  if (!data) return withHomeExtras(fallback);
  return withHomeExtras({
    ...fallback,
    ...data,
    slug,
    title: data.title || fallback.title,
    headline: data.headline || fallback.headline,
    body: data.body || fallback.body,
    seoTitle: data.seoTitle || fallback.seoTitle,
    seoDescription: data.seoDescription || fallback.seoDescription,
  });
}

export async function getWorkAreas(): Promise<WorkArea[]> {
  const data = await apiGet<WorkArea[]>("/work-areas");
  return data?.length ? data : fallbackWorkAreas;
}

export async function getInvolvementCards(): Promise<InvolvementCard[]> {
  const data = await apiGet<InvolvementCard[]>("/involvement");
  return data?.length ? data : fallbackInvolvement;
}

export async function getCauses(): Promise<Cause[]> {
  const data = await apiGet<Cause[]>("/causes");
  return data?.length ? data : fallbackCauses;
}

export async function getEvents(): Promise<EventItem[]> {
  const data = await apiGet<EventItem[]>("/events");
  return data?.length ? data : fallbackEvents;
}

export async function getPublishedImpact(): Promise<ImpactHighlight[]> {
  const data = await apiGet<ImpactHighlight[]>("/impact");
  if (!data) return fallbackImpact;
  return data
    .filter((item) => item.value && item.value.trim() !== "")
    .map((item) => ({
      id: item.id,
      label: item.label,
      value: item.value,
    }));
}

export async function getContactSettings(): Promise<ContactSettings> {
  const data = await apiGet<ContactSettings>("/contact");
  if (!data) return fallbackContact;
  return {
    address: data.address || fallbackContact.address,
    phone: data.phone || fallbackContact.phone,
    email: data.email || fallbackContact.email,
    website: data.website || fallbackContact.website,
    socialLinks: data.socialLinks || fallbackContact.socialLinks,
    footerTagline: data.footerTagline || fallbackContact.footerTagline,
  };
}

function mediaFallback(category?: MediaCategory): MediaItem[] {
  if (!category) return [];
  return fallbackMediaByCategory[category] ?? [];
}

export async function getPublishedMedia(
  category?: MediaCategory,
): Promise<MediaItem[]> {
  const qs = category ? `?category=${encodeURIComponent(category)}` : "";
  const data = await apiGet<MediaItem[]>(`/media${qs}`);
  if (!data?.length) return mediaFallback(category);
  return data;
}
