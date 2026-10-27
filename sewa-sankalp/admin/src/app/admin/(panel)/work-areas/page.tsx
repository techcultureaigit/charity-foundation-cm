import { connection } from "next/server";
import { WorkAreasManager } from "@/components/cms/WorkAreasManager";
import { getMediaOptions, getWorkAreas } from "@/lib/services/cms";

export const instant = false;

export default async function WorkAreasPage() {
  await connection();
  const [areas, media] = await Promise.all([getWorkAreas(), getMediaOptions()]);
  return <WorkAreasManager areas={areas} media={media} />;
}