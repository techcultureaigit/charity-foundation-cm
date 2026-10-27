import { connection } from "next/server";
import { EventsManager } from "@/components/cms/EventsManager";
import { getEvents, getMediaOptions } from "@/lib/services/cms";

export const instant = false;

export default async function EventsPage() {
  await connection();
  const [items, media] = await Promise.all([getEvents(), getMediaOptions()]);
  return <EventsManager items={items} media={media} />;
}