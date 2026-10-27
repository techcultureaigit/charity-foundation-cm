import { connection } from "next/server";
import { ContactManager } from "@/components/cms/ContactManager";
import { getContactSettings } from "@/lib/services/cms";

export const instant = false;

export default async function ContactSettingsPage() {
  await connection();
  const contact = await getContactSettings();
  return <ContactManager contact={contact} />;
}
