import { requireDynamicDb } from "@/lib/db/runtime";
import { ensureSeedData } from "@/lib/db/seed";
import { EnquiryModel } from "@/lib/models/Enquiry";
import { VolunteerModel } from "@/lib/models/Volunteer";
import { PageModel } from "@/lib/models/Page";
import { MediaModel } from "@/lib/models/Media";
import type { DashboardStats, Enquiry, VolunteerRequest } from "@/lib/types";

const FALLBACK_ISO = "1970-01-01T00:00:00.000Z";

export async function getDashboardData(): Promise<{
  stats: DashboardStats;
  recentEnquiries: Enquiry[];
  volunteers: VolunteerRequest[];
}> {
  await requireDynamicDb();
  await ensureSeedData();

  const [
    newEnquiries,
    volunteerRequests,
    publishedPages,
    mediaItems,
    enquiryDocs,
    volunteerDocs,
  ] = await Promise.all([
    EnquiryModel.countDocuments({ status: "new" }),
    VolunteerModel.countDocuments(),
    PageModel.countDocuments(),
    MediaModel.countDocuments(),
    EnquiryModel.find().sort({ createdAt: -1 }).limit(4).lean(),
    VolunteerModel.find().sort({ createdAt: -1 }).limit(4).lean(),
  ]);

  return {
    stats: {
      newEnquiries,
      volunteerRequests,
      publishedPages,
      mediaItems,
    },
    recentEnquiries: enquiryDocs.map((doc) => ({
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
    })),
    volunteers: volunteerDocs.map((doc) => ({
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
    })),
  };
}
