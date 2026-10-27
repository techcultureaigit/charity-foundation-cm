import Link from "next/link";
import { UtilityIcon } from "@/components/site/icons";
import type { MediaItem, PageContent } from "@/lib/types";
import { AccentText } from "./shared";

export function CtaSection({
  page,
  image,
}: {
  page: PageContent;
  image?: MediaItem;
}) {
  const extras = page.extras ?? {};
  if (!page.ctaHeadline) return null;

  // Corner banner asset — kids + leaves + bottom green swooshes, flush edges
  const bannerUrl =
    image?.url &&
    (image.url.includes("cta-corner") || image.url.includes("cta-banner-full"))
      ? image.url
      : "/uploads/cta-corner.png";

  return (
    /*
      No green band above — cream banner starts clean.
      Bottom green in the asset merges into the footer.
    */
    <section className="relative -mb-px bg-[var(--forest)]">
      <div className="relative z-[1] w-full bg-[var(--ivory)] leading-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerUrl}
          alt=""
          aria-hidden
          className="m-0 block h-auto w-full max-w-none p-0"
        />

        {/*
          Text + button only over cream center-left.
          Right ~32% stays clear so kids photo corner of the asset shows.
        */}
        <div className="pointer-events-none absolute inset-0 z-[2] flex items-center">
          <div className="page-shell pointer-events-auto flex w-full items-center">
            <div className="flex w-full max-w-[68%] flex-wrap items-center gap-4 pb-[3%] sm:gap-5 lg:gap-7">
              <div className="min-w-0 max-w-lg flex-1">
                <h2 className="display text-[clamp(1.45rem,2.4vw,2.15rem)] font-bold leading-[1.08] text-[var(--forest)]">
                  <AccentText
                    text={page.ctaHeadline}
                    accent={extras.ctaAccentWords}
                  />
                </h2>
                <p className="mt-1.5 max-w-md text-[12.5px] leading-[1.6] text-[var(--charcoal)]/80 sm:text-[13px]">
                  {page.ctaBody}
                </p>
              </div>

              <Link
                href={page.ctaButtonHref || "/impact-contact"}
                className="btn-gold w-fit shrink-0 px-6 py-2.5 text-[13px]"
              >
                {page.ctaButtonLabel || "Contact Now"}
                <UtilityIcon name="arrow" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
