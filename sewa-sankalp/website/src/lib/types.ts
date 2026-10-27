export type PageSlug =
  | "home"
  | "about"
  | "our-work"
  | "get-involved"
  | "impact-contact";

export interface PageContent {
  slug: PageSlug;
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
  /** Contact page hero photo (organic frame). */
  heroImageUrl?: string;
  heroAccentWords?: string;
  introAccentWords?: string;
  /** Extra home-section copy (merged with defaults in content.ts). */
  extras?: Record<string, string>;
  seoTitle: string;
  seoDescription: string;
}

export type FocusTheme = "pink" | "green" | "blue" | "orange";
export type InvolvementTheme = "cream" | "mint" | "peach";
export type EventTheme = "green" | "blue" | "red";

export interface WorkArea {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  theme?: FocusTheme;
  iconKey?: string;
  href?: string;
}

export interface InvolvementCard {
  id: string;
  order: number;
  title: string;
  description: string;
  imageUrl: string;
  iconKey: string;
  theme: InvolvementTheme;
  ctaLabel: string;
  ctaHref: string;
}

export interface Cause {
  id: string;
  order: number;
  title: string;
  description: string;
  imageUrl: string;
  iconKey: string;
  helpedCount: number;
  goalCount: number;
  href: string;
}

export interface EventItem {
  id: string;
  order: number;
  title: string;
  description: string;
  imageUrl: string;
  iconKey: string;
  dateLabel: string;
  location: string;
  ticketInfo: string;
  isFeatured: boolean;
  theme: EventTheme;
  href: string;
}

export interface ImpactHighlight {
  id: string;
  label: string;
  value: string;
}

export interface ContactSettings {
  address: string;
  phone: string;
  email: string;
  website: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };
  footerTagline?: string;
}

export type MediaCategory =
  | "hero"
  | "work"
  | "about"
  | "general"
  | "gallery"
  | "focus"
  | "cause"
  | "event"
  | "involve"
  | "cta"
  | "contact";

export interface MediaItem {
  id: string;
  title: string;
  alt: string;
  url: string;
  category: MediaCategory;
}