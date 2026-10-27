import Link from "next/link";
import { IconByKey, UtilityIcon } from "@/components/site/icons";
import type { Cause, PageContent } from "@/lib/types";
import {
  CornerSweep,
  EyebrowTitle,
  LeafCorner,
  LeafShape,
  SmartImage,
} from "./shared";

const accents = [
  {
    badge: "bg-[var(--forest)]",
    bar: "bg-[var(--forest)]",
    count: "text-[var(--gold-deep)]",
  },
  {
    badge: "bg-[var(--gold)]",
    bar: "bg-[var(--gold)]",
    count: "text-[var(--gold-deep)]",
  },
  {
    badge: "bg-[var(--forest)]",
    bar: "bg-[var(--forest)]",
    count: "text-[var(--gold-deep)]",
  },
];

export function CausesSection({
  page,
  causes,
}: {
  page: PageContent;
  causes: Cause[];
}) {
  const extras = page.extras ?? {};
  if (causes.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--ivory)] pb-6 pt-2 sm:pb-7 sm:pt-3 lg:pb-8">
      <LeafCorner corner="tl" />
      <LeafCorner corner="tr" />
      <CornerSweep side="left" />
      <CornerSweep side="right" />

      <div className="page-shell relative">
        <EyebrowTitle
          className="!mt-0"
          eyebrow={extras.causesEyebrow}
          headline={extras.causesHeadline ?? ""}
          accent={extras.causesAccentWords}
        />

        <div className="mt-6 grid gap-4 md:mt-7 md:grid-cols-3 md:gap-5 lg:gap-7">
          {causes.map((cause, index) => {
            const accent = accents[index % accents.length];
            const percent =
              cause.goalCount > 0
                ? Math.min(
                    100,
                    Math.round((cause.helpedCount / cause.goalCount) * 100),
                  )
                : 0;
            return (
              <article
                key={cause.id}
                className="hover-lift group relative overflow-hidden rounded-[1.2rem] border border-[var(--border)] bg-white shadow-[0_8px_22px_rgba(0,51,43,0.06)]"
              >
                <SmartImage
                  src={cause.imageUrl}
                  alt={cause.title}
                  hint="Add photo in Admin → Causes"
                  className="h-40 w-full sm:h-44"
                  imgClassName="object-[center_30%] transition-transform duration-500 group-hover:scale-105"
                />

                <div className="relative px-4 pb-4 sm:px-5 sm:pb-5">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-1 -right-1 h-24 w-20 text-[#e8d6a5]/70"
                  >
                    <LeafShape className="absolute right-1 top-1 h-16 w-10 rotate-[16deg]" />
                    <LeafShape className="absolute right-8 top-6 h-12 w-7 -rotate-[24deg] opacity-65" />
                  </div>

                  <span
                    className={`relative z-10 -mt-6 flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white text-white shadow ${accent.badge}`}
                  >
                    <IconByKey iconKey={cause.iconKey} className="h-4 w-4" />
                  </span>

                  <div className="relative z-10 mt-2.5 flex items-baseline justify-between text-[12px]">
                    <span className="text-[var(--charcoal)]/70">
                      <strong className={`text-[0.95rem] font-bold ${accent.count}`}>
                        {cause.helpedCount.toLocaleString("en-IN")}
                      </strong>{" "}
                      helped
                    </span>
                    <span className="text-[var(--charcoal)]/70">
                      Goal:{" "}
                      <strong className="font-bold text-[var(--forest)]">
                        {cause.goalCount.toLocaleString("en-IN")}
                      </strong>
                    </span>
                  </div>
                  <div
                    className="relative z-10 mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#eaeeea]"
                    role="progressbar"
                    aria-valuenow={percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${cause.title} progress`}
                  >
                    <div
                      className={`h-full rounded-full ${accent.bar}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <h3 className="relative z-10 display mt-3.5 text-[1.35rem] font-bold leading-tight text-[var(--forest)] sm:text-[1.45rem]">
                    {cause.title}
                  </h3>
                  <p className="relative z-10 mt-1.5 text-[12.5px] leading-[1.6] text-[var(--charcoal)]/78 sm:text-[13px]">
                    {cause.description}
                  </p>
                  <Link
                    href={cause.href || "/our-work"}
                    className="btn-outline relative z-10 mt-3.5 px-4 py-1.5 text-[12.5px]"
                  >
                    {extras.causesButtonLabel}
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
