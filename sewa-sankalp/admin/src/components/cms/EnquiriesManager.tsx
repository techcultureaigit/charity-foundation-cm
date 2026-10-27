"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setEnquiryStatusAction } from "@/app/admin/actions/cms";
import { Badge } from "@/components/ui/Badge";
import type { Enquiry } from "@/lib/types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function statusTone(status: string) {
  if (status === "new") return "gold" as const;
  if (status === "replied") return "green" as const;
  return "muted" as const;
}

export function EnquiriesManager({ items }: { items: Enquiry[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--admin-border)] bg-white px-4 py-8 text-center text-sm text-[var(--admin-muted)]">
          No enquiries yet. Website contact form submissions appear here.
        </p>
      ) : null}
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl border border-[var(--admin-border)] bg-white p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                {item.email}
                {item.mobile ? ` · ${item.mobile}` : ""}
              </p>
            </div>
            <Badge tone={statusTone(item.status)}>{item.status}</Badge>
          </div>
          <p className="mt-4 text-sm font-medium text-[var(--admin-forest)]">
            {item.subject || "General enquiry"}
          </p>
          <p className="mt-2 text-sm leading-6">{item.message}</p>
          <p className="mt-3 text-xs text-[var(--admin-muted)]">
            Received {formatDate(item.createdAt)}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(["read", "replied", "archived"] as const).map((status) => (
              <form
                key={status}
                action={(formData) => {
                  startTransition(async () => {
                    await setEnquiryStatusAction(formData);
                    router.refresh();
                  });
                }}
              >
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="status" value={status} />
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-xl border border-[var(--admin-border)] px-3 py-1.5 text-sm capitalize"
                >
                  Mark {status}
                </button>
              </form>
            ))}
            <a
              href={`mailto:${item.email}`}
              className="rounded-xl bg-[var(--admin-forest)] px-3 py-1.5 text-sm text-white"
            >
              Reply by email
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
