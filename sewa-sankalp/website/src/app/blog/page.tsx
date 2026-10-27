import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogPageView } from "@/components/blog/BlogPage";

export const metadata: Metadata = {
  title: "Blog | Stories of Change",
  description:
    "Stories, updates and inspiration from Sewa Sankalp Foundation — education, health, environment and community work.",
};

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] bg-[var(--cream)]" />}>
      <BlogPageView heroImageUrl="/uploads/contact-hero.png" />
    </Suspense>
  );
}
