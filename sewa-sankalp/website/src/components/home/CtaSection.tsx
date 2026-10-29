import Link from "next/link";
import { UtilityIcon } from "@/components/site/icons";
import type { MediaItem, PageContent } from "@/lib/types";
import { AccentText } from "./shared";

const CTA_STRIP = "/uploads/cta-corner.png";

/**
 * Only wide “strip” assets blend into the green footer.
 * Tall photos (e.g. cta-banner.jpg) cut through the kids and look like
 * the footer is overlapping — fall back to the designed strip.
 */
function resolveCtaStripUrl(url?: string) {
  if (!url) return CTA_STRIP;
  if (/cta-corner/i.test(url)) return url;
  if (/cta-banner-full/i.test(url)) return url;
  return CTA_STRIP;
}

export function CtaSection({
  page,
  image,
}: {
  page: PageContent;
  image?: MediaItem;
}) {
  const extras = page.extras ?? {};
  if (!page.ctaHeadline) return null;

  const bannerUrl = resolveCtaStripUrl(image?.url);

  return (
    /*
      Strip asset (~1024×133) has cream left + kids corner + green swooshes
      that continue into the footer. Mobile: in-flow content (defines height);
      banner fills as cover. sm+: absolute text over the strip.
    */
    <section className="relative z-0 -mb-px bg-[var(--forest)]">
      <div className="relative z-[1] w-full overflow-hidden bg-[var(--ivory)] leading-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerUrl}
          alt=""
          aria-hidden
          className="m-0 block h-auto w-full max-w-none p-0 max-sm:absolute max-sm:inset-0 max-sm:h-full max-sm:object-cover max-sm:object-[72%_center]"
        />

        <div className="pointer-events-none relative z-[2] flex min-h-[11.75rem] items-center sm:absolute sm:inset-0 sm:min-h-0 sm:items-center">
          <div className="page-shell pointer-events-auto flex w-full items-center py-5 sm:py-0">
            <div className="flex w-full max-w-full flex-col items-start gap-3 sm:max-w-[68%] sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 sm:pb-[3%] lg:gap-7">
              <div className="min-w-0 max-w-lg flex-1">
                <h2 className="display text-[clamp(1.35rem,5.2vw,2.15rem)] font-bold leading-[1.12] text-[var(--forest)] sm:text-[clamp(1.45rem,2.4vw,2.15rem)] sm:leading-[1.08]">
                  <AccentText
                    text={page.ctaHeadline}
                    accent={extras.ctaAccentWords}
                  />
                </h2>
                <p className="mt-1.5 max-w-md text-[12.5px] leading-[1.55] text-[var(--charcoal)]/80 sm:text-[13px] sm:leading-[1.6]">
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
