"use client";

import { useState } from "react";
import {
  DEFAULT_JOURNEY_ITEMS,
  parseJourneyItems,
  type JourneyItem,
} from "@/lib/data/aboutExtras";

const inputClass =
  "w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)] px-3 py-2.5 outline-none ring-[var(--admin-forest)] focus:ring-2";

const ICON_OPTIONS = [
  "calendar_month",
  "groups",
  "eco",
  "trending_up",
  "star",
  "volunteer_activism",
  "person",
  "spa",
  "target",
  "visibility",
  "diamond",
];

function newRow(): JourneyItem {
  return { year: "", icon: "star", text: "", emphasis: "" };
}

/** Editable timeline rows for About → Our Journey. */
export function JourneyItemsField({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const [items, setItems] = useState<JourneyItem[]>(() =>
    parseJourneyItems(defaultValue || JSON.stringify(DEFAULT_JOURNEY_ITEMS)),
  );

  const serialized = JSON.stringify(
    items
      .map((item) => ({
        year: item.year.trim(),
        icon: item.icon.trim() || "star",
        text: item.text.trim(),
        ...(item.emphasis?.trim()
          ? { emphasis: item.emphasis.trim() }
          : {}),
      }))
      .filter((item) => item.year || item.text),
  );

  return (
    <div className="space-y-3">
      <input type="hidden" name="extra_journeyItems" value={serialized} />
      <p className="text-sm font-medium">Journey timeline</p>
      <p className="text-xs text-[var(--admin-muted)]">
        Add / remove years. Icon uses Google Material Symbol names (e.g.
        calendar_month, groups, eco).
      </p>

      {items.map((item, index) => (
        <div
          key={`journey-${index}`}
          className="space-y-2 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-ivory)]/40 p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[var(--admin-forest)]">
              Milestone {index + 1}
            </span>
            <button
              type="button"
              disabled={items.length <= 1}
              onClick={() =>
                setItems((current) =>
                  current.length <= 1
                    ? current
                    : current.filter((_, i) => i !== index),
                )
              }
              className="rounded-lg border border-[var(--admin-border)] px-2.5 py-1 text-xs disabled:opacity-40"
            >
              Remove
            </button>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <label className="block text-xs">
              <span className="mb-1 block font-medium">Year</span>
              <input
                value={item.year}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((row, i) =>
                      i === index ? { ...row, year: event.target.value } : row,
                    ),
                  )
                }
                className={inputClass}
                placeholder="2020"
              />
            </label>
            <label className="block text-xs sm:col-span-2">
              <span className="mb-1 block font-medium">Icon</span>
              <input
                value={item.icon}
                list={`journey-icons-${index}`}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((row, i) =>
                      i === index ? { ...row, icon: event.target.value } : row,
                    ),
                  )
                }
                className={inputClass}
                placeholder="calendar_month"
              />
              <datalist id={`journey-icons-${index}`}>
                {ICON_OPTIONS.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </label>
          </div>
          <label className="block text-xs">
            <span className="mb-1 block font-medium">Text</span>
            <textarea
              rows={2}
              value={item.text}
              onChange={(event) =>
                setItems((current) =>
                  current.map((row, i) =>
                    i === index ? { ...row, text: event.target.value } : row,
                  ),
                )
              }
              className={inputClass}
            />
          </label>
          <label className="block text-xs">
            <span className="mb-1 block font-medium">
              Bold word inside text (optional)
            </span>
            <input
              value={item.emphasis ?? ""}
              onChange={(event) =>
                setItems((current) =>
                  current.map((row, i) =>
                    i === index
                      ? { ...row, emphasis: event.target.value }
                      : row,
                  ),
                )
              }
              className={inputClass}
              placeholder="began"
            />
          </label>
        </div>
      ))}

      <button
        type="button"
        onClick={() => setItems((current) => [...current, newRow()])}
        className="rounded-xl border border-dashed border-[var(--admin-forest)]/40 px-3 py-2.5 text-sm font-medium text-[var(--admin-forest)] hover:bg-[var(--admin-forest)]/5"
      >
        + Add milestone
      </button>
    </div>
  );
}
