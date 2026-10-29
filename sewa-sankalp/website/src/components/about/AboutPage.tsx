import Link from "next/link";
import { AccentText, LeafCorner } from "@/components/home/shared";
import { PageBannerHero } from "@/components/site/PageBannerHero";
import { UtilityIcon } from "@/components/site/icons";
import type { MediaItem, PageContent } from "@/lib/types";

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

/** Google Material Symbols — fonts.google.com/icons */
function GoogleIcon({
  name,
  className = "text-[26px]",
}: {
  name: MaterialIconName;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      aria-hidden
    >
      {name}
    </span>
  );
}

const pillars = [
  {
    title: "Our Mission",
    text: "To empower underprivileged communities through education, healthcare, environment and sustainable development.",
    icon: "target" as const,
  },
  {
    title: "Our Vision",
    text: "A society where every individual has equal opportunities to learn, grow, thrive and contribute to a better tomorrow.",
    icon: "visibility" as const,
  },
  {
    title: "Our Values",
    text: "Service, Integrity, Compassion, Inclusivity and Sustainability guide everything we do.",
    icon: "diamond" as const,
  },
];

const stats = [
  { icon: "groups" as const, value: "500+", label: "Campaigns" },
  { icon: "volunteer_activism" as const, value: "1,000+", label: "People Helped" },
  { icon: "person" as const, value: "50+", label: "Volunteers" },
  { icon: "eco" as const, value: "100+", label: "Communities Reached" },
];

const journey = [
  {
    year: "2020",
    icon: "calendar_month" as const,
    text: (
      <>
        Our journey <strong className="font-semibold text-[#4A4A4A]">began</strong>{" "}
        with a vision to serve society.
      </>
    ),
  },
  {
    year: "2021",
    icon: "groups" as const,
    text: "Expanded our education and healthcare initiatives.",
  },
  {
    year: "2022",
    icon: "eco" as const,
    text: "Started environment and community development programs.",
  },
  {
    year: "2023",
    icon: "trending_up" as const,
    text: "Reached 1,000+ people and partnered with multiple organizations.",
  },
  {
    year: "2024",
    icon: "star" as const,
    text: "Continuing our mission for a brighter and more inclusive tomorrow.",
  },
];

export function AboutPageView({
  page,
  photo,
}: {
  page: PageContent;
  photo?: MediaItem;
}) {
  void page;
  void photo;

  return (
    <div className="bg-white">
      {/* Hero — same banner image/bg as Campaigns; keep About copy */}
      <PageBannerHero>
        <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
          About Sewa Sankalp Foundation
        </p>
        <h1 className="display mt-1.5 text-[clamp(1.55rem,7vw,3rem)] font-bold leading-[1.08] text-[var(--forest)] sm:mt-2">
          <AccentText
            text="People. Purpose. A Brighter Tomorrow."
            accent="A Brighter Tomorrow."
            accentClass="text-[#D68C23]"
            breakBeforeAccent
          />
        </h1>
        <p className="mt-2 max-w-[30rem] line-clamp-3 text-[12px] leading-[1.65] text-[#4A4A4A] sm:mt-2.5 sm:line-clamp-none sm:text-[13.5px] sm:leading-[1.7]">
          Sewa Sankalp Foundation is a non-profit organization dedicated to
          creating a more equitable, healthier and sustainable society through
          education, healthcare, environment and community support.
        </p>
      </PageBannerHero>

      {/* Who We Are */}
      <section className="relative overflow-hidden bg-white pt-[2px] pb-[2px]">
        <div className="page-shell relative z-[1] py-6 sm:py-7 lg:py-8">
          <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 xl:gap-16">
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/uploads/about-who-we-are.png"
                alt="Together we can create a brighter, stronger and more inclusive tomorrow."
                className="h-auto w-full"
              />
            </div>

            <div className="lg:pt-1">
              <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
                Who We Are
              </p>
              <h2 className="display mt-2 text-[clamp(1.65rem,2.7vw,2.35rem)] font-bold leading-[1.15] text-[var(--forest)]">
                <AccentText
                  text="About Sewa Sankalp Foundation"
                  accent="Foundation"
                  accentClass="text-[#D68C23]"
                />
              </h2>
              <p className="mt-4 max-w-lg text-[13.5px] leading-[1.75] text-[#4A4A4A] sm:text-[14px]">
                Sewa Sankalp Foundation is a non-governmental trust dedicated to
                the upliftment and service of the weaker sections of society. We
                work with poor, helpless, and deprived families — especially
                women and children — so every person can live with dignity.
              </p>
              <p className="mt-3.5 max-w-lg text-[13.5px] leading-[1.75] text-[#4A4A4A] sm:text-[14px]">
                Inspired by a deep commitment to public service, our programmes
                focus on education, health, empowerment, and social welfare —
                creating lasting opportunities for communities across Uttarakhand.
              </p>
            </div>
          </div>

          {/* Mission / Vision / Values — peach circles + dividers */}
          <div className="mt-[2px] grid gap-8 rounded-2xl bg-white px-4 py-5 shadow-[0_8px_28px_rgba(0,51,43,0.1)] sm:mt-[2px] md:grid-cols-3 md:gap-0 md:px-2 md:py-5">
            {pillars.map((item, index) => (
              <div
                key={item.title}
                className={`flex items-start gap-3.5 text-left md:px-5 lg:gap-4 lg:px-6 ${
                  index > 0 ? "md:border-l md:border-[#E5E0D8]" : "md:pl-0"
                }`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF0E4] text-[#F08220] sm:h-[3.25rem] sm:w-[3.25rem]">
                  <GoogleIcon name={item.icon} className="text-[24px] text-[#F08220]" />
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

      {/* Impact stats */}
      <section className="relative my-[2px] overflow-hidden bg-[var(--forest)] py-6 text-white sm:py-7">
        <LeafCorner corner="tl" tone="gold" className="opacity-30" />
        <LeafCorner corner="br" tone="gold" className="opacity-25" />
        <div className="page-shell relative z-[1] grid items-center gap-7 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.4fr)] lg:gap-8">
          <div>
            <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D98A29] sm:text-[11px]">
              Our Impact in Numbers
            </p>
            <h2 className="display mt-2 max-w-sm text-[clamp(1.4rem,2.3vw,1.95rem)] font-bold leading-tight !text-white">
              Creating Lasting Change in Communities
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
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

      {/* Our Journey */}
      <section className="relative overflow-hidden bg-white pt-[2px] pb-[2px]">
        <div className="page-shell relative z-[1] grid items-center gap-10 py-6 sm:py-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:py-8">
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uploads/about-journey.png"
              alt="Volunteers planting trees with the community"
              className="h-auto w-full"
            />
          </div>

          <div>
            <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
              Our Journey
            </p>
            <h2 className="display mt-2.5 text-[clamp(1.65rem,2.7vw,2.3rem)] font-bold leading-[1.18] text-[var(--forest)]">
              From a Small Step
              <br />
              to a{" "}
              <span className="text-[#D68C23]">Bigger Movement</span>
            </h2>
            <p className="mt-3.5 max-w-xl text-[13.5px] leading-[1.7] text-[#555555] sm:text-[14px]">
              What began as a simple desire to help has now grown into a
              collective movement of change. With the support of our volunteers,
              donors and partners, Sewa Sankalp Foundation has been able to reach
              thousands of lives and create meaningful, sustainable impact in
              communities across India.
            </p>

            <ol className="relative mt-7 space-y-px">
              {journey.map((item) => (
                <li key={item.year} className="relative flex items-center gap-3.5">
                  <span className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF0E4] text-[#D68C23]">
                    <GoogleIcon
                      name={item.icon}
                      className="text-[18px] text-[#D68C23]"
                    />
                  </span>
                  <p className="min-w-0 text-[13px] leading-[1.6] text-[#555555] sm:text-[13.5px]">
                    <span className="font-bold text-[#D68C23]">{item.year}</span>
                    <span className="font-bold text-[#D68C23]"> — </span>
                    {item.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Bottom CTA — full-bleed; image sets height so full art is visible */}
      <section className="relative mb-[7px] w-full overflow-x-clip bg-[#0B3B24] text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/uploads/about-cta-bg.png"
          alt=""
          aria-hidden
          className="block h-auto min-h-[11rem] w-full object-cover object-center sm:min-h-0"
        />
        <div className="page-shell absolute inset-0 z-[1] flex flex-col justify-center gap-5 overflow-y-auto py-6 sm:gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <h2 className="display text-[clamp(1.5rem,2.5vw,2.1rem)] font-bold leading-[1.2] !text-white">
              <AccentText
                text="Be a Part of Our Journey"
                accent="Journey"
                accentClass="text-[#D98A29]"
              />
            </h2>
            <p className="mt-2.5 max-w-md text-[13px] leading-relaxed text-white/85 sm:text-[14px]">
              Your support can help us reach more people, create more
              opportunities and build stronger, healthier communities.
            </p>
          </div>
          <Link
            href="/get-involved"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#D97706] px-7 py-3.5 text-[13px] font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_rgba(217,119,6,0.35)] transition-colors hover:bg-[#c46a08] lg:self-center"
          >
            Get Involved
            <UtilityIcon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
