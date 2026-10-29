import Link from "next/link";
import { UtilityIcon } from "@/components/site/icons";
import type { MediaItem, PageContent } from "@/lib/types";
import {
  AccentText,
  CornerSweep,
  GoldLeaf,
  LeafCorner,
  OrnamentTitle,
  SmartImage,
} from "./shared";

export function AboutSection({
  home,
  about,
  image,
}: {
  home: PageContent;
  about: PageContent;
  image?: MediaItem;
}) {
  const extras = home.extras ?? {};

  return (
    <section className="relative overflow-hidden bg-[var(--ivory)] pb-10 pt-3 sm:pb-12 sm:pt-4 lg:pb-14">
      <LeafCorner corner="tl" className="opacity-85" />
      <LeafCorner corner="tr" className="opacity-55" />
      <LeafCorner corner="br" className="opacity-60" />
      <CornerSweep side="left" />
      <CornerSweep side="right" />

      <div className="page-shell relative">
        <OrnamentTitle className="!mt-0 !pt-0">
          <AccentText
            text={extras.aboutTitle ?? "About Sewa Sankalp Foundation"}
            accent={extras.aboutTitleAccent ?? "Sewa Sankalp Foundation"}
          />
        </OrnamentTitle>

        <div className="mt-6 grid items-center gap-7 lg:mt-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-11">
          {/* Photo + soft wave quote banner — PDF style */}
          <div className="relative overflow-hidden rounded-[1.35rem] shadow-[0_14px_34px_rgba(0,51,43,0.1)]">
            <SmartImage
              src={image?.url || "/uploads/1793021222636-x82thu.jpg"}
              alt={image?.alt || "Sewa Sankalp Foundation community work"}
              hint="About photo: Admin → Homepage → About section photo"
              tint="from-[#d6e4d0] to-[#f0e2c2]"
              className="h-[270px] w-full sm:h-[330px] lg:h-[390px]"
              imgClassName="object-[center_32%]"
            />

            <svg width="0" height="0" aria-hidden className="absolute">
              <defs>
                <clipPath id="about-quote-wave" clipPathUnits="objectBoundingBox">
                  <path d="M0,0.38 C0.22,0.12 0.48,0.02 0.72,0.1 C0.88,0.16 0.96,0.22 1,0.28 L1,1 L0,1 Z" />
                </clipPath>
              </defs>
            </svg>

            <div
              className="absolute inset-x-0 bottom-0 flex min-h-[38%] items-end gap-3.5 bg-[var(--forest)] px-5 pb-4 pt-12 sm:px-6 sm:pb-5 sm:pt-14"
              style={{ clipPath: "url(#about-quote-wave)" }}
            >
              <GoldLeaf className="mb-1 h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
              <div className="min-w-0 pb-0.5">
                <p className="display text-[1.35rem] font-semibold italic leading-[1.2] text-white sm:text-[1.55rem]">
                  <AccentText
                    text={
                      extras.aboutQuote ?? "Together for a better tomorrow."
                    }
                    accent={extras.aboutQuoteAccent ?? "better"}
                    accentClass="text-[var(--gold)]"
                  />
                </p>
                <span className="mt-1.5 block h-px w-36 bg-[var(--gold)]/70" />
              </div>
            </div>
          </div>

          {/* Copy column */}
          <div>
            <h3 className="display text-[clamp(1.95rem,3.2vw,2.85rem)] font-bold leading-[1.08] text-[var(--forest)]">
              <AccentText
                text={about.headline}
                accent={extras.aboutAccentWords ?? "Our Goal"}
              />
            </h3>
            <span className="mt-2 block h-[2.5px] w-24 rounded-full bg-gradient-to-r from-[var(--gold)] to-transparent" />

            <p className="mt-4 text-[13.5px] leading-[1.75] text-[var(--charcoal)]/80 sm:text-[14px]">
              {about.body}
            </p>

            {home.aboutObjectiveTitle ? (
              <div className="mt-7 flex items-center gap-4 border-t border-[var(--forest)]/8 pt-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0e2c0] text-[15px] font-bold text-[var(--forest)]">
                  01
                </span>
                <span className="h-12 w-px shrink-0 bg-[var(--gold)]/55" />
                <div className="min-w-0">
                  <h4 className="display text-[1.22rem] font-bold leading-snug text-[var(--forest)]">
                    {home.aboutObjectiveTitle}
                  </h4>
                  <p className="mt-1 text-[13px] leading-[1.65] text-[var(--charcoal)]/75">
                    {home.aboutObjectiveBody}
                  </p>
                </div>
              </div>
            ) : null}

            <Link
              href={extras.aboutButtonHref || "/about"}
              className="btn-gold mt-7 px-6 py-2.5 text-[13px]"
            >
              {extras.aboutButtonLabel ?? "Read More About Us"}
              <UtilityIcon name="arrow" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
