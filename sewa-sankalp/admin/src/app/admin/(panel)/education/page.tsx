import { connection } from "next/server";
import { renderNavPageEditor } from "@/lib/adminNavPageLoad";

export const instant = false;

export default async function AdminEducationPage() {
  await connection();
  return renderNavPageEditor({
    slug: "education",
    title: "Education",
    description:
      "Banner copy for /objective/education. Section modules on that page still use static layout until wired to CMS.",
    saveLabel: "Save education page",
  });
}
