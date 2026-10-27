"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setVolunteerStatusAction } from "@/app/admin/actions/cms";
import { Badge } from "@/components/ui/Badge";
import type { VolunteerRequest } from "@/lib/types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function VolunteersManager({ items }: { items: VolunteerRequest[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="admin-card overflow-hidden">
      {items.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-[var(--admin-muted)]">
          No volunteer requests yet. Website Get Involved form feeds this list.
        </p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--admin-border)] bg-[var(--admin-ivory)] text-xs uppercase tracking-[0.12em] text-[var(--admin-muted)]">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Interest</th>
              <th className="px-5 py-3 font-medium">Contact</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {items.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="px-5 py-4">
                  <p className="font-medium">{item.name}</p>
                  {item.message ? (
                    <p className="mt-1 max-w-xs text-[var(--admin-muted)]">
                      {item.message}
                    </p>
                  ) : null}
                </td>
                <td className="px-5 py-4">{item.interest}</td>
                <td className="px-5 py-4 text-[var(--admin-muted)]">
                  <p>{item.email}</p>
                  {item.mobile ? <p>{item.mobile}</p> : null}
                </td>
                <td className="px-5 py-4 text-[var(--admin-muted)]">
                  {formatDate(item.createdAt)}
                </td>
                <td className="px-5 py-4">
                  <Badge tone={item.status === "new" ? "gold" : "green"}>
                    {item.status}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <form
                    action={(formData) => {
                      startTransition(async () => {
                        await setVolunteerStatusAction(formData);
                        router.refresh();
                      });
                    }}
                  >
                    <input type="hidden" name="id" value={item.id} />
                    <select
                      name="status"
                      defaultValue={item.status}
                      className="rounded-lg border border-[var(--admin-border)] bg-white px-2 py-1 text-xs"
                      onChange={(event) => event.currentTarget.form?.requestSubmit()}
                      disabled={isPending}
                    >
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="approved">approved</option>
                      <option value="declined">declined</option>
                    </select>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
