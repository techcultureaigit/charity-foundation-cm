"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AccentText, LeafCorner } from "@/components/home/shared";
import { SocialIcon, UtilityIcon } from "@/components/site/icons";
import {
  BLOG_CATEGORIES,
  categoryBadge,
  categoryCounts,
  categoryLabel,
  getRecentPosts,
  getRelatedPosts,
  type BlogPostDetail,
} from "@/lib/content/blogPosts";

function formatViews(n: number) {
  return n.toLocaleString("en-IN");
}

function FeatureParallax({
  src,
  alt,
  badgeClass,
  badgeLabel,
}: {
  src: string;
  alt: string;
  badgeClass: string;
  badgeLabel: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = frameRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight || 1;
        // Map how far the frame is through the viewport → subtle Y shift
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        setShift((clamped - 0.5) * 48);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#e8e2d6] sm:aspect-[2/1]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="pointer-events-none absolute left-0 top-[-12%] h-[124%] w-full object-cover object-center will-change-transform"
        style={{ transform: `translate3d(0, ${shift}px, 0)` }}
      />
      <span
        className={`absolute left-3 top-3 z-[1] rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white sm:left-4 sm:top-4 ${badgeClass}`}
      >
        {badgeLabel}
      </span>
    </div>
  );
}

export function BlogPostPageView({
  post,
  heroImageUrl,
}: {
  post: BlogPostDetail;
  heroImageUrl: string;
}) {
  const [query, setQuery] = useState("");
  const counts = useMemo(() => categoryCounts(), []);
  const recent = useMemo(() => getRecentPosts(post.slug, 4), [post.slug]);
  const related = useMemo(() => getRelatedPosts(post.slug, 3), [post.slug]);
  const sharePath = `/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  const shareLinks = [
    {
      name: "facebook" as const,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharePath)}`,
      label: "Facebook",
    },
    {
      name: "twitter" as const,
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(sharePath)}`,
      label: "Twitter",
    },
    {
      name: "linkedin" as const,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(sharePath)}`,
      label: "LinkedIn",
    },
  ];

  return (
    <div className="bg-[var(--cream)]">
      {/* Compact hero — same pattern as Blog listing */}
      <section className="relative w-full overflow-hidden bg-[#FDF8EE] leading-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImageUrl}
          alt=""
          aria-hidden
          className="m-0 block h-[200px] w-full max-w-none object-cover object-right sm:h-[230px] lg:h-[260px]"
        />
        <div className="pointer-events-none absolute inset-0 z-[1] flex items-center">
          <div className="page-shell pointer-events-auto flex w-full justify-start">
            <div className="w-full max-w-[36rem] py-4 sm:pl-[4%] lg:pl-[8%]">
              <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
                Our Blog
              </p>
              <h1 className="display mt-2 text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.08] text-[#0A2E26]">
                <AccentText
                  text="Stories that Create Change."
                  accent="Create Change."
                  accentClass="text-[#D68C23]"
                />
              </h1>
              <p className="mt-2.5 max-w-[30rem] text-[12.5px] leading-[1.7] text-[#4A4A4A] sm:text-[13.5px]">
                Real stories from classrooms, communities and campaigns — how
                collective care creates lasting change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb + article — continuous white like reference */}
      <div className="bg-white">
        <nav
          aria-label="Breadcrumb"
          className="page-shell flex flex-wrap items-center gap-1.5 py-3 text-[12px] text-[#6B6B6B]"
        >
          <Link href="/" className="hover:text-[#D97706]">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/blog" className="hover:text-[#D97706]">
            Blog
          </Link>
          <span aria-hidden>/</span>
          <Link
            href={`/blog?category=${post.category}`}
            className="hover:text-[#D97706]"
          >
            {categoryLabel(post.category)}
          </Link>
          <span aria-hidden>/</span>
          <span className="line-clamp-1 font-semibold text-[#D97706]">
            {post.title}
          </span>
        </nav>

        <section className="relative pt-3 pb-8 sm:pt-4 sm:pb-10 lg:pt-5 lg:pb-12">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <LeafCorner corner="bl" tone="gold" className="opacity-40" />
            <LeafCorner corner="br" tone="gold" className="opacity-35" />
          </div>

        <div className="page-shell relative z-[1] grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-10">
          {/* Main column — image top-aligned with sidebar */}
          <div className="min-w-0">
            <FeatureParallax
              src={post.featureImage}
              alt={post.title}
              badgeClass={categoryBadge(post.category)}
              badgeLabel={categoryLabel(post.category)}
            />

          <article className="min-w-0">
            <h2 className="display mt-6 text-[clamp(1.55rem,2.8vw,2.25rem)] font-bold leading-tight text-[var(--forest)]">
              {post.title}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px] text-[#6B6B6B]">
              <span className="inline-flex items-center gap-1.5">
                <UtilityIcon name="calendar" className="h-3.5 w-3.5 text-[#D97706]" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <UtilityIcon name="user" className="h-3.5 w-3.5 text-[#D97706]" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <UtilityIcon name="camera" className="h-3.5 w-3.5 text-[#D97706]" />
                {formatViews(post.views)} Views
              </span>
            </div>

            <p className="mt-5 text-[14.5px] leading-[1.8] text-[#4A4A4A]">
              {post.intro}
            </p>

            {/* Challenge */}
            <div className="mt-9 grid gap-5 sm:grid-cols-[1.15fr_0.85fr] sm:items-start">
              <div>
                <h3 className="display text-[1.35rem] font-bold text-[var(--forest)]">
                  {post.challenge.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.8] text-[#4A4A4A]">
                  {post.challenge.body}
                </p>
              </div>
              <div className="overflow-hidden rounded-xl bg-[#e8e2d6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.challenge.image}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>

            {/* Initiative */}
            <div className="mt-10">
              <h3 className="display text-[1.35rem] font-bold text-[var(--forest)]">
                {post.initiative.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.8] text-[#4A4A4A]">
                {post.initiative.body}
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {post.initiative.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-[#E8DFD0] bg-white px-3.5 py-3 shadow-[0_4px_14px_rgba(0,51,43,0.04)]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3E0C4] text-[#D97706]">
                      <UtilityIcon name={item.icon} className="h-4 w-4" />
                    </span>
                    <span className="text-[13.5px] font-semibold text-[var(--forest)]">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact + quote */}
            <div className="mt-10">
              <h3 className="display text-[1.35rem] font-bold text-[var(--forest)]">
                {post.impact.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.8] text-[#4A4A4A]">
                {post.impact.body}
              </p>
              <blockquote className="relative mt-5 overflow-hidden rounded-2xl bg-[#F8EBD7] px-5 py-6 sm:px-7 sm:py-7">
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-3 font-serif text-[4.5rem] leading-none text-[#E8C98A]/90"
                >
                  “
                </span>
                <p className="relative z-[1] pl-2 text-[15px] italic leading-relaxed text-[var(--forest)] sm:pl-4 sm:text-[16px]">
                  {post.impact.quote.text}
                </p>
                <footer className="relative z-[1] mt-3 pl-2 text-[13px] font-semibold text-[#D97706] sm:pl-4">
                  — {post.impact.quote.author}
                  {post.impact.quote.role
                    ? `, ${post.impact.quote.role}`
                    : ""}
                </footer>
              </blockquote>
            </div>

            {/* Looking ahead */}
            <div className="mt-10">
              <h3 className="display text-[1.35rem] font-bold text-[var(--forest)]">
                {post.lookingAhead.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.8] text-[#4A4A4A]">
                {post.lookingAhead.body}
              </p>
            </div>

            {/* Tags */}
            <div className="mt-9 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#E0D5C4] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[var(--forest)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Share */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#E8DFD0] pt-6">
              <span className="text-[13px] font-semibold text-[var(--forest)]">
                Share This Article:
              </span>
              <div className="flex items-center gap-2">
                {shareLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E0D5C4] bg-white text-[var(--forest)] transition-colors hover:border-[#D97706] hover:text-[#D97706]"
                  >
                    <SocialIcon name={s.name} className="h-3.5 w-3.5" />
                  </a>
                ))}
                <a
                  href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(sharePath)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E0D5C4] bg-white text-[var(--forest)] transition-colors hover:border-[#D97706] hover:text-[#D97706]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M12.04 2c-5.5 0-9.96 4.45-9.96 9.93 0 1.75.46 3.45 1.34 4.95L2 22l5.27-1.38a9.95 9.95 0 0 0 4.77 1.21h.01c5.5 0 9.96-4.45 9.96-9.93S17.54 2 12.04 2Zm5.8 14.13c-.24.68-1.42 1.25-1.96 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.97-4.4-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.77-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.32.02.51-.1.2-.14.32-.29.49-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.16.29.73 1.2 1.56 1.94 1.08.96 1.98 1.26 2.26 1.4.28.14.44.12.61-.07.16-.2.7-.81.89-1.09.18-.28.37-.23.63-.14.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
          </div>

          {/* Sidebar — same top line as feature image */}
          <aside className="space-y-4 self-start lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-[0_6px_18px_rgba(0,51,43,0.05)]">
              <label className="relative block p-3">
                <UtilityIcon
                  name="search"
                  className="pointer-events-none absolute left-5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--muted)]"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const q = query.trim();
                      window.location.href = q
                        ? `/blog?q=${encodeURIComponent(q)}`
                        : "/blog";
                    }
                  }}
                  placeholder="Search blogs..."
                  className="w-full rounded-lg border border-[var(--border)] bg-[#f7f4ee] py-2 pl-9 pr-3 text-[12.5px] outline-none ring-[var(--forest)] focus:bg-white focus:ring-2"
                />
              </label>
            </div>

            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-[0_6px_18px_rgba(0,51,43,0.05)]">
              <div className="border-b border-[var(--border)] px-3 py-2.5">
                <h3 className="display text-[1rem] font-bold text-[var(--forest)]">
                  Categories
                </h3>
              </div>
              <nav className="flex flex-col" aria-label="Blog categories">
                {BLOG_CATEGORIES.map((cat, index) => {
                  const selected = cat.id === post.category;
                  const count = counts[cat.id];
                  return (
                    <Link
                      key={cat.id}
                      href={
                        cat.id === "all" ? "/blog" : `/blog?category=${cat.id}`
                      }
                      className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-[12px] font-semibold transition-colors ${
                        index < BLOG_CATEGORIES.length - 1
                          ? "border-b border-[var(--border)]"
                          : ""
                      } ${
                        selected
                          ? "bg-[#F8EBD7] text-[#D97706]"
                          : "text-[var(--charcoal)] hover:bg-[var(--ivory)]"
                      }`}
                    >
                      <UtilityIcon
                        name={cat.icon}
                        className={`h-3.5 w-3.5 shrink-0 ${
                          selected ? "text-[#D97706]" : "text-[var(--muted)]"
                        }`}
                      />
                      <span className="min-w-0 flex-1 leading-tight">
                        {cat.label}
                      </span>
                      <span
                        className={`text-[11px] ${
                          selected ? "text-[#D97706]" : "text-[var(--muted)]"
                        }`}
                      >
                        {count}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white p-3.5 shadow-[0_6px_18px_rgba(0,51,43,0.05)]">
              <h3 className="display text-[1rem] font-bold text-[var(--forest)]">
                Recent Posts
              </h3>
              <ul className="mt-3 space-y-3">
                {recent.map((item) => (
                  <li key={item.id}>
                    <Link href={`/blog/${item.slug}`} className="group flex gap-2.5">
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#e8e2d6]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12.5px] font-semibold leading-snug text-[var(--forest)] group-hover:text-[#D97706]">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-[11px] text-[var(--muted)]">
                          {item.date}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white p-3.5 shadow-[0_6px_18px_rgba(0,51,43,0.05)]">
              <h3 className="display text-[1rem] font-bold text-[var(--forest)]">
                Related Articles
              </h3>
              <ul className="mt-3 space-y-3">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link href={`/blog/${item.slug}`} className="group flex gap-2.5">
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#e8e2d6]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12.5px] font-semibold leading-snug text-[var(--forest)] group-hover:text-[#D97706]">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-[11px] text-[var(--muted)]">
                          {item.date}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
        </section>
      </div>

      {/* Newsletter */}
      <section className="relative overflow-hidden bg-[var(--forest)] py-10 text-white sm:py-12">
        <LeafCorner corner="bl" className="opacity-30" />
        <LeafCorner corner="br" className="opacity-25" />
        <div className="page-shell relative z-[1] flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8C98A]">
              Stay Updated
            </p>
            <h2 className="display mt-1.5 text-[clamp(1.4rem,2.2vw,1.9rem)] font-bold">
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
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#D97706] px-5 py-2.5 text-[12.5px] font-bold uppercase tracking-wide text-white hover:bg-[#c46a08]"
            >
              Subscribe
              <UtilityIcon name="arrow" className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
