import { PasswordField } from "@/components/auth/PasswordField";
import { loginAdmin } from "../actions";

export const instant = false;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === "1";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#102821_0%,#173B31_42%,#F7F4ED_42.1%,#F7F4ED_100%)]" />
      <div className="absolute left-[-6%] top-[12%] h-56 w-56 rounded-full bg-[var(--admin-gold)]/20 blur-3xl" />
      <div className="absolute bottom-[8%] right-[-4%] h-64 w-64 rounded-full bg-[var(--admin-forest)]/10 blur-3xl" />

      <div className="relative w-full max-w-md rounded-[1.75rem] border border-[var(--admin-border)] bg-white/95 p-8 shadow-[0_24px_80px_rgba(23,59,49,0.16)] backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--admin-gold)]">
          Sewa Sankalp Foundation
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-admin-display)] text-3xl text-[var(--admin-forest)]">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm leading-6 text-[var(--admin-muted)]">
          Manage pages, work areas, enquiries, media, and verified impact.
        </p>

        <form action={loginAdmin} className="mt-8 space-y-4">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-[var(--admin-charcoal)]">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              defaultValue="admin@sewasankalp.org"
              className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] transition focus:ring-2"
            />
          </label>

          <PasswordField />

          {hasError ? (
            <p className="rounded-xl bg-[#fde8e8] px-3 py-2 text-sm text-[#9b1c1c]">
              Invalid email or password.
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-[var(--admin-forest)] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#124033]"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-xs leading-5 text-[var(--admin-muted)]">
          Dev default password: <code>admin123</code>. Override with{" "}
          <code>ADMIN_PASSWORD</code> in env.
        </p>
      </div>
    </div>
  );
}
