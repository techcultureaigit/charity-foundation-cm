import { connection } from "next/server";
import { HomepageManager } from "@/components/pages/HomepageManager";
import { getMediaOptions } from "@/lib/services/cms";
import { getPages } from "@/lib/services/pages";

export const instant = false;

export default async function AdminHomepagePage() {
  await connection();

  let pages;
  let media = [];
  try {
    [pages, media] = await Promise.all([getPages(), getMediaOptions()]);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not load homepage data.";
    return (
      <div className="admin-card space-y-2 border border-[#f0c2c2] bg-[#fff7f7] p-6 text-sm text-[#9b1c1c]">
        <p className="font-semibold">Homepage could not load</p>
        <p>{message}</p>
        <p className="text-[var(--admin-muted)]">
          Keep <code className="rounded bg-black/5 px-1">npm run dev</code>{" "}
          running in <code className="rounded bg-black/5 px-1">sewa-sankalp/backend</code>,
          then refresh.
        </p>
      </div>
    );
  }

  const home = pages.find((page) => page.slug === "home");

  if (!home) {
    return (
      <div className="admin-card p-6 text-sm text-[var(--admin-muted)]">
        Home page record not found. Seed pages first, then reopen Homepage.
      </div>
    );
  }

  return <HomepageManager page={home} media={media} />;
}
