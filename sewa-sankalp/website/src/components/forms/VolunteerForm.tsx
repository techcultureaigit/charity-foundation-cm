"use client";

import { useState, useTransition } from "react";
import { submitVolunteerAction } from "@/app/actions/forms";

export function VolunteerForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      id="volunteer-form"
      className="space-y-4 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_10px_30px_rgba(23,59,49,0.05)]"
      action={(formData) => {
        startTransition(async () => {
          setError(null);
          setSuccess(false);
          const result = await submitVolunteerAction(formData);
          if (!result.ok) {
            setError(result.error);
            return;
          }
          setSuccess(true);
          (document.getElementById("volunteer-form") as HTMLFormElement | null)?.reset();
        });
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Name</span>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--ivory)] px-3 py-2.5 outline-none ring-[var(--forest)] focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Email</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--ivory)] px-3 py-2.5 outline-none ring-[var(--forest)] focus:ring-2"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Mobile (optional)</span>
          <input
            name="mobile"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--ivory)] px-3 py-2.5 outline-none ring-[var(--forest)] focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Interest area</span>
          <select
            name="interest"
            required
            defaultValue=""
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--ivory)] px-3 py-2.5 outline-none ring-[var(--forest)] focus:ring-2"
          >
            <option value="" disabled>
              Select interest
            </option>
            <option>Women Empowerment</option>
            <option>Child Development</option>
            <option>Education</option>
            <option>Health & Family Welfare</option>
            <option>Social Welfare</option>
            <option>General Support</option>
          </select>
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium">Message (optional)</span>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--ivory)] px-3 py-2.5 outline-none ring-[var(--forest)] focus:ring-2"
        />
      </label>

      {error ? (
        <p className="rounded-xl bg-[#fde8e8] px-3 py-2 text-sm text-[#9b1c1c]">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="rounded-xl bg-[rgba(23,59,49,0.08)] px-3 py-2 text-sm text-[var(--forest)]">
          Thank you. Your volunteer request has been received.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-xl bg-[var(--forest)] px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
      >
        {isPending ? "Submitting..." : "Become a Volunteer"}
      </button>
    </form>
  );
}
