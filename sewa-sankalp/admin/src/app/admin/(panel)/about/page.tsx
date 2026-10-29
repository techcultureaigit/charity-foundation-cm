import { connection } from "next/server";
import { renderNavPageEditor } from "@/lib/adminNavPageLoad";

export const instant = false;

export default async function AdminAboutPage() {
  await connection();
  return renderNavPageEditor({
    slug: "about",
    title: "About Us",
    description:
      "Homepage About column plus the full /about page sections (hero, pillars, journey, CTA).",
    saveLabel: "Save about page",
  });
}
