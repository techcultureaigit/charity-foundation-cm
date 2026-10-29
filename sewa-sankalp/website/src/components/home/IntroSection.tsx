import Link from "next/link";
import { IconByKey, UtilityIcon } from "@/components/site/icons";
import type { FocusTheme, PageContent, WorkArea } from "@/lib/types";
import {
  AccentText,
  GoldLeaf,
  LeafCorner,
  OrnamentTitle,
  paragraphs,
} from "./shared";

const themeStyles: Record<
  FocusTheme,
  { card: string; icon: string; button: string; ring: string }
> = {
  pink: {
    card: "bg-[#fde8e4]",
    icon: "border-[#e8a090] bg-white text-[#d2584a]",
    button:
      "bg-white text-[#d2584a] shadow-[0_3px_10px_rgba(0,0,0,0.08)] group-hover:bg-[#d2584a] group-hover:text-white",
    ring: "ring-[#f0c4b8]/80",
  },
  green: {
    card: "bg-[#e6f2e4]",
    icon: "border-[#8fbf9a] bg-white text-[#2f7a55]",
    button:
      "bg-[#2f7a55] text-white shadow-[0_3px_10px_rgba(47,122,85,0.2)] group-hover:bg-[#256346]",
    ring: "ring-[#c5e0c8]/80",
  },
  blue: {
    card: "bg-[#e4eef8]",
    icon: "border-[#9bb6de] bg-white text-[#3b6fc0]",
    button:
      "bg-white text-[#3b6fc0] shadow-[0_3px_10px_rgba(0,0,0,0.08)] group-hover:bg-[#3b6fc0] group-hover:text-white",
    ring: "ring-[#c5d7ef]/80",
  },
  orange: {
    card: "bg-[#f7ecd8]",
    icon: "border-[#dfb56a] bg-white text-[#c97a14]",
    button:
      "bg-white text-[#c97a14] shadow-[0_3px_10px_rgba(0,0,0,0.08)] group-hover:bg-[#c97a14] group-hover:text-white",
    ring: "ring-[#f0d6a8]/80",
  },
};

const defaultThemes: FocusTheme[] = ["pink", "green", "orange", "blue"];

/** Pre-designed focus cards — wavy portrait + floral already baked in. */
const FOCUS_CARD_ART: Record<FocusTheme, string> = {
  pink: "/uploads/focus-card-women.png?v=5",
  green: "/uploads/focus-card-child.png?v=5",
  blue: "/uploads/focus-card-education.png?v=5",
  orange: "/uploads/focus-card-welfare.png?v=5",
};

export function IntroSection({
  page,
  areas,
}: {
  page: PageContent;
  areas: WorkArea[];
}) {
  const extras = page.extras ?? {};
  const cards = areas.slice(0, 4);
  const intro = paragraphs(page.introBody);

  return (
    <section className="relative overflow-hidden bg-[var(--cream)] pb-6 pt-3 sm:pb-7 sm:pt-4 lg:pb-8 lg:pt-5">
      <LeafCorner corner="tr" tone="gold" className="opacity-75" />
      <LeafCorner corner="bl" tone="gold" className="opacity-70" />

      <div className="page-shell relative">
        <OrnamentTitle className="!mt-0">
          {extras.introTitle ?? "Introduction"}
        </OrnamentTitle>

        <div className="mt-7 grid items-start gap-7 lg:mt-8 lg:grid-cols-[0.92fr_1.35fr] lg:gap-10">
          {/* Left copy — PDF layout */}
          <div>
            <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
              {extras.introLabel ?? "Introduction"}
              <span className="h-px w-10 bg-[var(--gold)]/55" />
            </p>
            <h3 className="display mt-3 text-[clamp(1.85rem,3vw,2.7rem)] font-bold leading-[1.12] text-[var(--forest)]">
              <AccentText
                text={page.introHeadline ?? ""}
                accent={page.introAccentWords}
              />
            </h3>
            <div className="mt-4 space-y-3 text-[13.5px] leading-[1.75] text-[var(--charcoal)]/78 sm:text-[14px]">
              {intro.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>

            {page.quote ? (
              <div className="mt-7 flex items-center gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[var(--gold)]/50 bg-white/50">
                  <GoldLeaf className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="display text-[1.3rem] font-semibold italic leading-snug text-[var(--forest)] sm:text-[1.45rem]">
                    {page.quote}
                  </p>
                  <svg
                    viewBox="0 0 160 10"
                    className="mt-0.5 h-2 w-32 text-[var(--gold)]"
                    aria-hidden
                  >
                    <path
                      d="M2 6C40 1 100 1 158 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            ) : null}
          </div>

          {/* 2×2 focus cards — card size follows full designed image */}
          <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
            {cards.map((area, index) => {
              const theme = area.theme ?? defaultThemes[index % 4];
              const style = themeStyles[theme] ?? themeStyles.green;
              // Designed focus-card art keeps wavy card layout. Use Work Area
              // upload only when it is already a focus-card asset.
              const uploaded = area.imageUrl?.trim() || "";
              const art =
                uploaded ||
                FOCUS_CARD_ART[theme] ||
                FOCUS_CARD_ART[defaultThemes[index % 4]];

              return (
                <Link
                  key={area.id}
                  href={area.href || "/our-work"}
                  className={`group relative block overflow-hidden rounded-[1.25rem] ${style.card} shadow-[0_10px_28px_rgba(0,51,43,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(0,51,43,0.12)]`}
                >
                  {/* Art fills card; slight zoom hides PNG rounded-corner fringe */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={art}
                    alt={area.title}
                    className="block h-auto w-full scale-[1.04] object-cover"
                  />

                  {/* Text sits on the empty pastel left of the designed art */}
                  <div className="absolute inset-0 z-10 flex w-[58%] flex-col justify-between p-3 sm:w-[54%] sm:p-4">
                    <div>
                      <div className="flex items-start gap-1.5 sm:gap-2">
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-white/90 sm:h-8 sm:w-8 ${style.icon}`}
                        >
                          <IconByKey
                            iconKey={area.iconKey}
                            className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                          />
                        </span>
                        <h4 className="display pt-0.5 text-[0.9rem] font-bold leading-[1.15] text-[var(--forest)] sm:text-[1.08rem]">
                          {area.title}
                        </h4>
                      </div>
                      <p className="mt-1.5 line-clamp-3 text-[10.5px] leading-[1.45] text-[var(--charcoal)]/78 sm:line-clamp-4 sm:text-[11.5px] sm:leading-[1.5]">
                        {area.description}
                      </p>
                    </div>
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-300 ${style.button}`}
                    >
                      <UtilityIcon name="arrow" className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
