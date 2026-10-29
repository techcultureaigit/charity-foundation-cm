import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { BlogPageView } from "@/components/blog/BlogPage";
import { getBlogPosts, getPage } from "@/lib/services/content";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const page = await getPage("blog");
  return {
    title: page.seoTitle,
    description: page.seoDescription,
  };
}

export default async function BlogPage() {
  await connection();
  const [page, posts] = await Promise.all([getPage("blog"), getBlogPosts()]);
  const heroImageUrl = page.heroImageUrl ?? "/uploads/contact-hero.png";

  return (
    <Suspense fallback={<div className="min-h-[50vh] bg-[var(--cream)]" />}>
      <BlogPageView heroImageUrl={heroImageUrl} posts={posts} page={page} />
    </Suspense>
  );
}
