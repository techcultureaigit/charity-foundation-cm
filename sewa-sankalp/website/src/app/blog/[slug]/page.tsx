import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { BlogPostPageView } from "@/components/blog/BlogPostPage";
import { BLOG_POSTS } from "@/lib/content/blogPosts";
import { getBlogPostBySlug, getPage } from "@/lib/services/content";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connection();
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Blog Post" };
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  await connection();
  const { slug } = await params;
  const [post, page] = await Promise.all([
    getBlogPostBySlug(slug),
    getPage("blog"),
  ]);
  if (!post) notFound();

  const heroImageUrl = page.heroImageUrl ?? "/uploads/contact-hero.png";

  return <BlogPostPageView post={post} heroImageUrl={heroImageUrl} />;
}
