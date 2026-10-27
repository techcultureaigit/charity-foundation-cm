export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="admin-card relative overflow-hidden px-4 py-4">
      <div className="absolute bottom-3 left-0 top-3 w-[3px] rounded-full bg-[var(--admin-gold)]" />
      <div className="pl-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--admin-muted)]">
          {label}
        </p>
        <p className="mt-2 font-[family-name:var(--font-admin-display)] text-3xl leading-none text-[var(--admin-forest)]">
          {value}
        </p>
        {hint ? (
          <p className="mt-2 text-xs text-[var(--admin-muted)]">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}
