import { Fragment } from "react";
import Link from "next/link";
import { AccentText, LeafCorner, LeafShape } from "@/components/home/shared";
import { UtilityIcon } from "@/components/site/icons";

const focusAreas = [
  {
    icon: "book" as const,
    title: "Access to Education",
    text: "Supporting school enrollment and reducing dropout rates.",
  },
  {
    icon: "people" as const,
    title: "Learning Resources",
    text: "Providing books, digital tools and essential learning materials.",
  },
  {
    icon: "graduation" as const,
    title: "Skill Development",
    text: "Equipping children and youth with skills for a brighter future.",
  },
];

const impactSteps = [
  {
    n: "1",
    icon: "people" as const,
    title: "Identify Needs",
    text: "We work with communities to understand the real challenges in education.",
  },
  {
    n: "2",
    icon: "gear" as const,
    title: "Implement Programs",
    text: "We provide resources, support and guidance to schools and students.",
  },
  {
    n: "3",
    icon: "chart" as const,
    title: "Measure Impact",
    text: "We track progress and ensure sustainable, long-term benefits for children and communities.",
  },
];

const checklist = [
  "Support for underprivileged children",
  "School infrastructure and learning materials",
  "Focus on holistic development",
];

const stats = [
  { icon: "people" as const, value: "500+", label: "Children Supported" },
  { icon: "book" as const, value: "25+", label: "Learning Centers" },
  { icon: "user" as const, value: "100+", label: "Volunteers" },
  { icon: "heart" as const, value: "1,000+", label: "Families Impacted" },
];

const campaigns = [
  {
    title: "School Kit Drive 2026",
    text: "Bags, notebooks and stationery for children starting a new academic year.",
    image: "/uploads/event-02-education.jpg",
    raised: "?1,85,000",
    target: "?2,50,000",
    pct: 74,
  },
  {
    title: "Girl Child Scholarship",
    text: "Annual scholarships keeping girls in secondary school across Dehradun.",
    image: "/uploads/education-mid.jpg",
    raised: "?3,20,000",
    target: "?5,00,000",
    pct: 64,
  },
  {
    title: "Digital Learning Lab",
    text: "Tablets and after-school tutoring for first-generation learners.",
    image: "/uploads/cause-02-education.jpg",
    raised: "?95,000",
    target: "?2,00,000",
    pct: 48,
  },
];

/** Hand-drawn orange spiral doodle beside the hero copy. */
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
 * Hero photo — soft left wave; object-contain so the full photo shows
 * (no cover crop cutting faces / shoulders).
 */
function HeroPhotoFrame({
  src,
  alt,
  clipId = "education-hero-wave",
}: {
  src: string;
  alt: string;
  clipId?: string;
}) {
  return (
    <div className="relative h-full w-full">
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            {/* Gentle left curve — keeps more of the photo visible */}
            <path d="M0.06,0 C0.02,0.12 0.0,0.28 0.02,0.45 C0.05,0.62 0.0,0.78 0.05,0.92 C0.08,0.98 0.14,1 0.22,1 L1,1 L1,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        className="relative flex h-full min-h-[260px] w-full items-center justify-end overflow-hidden bg-[#FDF8EE] sm:min-h-[320px] lg:min-h-0"
        style={{ clipPath: `url(#${clipId})` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain object-right"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-2 right-3 z-[1] h-24 w-20 text-[#6F9B7A]/80 sm:bottom-3 sm:right-5 sm:h-32 sm:w-28"
      >
        <LeafShape className="absolute bottom-0 right-0 h-22 w-14 rotate-[16deg] sm:h-28 sm:w-16" />
        <LeafShape className="absolute bottom-5 right-9 h-14 w-9 -rotate-[30deg] opacity-75 sm:bottom-7 sm:right-11 sm:h-18 sm:w-11" />
      </div>
    </div>
  );
}

function ImpactArrow() {
  return (
    <span
      aria-hidden
      className="hidden shrink-0 items-center self-center text-[#D97706] sm:flex"
    >
      <UtilityIcon name="arrow" className="h-5 w-5" />
    </span>
  );
}

export function EducationPageView() {
  return (
    <div className="bg-[#FBF6EE]">
      {/* Hero — image flush top-right corner, no top gap */}
      <section className="relative overflow-hidden bg-[#FDF8EE]">
        <LeafCorner corner="tl" className="opacity-80" />
        <LeafCorner corner="bl" className="opacity-55" />

        <div className="relative z-[1] lg:min-h-[400px] xl:min-h-[460px]">
          {/*
            Same left inset as header logo via page-shell — content parallel with logo.
            Top-aligned under header (not vertically centered under the logo).
          */}
          <div className="page-shell relative pt-3.5 pb-5 sm:pt-4 sm:pb-7 lg:flex lg:min-h-[400px] lg:items-start lg:pt-4 lg:pb-9 xl:min-h-[460px] xl:pt-5">
            <div className="relative w-full max-w-xl lg:w-[40%] lg:max-w-none xl:w-[38%]">
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-[#6B6B6B]"
              >
                <Link
                  href="/"
                  className="transition-colors hover:text-[#D97706]"
                >
                  Home
                </Link>
                <span className="text-[#B0B0B0]">/</span>
                <span>Objective</span>
                <span className="text-[#B0B0B0]">/</span>
                <span className="font-semibold text-[#D68C23]">Education</span>
              </nav>

              <p className="nav-bar mt-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#D68C23]">
                Our Objectives
              </p>

              <h1 className="display mt-1.5 text-[clamp(1.55rem,6.5vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.01em] text-[var(--forest)]">
                Building a Better
                <br />
                Future Through
                <br />
                <span className="text-[#D68C23]">Education</span>
              </h1>

              <div className="relative mt-3 max-w-[34rem]">
                <p className="text-[13px] leading-[1.65] text-[#4A4A4A] sm:text-[14px] sm:leading-[1.7]">
                  We believe education is the foundation of a stronger, more
                  equitable society. Our initiatives focus on providing quality
                  education, learning resources and opportunities for
                  underprivileged children and youth.
                </p>
                <OrangeSpiral className="pointer-events-none absolute -right-1 top-1/2 hidden h-12 w-12 -translate-y-1/2 translate-x-full opacity-90 sm:block lg:-right-2 xl:-right-6" />
              </div>
            </div>

            {/* Mobile image (flows under copy) */}
            <div className="relative mt-5 aspect-[5/3.5] w-full lg:hidden">
              <HeroPhotoFrame
                src="/uploads/education-mid.jpg"
                alt="Student learning with teacher support in classroom"
                clipId="education-hero-wave-mobile"
              />
            </div>
          </div>

          {/* Desktop image — wide panel + contain so full photo is visible */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block xl:w-[60%]">
            <HeroPhotoFrame
              src="/uploads/education-mid.jpg"
              alt="Student learning with teacher support in classroom"
              clipId="education-hero-wave-desktop"
            />
          </div>
        </div>
      </section>

      {/* Key Focus Areas */}
      <section className="relative bg-white pt-7 pb-5 sm:pt-8 sm:pb-6 lg:pt-9 lg:pb-7">
        <div className="page-shell relative">
          <h2 className="display text-center text-[clamp(1.7rem,2.6vw,2.25rem)] font-bold text-[var(--forest)]">
            Key Focus Areas
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-[13.5px] leading-relaxed text-[#6B6B6B]">
            Our education initiatives are designed to create equal opportunities
            and unlock the potential of every child.
          </p>
          <div className="mt-7 grid gap-5 sm:grid-cols-3 sm:gap-6">
            {focusAreas.map((item) => (
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

      {/* How We Create Impact — icon left + text right, orange arrows between */}
      <section className="relative overflow-hidden bg-white pt-4 pb-12 sm:pt-5 sm:pb-14 lg:pt-6 lg:pb-16">
        <div className="page-shell">
          <h2 className="display text-center text-[clamp(1.7rem,2.6vw,2.25rem)] font-bold text-[var(--forest)]">
            How We Create Impact
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-[13.5px] leading-relaxed text-[#6B6B6B]">
            A structured approach to ensure long-term and meaningful change.
          </p>

          <div className="mt-8 flex flex-col gap-8 sm:mt-9 sm:flex-row sm:items-start sm:justify-between sm:gap-3 lg:gap-5">
            {impactSteps.map((step, i) => (
              <Fragment key={step.title}>
                <div className="flex flex-1 items-start gap-3.5">
                  <div className="relative mt-0.5 shrink-0">
                    <span className="absolute -left-1.5 -top-1.5 z-[1] flex h-6 w-6 items-center justify-center rounded-full bg-[#D97706] text-[11px] font-bold text-white shadow-sm">
                      {step.n}
                    </span>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F3E0C8] text-[#D97706]">
                      <UtilityIcon name={step.icon} className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="min-w-0 pt-1">
                    <h3 className="text-[15px] font-bold leading-snug text-[var(--forest)]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-[1.6] text-[#6B6B6B]">
                      {step.text}
                    </p>
                  </div>
                </div>
                {i < impactSteps.length - 1 ? <ImpactArrow /> : null}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA — education creates opportunities */}
      <section className="relative overflow-hidden bg-[#FDF8EE] pt-8 pb-0 sm:pt-10 lg:pt-12">
        <LeafCorner corner="tl" className="opacity-70" />
        <div className="page-shell relative z-[1] grid items-center gap-8 pb-10 sm:gap-10 sm:pb-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:pb-14">
          <div className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_18px_44px_rgba(0,51,43,0.1)] sm:rounded-[2rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/uploads/education-kids.png"
                alt="Children learning in classroom"
                className="aspect-[5/4] w-full object-cover object-[center_20%]"
              />
            </div>
            <span className="absolute -bottom-3 -right-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#D97706] text-white shadow-[0_8px_22px_rgba(217,119,6,0.35)] sm:-bottom-4 sm:right-4 sm:h-16 sm:w-16">
              <UtilityIcon name="book" className="h-6 w-6 sm:h-7 sm:w-7" />
            </span>
          </div>

          <div>
            <p className="nav-bar text-[11px] font-bold uppercase tracking-[0.22em] text-[#D68C23]">
              Education Creates Opportunities
            </p>
            <h2 className="display mt-2.5 text-[clamp(1.65rem,2.7vw,2.35rem)] font-bold leading-[1.18] text-[var(--forest)]">
              <AccentText
                text="Empowering Children for a Brighter Tomorrow"
                accent="Brighter Tomorrow"
                accentClass="text-[#D68C23]"
                breakBeforeAccent
              />
            </h2>
            <p className="mt-3.5 max-w-lg text-[14px] leading-[1.7] text-[#4A4A4A]">
              Through focused programmes and community partnership, we help
              every child access learning that builds confidence, skills and a
              path toward a better future.
            </p>
            <ul className="mt-5 space-y-3">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[14px] leading-snug"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--forest)] text-white">
                    <UtilityIcon name="check" className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[#2C2C2C]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats — icon left + number/label right, vertical dividers */}
        <div className="border-t border-[#E8DFD0] bg-[#F3EBD9]">
          <div className="page-shell grid grid-cols-1 divide-y divide-[#E0D5C4] sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-center gap-3.5 px-4 py-5 sm:py-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D97706] text-white shadow-[0_4px_12px_rgba(217,119,6,0.28)]">
                  <UtilityIcon name={stat.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0 text-left">
                  <p className="text-[1.55rem] font-bold leading-none text-[#D97706] sm:text-[1.7rem]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-[#6B6B6B]">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Campaigns */}
      <section className="page-shell relative py-12 sm:py-14 lg:py-16">
        <h2 className="display text-center text-[clamp(1.7rem,2.6vw,2.25rem)] font-bold text-[var(--forest)]">
          Related Campaigns
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-[13.5px] leading-relaxed text-[#6B6B6B]">
          Support our ongoing education campaigns and help us to create lasting
          change.
        </p>
        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
            <article
              key={c.title}
              className="overflow-hidden rounded-[1.35rem] bg-white shadow-[0_10px_32px_rgba(0,51,43,0.07)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#e8e2d6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-md bg-[#D97706] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  Education
                </span>
              </div>
              <div className="px-5 py-5">
                <h3 className="display text-[1.15rem] font-bold text-[var(--forest)]">
                  {c.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-[#6B6B6B]">
                  {c.text}
                </p>
                <div className="mt-5">
                  <div className="h-2 overflow-hidden rounded-full bg-[#ebe4d8]">
                    <div
                      className="h-full rounded-full bg-[var(--forest)]"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                  <div className="mt-2.5 flex justify-between text-[12px]">
                    <span className="font-semibold text-[var(--forest)]">
                      Raised {c.raised}
                    </span>
                    <span className="text-[#6B6B6B]">Target {c.target}</span>
                  </div>
                </div>
                <Link
                  href="/get-involved"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#D97706] bg-transparent px-4 py-2.5 text-[13px] font-semibold text-[#D97706] transition-colors hover:bg-[#D97706] hover:text-white"
                >
                  View Campaign
                  <UtilityIcon name="arrow" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="page-shell relative pb-14 sm:pb-16 lg:pb-[4.5rem]">
        <div className="overflow-hidden rounded-[1.5rem] bg-[var(--forest)] text-white shadow-[0_20px_48px_rgba(0,51,43,0.22)] lg:flex lg:min-h-[210px] lg:items-stretch">
          <div className="relative aspect-[16/10] shrink-0 sm:aspect-[2/1] lg:aspect-auto lg:w-[34%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uploads/education-cta.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-5 px-6 py-8 sm:px-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-12">
            <div className="max-w-lg">
              <h2 className="display text-[clamp(1.45rem,2.3vw,2rem)] font-bold leading-tight !text-white">
                Support Education, Empower Lives.
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-white/75">
                Your contribution helps a child stay in school and dream bigger.
              </p>
            </div>
            <Link
              href="/get-involved"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#D97706] px-6 py-3.5 text-[13px] font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_rgba(217,119,6,0.35)] transition-colors hover:bg-[#c46a08]"
            >
              Support This Objective
              <UtilityIcon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
