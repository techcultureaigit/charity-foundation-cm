import { connection } from "next/server";
import { LegalManager } from "@/components/cms/LegalManager";
import { getLegalPages } from "@/lib/services/cms";

export const instant = false;

export default async function LegalSettingsPage() {
  await connection();
  const pages = await getLegalPages();
  return <LegalManager pages={pages} />;
}
