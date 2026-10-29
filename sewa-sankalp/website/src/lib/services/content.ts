import { apiGet } from "@/lib/api/backend";
import {
  BLOG_POSTS,
  getBlogPostDetail,
  type BlogInitiativeIcon,
  type BlogPost,
  type BlogPostDetail,
} from "@/lib/content/blogPosts";
import {
  CAMPAIGNS,
  FEATURED_CAMPAIGN,
  type Campaign,
  type CampaignCategoryId,
} from "@/lib/content/campaigns";
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
import { withAboutExtras } from "@/lib/content/aboutExtras";
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

type ApiCampaignItem = {
  id: string;
  slug?: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  imageUrl: string;
  raised: number;
  target: number;
  status: "ongoing" | "featured";
  highlights?: { icon: string; label: string }[];
};

type ApiBlogPostItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  dateLabel: string;
  category: string;
  imageUrl: string;
  featureImageUrl: string;
  author: string;
  views: number;
  intro: string;
  challenge: { title: string; body: string; image: string };
  initiative: {
    title: string;
    body: string;
    items: { icon: string; label: string }[];
  };
  impact: {
    title: string;
    body: string;
    quote: { text: string; author: string; role?: string };
  };
  lookingAhead: { title: string; body: string };
  tags: string[];
};

const campaignHighlightIcons = new Set([
  "book",
  "people",
  "graduation",
  "heart",
  "tree",
]);

function mapApiCampaign(item: ApiCampaignItem): Campaign {
  const highlights = item.highlights?.map((h) => ({
    icon: (campaignHighlightIcons.has(h.icon)
      ? h.icon
      : "book") as NonNullable<Campaign["highlights"]>[number]["icon"],
    label: h.label,
  }));
  return {
    id: item.id || item.slug || item.title,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    category: item.category as Exclude<CampaignCategoryId, "all">,
    image: item.imageUrl,
    raised: item.raised,
    target: item.target,
    status: item.status,
    ...(highlights?.length ? { highlights } : {}),
  };
}

const blogInitiativeIcons = new Set<BlogInitiativeIcon>([
  "book",
  "graduation",
  "people",
  "heart",
  "star",
  "check",
]);

function mapApiBlogPost(item: ApiBlogPostItem): BlogPost {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    date: item.dateLabel,
    category: item.category as BlogPost["category"],
    image: item.imageUrl,
    author: item.author,
    views: item.views,
  };
}

function mapApiBlogPostDetail(item: ApiBlogPostItem): BlogPostDetail {
  const base = mapApiBlogPost(item);
  return {
    ...base,
    author: item.author || "Sewa Sankalp Foundation",
    views: item.views ?? 0,
    featureImage: item.featureImageUrl || item.imageUrl,
    intro: item.intro?.trim() || item.excerpt || "",
    challenge: item.challenge ?? { title: "", body: "", image: "" },
    initiative: {
      title: item.initiative?.title || "",
      body: item.initiative?.body || "",
      items: Array.isArray(item.initiative?.items)
        ? item.initiative.items.map((row) => ({
            icon: (blogInitiativeIcons.has(row.icon as BlogInitiativeIcon)
              ? row.icon
              : "check") as BlogInitiativeIcon,
            label: row.label,
          }))
        : [],
    },
    impact: item.impact ?? {
      title: "",
      body: "",
      quote: { text: "", author: "", role: "" },
    },
    lookingAhead: item.lookingAhead ?? { title: "", body: "" },
    tags: Array.isArray(item.tags) ? item.tags : [],
  };
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

function withNavShellExtras(page: PageContent): PageContent {
  if (
    page.slug !== "education" &&
    page.slug !== "campaigns" &&
    page.slug !== "gallery" &&
    page.slug !== "blog"
  ) {
    return page;
  }
  const defaults = fallbackPages[page.slug]?.extras ?? {};
  const merged: Record<string, string> = { ...defaults };
  for (const [key, value] of Object.entries(page.extras ?? {})) {
    if (typeof value === "string" && value.trim() !== "") merged[key] = value;
  }
  return { ...page, extras: merged };
}

function withPageExtras(page: PageContent): PageContent {
  if (page.slug === "home") return withHomeExtras(page);
  if (page.slug === "about") return withAboutExtras(page);
  return withNavShellExtras(page);
}

export async function getPage(slug: PageSlug): Promise<PageContent> {
  const fallback = fallbackPages[slug];
  const data = await apiGet<PageContent>(`/pages/${slug}`);
  if (!data) return withPageExtras(fallback);
  return withPageExtras({
    ...fallback,
    ...data,
    slug,
    title: data.title || fallback.title,
    headline: data.headline || fallback.headline,
    body: data.body || fallback.body,
    seoTitle: data.seoTitle || fallback.seoTitle,
    seoDescription: data.seoDescription || fallback.seoDescription,
    extras: {
      ...(fallback.extras ?? {}),
      ...(data.extras ?? {}),
    },
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
  const social = data.socialLinks ?? {};
  const socialFallback = fallbackContact.socialLinks;
  return {
    address: data.address || fallbackContact.address,
    phone: data.phone || fallbackContact.phone,
    email: data.email || fallbackContact.email,
    website: data.website || fallbackContact.website,
    socialLinks: {
      facebook: social.facebook?.trim() || socialFallback.facebook,
      instagram: social.instagram?.trim() || socialFallback.instagram,
      youtube: social.youtube?.trim() || socialFallback.youtube,
      twitter: social.twitter?.trim() || socialFallback.twitter,
      linkedin: social.linkedin?.trim() || socialFallback.linkedin,
    },
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

export async function getCampaigns(): Promise<Campaign[]> {
  const data = await apiGet<ApiCampaignItem[]>("/campaigns");
  if (!data?.length) return [...CAMPAIGNS, FEATURED_CAMPAIGN];
  return data.map(mapApiCampaign);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await apiGet<ApiBlogPostItem[]>("/blog-posts");
  if (!data?.length) return BLOG_POSTS;
  return data.map(mapApiBlogPost);
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPostDetail | undefined> {
  const data = await apiGet<ApiBlogPostItem>(`/blog-posts/${slug}`);
  if (data) return mapApiBlogPostDetail(data);
  return getBlogPostDetail(slug);
}
