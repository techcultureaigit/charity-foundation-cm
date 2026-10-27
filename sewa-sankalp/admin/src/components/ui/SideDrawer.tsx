"use client";

import { useEffect, type ReactNode } from "react";

export function SideDrawer({
  open,
  title,
  subtitle,
  eyebrow = "Edit page",
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close drawer"
        className="absolute inset-0 bg-[rgba(23,59,49,0.35)] backdrop-blur-[1px]"
        onClick={onClose}
      />

      <aside className="relative flex h-full w-full max-w-xl flex-col bg-white shadow-[-12px_0_40px_rgba(23,59,49,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--admin-border)] px-5 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-gold)]">
              {eyebrow}
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-admin-display)] text-2xl text-[var(--admin-forest)]">
              {title}
            </h3>
            {subtitle ? (
              <p className="mt-1 text-xs text-[var(--admin-muted)]">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[var(--admin-border)] px-2.5 py-1 text-sm text-[var(--admin-charcoal)] transition hover:border-[var(--admin-forest)]"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
      </aside>
    </div>
  );
}
