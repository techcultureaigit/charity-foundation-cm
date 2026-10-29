import type { Metadata } from "next";
import { connection } from "next/server";
import { AboutPageView } from "@/components/about/AboutPage";
import {
  getPage,
  getPublishedImpact,
  getPublishedMedia,
} from "@/lib/services/content";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const page = await getPage("about");
  return {
    title: page.seoTitle,
    description: page.seoDescription,
  };
}

export default async function AboutPage() {
  await connection();
  const [page, aboutMedia, impact] = await Promise.all([
    getPage("about"),
    getPublishedMedia("about"),
    getPublishedImpact(),
  ]);

  return (
    <AboutPageView
      page={page}
      photo={aboutMedia[0]}
      impact={impact}
    />
  );
}
