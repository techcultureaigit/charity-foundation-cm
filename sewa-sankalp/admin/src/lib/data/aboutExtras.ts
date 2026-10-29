export interface AboutExtraField {
  key: string;
  label: string;
  group: string;
  defaultValue: string;
  multiline?: boolean;
  hint?: string;
}

export interface JourneyItem {
  year: string;
  icon: string;
  text: string;
  /** Word inside text shown in bold (optional). */
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

export const DEFAULT_JOURNEY_JSON = JSON.stringify(DEFAULT_JOURNEY_ITEMS);

/**
 * About page section copy/images (Page.extras on slug “about”).
 * Headline/body on the page record still feed the homepage About text column.
 */
export const aboutExtraFields: AboutExtraField[] = [
  // Hero
  {
    group: "Hero",
    key: "pageHeroEyebrow",
    label: "Hero eyebrow",
    defaultValue: "About Sewa Sankalp Foundation",
  },
  {
    group: "Hero",
    key: "pageHeroHeadline",
    label: "Hero headline",
    defaultValue: "People. Purpose. A Brighter Tomorrow.",
  },
  {
    group: "Hero",
    key: "pageHeroAccent",
    label: "Hero — accent words",
    defaultValue: "A Brighter Tomorrow.",
  },
  {
    group: "Hero",
    key: "pageHeroBody",
    label: "Hero body",
    multiline: true,
    defaultValue:
      "Sewa Sankalp Foundation is a non-profit organization dedicated to creating a more equitable, healthier and sustainable society through education, healthcare, environment and community support.",
  },

  // Who we are
  {
    group: "Who We Are",
    key: "whoLabel",
    label: "Section label",
    defaultValue: "Who We Are",
  },
  {
    group: "Who We Are",
    key: "whoTitle",
    label: "Section title",
    defaultValue: "About Sewa Sankalp Foundation",
  },
  {
    group: "Who We Are",
    key: "whoAccent",
    label: "Title — accent words",
    defaultValue: "Foundation",
  },
  {
    group: "Who We Are",
    key: "whoBody1",
    label: "First paragraph",
    multiline: true,
    defaultValue:
      "Sewa Sankalp Foundation is a non-governmental trust dedicated to the upliftment and service of the weaker sections of society. We work with poor, helpless, and deprived families — especially women and children — so every person can live with dignity.",
  },
  {
    group: "Who We Are",
    key: "whoBody2",
    label: "Second paragraph",
    multiline: true,
    defaultValue:
      "Inspired by a deep commitment to public service, our programmes focus on education, health, empowerment, and social welfare — creating lasting opportunities for communities across Uttarakhand.",
  },

  // Pillars
  {
    group: "Pillars",
    key: "pillar1Title",
    label: "Pillar 1 — title",
    defaultValue: "Our Mission",
  },
  {
    group: "Pillars",
    key: "pillar1Text",
    label: "Pillar 1 — text",
    multiline: true,
    defaultValue:
      "To empower underprivileged communities through education, healthcare, environment and sustainable development.",
  },
  {
    group: "Pillars",
    key: "pillar2Title",
    label: "Pillar 2 — title",
    defaultValue: "Our Vision",
  },
  {
    group: "Pillars",
    key: "pillar2Text",
    label: "Pillar 2 — text",
    multiline: true,
    defaultValue:
      "A society where every individual has equal opportunities to learn, grow, thrive and contribute to a better tomorrow.",
  },
  {
    group: "Pillars",
    key: "pillar3Title",
    label: "Pillar 3 — title",
    defaultValue: "Our Values",
  },
  {
    group: "Pillars",
    key: "pillar3Text",
    label: "Pillar 3 — text",
    multiline: true,
    defaultValue:
      "Service, Integrity, Compassion, Inclusivity and Sustainability guide everything we do.",
  },

  // Impact band
  {
    group: "Impact band",
    key: "statsEyebrow",
    label: "Eyebrow",
    defaultValue: "Our Impact in Numbers",
  },
  {
    group: "Impact band",
    key: "statsHeadline",
    label: "Headline",
    defaultValue: "Creating Lasting Change in Communities",
  },

  // Journey
  {
    group: "Journey",
    key: "journeyImageUrl",
    label: "Journey photo URL",
    defaultValue: "/uploads/about-journey.png",
  },
  {
    group: "Journey",
    key: "journeyEyebrow",
    label: "Eyebrow",
    defaultValue: "Our Journey",
  },
  {
    group: "Journey",
    key: "journeyHeadline",
    label: "Headline",
    defaultValue: "From a Small Step to a Bigger Movement",
  },
  {
    group: "Journey",
    key: "journeyAccent",
    label: "Headline — accent words",
    defaultValue: "Bigger Movement",
  },
  {
    group: "Journey",
    key: "journeyBody",
    label: "Body",
    multiline: true,
    defaultValue:
      "What began as a simple desire to help has now grown into a collective movement of change. With the support of our volunteers, donors and partners, Sewa Sankalp Foundation has been able to reach thousands of lives and create meaningful, sustainable impact in communities across India.",
  },
  {
    group: "Journey",
    key: "journeyItems",
    label: "Timeline (JSON)",
    defaultValue: DEFAULT_JOURNEY_JSON,
    multiline: true,
  },

  // Bottom CTA
  {
    group: "Bottom CTA",
    key: "ctaBgImageUrl",
    label: "CTA background image",
    defaultValue: "/uploads/about-cta-bg.png",
  },
  {
    group: "Bottom CTA",
    key: "pageCtaHeadline",
    label: "Headline",
    defaultValue: "Be a Part of Our Journey",
  },
  {
    group: "Bottom CTA",
    key: "pageCtaAccent",
    label: "Headline — accent words",
    defaultValue: "Journey",
  },
  {
    group: "Bottom CTA",
    key: "pageCtaBody",
    label: "Body",
    multiline: true,
    defaultValue:
      "Your support can help us reach more people, create more opportunities and build stronger, healthier communities.",
  },
  {
    group: "Bottom CTA",
    key: "pageCtaButtonLabel",
    label: "Button label",
    defaultValue: "Get Involved",
  },
  {
    group: "Bottom CTA",
    key: "pageCtaButtonHref",
    label: "Button link",
    defaultValue: "/get-involved",
  },
];

export const aboutExtraDefaults: Record<string, string> = Object.fromEntries(
  aboutExtraFields.map((field) => [field.key, field.defaultValue]),
);

export const aboutExtraGroups = Array.from(
  new Set(aboutExtraFields.map((field) => field.group)),
);

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
