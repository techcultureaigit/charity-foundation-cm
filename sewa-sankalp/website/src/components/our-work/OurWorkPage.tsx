import Link from "next/link";
import type { ComponentType } from "react";
import {
  FaBookOpen,
  FaChild,
  FaHandsHelping,
  FaHeartbeat,
  FaUsers,
} from "react-icons/fa";
import { AccentText, LeafCorner } from "@/components/home/shared";
import { PageBannerHero } from "@/components/site/PageBannerHero";
import { UtilityIcon } from "@/components/site/icons";
import type { MediaItem, PageContent, WorkArea } from "@/lib/types";

const AREA_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  women: FaUsers,
  child: FaChild,
  social: FaHandsHelping,
  education: FaBookOpen,
  health: FaHeartbeat,
};

const FALLBACK_IMAGES = [
  "/uploads/campaign-women-group.jpg",
  "/uploads/campaign-education-girl.jpg",
  "/uploads/focus-card-welfare.png",
  "/uploads/education-mid.jpg",
];

function areaImage(area: WorkArea, index: number, workMedia: MediaItem[]) {
  if (area.imageUrl) return area.imageUrl;
  if (workMedia.length > 0) {
    return workMedia[index % workMedia.length]?.url ?? FALLBACK_IMAGES[0];
  }
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

export function OurWorkPageView({
  page,
  workAreas,
  workMedia,
}: {
  page: PageContent;
  workAreas: WorkArea[];
  workMedia: MediaItem[];
}) {
  const areas = [...workAreas].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-[var(--cream)]">
      <PageBannerHero>
        <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
          Our Work
        </p>
        <h1 className="display mt-1.5 text-[clamp(1.55rem,7vw,3rem)] font-bold leading-[1.08] text-[var(--forest)]">
          {page.headline || "Working Together for a Better Society."}
        </h1>
        <p className="mt-2 max-w-[30rem] line-clamp-3 text-[12px] leading-[1.65] text-[#4A4A4A] sm:mt-2.5 sm:line-clamp-none sm:text-[13.5px] sm:leading-[1.7]">
          {page.body ||
            "Sewa Sankalp Foundation focuses on women empowerment, child development, education, health, and social welfare."}
        </p>
      </PageBannerHero>

      {/* Intro */}
      <section className="relative overflow-hidden bg-white py-9 sm:py-11 lg:py-12">
        <LeafCorner corner="bl" tone="forest" className="opacity-55" />
        <div className="page-shell relative z-[1] text-center">
          <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
            What We Do
          </p>
          <h2 className="display mx-auto mt-2 max-w-2xl text-[clamp(1.55rem,2.6vw,2.2rem)] font-bold text-[var(--forest)]">
            <AccentText
              text="Programmes That Uplift Communities"
              accent="Uplift Communities"
              accentClass="text-[#D68C23]"
            />
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[13.5px] leading-relaxed text-[#6B6B6B]">
            From empowerment and education to welfare and healthcare — every
            initiative is designed to create dignity, opportunity and lasting
            change across Uttarakhand.
          </p>
        </div>
      </section>

      {/* Work areas — alternating image / copy */}
      <section className="relative overflow-hidden bg-white pb-4 sm:pb-6">
        <div className="page-shell relative z-[1] space-y-8 sm:space-y-10 lg:space-y-12">
          {areas.map((area, index) => {
            const Icon = AREA_ICONS[area.iconKey || ""] ?? FaHandsHelping;
            const imageSrc = areaImage(area, index, workMedia);
            const reverse = index % 2 === 1;
            const num = String(index + 1).padStart(2, "0");

            return (
              <article
                key={area.id}
                className="grid items-center gap-6 overflow-hidden rounded-[1.35rem] border border-[var(--border)] bg-white shadow-[0_10px_32px_rgba(0,51,43,0.06)] lg:grid-cols-2 lg:gap-0"
              >
                <div
                  className={`relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[280px] xl:min-h-[300px] ${
                    reverse ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={area.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#D97706] text-[13px] font-bold text-white shadow-[0_6px_16px_rgba(217,119,6,0.35)]">
                    {num}
                  </span>
                </div>

                <div
                  className={`flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8 lg:px-9 xl:px-10 ${
                    reverse ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F8EBD7] text-[#D97706]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.18em] text-[#D68C23]">
                    Focus Area {num}
                  </p>
                  <h2 className="display mt-1.5 text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold leading-snug text-[var(--forest)]">
                    {area.title}
                  </h2>
                  <p className="mt-2 text-[14px] font-semibold leading-snug text-[#2C3A4A]">
                    {area.subtitle}
                  </p>
                  <p className="mt-3 max-w-lg text-[13.5px] leading-[1.7] text-[#6B6B6B]">
                    {area.description}
                  </p>
                  {area.href ? (
                    <Link
                      href={area.href === "/our-work" ? "/get-involved" : area.href}
                      className="mt-5 inline-flex w-fit items-center gap-2 text-[13px] font-bold text-[#D97706] transition-colors hover:text-[#c46a08]"
                    >
                      Get Involved
                      <UtilityIcon name="arrow" className="h-3.5 w-3.5" />
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Closing strip */}
      <section className="relative bg-[#FFFBF5] py-8 sm:py-9">
        <div className="page-shell text-center">
          <p className="display text-[clamp(1.15rem,2vw,1.45rem)] font-bold text-[var(--forest)]">
            Service with purpose. Support with compassion. Development for all.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-white pb-12 pt-[10px] sm:pb-14 lg:pb-16">
        <div className="page-shell relative">
          <div className="overflow-hidden rounded-[1.5rem] bg-[var(--forest)] text-white shadow-[0_20px_48px_rgba(0,51,43,0.22)] lg:flex lg:min-h-[200px] lg:items-stretch">
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
                  Support Our Work,
                  <br />
                  Empower Lives.
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-white/75">
                  Your contribution helps us expand programmes that uplift women,
                  children and communities across Uttarakhand.
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
        </div>
      </section>
    </div>
  );
}
