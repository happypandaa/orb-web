import type { Locale } from "@/lib/i18n";
import { SectionConfig, SiteConfig } from "@/types/content";

export const APP_STORE_URL = "https://apps.apple.com/app/id6756836158";

const legacyHomepageSections: SectionConfig[] = [
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

function getModernHomepageSections(locale: Locale): SectionConfig[] {
  const assetLocale = locale === "zh" ? "zh" : "en";

  return [
    {
      id: "hero",
      type: "hero",
      layout: "center",
      theme: "light",
      media: {
        type: "image",
        src: "/images/hero/orbnote-multiplatform-v4.png",
        width: 1586,
        height: 992,
        alt: locale === "zh"
          ? "OrbNote 在 Mac、iPhone、iPad 和 Apple Watch 上运行"
          : "OrbNote on Mac, iPhone, iPad, and Apple Watch",
      },
      links: [
        { href: APP_STORE_URL, variant: "primary", external: true },
        { href: `/${locale}/wiki`, variant: "secondary" },
      ],
    },
    {
      id: "features-intro",
      type: "feature",
      layout: "center",
      theme: "dark",
    },
    {
      id: "quick-jot",
      type: "feature",
      layout: "left",
      theme: "light",
      media: {
        type: "image",
        src: `/images/appstore/${assetLocale}/02-quick-jot.jpg`,
        width: 1800,
        height: 1125,
        alt: "OrbNote Quick Jot",
      },
      links: [{ href: `/${locale}/wiki/quick-jot`, variant: "text" }],
    },
    {
      id: "ai-organization",
      type: "feature",
      layout: "right",
      theme: "gray",
      media: {
        type: "image",
        src: `/images/appstore/${assetLocale}/04-ai-organization.jpg`,
        width: 1800,
        height: 1125,
        alt: "OrbNote AI Organization",
      },
      links: [{ href: `/${locale}/wiki/ai-organization`, variant: "text" }],
    },
    {
      id: "capabilities",
      type: "showcase",
      theme: "light",
      items: [
        {
          id: "rich-content",
          media: {
            type: "image",
            src: `/images/appstore/${assetLocale}/03-rich-content.jpg`,
            width: 1800,
            height: 1125,
            alt: "Rich content in OrbNote",
          },
        },
        {
          id: "search",
          media: {
            type: "image",
            src: `/images/appstore/${assetLocale}/05-advanced-search.jpg`,
            width: 1800,
            height: 1125,
            alt: "Advanced search in OrbNote",
          },
        },
      ],
    },
    {
      id: "privacy",
      type: "feature",
      layout: "center",
      theme: "dark",
      icons: ["/images/lock.svg"],
    },
    {
      id: "privacy-lock",
      type: "feature",
      layout: "left",
      theme: "light",
      media: {
        type: "image",
        src: `/images/appstore/${assetLocale}/07-password.jpg`,
        width: 1800,
        height: 1125,
        alt: "Password protection in OrbNote",
      },
    },
    {
      id: "connected",
      type: "showcase",
      theme: "gray",
      items: [
        {
          id: "icloud",
          media: {
            type: "image",
            src: `/images/appstore/${assetLocale}/09-icloud.jpg`,
            width: 1800,
            height: 1125,
            alt: "iCloud synchronization in OrbNote",
          },
        },
        {
          id: "watch",
          media: {
            type: "image",
            src: `/images/appstore/${assetLocale}/10-watch.jpg`,
            width: 1800,
            height: 1125,
            alt: "Apple Watch capture in OrbNote",
          },
        },
      ],
    },
    {
      id: "faq",
      type: "text",
      theme: "light",
    },
    {
      id: "download",
      type: "cta",
      theme: "dark",
      links: [{ href: APP_STORE_URL, variant: "primary", external: true }],
    },
  ];
}

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
  sections: getModernHomepageSections("en")
};

export function getSiteConfig(locale: Locale): SiteConfig {
  return {
    ...baseSiteConfig,
    sections: locale === "en" || locale === "zh"
      ? getModernHomepageSections(locale)
      : legacyHomepageSections
  };
}
