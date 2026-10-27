import type { ReactNode } from "react";
import { iconOptions } from "@/lib/icons";

export const inputClass =
  "w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2";

export type { MediaOption } from "./ImageField";

export function TextField({
  label,
  name,
  defaultValue = "",
  required,
  type = "text",
  placeholder,
  hint,
  className = "",
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: string;
  placeholder?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1.5 block font-medium">{label}</span>
      <input
        name={name}
        type={type}
        min={type === "number" ? 0 : undefined}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
      {hint ? (
        <span className="mt-1 block text-xs text-[var(--admin-muted)]">{hint}</span>
      ) : null}
    </label>
  );
}

export function AreaField({
  label,
  name,
  defaultValue = "",
  rows = 3,
  required,
  hint,
  className = "",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
  hint?: string;
  className?: string;
}) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1.5 block font-medium">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        required={required}
        className={inputClass}
      />
      {hint ? (
        <span className="mt-1 block text-xs text-[var(--admin-muted)]">{hint}</span>
      ) : null}
    </label>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
  className = "",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: readonly { value: string; label: string }[];
  className?: string;
}) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1.5 block font-medium">{label}</span>
      <select name={name} defaultValue={defaultValue} className={inputClass}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function IconSelect({
  name = "iconKey",
  defaultValue,
  label = "Icon",
}: {
  name?: string;
  defaultValue?: string;
  label?: string;
}) {
  return (
    <SelectField
      label={label}
      name={name}
      defaultValue={defaultValue || "leaf"}
      options={iconOptions}
    />
  );
}

export { ImageField } from "./ImageField";

export function CheckField({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}

export function Notice({
  tone = "info",
  children,
}: {
  tone?: "info" | "error";
  children: ReactNode;
}) {
  return (
    <p
      className={`rounded-xl px-3 py-2 text-sm ${
        tone === "error"
          ? "bg-[#fde8e8] text-[#9b1c1c]"
          : "bg-[rgba(23,59,49,0.08)] text-[var(--admin-forest)]"
      }`}
    >
      {children}
    </p>
  );
}
