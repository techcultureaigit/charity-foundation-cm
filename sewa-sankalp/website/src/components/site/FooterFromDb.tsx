import { connection } from "next/server";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getContactSettings, getPublishedMedia } from "@/lib/services/content";

export async function FooterFromDb() {
  await connection();
  const [contact, gallery] = await Promise.all([
    getContactSettings(),
    getPublishedMedia("gallery"),
  ]);
  return (
    <SiteFooter
      contact={contact}
      gallery={gallery.slice(0, 4)}
      year={new Date().getFullYear()}
    />
  );
}