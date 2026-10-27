import type { Metadata } from "next";
import { connection } from "next/server";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
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
    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">
            Get Involved
          </p>
          <h1 className="display mt-3 text-5xl text-[var(--forest)]">
            {page.headline}
          </h1>
          <p className="mt-5 text-base leading-7 text-[var(--muted)]">
            {page.body}
          </p>

          <div className="mt-8 space-y-4">
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
  );
}
