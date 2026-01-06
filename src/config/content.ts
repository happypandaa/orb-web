import { SectionConfig, SiteConfig } from "@/types/content";

export const siteConfig: SiteConfig = {
  name: "OrbNote",
  sections: [
    {
      id: "hero",
      type: "hero",
      layout: "center", // Hero usually doesn't need layout but adding for consistency if needed or ignore
      theme: "light",
      media: { type: "image", src: "/images/platform.png", width: 1200, height: 800, alt: "platform" },
      links: [
        { href: "#download", variant: "primary" },
        { href: "#privacy", variant: "secondary" }
      ]
    },
    {
      id: "privacy",
      type: "feature",
      layout: "center",
      theme: "gray"
    },
    {
      id: "privacy-e2ee",
      type: "feature",
      layout: "left",
      theme: "light",
      media: { type: "image", src: "/images/feature-encryption.svg", width: 800, height: 600, alt: "encryption" },
      links: [{ href: "https://support.apple.com/HT212520", variant: "text" }]
    },
    {
      id: "privacy-icloud",
      type: "feature",
      layout: "right",
      theme: "gray",
      media: { type: "image", src: "/images/feature-icloud.svg", width: 800, height: 600, alt: "icloud" }
    },
    {
      id: "privacy-ownership",
      type: "feature",
      layout: "left",
      theme: "light",
      media: { type: "image", src: "/images/feature-ownership.svg", width: 800, height: 600, alt: "ownership" }
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
        { id: "macos", media: { type: "image", src: "/images/platform-mac.svg", width: 600, height: 450, alt: "macos" } },
        { id: "ios", media: { type: "image", src: "/images/platform-ios.svg", width: 600, height: 450, alt: "ios" } },
        { id: "watchos", media: { type: "image", src: "/images/platform-watch.svg", width: 600, height: 450, alt: "watchos" } }
      ]
    },
    {
      id: "longtext",
      type: "feature",
      layout: "right",
      theme: "gray",
      media: { type: "image", src: "/images/feature-longtext.svg", width: 800, height: 600, alt: "longtext" }
    },
    {
      id: "ai-intro",
      type: "feature",
      layout: "center",
      theme: "dark"
    },
    {
      id: "ai-features",
      type: "showcase",
      theme: "gray",
      items: [
        { id: "ai-gallery", media: { type: "image", src: "/images/ai-gallery.svg", width: 600, height: 450, alt: "ai-gallery" } },
        { id: "ai-voice", media: { type: "image", src: "/images/ai-voice.svg", width: 600, height: 450, alt: "ai-voice" } },
        { id: "ai-search", media: { type: "image", src: "/images/ai-search.svg", width: 600, height: 450, alt: "ai-search" } }
      ]
    },
    {
      id: "specs",
      type: "text",
      theme: "light"
    },
    {
      id: "faq",
      type: "text",
      theme: "gray"
    },
    {
      id: "cta",
      type: "cta",
      theme: "dark",
      links: [
        { href: "#download", variant: "primary" },
        { href: "#pricing", variant: "secondary" }
      ]
    }
  ],
  navigation: [
    { label: "features", href: "#features" },
    { label: "privacy", href: "#privacy" },
    { label: "ai", href: "#ai" },
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
