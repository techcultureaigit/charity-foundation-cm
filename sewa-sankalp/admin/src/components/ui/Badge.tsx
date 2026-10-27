import type { ReactNode } from "react";

const tones = {
  green: "bg-[rgba(23,59,49,0.1)] text-[var(--admin-forest)]",
  gold: "bg-[rgba(197,164,109,0.22)] text-[#7a5f2d]",
  muted: "bg-[rgba(37,41,37,0.06)] text-[var(--admin-charcoal)]",
  danger: "bg-[#fde8e8] text-[#9b1c1c]",
} as const;

export function Badge({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.05em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
