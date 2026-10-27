import { connection } from "next/server";
import { PagesManager } from "@/components/pages/PagesManager";
import { getMediaOptions } from "@/lib/services/cms";
import { getPages } from "@/lib/services/pages";

export const instant = false;

export default async function AdminPagesPage() {
  await connection();
  const [pages, media] = await Promise.all([getPages(), getMediaOptions()]);

  return (
    <div>
      <PagesManager pages={pages} media={media} />
    </div>
  );
}
