import type { Metadata } from "next";
import { CampaignsPageView } from "@/components/campaigns/CampaignsPage";

export const metadata: Metadata = {
  title: "Campaigns | Every Campaign. A Brighter Tomorrow.",
  description:
    "Explore Sewa Sankalp Foundation campaigns — education, women empowerment, health, environment and community support.",
};

export default function CampaignsPage() {
  return <CampaignsPageView />;
}
