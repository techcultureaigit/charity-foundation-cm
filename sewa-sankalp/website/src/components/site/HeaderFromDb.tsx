import { connection } from "next/server";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getContactSettings } from "@/lib/services/content";

export async function HeaderFromDb() {
  await connection();
  const contact = await getContactSettings();
  return <SiteHeader contact={contact} />;
}
