"use client";

import { useEffect } from "react";

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href*="apps.apple.com"]');
      if (!link) return;

      (window as GtagWindow).gtag?.("event", "app_store_click", {
        link_url: link.href,
        link_text: link.textContent?.trim() ?? "",
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
