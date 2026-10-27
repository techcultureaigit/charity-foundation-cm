import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "ssf_admin_session";

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ADMIN_SESSION_COOKIE)?.value === "authenticated";
}
