import type { Metadata } from "next";
import { connection } from "next/server";
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
    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">
        Our Work
      </p>
      <h1 className="display mt-3 max-w-3xl text-5xl text-[var(--forest)]">
        {page.headline}
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--muted)]">
        {page.body}
      </p>

      <div className="mt-10 space-y-4">
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
  );
}
