"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  forceHindiTranslate,
  persistLang,
  readStoredLang,
} from "@/lib/i18n/lang";

/**
 * Keeps Hindi active across the whole site once selected.
 * - Re-kicks Google Translate after App Router navigations
 * - Forces full page loads for in-site links while Hindi is on
 *   (Google Translate does not reliably translate soft-nav content)
 */
export function TranslateKeepAlive() {
  const pathname = usePathname();

  // Persist Hindi across in-site link clicks (full navigation)
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (readStoredLang() !== "hi") return;

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        !url.hash
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      persistLang("hi");
      window.location.href = url.pathname + url.search + url.hash;
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Re-apply Hindi after route / content changes
  useEffect(() => {
    if (readStoredLang() !== "hi") return;

    persistLang("hi");

    let cancelled = false;
    let applying = false;
    let debounce: number | undefined;
    let observer: MutationObserver | null = null;

    const apply = () => {
      if (cancelled || applying) return;
      applying = true;
      forceHindiTranslate();
      window.setTimeout(() => {
        applying = false;
      }, 450);
    };

    const delays = [50, 200, 450, 900, 1600, 2800];
    const timers = delays.map((ms) => window.setTimeout(apply, ms));

    let polls = 0;
    const poll = window.setInterval(() => {
      polls += 1;
      if (forceHindiTranslate() || polls >= 40) {
        window.clearInterval(poll);
      }
    }, 120);

    const main = document.querySelector("main");
    if (main) {
      observer = new MutationObserver(() => {
        if (cancelled || applying) return;
        window.clearTimeout(debounce);
        debounce = window.setTimeout(apply, 100);
      });
      observer.observe(main, { childList: true, subtree: true });
    }

    const stopObs = window.setTimeout(() => {
      observer?.disconnect();
      observer = null;
    }, 10_000);

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      window.clearInterval(poll);
      window.clearTimeout(stopObs);
      window.clearTimeout(debounce);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
