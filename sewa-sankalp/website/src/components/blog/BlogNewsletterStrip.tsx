"use client";

import { LeafCorner } from "@/components/home/shared";
import { UtilityIcon } from "@/components/site/icons";

/** Blog listing + detail newsletter CTA — matches design reference. */
export function BlogNewsletterStrip() {
  return (
    <section className="bg-white pb-6 sm:pb-8">
      <div className="page-shell">
        <div className="relative overflow-hidden rounded-[1.35rem] bg-[var(--forest)] px-5 py-7 text-white shadow-[0_14px_40px_rgba(0,51,43,0.18)] sm:rounded-[1.5rem] sm:px-8 sm:py-8 lg:px-10 lg:py-9">
          <LeafCorner corner="bl" className="opacity-35" />
          <LeafCorner corner="br" className="opacity-30" />

          <div className="relative z-[1] grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-8 xl:gap-10">
            <div className="min-w-0">
              <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D97706] sm:text-[11px]">
                Stay Updated
              </p>
              <h2 className="display mt-2 text-[clamp(1.45rem,2.4vw,2rem)] font-bold leading-[1.15] text-white">
                <span className="block">Get the Latest Stories</span>
                <span className="block text-[#D97706]">&amp; Updates</span>
              </h2>
            </div>

            <p className="max-w-md text-[13px] leading-[1.7] text-white/80 sm:text-[13.5px] lg:max-w-none">
              Subscribe to our newsletter and never miss an update on our
              initiatives, events and success stories.
            </p>

            <form
              className="flex w-full min-w-0 overflow-hidden rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                aria-label="Email address"
                className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-[13px] text-[var(--charcoal)] outline-none placeholder:text-[#9CA3AF] sm:px-5 sm:py-3.5 sm:text-[13.5px]"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 bg-[#D97706] px-4 py-3 text-[12.5px] font-bold text-white transition-colors hover:bg-[#c46a08] sm:px-5 sm:py-3.5 sm:text-[13px]"
              >
                Subscribe
                <UtilityIcon name="arrow" className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
