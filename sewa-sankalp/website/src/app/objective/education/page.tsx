import type { Metadata } from "next";
import { EducationPageView } from "@/components/objective/EducationPage";

export const metadata: Metadata = {
  title: "Education | Our Objectives",
  description:
    "Building a better future through education — scholarships, learning centres and skill development by Sewa Sankalp Foundation.",
};

export default function EducationObjectivePage() {
  return <EducationPageView />;
}
