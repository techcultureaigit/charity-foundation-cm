"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { saveContactAction } from "@/app/admin/actions/cms";
import type { ContactSettings } from "@/lib/types";

export function ContactManager({ contact }: { contact: ContactSettings }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="max-w-3xl space-y-5 rounded-2xl border border-[var(--admin-border)] bg-white p-6"
      action={(formData) => {
        startTransition(async () => {
          const result = await saveContactAction(formData);
          setMessage(
            result.ok
              ? "Contact saved - website header, footer and contact updated"
              : result.error,
          );
          if (result.ok) router.refresh();
        });
      }}
    >
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium">Address</span>
        <textarea
          name="address"
          rows={3}
          defaultValue={contact.address}
          required
          className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Phone</span>
          <input
            name="phone"
            defaultValue={contact.phone}
            required
            className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Email</span>
          <input
            name="email"
            type="email"
            defaultValue={contact.email}
            required
            className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium">Website</span>
        <input
          name="website"
          defaultValue={contact.website}
          required
          className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Facebook</span>
          <input
            name="facebook"
            defaultValue={contact.socialLinks.facebook ?? ""}
            className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Instagram</span>
          <input
            name="instagram"
            defaultValue={contact.socialLinks.instagram ?? ""}
            className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">YouTube</span>
          <input
            name="youtube"
            defaultValue={contact.socialLinks.youtube ?? ""}
            className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">LinkedIn</span>
          <input
            name="linkedin"
            defaultValue={contact.socialLinks.linkedin ?? ""}
            className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block font-medium">Twitter / X</span>
          <input
            name="twitter"
            defaultValue={contact.socialLinks.twitter ?? ""}
            className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
          />
          <span className="mt-1 block text-xs text-[var(--admin-muted)]">
            Social icons appear in the website top bar and footer only for links you fill in.
          </span>
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium">Footer tagline</span>
        <input
          name="footerTagline"
          defaultValue={contact.footerTagline ?? ""}
          placeholder="Together for a Brighter Tomorrow"
          className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2"
        />
      </label>      {message ? (
        <p className="rounded-xl bg-[rgba(23,59,49,0.08)] px-3 py-2 text-sm text-[var(--admin-forest)]">
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-xl bg-[var(--admin-forest)] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save contact settings"}
      </button>
    </form>
  );
}
