import { ContactForm } from "@/components/forms/ContactForm";
import { UtilityIcon } from "@/components/site/icons";
import { AccentText, LeafCorner } from "@/components/home/shared";
import type { ContactSettings, PageContent } from "@/lib/types";

function mapEmbedUrl(address: string) {
  const q = encodeURIComponent(address || "Dehradun, Uttarakhand, India");
  return `https://maps.google.com/maps?q=${q}&z=15&output=embed`;
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
          className="m-0 block h-[200px] w-full max-w-none object-cover object-right sm:h-[230px] lg:h-[260px]"
        />

        <div className="pointer-events-none absolute inset-0 z-[1] flex items-center">
          {/*
            Hero copy sits BELOW the header, in the cream area left of the kids.
            Nudged slightly toward center — not into the orange nav, not over the photo.
          */}
          <div className="page-shell pointer-events-auto flex w-full justify-start">
            <div className="w-full max-w-[32rem] py-4 sm:max-w-[34rem] sm:pl-[4%] lg:pl-[8%] xl:pl-[10%]">
              {/* Reference: mustard overline · serif headline · grey body */}
              <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
                Get in Touch
              </p>
              <h1 className="display mt-2 text-[clamp(2.15rem,4vw,3.25rem)] font-bold leading-[1.05] text-[#0A2E26]">
                <AccentText
                  text={page.headline || "Contact Us"}
                  accent={accent}
                  accentClass="text-[#D68C23]"
                />
              </h1>
              <p className="mt-2.5 max-w-[28rem] text-[12.5px] leading-[1.7] text-[#4A4A4A] sm:text-[13.5px]">
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
          LEFT  → Send Us a Message form
          RIGHT → Our Contact Information (Address | Call | Email)
                  + Find Us on Map
        */}
        <div className="page-shell relative z-[1] grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:items-start">
          <ContactForm />

          <div className="space-y-8">
            <div>
              <h2 className="display text-[clamp(1.65rem,2.4vw,2.1rem)] font-bold text-[var(--forest)]">
                Our Contact Information
              </h2>
              <p className="mt-1.5 text-[13.5px] leading-snug text-[var(--muted)]">
                Feel free to reach out to us through any of the following
                channels.
              </p>

              {/*
                Address wider col + nowrap → exactly 2 lines.
                Email smaller font so it doesn't steal width.
              */}
              <div className="mt-6 grid grid-cols-1 gap-4 min-[520px]:grid-cols-[1.45fr_0.7fr_0.95fr] min-[520px]:gap-2.5 lg:gap-3">
                {info.map((item) => {
                  const isAddress = item.title === "Our Address";
                  const isEmail = item.title === "Email Us";
                  const body = (
                    <>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3E0C8]">
                        <UtilityIcon
                          name={item.icon}
                          className="h-4 w-4 text-[#D97706]"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-semibold leading-none text-[#D97706]">
                          {item.title}
                        </span>
                        <span
                          className={`mt-1.5 block leading-[1.4] text-[#4B5563] ${
                            isEmail ? "text-[10.5px]" : "text-[11.5px]"
                          }`}
                        >
                          {item.lines.map((line) => (
                            <span
                              key={line}
                              className={
                                isAddress
                                  ? "block whitespace-nowrap"
                                  : isEmail
                                    ? "block break-all"
                                    : "block whitespace-nowrap"
                              }
                            >
                              {line}
                            </span>
                          ))}
                        </span>
                      </span>
                    </>
                  );
                  const className = "flex min-w-0 items-start gap-2";
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

            <div>
              <h3 className="display text-[clamp(1.45rem,2vw,1.85rem)] font-bold text-[var(--forest)]">
                Find Us on Map
              </h3>
              <p className="mt-1 text-[13px] text-[var(--muted)]">
                Visit our office location on Google Maps.
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_8px_24px_rgba(0,51,43,0.05)]">
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
