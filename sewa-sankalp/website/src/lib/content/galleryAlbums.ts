import type { MediaItem } from "@/lib/types";

export type GalleryAlbumId =
  | "all"
  | "events"
  | "education"
  | "health"
  | "environment"
  | "community";

export interface GalleryAlbumDef {
  id: GalleryAlbumId;
  label: string;
  icon: "camera" | "calendar" | "book" | "heart" | "tree" | "people";
  /** Match media titles into this album */
  keywords: string[];
}

/** Filter pills + sidebar albums (reference). */
export const GALLERY_ALBUMS: GalleryAlbumDef[] = [
  {
    id: "all",
    label: "All Photos",
    icon: "camera",
    keywords: [],
  },
  {
    id: "events",
    label: "Events",
    icon: "calendar",
    keywords: ["event", "drive", "plantation", "camp", "rally", "celebration"],
  },
  {
    id: "education",
    label: "Education",
    icon: "book",
    keywords: ["education", "school", "learn", "student", "classroom"],
  },
  {
    id: "health",
    label: "Health & Welfare",
    icon: "heart",
    keywords: ["health", "welfare", "medical", "care", "elderly"],
  },
  {
    id: "environment",
    label: "Environment",
    icon: "tree",
    keywords: ["environment", "tree", "plant", "green", "nature"],
  },
  {
    id: "community",
    label: "Community Support",
    icon: "people",
    keywords: ["community", "support", "volunteer", "women", "child"],
  },
];

/** Fallback album covers + demo photos when DB gallery is empty. */
export const GALLERY_FALLBACK_PHOTOS: {
  albumId: Exclude<GalleryAlbumId, "all">;
  title: string;
  url: string;
}[] = [
  {
    albumId: "environment",
    title: "Tree Plantation Drive",
    url: "/uploads/event-01-planting.jpg",
  },
  {
    albumId: "education",
    title: "School Outreach Programme",
    url: "/uploads/event-02-education.jpg",
  },
  {
    albumId: "health",
    title: "Elder Care Visit",
    url: "/uploads/event-03-elderly.jpg",
  },
  {
    albumId: "environment",
    title: "Green Campus Initiative",
    url: "/uploads/cause-01-environment.jpg",
  },
  {
    albumId: "education",
    title: "Education Support Drive",
    url: "/uploads/cause-02-education.jpg",
  },
  {
    albumId: "health",
    title: "Community Welfare Camp",
    url: "/uploads/cause-03-welfare.jpg",
  },
  {
    albumId: "community",
    title: "Women Empowerment Meet",
    url: "/uploads/focus-01-women-empowerment.jpg",
  },
  {
    albumId: "community",
    title: "Child Development Day",
    url: "/uploads/focus-02-child-development.jpg",
  },
  {
    albumId: "health",
    title: "Education & Health Camp",
    url: "/uploads/focus-03-education-health.jpg",
  },
  {
    albumId: "community",
    title: "Social Welfare Programme",
    url: "/uploads/focus-04-social-welfare.jpg",
  },
  {
    albumId: "events",
    title: "Volunteer Helper Day",
    url: "/uploads/involve-01-helper.jpg",
  },
  {
    albumId: "events",
    title: "Volunteer Meetup",
    url: "/uploads/involve-02-volunteer.jpg",
  },
];

export interface GalleryPhoto {
  id: string;
  title: string;
  url: string;
  alt: string;
  albumId: Exclude<GalleryAlbumId, "all">;
}

function matchAlbum(title: string): Exclude<GalleryAlbumId, "all"> {
  const t = title.toLowerCase();
  for (const album of GALLERY_ALBUMS) {
    if (album.id === "all") continue;
    if (album.keywords.some((k) => t.includes(k))) return album.id;
  }
  return "events";
}

/** Merge DB gallery media with fallbacks so the page never looks empty. */
export function buildGalleryPhotos(media: MediaItem[]): GalleryPhoto[] {
  const fromDb: GalleryPhoto[] = media
    .filter((m) => m.url)
    .map((m) => ({
      id: m.id,
      title: m.title || "Gallery photo",
      url: m.url,
      alt: m.alt || m.title || "Gallery photo",
      albumId: matchAlbum(m.title || m.alt || ""),
    }));

  // Prefer CMS media only when anything is published; fallbacks only if empty
  if (fromDb.length > 0) return fromDb;

  return GALLERY_FALLBACK_PHOTOS.map((p, i) => ({
    id: `fallback-${i}`,
    title: p.title,
    url: p.url,
    alt: p.title,
    albumId: p.albumId,
  }));
}

export interface AlbumCard {
  id: Exclude<GalleryAlbumId, "all">;
  label: string;
  title: string;
  coverUrl: string;
  count: number;
}

function isUsefulTitle(title: string) {
  const t = title.trim().toLowerCase();
  if (!t || t.length < 4) return false;
  if (/^(footer|gallery|untitled|image|photo|img)/i.test(t)) return false;
  return true;
}

/** One card per album (cover = first photo). */
export function buildAlbumCards(photos: GalleryPhoto[]): AlbumCard[] {
  return GALLERY_ALBUMS.filter(
    (a): a is GalleryAlbumDef & { id: Exclude<GalleryAlbumId, "all"> } =>
      a.id !== "all",
  ).map((album) => {
    const items = photos.filter((p) => p.albumId === album.id);
    const fallback = GALLERY_FALLBACK_PHOTOS.find((p) => p.albumId === album.id);
    const named = items.find((p) => isUsefulTitle(p.title));
    const cover =
      named?.url || items[0]?.url || fallback?.url || "/uploads/event-01-planting.jpg";
    const title =
      named?.title || fallback?.title || album.label;
    return {
      id: album.id,
      label: album.label,
      title,
      coverUrl: cover,
      count: Math.max(items.length, 1),
    };
  });
}
