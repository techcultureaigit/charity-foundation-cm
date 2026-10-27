import { connection } from "next/server";
import { InvolvementManager } from "@/components/cms/InvolvementManager";
import { getInvolvementCards, getMediaOptions } from "@/lib/services/cms";

export const instant = false;

export default async function InvolvementPage() {
  await connection();
  const [items, media] = await Promise.all([
    getInvolvementCards(),
    getMediaOptions(),
  ]);
  return <InvolvementManager items={items} media={media} />;
}