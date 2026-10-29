export type EnquiryStatus = "new" | "read" | "replied" | "archived";
export type VolunteerStatus = "new" | "contacted" | "approved" | "declined";
export type PageSlug =
  | "home"
  | "about"
  | "our-work"
  | "get-involved"
  | "impact-contact"
  | "education"
  | "campaigns"
  | "gallery"
  | "blog";

export type CampaignCategory =
  | "education"
  | "women"
  | "health"
  | "environment"
  | "community";

export interface CampaignItem {
  id: string;
  order: number;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category: CampaignCategory;
  imageUrl: string;
  raised: number;
  target: number;
  status: "ongoing" | "featured";
  highlights?: { icon: string; label: string }[];
  href?: string;
  isPublished: boolean;
}

export type BlogCategory =
  | "education"
  | "health"
  | "environment"
  | "women"
  | "community"
  | "events";

export interface BlogPostItem {
  id: string;
  order: number;
  slug: string;
  title: string;
  excerpt: string;
  dateLabel: string;
  category: BlogCategory;
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
    quote: { text: string; author: string; role: string };
  };
  lookingAhead: { title: string; body: string };
  tags: string[];
  isPublished: boolean;
  updatedAt?: string;
}

export interface AdminUser {
  name: string;
  email: string;
  role: "admin";
}

export interface DashboardStats {
  newEnquiries: number;
  volunteerRequests: number;
  publishedPages: number;
  mediaItems: number;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  subject?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface VolunteerRequest {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  interest: string;
  message?: string;
  status: VolunteerStatus;
  createdAt: string;
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
  isPublished: boolean;
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
  isPublished: boolean;
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
  isPublished: boolean;
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
  isPublished: boolean;
}

export interface ImpactHighlight {
  id: string;
  label: string;
  value: string;
  isVerified: boolean;
  isPublished: boolean;
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
  consentConfirmed: boolean;
  isPublished: boolean;
  createdAt: string;
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
  /** Right-side photo on the home CTA banner. */
  ctaImageUrl?: string;
  /** Contact page hero photo (organic frame). */
  heroImageUrl?: string;
  heroAccentWords?: string;
  introAccentWords?: string;
  /** Extra home-section copy (headings, labels). Keys: see lib/data/homeExtras.ts */
  extras?: Record<string, string>;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
}

export interface LegalPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
  updatedAt: string;
}
