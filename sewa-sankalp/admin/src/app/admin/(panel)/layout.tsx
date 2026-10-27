import type { ReactNode } from "react";
import { Suspense } from "react";
import { AdminShell } from "@/components/layout/AdminShell";

export const instant = false;

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--admin-ivory)]" />}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
