import Link from "next/link";
import { IconByKey, UtilityIcon } from "@/components/site/icons";
import type { InvolvementCard, InvolvementTheme, PageContent } from "@/lib/types";
import { EyebrowTitle, LeafCorner, LeafShape, SmartImage } from "./shared";

const themes: Record<
  InvolvementTheme,
  { bg: string; tint: string; icon: string; leaf: string }
> = {
  cream: {
    bg: "#fdf4dc",
    tint: "from-[#f6e3b4] to-[#f0d28f]",
    icon: "bg-[#fbe8b8] text-[#c58a1a]",
    leaf: "text-[#e8d6a5]",
  },
  mint: {
    bg: "#eaf2e6",
    tint: "from-[#cfe3c7] to-[#b4d3ae]",
    icon: "bg-[#d5e6cf] text-[#4d8a53]",
    leaf: "text-[#c6dcc0]",
  },
  peach: {
    bg: "#fdebe3",
    tint: "from-[#f6cdbb] to-[#efb4a0]",
    icon: "bg-[#fbd9ca] text-[#d2644a]",
    leaf: "text-[#f1cfc2]",
  },
};

export function InvolveSection({
  page,
  cards,
}: {
  page: PageContent;
  cards: InvolvementCard[];
}) {
  const extras = page.extras ?? {};
  if (cards.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--cream)] pb-5 pt-6 sm:pb-6 sm:pt-7 lg:pb-7 lg:pt-8">
      <LeafCorner corner="tl" />
      <LeafCorner corner="tr" />

      <div className="page-shell relative">
        <EyebrowTitle
          eyebrow={extras.involveEyebrow}
          headline={extras.involveHeadline ?? ""}
          accent={extras.involveAccentWords}
          subtitle={extras.involveSubtitle}
        />

        <div className="mx-auto mt-6 grid max-w-5xl gap-4 md:mt-7 md:grid-cols-3 md:gap-5">
          {cards.map((card) => {
            const theme = themes[card.theme] ?? themes.cream;
            return (
              <article
                key={card.id}
                className="hover-lift group relative overflow-hidden rounded-[1.2rem] shadow-[0_8px_22px_rgba(0,51,43,0.06)]"
                style={{ backgroundColor: theme.bg }}
              >
                <div className="relative h-40 sm:h-44">
                  <SmartImage
                    src={card.imageUrl}
                    alt={card.title}
                    hint="Add photo in Admin → Involvement"
                    tint={theme.tint}
                    className="h-full w-full"
                    imgClassName="object-[center_28%] transition-transform duration-500 group-hover:scale-105"
                  />
                  <svg
                    viewBox="0 0 400 56"
                    preserveAspectRatio="none"
                    className="absolute -bottom-px left-0 h-10 w-full"
                    aria-hidden
                  >
                    <path
                      d="M0 32C70 8 130 8 200 26s130 28 200-4v34H0Z"
                      fill={theme.bg}
                    />
                  </svg>
                </div>

                <div className="relative px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
                  {/* faint leaf watermark — PDF card style */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -bottom-1 -right-1 h-28 w-24 opacity-50 ${theme.leaf}`}
                  >
                    <LeafShape className="absolute right-2 top-2 h-20 w-12 rotate-[18deg]" />
                    <LeafShape className="absolute right-10 top-8 h-14 w-9 -rotate-[22deg] opacity-70" />
                  </div>

                  <span
                    className={`relative z-10 -mt-10 mb-2 flex h-12 w-12 items-center justify-center rounded-full border-[3px] shadow-sm ${theme.icon}`}
                    style={{ borderColor: theme.bg }}
                  >
                    <IconByKey iconKey={card.iconKey} className="h-5 w-5" />
                  </span>

                  <h3 className="relative z-10 display text-[1.35rem] font-bold leading-tight text-[var(--forest)] sm:text-[1.45rem]">
                    {card.title}
                  </h3>
                  <span className="relative z-10 mt-1.5 block h-[2px] w-12 rounded-full bg-[var(--gold)]" />

                  <p className="relative z-10 mt-2 text-[12.5px] leading-[1.6] text-[var(--charcoal)]/78 sm:text-[13px]">
                    {card.description}
                  </p>

                  <Link
                    href={card.ctaHref || "/get-involved"}
                    className="btn-forest relative z-10 mt-4 w-full justify-between px-4 py-2 text-[12.5px] sm:w-[85%]"
                  >
                    {card.ctaLabel}
                    <UtilityIcon name="arrow" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
