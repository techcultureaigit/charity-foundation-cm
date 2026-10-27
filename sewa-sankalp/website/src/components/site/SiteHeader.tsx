import Link from "next/link";
import { BrandMark } from "@/components/site/BrandMark";
import { HeaderNav } from "@/components/site/HeaderNav";
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
        <div className="page-shell flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 py-2 text-[13px] font-normal sm:text-[13.5px]">
          <div className="flex items-center gap-2.5">
            <span className="font-normal text-white">Follow Us:</span>
            <div className="flex items-center gap-3">
              {socials.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="text-white transition-colors hover:text-[var(--gold)]"
                >
                  <SocialIcon name={item.key} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-x-6 gap-y-1">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 font-normal text-white transition-colors hover:text-[var(--gold)]"
            >
              <UtilityIcon name="mail" className="h-4 w-4 shrink-0" />
              <span>{contact.email}</span>
            </a>
            <a
              href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-2 font-normal text-white transition-colors hover:text-[var(--gold)]"
            >
              <UtilityIcon name="phone" className="h-4 w-4 shrink-0" />
              {contact.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Logo + orange nav strip to the right edge — overflow visible so dropdowns show */}
      <div className="relative overflow-visible border-t border-white/0 bg-white">
        <div className="relative flex items-center gap-3 overflow-visible py-2 pl-[max(1rem,calc((100%-var(--page-max))/2+var(--page-gutter)))] pr-0 sm:gap-4 sm:py-2.5">
          <Link
            href="/"
            aria-label="Sewa Sankalp Foundation home"
            className="shrink-0"
          >
            <BrandMark />
          </Link>
          <HeaderNav />
        </div>
      </div>
    </header>
  );
}
