import type { Metadata } from "next";
import { connection } from "next/server";
import { GalleryPageView } from "@/components/gallery/GalleryPage";
import { buildGalleryPhotos } from "@/lib/content/galleryAlbums";
import { getPage, getPublishedMedia } from "@/lib/services/content";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const page = await getPage("gallery");
  return {
    title: page.seoTitle,
    description: page.seoDescription,
  };
}

export default async function GalleryPage() {
  await connection();
  const [page, media] = await Promise.all([
    getPage("gallery"),
    getPublishedMedia("gallery"),
  ]);
  const photos = buildGalleryPhotos(media);

  const heroImageUrl =
    page.heroImageUrl ||
    media.find((m) => /hero|banner/i.test(m.title || ""))?.url ||
    "/uploads/contact-hero.png";

  return <GalleryPageView photos={photos} heroImageUrl={heroImageUrl} />;
}
