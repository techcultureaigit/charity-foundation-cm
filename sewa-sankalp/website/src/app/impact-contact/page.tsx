import type { Metadata } from "next";
import { connection } from "next/server";
import { ContactPageView } from "@/components/contact/ContactPage";
import { getContactSettings, getPage } from "@/lib/services/content";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const page = await getPage("impact-contact");
  return {
    title: page.seoTitle,
    description: page.seoDescription,
  };
}

export default async function ImpactContactPage() {
  await connection();
  const [page, contact] = await Promise.all([
    getPage("impact-contact"),
    getContactSettings(),
  ]);

  const rawHero = page.heroImageUrl?.trim() || "";
  const heroImageUrl =
    !rawHero || rawHero.includes("contact-hero.jpg")
      ? "/uploads/contact-hero.png"
      : rawHero;

  const viewPage = {
    ...page,
    title: page.title || "Contact Us",
    headline: page.headline?.trim() || "Contact Us",
    heroAccentWords: page.heroAccentWords?.trim() || "Us",
  };

  return (
    <ContactPageView
      page={viewPage}
      contact={contact}
      heroImageUrl={heroImageUrl}
    />
  );
}
