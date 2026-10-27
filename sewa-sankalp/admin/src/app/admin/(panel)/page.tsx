import Link from "next/link";
import { connection } from "next/server";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/Badge";
import { getDashboardData } from "@/lib/services/dashboard";

export const instant = false;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function AdminDashboardPage() {
  await connection();
  const { stats, recentEnquiries, volunteers } = await getDashboardData();

  return (
    <div>
      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="New enquiries"
          value={stats.newEnquiries}
          hint="Contact form messages"
        />
        <StatCard
          label="Volunteer requests"
          value={stats.volunteerRequests}
          hint="Get Involved leads"
        />
        <StatCard
          label="Published pages"
          value={stats.publishedPages}
          hint="Home to Contact"
        />
        <StatCard
          label="Media items"
          value={stats.mediaItems}
          hint="Consent-checked assets"
        />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <section className="admin-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-[family-name:var(--font-admin-display)] text-xl text-[var(--admin-forest)]">
                Recent enquiries
              </h3>
              <p className="mt-0.5 text-xs text-[var(--admin-muted)]">
                From Impact & Contact form
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-1.5 text-xs text-[var(--admin-forest)] transition hover:border-[var(--admin-forest)]"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-[var(--admin-border)]">
            {recentEnquiries.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[var(--admin-charcoal)]">
                    {item.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[var(--admin-muted)]">
                    {item.subject || "General enquiry"} ·{" "}
                    {formatDate(item.createdAt)}
                  </p>
                </div>
                <Badge tone={item.status === "new" ? "gold" : "muted"}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-[family-name:var(--font-admin-display)] text-xl text-[var(--admin-forest)]">
                Volunteer requests
              </h3>
              <p className="mt-0.5 text-xs text-[var(--admin-muted)]">
                Get Involved submissions
              </p>
            </div>
            <Link
              href="/admin/volunteers"
              className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-1.5 text-xs text-[var(--admin-forest)] transition hover:border-[var(--admin-forest)]"
            >
              Manage
            </Link>
          </div>

          <div className="space-y-2.5">
            {volunteers.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3.5 py-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{item.name}</p>
                  <Badge tone={item.status === "new" ? "green" : "muted"}>
                    {item.status}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-[var(--admin-muted)]">
                  Interest: {item.interest}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-dashed border-[var(--admin-gold)] bg-[rgba(197,164,109,0.1)] px-3.5 py-3 text-xs leading-5 text-[var(--admin-charcoal)]">
            Publish impact numbers only after verification. Unverified counters
            stay hidden on the public site.
          </div>
        </section>
      </div>
    </div>
  );
}
