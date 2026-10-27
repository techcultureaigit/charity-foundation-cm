import type { Metadata } from "next";
import { connection } from "next/server";
import { GalleryPageView } from "@/components/gallery/GalleryPage";
import { buildGalleryPhotos } from "@/lib/content/galleryAlbums";
import { getPublishedMedia } from "@/lib/services/content";

export const instant = false;

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Explore Sewa Sankalp Foundation photo albums — events, education, health, environment and community support.",
};

export default async function GalleryPage() {
  await connection();
  const media = await getPublishedMedia("gallery");
  const photos = buildGalleryPhotos(media);

  // Prefer a gallery hero; fall back to contact banner kids frame
  const heroImageUrl =
    media.find((m) => /hero|banner/i.test(m.title || ""))?.url ||
    "/uploads/contact-hero.png";

  return <GalleryPageView photos={photos} heroImageUrl={heroImageUrl} />;
}
