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

  // Prefer admin hero image; fall back to packaged wide banner asset
  const rawHero = page.heroImageUrl?.trim() || "";
  const heroImageUrl =
    !rawHero || rawHero.includes("contact-hero.jpg")
      ? "/uploads/contact-hero.png"
      : rawHero;

  // Force reference copy until admin saves custom Contact Us content
  const referenceBody =
    "We'd love to hear from you. Reach out to us for any queries, collaborations, partnerships or to get involved in our mission.";
  const needsReferenceCopy =
    page.headline ===
      "The Measure of Our Work Is the Difference We Strive to Make." ||
    page.body.includes("Whether you would like to learn more") ||
    page.body.includes("supporting deprived families");

  const viewPage = needsReferenceCopy
    ? {
        ...page,
        title: "Contact Us",
        headline: "Contact Us",
        body: referenceBody,
        heroAccentWords: page.heroAccentWords || "Us",
      }
    : {
        ...page,
        headline: page.headline || "Contact Us",
        heroAccentWords: page.heroAccentWords || "Us",
      };

  return (
    <ContactPageView
      page={viewPage}
      contact={contact}
      heroImageUrl={heroImageUrl}
    />
  );
}
