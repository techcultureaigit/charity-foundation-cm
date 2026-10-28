import type { ReactNode } from "react";

/**
 * Shared inner-page hero — same image + cream fade as Campaigns.
 * Pass page-specific copy as children; do not change the banner asset layout.
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
    <section className="relative w-full overflow-hidden bg-[#FDF8EE] leading-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt=""
        aria-hidden
        className="m-0 block h-[240px] w-full max-w-none object-cover object-[85%_center] sm:h-[230px] sm:object-right lg:h-[260px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#FDF8EE] from-[0%] via-[#FDF8EE] via-[48%] to-transparent to-[78%] sm:from-[#FDF8EE]/70 sm:via-[#FDF8EE]/30 sm:to-transparent"
      />
      <div className="pointer-events-none absolute inset-0 z-[2] flex items-start pt-4 sm:pt-6 lg:pt-7">
        <div className="page-shell pointer-events-auto flex w-full justify-start">
          <div className={contentClassName}>{children}</div>
        </div>
      </div>
    </section>
  );
}
