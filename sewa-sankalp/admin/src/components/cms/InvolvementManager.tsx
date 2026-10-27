"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  removeInvolvementAction,
  saveInvolvementAction,
} from "@/app/admin/actions/cms";
import { Badge } from "@/components/ui/Badge";
import { SideDrawer } from "@/components/ui/SideDrawer";
import type { InvolvementCard } from "@/lib/types";
import {
  AreaField,
  CheckField,
  IconSelect,
  ImageField,
  Notice,
  SelectField,
  TextField,
  type MediaOption,
} from "./fields";

const themes = [
  { value: "cream", label: "Cream (Helper)" },
  { value: "mint", label: "Mint (Volunteer)" },
  { value: "peach", label: "Peach (Supporter)" },
];

export function InvolvementManager({
  items,
  media,
}: {
  items: InvolvementCard[];
  media: MediaOption[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<InvolvementCard | "new" | null>(null);
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
          “Be Part of a Better Tomorrow” cards on the home page. Section headings
          are edited in Pages → Home.
        </p>
        <button
          type="button"
          onClick={() => {
            setMessage(null);
            setSelected("new");
          }}
          className="rounded-xl bg-[var(--admin-forest)] px-4 py-2 text-sm font-medium text-white"
        >
          Add card
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
              <th className="px-5 py-3 font-medium">Card</th>
              <th className="px-5 py-3 font-medium">Button</th>
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
                  <div className="mt-1.5">
                    <Badge tone="gold">{item.theme}</Badge>
                  </div>
                </td>
                <td className="px-5 py-4 text-[var(--admin-muted)]">
                  {item.ctaLabel}
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
                  No cards yet. Add one to show the section on the home page.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <SideDrawer
        open={Boolean(selected)}
        eyebrow="Involvement card"
        title={current ? current.title : "New card"}
        subtitle="Shown in “Be Part of a Better Tomorrow”"
        onClose={close}
      >
        {selected ? (
          <form
            key={current?.id ?? "new"}
            className="space-y-4"
            action={(formData) => {
              startTransition(async () => {
                setError(null);
                const result = await saveInvolvementAction(formData);
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
              <SelectField
                label="Card colour"
                name="theme"
                defaultValue={current?.theme ?? "cream"}
                options={themes}
              />
              <IconSelect defaultValue={current?.iconKey} />
            </div>
            <ImageField
              defaultValue={current?.imageUrl}
              media={media}
              preferredCategory="involve"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Button label"
                name="ctaLabel"
                defaultValue={current?.ctaLabel}
                required
              />
              <TextField
                label="Button link"
                name="ctaHref"
                defaultValue={current?.ctaHref ?? "/get-involved"}
              />
            </div>
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
                {isPending ? "Saving..." : current ? "Save changes" : "Create card"}
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
                      const result = await removeInvolvementAction(data);
                      if (!result.ok) {
                        setError(result.error);
                        return;
                      }
                      setMessage("Card deleted");
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
