import { connection } from "next/server";
import { PagesManager } from "@/components/pages/PagesManager";
import { getPages } from "@/lib/services/pages";

export const instant = false;

export default async function SeoSettingsPage() {
  await connection();
  const pages = await getPages();
  return (
    <div>
      <p className="mb-4 text-sm text-[var(--admin-muted)]">
        SEO title / description Pages edit drawer mein save hote hain — same
        content website meta tags mein use hota hai.
      </p>
      <PagesManager pages={pages} />
    </div>
  );
}
