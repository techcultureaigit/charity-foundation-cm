"use client";

import { useEffect, useState } from "react";
import type { ImpactHighlight, MediaItem, PageContent } from "@/lib/types";
import { AccentText, CornerSweep, LeafCorner } from "./shared";

const HERO_SLIDE_MS = 5000;
const HERO_SLIDES = [
  {
    src: "/uploads/hero-home.jpg",
    alt: "Sewa Sankalp Foundation community work",
    position: "object-[82%_28%] sm:object-[65%_28%] lg:object-[58%_28%]",
  },
  {
    src: "/uploads/hero-home-2.png",
    alt: "Women planting saplings in the mountains",
    position: "object-[70%_40%] sm:object-[62%_38%] lg:object-[55%_35%]",
  },
] as const;

/**
 * Soft beige leaf watermark — faint floral cluster like the PDF / reference.
 * No solid olive scoop; just translucent tan leaves on cream.
 */
function HeroCornerFlowers() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 z-[8] h-44 w-44 text-[#E8D6B0] sm:h-56 sm:w-56 lg:h-64 lg:w-64"
    >
      {/* Soft green scoop + tan outline — light border under the leaves */}
      <svg
        viewBox="0 0 360 110"
        className="absolute inset-x-0 bottom-0 h-16 w-[120%] max-w-none sm:h-[4.75rem]"
        preserveAspectRatio="none"
      >
        <path
          d="M0 110V48C42 52 100 78 158 90c48 10 105 12 202 2V110H0Z"
          fill="var(--forest)"
          opacity="0.92"
        />
        <path
          d="M0 52C48 56 108 82 166 93c46 9 100 10 194 0"
          fill="none"
          stroke="#D4C4A0"
          strokeOpacity="0.85"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>

      <svg
        viewBox="0 0 60 100"
        className="absolute bottom-10 left-2 h-28 w-16 -rotate-[28deg] opacity-70 sm:bottom-12 sm:h-36 sm:w-20"
      >
        <path
          d="M30 2C8 24 4 54 30 98 56 54 52 24 30 2Z"
          fill="currentColor"
        />
        <path
          d="M30 12v82M30 40 18 28M30 56 14 42M30 40l12-12M30 56l16-14"
          stroke="#fffbf2"
          strokeOpacity="0.4"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <svg
        viewBox="0 0 60 100"
        className="absolute bottom-14 left-14 h-24 w-14 rotate-[14deg] opacity-55 sm:bottom-16 sm:left-[4.5rem] sm:h-32 sm:w-18"
      >
        <path
          d="M30 2C8 24 4 54 30 98 56 54 52 24 30 2Z"
          fill="currentColor"
        />
      </svg>
      <svg
        viewBox="0 0 60 100"
        className="absolute bottom-6 left-0 h-20 w-12 -rotate-[62deg] opacity-50 sm:bottom-8 sm:h-28 sm:w-16"
      >
        <path
          d="M30 2C8 24 4 54 30 98 56 54 52 24 30 2Z"
          fill="currentColor"
        />
      </svg>
      <svg
        viewBox="0 0 60 100"
        className="absolute bottom-12 left-24 hidden h-20 w-12 rotate-[48deg] opacity-45 sm:block sm:left-28"
      >
        <path
          d="M30 2C8 24 4 54 30 98 56 54 52 24 30 2Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

/** Clean white-on-orange icons matching the PDF stats bar. */
function StatIcon({ index }: { index: number }) {
  const cls = "h-[22px] w-[22px]";
  if (index === 0) {
    /* 3 people */
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden>
        <circle cx="12" cy="7" r="2.5" />
        <circle cx="6" cy="8.2" r="2" />
        <circle cx="18" cy="8.2" r="2" />
        <path d="M12 11.2c-2.6 0-4.8 1.7-5.2 4.6-.1.6.4 1.1 1 1.1h8.4c.6 0 1.1-.5 1-1.1-.4-2.9-2.6-4.6-5.2-4.6Z" />
        <path d="M5.2 12.4c-1.7.3-3 1.5-3.3 3.4-.1.5.3.9.8.9h2.2c.15-1.6.9-3 2.2-3.9-.6-.2-1.2-.3-1.9-.4Z" />
        <path d="M18.8 12.4c.7.1 1.3.2 1.9.4 1.3.9 2 2.3 2.2 3.9h2.2c.5 0 .9-.4.8-.9-.3-1.9-1.6-3.1-3.3-3.4Z" />
      </svg>
    );
  }
  if (index === 1) {
    /* hand holding heart */
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden>
        <path d="M12 3.8c-1.2-1.1-2.6-1-3.4-.1-.8-.9-2.2-1-3.4.1-1.5 1.3-1.4 3.3.2 4.7L12 14.2l6.6-5.7c1.6-1.4 1.7-3.4.2-4.7-1.2-1.1-2.6-1-3.4-.1-.8-.9-2.2-1-3.4.1Z" />
        <path d="M3.5 14.2h2.4l2.5-1.1c.6-.3 1.3.1 1.5.7.2.5-.2 1.1-.7 1.3l-1.7.7h2.8l3.8-1.7c.6-.3 1.3 0 1.5.6.2.5 0 1.1-.5 1.3l-3.7 2.3c-.4.2-.8.3-1.2.2l-4.6-.9H3.5c-.5 0-.9-.4-.9-.9v-1.6c0-.5.4-.9.9-.9Z" />
      </svg>
    );
  }
  /* single volunteer */
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden>
      <circle cx="12" cy="7" r="3" />
      <path d="M6.5 20c.5-3.8 2.8-5.8 5.5-5.8s5 2 5.5 5.8c.05.5-.35.9-.85.9H7.35c-.5 0-.9-.4-.85-.9Z" />
    </svg>
  );
}

function StatsBar({ stats }: { stats: ImpactHighlight[] }) {
  return (
    <div className="mx-auto w-full max-w-[840px]">
      <div className="relative overflow-hidden rounded-[1.25rem] bg-white px-2.5 py-3 shadow-[0_18px_44px_rgba(0,51,43,0.16)] sm:rounded-[1.75rem] sm:px-5 sm:py-5">
        <svg
          aria-hidden
          viewBox="0 0 90 90"
          className="pointer-events-none absolute -left-1 top-1/2 hidden h-16 w-16 -translate-y-1/2 text-[#e8d6b0] opacity-75 sm:block"
        >
          <path d="M16 78C22 40 44 16 78 8c-8 36-26 56-62 70Z" fill="currentColor" />
        </svg>
        <svg
          aria-hidden
          viewBox="0 0 90 90"
          className="pointer-events-none absolute -right-1 top-1/2 hidden h-16 w-16 -translate-y-1/2 -scale-x-100 text-[#e8d6b0] opacity-75 sm:block"
        >
          <path d="M16 78C22 40 44 16 78 8c-8 36-26 56-62 70Z" fill="currentColor" />
        </svg>

        <div className="relative grid grid-cols-3 gap-1 sm:gap-0">
          {stats.map((item, index) => (
            <div
              key={item.id}
              className="relative flex flex-col items-center justify-center gap-1.5 px-1 py-1 text-center sm:flex-row sm:gap-3 sm:px-3 sm:text-left"
            >
              {index > 0 ? (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 hidden h-11 w-px -translate-y-1/2 bg-[#ddd8ce] sm:block"
                />
              ) : null}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--orange)] text-white shadow-[0_6px_14px_rgba(230,138,0,0.3)] sm:h-12 sm:w-12">
                <StatIcon index={index} />
              </span>
              <span className="min-w-0 leading-none">
                <span className="nav-bar block text-[1.15rem] font-extrabold tracking-tight text-[var(--orange)] sm:text-[1.85rem] md:text-[2.05rem]">
                  {item.value}
                </span>
                <span className="nav-bar mt-0.5 block text-[8.5px] font-bold uppercase tracking-[0.06em] text-[#3a3a3a] sm:mt-1 sm:text-[11px] sm:tracking-[0.1em]">
                  {item.label}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Soft cream wave under the hero (PDF bottom edge). */
function HeroWave() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] leading-[0]">
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-12 w-full sm:h-14 lg:h-16"
        aria-hidden
      >
        <path
          d="M0 40C240 80 480 90 720 55s480-50 720-20v55H0Z"
          fill="#f3e6c8"
          opacity="0.55"
        />
        <path
          d="M0 55C260 90 520 95 780 60s420-40 660-15v50H0Z"
          fill="var(--cream)"
        />
      </svg>
    </div>
  );
}

export function HeroSection({
  page,
  impact,
  image,
}: {
  page: PageContent;
  impact: ImpactHighlight[];
  image?: MediaItem;
}) {
  const stats = impact.slice(0, 3);

  return (
    <section className="relative bg-[var(--ivory)]">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <HeroPhoto image={image} />
        </div>

        {/* Left blur under copy — soft frosted fade into the photo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[58%] backdrop-blur-[8px] sm:w-[48%] lg:w-[44%] [mask-image:linear-gradient(to_right,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,black_55%,transparent_100%)]"
        />
        {/* Solid ivory on far left + soft fade so text stays sharp */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[38%] bg-[var(--ivory)] sm:w-[32%] lg:w-[28%] [mask-image:linear-gradient(to_right,black_72%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,black_72%,transparent_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[var(--ivory)] from-[0%] via-[var(--ivory)]/92 via-[38%] to-transparent to-[68%] sm:via-[32%] sm:to-[58%] lg:via-[28%] lg:to-[54%]"
        />

        <HeroCornerFlowers />
        <CornerSweep side="right" />
        <LeafCorner corner="br" className="opacity-55" />
        <HeroWave />

        <div className="page-shell relative z-10 flex min-h-[420px] flex-col pt-7 sm:min-h-[500px] sm:pt-10 lg:min-h-[580px] lg:pt-12">
          <div className="max-w-[32rem] flex-1 pb-40 pt-1 sm:pb-40 sm:pt-2 lg:pb-44">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)] sm:text-[11px] sm:tracking-[0.28em] md:text-xs">
              Sewa Sankalp Foundation
            </p>
            <h1 className="display mt-2.5 text-[clamp(2.05rem,8vw,4.6rem)] font-bold leading-[1.02] text-[var(--forest)] sm:mt-3 sm:leading-[0.98]">
              <AccentText
                text={page.headline}
                accent={page.heroAccentWords}
                accentClass="text-[var(--orange)]"
                breakBeforeAccent
              />
            </h1>
            <svg
              viewBox="0 0 260 18"
              className="mt-0.5 h-3.5 w-44 text-[var(--orange)] sm:w-56"
              aria-hidden
            >
              <path
                d="M2 12C50 4 120 2 258 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <p className="mt-4 max-w-[28rem] text-[14px] leading-[1.7] text-[var(--forest)]/85 sm:text-[14.5px]">
              {page.body}
            </p>
          </div>

          {/* Floating stats — sits on the hero bottom like the PDF */}
          {stats.length > 0 ? (
            <div className="absolute inset-x-0 bottom-5 z-20 px-[var(--page-gutter)] sm:bottom-6 lg:bottom-7">
              <div className="mx-auto w-full max-w-[var(--page-max)]">
                <StatsBar stats={stats} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function HeroPhoto({ image: _image }: { image?: MediaItem }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, HERO_SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {HERO_SLIDES.map((slide, i) => {
        const active = i === index;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${slide.position} ${
              active ? "z-[1] opacity-100" : "z-0 opacity-0"
            }`}
          />
        );
      })}
    </div>
  );
}
