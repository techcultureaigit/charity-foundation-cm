import type { ReactNode } from "react";
import { Suspense } from "react";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--admin-ivory)] text-[var(--admin-charcoal)]">
      <Suspense
        fallback={
          <aside className="fixed inset-y-0 left-0 z-30 h-screen w-[272px] bg-[var(--admin-forest)]" />
        }
      >
        <AdminSidebar />
      </Suspense>

      <div className="flex min-h-screen min-w-0 flex-col pl-[272px]">
        <Suspense
          fallback={
            <header className="h-14 border-b border-[var(--admin-border)] bg-[var(--admin-ivory)]" />
          }
        >
          <AdminHeader />
        </Suspense>
        <main className="admin-main flex-1 px-5 py-5 lg:px-6">{children}</main>
      </div>
    </div>
  );
}
