import { connection } from "next/server";
import { ImpactManager } from "@/components/cms/ImpactManager";
import { getImpactItems } from "@/lib/services/cms";

export const instant = false;

export default async function ImpactPage() {
  await connection();
  const items = await getImpactItems();
  return <ImpactManager items={items} />;
}
