"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { saveWorkAreaAction } from "@/app/admin/actions/cms";
import { Badge } from "@/components/ui/Badge";
import type { WorkArea } from "@/lib/types";
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
  { value: "pink", label: "Pink (Women Empowerment)" },
  { value: "green", label: "Green (Child Development)" },
  { value: "blue", label: "Blue (Education & Health)" },
  { value: "orange", label: "Orange (Social Welfare)" },
];

export function WorkAreasManager({
  areas,
  media,
}: {
  areas: WorkArea[];
  media: MediaOption[];
}) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="grid gap-4">
      <p className="text-sm text-[var(--admin-muted)]">
        The first four published areas appear as the pastel focus cards in the
        home “Introduction” section.
      </p>
      {message ? <Notice>{message}</Notice> : null}
      {areas.map((area) => (
        <form
          key={area.id}
          className="rounded-2xl border border-[var(--admin-border)] bg-white p-5"
          action={(formData) => {
            startTransition(async () => {
              const result = await saveWorkAreaAction(formData);
              setMessage(
                result.ok ? "Saved — website will show updated work area" : result.error,
              );
              if (result.ok) router.refresh();
            });
          }}
        >
          <input type="hidden" name="id" value={area.id} />
          <div className="flex flex-wrap items-start justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--admin-gold)]">
              0{area.order}
            </p>
            <Badge tone={area.isPublished ? "green" : "muted"}>
              {area.isPublished ? "Published" : "Draft"}
            </Badge>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <TextField label="Title" name="title" defaultValue={area.title} required />
            <TextField
              label="Subtitle"
              name="subtitle"
              defaultValue={area.subtitle}
              required
              hint="Used on the Our Work page."
            />
            <AreaField
              label="Description"
              name="description"
              defaultValue={area.description}
              required
              className="sm:col-span-2"
            />
            <SelectField
              label="Card colour"
              name="theme"
              defaultValue={area.theme ?? "green"}
              options={themes}
            />
            <IconSelect defaultValue={area.iconKey} />
            <ImageField
              defaultValue={area.imageUrl}
              media={media}
              preferredCategory="focus"
              className="sm:col-span-2"
            />
            <TextField
              label="Card arrow link"
              name="href"
              defaultValue={area.href ?? "/our-work"}
              className="sm:col-span-2"
            />
          </div>

          <div className="mt-3">
            <CheckField
              label="Show on website"
              name="isPublished"
              defaultChecked={area.isPublished}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-4 rounded-xl bg-[var(--admin-forest)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {isPending ? "Saving..." : "Save area"}
          </button>
        </form>
      ))}
    </div>
  );
}
