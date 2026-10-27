import Link from "next/link";
import { IconByKey, UtilityIcon } from "@/components/site/icons";
import type { EventItem, EventTheme, PageContent } from "@/lib/types";
import {
  AccentText,
  CornerSweep,
  EyebrowTitle,
  LeafCorner,
  SmartImage,
  splitDate,
} from "./shared";

const themes: Record<
  EventTheme,
  { icon: string; footer: string; arrow: string; tint: string }
> = {
  green: {
    icon: "bg-[#dcebd8] text-[#3c7a4c]",
    footer: "bg-[#eef5ea]",
    arrow: "bg-[var(--forest)] text-white",
    tint: "from-[#cfe3c7] to-[#a9cfa3]",
  },
  blue: {
    icon: "bg-[#d9e8f8] text-[#3b6fc0]",
    footer: "bg-[#eaf2fc]",
    arrow: "bg-[#cfe1f7] text-[#3b6fc0]",
    tint: "from-[#c5d9f3] to-[#abc6ec]",
  },
  red: {
    icon: "bg-[#fadcd8] text-[#d2584a]",
    footer: "bg-[#fdeeeb]",
    arrow: "bg-[#f9d3cd] text-[#d2584a]",
    tint: "from-[#f8cfc7] to-[#f1b0a4]",
  },
};

function DateBadge({ label }: { label: string }) {
  const { day, month, year } = splitDate(label);
  return (
    <div className="absolute right-2.5 top-2.5 z-10 rounded-lg bg-white px-2 py-1.5 text-center shadow-md">
      <UtilityIcon name="calendar" className="mx-auto h-3 w-3 text-[var(--gold)]" />
      <span className="display block text-[1.25rem] font-bold leading-none text-[var(--forest)]">
        {day}
      </span>
      {month ? (
        <span className="block text-[9px] font-semibold uppercase leading-tight tracking-wide text-[var(--forest)]">
          {month}
          <br />
          {year}
        </span>
      ) : null}
    </div>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const theme = themes[event.theme] ?? themes.green;
  return (
    <Link
      href={event.href || "/get-involved"}
      className="hover-lift group flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-[var(--border)] bg-white shadow-[0_8px_22px_rgba(0,51,43,0.07)]"
    >
      <div className="relative h-36 w-full sm:h-40">
        <SmartImage
          src={event.imageUrl}
          alt={event.title}
          hint="Add photo in Admin → Events"
          tint={theme.tint}
          className="h-full w-full"
          imgClassName="object-[center_30%] transition-transform duration-500 group-hover:scale-105"
        />
        {/* soft wave into card body */}
        <svg
          viewBox="0 0 400 40"
          preserveAspectRatio="none"
          className="absolute -bottom-px left-0 h-8 w-full text-white"
          aria-hidden
        >
          <path d="M0 22C80 4 140 4 210 18s120 20 190-2v24H0Z" fill="currentColor" />
        </svg>
        {event.isFeatured ? (
          <span className="absolute left-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-[var(--forest)] px-2.5 py-1 text-[10px] font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            Featured Event
          </span>
        ) : null}
        {event.dateLabel ? <DateBadge label={event.dateLabel} /> : null}
      </div>

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-0">
        <span
          className={`relative z-10 -mt-6 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white shadow ${theme.icon}`}
        >
          <IconByKey iconKey={event.iconKey} className="h-4 w-4" />
        </span>
        <h3 className="display mt-2 text-[1.2rem] font-bold leading-tight text-[var(--forest)] sm:text-[1.28rem]">
          {event.title}
        </h3>
        <p className="mb-3 mt-1.5 line-clamp-3 text-[12px] leading-[1.55] text-[var(--charcoal)]/78">
          {event.description}
        </p>

        <div
          className={`mt-auto flex items-center gap-1.5 rounded-lg px-2 py-1.5 ${theme.footer}`}
        >
          <div className="flex min-w-0 flex-1 items-center gap-1 text-[10px] leading-tight text-[var(--forest)]">
            <UtilityIcon name="pin" className="h-3 w-3 shrink-0" />
            <span className="min-w-0">
              <span className="block text-[9px] opacity-70">Location</span>
              <span className="block truncate font-semibold">{event.location}</span>
            </span>
          </div>
          <span className="h-6 w-px bg-[var(--forest)]/15" />
          <div className="flex min-w-0 flex-1 items-center gap-1 text-[10px] leading-tight text-[var(--forest)]">
            <UtilityIcon name="ticket" className="h-3 w-3 shrink-0" />
            <span className="min-w-0">
              <span className="block text-[9px] opacity-70">Ticket</span>
              <span className="block truncate font-semibold">{event.ticketInfo}</span>
            </span>
          </div>
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 ${theme.arrow}`}
          >
            <UtilityIcon name="arrow" className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function EventsSection({
  page,
  events,
}: {
  page: PageContent;
  events: EventItem[];
}) {
  const extras = page.extras ?? {};
  if (events.length === 0) return null;

  const cards = events.slice(0, 3);
  const features = [1, 2, 3].map((n) => ({
    title: extras[`eventsFeature${n}Title`],
    body: extras[`eventsFeature${n}Body`],
  }));
  const featureIcons = ["calendar", "volunteer", "leaf"] as const;

  return (
    <section className="relative overflow-hidden bg-[var(--cream)] pt-3 sm:pt-4">
      <LeafCorner corner="tl" />
      <LeafCorner corner="bl" className="opacity-50" />
      <LeafCorner corner="br" className="opacity-45" />
      {/* Green layer — both bottom corners + full bottom wave */}
      <CornerSweep side="left" />
      <CornerSweep side="right" />

      <div className="page-shell relative z-[1] pb-5 sm:pb-6">
        <div className="relative">
          <EyebrowTitle
            className="!mt-0"
            eyebrow={extras.eventsEyebrow}
            headline={extras.eventsHeadline ?? ""}
            accent={extras.eventsAccentWords}
          />
          <Link
            href={extras.eventsViewAllHref || "/get-involved"}
            className="btn-outline mt-4 flex w-fit bg-white px-4 py-2 text-[12.5px] lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2"
          >
            {extras.eventsViewAllLabel}
            <UtilityIcon name="arrow" className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-6 grid items-start gap-5 lg:mt-7 lg:grid-cols-[0.9fr_1fr_1fr_1fr] lg:gap-4">
          <div className="lg:pr-2 lg:pt-2">
            <p className="flex items-center gap-2.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[var(--gold)] sm:text-[11px]">
              {extras.eventsSideLabel}
              <span className="h-px w-7 bg-[var(--gold)]/60" />
            </p>
            <h3 className="display mt-3 text-[clamp(1.7rem,2.6vw,2.35rem)] font-bold leading-[1.08] text-[var(--forest)]">
              <AccentText
                text={extras.eventsSideHeadline ?? ""}
                accent={extras.eventsSideAccent}
              />
            </h3>
            <p className="mt-3 text-[13px] leading-[1.7] text-[var(--charcoal)]/82">
              {extras.eventsSideBody}
            </p>
            <Link
              href={extras.eventsJoinHref || "/get-involved"}
              className="btn-forest mt-5 px-5 py-2.5 text-[13px]"
            >
              {extras.eventsJoinLabel}
              <UtilityIcon name="arrow" className="h-3.5 w-3.5" />
            </Link>
          </div>

          {cards.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="relative z-[2] mx-auto mt-6 grid max-w-[920px] gap-4 rounded-2xl bg-white/85 px-5 py-3.5 shadow-[0_8px_24px_rgba(0,51,43,0.05)] md:grid-cols-3 md:gap-0">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 md:px-4 ${
                index > 0 ? "md:border-l md:border-[var(--forest)]/12" : ""
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fbeed0] text-[var(--gold-deep)]">
                {featureIcons[index] === "calendar" ? (
                  <UtilityIcon name="calendar" className="h-4 w-4" />
                ) : (
                  <IconByKey iconKey={featureIcons[index]} className="h-4 w-4" />
                )}
              </span>
              <span className="leading-snug">
                <span className="block text-[13px] font-semibold text-[var(--forest)]">
                  {feature.title}
                </span>
                <span className="block text-[12px] text-[var(--charcoal)]/72">
                  {feature.body}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
