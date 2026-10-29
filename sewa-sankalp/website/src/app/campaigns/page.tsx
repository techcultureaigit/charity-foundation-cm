import type { Metadata } from "next";
import { connection } from "next/server";
import { CampaignsPageView } from "@/components/campaigns/CampaignsPage";
import { FEATURED_CAMPAIGN, type Campaign } from "@/lib/content/campaigns";
import { getCampaigns, getPage } from "@/lib/services/content";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const page = await getPage("campaigns");
  return {
    title: page.seoTitle,
    description: page.seoDescription,
  };
}

function pickFeatured(campaigns: Campaign[]): Campaign {
  return campaigns.find((c) => c.status === "featured") ?? FEATURED_CAMPAIGN;
}

export default async function CampaignsPage() {
  await connection();
  const [page, campaigns] = await Promise.all([
    getPage("campaigns"),
    getCampaigns(),
  ]);
  const featured = pickFeatured(campaigns);

  return (
    <CampaignsPageView page={page} campaigns={campaigns} featured={featured} />
  );
}
