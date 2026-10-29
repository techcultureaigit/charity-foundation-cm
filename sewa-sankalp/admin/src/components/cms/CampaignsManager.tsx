"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  removeCampaignAction,
  saveCampaignAction,
} from "@/app/admin/actions/cms";
import { Badge } from "@/components/ui/Badge";
import { SideDrawer } from "@/components/ui/SideDrawer";
import type { CampaignItem } from "@/lib/types";
import {
  AreaField,
  CheckField,
  ImageField,
  Notice,
  SelectField,
  TextField,
  type MediaOption,
} from "./fields";

const categories = [
  { value: "education", label: "Education" },
  { value: "women", label: "Women" },
  { value: "health", label: "Health" },
  { value: "environment", label: "Environment" },
  { value: "community", label: "Community" },
];

const statuses = [
  { value: "ongoing", label: "Ongoing" },
  { value: "featured", label: "Featured (hero card)" },
];

function percent(item: CampaignItem) {
  if (!item.target) return 0;
  return Math.min(100, Math.round((item.raised / item.target) * 100));
}

function highlightsJson(item: CampaignItem | null) {
  if (!item?.highlights?.length) return "[]";
  return JSON.stringify(item.highlights, null, 2);
}

export function CampaignsManager({
  items,
  media,
}: {
  items: CampaignItem[];
  media: MediaOption[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<CampaignItem | "new" | null>(null);
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
          Campaign cards on the live Campaigns page. Use Featured status for the
          large hero campaign; only enter verified raised / target amounts.
        </p>
        <button
          type="button"
          onClick={() => {
            setMessage(null);
            setSelected("new");
          }}
          className="rounded-xl bg-[var(--admin-forest)] px-4 py-2 text-sm font-medium text-white"
        >
          Add campaign
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
              <th className="px-5 py-3 font-medium">Campaign</th>
              <th className="px-5 py-3 font-medium">Progress</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {items.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="px-5 py-4 text-[var(--admin-gold)]">
                  {item.order}
                </td>
                <td className="px-5 py-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-0.5 max-w-md text-[var(--admin-muted)]">
                    {item.description}
                  </p>
                  <p className="mt-1 text-xs capitalize text-[var(--admin-muted)]">
                    {item.category} · {item.status}
                  </p>
                </td>
                <td className="px-5 py-4 text-[var(--admin-muted)]">
                  ₹{item.raised.toLocaleString("en-IN")} / ₹
                  {item.target.toLocaleString("en-IN")} ({percent(item)}%)
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
                <td
                  colSpan={5}
                  className="px-5 py-8 text-center text-[var(--admin-muted)]"
                >
                  No campaigns yet. Add one to populate the Campaigns page.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <SideDrawer
        open={Boolean(selected)}
        eyebrow="Campaign"
        title={current ? current.title : "New campaign"}
        subtitle="Live /campaigns listing"
        onClose={close}
      >
        {selected ? (
          <form
            key={current?.id ?? "new"}
            className="space-y-4"
            action={(formData) => {
              startTransition(async () => {
                setError(null);
                const result = await saveCampaignAction(formData);
                if (!result.ok) {
                  setError(result.error);
                  return;
                }
                setMessage("Saved — campaigns page updated");
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
                defaultValue={current?.order ?? items.length}
              />
              <TextField
                label="URL slug"
                name="slug"
                defaultValue={current?.slug}
                required
                hint="Used in links, e.g. education-every-child"
              />
            </div>
            <TextField
              label="Title"
              name="title"
              defaultValue={current?.title}
              required
            />
            <TextField
              label="Subtitle (optional)"
              name="subtitle"
              defaultValue={current?.subtitle ?? ""}
            />
            <AreaField
              label="Description"
              name="description"
              defaultValue={current?.description}
              rows={4}
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Category"
                name="category"
                defaultValue={current?.category ?? "education"}
                options={categories}
              />
              <SelectField
                label="Display status"
                name="status"
                defaultValue={current?.status ?? "ongoing"}
                options={statuses}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Raised (INR)"
                name="raised"
                type="number"
                defaultValue={current?.raised ?? 0}
              />
              <TextField
                label="Target (INR)"
                name="target"
                type="number"
                defaultValue={current?.target ?? 0}
              />
            </div>
            <TextField
              label="Donate / learn more link"
              name="href"
              defaultValue={current?.href ?? "/get-involved"}
            />
            <ImageField
              defaultValue={current?.imageUrl}
              media={media}
              preferredCategory="cause"
            />
            <AreaField
              label="Highlights (JSON array)"
              name="highlights"
              defaultValue={highlightsJson(current)}
              rows={5}
              hint='e.g. [{"icon":"book","label":"School kits"}]'
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
                {isPending
                  ? "Saving..."
                  : current
                    ? "Save changes"
                    : "Create campaign"}
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
                      const result = await removeCampaignAction(data);
                      if (!result.ok) {
                        setError(result.error);
                        return;
                      }
                      setMessage("Campaign deleted");
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
