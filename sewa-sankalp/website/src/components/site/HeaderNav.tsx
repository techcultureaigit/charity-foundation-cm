"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { UtilityIcon } from "@/components/site/icons";

interface NavLink {
  label: string;
  href: string;
}

/** Flat top-level menu — former submenu items are now headings. */
const links: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Education", href: "/objective/education" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/impact-contact" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeIndex = links.findIndex((link) => isActivePath(pathname, link.href));

  return (
    <>
      {/* Orange strip — fills beside logo (~+20% left), flush right, round left only */}
      <nav
        aria-label="Primary"
        className="nav-bar ml-auto hidden h-[50px] w-full min-w-0 flex-1 items-stretch overflow-visible rounded-l-full rounded-r-none bg-[var(--orange)] pl-3 lg:flex lg:max-w-[min(100%,50rem)]"
      >
        {links.map((link, index) => {
          const active = index === activeIndex;
          return (
            <div
              key={link.label}
              className={`nav-item relative flex min-w-0 flex-1 items-stretch ${
                index === 0 ? "rounded-l-full" : ""
              }`}
            >
              {index > 0 ? (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 z-[1] h-3.5 w-px -translate-y-1/2 bg-black/25"
                />
              ) : null}
              <Link
                href={link.href}
                className={`relative flex h-full w-full items-center justify-center px-1 text-[14px] font-extrabold capitalize tracking-normal xl:px-1.5 ${
                  active ? "text-white" : "text-[#01332b]"
                }`}
              >
                <span className="relative inline-flex items-center leading-none">
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute left-0 right-0 top-[calc(100%+5px)] h-[2.5px] rounded-full bg-white ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </span>
              </Link>
            </div>
          );
        })}
      </nav>

      <button
        type="button"
        className="nav-bar ml-auto flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[var(--orange)] px-3 text-[11px] font-extrabold capitalize tracking-[0.04em] text-[#01332b] sm:h-11 sm:gap-2 sm:px-4 sm:text-[12px] lg:hidden"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Toggle menu"
      >
        Menu
        <UtilityIcon
          name="chevron-down"
          className={`h-3 w-3 transition-transform sm:h-3.5 sm:w-3.5 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className="nav-bar absolute inset-x-0 top-full z-50 max-h-[min(70vh,520px)] overflow-y-auto border-t border-black/10 bg-[var(--orange)] px-4 py-3 shadow-lg sm:px-5 lg:hidden">
          <div className="mb-2 border-b border-black/10 pb-2">
            <LanguageSwitcher tone="dark" />
          </div>
          <div className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-[14px] font-extrabold capitalize tracking-[0.04em] ${
                  isActivePath(pathname, link.href)
                    ? "text-white underline decoration-[3px] underline-offset-4"
                    : "text-[#01332b]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
