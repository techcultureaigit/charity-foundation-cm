import { ContactForm } from "@/components/forms/ContactForm";
import { AccentText, LeafCorner } from "@/components/home/shared";
import { PageBannerHero } from "@/components/site/PageBannerHero";
import { UtilityIcon } from "@/components/site/icons";
import type { ContactSettings, PageContent } from "@/lib/types";

/** Defence Colony Sector-3 — coords keep pin correct without broken place panel. */
const OFFICE_MAP = {
  lat: 30.282411,
  lng: 78.051671,
};

function mapEmbedUrl(_address: string) {
  // Plain lat,lng embed (no place-id / label) — avoids "Place info couldn't load"
  return `https://maps.google.com/maps?q=${OFFICE_MAP.lat},${OFFICE_MAP.lng}&z=17&hl=en&output=embed`;
}

/** Force address into exactly 2 display lines (reference style). */
function addressTwoLines(address: string): [string, string] {
  // Collapse DB newlines / extra spaces first — those were causing 4–5 lines
  const raw = (address || "").replace(/\s+/g, " ").trim();
  if (!raw) return ["", ""];

  const near = raw.match(/^(.*?),\s*(Near\b.*)$/i);
  let line1: string;
  let line2: string;
  if (near) {
    line1 = `${near[1].trim()},`;
    line2 = near[2].trim();
  } else {
    const parts = raw.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length <= 2) return [raw, ""];
    const mid = Math.ceil(parts.length / 2);
    line1 = `${parts.slice(0, mid).join(", ")},`;
    line2 = parts.slice(mid).join(", ");
  }

  line2 = line2
    .replace(/,?\s*Uttarakhand\s*[-–]?\s*/i, " ")
    .replace(/,?\s*India\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  return [line1, line2];
}

export function ContactPageView({
  page,
  contact,
  heroImageUrl,
}: {
  page: PageContent;
  contact: ContactSettings;
  heroImageUrl: string;
}) {
  const accent = page.heroAccentWords || "Us";
  const [addressLine1, addressLine2] = addressTwoLines(contact.address);
  const info = [
    {
      icon: "pin" as const,
      title: "Our Address",
      lines: [addressLine1, addressLine2].filter(Boolean),
      href: undefined as string | undefined,
    },
    {
      icon: "phone" as const,
      title: "Call Us",
      lines: [contact.phone],
      href: `tel:${contact.phone.replace(/[^+\d]/g, "")}`,
    },
    {
      icon: "mail" as const,
      title: "Email Us",
      lines: [contact.email],
      href: `mailto:${contact.email}`,
    },
  ];

  return (
    <div className="bg-[var(--cream)]">
      <PageBannerHero
        imageUrl={heroImageUrl}
        contentClassName="w-full max-w-[32rem] sm:max-w-[34rem]"
      >
        <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
          Get in Touch
        </p>
        <h1 className="display mt-1.5 text-[clamp(1.7rem,7vw,3.25rem)] font-bold leading-[1.05] text-[var(--forest)] sm:mt-2">
          <AccentText
            text={page.headline || "Contact Us"}
            accent={accent}
            accentClass="text-[#D68C23]"
          />
        </h1>
        <p className="mt-2 max-w-[28rem] line-clamp-3 text-[12px] leading-[1.65] text-[#4A4A4A] sm:mt-2.5 sm:line-clamp-none sm:text-[13.5px] sm:leading-[1.7]">
          {page.body}
        </p>
      </PageBannerHero>

      {/* Form + info + map — leaf paati bottom corners both sides */}
      <section className="relative overflow-hidden bg-[var(--cream)] py-10 sm:py-12 lg:py-14">
        <LeafCorner corner="bl" tone="forest" className="opacity-80" />
        <LeafCorner corner="br" tone="forest" className="opacity-75" />

        {/*
          Reference layout:
          LEFT  ? Send Us a Message form
          RIGHT ? Our Contact Information (Address | Call | Email)
                  + Find Us on Map
        */}
        <div className="page-shell relative z-[1] grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8 lg:items-start">
          <ContactForm />

          <div className="space-y-1">
            <div>
              <h2 className="text-[clamp(1.1rem,2.4vw,1.65rem)] font-bold text-[var(--forest)]">
                Our Contact Information
              </h2>
              <p className="mt-1 text-[13.5px] leading-snug text-[var(--muted)]">
                Feel free to reach out to us through any of the following
                channels.
              </p>

              {/*
                Address: exactly 2 lines (smaller font + nowrap).
                Phone + email: single line each (nowrap + compact font).
              */}
              {/* Call Us = max-content (shifts left); Email gets leftover width */}
              <div className="mt-1 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.15fr)_max-content_minmax(0,1.55fr)] lg:gap-0">
                {info.map((item, index) => {
                  const isAddress = item.title === "Our Address";
                  const isCall = item.title === "Call Us";
                  const isEmail = item.title === "Email Us";
                  const bodySize = isAddress
                    ? "text-[10px]"
                    : isEmail
                      ? "text-[9.5px]"
                      : "text-[11px]";
                  const body = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3E0C8]">
                        <UtilityIcon
                          name={item.icon}
                          className="h-5 w-5 text-[#D97706]"
                        />
                      </span>
                      <span
                        className={`min-w-0 flex-1 ${
                          isEmail ? "overflow-visible" : "overflow-hidden"
                        }`}
                      >
                        <span className="block text-[13px] font-semibold leading-none text-[#D97706]">
                          {item.title}
                        </span>
                        <span
                          className={`mt-1.5 block leading-[1.45] text-[#4B5563] ${bodySize}`}
                        >
                          {item.lines.map((line) => (
                            <span
                              key={line}
                              className="block break-words sm:whitespace-nowrap"
                            >
                              {line}
                            </span>
                          ))}
                        </span>
                      </span>
                    </>
                  );
                  // Call Us: tight left pad (shift left); Address: less right pad → email space
                  const className = `relative flex min-w-0 items-start gap-2 ${
                    index > 0
                      ? `lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:h-[70%] lg:before:w-px lg:before:-translate-y-1/2 lg:before:bg-[#E5E0D8] ${
                          isCall ? "lg:pl-2.5" : "lg:pl-3"
                        }`
                      : ""
                  } ${
                    isAddress
                      ? "lg:pr-2.5"
                      : isCall
                        ? "lg:pr-2.5"
                        : ""
                  }`;
                  return item.href ? (
                    <a
                      key={item.title}
                      href={item.href}
                      className={`${className} transition-opacity hover:opacity-80`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div key={item.title} className={className}>
                      {body}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-[clamp(1.45rem,2vw,1.85rem)] font-bold text-[var(--forest)]">
                Find Us on Map
              </h3>
              <p className="mt-2 text-[13px] text-[var(--muted)]">
                Visit our office location on Google Maps.
              </p>
              <div className="mt-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_8px_24px_rgba(0,51,43,0.05)]">
                <iframe
                  title="Sewa Sankalp Foundation location"
                  src={mapEmbedUrl(contact.address)}
                  className="h-[260px] w-full border-0 sm:h-[300px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
