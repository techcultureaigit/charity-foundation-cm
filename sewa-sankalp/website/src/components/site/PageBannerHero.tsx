import type { ReactNode } from "react";

/**
 * Shared inner-page hero — same image + cream fade as Campaigns.
 * Pass page-specific copy as children; do not change the banner asset layout.
 * Section grows with copy so multi-line titles are not clipped on small screens.
 */
export function PageBannerHero({
  children,
  imageUrl = "/uploads/contact-hero.png",
  contentClassName = "w-full max-w-[36rem]",
}: {
  children: ReactNode;
  imageUrl?: string;
  contentClassName?: string;
}) {
  return (
    <section className="relative w-full overflow-x-clip bg-[#FDF8EE] leading-normal">
      <div className="relative min-h-[240px] sm:min-h-[230px] lg:min-h-[260px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 m-0 block h-full w-full max-w-none object-cover object-[85%_center] sm:object-right"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#FDF8EE] from-[0%] via-[#FDF8EE] via-[48%] to-transparent to-[78%] sm:from-[#FDF8EE]/70 sm:via-[#FDF8EE]/30 sm:to-transparent"
        />
        <div className="relative z-[2] flex items-start pt-4 pb-6 sm:pt-6 sm:pb-8 lg:pt-7 lg:pb-9">
          <div className="page-shell flex w-full justify-start">
            <div className={contentClassName}>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
