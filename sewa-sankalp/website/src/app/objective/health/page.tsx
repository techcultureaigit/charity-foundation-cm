import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Health | Our Objectives",
  description: "Health & welfare programmes by Sewa Sankalp Foundation.",
};

export default function HealthObjectivePage() {
  return (
    <div className="page-shell bg-[var(--cream)] py-16 text-center">
      <p className="nav-bar text-[11px] font-bold uppercase tracking-[0.2em] text-[#D68C23]">
        Our Objectives
      </p>
      <h1 className="display mt-2 text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[var(--forest)]">
        Health
      </h1>
      <p className="mx-auto mt-3 max-w-lg text-[14px] text-[var(--muted)]">
        This objective page is coming soon. Explore our Education programmes in
        the meantime.
      </p>
      <Link
        href="/objective/education"
        className="mt-6 inline-flex rounded-full bg-[var(--forest)] px-5 py-2.5 text-[12.5px] font-bold text-white"
      >
        View Education
      </Link>
    </div>
  );
}
