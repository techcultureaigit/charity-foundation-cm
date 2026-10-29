import { Fragment } from "react";
import Link from "next/link";
import { AccentText, LeafCorner } from "@/components/home/shared";
import { PageBannerHero } from "@/components/site/PageBannerHero";
import { UtilityIcon } from "@/components/site/icons";
import type { PageContent } from "@/lib/types";

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
    raised: "₹1,85,000",
    target: "₹2,50,000",
    pct: 74,
  },
  {
    title: "Girl Child Scholarship",
    text: "Annual scholarships keeping girls in secondary school across Dehradun.",
    image: "/uploads/education-mid.jpg",
    raised: "₹3,20,000",
    target: "₹5,00,000",
    pct: 64,
  },
  {
    title: "Digital Learning Lab",
    text: "Tablets and after-school tutoring for first-generation learners.",
    image: "/uploads/cause-02-education.jpg",
    raised: "₹95,000",
    target: "₹2,00,000",
    pct: 48,
  },
];

function ImpactArrow() {
  return (
    <span
      aria-hidden
      className="hidden shrink-0 items-center self-center text-[#D97706] lg:flex"
    >
      <UtilityIcon name="arrow" className="h-5 w-5" />
    </span>
  );
}

export function EducationPageView({ page }: { page?: PageContent } = {}) {
  const heroEyebrow =
    page?.extras?.pageHeroEyebrow?.trim() || "Our Objectives";
  const heroLine1 =
    page?.extras?.heroLine1?.trim() || "Building a Better";
  const heroLine2Before =
    page?.extras?.heroLine2Before?.trim() || "Future Through ";
  const heroAccent =
    page?.extras?.heroAccent?.trim() ||
    page?.heroAccentWords?.trim() ||
    "Education";
  const heroBody =
    page?.extras?.heroBody?.trim() ||
    page?.body?.trim() ||
    "We believe education is the foundation of a stronger, more equitable society. Our initiatives focus on providing quality education, learning resources and opportunities for underprivileged children and youth.";

  return (
    <div className="bg-[#FBF6EE]">
      {/* Hero — same banner image/bg as Campaigns; keep Education copy */}
      <PageBannerHero contentClassName="w-full max-w-[40rem]">
        <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
          {heroEyebrow}
        </p>

        <h1 className="display mt-1.5 text-[clamp(1.45rem,5.5vw,2.65rem)] font-bold leading-[1.08] tracking-[-0.01em] text-[var(--forest)]">
          <span className="block">{heroLine1}</span>
          <span className="block max-sm:whitespace-normal sm:whitespace-nowrap">
            {heroLine2Before}
            <span className="text-[#D68C23]">{heroAccent}</span>
          </span>
        </h1>

        <p className="mt-2 max-w-[30rem] line-clamp-3 text-[12px] leading-[1.65] text-[#4A4A4A] sm:mt-2.5 sm:line-clamp-none sm:text-[13.5px] sm:leading-[1.7]">
          {heroBody}
        </p>
      </PageBannerHero>

      {/* Key Focus Areas */}
      <section className="relative bg-white pt-10 sm:pt-12">
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
      <section className="relative overflow-hidden bg-white pt-10 sm:pt-12">
        <div className="page-shell">
          <h2 className="display text-center text-[clamp(1.7rem,2.6vw,2.25rem)] font-bold text-[var(--forest)]">
            How We Create Impact
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-[13.5px] leading-relaxed text-[#6B6B6B]">
            A structured approach to ensure long-term and meaningful change.
          </p>

          <div className="mt-8 flex flex-col gap-8 sm:mt-9 lg:flex-row lg:items-start lg:justify-between lg:gap-5">
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
      <section className="relative overflow-hidden bg-white pt-8 pb-0 sm:pt-10 lg:pt-12">
        <LeafCorner corner="tl" className="opacity-70" />
        <div className="page-shell relative z-[1] grid items-center gap-8 pb-10 sm:gap-10 sm:pb-12 lg:grid-cols-[1.14fr_0.86fr] lg:gap-10 lg:pb-14">
          <div className="relative mx-auto w-full lg:mx-0">
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_18px_44px_rgba(0,51,43,0.1)] sm:rounded-[2rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/uploads/education-kids.png"
                alt="Children learning in classroom"
                className="aspect-[16/9] w-full object-cover object-[center_20%]"
              />
            </div>
            <span className="absolute -bottom-3 right-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#D97706] text-white shadow-[0_8px_22px_rgba(217,119,6,0.35)] sm:-bottom-4 sm:right-4 sm:h-16 sm:w-16">
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

        {/* Stats — lighter orange; short centered dividers between all items */}
        <div className="border-t border-[#F3E4D4] bg-[#FDF6EC]">
          <div className="page-shell grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="relative flex items-center justify-center gap-3.5 px-4 py-5 sm:py-6"
              >
                {index > 0 ? (
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-[#DCC9B0] lg:block"
                  />
                ) : null}
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#D97706] text-white shadow-[0_4px_12px_rgba(217,119,6,0.28)] sm:h-[4.25rem] sm:w-[4.25rem]">
                  <UtilityIcon
                    name={stat.icon}
                    className="h-7 w-7 sm:h-8 sm:w-8"
                  />
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
      <section className="relative bg-white pt-[10px]">
        <div className="page-shell relative">
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
                  <h3 className="text-[1.15rem] font-bold text-[var(--forest)]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-[#6B6B6B]">
                    {c.text}
                  </p>
                  <div className="mt-5">
                    <div className="relative mb-1 h-4">
                      <span
                        className="absolute top-0 -translate-x-1/2 text-[11px] font-bold leading-none text-[var(--forest)]"
                        style={{ left: `${c.pct}%` }}
                      >
                        {c.pct}%
                      </span>
                    </div>
                    <div className="h-6 overflow-hidden rounded-full bg-[#ebe4d8]">
                      <div
                        className="h-full rounded-full bg-[var(--forest)]"
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
                    <div className="mt-2.5 flex justify-between text-[12px]">
                      <span className="flex flex-col items-start">
                        <span className="font-semibold text-[var(--forest)]">
                          {c.raised}
                        </span>
                        <span className="mt-0.5 text-[#6B6B6B]">Raised</span>
                      </span>
                      <span className="flex flex-col items-end">
                        <span className="font-semibold text-[var(--forest)]">
                          {c.target}
                        </span>
                        <span className="mt-0.5 text-[#6B6B6B]">Target</span>
                      </span>
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
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative bg-white pb-14 pt-[10px] sm:pb-16 lg:pb-[4.5rem]">
        <div className="page-shell relative">
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
                <p className="nav-bar text-[11px] font-bold uppercase tracking-[0.2em] text-[#D97706]">
                  Be Part of the Change
                </p>
                <h2 className="display mt-2 text-[clamp(1.45rem,2.3vw,2rem)] font-bold leading-tight !text-white">
                  Support Education,
                  <br />
                  Empower Lives.
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-white/75">
                  Your contribution helps us provide quality education and
                  create brighter futures for children across communities.
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
        </div>
      </section>
    </div>
  );
}
