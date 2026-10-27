import { requireDynamicDb } from "@/lib/db/runtime";
import { ensureSeedData } from "@/lib/db/seed";
import { WorkAreaModel } from "@/lib/models/WorkArea";
import { InvolvementCardModel } from "@/lib/models/InvolvementCard";
import { CauseModel } from "@/lib/models/Cause";
import { EventModel } from "@/lib/models/Event";
import { ImpactModel } from "@/lib/models/Impact";
import { MediaModel } from "@/lib/models/Media";
import { ContactSettingsModel } from "@/lib/models/ContactSettings";
import { LegalPageModel } from "@/lib/models/LegalPage";
import { EnquiryModel } from "@/lib/models/Enquiry";
import { VolunteerModel } from "@/lib/models/Volunteer";
import type {
  Cause,
  ContactSettings,
  Enquiry,
  EnquiryStatus,
  EventItem,
  FocusTheme,
  InvolvementCard,
  InvolvementTheme,
  EventTheme,
  MediaCategory,
  ImpactHighlight,
  LegalPage,
  MediaItem,
  VolunteerRequest,
  VolunteerStatus,
  WorkArea,
} from "@/lib/types";
import { getSiteUrl } from "@/lib/uploads";

const FALLBACK_ISO = "1970-01-01T00:00:00.000Z";

function mediaUrl(url: string) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${getSiteUrl()}${url.startsWith("/") ? url : `/${url}`}`;
}

type WorkAreaLean = {
  _id: unknown;
  order?: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  theme?: string;
  iconKey?: string;
  href?: string;
  isPublished?: boolean;
};

function toWorkArea(doc: WorkAreaLean): WorkArea {
  return {
    id: String(doc._id),
    order: doc.order ?? 0,
    title: doc.title,
    subtitle: doc.subtitle,
    description: doc.description,
    imageUrl: doc.imageUrl ?? "",
    theme: (doc.theme as FocusTheme | undefined) || undefined,
    iconKey: doc.iconKey ?? "",
    href: doc.href ?? "",
    isPublished: Boolean(doc.isPublished),
  };
}

export async function getWorkAreas(): Promise<WorkArea[]> {
  await requireDynamicDb();
  await ensureSeedData();
  const docs = await WorkAreaModel.find().sort({ order: 1 }).lean();
  return docs.map((doc) => toWorkArea(doc));
}

export async function updateWorkArea(
  id: string,
  data: {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    theme: FocusTheme;
    iconKey: string;
    href: string;
    isPublished: boolean;
  },
) {
  await requireDynamicDb();
  const doc = await WorkAreaModel.findByIdAndUpdate(id, data, {
    new: true,
  }).lean();
  if (!doc) return null;
  return toWorkArea(doc);
}

// ---------- Involvement cards ----------

type InvolvementLean = {
  _id: unknown;
  order?: number;
  title: string;
  description: string;
  imageUrl?: string;
  iconKey?: string;
  theme?: string;
  ctaLabel: string;
  ctaHref?: string;
  isPublished?: boolean;
};

function toInvolvement(doc: InvolvementLean): InvolvementCard {
  return {
    id: String(doc._id),
    order: doc.order ?? 0,
    title: doc.title,
    description: doc.description,
    imageUrl: doc.imageUrl ?? "",
    iconKey: doc.iconKey ?? "",
    theme: (doc.theme as InvolvementTheme) || "cream",
    ctaLabel: doc.ctaLabel,
    ctaHref: doc.ctaHref ?? "",
    isPublished: Boolean(doc.isPublished),
  };
}

export type InvolvementInput = Omit<InvolvementCard, "id">;

export async function getInvolvementCards(): Promise<InvolvementCard[]> {
  await requireDynamicDb();
  await ensureSeedData();
  const docs = await InvolvementCardModel.find().sort({ order: 1 }).lean();
  return docs.map((doc) => toInvolvement(doc));
}

export async function createInvolvementCard(data: InvolvementInput) {
  await requireDynamicDb();
  const doc = await InvolvementCardModel.create(data);
  return toInvolvement(doc.toObject());
}

export async function updateInvolvementCard(
  id: string,
  data: InvolvementInput,
) {
  await requireDynamicDb();
  const doc = await InvolvementCardModel.findByIdAndUpdate(id, data, {
    new: true,
  }).lean();
  return doc ? toInvolvement(doc) : null;
}

export async function deleteInvolvementCard(id: string) {
  await requireDynamicDb();
  await InvolvementCardModel.findByIdAndDelete(id);
  return true;
}

// ---------- Causes ----------

type CauseLean = {
  _id: unknown;
  order?: number;
  title: string;
  description: string;
  imageUrl?: string;
  iconKey?: string;
  helpedCount?: number;
  goalCount?: number;
  href?: string;
  isPublished?: boolean;
};

function toCause(doc: CauseLean): Cause {
  return {
    id: String(doc._id),
    order: doc.order ?? 0,
    title: doc.title,
    description: doc.description,
    imageUrl: doc.imageUrl ?? "",
    iconKey: doc.iconKey ?? "",
    helpedCount: doc.helpedCount ?? 0,
    goalCount: doc.goalCount ?? 0,
    href: doc.href ?? "",
    isPublished: Boolean(doc.isPublished),
  };
}

export type CauseInput = Omit<Cause, "id">;

export async function getCauses(): Promise<Cause[]> {
  await requireDynamicDb();
  await ensureSeedData();
  const docs = await CauseModel.find().sort({ order: 1 }).lean();
  return docs.map((doc) => toCause(doc));
}

export async function createCause(data: CauseInput) {
  await requireDynamicDb();
  const doc = await CauseModel.create(data);
  return toCause(doc.toObject());
}

export async function updateCause(id: string, data: CauseInput) {
  await requireDynamicDb();
  const doc = await CauseModel.findByIdAndUpdate(id, data, {
    new: true,
  }).lean();
  return doc ? toCause(doc) : null;
}

export async function deleteCause(id: string) {
  await requireDynamicDb();
  await CauseModel.findByIdAndDelete(id);
  return true;
}

// ---------- Events ----------

type EventLean = {
  _id: unknown;
  order?: number;
  title: string;
  description: string;
  imageUrl?: string;
  iconKey?: string;
  dateLabel?: string;
  location?: string;
  ticketInfo?: string;
  isFeatured?: boolean;
  theme?: string;
  href?: string;
  isPublished?: boolean;
};

function toEvent(doc: EventLean): EventItem {
  return {
    id: String(doc._id),
    order: doc.order ?? 0,
    title: doc.title,
    description: doc.description,
    imageUrl: doc.imageUrl ?? "",
    iconKey: doc.iconKey ?? "",
    dateLabel: doc.dateLabel ?? "",
    location: doc.location ?? "",
    ticketInfo: doc.ticketInfo ?? "",
    isFeatured: Boolean(doc.isFeatured),
    theme: (doc.theme as EventTheme) || "green",
    href: doc.href ?? "",
    isPublished: Boolean(doc.isPublished),
  };
}

export type EventInput = Omit<EventItem, "id">;

export async function getEvents(): Promise<EventItem[]> {
  await requireDynamicDb();
  await ensureSeedData();
  const docs = await EventModel.find().sort({ order: 1 }).lean();
  return docs.map((doc) => toEvent(doc));
}

export async function createEvent(data: EventInput) {
  await requireDynamicDb();
  const doc = await EventModel.create(data);
  return toEvent(doc.toObject());
}

export async function updateEvent(id: string, data: EventInput) {
  await requireDynamicDb();
  const doc = await EventModel.findByIdAndUpdate(id, data, {
    new: true,
  }).lean();
  return doc ? toEvent(doc) : null;
}

export async function deleteEvent(id: string) {
  await requireDynamicDb();
  await EventModel.findByIdAndDelete(id);
  return true;
}
export async function getImpactItems(): Promise<ImpactHighlight[]> {
  await requireDynamicDb();
  await ensureSeedData();
  const docs = await ImpactModel.find().sort({ _id: 1 }).lean();
  return docs.map((doc) => ({
    id: String(doc._id),
    label: doc.label,
    value: doc.value ?? "",
    isVerified: Boolean(doc.isVerified),
    isPublished: Boolean(doc.isPublished),
  }));
}

export async function updateImpactItem(
  id: string,
  data: {
    label: string;
    value: string;
    isVerified: boolean;
    isPublished: boolean;
  },
) {
  await requireDynamicDb();
  const publish = data.isVerified ? data.isPublished : false;
  const doc = await ImpactModel.findByIdAndUpdate(
    id,
    { ...data, isPublished: publish },
    { new: true },
  ).lean();
  if (!doc) return null;
  return {
    id: String(doc._id),
    label: doc.label,
    value: doc.value ?? "",
    isVerified: Boolean(doc.isVerified),
    isPublished: Boolean(doc.isPublished),
  } satisfies ImpactHighlight;
}

export async function getMediaItems(): Promise<MediaItem[]> {
  await requireDynamicDb();
  const docs = await MediaModel.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    id: String(doc._id),
    title: doc.title,
    alt: doc.alt,
    // Relative /uploads URL — admin serves these via /uploads/[...path]
    url: doc.url as string,
    category: doc.category,
    consentConfirmed: Boolean(doc.consentConfirmed),
    isPublished: Boolean(doc.isPublished),
    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString()
      : FALLBACK_ISO,
  }));
}

/** Media library options for image pickers (relative /uploads URLs, portable across hosts). */
export async function getMediaOptions() {
  await requireDynamicDb();
  const docs = await MediaModel.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .lean();
  return docs.map((doc) => ({
    title: doc.title as string,
    url: doc.url as string,
    category: doc.category as string,
  }));
}

export async function createMediaItem(data: {
  title: string;
  alt: string;
  url: string;
  category: MediaCategory;
  consentConfirmed: boolean;
}) {
  await requireDynamicDb();
  const doc = await MediaModel.create({
    ...data,
    isPublished: true,
  });
  return {
    id: String(doc._id),
    title: doc.title,
    alt: doc.alt,
    url: mediaUrl(doc.url),
    category: doc.category,
    consentConfirmed: Boolean(doc.consentConfirmed),
    isPublished: Boolean(doc.isPublished),
    createdAt: doc.createdAt.toISOString(),
  } satisfies MediaItem;
}

export async function updateMediaItem(
  id: string,
  data: {
    title: string;
    alt: string;
    category: MediaCategory;
    consentConfirmed: boolean;
    isPublished: boolean;
  },
) {
  await requireDynamicDb();
  const doc = await MediaModel.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!doc) return null;
  return {
    id: String(doc._id),
    title: doc.title,
    alt: doc.alt,
    url: mediaUrl(doc.url),
    category: doc.category,
    consentConfirmed: Boolean(doc.consentConfirmed),
    isPublished: Boolean(doc.isPublished),
    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString()
      : FALLBACK_ISO,
  } satisfies MediaItem;
}

export async function deleteMediaItem(id: string) {
  await requireDynamicDb();
  await MediaModel.findByIdAndDelete(id);
  return true;
}

export async function getContactSettings(): Promise<ContactSettings> {
  await requireDynamicDb();
  await ensureSeedData();
  const doc = await ContactSettingsModel.findOne({ key: "primary" }).lean();
  return {
    address: doc?.address ?? "",
    phone: doc?.phone ?? "",
    email: doc?.email ?? "",
    website: doc?.website ?? "",
    socialLinks: {
      facebook: doc?.socialLinks?.facebook || undefined,
      instagram: doc?.socialLinks?.instagram || undefined,
      twitter: doc?.socialLinks?.twitter || undefined,
      youtube: doc?.socialLinks?.youtube || undefined,
      linkedin: doc?.socialLinks?.linkedin || undefined,
    },
    footerTagline: doc?.footerTagline || undefined,
  };
}

export async function updateContactSettings(data: ContactSettings) {
  await requireDynamicDb();
  const doc = await ContactSettingsModel.findOneAndUpdate(
    { key: "primary" },
    { key: "primary", ...data },
    { new: true, upsert: true },
  ).lean();
  return {
    address: doc?.address ?? data.address,
    phone: doc?.phone ?? data.phone,
    email: doc?.email ?? data.email,
    website: doc?.website ?? data.website,
    socialLinks: {
      facebook: doc?.socialLinks?.facebook || undefined,
      instagram: doc?.socialLinks?.instagram || undefined,
      twitter: doc?.socialLinks?.twitter || undefined,
      youtube: doc?.socialLinks?.youtube || undefined,
      linkedin: doc?.socialLinks?.linkedin || undefined,
    },
    footerTagline: doc?.footerTagline || undefined,
  } satisfies ContactSettings;
}

export async function getLegalPages(): Promise<LegalPage[]> {
  await requireDynamicDb();
  await ensureSeedData();
  const docs = await LegalPageModel.find().lean();
  return docs.map((doc) => ({
    id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    content: doc.content,
    isPublished: Boolean(doc.isPublished),
    updatedAt: doc.updatedAt
      ? new Date(doc.updatedAt).toISOString()
      : FALLBACK_ISO,
  }));
}

export async function updateLegalPage(
  id: string,
  data: { title: string; content: string; isPublished: boolean },
) {
  await requireDynamicDb();
  const doc = await LegalPageModel.findByIdAndUpdate(id, data, {
    new: true,
  }).lean();
  if (!doc) return null;
  return {
    id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    content: doc.content,
    isPublished: Boolean(doc.isPublished),
    updatedAt: doc.updatedAt
      ? new Date(doc.updatedAt).toISOString()
      : FALLBACK_ISO,
  } satisfies LegalPage;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  await requireDynamicDb();
  await ensureSeedData();
  const docs = await EnquiryModel.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    mobile: doc.mobile,
    subject: doc.subject,
    message: doc.message,
    status: doc.status,
    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString()
      : FALLBACK_ISO,
  }));
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  await requireDynamicDb();
  await EnquiryModel.findByIdAndUpdate(id, { status });
  return true;
}

export async function getVolunteers(): Promise<VolunteerRequest[]> {
  await requireDynamicDb();
  await ensureSeedData();
  const docs = await VolunteerModel.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    mobile: doc.mobile,
    interest: doc.interest,
    message: doc.message,
    status: doc.status,
    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString()
      : FALLBACK_ISO,
  }));
}

export async function updateVolunteerStatus(
  id: string,
  status: VolunteerStatus,
) {
  await requireDynamicDb();
  await VolunteerModel.findByIdAndUpdate(id, { status });
  return true;
}
