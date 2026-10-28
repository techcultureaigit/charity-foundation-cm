export type Lang = "en" | "hi";

export const LANG_STORAGE_KEY = "ssf-lang";

export function readStoredLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "hi" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  return match?.[1] === "hi" ? "hi" : "en";
}

export function clearGoogtransCookies() {
  const host = window.location.hostname;
  const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `googtrans=;path=/;${expire}`;
  if (host !== "localhost" && !host.startsWith("127.")) {
    document.cookie = `googtrans=;path=/;domain=${host};${expire}`;
    document.cookie = `googtrans=;path=/;domain=.${host};${expire}`;
  }
}

export function persistLang(lang: Lang) {
  clearGoogtransCookies();
  const value = lang === "hi" ? "/en/hi" : "/en/en";
  const host = window.location.hostname;
  document.cookie = `googtrans=${value};path=/`;
  if (host !== "localhost" && !host.startsWith("127.")) {
    document.cookie = `googtrans=${value};path=/;domain=${host}`;
    document.cookie = `googtrans=${value};path=/;domain=.${host}`;
  }
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
}

export function applyGoogleCombo(lang: Lang): boolean {
  const select = document.querySelector(
    ".goog-te-combo",
  ) as HTMLSelectElement | null;
  if (!select) return false;
  select.value = lang === "en" ? "" : lang;
  // Empty string = original English in Google's widget
  if (lang === "en") {
    select.value = "";
    select.dispatchEvent(new Event("change"));
    // Some builds need explicit "en"
    if ([...select.options].some((o) => o.value === "en")) {
      select.value = "en";
      select.dispatchEvent(new Event("change"));
    }
    return true;
  }
  select.value = "hi";
  select.dispatchEvent(new Event("change"));
  return true;
}

/** Force Hindi even if already selected — needed after SPA route changes. */
export function forceHindiTranslate(): boolean {
  persistLang("hi");
  const select = document.querySelector(
    ".goog-te-combo",
  ) as HTMLSelectElement | null;
  if (!select) return false;

  select.value = "";
  select.dispatchEvent(new Event("change"));
  window.setTimeout(() => {
    select.value = "hi";
    select.dispatchEvent(new Event("change"));
  }, 30);
  return true;
}
