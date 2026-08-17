import type { MetadataRoute } from "next";

import { articleLocales, getArticles } from "@/lib/articles";
import { getWikiPages, wikiLocales } from "@/lib/wiki";
import { getArticlesUrl } from "@/lib/routes";

const siteUrl = "https://www.orbnote.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const standardRoutes = ["", "privacy/", "terms/", "support/"];
  const localeRoutes = ["en", "zh", "ja", "ko"].flatMap((locale) =>
    standardRoutes.map((route) => ({
      url: `${siteUrl}/${locale}/${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.5,
    })),
  );

  const articleIndexRoutes = articleLocales.map((locale) => ({
    url: getArticlesUrl(siteUrl, locale),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: {
      languages: {
        en: getArticlesUrl(siteUrl, "en"),
        "zh-CN": getArticlesUrl(siteUrl, "zh"),
        "x-default": getArticlesUrl(siteUrl, "en"),
      },
    },
  }));

  const articleRoutes = articleLocales.flatMap((locale) =>
    getArticles(locale).map((article) => ({
      url: getArticlesUrl(siteUrl, locale, article.slug),
      lastModified: new Date(`${article.updatedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: getArticlesUrl(siteUrl, "en", article.slug),
          "zh-CN": getArticlesUrl(siteUrl, "zh", article.slug),
          "x-default": getArticlesUrl(siteUrl, "en", article.slug),
        },
      },
    })),
  );

  const wikiIndexRoutes = wikiLocales.map((locale) => ({
    url: `${siteUrl}/${locale}/wiki/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const wikiRoutes = wikiLocales.flatMap((locale) =>
    getWikiPages(locale).map((page) => ({
      url: `${siteUrl}/${locale}/wiki/${page.slug}/`,
      lastModified: new Date(`${page.updatedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: {
        languages: {
          en: `${siteUrl}/en/wiki/${page.slug}/`,
          "zh-CN": `${siteUrl}/zh/wiki/${page.slug}/`,
        },
      },
    })),
  );

  return [
    ...localeRoutes,
    ...articleIndexRoutes,
    ...articleRoutes,
    ...wikiIndexRoutes,
    ...wikiRoutes,
  ];
}
