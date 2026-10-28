import Link from "next/link";
import {
  AccentText,
  LeafCorner,
  LeafShape,
} from "@/components/home/shared";
import { UtilityIcon } from "@/components/site/icons";
import type { MediaItem, PageContent } from "@/lib/types";

const pillars = [
  {
    title: "Our Mission",
    text: "To serve and support poor, helpless, and deprived families through empowerment, education, health, and social well-being.",
    icon: "heart" as const,
  },
  {
    title: "Our Vision",
    text: "A balanced and inclusive society where every individual can live with dignity and become self-reliant.",
    icon: "star" as const,
  },
  {
    title: "Our Values",
    text: "Service, cooperation, empowerment, dignity, and self-reliance guide every programme we run.",
    icon: "people" as const,
  },
];

const stats = [
  { icon: "star" as const, value: "500+", label: "Campaigns" },
  { icon: "people" as const, value: "1,000+", label: "People Helped" },
  { icon: "user" as const, value: "50+", label: "Volunteers" },
  { icon: "heart" as const, value: "100+", label: "Communities Reached" },
];

const journey = [
  {
    year: "2020",
    icon: "calendar" as const,
    text: "Sewa Sankalp Foundation began with a simple resolve — serve families who need support the most.",
  },
  {
    year: "2021",
    icon: "people" as const,
    text: "Expanded community outreach across Dehradun with education kits and health awareness drives.",
  },
  {
    year: "2022",
    icon: "tree" as const,
    text: "Launched environment and plantation programmes alongside women empowerment initiatives.",
  },
  {
    year: "2023",
    icon: "book" as const,
    text: "Strengthened child development and learning support for first-generation learners.",
  },
  {
    year: "2024",
    icon: "heart" as const,
    text: "Grew into a wider movement of volunteers, partners, and communities working together.",
  },
];

/** Hand-drawn orange spiral — matches About mock flourish. */
function OrangeSpiral({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 64"
      className={className}
      fill="none"
    >
      <path
        d="M32 48c-10 0-18-7-18-16s8-16 18-16 16 6 16 14-6 12-12 12-10-4-10-9 3-8 7-8 6 2 6 5"
        stroke="#D68C23"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M42 22c4-6 10-9 16-8"
        stroke="#D68C23"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M52 12l6 2-3 6"
        stroke="#D68C23"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Hero photo — flush top-right corner, soft concave left wave (About mock).
 */
function HeroPhotoFrame({
  src,
  alt,
  clipId,
}: {
  src: string;
  alt: string;
  clipId: string;
}) {
  return (
    <div className="relative h-full w-full">
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            {/* Sharp top-right · soft wave on left · round bottoms */}
            <path d="M0.2,0 C0.08,0.1 0.0,0.22 0.04,0.38 C0.1,0.58 0.0,0.72 0.08,0.88 C0.14,0.96 0.24,1 0.36,1 L0.9,1 Q1,1 1,0.88 L1,0 Z" />
          </clipPath>
        </defs>
      </svg>
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ clipPath: `url(#${clipId})` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-[62%_28%]"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-2 right-3 z-[1] h-24 w-20 text-[#6F9B7A]/90 sm:bottom-3 sm:right-5 sm:h-32 sm:w-28"
      >
        <LeafShape className="absolute bottom-0 right-0 h-22 w-14 rotate-[16deg] sm:h-28 sm:w-16" />
        <LeafShape className="absolute bottom-5 right-9 h-14 w-9 -rotate-[30deg] opacity-80 sm:bottom-7 sm:right-11 sm:h-18 sm:w-11" />
      </div>
    </div>
  );
}

export function AboutPageView({
  page,
  photo,
}: {
  page: PageContent;
  photo?: MediaItem;
}) {
  const whoImage = photo?.url || "/uploads/hero-home-kids.jpg";
  const whoAlt = photo?.alt || "Children supported by Sewa Sankalp Foundation";

  return (
    <div className="bg-[#FBF6EE]">
      {/* Hero — same compact height as Campaigns (240 / 230 / 260) */}
      <section className="relative w-full overflow-hidden bg-[#FDF8EE] leading-none">
        <LeafCorner corner="tl" className="opacity-80" tone="forest" />
        <LeafCorner corner="bl" className="opacity-50" tone="forest" />

        {/* Wave photo — fills hero height, flush right */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[58%] sm:w-[54%] lg:w-[52%]">
          <HeroPhotoFrame
            src="/uploads/about-hero-kids.jpg"
            alt="Children smiling — hope for a brighter tomorrow"
            clipId="about-hero-wave"
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#FDF8EE] from-[0%] via-[#FDF8EE] via-[42%] to-transparent to-[72%] sm:via-[38%] sm:to-[65%] lg:via-[34%] lg:to-[60%]"
        />

        <div className="relative z-[3] flex h-[240px] items-start pt-4 sm:h-[230px] sm:pt-5 lg:h-[260px] lg:pt-7">
          <div className="page-shell flex w-full justify-start">
            <div className="w-full max-w-[36rem]">
              <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
                About Sewa Sankalp Foundation
              </p>
              <h1 className="display mt-1.5 text-[clamp(1.55rem,7vw,3rem)] font-bold leading-[1.08] text-[var(--forest)]">
                <AccentText
                  text="People. Purpose. A Brighter Tomorrow."
                  accent="A Brighter Tomorrow."
                  accentClass="text-[#D68C23]"
                  breakBeforeAccent
                />
              </h1>
              <div className="relative mt-2 max-w-[30rem] sm:mt-2.5">
                <p className="line-clamp-3 text-[12px] leading-[1.65] text-[#4A4A4A] sm:line-clamp-none sm:text-[13.5px] sm:leading-[1.7]">
                  Sewa Sankalp Foundation is a non-profit organization dedicated
                  to creating a more equitable, healthier and sustainable
                  society through education, healthcare, environment and
                  community support.
                </p>
                <OrangeSpiral className="pointer-events-none absolute -right-1 top-0 hidden h-10 w-10 translate-x-full opacity-90 sm:block lg:-right-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are — same card size as Campaigns Featured (lg:min-h-[400px]) */}
      <section className="relative bg-white pt-5 pb-5 sm:pt-6 sm:pb-6 lg:pb-7">
        <div className="page-shell">
        <div className="overflow-hidden rounded-[1.5rem] border border-[#EFE6D8] bg-white shadow-[0_14px_40px_rgba(0,51,43,0.06)] lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:min-h-[400px]">
          <div className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={whoImage}
              alt={whoAlt}
              className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--forest)] via-[var(--forest)]/85 to-transparent px-5 pb-5 pt-14 sm:px-6 sm:pb-6">
              <p className="display text-[1.1rem] font-semibold italic leading-snug text-white sm:text-[1.25rem]">
                “Together we can create a brighter, stronger and more inclusive
                tomorrow.”
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-center px-4 py-7 sm:px-9 sm:py-10 lg:px-10 lg:py-11">
            <span className="absolute -top-5 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#D97706] text-white shadow-[0_8px_22px_rgba(217,119,6,0.35)] sm:-top-6 sm:right-6 sm:h-14 sm:w-14 lg:top-6 lg:right-6">
              <UtilityIcon name="heart" className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
              Who We Are
            </p>
            <h2 className="display mt-2 text-[clamp(1.6rem,2.5vw,2.15rem)] font-bold leading-[1.18] text-[var(--forest)]">
              <AccentText
                text="About Sewa Sankalp Foundation."
                accent="Sewa Sankalp Foundation."
                accentClass="text-[#D68C23]"
              />
            </h2>
            <p className="mt-3.5 max-w-lg text-[13.5px] leading-[1.7] text-[#4A4A4A] sm:text-[14px]">
              Sewa Sankalp Foundation is a non-governmental trust dedicated to
              the upliftment and service of the weaker sections of society. We
              work with poor, helpless, and deprived families — especially women
              and children — so every person can live with dignity.
            </p>
            <p className="mt-3 max-w-lg text-[13.5px] leading-[1.7] text-[#4A4A4A] sm:text-[14px]">
              Inspired by a deep commitment to public service, our programmes
              focus on education, health, empowerment, and social welfare.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Mission / Vision / Values cards */}
      <section className="relative bg-white pt-0 pb-10 sm:pb-12 lg:pb-14">
        <div className="page-shell relative">
          <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
            {pillars.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-[1.25rem] border border-[#EFE6D8] bg-white px-5 py-5 shadow-[0_8px_28px_rgba(0,51,43,0.06)] sm:px-5 sm:py-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3E0C8] text-[#D97706] sm:h-14 sm:w-14">
                  <UtilityIcon name={item.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <div className="min-w-0 text-left">
                  <h3 className="text-[15px] font-bold leading-snug text-[var(--forest)] sm:text-[15.5px]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-[1.65] text-[#6B6B6B]">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="relative overflow-hidden bg-[var(--forest)] py-9 text-white sm:py-11">
        <div className="page-shell grid items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-10">
          <h2 className="display max-w-sm text-[clamp(1.55rem,2.4vw,2.05rem)] font-bold leading-tight !text-white">
            Creating Lasting Change in Communities
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-white/15">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-2 text-center sm:px-4"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D97706] text-white shadow-[0_4px_12px_rgba(217,119,6,0.28)]">
                  <UtilityIcon name={stat.icon} className="h-5 w-5" />
                </span>
                <p className="mt-3 text-[1.45rem] font-bold leading-none text-[#F0A84A] sm:text-[1.65rem]">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-white/75">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="relative overflow-hidden bg-white pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14">
        <LeafCorner corner="bl" className="opacity-50" />
        <div className="page-shell relative z-[1] grid items-start gap-8 sm:gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_18px_44px_rgba(0,51,43,0.1)] sm:rounded-[2rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/uploads/event-01-planting.jpg"
                alt="Volunteers planting trees with the community"
                className="aspect-[5/4] w-full object-cover object-center"
              />
            </div>
            <span className="absolute -bottom-3 -right-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#D97706] text-white shadow-[0_8px_22px_rgba(217,119,6,0.35)] sm:-bottom-4 sm:right-4 sm:h-16 sm:w-16">
              <UtilityIcon name="tree" className="h-6 w-6 sm:h-7 sm:w-7" />
            </span>
          </div>

          <div>
            <p className="nav-bar text-[11px] font-bold uppercase tracking-[0.22em] text-[#D68C23]">
              Our Journey
            </p>
            <h2 className="display mt-2.5 text-[clamp(1.65rem,2.7vw,2.35rem)] font-bold leading-[1.18] text-[var(--forest)]">
              <AccentText
                text="From a Small Step to a Bigger Movement."
                accent="Bigger Movement."
                accentClass="text-[#D68C23]"
              />
            </h2>
            <p className="mt-3.5 max-w-lg text-[14px] leading-[1.7] text-[#4A4A4A]">
              What began as a quiet commitment to serve has grown into a
              collective movement — powered by volunteers, partners, and
              communities who believe every family deserves dignity and
              opportunity.
            </p>

            <ol className="relative mt-7 space-y-0">
              {journey.map((item, index) => (
                <li key={item.year} className="relative flex gap-3.5 pb-6 last:pb-0">
                  {index < journey.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute left-[1.35rem] top-11 bottom-0 w-px bg-[#EFE6D8]"
                    />
                  ) : null}
                  <span className="relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3E0C8] text-[#D97706]">
                    <UtilityIcon name={item.icon} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 pt-1">
                    <p className="text-[13px] font-bold text-[#D68C23]">
                      {item.year}
                    </p>
                    <p className="mt-1 text-[13px] leading-[1.65] text-[#6B6B6B]">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Bottom CTA — Education pattern */}
      <section className="page-shell relative pb-14 sm:pb-16 lg:pb-[4.5rem]">
        <div className="overflow-hidden rounded-[1.5rem] bg-[var(--forest)] text-white shadow-[0_20px_48px_rgba(0,51,43,0.22)] lg:flex lg:min-h-[210px] lg:items-stretch">
          <div className="relative aspect-[16/10] shrink-0 sm:aspect-[2/1] lg:aspect-auto lg:w-[34%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uploads/hero-home-plant.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-5 px-6 py-8 sm:px-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-12">
            <div className="max-w-lg">
              <h2 className="display text-[clamp(1.45rem,2.3vw,2rem)] font-bold leading-tight !text-white">
                Be a Part of Our Journey
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-white/75">
                Volunteer, support, or partner with us — and help create lasting
                change for families, women, and children.
              </p>
            </div>
            <Link
              href="/get-involved"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#D97706] px-6 py-3.5 text-[13px] font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_rgba(217,119,6,0.35)] transition-colors hover:bg-[#c46a08]"
            >
              Get Involved
              <UtilityIcon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
