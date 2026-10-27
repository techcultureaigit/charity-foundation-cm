import { connection } from "next/server";
import { VolunteersManager } from "@/components/cms/VolunteersManager";
import { getVolunteers } from "@/lib/services/cms";

export const instant = false;

export default async function VolunteersPage() {
  await connection();
  const items = await getVolunteers();
  return <VolunteersManager items={items} />;
}
