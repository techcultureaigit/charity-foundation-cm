import { redirect } from "next/navigation";

/** Legacy URL — Blog shell + posts live together under /admin/blog */
export default function AdminBlogPostsRedirectPage() {
  redirect("/admin/blog");
}
