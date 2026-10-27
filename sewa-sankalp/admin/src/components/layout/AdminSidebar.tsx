"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavSections } from "@/lib/nav";
import { NavIcon } from "./NavIcon";

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex h-screen w-[272px] flex-col overflow-hidden bg-[var(--admin-forest)] text-[var(--admin-ivory)]">
      <div className="relative flex h-14 shrink-0 items-center overflow-hidden border-b border-white/10 px-5">
        <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-[var(--admin-gold)]/15" />
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--admin-gold)]">
            Admin Panel
          </p>
          <h1 className="mt-0.5 font-[family-name:var(--font-admin-display)] text-base leading-tight">
            Sewa Sankalp Foundation
          </h1>
        </div>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-3 py-4">
        {adminNavSections.map((section) => (
          <div key={section.title} className="shrink-0">
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                      active
                        ? "bg-white/12 text-white shadow-[inset_3px_0_0_0_var(--admin-gold)]"
                        : "text-white/70 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    <span
                      className={
                        active ? "text-[var(--admin-gold)]" : "text-white/55"
                      }
                    >
                      <NavIcon icon={item.icon} />
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/10 px-5 py-3">
        <p className="text-xs leading-5 text-white/50">
          Content updates only. No unverified claims.
        </p>
      </div>
    </aside>
  );
}
