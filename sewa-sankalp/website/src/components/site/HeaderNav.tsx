"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UtilityIcon } from "@/components/site/icons";

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const links: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Objective",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Education", href: "/objective/education" },
    ],
  },
  {
    label: "Campaign",
    href: "/campaigns",
    children: [
      { label: "All Campaigns", href: "/campaigns" },
      // { label: "Our Work", href: "/our-work" },
      // { label: "Get Involved", href: "/get-involved" },
    ],
  },
  {
    label: "Media",
    href: "/gallery",
    children: [
      { label: "Photo Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
    ],
  },
  { label: "Contact Us", href: "/impact-contact" },
];

export function HeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeIndex = links.findIndex((link) =>
    link.href === "/"
      ? pathname === "/"
      : pathname === link.href ||
        pathname.startsWith(`${link.href}/`) ||
        (link.children?.some((child) => {
          const base = child.href.split("#")[0];
          return pathname === base || pathname.startsWith(`${base}/`);
        }) ??
          false),
  );

  return (
    <>
      {/* Orange strip — max 4xl, flush to right edge, round left only */}
      <nav
        aria-label="Primary"
        className="nav-bar ml-auto hidden h-[50px] w-full max-w-4xl min-w-0 items-stretch overflow-visible rounded-l-full rounded-r-none bg-[var(--orange)] lg:flex"
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
                  className="absolute left-0 top-1/2 z-[1] h-4 w-px -translate-y-1/2 bg-black/25"
                />
              ) : null}
              <Link
                href={link.href}
                className={`relative flex h-full w-full items-center justify-center px-2 text-[12px] font-extrabold uppercase tracking-[0.08em] xl:px-3 xl:text-[13px] ${
                  active ? "text-white" : "text-[#01332b]"
                }`}
              >
                <span className="relative inline-flex items-center gap-1 leading-none">
                  {link.label}
                  {link.children ? (
                    <UtilityIcon
                      name="chevron-down"
                      className={`h-3 w-3 shrink-0 ${
                        active ? "text-white" : "text-[#01332b]"
                      }`}
                    />
                  ) : null}
                  {/* Absolute underline — doesn't shift text off vertical center */}
                  <span
                    aria-hidden
                    className={`absolute left-0 right-0 top-[calc(100%+5px)] h-[2.5px] rounded-full bg-white ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </span>
              </Link>
              {link.children ? (
                <div className="nav-dropdown absolute left-1/2 top-full z-[60] w-[10.75rem] -translate-x-1/2 pt-2">
                  <div className="relative overflow-hidden rounded-xl border border-[#E8DFD0]/90 bg-[#FFFCF0] p-1 shadow-[0_4px_8px_rgba(0,51,43,0.04),0_14px_32px_rgba(0,51,43,0.14)] ring-1 ring-black/[0.03] before:absolute before:left-1/2 before:top-0 before:h-px before:w-8 before:-translate-x-1/2 before:bg-gradient-to-r before:from-transparent before:via-[#D97706]/55 before:to-transparent">
                    {link.children.map((child) => (
                      <Link
                        key={`${link.label}-${child.href}`}
                        href={child.href}
                        className="group flex items-center justify-between gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold normal-case tracking-[-0.01em] text-[var(--forest)] transition-[background-color,color] duration-200 hover:bg-[#FFF3E3] hover:text-[#C46A08]"
                      >
                        <span>{child.label}</span>
                        <UtilityIcon
                          name="chevron"
                          className="h-3 w-3 shrink-0 text-[#C46A08] opacity-55 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <button
        type="button"
        className="nav-bar ml-auto flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[var(--orange)] px-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#01332b] sm:h-11 sm:gap-2 sm:px-4 sm:text-[12px] lg:hidden"
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
          <div className="flex flex-col">
            {links.flatMap((link) => [
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.06em] ${
                  links.indexOf(link) === activeIndex
                    ? "text-white underline decoration-[3px] underline-offset-4"
                    : "text-[#01332b]"
                }`}
              >
                {link.label}
              </Link>,
              ...(link.children ?? []).map((child) => (
                <Link
                  key={`${link.label}-${child.href}`}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg py-1.5 pl-8 pr-3 text-[12.5px] font-semibold text-[#01332b]/80"
                >
                  {child.label}
                </Link>
              )),
            ])}
          </div>
        </div>
      ) : null}
    </>
  );
}
