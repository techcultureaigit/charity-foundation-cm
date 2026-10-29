import type { Metadata } from "next";
import { connection } from "next/server";
import { EducationPageView } from "@/components/objective/EducationPage";
import { getPage } from "@/lib/services/content";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const page = await getPage("education");
  return {
    title: page.seoTitle,
    description: page.seoDescription,
  };
}

export default async function EducationObjectivePage() {
  await connection();
  const page = await getPage("education");
  return <EducationPageView page={page} />;
}
