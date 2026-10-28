"use client";

import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import {
  FaHandHoldingHeart,
  FaSeedling,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { AccentText } from "@/components/home/shared";
import { PageBannerHero } from "@/components/site/PageBannerHero";
import { UtilityIcon } from "@/components/site/icons";
import {
  CAMPAIGN_FILTERS,
  CAMPAIGNS,
  FEATURED_CAMPAIGN,
  campaignPct,
  formatInr,
  type Campaign,
  type CampaignCategoryId,
} from "@/lib/content/campaigns";

function ProgressBlock({
  raised,
  target,
}: {
  raised: number;
  target: number;
}) {
  const pct = campaignPct(raised, target);
  return (
    <div>
      <div
        className="relative h-2 overflow-hidden rounded-full bg-[#ebe4d8]"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="relative h-full rounded-full bg-[var(--forest)]"
          style={{ width: `${pct}%` }}
        >
          <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] font-bold leading-none text-white">
            {pct}%
          </span>
        </div>
      </div>
      <div className="mt-2.5 flex justify-between gap-3">
        <div>
          <p className="text-[13px] font-bold text-[var(--forest)]">
            {formatInr(raised)}
          </p>
          <p className="mt-0.5 text-[11px] text-[#6B6B6B]">Raised</p>
        </div>
        <div className="text-right">
          <p className="text-[13px] font-bold text-[var(--forest)]">
            {formatInr(target)}
          </p>
          <p className="mt-0.5 text-[11px] text-[#6B6B6B]">Target</p>
        </div>
      </div>
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-[#E8DFD0] bg-white shadow-[0_6px_20px_rgba(0,51,43,0.05)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#e8e2d6]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={campaign.image}
          alt={campaign.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[var(--forest)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          Ongoing
        </span>
      </div>
      <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
        <h3 className="text-[1.05rem] font-bold leading-snug text-[var(--forest)] sm:text-[1.1rem]">
          {campaign.title}
        </h3>
        <p className="mt-2 flex-1 text-[12.5px] leading-[1.6] text-[#6B6B6B]">
          {campaign.description}
        </p>
        <div className="mt-4">
          <ProgressBlock raised={campaign.raised} target={campaign.target} />
        </div>
        <Link
          href="/get-involved"
          className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#D68C23] px-4 py-2.5 text-[12.5px] font-semibold text-[#D68C23] transition-colors hover:bg-[#D68C23] hover:text-white"
        >
          View Campaign
          <UtilityIcon name="arrow" className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

const pageStats: {
  Icon: ComponentType<{ className?: string }>;
  value: string;
  label: string;
}[] = [
  { Icon: FaUsers, value: "500+", label: "Campaigns" },
  { Icon: FaHandHoldingHeart, value: "1,000+", label: "People Helped" },
  { Icon: FaUser, value: "50+", label: "Volunteers" },
  { Icon: FaSeedling, value: "100+", label: "Communities Reached" },
];

export function CampaignsPageView() {
  const [active, setActive] = useState<CampaignCategoryId>("all");

  const filtered = useMemo(() => {
    const list =
      active === "all"
        ? CAMPAIGNS
        : CAMPAIGNS.filter((c) => c.category === active);
    /* Reference shows a clean 4-up row on “All”; keep full list when filtering */
    return active === "all" ? list.slice(0, 4) : list;
  }, [active]);

  const featured = FEATURED_CAMPAIGN;
  const featuredPct = campaignPct(featured.raised, featured.target);

  return (
    <div className="bg-[#FBF6EE]">
      <PageBannerHero>
        <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
          Our Campaigns
        </p>
        <h1 className="display mt-1.5 text-[clamp(1.55rem,7vw,3rem)] font-bold leading-[1.08] text-[var(--forest)]">
          <span className="block">Every Campaign.</span>
          <span className="block whitespace-nowrap text-[#D68C23]">
            A Brighter Tomorrow.
          </span>
        </h1>
        <p className="mt-2 max-w-[30rem] line-clamp-3 text-[12px] leading-[1.65] text-[#4A4A4A] sm:mt-2.5 sm:line-clamp-none sm:text-[13.5px] sm:leading-[1.7]">
          Together, we can create real change. Our campaigns focus on supporting
          children, empowering women, improving health and strengthening
          communities for a better tomorrow.
        </p>
      </PageBannerHero>

      {/* Filters */}
      <section className="relative bg-white">
        <div className="page-shell flex flex-wrap items-center justify-center gap-2 pt-5 pb-2 sm:gap-2.5 sm:pt-6 sm:pb-3">
          {CAMPAIGN_FILTERS.map((filter) => {
            const on = active === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActive(filter.id)}
                className={`rounded-full px-4 py-2 text-[12px] font-semibold transition-colors sm:text-[12.5px] ${
                  on
                    ? "bg-[var(--forest)] text-white shadow-[0_4px_14px_rgba(0,51,43,0.22)]"
                    : "bg-[#F3EBD9] text-[#3A3A3A] hover:bg-[#E8DFD0]"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      {(active === "all" || active === featured.category) && (
        <section className="relative bg-white pt-5 pb-10 sm:pt-6 sm:pb-12 lg:pb-14">
          <div className="page-shell">
          <div className="overflow-hidden rounded-[1.5rem] bg-[#F3EBD9] shadow-[0_14px_40px_rgba(0,51,43,0.08)] lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:min-h-[400px]">
            <div className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/uploads/featured-campaign-education.jpg"
                alt={featured.title}
                className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
              />
              <span className="absolute left-4 top-4 rounded-md bg-[#D97706] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
                Featured Campaign
              </span>
            </div>

            <div className="flex flex-col justify-center px-4 py-7 sm:px-9 sm:py-10 lg:px-10 lg:py-11">
              <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
                Featured Campaign
              </p>
              <h2 className="display mt-2 text-[clamp(1.6rem,2.5vw,2.15rem)] font-bold text-[var(--forest)]">
                {featured.title}
              </h2>
              {featured.subtitle ? (
                <p className="mt-1.5 text-[15px] font-semibold leading-snug text-[#D68C23]">
                  {featured.subtitle}
                </p>
              ) : null}
              <p className="mt-3 text-[13.5px] leading-[1.7] text-[#4A4A4A]">
                {featured.description}
              </p>

              {featured.highlights ? (
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-2.5">
                  {featured.highlights.map((h) => {
                    const [title, ...rest] = h.label.split("\n");
                    const subtitle = rest.join("\n");
                    return (
                      <div
                        key={h.label}
                        className="flex items-start gap-2.5 text-[12.5px]"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D97706] text-white">
                          <UtilityIcon name={h.icon} className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 font-semibold leading-snug">
                          <span className="block text-[#D97706]">{title}</span>
                          {subtitle ? (
                            <span className="block text-[var(--forest)]">
                              {subtitle}
                            </span>
                          ) : null}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              <div className="mt-6 flex items-center gap-3 sm:gap-4">
                <div className="min-w-0 w-[70%]">
                  <div
                    className="h-3 overflow-hidden rounded-full bg-[#ebe4d8]"
                    role="progressbar"
                    aria-valuenow={featuredPct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full rounded-full bg-[#26624A]"
                      style={{ width: `${featuredPct}%` }}
                    />
                  </div>
                  <div className="mt-2.5 grid grid-cols-3 items-start gap-1 text-[10.5px] sm:text-[12.5px]">
                    <span className="font-semibold leading-snug text-[var(--forest)]">
                      {formatInr(featured.raised)}
                      <span className="mt-0.5 block font-medium text-[#6B6B6B]">
                        Raised
                      </span>
                    </span>
                    <span className="text-center text-[13px] font-bold text-[#26624A] sm:text-[14px]">
                      {featuredPct}%
                    </span>
                    <span className="text-right leading-snug text-[var(--forest)]">
                      {formatInr(featured.target)}
                      <span className="mt-0.5 block font-medium text-[#6B6B6B]">
                        Target
                      </span>
                    </span>
                  </div>
                </div>

                <Link
                  href="/get-involved"
                  className="inline-flex w-[30%] shrink-0 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-[#E8952A] to-[#C46A08] px-2 py-3 text-center text-[10px] font-bold uppercase leading-tight tracking-[0.03em] text-white shadow-[0_10px_24px_rgba(196,106,8,0.4)] transition-[filter,transform] hover:brightness-105 hover:shadow-[0_12px_28px_rgba(196,106,8,0.45)] active:translate-y-px sm:gap-2 sm:px-3 sm:py-3.5 sm:text-[12px] sm:tracking-[0.04em]"
                >
                  <span className="min-w-0">Support This Campaign</span>
                  <UtilityIcon name="arrow" className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                </Link>
              </div>
            </div>
          </div>
          </div>
        </section>
      )}

      {/* Ongoing grid — 4 columns like reference */}
      <section className="relative bg-white pt-5 pb-10 sm:pt-6 sm:pb-12 lg:pt-7 lg:pb-14">
        <div className="page-shell">
          <p className="nav-bar text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
            Our Campaigns
          </p>
          <h2 className="display mt-1.5 text-center text-[clamp(1.55rem,2.4vw,2.05rem)] font-bold text-[var(--forest)]">
            Explore Our Ongoing Initiatives
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-[13px] leading-relaxed text-[#6B6B6B]">
            Be a part of meaningful change. Support a campaign that feels close
            to your heart.
          </p>

          {filtered.length === 0 ? (
            <p className="mt-8 text-center text-[14px] text-[#6B6B6B]">
              No campaigns in this category yet. Try another filter.
            </p>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {filtered.map((c) => (
                <CampaignCard key={c.id} campaign={c} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA + stats — match reference: planting fade + eyebrow + body + side CTA */}
      <section className="relative overflow-hidden bg-white">
        <div className="page-shell relative">
          <div className="relative overflow-hidden rounded-[1.25rem] bg-[#0B3B24] text-white shadow-[0_20px_48px_rgba(0,51,43,0.22)] sm:rounded-[1.5rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uploads/campaign-cta-bg.png"
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-left"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B3B24]/55 via-[#0B3B24]/88 to-[#0B3B24] sm:from-[#0B3B24]/35 sm:via-[#0B3B24]/82 lg:from-transparent lg:via-[#0B3B24]/55 lg:to-[#0B3B24]/92"
            />
            <div className="relative flex flex-col gap-6 px-5 py-8 sm:px-8 sm:py-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-10 xl:pl-[34%] xl:pr-12">
              <div className="max-w-xl">
                <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.2em] text-[#D98A29] sm:text-[11px]">
                  Create a Bigger Impact
                </p>
                <h2 className="display mt-2 text-[clamp(1.55rem,2.6vw,2.15rem)] font-bold leading-[1.2] text-white">
                  <AccentText
                    text="Your Support Creates Lasting Change."
                    accent="Lasting Change."
                    accentClass="text-[#D98A29]"
                  />
                </h2>
                <p className="mt-3 max-w-md text-[13px] leading-relaxed text-white/85 sm:text-[14px]">
                  Every contribution helps us reach more people, support more
                  families and build stronger communities. Join hands with us to
                  make a real difference.
                </p>
              </div>

              <Link
                href="/get-involved"
                className="inline-flex shrink-0 items-center gap-3.5 self-start transition-opacity hover:opacity-90 lg:self-center"
              >
                <span className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] sm:h-[5rem] sm:w-[5rem]">
                  <span className="flex h-[3.15rem] w-[3.15rem] items-center justify-center rounded-full bg-[#E08A1A] text-white sm:h-[3.5rem] sm:w-[3.5rem]">
                    <UtilityIcon name="arrow" className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                </span>
                <span className="text-left text-[13px] font-bold leading-snug text-white sm:text-[14px]">
                  Join Our
                  <br />
                  Mission Today
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="page-shell grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {pageStats.map((stat, index) => {
              const { Icon } = stat;
              return (
                <div
                  key={stat.label}
                  className="relative flex items-center justify-center gap-3.5 px-4 py-6 sm:py-7"
                >
                  {index > 0 ? (
                    <span
                      aria-hidden
                      className="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-[#E5D9C8] lg:block"
                    />
                  ) : null}
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F8E6D2] text-[#D97706] sm:h-16 sm:w-16">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </span>
                  <div className="min-w-0 text-left">
                    <p className="text-[1.55rem] font-bold leading-none text-[#D97706] sm:text-[1.7rem]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[12px] leading-snug text-[#6B7280]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
