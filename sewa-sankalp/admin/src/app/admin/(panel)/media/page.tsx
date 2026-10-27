import { connection } from "next/server";
import { MediaManager } from "@/components/cms/MediaManager";
import { getMediaItems } from "@/lib/services/cms";

export const instant = false;

export default async function MediaPage() {
  await connection();
  const items = await getMediaItems();
  return <MediaManager items={items} />;
}
