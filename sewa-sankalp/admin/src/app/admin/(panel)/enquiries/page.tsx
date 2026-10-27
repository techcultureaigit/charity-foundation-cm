import { connection } from "next/server";
import { EnquiriesManager } from "@/components/cms/EnquiriesManager";
import { getEnquiries } from "@/lib/services/cms";

export const instant = false;

export default async function EnquiriesPage() {
  await connection();
  const items = await getEnquiries();
  return <EnquiriesManager items={items} />;
}
