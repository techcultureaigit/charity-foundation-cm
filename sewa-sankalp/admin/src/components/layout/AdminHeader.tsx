"use client";

import { usePathname } from "next/navigation";
import { adminNav } from "@/lib/nav";
import { logoutAdmin } from "@/app/admin/actions";

export function AdminHeader() {
  const pathname = usePathname();
  const current =
    adminNav.find((item) =>
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname === item.href || pathname.startsWith(`${item.href}/`),
    )?.label ?? "Admin";

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[var(--admin-border)] bg-[rgba(247,244,237,0.96)] px-5 backdrop-blur-md lg:px-6">
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--admin-muted)]">
          Sewa Sankalp CMS
        </p>
        <h2 className="truncate font-[family-name:var(--font-admin-display)] text-xl leading-tight text-[var(--admin-forest)]">
          {current}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden rounded-lg border border-[var(--admin-border)] bg-white px-2.5 py-1 text-[11px] text-[var(--admin-muted)] sm:block">
          Verified content only
        </div>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="rounded-lg border border-[var(--admin-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--admin-charcoal)] transition hover:border-[var(--admin-forest)] hover:bg-[var(--admin-forest)] hover:text-white"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
