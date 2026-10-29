import { connection } from "next/server";
import { renderNavPageEditor } from "@/lib/adminNavPageLoad";

export const instant = false;

export default async function AdminContactPageEditor() {
  await connection();
  return renderNavPageEditor({
    slug: "impact-contact",
    title: "Contact Us",
    description: "Hero headline accent and banner image for /impact-contact.",
    saveLabel: "Save contact page",
  });
}
