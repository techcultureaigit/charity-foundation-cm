import type { Metadata } from "next";
import { connection } from "next/server";
import { getPage, getPublishedMedia } from "@/lib/services/content";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const page = await getPage("about");
  return {
    title: page.seoTitle,
    description: page.seoDescription,
  };
}

const values = [
  { title: "Service", text: "A commitment to helping those who need support." },
  {
    title: "Cooperation",
    text: "Working together for the balanced development of society.",
  },
  {
    title: "Empowerment",
    text: "Encouraging women and children to realize their potential.",
  },
  {
    title: "Dignity",
    text: "Respecting every individual and their right to a better life.",
  },
  {
    title: "Self-Reliance",
    text: "Supporting individuals and families in becoming more independent.",
  },
];

const objectives = [
  "Promote the upliftment and welfare of weaker sections of society.",
  "Provide assistance and support to poor and deprived families.",
  "Encourage the physical, mental, and moral development of children.",
  "Support opportunities for women to become socially and financially self-reliant.",
  "Help financially disadvantaged families address their children’s education and health needs.",
  "Encourage collective cooperation for balanced development.",
  "Contribute towards positive social change and a life of dignity for all.",
];

export default async function AboutPage() {
  await connection();
  const [page, aboutMedia] = await Promise.all([
    getPage("about"),
    getPublishedMedia("about"),
  ]);
  const photo = aboutMedia[0];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">
        About Us
      </p>
      <h1 className="display mt-3 max-w-3xl text-5xl text-[var(--forest)]">
        {page.headline}
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--muted)]">
        {page.body}
      </p>

      {photo ? (
        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.url}
            alt={photo.alt}
            className="max-h-[420px] w-full object-cover"
          />
        </div>
      ) : null}

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-[var(--border)] bg-white p-6">
          <h2 className="display text-3xl text-[var(--forest)]">Our Inspiration</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            The foundation draws inspiration from Mrs. Geeta Dhami and her
            determination towards public service — especially for poor and
            helpless families, women, and children.
          </p>
        </article>
        <article className="rounded-2xl border border-[var(--border)] bg-white p-6">
          <h2 className="display text-3xl text-[var(--forest)]">Vision & Mission</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            <strong className="text-[var(--charcoal)]">Vision:</strong> A
            balanced and inclusive society where every individual can live with
            dignity and become self-reliant.
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            <strong className="text-[var(--charcoal)]">Mission:</strong> To serve
            and support poor, helpless, and deprived families through
            empowerment, education, health, and social well-being.
          </p>
        </article>
      </section>

      <section id="objectives" className="mt-12 scroll-mt-8">
        <h2 className="display text-3xl text-[var(--forest)]">Our Objectives</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {objectives.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm leading-6 text-[var(--muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section id="values" className="mt-12 scroll-mt-8">
        <h2 className="display text-3xl text-[var(--forest)]">Our Values</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-2xl border border-[var(--border)] bg-white p-5"
            >
              <h3 className="text-base font-medium text-[var(--forest)]">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {value.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
