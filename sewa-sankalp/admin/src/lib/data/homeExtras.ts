export interface HomeExtraField {
  key: string;
  label: string;
  group: string;
  defaultValue: string;
  multiline?: boolean;
  hint?: string;
}

/**
 * Additional editable copy for the home page sections (stored in Page.extras).
 * Keep in sync with website/src/lib/content/homeExtras.ts (defaults only).
 */
export const homeExtraFields: HomeExtraField[] = [
  // Introduction
  { group: "Introduction", key: "introTitle", label: "Section title", defaultValue: "Introduction" },
  { group: "Introduction", key: "introLabel", label: "Gold label above headline", defaultValue: "Introduction" },

  // About
  { group: "About", key: "aboutTitle", label: "Section title", defaultValue: "About Sewa Sankalp Foundation" },
  { group: "About", key: "aboutTitleAccent", label: "Section title — gold words", defaultValue: "Sewa Sankalp Foundation" },
  { group: "About", key: "aboutAccentWords", label: "Headline — gold words", defaultValue: "Our Goal", hint: "Headline itself comes from the About page." },
  { group: "About", key: "aboutQuote", label: "Banner quote (on photo)", defaultValue: "Together for a better tomorrow." },
  { group: "About", key: "aboutQuoteAccent", label: "Banner quote — gold words", defaultValue: "better" },
  { group: "About", key: "aboutButtonLabel", label: "Button label", defaultValue: "Read More About Us" },
  { group: "About", key: "aboutButtonHref", label: "Button link", defaultValue: "/about" },

  // CTA banner
  { group: "CTA banner", key: "ctaAccentWords", label: "Headline — gold words", defaultValue: "Exclusive Services?", hint: "Headline, body and button are in the CTA group above." },

  // Get involved
  { group: "Get Involved", key: "involveEyebrow", label: "Eyebrow", defaultValue: "Help us achieve our goal" },
  { group: "Get Involved", key: "involveHeadline", label: "Headline", defaultValue: "Be Part of a Better Tomorrow" },
  { group: "Get Involved", key: "involveAccentWords", label: "Headline — gold words", defaultValue: "Better Tomorrow" },
  { group: "Get Involved", key: "involveSubtitle", label: "Subtitle", defaultValue: "Every helping hand can make a meaningful difference." },

  // Causes
  { group: "Recent Causes", key: "causesEyebrow", label: "Eyebrow", defaultValue: "Learn more about our" },
  { group: "Recent Causes", key: "causesHeadline", label: "Headline", defaultValue: "Recent Causes" },
  { group: "Recent Causes", key: "causesAccentWords", label: "Headline — gold words", defaultValue: "Causes" },
  { group: "Recent Causes", key: "causesButtonLabel", label: "Card button label", defaultValue: "Learn More" },

  // Events
  { group: "Upcoming Events", key: "eventsEyebrow", label: "Top eyebrow", defaultValue: "Know and come to join our" },
  { group: "Upcoming Events", key: "eventsHeadline", label: "Top headline", defaultValue: "Upcoming Events" },
  { group: "Upcoming Events", key: "eventsAccentWords", label: "Top headline — gold words", defaultValue: "Events" },
  { group: "Upcoming Events", key: "eventsViewAllLabel", label: "View-all button label", defaultValue: "View All Events" },
  { group: "Upcoming Events", key: "eventsViewAllHref", label: "View-all button link", defaultValue: "/get-involved" },
  { group: "Upcoming Events", key: "eventsSideLabel", label: "Left copy label", defaultValue: "Upcoming Events" },
  { group: "Upcoming Events", key: "eventsSideHeadline", label: "Left copy headline", defaultValue: "Be a Part of Our Next Initiative" },
  { group: "Upcoming Events", key: "eventsSideAccent", label: "Left headline — gold words", defaultValue: "Initiative" },
  {
    group: "Upcoming Events",
    key: "eventsSideBody",
    label: "Left copy body",
    multiline: true,
    defaultValue:
      "Join our upcoming events and contribute to a stronger, healthier and more inclusive community. Together, we can create lasting change.",
  },
  { group: "Upcoming Events", key: "eventsJoinLabel", label: "Join button label", defaultValue: "Join an Event" },
  { group: "Upcoming Events", key: "eventsJoinHref", label: "Join button link", defaultValue: "/get-involved" },
  { group: "Upcoming Events", key: "eventsFeature1Title", label: "Feature bar 1 — title", defaultValue: "Join & Participate" },
  { group: "Upcoming Events", key: "eventsFeature1Body", label: "Feature bar 1 — text", defaultValue: "Be a part of meaningful initiatives" },
  { group: "Upcoming Events", key: "eventsFeature2Title", label: "Feature bar 2 — title", defaultValue: "Meet Like-Minded People" },
  { group: "Upcoming Events", key: "eventsFeature2Body", label: "Feature bar 2 — text", defaultValue: "Connect with a caring community" },
  { group: "Upcoming Events", key: "eventsFeature3Title", label: "Feature bar 3 — title", defaultValue: "Create a Lasting Impact" },
  { group: "Upcoming Events", key: "eventsFeature3Body", label: "Feature bar 3 — text", defaultValue: "Together for a better tomorrow" },
];

export const homeExtraDefaults: Record<string, string> = Object.fromEntries(
  homeExtraFields.map((field) => [field.key, field.defaultValue]),
);

export const homeExtraGroups = Array.from(
  new Set(homeExtraFields.map((field) => field.group)),
);
