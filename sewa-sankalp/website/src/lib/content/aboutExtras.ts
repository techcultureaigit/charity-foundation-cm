import type { PageContent } from "@/lib/types";

export interface JourneyItem {
  year: string;
  icon: string;
  text: string;
  emphasis?: string;
}

export const DEFAULT_JOURNEY_ITEMS: JourneyItem[] = [
  {
    year: "2020",
    icon: "calendar_month",
    text: "Our journey began with a vision to serve society.",
    emphasis: "began",
  },
  {
    year: "2021",
    icon: "groups",
    text: "Expanded our education and healthcare initiatives.",
  },
  {
    year: "2022",
    icon: "eco",
    text: "Started environment and community development programs.",
  },
  {
    year: "2023",
    icon: "trending_up",
    text: "Reached 1,000+ people and partnered with multiple organizations.",
  },
  {
    year: "2024",
    icon: "star",
    text: "Continuing our mission for a brighter and more inclusive tomorrow.",
  },
];

/** Defaults for About page sections (Page.extras). Edit in Admin → Pages → About. */
export const aboutExtraDefaults: Record<string, string> = {
  pageHeroEyebrow: "About Sewa Sankalp Foundation",
  pageHeroHeadline: "People. Purpose. A Brighter Tomorrow.",
  pageHeroAccent: "A Brighter Tomorrow.",
  pageHeroBody:
    "Sewa Sankalp Foundation is a non-profit organization dedicated to creating a more equitable, healthier and sustainable society through education, healthcare, environment and community support.",

  whoLabel: "Who We Are",
  whoTitle: "About Sewa Sankalp Foundation",
  whoAccent: "Foundation",
  whoBody1:
    "Sewa Sankalp Foundation is a non-governmental trust dedicated to the upliftment and service of the weaker sections of society. We work with poor, helpless, and deprived families — especially women and children — so every person can live with dignity.",
  whoBody2:
    "Inspired by a deep commitment to public service, our programmes focus on education, health, empowerment, and social welfare — creating lasting opportunities for communities across Uttarakhand.",

  pillar1Title: "Our Mission",
  pillar1Text:
    "To empower underprivileged communities through education, healthcare, environment and sustainable development.",
  pillar2Title: "Our Vision",
  pillar2Text:
    "A society where every individual has equal opportunities to learn, grow, thrive and contribute to a better tomorrow.",
  pillar3Title: "Our Values",
  pillar3Text:
    "Service, Integrity, Compassion, Inclusivity and Sustainability guide everything we do.",

  statsEyebrow: "Our Impact in Numbers",
  statsHeadline: "Creating Lasting Change in Communities",

  journeyImageUrl: "/uploads/about-journey.png",
  journeyEyebrow: "Our Journey",
  journeyHeadline: "From a Small Step to a Bigger Movement",
  journeyAccent: "Bigger Movement",
  journeyBody:
    "What began as a simple desire to help has now grown into a collective movement of change. With the support of our volunteers, donors and partners, Sewa Sankalp Foundation has been able to reach thousands of lives and create meaningful, sustainable impact in communities across India.",
  journeyItems: JSON.stringify(DEFAULT_JOURNEY_ITEMS),

  ctaBgImageUrl: "/uploads/about-cta-bg.png",
  pageCtaHeadline: "Be a Part of Our Journey",
  pageCtaAccent: "Journey",
  pageCtaBody:
    "Your support can help us reach more people, create more opportunities and build stronger, healthier communities.",
  pageCtaButtonLabel: "Get Involved",
  pageCtaButtonHref: "/get-involved",
};

export function withAboutExtras(page: PageContent): PageContent {
  if (page.slug !== "about") return page;
  const merged: Record<string, string> = { ...aboutExtraDefaults };
  for (const [key, value] of Object.entries(page.extras ?? {})) {
    if (typeof value === "string" && value.trim() !== "") merged[key] = value;
  }
  return { ...page, extras: merged };
}

export function parseJourneyItems(raw: string | undefined): JourneyItem[] {
  if (!raw?.trim()) return DEFAULT_JOURNEY_ITEMS;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return DEFAULT_JOURNEY_ITEMS;
    }
    return parsed.map((item) => {
      const row = item as Record<string, unknown>;
      return {
        year: String(row.year ?? "").trim() || "—",
        icon: String(row.icon ?? "star").trim() || "star",
        text: String(row.text ?? "").trim(),
        emphasis: row.emphasis ? String(row.emphasis).trim() : undefined,
      };
    });
  } catch {
    return DEFAULT_JOURNEY_ITEMS;
  }
}
