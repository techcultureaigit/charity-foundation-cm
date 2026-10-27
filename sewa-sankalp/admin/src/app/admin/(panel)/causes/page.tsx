import { connection } from "next/server";
import { CausesManager } from "@/components/cms/CausesManager";
import { getCauses, getMediaOptions } from "@/lib/services/cms";

export const instant = false;

export default async function CausesPage() {
  await connection();
  const [items, media] = await Promise.all([getCauses(), getMediaOptions()]);
  return <CausesManager items={items} media={media} />;
}