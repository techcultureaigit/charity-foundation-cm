/** Default homepage hero slideshow images (live site + admin fallback). */
export const DEFAULT_HERO_SLIDES = [
  "/uploads/hero-home.jpg",
  "/uploads/hero-home-2.png",
] as const;

export const MAX_HERO_SLIDES = 12;

function uniqueUrls(urls: string[]): string[] {
  const out: string[] = [];
  for (const url of urls) {
    const trimmed = url.trim();
    if (trimmed && !out.includes(trimmed)) out.push(trimmed);
  }
  return out;
}

/** Parse hero slide URLs from page + extras (JSON list, then legacy fields). */
export function parseHeroSlideUrls(page: {
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
      /* legacy / bad JSON — fall through */
    }
  }

  const legacy = uniqueUrls([
    page.heroImageUrl ?? "",
    extras.heroSlide2Url ?? "",
  ]);
  if (legacy.length) return legacy;

  return [...DEFAULT_HERO_SLIDES];
}

export function serializeHeroSlides(urls: string[]): string {
  return JSON.stringify(uniqueUrls(urls).slice(0, MAX_HERO_SLIDES));
}
