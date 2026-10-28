"use server";

import { revalidatePath } from "next/cache";
import { connection } from "next/server";
import {
  createCause,
  createEvent,
  createInvolvementCard,
  deleteCause,
  deleteEvent,
  deleteInvolvementCard,
  deleteMediaItem,
  updateCause,
  updateEvent,
  updateInvolvementCard,
  updateContactSettings,
  updateEnquiryStatus,
  updateImpactItem,
  updateLegalPage,
  updateMediaItem,
  updateVolunteerStatus,
  updateWorkArea,
} from "@/lib/services/cms";
import { adminUpload } from "@/lib/api/backend";
import type {
  EnquiryStatus,
  EventTheme,
  FocusTheme,
  InvolvementTheme,
  MediaCategory,
  VolunteerStatus,
} from "@/lib/types";

function revalidateSiteContent() {
  revalidatePath("/admin");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/work-areas");
  revalidatePath("/admin/involvement");
  revalidatePath("/admin/causes");
  revalidatePath("/admin/events");
  revalidatePath("/admin/media");
  revalidatePath("/admin/impact");
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin/volunteers");
  revalidatePath("/admin/settings/contact");
  revalidatePath("/admin/settings/seo");
  revalidatePath("/admin/settings/legal");
}

function str(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function oneOf<T extends string>(value: string, allowed: readonly T[], fallback: T) {
  return (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

function num(formData: FormData, name: string) {
  const value = Number(str(formData, name));
  return Number.isFinite(value) && value >= 0 ? Math.round(value) : 0;
}

const focusThemes = ["pink", "green", "blue", "orange"] as const;
const involvementThemes = ["cream", "mint", "peach"] as const;
const eventThemes = ["green", "blue", "red"] as const;
const mediaCategories = [
  "hero",
  "work",
  "about",
  "general",
  "gallery",
  "focus",
  "cause",
  "event",
  "involve",
  "cta",
  "contact",
] as const;

export async function saveWorkAreaAction(formData: FormData) {
  await connection();
  const id = str(formData, "id");
  const title = str(formData, "title");
  const subtitle = str(formData, "subtitle");
  const description = str(formData, "description");
  const isPublished = formData.get("isPublished") === "on";

  if (!id || !title || !subtitle || !description) {
    return { ok: false as const, error: "Title, subtitle and description are required" };
  }

  const item = await updateWorkArea(id, {
    title,
    subtitle,
    description,
    imageUrl: str(formData, "imageUrl"),
    theme: oneOf<FocusTheme>(str(formData, "theme"), focusThemes, "green"),
    iconKey: str(formData, "iconKey"),
    href: str(formData, "href"),
    isPublished,
  });
  if (!item) return { ok: false as const, error: "Work area not found" };
  revalidateSiteContent();
  return { ok: true as const, item };
}

export async function saveInvolvementAction(formData: FormData) {
  await connection();
  const id = str(formData, "id");
  const title = str(formData, "title");
  const description = str(formData, "description");
  const ctaLabel = str(formData, "ctaLabel");

  if (!title || !description || !ctaLabel) {
    return { ok: false as const, error: "Title, description and button label are required" };
  }

  const data = {
    order: num(formData, "order") || 1,
    title,
    description,
    imageUrl: str(formData, "imageUrl"),
    iconKey: str(formData, "iconKey"),
    theme: oneOf<InvolvementTheme>(str(formData, "theme"), involvementThemes, "cream"),
    ctaLabel,
    ctaHref: str(formData, "ctaHref") || "/get-involved",
    isPublished: formData.get("isPublished") === "on",
  };

  const item = id
    ? await updateInvolvementCard(id, data)
    : await createInvolvementCard(data);
  if (!item) return { ok: false as const, error: "Card not found" };
  revalidateSiteContent();
  return { ok: true as const, item };
}

export async function removeInvolvementAction(formData: FormData) {
  await connection();
  const id = str(formData, "id");
  if (!id) return { ok: false as const, error: "Missing id" };
  await deleteInvolvementCard(id);
  revalidateSiteContent();
  return { ok: true as const };
}

export async function saveCauseAction(formData: FormData) {
  await connection();
  const id = str(formData, "id");
  const title = str(formData, "title");
  const description = str(formData, "description");

  if (!title || !description) {
    return { ok: false as const, error: "Title and description are required" };
  }

  const data = {
    order: num(formData, "order") || 1,
    title,
    description,
    imageUrl: str(formData, "imageUrl"),
    iconKey: str(formData, "iconKey"),
    helpedCount: num(formData, "helpedCount"),
    goalCount: num(formData, "goalCount"),
    href: str(formData, "href") || "/our-work",
    isPublished: formData.get("isPublished") === "on",
  };

  const item = id ? await updateCause(id, data) : await createCause(data);
  if (!item) return { ok: false as const, error: "Cause not found" };
  revalidateSiteContent();
  return { ok: true as const, item };
}

export async function removeCauseAction(formData: FormData) {
  await connection();
  const id = str(formData, "id");
  if (!id) return { ok: false as const, error: "Missing id" };
  await deleteCause(id);
  revalidateSiteContent();
  return { ok: true as const };
}

export async function saveEventAction(formData: FormData) {
  await connection();
  const id = str(formData, "id");
  const title = str(formData, "title");
  const description = str(formData, "description");

  if (!title || !description) {
    return { ok: false as const, error: "Title and description are required" };
  }

  const data = {
    order: num(formData, "order") || 1,
    title,
    description,
    imageUrl: str(formData, "imageUrl"),
    iconKey: str(formData, "iconKey"),
    dateLabel: str(formData, "dateLabel"),
    location: str(formData, "location"),
    ticketInfo: str(formData, "ticketInfo"),
    isFeatured: formData.get("isFeatured") === "on",
    theme: oneOf<EventTheme>(str(formData, "theme"), eventThemes, "green"),
    href: str(formData, "href") || "/get-involved",
    isPublished: formData.get("isPublished") === "on",
  };

  const item = id ? await updateEvent(id, data) : await createEvent(data);
  if (!item) return { ok: false as const, error: "Event not found" };
  revalidateSiteContent();
  return { ok: true as const, item };
}

export async function removeEventAction(formData: FormData) {
  await connection();
  const id = str(formData, "id");
  if (!id) return { ok: false as const, error: "Missing id" };
  await deleteEvent(id);
  revalidateSiteContent();
  return { ok: true as const };
}
export async function saveImpactAction(formData: FormData) {
  await connection();
  const id = String(formData.get("id") ?? "");
  const label = String(formData.get("label") ?? "").trim();
  const value = String(formData.get("value") ?? "").trim();
  const isVerified = formData.get("isVerified") === "on";
  const isPublished = formData.get("isPublished") === "on";

  if (!id || !label) {
    return { ok: false as const, error: "Label is required" };
  }

  const item = await updateImpactItem(id, {
    label,
    value,
    isVerified,
    isPublished,
  });
  if (!item) return { ok: false as const, error: "Impact item not found" };
  revalidateSiteContent();
  return { ok: true as const, item };
}

export async function saveContactAction(formData: FormData) {
  await connection();
  const address = String(formData.get("address") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();

  if (!address || !phone || !email || !website) {
    return { ok: false as const, error: "Core contact fields are required" };
  }

  const item = await updateContactSettings({
    address,
    phone,
    email,
    website,
    socialLinks: {
      facebook: String(formData.get("facebook") ?? "").trim() || undefined,
      instagram: String(formData.get("instagram") ?? "").trim() || undefined,
      twitter: String(formData.get("twitter") ?? "").trim() || undefined,
      youtube: String(formData.get("youtube") ?? "").trim() || undefined,
      linkedin: String(formData.get("linkedin") ?? "").trim() || undefined,
    },
    footerTagline: String(formData.get("footerTagline") ?? "").trim() || undefined,
  });
  revalidateSiteContent();
  return { ok: true as const, item };
}

export async function saveLegalAction(formData: FormData) {
  await connection();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const isPublished = formData.get("isPublished") === "on";

  if (!id || !title || !content) {
    return { ok: false as const, error: "All fields are required" };
  }

  const item = await updateLegalPage(id, { title, content, isPublished });
  if (!item) return { ok: false as const, error: "Legal page not found" };
  revalidateSiteContent();
  return { ok: true as const, item };
}

export async function uploadMediaAction(formData: FormData) {
  await connection();
  const file = formData.get("file");
  const title = String(formData.get("title") ?? "").trim();
  const alt = String(formData.get("alt") ?? "").trim();
  const category = oneOf<MediaCategory>(String(formData.get("category") ?? "general"), mediaCategories, "general");
  const consentConfirmed = formData.get("consentConfirmed") === "on";

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false as const, error: "Please choose an image file" };
  }
  if (!title || !alt) {
    return { ok: false as const, error: "Title and alt text are required" };
  }
  if (!consentConfirmed) {
    return {
      ok: false as const,
      error: "Confirm photo consent before publishing",
    };
  }

  const payload = new FormData();
  payload.set("file", file);
  payload.set("title", title);
  payload.set("alt", alt);
  payload.set("category", category);
  payload.set("consentConfirmed", "true");
  payload.set("isPublished", "true");

  const uploaded = await adminUpload<{ id: string; url: string }>(
    "/admin/media/upload",
    payload,
  );
  if (!uploaded.ok) {
    return { ok: false as const, error: uploaded.error };
  }
  revalidateSiteContent();
  return { ok: true as const, item: uploaded.data };
}

/** Inline upload from Image fields — saves file, adds to Media library, returns relative URL. */
export async function uploadImageQuickAction(formData: FormData) {
  await connection();
  const file = formData.get("file");
  const category = oneOf<MediaCategory>(
    String(formData.get("category") ?? "general"),
    mediaCategories,
    "general",
  );

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false as const, error: "Please choose an image file" };
  }

  const baseName = (file.name || "photo")
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .trim()
    .slice(0, 80);
  const title = baseName || "Photo";

  const payload = new FormData();
  payload.set("file", file);
  payload.set("title", title);
  payload.set("alt", title);
  payload.set("category", category);
  payload.set("consentConfirmed", "true");
  payload.set("isPublished", "true");

  const uploaded = await adminUpload<{ id: string; url: string }>(
    "/admin/media/upload",
    payload,
  );
  if (!uploaded.ok) {
    return { ok: false as const, error: uploaded.error };
  }
  revalidateSiteContent();
  return {
    ok: true as const,
    url: uploaded.data.url,
    item: uploaded.data,
  };
}

export async function saveMediaMetaAction(formData: FormData) {
  await connection();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const alt = String(formData.get("alt") ?? "").trim();
  const category = oneOf<MediaCategory>(String(formData.get("category") ?? "general"), mediaCategories, "general");
  const consentConfirmed = formData.get("consentConfirmed") === "on";
  const isPublished = formData.get("isPublished") === "on";

  if (!id || !title || !alt) {
    return { ok: false as const, error: "Title and alt are required" };
  }

  const item = await updateMediaItem(id, {
    title,
    alt,
    category,
    consentConfirmed,
    isPublished,
  });
  if (!item) return { ok: false as const, error: "Media not found" };
  revalidateSiteContent();
  return { ok: true as const, item };
}

export async function removeMediaAction(formData: FormData) {
  await connection();
  const id = String(formData.get("id") ?? "");
  if (!id) return { ok: false as const, error: "Missing media id" };
  await deleteMediaItem(id);
  revalidateSiteContent();
  return { ok: true as const };
}

export async function setEnquiryStatusAction(formData: FormData) {
  await connection();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as EnquiryStatus;
  if (!id || !status) return { ok: false as const, error: "Invalid request" };
  await updateEnquiryStatus(id, status);
  revalidateSiteContent();
  return { ok: true as const };
}

export async function setVolunteerStatusAction(formData: FormData) {
  await connection();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as VolunteerStatus;
  if (!id || !status) return { ok: false as const, error: "Invalid request" };
  await updateVolunteerStatus(id, status);
  revalidateSiteContent();
  return { ok: true as const };
}
