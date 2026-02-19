import { SectionConfig, SiteConfig } from "@/types/content";

export const siteConfig: SiteConfig = {
  name: "OrbNote",
  sections: [
    {
      id: "hero",
      type: "hero",
      layout: "center", // Hero usually doesn't need layout but adding for consistency if needed or ignore
      theme: "light",
      media: { type: "image", src: "/images/platform.jpg", width: 1200, height: 800, alt: "platform" },
      links: [
        { href: "#download", variant: "primary" }
      ]
    },
    {
      id: "privacy",
      type: "feature",
      layout: "center",
      theme: "gray",
      icons: ["/images/icloud.svg"]
    },
    {
      id: "privacy-e2ee",
      type: "feature",
      layout: "center",
      theme: "light",
      icons: ["/images/lock.svg"],
      links: [{ href: "https://support.apple.com/HT212520", variant: "text" }]
    },


    {
      id: "features-intro",
      type: "feature",
      layout: "center",
      theme: "dark"
    },
    {
      id: "showcase",
      type: "showcase",
      theme: "light",
      items: [
        { id: "macos", media: { type: "image", src: "/images/mac.jpg", width: 600, height: 450, alt: "macos" } },
        { id: "ios", media: { type: "image", src: "/images/iphone.jpg", width: 600, height: 450, alt: "ios" } },
        { id: "watchos", media: { type: "image", src: "/images/watch.jpg", width: 600, height: 450, alt: "watchos" } }
      ]
    },
    {
      id: "longtext",
      type: "feature",
      layout: "center",
      theme: "gray",
      icons: ["/images/doc.svg"]
    },

    {
      id: "faq",
      type: "text",
      theme: "light"
    },
    {
      id: "download",
      type: "cta",
      theme: "dark",
      links: [
        { href: "#download", variant: "primary" }
      ]
    }
  ],
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
