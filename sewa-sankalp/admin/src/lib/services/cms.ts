import { adminGet, adminSend, adminUpload } from "@/lib/api/backend";
import type {
  BlogPostItem,
  CampaignItem,
  Cause,
  ContactSettings,
  Enquiry,
  EnquiryStatus,
  EventItem,
  FocusTheme,
  ImpactHighlight,
  InvolvementCard,
  InvolvementTheme,
  EventTheme,
  MediaCategory,
  LegalPage,
  MediaItem,
  VolunteerRequest,
  VolunteerStatus,
  WorkArea,
} from "@/lib/types";

async function mustGet<T>(path: string): Promise<T> {
  const result = await adminGet<T>(path);
  if (!result.ok) {
    throw new Error(
      result.error === "fetch failed"
        ? "Backend unreachable. Start sewa-sankalp/backend on port 4000 (use API_URL=http://127.0.0.1:4000/api)."
        : result.error,
    );
  }
  return result.data;
}

export async function getWorkAreas(): Promise<WorkArea[]> {
  return mustGet<WorkArea[]>("/admin/work-areas");
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
  const result = await adminSend<WorkArea>(`/admin/work-areas/${id}`, "PUT", data);
  return result.ok ? result.data : null;
}

export type InvolvementInput = Omit<InvolvementCard, "id">;

export async function getInvolvementCards(): Promise<InvolvementCard[]> {
  return mustGet<InvolvementCard[]>("/admin/involvement");
}

export async function createInvolvementCard(data: InvolvementInput) {
  const result = await adminSend<InvolvementCard>("/admin/involvement", "POST", data);
  if (!result.ok) throw new Error(result.error);
  return result.data;
}

export async function updateInvolvementCard(id: string, data: InvolvementInput) {
  const result = await adminSend<InvolvementCard>(
    `/admin/involvement/${id}`,
    "PUT",
    data,
  );
  return result.ok ? result.data : null;
}

export async function deleteInvolvementCard(id: string) {
  await adminSend(`/admin/involvement/${id}`, "DELETE");
  return true;
}

export type CauseInput = Omit<Cause, "id">;

export async function getCauses(): Promise<Cause[]> {
  return mustGet<Cause[]>("/admin/causes");
}

export async function createCause(data: CauseInput) {
  const result = await adminSend<Cause>("/admin/causes", "POST", data);
  if (!result.ok) throw new Error(result.error);
  return result.data;
}

export async function updateCause(id: string, data: CauseInput) {
  const result = await adminSend<Cause>(`/admin/causes/${id}`, "PUT", data);
  return result.ok ? result.data : null;
}

export async function deleteCause(id: string) {
  await adminSend(`/admin/causes/${id}`, "DELETE");
  return true;
}

export type CampaignInput = Omit<CampaignItem, "id">;

export async function getCampaigns(): Promise<CampaignItem[]> {
  return mustGet<CampaignItem[]>("/admin/campaigns");
}

export async function createCampaign(data: CampaignInput) {
  const result = await adminSend<CampaignItem>("/admin/campaigns", "POST", data);
  if (!result.ok) throw new Error(result.error);
  return result.data;
}

export async function updateCampaign(id: string, data: CampaignInput) {
  const result = await adminSend<CampaignItem>(
    `/admin/campaigns/${id}`,
    "PUT",
    data,
  );
  return result.ok ? result.data : null;
}

export async function deleteCampaign(id: string) {
  await adminSend(`/admin/campaigns/${id}`, "DELETE");
  return true;
}

export type BlogPostInput = Omit<BlogPostItem, "id" | "updatedAt">;

export async function getBlogPosts(): Promise<BlogPostItem[]> {
  return mustGet<BlogPostItem[]>("/admin/blog-posts");
}

export async function createBlogPost(data: BlogPostInput) {
  const result = await adminSend<BlogPostItem>("/admin/blog-posts", "POST", data);
  if (!result.ok) throw new Error(result.error);
  return result.data;
}

export async function updateBlogPost(id: string, data: BlogPostInput) {
  const result = await adminSend<BlogPostItem>(
    `/admin/blog-posts/${id}`,
    "PUT",
    data,
  );
  return result.ok ? result.data : null;
}

export async function deleteBlogPost(id: string) {
  await adminSend(`/admin/blog-posts/${id}`, "DELETE");
  return true;
}

export type EventInput = Omit<EventItem, "id">;

export async function getEvents(): Promise<EventItem[]> {
  return mustGet<EventItem[]>("/admin/events");
}

export async function createEvent(data: EventInput) {
  const result = await adminSend<EventItem>("/admin/events", "POST", data);
  if (!result.ok) throw new Error(result.error);
  return result.data;
}

export async function updateEvent(id: string, data: EventInput) {
  const result = await adminSend<EventItem>(`/admin/events/${id}`, "PUT", data);
  return result.ok ? result.data : null;
}

export async function deleteEvent(id: string) {
  await adminSend(`/admin/events/${id}`, "DELETE");
  return true;
}

export async function getImpactItems(): Promise<ImpactHighlight[]> {
  return mustGet<ImpactHighlight[]>("/admin/impact");
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
  const result = await adminSend<ImpactHighlight>(
    `/admin/impact/${id}`,
    "PUT",
    data,
  );
  return result.ok ? result.data : null;
}

export async function getMediaItems(): Promise<MediaItem[]> {
  return mustGet<MediaItem[]>("/admin/media");
}

export async function getMediaOptions() {
  const items = await getMediaItems();
  return items
    .filter((item) => item.isPublished)
    .map((item) => ({
      title: item.title,
      url: item.url,
      category: item.category,
    }));
}

export async function uploadMediaViaApi(formData: FormData) {
  const result = await adminUpload<MediaItem>("/admin/media/upload", formData);
  if (!result.ok) throw new Error(result.error);
  return result.data;
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
  const result = await adminSend<MediaItem>(`/admin/media/${id}`, "PUT", data);
  return result.ok ? result.data : null;
}

export async function deleteMediaItem(id: string) {
  await adminSend(`/admin/media/${id}`, "DELETE");
  return true;
}

export async function getContactSettings(): Promise<ContactSettings> {
  return mustGet<ContactSettings>("/admin/contact");
}

export async function updateContactSettings(data: ContactSettings) {
  const result = await adminSend<ContactSettings>("/admin/contact", "PUT", data);
  if (!result.ok) throw new Error(result.error);
  return result.data;
}

export async function getLegalPages(): Promise<LegalPage[]> {
  return mustGet<LegalPage[]>("/admin/legal");
}

export async function updateLegalPage(
  id: string,
  data: { title: string; content: string; isPublished: boolean },
) {
  const pages = await getLegalPages();
  const match = pages.find((p) => p.id === id);
  if (!match) return null;
  const result = await adminSend<LegalPage>(
    `/admin/legal/${match.slug}`,
    "PUT",
    data,
  );
  return result.ok ? result.data : null;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  return mustGet<Enquiry[]>("/admin/enquiries");
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  await adminSend(`/admin/enquiries/${id}/status`, "PATCH", { status });
  return true;
}

export async function getVolunteers(): Promise<VolunteerRequest[]> {
  return mustGet<VolunteerRequest[]>("/admin/volunteers");
}

export async function updateVolunteerStatus(
  id: string,
  status: VolunteerStatus,
) {
  await adminSend(`/admin/volunteers/${id}/status`, "PATCH", { status });
  return true;
}

// Keep theme type exports used by actions indirectly
export type { InvolvementTheme, EventTheme, FocusTheme };
