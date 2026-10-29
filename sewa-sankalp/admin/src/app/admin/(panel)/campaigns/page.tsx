import { connection } from "next/server";
import { CampaignsManager } from "@/components/cms/CampaignsManager";
import { NavPageManager } from "@/components/pages/NavPageManager";
import { getCampaigns, getMediaOptions } from "@/lib/services/cms";
import { getPages } from "@/lib/services/pages";

export const instant = false;

export default async function AdminCampaignsPage() {
  await connection();

  let pages;
  let campaigns;
  let media = [];
  try {
    [pages, campaigns, media] = await Promise.all([
      getPages(),
      getCampaigns(),
      getMediaOptions(),
    ]);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not load campaigns module.";
    return (
      <div className="admin-card space-y-2 border border-[#f0c2c2] bg-[#fff7f7] p-6 text-sm text-[#9b1c1c]">
        <p className="font-semibold">Campaigns could not load</p>
        <p>{message}</p>
      </div>
    );
  }

  const shell = pages.find((page) => page.slug === "campaigns");

  return (
    <div className="space-y-10 pb-8">
      {shell ? (
        <NavPageManager
          page={shell}
          media={media}
          slug="campaigns"
          title="Campaigns"
          description="Page banner and featured/CTA images for /campaigns."
          saveLabel="Save campaigns page"
        />
      ) : (
        <div className="admin-card p-6 text-sm text-[var(--admin-muted)]">
          Campaigns page shell not found — start the backend to seed nav pages.
        </div>
      )}

      <div className="space-y-4">
        <div className="admin-card space-y-1 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-gold-deep)]">
            Campaign entries
          </p>
          <h2 className="font-[family-name:var(--font-admin-display)] text-xl text-[var(--admin-forest)]">
            Ongoing & featured campaigns
          </h2>
        </div>
        <CampaignsManager items={campaigns} media={media} />
      </div>
    </div>
  );
}
