import { ContactForm } from "@/components/forms/ContactForm";
import { UtilityIcon } from "@/components/site/icons";
import { AccentText, LeafCorner } from "@/components/home/shared";
import type { ContactSettings, PageContent } from "@/lib/types";

/** Defence Colony Sector-3 pin (Near Vidhan Sabha alone geocodes wrong). */
const OFFICE_MAP = {
  lat: 30.282411,
  lng: 78.051671,
  query:
    "C-97, Sector-3, Defence Colony, Near Vidhan Sabha, Dehradun 248002",
};

function mapEmbedUrl(address: string) {
  const cleaned = (address || "").replace(/\s+/g, " ").trim();
  const label =
    cleaned && /defence\s*colony/i.test(cleaned)
      ? cleaned
      : OFFICE_MAP.query;
  // Pin by coords so "Near Vidhan Sabha" doesn't land on Darshan Lal Chowk
  const q = encodeURIComponent(
    `${OFFICE_MAP.lat},${OFFICE_MAP.lng} (${label})`,
  );
  return `https://maps.google.com/maps?q=${q}&z=17&hl=en&output=embed`;
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
      {/*
        Compact wide hero — banner asset is full-bleed (kids frame baked in).
        Text sits on the cream left; keep height short like the reference.
      */}
      <section className="relative w-full overflow-hidden bg-[#FDF8EE] leading-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImageUrl}
          alt=""
          aria-hidden
          className="m-0 block h-[240px] w-full max-w-none object-cover object-[85%_center] sm:h-[230px] sm:object-right lg:h-[260px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#FDF8EE] from-[0%] via-[#FDF8EE] via-[48%] to-transparent to-[78%] sm:from-[#FDF8EE]/70 sm:via-[#FDF8EE]/30 sm:to-transparent"
        />

        <div className="pointer-events-none absolute inset-0 z-[2] flex items-center">
          {/*
            Hero copy sits BELOW the header, in the cream area left of the kids.
            Nudged slightly toward center — not into the orange nav, not over the photo.
          */}
          <div className="page-shell pointer-events-auto flex w-full justify-start">
            <div className="w-full max-w-[32rem] py-3 sm:max-w-[34rem] sm:py-4">
              {/* Reference: mustard overline · serif headline · grey body */}
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
            </div>
          </div>
        </div>
      </section>

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
        <div className="page-shell relative z-[1] grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 lg:items-start">
          <ContactForm />

          <div className="space-y-1">
            <div>
              <h2 className="text-[clamp(1.65rem,2.4vw,1.1rem)] font-bold text-[var(--forest)]">
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
              <div className="mt-1 grid grid-cols-1 gap-4 min-[520px]:grid-cols-[minmax(0,1.4fr)_minmax(0,0.85fr)_minmax(0,1.15fr)] min-[520px]:gap-0">
                {info.map((item, index) => {
                  const isAddress = item.title === "Our Address";
                  const isEmail = item.title === "Email Us";
                  const bodySize = isAddress
                    ? "text-[10px]"
                    : isEmail
                      ? "text-[10px]"
                      : "text-[11px]";
                  const body = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3E0C8]">
                        <UtilityIcon
                          name={item.icon}
                          className="h-5 w-5 text-[#D97706]"
                        />
                      </span>
                      <span className="min-w-0 flex-1 overflow-hidden">
                        <span className="block text-[13px] font-semibold leading-none text-[#D97706]">
                          {item.title}
                        </span>
                        <span
                          className={`mt-1.5 block leading-[1.45] text-[#4B5563] ${bodySize}`}
                        >
                          {item.lines.map((line) => (
                            <span
                              key={line}
                              className="block whitespace-nowrap"
                            >
                              {line}
                            </span>
                          ))}
                        </span>
                      </span>
                    </>
                  );
                  const className = `relative flex min-w-0 items-start gap-2.5 ${
                    index > 0
                      ? "min-[520px]:pl-3.5 min-[520px]:before:absolute min-[520px]:before:left-0 min-[520px]:before:top-1/2 min-[520px]:before:h-[70%] min-[520px]:before:w-px min-[520px]:before:-translate-y-1/2 min-[520px]:before:bg-[#E5E0D8]"
                      : ""
                  } ${index < info.length - 1 ? "min-[520px]:pr-3.5" : ""}`;
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
