import Link from "next/link";
import { AccentText, LeafCorner } from "@/components/home/shared";
import { PageBannerHero } from "@/components/site/PageBannerHero";
import { UtilityIcon } from "@/components/site/icons";
import {
  parseJourneyItems,
  type JourneyItem,
} from "@/lib/content/aboutExtras";
import type { ImpactHighlight, MediaItem, PageContent } from "@/lib/types";

type MaterialIconName =
  | "target"
  | "visibility"
  | "diamond"
  | "groups"
  | "volunteer_activism"
  | "person"
  | "eco"
  | "calendar_month"
  | "spa"
  | "trending_up"
  | "star";

const FALLBACK_STAT_ICONS: MaterialIconName[] = [
  "groups",
  "volunteer_activism",
  "person",
  "eco",
];

/** Google Material Symbols — fonts.google.com/icons */
function GoogleIcon({
  name,
  className = "text-[26px]",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden>
      {name}
    </span>
  );
}

function emphasizeText(text: string, emphasis?: string) {
  if (!emphasis?.trim()) return text;
  const needle = emphasis.trim();
  const index = text.toLowerCase().indexOf(needle.toLowerCase());
  if (index < 0) return text;
  const before = text.slice(0, index);
  const match = text.slice(index, index + needle.length);
  const after = text.slice(index + needle.length);
  return (
    <>
      {before}
      <strong className="font-semibold text-[#4A4A4A]">{match}</strong>
      {after}
    </>
  );
}

const DEFAULT_WHO_WE_ARE = "/uploads/about-who-we-are.png";
const DEFAULT_ABOUT_BANNER = "/uploads/contact-hero.png";

export function AboutPageView({
  page,
  photo,
  impact = [],
}: {
  page: PageContent;
  photo?: MediaItem;
  impact?: ImpactHighlight[];
}) {
  const extras = page.extras ?? {};
  const bannerUrl = page.heroImageUrl?.trim() || DEFAULT_ABOUT_BANNER;
  // Designed composite asset (frame + leaves + quote). Do NOT fall back to
  // Media “about” — that photo is for the homepage About callout.
  const whoWeAreUrl = page.ctaImageUrl?.trim() || DEFAULT_WHO_WE_ARE;
  const journeyImage =
    extras.journeyImageUrl?.trim() || "/uploads/about-journey.png";
  const ctaBg = extras.ctaBgImageUrl?.trim() || "/uploads/about-cta-bg.png";
  const journey: JourneyItem[] = parseJourneyItems(extras.journeyItems);
  const whoBody1 =
    extras.whoBody1?.trim() ||
    "Sewa Sankalp Foundation is a non-governmental trust dedicated to the upliftment and service of the weaker sections of society. We work with poor, helpless, and deprived families — especially women and children — so every person can live with dignity.";
  const whoBody2 =
    extras.whoBody2?.trim() ||
    "Inspired by a deep commitment to public service, our programmes focus on education, health, empowerment, and social welfare — creating lasting opportunities for communities across Uttarakhand.";

  const pillars = [
    {
      title: extras.pillar1Title || "Our Mission",
      text: extras.pillar1Text || "",
      icon: "target" as const,
    },
    {
      title: extras.pillar2Title || "Our Vision",
      text: extras.pillar2Text || "",
      icon: "visibility" as const,
    },
    {
      title: extras.pillar3Title || "Our Values",
      text: extras.pillar3Text || "",
      icon: "diamond" as const,
    },
  ];

  const stats =
    impact.length > 0
      ? impact.slice(0, 4).map((item, index) => ({
          icon: FALLBACK_STAT_ICONS[index % FALLBACK_STAT_ICONS.length],
          value: item.value,
          label: item.label,
        }))
      : [
          { icon: "groups" as const, value: "500+", label: "Campaigns" },
          {
            icon: "volunteer_activism" as const,
            value: "1,000+",
            label: "People Helped",
          },
          { icon: "person" as const, value: "50+", label: "Volunteers" },
          { icon: "eco" as const, value: "100+", label: "Communities Reached" },
        ];

  return (
    <div className="bg-white">
      <PageBannerHero imageUrl={bannerUrl}>
        <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
          {extras.pageHeroEyebrow || "About Sewa Sankalp Foundation"}
        </p>
        <h1 className="display mt-1.5 text-[clamp(1.55rem,7vw,3rem)] font-bold leading-[1.08] text-[var(--forest)] sm:mt-2">
          <AccentText
            text={
              extras.pageHeroHeadline ||
              "People. Purpose. A Brighter Tomorrow."
            }
            accent={extras.pageHeroAccent || "A Brighter Tomorrow."}
            accentClass="text-[#D68C23]"
            breakBeforeAccent
          />
        </h1>
        <p className="mt-2 max-w-[30rem] line-clamp-3 text-[12px] leading-[1.65] text-[#4A4A4A] sm:mt-2.5 sm:line-clamp-none sm:text-[13.5px] sm:leading-[1.7]">
          {extras.pageHeroBody}
        </p>
      </PageBannerHero>

      <section className="relative overflow-hidden bg-white pt-[2px] pb-[2px]">
        <div className="page-shell relative z-[1] py-6 sm:py-7 lg:py-8">
          <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 xl:gap-16">
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={whoWeAreUrl}
                alt="Together we can create a brighter, stronger and more inclusive tomorrow."
                className="h-auto w-full"
              />
            </div>

            <div className="lg:pt-1">
              <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
                {extras.whoLabel || "Who We Are"}
              </p>
              <h2 className="display mt-2 text-[clamp(1.65rem,2.7vw,2.35rem)] font-bold leading-[1.15] text-[var(--forest)]">
                <AccentText
                  text={extras.whoTitle || "About Sewa Sankalp Foundation"}
                  accent={extras.whoAccent || "Foundation"}
                  accentClass="text-[#D68C23]"
                />
              </h2>
              <p className="mt-4 max-w-lg text-[13.5px] leading-[1.75] text-[#4A4A4A] sm:text-[14px]">
                {whoBody1}
              </p>
              <p className="mt-3.5 max-w-lg text-[13.5px] leading-[1.75] text-[#4A4A4A] sm:text-[14px]">
                {whoBody2}
              </p>
            </div>
          </div>

          <div className="mt-[2px] grid gap-8 rounded-2xl bg-white px-4 py-5 shadow-[0_8px_28px_rgba(0,51,43,0.1)] sm:mt-[2px] md:grid-cols-3 md:gap-0 md:px-2 md:py-5">
            {pillars.map((item, index) => (
              <div
                key={item.title}
                className={`flex items-start gap-3.5 text-left md:px-5 lg:gap-4 lg:px-6 ${
                  index > 0 ? "md:border-l md:border-[#E5E0D8]" : "md:pl-0"
                }`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF0E4] text-[#F08220] sm:h-[3.25rem] sm:w-[3.25rem]">
                  <GoogleIcon
                    name={item.icon}
                    className="text-[24px] text-[#F08220]"
                  />
                </span>
                <div className="min-w-0 pt-0.5">
                  <h3 className="display text-[1.12rem] font-bold leading-snug text-[var(--forest)] sm:text-[1.18rem]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] leading-[1.65] text-[#555555] sm:text-[13px]">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative my-[2px] overflow-hidden bg-[var(--forest)] py-6 text-white sm:py-7">
        <LeafCorner corner="tl" tone="gold" className="opacity-30" />
        <LeafCorner corner="br" tone="gold" className="opacity-25" />
        <div className="page-shell relative z-[1] grid items-center gap-7 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.4fr)] lg:gap-8">
          <div>
            <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D98A29] sm:text-[11px]">
              {extras.statsEyebrow || "Our Impact in Numbers"}
            </p>
            <h2 className="display mt-2 max-w-sm text-[clamp(1.4rem,2.3vw,1.95rem)] font-bold leading-tight !text-white">
              {extras.statsHeadline ||
                "Creating Lasting Change in Communities"}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0">
            {stats.map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className={`relative flex flex-col items-center px-2 text-center md:px-4 ${
                  index > 0
                    ? "md:before:absolute md:before:left-0 md:before:top-1/2 md:before:h-[55%] md:before:w-px md:before:-translate-y-1/2 md:before:bg-white/35"
                    : ""
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#D97706] shadow-[0_4px_14px_rgba(0,0,0,0.16)] sm:h-11 sm:w-11">
                  <GoogleIcon
                    name={stat.icon}
                    className="text-[22px] text-[#D97706]"
                  />
                </span>
                <p className="mt-2 text-[1.35rem] font-bold leading-none text-[#D97706] sm:text-[1.5rem]">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] font-medium leading-snug text-white/85 sm:text-[12px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white pt-[2px] pb-[2px]">
        <div className="page-shell relative z-[1] grid items-center gap-10 py-6 sm:py-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:py-8">
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={journeyImage}
              alt="Volunteers planting trees with the community"
              className="h-auto w-full"
            />
          </div>

          <div>
            <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
              {extras.journeyEyebrow || "Our Journey"}
            </p>
            <h2 className="display mt-2.5 text-[clamp(1.65rem,2.7vw,2.3rem)] font-bold leading-[1.18] text-[var(--forest)]">
              From a Small Step
              <br />
              to a{" "}
              <span className="text-[#D68C23]">
                {extras.journeyAccent || "Bigger Movement"}
              </span>
            </h2>
            <p className="mt-3.5 max-w-xl text-[13.5px] leading-[1.7] text-[#555555] sm:text-[14px]">
              {extras.journeyBody}
            </p>

            <ol className="relative mt-7 space-y-px">
              {journey.map((item) => (
                <li
                  key={`${item.year}-${item.text.slice(0, 24)}`}
                  className="relative flex items-center gap-3.5"
                >
                  <span className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF0E4] text-[#D68C23]">
                    <GoogleIcon
                      name={item.icon || "star"}
                      className="text-[18px] text-[#D68C23]"
                    />
                  </span>
                  <p className="min-w-0 text-[13px] leading-[1.6] text-[#555555] sm:text-[13.5px]">
                    <span className="font-bold text-[#D68C23]">{item.year}</span>
                    <span className="font-bold text-[#D68C23]"> — </span>
                    {emphasizeText(item.text, item.emphasis)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Bottom CTA — keep designed strip size/corners; only overlay copy+button */}
      <section className="relative mb-[7px] w-full overflow-hidden bg-transparent text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ctaBg}
          alt=""
          aria-hidden
          className="block h-auto min-h-[11rem] w-full max-w-none object-cover object-center sm:min-h-0"
        />
        <div className="page-shell absolute inset-0 z-[1] flex items-center">
          <div className="flex w-full flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-xl">
              <h2 className="display text-[clamp(1.5rem,2.5vw,2.1rem)] font-bold leading-[1.2] !text-white">
                <AccentText
                  text={extras.pageCtaHeadline || "Be a Part of Our Journey"}
                  accent={extras.pageCtaAccent || "Journey"}
                  accentClass="text-[#D98A29]"
                />
              </h2>
              <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-white/85 sm:mt-2 sm:text-[14px]">
                {extras.pageCtaBody}
              </p>
            </div>
            <Link
              href={extras.pageCtaButtonHref || "/get-involved"}
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#D97706] px-7 py-3.5 text-[13px] font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_rgba(217,119,6,0.35)] transition-colors hover:bg-[#c46a08] lg:self-center"
            >
              {extras.pageCtaButtonLabel || "Get Involved"}
              <UtilityIcon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
