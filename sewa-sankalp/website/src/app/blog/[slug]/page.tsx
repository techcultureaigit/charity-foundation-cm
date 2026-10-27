import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPageView } from "@/components/blog/BlogPostPage";
import {
  BLOG_POSTS,
  getBlogPostDetail,
} from "@/lib/content/blogPosts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostDetail(slug);
  if (!post) return { title: "Blog Post" };
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostDetail(slug);
  if (!post) notFound();

  return (
    <BlogPostPageView
      post={post}
      heroImageUrl="/uploads/contact-hero.png"
    />
  );
}
