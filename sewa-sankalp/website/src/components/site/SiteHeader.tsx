import Link from "next/link";
import { BrandMark } from "@/components/site/BrandMark";
import { HeaderNav } from "@/components/site/HeaderNav";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { SocialIcon, UtilityIcon } from "@/components/site/icons";
import type { ContactSettings } from "@/lib/types";

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
};

export function SiteHeader({ contact }: { contact: ContactSettings }) {
  const links = contact?.socialLinks ?? {};
  const socials = socialOrder
    .map(([key, label]) => ({
      key,
      label,
      href: links[key] || socialFallback[key],
    }))
    .filter((item) => Boolean(item.href))
    .slice(0, 4);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(0,51,43,0.08)]">
      {/* Top bar — Follow Us left · email + phone together on right */}
      <div className="bg-[var(--forest)] text-white">
        <div className="page-shell flex items-center justify-between gap-x-2 py-1.5 text-[11px] font-normal sm:gap-x-4 sm:py-2 sm:text-[13.5px]">
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2.5">
            <span className="hidden font-normal text-white sm:inline">
              Follow Us:
            </span>
            <div className="flex items-center gap-2 sm:gap-3">
              {socials.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="text-white transition-colors hover:text-[var(--gold)]"
                >
                  <SocialIcon name={item.key} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="ml-auto flex min-w-0 max-w-[72%] items-center justify-end gap-x-2 sm:max-w-none sm:gap-x-5">
            <LanguageSwitcher tone="light" mountWidget />
            <a
              href={`mailto:${contact.email}`}
              className="hidden min-w-0 items-center gap-1.5 font-normal text-white transition-colors hover:text-[var(--gold)] sm:flex sm:gap-2 md:max-w-none"
            >
              <UtilityIcon name="mail" className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              <span className="truncate sm:overflow-visible sm:whitespace-normal">
                {contact.email}
              </span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              aria-label={`Email ${contact.email}`}
              className="flex items-center text-white transition-colors hover:text-[var(--gold)] sm:hidden"
            >
              <UtilityIcon name="mail" className="h-3.5 w-3.5" />
            </a>
            <a
              href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-1 font-normal text-white transition-colors hover:text-[var(--gold)] sm:gap-2"
            >
              <UtilityIcon name="phone" className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              <span className="truncate text-[10.5px] sm:whitespace-nowrap sm:text-[inherit]">
                {contact.phone}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Logo + orange nav — overflow visible so dropdowns show */}
      <div className="relative overflow-visible border-t border-white/0 bg-white">
        <div className="relative flex items-center gap-2 overflow-visible py-1.5 pl-[max(0.75rem,calc((100%-var(--page-max))/2+var(--page-gutter)))] pr-3 sm:gap-4 sm:py-2.5 sm:pr-0">
          <Link
            href="/"
            aria-label="Sewa Sankalp Foundation home"
            className="min-w-0 shrink"
          >
            <BrandMark />
          </Link>
          <HeaderNav />
        </div>
      </div>
    </header>
  );
}
