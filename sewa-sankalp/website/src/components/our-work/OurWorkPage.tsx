import Link from "next/link";
import { AccentText, LeafCorner } from "@/components/home/shared";
import { PageBannerHero } from "@/components/site/PageBannerHero";
import { IconByKey, UtilityIcon } from "@/components/site/icons";
import type { FocusTheme, PageContent, WorkArea } from "@/lib/types";

const themeStyles: Record<
  FocusTheme,
  { card: string; icon: string; button: string }
> = {
  pink: {
    card: "bg-[#fde8e4]",
    icon: "border-[#e8a090] bg-white text-[#d2584a]",
    button:
      "bg-white text-[#d2584a] shadow-[0_3px_10px_rgba(0,0,0,0.08)] group-hover:bg-[#d2584a] group-hover:text-white",
  },
  green: {
    card: "bg-[#e6f2e4]",
    icon: "border-[#8fbf9a] bg-white text-[#2f7a55]",
    button:
      "bg-[#2f7a55] text-white shadow-[0_3px_10px_rgba(47,122,85,0.2)] group-hover:bg-[#256346]",
  },
  orange: {
    card: "bg-[#f7ecd8]",
    icon: "border-[#dfb56a] bg-white text-[#c97a14]",
    button:
      "bg-white text-[#c97a14] shadow-[0_3px_10px_rgba(0,0,0,0.08)] group-hover:bg-[#c97a14] group-hover:text-white",
  },
  blue: {
    card: "bg-[#e4eef8]",
    icon: "border-[#9bb6de] bg-white text-[#3b6fc0]",
    button:
      "bg-white text-[#3b6fc0] shadow-[0_3px_10px_rgba(0,0,0,0.08)] group-hover:bg-[#3b6fc0] group-hover:text-white",
  },
};

const defaultThemes: FocusTheme[] = ["pink", "green", "orange", "blue"];

/** Pre-designed cards — portrait + floral baked into each PNG (same as home). */
const FOCUS_CARD_ART: Record<FocusTheme, string> = {
  pink: "/uploads/focus-card-women.png?v=5",
  green: "/uploads/focus-card-child.png?v=5",
  orange: "/uploads/focus-card-welfare.png?v=5",
  blue: "/uploads/focus-card-education.png?v=5",
};

function WorkFocusCard({
  area,
  index,
}: {
  area: WorkArea;
  index: number;
}) {
  const theme = area.theme ?? defaultThemes[index % 4];
  const style = themeStyles[theme] ?? themeStyles.green;
  const art =
    FOCUS_CARD_ART[theme] ||
    area.imageUrl ||
    FOCUS_CARD_ART[defaultThemes[index % 4]];

  return (
    <Link
      href={area.href === "/our-work" ? "/get-involved" : area.href || "/get-involved"}
      className={`group relative block overflow-hidden rounded-[1.5rem] ${style.card} shadow-[0_12px_32px_rgba(0,51,43,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,51,43,0.12)]`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={art}
        alt={area.title}
        className="block h-auto w-full scale-[1.03] object-cover"
      />

      {/* Text on pastel left of designed art */}
      <div className="absolute inset-0 z-10 flex w-[56%] flex-col justify-between p-4 sm:w-[54%] sm:p-5 lg:p-6">
        <div>
          <div className="flex items-start gap-2 sm:gap-2.5">
            <span
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-white/95 sm:h-9 sm:w-9 ${style.icon}`}
            >
              <IconByKey
                iconKey={area.iconKey}
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
              />
            </span>
            <h3 className="display pt-0.5 text-[1.05rem] font-bold leading-[1.15] text-[var(--forest)] sm:text-[1.2rem] lg:text-[1.3rem]">
              {area.title}
            </h3>
          </div>
          <p className="mt-2 line-clamp-4 text-[11.5px] leading-[1.5] text-[var(--charcoal)]/78 sm:mt-2.5 sm:text-[12.5px] sm:leading-[1.55]">
            {area.description}
          </p>
        </div>
        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 sm:h-9 sm:w-9 ${style.button}`}
        >
          <UtilityIcon name="arrow" className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export function OurWorkPageView({
  page,
  workAreas,
}: {
  page: PageContent;
  workAreas: WorkArea[];
  workMedia?: unknown;
}) {
  const areas = [...workAreas].sort((a, b) => a.order - b.order).slice(0, 4);

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

      {/* 4 separate focus screens — 2×2 */}
      <section className="relative overflow-hidden bg-white py-9 sm:py-11 lg:py-12">
        <LeafCorner corner="tr" tone="gold" className="opacity-60" />
        <LeafCorner corner="bl" tone="forest" className="opacity-50" />

        <div className="page-shell relative z-[1]">
          <div className="text-center">
            <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
              Focus Areas
            </p>
            <h2 className="display mx-auto mt-2 max-w-2xl text-[clamp(1.55rem,2.6vw,2.2rem)] font-bold text-[var(--forest)]">
              <AccentText
                text="Four Pillars of Our Mission"
                accent="Our Mission"
                accentClass="text-[#D68C23]"
              />
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[13.5px] leading-relaxed text-[#6B6B6B]">
              Each programme is a dedicated screen of care — explore how we
              support women, children, families and students across communities.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-9 sm:grid-cols-2 sm:gap-5 lg:gap-6">
            {areas.map((area, index) => (
              <WorkFocusCard key={area.id} area={area} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing line */}
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
