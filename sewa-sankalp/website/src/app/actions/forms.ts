"use server";

import { connection } from "next/server";
import { connectMongo } from "@/lib/db/mongodb";
import { EnquiryModel } from "@/lib/models/Enquiry";
import { VolunteerModel } from "@/lib/models/Volunteer";

export async function submitEnquiryAction(formData: FormData) {
  await connection();
  await connectMongo();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const mobile = String(formData.get("mobile") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false as const, error: "Name, email, and message are required." };
  }

  await EnquiryModel.create({
    name,
    email,
    mobile: mobile || undefined,
    subject: subject || undefined,
    message,
    status: "new",
  });

  return { ok: true as const };
}

export async function submitVolunteerAction(formData: FormData) {
  await connection();
  await connectMongo();

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

  await VolunteerModel.create({
    name,
    email,
    mobile: mobile || undefined,
    interest,
    message: message || undefined,
    status: "new",
  });

  return { ok: true as const };
}
