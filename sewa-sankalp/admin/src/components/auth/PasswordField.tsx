"use client";

import { useState } from "react";

export function PasswordField({
  name = "password",
  placeholder = "Enter admin password",
}: {
  name?: string;
  placeholder?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-[var(--admin-charcoal)]">
        Password
      </span>
      <span className="relative block">
        <input
          name={name}
          type={visible ? "text" : "password"}
          required
          placeholder={placeholder}
          autoComplete="current-password"
          className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] py-2.5 pl-3 pr-11 outline-none ring-[var(--admin-forest)] transition focus:ring-2"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--admin-muted)] transition hover:bg-[rgba(23,59,49,0.08)] hover:text-[var(--admin-forest)]"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </span>
    </label>
  );
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 5.1A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a17.7 17.7 0 0 1-3.1 4.4" />
      <path d="M6.1 6.1C3.7 7.9 2 12 2 12s3.5 7 10 7a10.4 10.4 0 0 0 4.4-1" />
    </svg>
  );
}
