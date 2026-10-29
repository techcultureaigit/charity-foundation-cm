import type { PageSlug } from "@/lib/types";

export interface NavPageExtraField {
  key: string;
  label: string;
  defaultValue: string;
  multiline?: boolean;
  hint?: string;
  /** Render with ImageField instead of text input */
  image?: boolean;
  preferredCategory?: string;
}

export type NavShellSlug = "education" | "campaigns" | "gallery" | "blog";

export const navPageExtraFields: Record<NavShellSlug, NavPageExtraField[]> = {
  education: [
    {
      key: "pageHeroEyebrow",
      label: "Hero eyebrow",
      defaultValue: "Our Objectives",
    },
    {
      key: "heroLine1",
      label: "Hero line 1",
      defaultValue: "Building a Better",
    },
    {
      key: "heroLine2Before",
      label: "Hero line 2 (before accent)",
      defaultValue: "Future Through ",
    },
    {
      key: "heroAccent",
      label: "Hero accent word",
      defaultValue: "Education",
    },
    {
      key: "heroBody",
      label: "Hero body (optional override)",
      defaultValue: "",
      multiline: true,
      hint: "Leave blank to use the main Body field above.",
    },
  ],
  campaigns: [
    {
      key: "pageHeroEyebrow",
      label: "Hero eyebrow",
      defaultValue: "Our Campaigns",
    },
    {
      key: "heroLine1",
      label: "Hero line 1",
      defaultValue: "Every Campaign.",
    },
    {
      key: "heroLine2",
      label: "Hero line 2 (accent colour)",
      defaultValue: "A Brighter Tomorrow.",
    },
    {
      key: "heroBody",
      label: "Hero body (optional override)",
      defaultValue: "",
      multiline: true,
      hint: "Leave blank to use the main Body field above.",
    },
    {
      key: "ctaBgImageUrl",
      label: "Bottom CTA background",
      defaultValue: "/uploads/campaign-cta-bg.png",
      image: true,
      preferredCategory: "cta",
    },
    {
      key: "featuredImageUrl",
      label: "Featured campaign hero image",
      defaultValue: "/uploads/featured-campaign-education.jpg",
      image: true,
      preferredCategory: "cause",
    },
  ],
  gallery: [
    {
      key: "pageHeroEyebrow",
      label: "Hero eyebrow",
      defaultValue: "Our Gallery",
    },
  ],
  blog: [
    {
      key: "pageHeroEyebrow",
      label: "Hero eyebrow",
      defaultValue: "Our Blog",
    },
    {
      key: "heroHeadline",
      label: "Hero headline",
      defaultValue: "Stories that Create Change.",
    },
    {
      key: "heroAccent",
      label: "Hero accent phrase",
      defaultValue: "Create Change.",
      hint: "Must appear inside the headline text.",
    },
    {
      key: "heroBody",
      label: "Hero body",
      defaultValue:
        "Real stories from classrooms, communities and campaigns — how collective care creates lasting change.",
      multiline: true,
    },
  ],
};

export function getNavPageExtraFields(
  slug: PageSlug,
): NavPageExtraField[] | undefined {
  if (
    slug === "education" ||
    slug === "campaigns" ||
    slug === "gallery" ||
    slug === "blog"
  ) {
    return navPageExtraFields[slug];
  }
  return undefined;
}
