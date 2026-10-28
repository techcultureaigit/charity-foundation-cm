"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { HiChevronRight, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { AccentText, LeafCorner } from "@/components/home/shared";
import { BLOG_CATEGORY_ICONS } from "@/components/blog/categoryIcons";
import { UtilityIcon } from "@/components/site/icons";
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  categoryBadge,
  categoryLabel,
  type BlogCategoryId,
  type BlogPost,
} from "@/lib/content/blogPosts";

const PAGE_SIZE = 9;

function isCategoryId(value: string | null): value is BlogCategoryId {
  return Boolean(value && BLOG_CATEGORIES.some((c) => c.id === value));
}

export function BlogPageView({ heroImageUrl }: { heroImageUrl: string }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialQuery = searchParams.get("q") ?? "";
  const [active, setActive] = useState<BlogCategoryId>(
    isCategoryId(initialCategory) ? initialCategory : "all",
  );
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<"latest" | "oldest">("latest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list: BlogPost[] = BLOG_POSTS.filter((post) => {
      if (active !== "all" && post.category !== active) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        categoryLabel(post.category).toLowerCase().includes(q)
      );
    });
    // Posts are authored newest-first; reverse only when Oldest First
    if (sort === "oldest") list = [...list].reverse();
    return list;
  }, [active, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagePosts = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const recent = BLOG_POSTS.slice(0, 4);

  function selectCategory(id: BlogCategoryId) {
    setActive(id);
    setPage(1);
  }

  return (
    <div className="bg-[var(--cream)]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#FDF8EE] leading-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImageUrl}
          alt=""
          aria-hidden
          className="m-0 block h-[240px] w-full max-w-none object-cover object-[85%_center] sm:h-[230px] sm:object-right lg:h-[260px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#FDF8EE] from-[0%] via-[#FDF8EE] via-[48%] to-transparent to-[78%] sm:from-[#FDF8EE]/70 sm:via-[#FDF8EE]/30 sm:to-transparent"
        />
        <div className="pointer-events-none absolute inset-0 z-[2] flex items-center">
          <div className="page-shell pointer-events-auto flex w-full justify-start">
            <div className="w-full max-w-[36rem] py-3 sm:py-4">
              <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
                Our Blog
              </p>
              <h1 className="display mt-1.5 text-[clamp(1.55rem,7vw,3rem)] font-bold leading-[1.08] text-[var(--forest)] sm:mt-2">
                <AccentText
                  text="Stories that Create Change."
                  accent="Create Change."
                  accentClass="text-[#D68C23]"
                />
              </h1>
              <p className="mt-2 max-w-[30rem] line-clamp-3 text-[12px] leading-[1.65] text-[#4A4A4A] sm:mt-2.5 sm:line-clamp-none sm:text-[13.5px] sm:leading-[1.7]">
                Real stories from classrooms, communities and campaigns — how
                collective care creates lasting change.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-8 sm:py-10 lg:py-12">
        <LeafCorner corner="bl" tone="forest" className="opacity-70" />
        <LeafCorner corner="br" tone="forest" className="opacity-65" />

        <div className="page-shell relative z-[1] grid gap-5 lg:grid-cols-[240px_1fr] lg:items-start lg:gap-6 xl:grid-cols-[250px_1fr] xl:gap-8">
          {/* Sidebar — search inside Categories card (top) */}
          <aside className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_8px_24px_rgba(0,51,43,0.07)]">
              <label className="relative block p-3 pb-1.5">
                <HiOutlineMagnifyingGlass className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search articles..."
                  className="w-full rounded-lg border border-[var(--border)] bg-white py-2.5 pl-4 pr-10 text-[12.5px] outline-none ring-[var(--forest)] transition focus:ring-2"
                />
              </label>
              <div className="px-4 pb-2 pt-2">
                <h2 className="display text-[1.2rem] font-bold text-[var(--forest)]">
                  Categories
                </h2>
              </div>
              <nav className="flex flex-col p-1.5" aria-label="Blog categories">
                {BLOG_CATEGORIES.map((cat, index) => {
                  const selected = active === cat.id;
                  const Icon = BLOG_CATEGORY_ICONS[cat.id];
                  return (
                    <div key={cat.id}>
                      <button
                        type="button"
                        onClick={() => selectCategory(cat.id)}
                        className={`box-border flex h-12 w-full shrink-0 items-center gap-3 rounded-xl px-3.5 text-left text-[13.5px] font-semibold transition-colors ${
                          selected
                            ? "bg-[#F8EBD7] text-[#D97706]"
                            : "bg-transparent text-[#2C3A4A] hover:bg-[var(--ivory)]"
                        }`}
                      >
                        <Icon
                          className={`h-[18px] w-[18px] shrink-0 ${
                            selected ? "text-[#D97706]" : "text-[#4A5568]"
                          }`}
                        />
                        <span className="min-w-0 flex-1 leading-tight">
                          {cat.label}
                        </span>
                        <HiChevronRight
                          className={`h-4 w-4 shrink-0 ${
                            selected
                              ? "text-[#D97706] opacity-100"
                              : "opacity-0"
                          }`}
                        />
                      </button>
                      {index < BLOG_CATEGORIES.length - 1 ? (
                        <div className="mx-3 h-px bg-[var(--border)]" />
                      ) : null}
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white p-3 shadow-[0_6px_18px_rgba(0,51,43,0.05)]">
              <h2 className="display text-[1rem] font-bold text-[var(--forest)]">
                Recent Posts
              </h2>
              <ul className="mt-3 space-y-3">
                {recent.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex gap-2.5 group"
                    >
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-[#e8e2d6]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12px] font-semibold leading-snug text-[var(--forest)] group-hover:text-[#D97706]">
                          {post.title}
                        </span>
                        <span className="mt-0.5 block text-[10.5px] text-[var(--muted)]">
                          {post.date}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main: filters over cards + grid */}
          <div className="min-w-0 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {BLOG_CATEGORIES.filter((c) => c.id !== "women").map((cat) => {
                const selected = active === cat.id;
                const label =
                  cat.id === "all"
                    ? "All"
                    : cat.id === "events"
                      ? "Events"
                      : cat.label;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => selectCategory(cat.id)}
                    className={`nav-bar rounded-full px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.05em] transition-colors sm:px-3.5 sm:text-[11px] ${
                      selected
                        ? "bg-[var(--forest)] text-white"
                        : "border border-black/10 bg-[#F7F4EE] text-[var(--charcoal)] hover:border-[var(--gold)]/40"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
              <label className="ml-auto flex items-center gap-1.5 text-[11.5px] text-[var(--muted)]">
                <span className="hidden sm:inline">Sort</span>
                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value === "oldest" ? "oldest" : "latest")
                  }
                  className="rounded-full border border-black/10 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[var(--charcoal)] outline-none"
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </label>
            </div>

            {pagePosts.length === 0 ? (
              <p className="rounded-xl border border-[var(--border)] bg-white px-4 py-8 text-center text-[13px] text-[var(--muted)]">
                No blogs found. Try another category or search.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                {pagePosts.map((post) => (
                  <article
                    key={post.id}
                    id={post.slug}
                    className="group overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-[0_4px_14px_rgba(0,51,43,0.04)]"
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#e8e2d6]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span
                          className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-white ${categoryBadge(post.category)}`}
                        >
                          {categoryLabel(post.category)}
                        </span>
                      </div>
                      <div className="px-3 py-2.5">
                        <p className="text-[10.5px] text-[var(--muted)]">
                          {post.date}
                        </p>
                        <h3 className="display mt-1 text-[0.92rem] font-bold leading-snug text-[var(--forest)] group-hover:text-[#D97706]">
                          {post.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-snug text-[var(--muted)]">
                          {post.excerpt}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#D97706]">
                          Read More
                          <UtilityIcon name="arrow" className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}

            {totalPages > 1 ? (
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-md border border-[var(--border)] bg-white px-2.5 py-1.5 text-[11px] font-semibold disabled:opacity-40"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPage(n)}
                      className={`h-8 w-8 rounded-md text-[11.5px] font-bold ${
                        n === currentPage
                          ? "bg-[var(--forest)] text-white"
                          : "border border-[var(--border)] bg-white text-[var(--charcoal)]"
                      }`}
                    >
                      {n}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-md border border-[var(--border)] bg-white px-2.5 py-1.5 text-[11px] font-semibold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Newsletter strip */}
      <section className="relative overflow-hidden bg-[var(--forest)] py-10 text-white sm:py-12">
        <LeafCorner corner="bl" className="opacity-30" />
        <LeafCorner corner="br" className="opacity-25" />
        <div className="page-shell relative z-[1] flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h2 className="display text-[clamp(1.4rem,2.2vw,1.9rem)] font-bold text-white">
              Get the Latest Stories & Updates
            </h2>
            <p className="mt-1.5 max-w-md text-[13px] text-white/75">
              Subscribe for field stories, event invites and ways to get
              involved.
            </p>
          </div>
          <form
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="min-w-0 flex-1 rounded-full border-0 bg-white px-4 py-2.5 text-[13px] text-[var(--charcoal)] outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-[#D97706] px-5 py-2.5 text-[12.5px] font-bold uppercase tracking-wide text-white hover:bg-[#c46a08]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
