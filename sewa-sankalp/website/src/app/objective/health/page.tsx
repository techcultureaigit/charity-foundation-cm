import type { Metadata } from "next";
import Link from "next/link";
import { PageBannerHero } from "@/components/site/PageBannerHero";

export const metadata: Metadata = {
  title: "Health | Our Objectives",
  description: "Health & welfare programmes by Sewa Sankalp Foundation.",
};

export default function HealthObjectivePage() {
  return (
    <div className="bg-[var(--cream)]">
      <PageBannerHero>
        <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
          Our Objectives
        </p>
        <h1 className="display mt-1.5 text-[clamp(1.55rem,7vw,3rem)] font-bold leading-[1.08] text-[var(--forest)]">
          Health
        </h1>
        <p className="mt-2 max-w-[30rem] text-[12px] leading-[1.65] text-[#4A4A4A] sm:text-[13.5px] sm:leading-[1.7]">
          This objective page is coming soon. Explore our Education programmes
          in the meantime.
        </p>
      </PageBannerHero>

      <div className="page-shell py-10 text-center sm:py-12">
        <Link
          href="/objective/education"
          className="inline-flex rounded-full bg-[var(--forest)] px-5 py-2.5 text-[12.5px] font-bold text-white"
        >
          View Education
        </Link>
      </div>
    </div>
  );
}
