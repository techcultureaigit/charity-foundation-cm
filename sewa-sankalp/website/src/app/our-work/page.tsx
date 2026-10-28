import type { Metadata } from "next";
import { connection } from "next/server";
import { OurWorkPageView } from "@/components/our-work/OurWorkPage";
import {
  getPage,
  getPublishedMedia,
  getWorkAreas,
} from "@/lib/services/content";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const page = await getPage("our-work");
  return {
    title: page.seoTitle,
    description: page.seoDescription,
  };
}

export default async function OurWorkPage() {
  await connection();
  const [page, workAreas, workMedia] = await Promise.all([
    getPage("our-work"),
    getWorkAreas(),
    getPublishedMedia("work"),
  ]);

  return (
    <OurWorkPageView
      page={page}
      workAreas={workAreas}
      workMedia={workMedia}
    />
  );
}
