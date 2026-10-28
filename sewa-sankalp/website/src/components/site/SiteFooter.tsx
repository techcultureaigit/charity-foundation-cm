import Link from "next/link";
import { BrandMark } from "@/components/site/BrandMark";
import { SocialIcon, UtilityIcon } from "@/components/site/icons";
import type { ContactSettings, MediaItem } from "@/lib/types";

const importantLinks = [
  { label: "About Us", href: "/about" },
  { label: "Company Profile", href: "/about#objectives" },
  { label: "Our Services", href: "/our-work" },
  { label: "Contact Us", href: "/impact-contact" },
  { label: "Read Blog", href: "/blog" },
];

/** Static headline list (matches mockup); links to Our Work. */
const globalNews = [
  "100 Children Rescue from War Zone",
  "THR Fresh House Child",
  "Create Awareness in Education",
  "What Happen When We Live!",
  "Read Blog",
];

const socialOrder = [
  ["facebook", "Facebook"],
  ["instagram", "Instagram"],
  ["youtube", "YouTube"],
  ["linkedin", "LinkedIn"],
  ["twitter", "Twitter"],
] as const;

const socialFallback: Record<string, string> = {
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
};

const galleryFallbacks = [
  "/uploads/event-01-planting.jpg",
  "/uploads/event-02-education.jpg",
  "/uploads/event-03-elderly.jpg",
  "/uploads/cause-03-welfare.jpg",
];

function FooterHeading({ children }: { children: string }) {
  return (
    <div>
      <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--gold)] sm:text-[12.5px]">
        {children}
      </h3>
      <span className="mt-2 block h-px w-10 bg-[var(--gold)]" />
    </div>
  );
}

/** Soft leaf watermark — reference corners. */
function FooterLeaf({ side }: { side: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 140 190"
      className={`pointer-events-none absolute bottom-4 h-36 w-24 text-[#E8C98A]/25 sm:bottom-6 sm:h-44 sm:w-28 lg:h-52 lg:w-32 ${
        side === "left" ? "left-0 sm:left-1" : "right-0 sm:right-1 -scale-x-100"
      }`}
    >
      <path
        d="M68 10C32 42 20 90 58 178c32-48 42-96 10-168Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M60 32v128M60 62l-18-14M60 62l18-14M60 92l-20-16M60 92l20-16M60 122l-16-14M60 122l16-14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M32 55C12 80 10 112 34 148c14-32 16-58-2-93Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        opacity="0.8"
      />
      <path
        d="M88 48C108 72 112 104 92 138c-10-28-12-52-4-90Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.05"
        opacity="0.55"
      />
    </svg>
  );
}

export function SiteFooter({
  contact,
  gallery = [],
  year,
}: {
  contact: ContactSettings;
  gallery?: MediaItem[];
  /** Passed from a dynamic parent (Date is not allowed in prerendered output). */
  year?: number;
}) {
  const links = contact?.socialLinks ?? {};
  const socials = socialOrder
    .map(([key, label]) => ({
      key,
      label,
      href: links[key] || socialFallback[key],
    }))
    .filter((item) => Boolean(item.href));

  const tiles = Array.from({ length: 4 }, (_, index) => {
    const item = gallery[index];
    return {
      id: item?.id ?? `fallback-${index}`,
      url: item?.url || galleryFallbacks[index],
      alt: item?.alt || "Gallery photo",
    };
  });

  const tagline =
    contact.footerTagline || "Together for a Brighter Tomorrow";

  return (
    <footer className="relative -mt-px overflow-hidden bg-[var(--forest)] text-white">
      <FooterLeaf side="left" />
      <FooterLeaf side="right" />

      <div className="page-shell relative z-[1] pb-7 pt-7 lg:pb-8 lg:pt-8">
        {/* Contact row */}
        <div className="grid gap-5 md:grid-cols-3 md:gap-0">
          {[
            { icon: "pin" as const, text: contact.address, href: undefined },
            {
              icon: "phone" as const,
              text: contact.phone,
              href: `tel:${contact.phone.replace(/[^+\d]/g, "")}`,
            },
            {
              icon: "mail" as const,
              text: contact.email,
              href: `mailto:${contact.email}`,
            },
          ].map((item, index) => {
            const body = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/65 text-[var(--gold)] sm:h-11 sm:w-11">
                  <UtilityIcon name={item.icon} className="h-[1.15rem] w-[1.15rem]" />
                </span>
                <span className="min-w-0 text-[12.5px] leading-snug text-white/90 sm:text-[13px]">
                  {item.text}
                </span>
              </>
            );
            const base = `flex items-start gap-3.5 md:items-center md:px-5 lg:px-6 ${
              index > 0 ? "md:border-l md:border-white/20" : "md:pl-0"
            }`;
            return item.href ? (
              <a
                key={item.icon}
                href={item.href}
                className={`${base} transition-colors hover:text-[var(--gold)]`}
              >
                {body}
              </a>
            ) : (
              <div key={item.icon} className={base}>
                {body}
              </div>
            );
          })}
        </div>

        <div className="my-7 h-px bg-white/15 lg:my-8" />

        {/* 4 columns */}
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-4 lg:gap-7 xl:gap-9">
          {/* Branding */}
          <div className="lg:pr-2">
            <BrandMark tone="light" />
            <p className="mt-4 max-w-[18rem] text-[13px] leading-[1.75] text-white/78">
              Dedicated to the upliftment of the weaker sections of society
              through service, cooperation and social welfare initiatives.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {socials.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/55 text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-[var(--forest)]"
                >
                  <SocialIcon name={item.key} className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>

            {/* Slogan image */}
            <div className="mt-6 max-w-[15rem] sm:mt-7 sm:max-w-[17rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/uploads/footer-slogan.png"
                alt={tagline}
                className="h-auto w-full mix-blend-screen"
              />
            </div>
          </div>

          {/* Important links */}
          <div>
            <FooterHeading>Important Links</FooterHeading>
            <ul className="mt-5 space-y-3.5 text-[13px] text-white/88">
              {importantLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-[var(--gold)]"
                  >
                    <UtilityIcon
                      name="chevron"
                      className="h-3 w-3 text-[var(--gold)] transition-transform group-hover:translate-x-0.5"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* News */}
          <div>
            <FooterHeading>Global Update News</FooterHeading>
            <ul className="mt-5 space-y-3.5 text-[13px] text-white/88">
              {globalNews.map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Read Blog" ? "/blog" : "/our-work"}
                    className="group inline-flex items-start gap-2 transition-colors hover:text-[var(--gold)]"
                  >
                    <UtilityIcon
                      name="chevron"
                      className="mt-1 h-3 w-3 shrink-0 text-[var(--gold)]"
                    />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gallery */}
          <div>
            <div className="flex items-end justify-between gap-3">
              <FooterHeading>Photo Gallery</FooterHeading>
              <Link
                href="/gallery"
                className="mb-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--gold)]/70 px-3.5 py-1.5 text-[11.5px] font-semibold tracking-wide text-white transition-colors hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--forest)]"
              >
                View All
                <UtilityIcon name="arrow" className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {tiles.map((item) => (
                <Link
                  key={item.id}
                  href="/gallery"
                  className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[1] border-t border-white/15 bg-[var(--forest-deep)]">
        <div className="page-shell flex flex-wrap items-center justify-between gap-3 py-3.5 text-[12px] text-white/75">
          <p>
            © {year ? `${year} ` : ""}Sewa Sankalp Foundation. All Rights
            Reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link href="/impact-contact" className="hover:text-[var(--gold)]">
              Privacy Policy
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/impact-contact" className="hover:text-[var(--gold)]">
              Terms &amp; Conditions
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/" className="hover:text-[var(--gold)]">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
