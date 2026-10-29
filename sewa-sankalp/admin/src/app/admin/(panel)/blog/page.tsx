import { connection } from "next/server";
import { BlogPostsManager } from "@/components/cms/BlogPostsManager";
import { NavPageManager } from "@/components/pages/NavPageManager";
import { getBlogPosts, getMediaOptions } from "@/lib/services/cms";
import { getPages } from "@/lib/services/pages";

export const instant = false;

export default async function AdminBlogPage() {
  await connection();

  let pages;
  let posts;
  let media = [];
  try {
    [pages, posts, media] = await Promise.all([
      getPages(),
      getBlogPosts(),
      getMediaOptions(),
    ]);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not load blog module.";
    return (
      <div className="admin-card space-y-2 border border-[#f0c2c2] bg-[#fff7f7] p-6 text-sm text-[#9b1c1c]">
        <p className="font-semibold">Blog could not load</p>
        <p>{message}</p>
      </div>
    );
  }

  const shell = pages.find((page) => page.slug === "blog");

  return (
    <div className="space-y-10 pb-8">
      {shell ? (
        <NavPageManager
          page={shell}
          media={media}
          slug="blog"
          title="Blog"
          description="Page banner for /blog, then manage articles below."
          saveLabel="Save blog page"
        />
      ) : (
        <div className="admin-card p-6 text-sm text-[var(--admin-muted)]">
          Blog page shell not found — start the backend to seed nav pages.
        </div>
      )}

      <BlogPostsManager items={posts} media={media} />
    </div>
  );
}
