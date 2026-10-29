/** Default homepage hero slideshow (used when CMS has no list yet). */
export const DEFAULT_HERO_SLIDES = [
  "/uploads/hero-home.jpg",
  "/uploads/hero-home-2.png",
] as const;

function uniqueUrls(urls: string[]): string[] {
  const out: string[] = [];
  for (const url of urls) {
    const trimmed = url.trim();
    if (trimmed && !out.includes(trimmed)) out.push(trimmed);
  }
  return out;
}

/** Resolve hero slide URLs from Page + extras (JSON list, then legacy fields). */
export function resolveHeroSlideUrls(page: {
  heroImageUrl?: string;
  extras?: Record<string, string>;
}): string[] {
  const extras = page.extras ?? {};
  const raw = extras.heroSlides?.trim();
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        const urls = uniqueUrls(parsed.map((item) => String(item ?? "")));
        if (urls.length) return urls;
      }
    } catch {
      /* fall through */
    }
  }

  const legacy = uniqueUrls([
    page.heroImageUrl ?? "",
    extras.heroSlide2Url ?? "",
  ]);
  if (legacy.length) return legacy;

  return [...DEFAULT_HERO_SLIDES];
}
