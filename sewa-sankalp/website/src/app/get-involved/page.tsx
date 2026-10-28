import type { Metadata } from "next";
import { connection } from "next/server";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { PageBannerHero } from "@/components/site/PageBannerHero";
import { getPage } from "@/lib/services/content";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const page = await getPage("get-involved");
  return {
    title: page.seoTitle,
    description: page.seoDescription,
  };
}

export default async function GetInvolvedPage() {
  await connection();
  const page = await getPage("get-involved");

  return (
    <div className="bg-[var(--cream)]">
      <PageBannerHero>
        <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
          Get Involved
        </p>
        <h1 className="display mt-1.5 text-[clamp(1.55rem,7vw,3rem)] font-bold leading-[1.08] text-[var(--forest)]">
          {page.headline}
        </h1>
        <p className="mt-2 max-w-[30rem] line-clamp-3 text-[12px] leading-[1.65] text-[#4A4A4A] sm:mt-2.5 sm:line-clamp-none sm:text-[13.5px] sm:leading-[1.7]">
          {page.body}
        </p>
      </PageBannerHero>

      <div className="page-shell py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="mt-0 space-y-4">
              <article className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <h2 className="display text-2xl text-[var(--forest)]">
                  Become a Volunteer
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Share your time and skills to support communities and the
                  foundation’s mission.
                </p>
              </article>
              <article className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <h2 className="display text-2xl text-[var(--forest)]">
                  Support Our Mission
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Contact our team to learn more about ways to support the
                  foundation’s work.
                </p>
              </article>
              <article className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <h2 className="display text-2xl text-[var(--forest)]">
                  For potential partners
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  We welcome enquiries from individuals and organisations
                  interested in collaboration.
                </p>
              </article>
            </div>
          </div>

          <div>
            <h2 className="display mb-4 text-3xl text-[var(--forest)]">
              Volunteer enquiry
            </h2>
            <VolunteerForm />
          </div>
        </div>
      </div>
    </div>
  );
}
