import type { Locale } from "@/lib/i18n";
import { SectionConfig, SiteConfig } from "@/types/content";

const APP_STORE_URL = "https://apps.apple.com/app/id6756836158";

const homepageSections: SectionConfig[] = [
  {
    id: "hero",
    type: "hero",
    layout: "center",
    theme: "light",
    media: { type: "image", src: "/images/hero-ai-shot.jpg", width: 2345, height: 1430, alt: "OrbNote AI hero" },
    links: [
      { href: APP_STORE_URL, variant: "primary", external: true }
    ]
  },
  {
    id: "features-intro",
    type: "feature",
    layout: "center",
    theme: "dark"
  },
  {
    id: "ai-workflow",
    type: "feature",
    layout: "right",
    theme: "light",
    media: { type: "image", src: "/images/ai-panel-shot.jpg", width: 888, height: 1418, alt: "AI save workflow" }
  },
  {
    id: "showcase",
    type: "showcase",
    theme: "gray",
    items: [
      { id: "capture", media: { type: "image", src: "/images/ai-input-shot.jpg", width: 878, height: 668, alt: "AI input" } },
      { id: "structure", media: { type: "image", src: "/images/ai-panel-compact-shot.jpg", width: 556, height: 328, alt: "AI save suggestion" } }
    ]
  },
  {
    id: "privacy",
    type: "feature",
    layout: "center",
    theme: "light",
    icons: ["/images/icloud.svg"]
  },
  {
    id: "privacy-e2ee",
    type: "feature",
    layout: "center",
    theme: "gray",
    icons: ["/images/lock.svg"],
    links: [{ href: "https://support.apple.com/HT212520", variant: "text" }]
  },
  {
    id: "longtext",
    type: "feature",
    layout: "left",
    theme: "light",
    media: { type: "image", src: "/images/ai-privacy-boundary.jpg", width: 2624, height: 1632, alt: "AI gateway without user content backend" }
  },
  {
    id: "faq",
    type: "text",
    theme: "gray"
  },
  {
    id: "download",
    type: "cta",
    theme: "dark",
    links: [
      { href: APP_STORE_URL, variant: "primary", external: true }
    ]
  }
];

const baseSiteConfig: Omit<SiteConfig, "sections"> = {
  name: "OrbNote",
  navigation: [
    { label: "features", href: "#features" },
    { label: "privacy", href: "#privacy" },
    { label: "faq", href: "#faq" },
    { label: "download", href: "#download" }
  ],
  footer: {
    copyright: "OrbNote",
    links: [
      { label: "privacy", href: "/privacy" },
      { label: "terms", href: "/terms" },
      { label: "support", href: "/support" },
      { label: "contact", href: "/contact" }
    ]
  }
};

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  sections: homepageSections
};

export function getSiteConfig(_locale: Locale): SiteConfig {
  return {
    ...baseSiteConfig,
    sections: homepageSections
  };
}
