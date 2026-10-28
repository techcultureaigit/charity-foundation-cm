"use client";

import { useState, useTransition } from "react";
import { submitEnquiryAction } from "@/app/actions/forms";
import { UtilityIcon } from "@/components/site/icons";

const subjects = [
  "General Enquiry",
  "Volunteer",
  "Donation / Support",
  "Partnership",
  "Other",
];

export function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const fieldClass =
    "w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 pl-10 text-[13.5px] outline-none ring-[var(--forest)] transition focus:ring-2";
  const selectClass =
    "w-full appearance-none rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 pr-9 text-[13.5px] outline-none ring-[var(--forest)] transition focus:ring-2";

  return (
    <form
      className="space-y-4 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_14px_40px_rgba(0,51,43,0.06)] sm:p-6 lg:p-7"
      action={(formData) => {
        startTransition(async () => {
          setError(null);
          setSuccess(false);
          const result = await submitEnquiryAction(formData);
          if (!result.ok) {
            setError(result.error);
            return;
          }
          setSuccess(true);
          (
            document.getElementById("contact-form") as HTMLFormElement | null
          )?.reset();
        });
      }}
      id="contact-form"
    >
      <div>
        <h2 className="text-[clamp(1.7rem,2.5vw,2.15rem)] font-bold text-[var(--forest)]">
          Send Us a Message
        </h2>
        <p className="mt-1.5 text-[13.5px] text-[var(--muted)]">
          Fill out the form below and our team will get back to you soon.
        </p>
      </div>

      {/* Row 1: Name | Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-[var(--charcoal)]">
            Your Name <span className="text-[#c04444]">*</span>
          </span>
          <span className="relative block">
            <UtilityIcon
              name="user"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
            />
            <input
              name="name"
              required
              placeholder="Enter your name"
              className={fieldClass}
            />
          </span>
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-[var(--charcoal)]">
            Email Address <span className="text-[#c04444]">*</span>
          </span>
          <span className="relative block">
            <UtilityIcon
              name="mail"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className={fieldClass}
            />
          </span>
        </label>
      </div>

      {/* Row 2: Phone | Subject */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-[var(--charcoal)]">
            Phone Number
          </span>
          <span className="relative block">
            <UtilityIcon
              name="phone"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
            />
            <input
              name="mobile"
              placeholder="Enter your phone number"
              className={fieldClass}
            />
          </span>
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-[var(--charcoal)]">
            Subject <span className="text-[#c04444]">*</span>
          </span>
          <span className="relative block">
            <select
              name="subject"
              required
              defaultValue=""
              className={selectClass}
            >
              <option value="" disabled>
                Select a subject
              </option>
              {subjects.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <UtilityIcon
              name="chevron-down"
              className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--muted)]"
            />
          </span>
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-[var(--charcoal)]">
          Message <span className="text-[#c04444]">*</span>
        </span>
        <span className="relative block">
          <UtilityIcon
            name="mail"
            className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[var(--muted)]"
          />
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Write your message here..."
            className={`${fieldClass} resize-y pt-3`}
          />
        </span>
      </label>

      {error ? (
        <p className="rounded-xl bg-[#fde8e8] px-3 py-2 text-sm text-[#9b1c1c]">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="rounded-xl bg-[rgba(23,59,49,0.08)] px-3 py-2 text-sm text-[var(--forest)]">
          Thank you. Your message has been sent.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="btn-forest flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-semibold disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Send Message"}
        <UtilityIcon name="arrow" className="h-4 w-4" />
      </button>
    </form>
  );
}
