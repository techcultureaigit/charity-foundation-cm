"use server";

import { apiPost } from "@/lib/api/backend";

export async function submitEnquiryAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const mobile = String(formData.get("mobile") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false as const, error: "Name, email, and message are required." };
  }

  const result = await apiPost("/enquiries", {
    name,
    email,
    mobile: mobile || undefined,
    subject: subject || undefined,
    message,
  });

  if (!result.ok) {
    return { ok: false as const, error: result.error };
  }
  return { ok: true as const };
}

export async function submitVolunteerAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const mobile = String(formData.get("mobile") ?? "").trim();
  const interest = String(formData.get("interest") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !interest) {
    return {
      ok: false as const,
      error: "Name, email, and interest are required.",
    };
  }

  const result = await apiPost("/volunteers", {
    name,
    email,
    mobile: mobile || undefined,
    interest,
    message: message || undefined,
  });

  if (!result.ok) {
    return { ok: false as const, error: result.error };
  }
  return { ok: true as const };
}
