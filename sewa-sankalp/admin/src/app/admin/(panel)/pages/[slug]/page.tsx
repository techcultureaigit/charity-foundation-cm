import { redirect } from "next/navigation";

export const instant = false;

export default async function EditPageRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;
  redirect("/admin/pages");
}
