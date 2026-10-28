"use client";

import { useEffect, useId, useRef, useState } from "react";
import { UtilityIcon } from "@/components/site/icons";
import {
  applyGoogleCombo,
  persistLang,
  readStoredLang,
  syncHtmlLangClass,
  type Lang,
} from "@/lib/i18n/lang";

const languages: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "EN" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
];

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          },
          elementId: string,
        ) => void;
      };
    };
  }
}

function applyComboWhenReady(lang: Lang, attempts = 40) {
  if (applyGoogleCombo(lang)) return;
  if (attempts <= 0) return;
  window.setTimeout(() => applyComboWhenReady(lang, attempts - 1), 150);
}

function ensureGoogleTranslate(preferred: Lang) {
  if (document.getElementById("google-translate-script")) {
    if (preferred === "hi") {
      persistLang("hi");
      applyComboWhenReady("hi");
    }
    return;
  }

  window.googleTranslateElementInit = () => {
    if (!window.google?.translate?.TranslateElement) return;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,hi",
        autoDisplay: false,
      },
      "google_translate_element",
    );
    if (preferred === "hi") {
      persistLang("hi");
      applyComboWhenReady("hi");
    }
  };

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

export function LanguageSwitcher({
  tone = "light",
  mountWidget = false,
}: {
  tone?: "light" | "dark";
  /** Only one instance on the page should mount the Google Translate widget. */
  mountWidget?: boolean;
}) {
  const [lang, setLang] = useState<Lang>("en");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    const current = readStoredLang();
    setLang(current);
    syncHtmlLangClass(current);
    if (current === "hi") persistLang("hi");
    if (mountWidget) ensureGoogleTranslate(current);
  }, [mountWidget]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function setLanguage(next: Lang) {
    setOpen(false);
    if (next === lang) return;
    persistLang(next);
    setLang(next);
    window.location.reload();
  }

  const current = languages.find((item) => item.code === lang) ?? languages[0];
  const isLight = tone === "light";
  const trigger =
    isLight
      ? "text-white/85 hover:text-[var(--gold)]"
      : "text-[var(--forest)] hover:text-[var(--orange)]";
  const menu =
    isLight
      ? "border-white/15 bg-[var(--forest)] text-white shadow-[0_10px_28px_rgba(0,0,0,0.28)]"
      : "border-black/10 bg-white text-[var(--forest)] shadow-[0_10px_28px_rgba(0,51,43,0.14)]";
  const itemIdle = isLight
    ? "hover:bg-white/10"
    : "hover:bg-[var(--forest)]/[0.06]";
  const itemActive = isLight
    ? "bg-white/12 text-[var(--gold)]"
    : "bg-[var(--orange)]/15 text-[var(--orange)]";

  return (
    <div
      ref={rootRef}
      className="nav-bar notranslate relative shrink-0"
      translate="no"
    >
      {mountWidget ? (
        <div
          id="google_translate_element"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        />
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`flex items-center gap-1 rounded-md px-1 py-0.5 transition-colors ${trigger}`}
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
      >
        <UtilityIcon name="globe" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="hidden text-[10.5px] font-bold uppercase tracking-[0.06em] sm:inline sm:text-[11px]">
          {current.native}
        </span>
        <UtilityIcon
          name="chevron-down"
          className={`h-3 w-3 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div
          id={listId}
          role="listbox"
          aria-label="Languages"
          className={`absolute right-0 top-[calc(100%+4px)] z-[70] min-w-[7.25rem] overflow-hidden rounded border py-0.5 ${menu}`}
        >
          {languages.map((item) => {
            const active = item.code === lang;
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={active}
                lang={item.code === "hi" ? "hi" : "en"}
                onClick={() => setLanguage(item.code)}
                className={`flex w-full items-center justify-between gap-2 px-2 py-1 text-left text-[10.5px] font-semibold transition-colors ${
                  active ? itemActive : itemIdle
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`text-[10px] font-bold ${
                    item.code === "hi" ? "normal-case tracking-normal" : "uppercase tracking-[0.04em]"
                  } ${active ? "" : "opacity-55"}`}
                >
                  {item.native}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
