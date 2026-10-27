"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { saveImpactAction } from "@/app/admin/actions/cms";
import { Badge } from "@/components/ui/Badge";
import type { ImpactHighlight } from "@/lib/types";
import { Notice, TextField } from "./fields";

function ImpactForm({
  item,
  onSaved,
}: {
  item: ImpactHighlight;
  onSaved: (message: string) => void;
}) {
  const router = useRouter();
  const [isVerified, setVerified] = useState(item.isVerified);
  const [isPublished, setPublished] = useState(item.isPublished);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="rounded-2xl border border-[var(--admin-border)] bg-white p-5"
      action={(formData) => {
        startTransition(async () => {
          setError(null);
          const result = await saveImpactAction(formData);
          if (!result.ok) {
            setError(result.error);
            return;
          }
          onSaved(
            result.item.isPublished
              ? "Saved — shown in the hero stats bar"
              : "Saved — hidden until verified and published",
          );
          router.refresh();
        });
      }}
    >
      <input type="hidden" name="id" value={item.id} />
      <div className="flex flex-wrap gap-2">
        <Badge tone={item.isVerified ? "green" : "danger"}>
          {item.isVerified ? "Verified" : "Unverified"}
        </Badge>
        <Badge tone={item.isPublished ? "green" : "muted"}>
          {item.isPublished ? "Published" : "Hidden"}
        </Badge>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <TextField label="Label" name="label" defaultValue={item.label} required />
        <TextField
          label="Value"
          name="value"
          defaultValue={item.value}
          placeholder="e.g. 500"
          hint="Shown in orange in the hero stats bar."
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="isVerified"
            checked={isVerified}
            onChange={(event) => {
              setVerified(event.target.checked);
              if (!event.target.checked) setPublished(false);
            }}
          />
          Mark verified
        </label>
        <label
          className={`inline-flex items-center gap-2 ${
            isVerified ? "" : "opacity-50"
          }`}
        >
          <input
            type="checkbox"
            name="isPublished"
            checked={isPublished && isVerified}
            disabled={!isVerified}
            onChange={(event) => setPublished(event.target.checked)}
          />
          Publish on website {isVerified ? "" : "(verify first)"}
        </label>
      </div>
      {error ? (
        <div className="mt-3">
          <Notice tone="error">{error}</Notice>
        </div>
      ) : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-4 rounded-xl bg-[var(--admin-forest)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save impact"}
      </button>
    </form>
  );
}

export function ImpactManager({ items }: { items: ImpactHighlight[] }) {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-4 rounded-2xl border border-[rgba(197,164,109,0.45)] bg-[rgba(197,164,109,0.1)] px-5 py-3 text-sm leading-6 text-[var(--admin-charcoal)]">
        Only verified + published numbers appear on the website (hero stats bar,
        first three in order). Empty or unverified items stay hidden.
      </div>
      {message ? (
        <div className="mb-4">
          <Notice>{message}</Notice>
        </div>
      ) : null}
      <div className="grid gap-4">
        {items.map((item) => (
          <ImpactForm key={`${item.id}-${item.value}-${item.isPublished}`} item={item} onSaved={setMessage} />
        ))}
      </div>
    </div>
  );
}
