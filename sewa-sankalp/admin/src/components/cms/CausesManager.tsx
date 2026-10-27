"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { removeCauseAction, saveCauseAction } from "@/app/admin/actions/cms";
import { Badge } from "@/components/ui/Badge";
import { SideDrawer } from "@/components/ui/SideDrawer";
import type { Cause } from "@/lib/types";
import {
  AreaField,
  CheckField,
  IconSelect,
  ImageField,
  Notice,
  TextField,
  type MediaOption,
} from "./fields";

function percent(cause: Cause) {
  if (!cause.goalCount) return 0;
  return Math.min(100, Math.round((cause.helpedCount / cause.goalCount) * 100));
}

export function CausesManager({
  items,
  media,
}: {
  items: Cause[];
  media: MediaOption[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Cause | "new" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const current = selected && selected !== "new" ? selected : null;

  function close() {
    setSelected(null);
    setError(null);
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--admin-muted)]">
          “Recent Causes” cards on the home page. Only enter real, verified
          helped / goal numbers.
        </p>
        <button
          type="button"
          onClick={() => {
            setMessage(null);
            setSelected("new");
          }}
          className="rounded-xl bg-[var(--admin-forest)] px-4 py-2 text-sm font-medium text-white"
        >
          Add cause
        </button>
      </div>
      {message ? (
        <div className="mb-4">
          <Notice>{message}</Notice>
        </div>
      ) : null}

      <div className="admin-card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--admin-border)] bg-[var(--admin-ivory)] text-xs uppercase tracking-[0.12em] text-[var(--admin-muted)]">
            <tr>
              <th className="px-5 py-3 font-medium">#</th>
              <th className="px-5 py-3 font-medium">Cause</th>
              <th className="px-5 py-3 font-medium">Progress</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {items.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="px-5 py-4 text-[var(--admin-gold)]">{item.order}</td>
                <td className="px-5 py-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-0.5 max-w-md text-[var(--admin-muted)]">
                    {item.description}
                  </p>
                </td>
                <td className="px-5 py-4 text-[var(--admin-muted)]">
                  {item.helpedCount} / {item.goalCount} ({percent(item)}%)
                </td>
                <td className="px-5 py-4">
                  <Badge tone={item.isPublished ? "green" : "muted"}>
                    {item.isPublished ? "Published" : "Draft"}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setMessage(null);
                      setSelected(item);
                    }}
                    className="rounded-lg border border-[var(--admin-border)] px-3 py-1.5 text-[var(--admin-forest)] transition hover:border-[var(--admin-forest)] hover:bg-[var(--admin-forest)] hover:text-white"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-[var(--admin-muted)]">
                  No causes yet. Add one to show the section on the home page.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <SideDrawer
        open={Boolean(selected)}
        eyebrow="Cause"
        title={current ? current.title : "New cause"}
        subtitle="Shown in “Recent Causes”"
        onClose={close}
      >
        {selected ? (
          <form
            key={current?.id ?? "new"}
            className="space-y-4"
            action={(formData) => {
              startTransition(async () => {
                setError(null);
                const result = await saveCauseAction(formData);
                if (!result.ok) {
                  setError(result.error);
                  return;
                }
                setMessage("Saved — home page updated");
                close();
                router.refresh();
              });
            }}
          >
            <input type="hidden" name="id" value={current?.id ?? ""} />
            <div className="grid gap-4 sm:grid-cols-[90px_1fr]">
              <TextField
                label="Order"
                name="order"
                type="number"
                defaultValue={current?.order ?? items.length + 1}
              />
              <TextField label="Title" name="title" defaultValue={current?.title} required />
            </div>
            <AreaField
              label="Description"
              name="description"
              defaultValue={current?.description}
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="People helped"
                name="helpedCount"
                type="number"
                defaultValue={current?.helpedCount ?? 0}
              />
              <TextField
                label="Goal"
                name="goalCount"
                type="number"
                defaultValue={current?.goalCount ?? 0}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <IconSelect defaultValue={current?.iconKey} />
              <TextField
                label="“Learn More” link"
                name="href"
                defaultValue={current?.href ?? "/our-work"}
              />
            </div>
            <ImageField
              defaultValue={current?.imageUrl}
              media={media}
              preferredCategory="cause"
            />
            <CheckField
              label="Show on website"
              name="isPublished"
              defaultChecked={current ? current.isPublished : true}
            />

            {error ? <Notice tone="error">{error}</Notice> : null}

            <div className="flex flex-wrap items-center gap-3 border-t border-[var(--admin-border)] pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-xl bg-[var(--admin-forest)] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
              >
                {isPending ? "Saving..." : current ? "Save changes" : "Create cause"}
              </button>
              <button
                type="button"
                onClick={close}
                className="rounded-xl border border-[var(--admin-border)] px-4 py-2.5 text-sm"
              >
                Cancel
              </button>
              {current ? (
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    if (!window.confirm(`Delete “${current.title}”?`)) return;
                    const data = new FormData();
                    data.set("id", current.id);
                    startTransition(async () => {
                      const result = await removeCauseAction(data);
                      if (!result.ok) {
                        setError(result.error);
                        return;
                      }
                      setMessage("Cause deleted");
                      close();
                      router.refresh();
                    });
                  }}
                  className="ml-auto rounded-xl border border-[#e9b3b3] px-4 py-2.5 text-sm text-[#9b1c1c]"
                >
                  Delete
                </button>
              ) : null}
            </div>
          </form>
        ) : null}
      </SideDrawer>
    </>
  );
}
