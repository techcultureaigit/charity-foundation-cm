/** Resolve CMS image paths to the live website origin (uploads live there). */
export function getSiteOrigin() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

export function resolveMediaUrl(url?: string | null) {
  const raw = url?.trim();
  if (!raw) return "";
  if (
    raw.startsWith("http://") ||
    raw.startsWith("https://") ||
    raw.startsWith("blob:") ||
    raw.startsWith("data:")
  ) {
    return raw;
  }
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return `${getSiteOrigin()}${path}`;
}
