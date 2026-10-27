"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { removeEventAction, saveEventAction } from "@/app/admin/actions/cms";
import { Badge } from "@/components/ui/Badge";
import { SideDrawer } from "@/components/ui/SideDrawer";
import type { EventItem } from "@/lib/types";
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
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "red", label: "Red / pink" },
];

export function EventsManager({
  items,
  media,
}: {
  items: EventItem[];
  media: MediaOption[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<EventItem | "new" | null>(null);
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
          “Upcoming Events” on the home page. The featured event is shown larger;
          mark only one. Date format: <code>25 Oct 2024</code>.
        </p>
        <button
          type="button"
          onClick={() => {
            setMessage(null);
            setSelected("new");
          }}
          className="rounded-xl bg-[var(--admin-forest)] px-4 py-2 text-sm font-medium text-white"
        >
          Add event
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
              <th className="px-5 py-3 font-medium">Event</th>
              <th className="px-5 py-3 font-medium">Date / place</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {items.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="px-5 py-4 text-[var(--admin-gold)]">{item.order}</td>
                <td className="px-5 py-4">
                  <p className="font-medium">
                    {item.title}{" "}
                    {item.isFeatured ? <Badge tone="gold">Featured</Badge> : null}
                  </p>
                  <p className="mt-0.5 max-w-md text-[var(--admin-muted)]">
                    {item.description}
                  </p>
                </td>
                <td className="px-5 py-4 text-[var(--admin-muted)]">
                  <p>{item.dateLabel}</p>
                  <p>{item.location}</p>
                  <p>{item.ticketInfo}</p>
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
                  No events yet. Add one to show the section on the home page.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <SideDrawer
        open={Boolean(selected)}
        eyebrow="Event"
        title={current ? current.title : "New event"}
        subtitle="Shown in “Upcoming Events”"
        onClose={close}
      >
        {selected ? (
          <form
            key={current?.id ?? "new"}
            className="space-y-4"
            action={(formData) => {
              startTransition(async () => {
                setError(null);
                const result = await saveEventAction(formData);
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
            <div className="grid gap-4 sm:grid-cols-3">
              <TextField
                label="Date"
                name="dateLabel"
                defaultValue={current?.dateLabel}
                placeholder="25 Oct 2024"
              />
              <TextField
                label="Location"
                name="location"
                defaultValue={current?.location}
              />
              <TextField
                label="Ticket"
                name="ticketInfo"
                defaultValue={current?.ticketInfo}
                placeholder="Free of Cost"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Accent colour"
                name="theme"
                defaultValue={current?.theme ?? "green"}
                options={themes}
              />
              <IconSelect defaultValue={current?.iconKey} />
            </div>
            <ImageField
              defaultValue={current?.imageUrl}
              media={media}
              preferredCategory="event"
            />
            <TextField
              label="Event link"
              name="href"
              defaultValue={current?.href ?? "/get-involved"}
            />
            <div className="flex flex-wrap gap-5">
              <CheckField
                label="Featured (large card)"
                name="isFeatured"
                defaultChecked={current?.isFeatured}
              />
              <CheckField
                label="Show on website"
                name="isPublished"
                defaultChecked={current ? current.isPublished : true}
              />
            </div>

            {error ? <Notice tone="error">{error}</Notice> : null}

            <div className="flex flex-wrap items-center gap-3 border-t border-[var(--admin-border)] pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-xl bg-[var(--admin-forest)] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
              >
                {isPending ? "Saving..." : current ? "Save changes" : "Create event"}
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
                      const result = await removeEventAction(data);
                      if (!result.ok) {
                        setError(result.error);
                        return;
                      }
                      setMessage("Event deleted");
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
