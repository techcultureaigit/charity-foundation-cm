import type { Metadata } from "next";
import { connection } from "next/server";
import { PageBannerHero } from "@/components/site/PageBannerHero";
import {
  getPage,
  getPublishedMedia,
  getWorkAreas,
} from "@/lib/services/content";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const page = await getPage("our-work");
  return {
    title: page.seoTitle,
    description: page.seoDescription,
  };
}

export default async function OurWorkPage() {
  await connection();
  const [page, workAreas, workMedia] = await Promise.all([
    getPage("our-work"),
    getWorkAreas(),
    getPublishedMedia("work"),
  ]);

  return (
    <div className="bg-[var(--cream)]">
      <PageBannerHero>
        <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
          Our Work
        </p>
        <h1 className="display mt-1.5 text-[clamp(1.55rem,7vw,3rem)] font-bold leading-[1.08] text-[var(--forest)]">
          {page.headline}
        </h1>
        <p className="mt-2 max-w-[30rem] line-clamp-3 text-[12px] leading-[1.65] text-[#4A4A4A] sm:mt-2.5 sm:line-clamp-none sm:text-[13.5px] sm:leading-[1.7]">
          {page.body}
        </p>
      </PageBannerHero>

      <div className="page-shell py-10 sm:py-12">
        <div className="space-y-4">
          {workAreas.map((area, index) => {
            const photo = workMedia[index % Math.max(workMedia.length, 1)];
            return (
              <article
                key={area.id}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white lg:grid lg:grid-cols-[240px_1fr]"
              >
                {workMedia.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="h-48 w-full object-cover lg:h-full"
                  />
                ) : null}
                <div className="p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">
                    0{index + 1}
                  </p>
                  <h2 className="display mt-2 text-3xl text-[var(--forest)]">
                    {area.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[var(--charcoal)]">
                    {area.subtitle}
                  </p>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
                    {area.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-sm text-[var(--gold)]">
          Service with purpose. Support with compassion. Development for all.
        </p>
      </div>
    </div>
  );
}
