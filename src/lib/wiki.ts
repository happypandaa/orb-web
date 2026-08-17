import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { marked } from "marked";

export const wikiLocales = ["en", "zh"] as const;

export type WikiLocale = (typeof wikiLocales)[number];

export interface WikiMeta {
  slug: string;
  locale: WikiLocale;
  title: string;
  description: string;
  updatedAt: string;
  category: string;
  order: number;
  productVersion: string;
  image: string;
  imageAlt: string;
  summary: string[];
  relatedArticles: string[];
  relatedWiki: string[];
  translationKey: string;
  draft: boolean;
  readingMinutes: number;
}

export interface WikiPage extends WikiMeta {
  html: string;
}

const wikiRoot = path.join(process.cwd(), "content", "wiki");

export function isWikiLocale(locale: string): locale is WikiLocale {
  return wikiLocales.includes(locale as WikiLocale);
}

function getLocaleDirectory(locale: WikiLocale) {
  return path.join(wikiRoot, locale);
}

function toStringArray(value: unknown) {
  return Array.isArray(value) ? value.map(String).filter(Boolean) : [];
}

function getReadingMinutes(source: string, locale: WikiLocale) {
  const unitCount = locale === "zh"
    ? source.replace(/\s/g, "").length
    : source.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(unitCount / (locale === "zh" ? 420 : 220)));
}

function getMeta(
  locale: WikiLocale,
  slug: string,
  data: Record<string, unknown>,
  source: string,
): WikiMeta {
  return {
    slug,
    locale,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    updatedAt: String(data.updatedAt ?? ""),
    category: String(data.category ?? "OrbNote Guide"),
    order: Number(data.order ?? 999),
    productVersion: String(data.productVersion ?? "OrbNote 3.0"),
    image: String(data.image ?? ""),
    imageAlt: String(data.imageAlt ?? data.title ?? "OrbNote"),
    summary: toStringArray(data.summary),
    relatedArticles: toStringArray(data.relatedArticles),
    relatedWiki: toStringArray(data.relatedWiki),
    translationKey: String(data.translationKey ?? slug),
    draft: Boolean(data.draft),
    readingMinutes: getReadingMinutes(source, locale),
  };
}

export function getWikiPages(locale: WikiLocale): WikiMeta[] {
  const localeDirectory = getLocaleDirectory(locale);
  if (!fs.existsSync(localeDirectory)) return [];

  return fs
    .readdirSync(localeDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const file = fs.readFileSync(path.join(localeDirectory, fileName), "utf8");
      const { data, content } = matter(file);
      return getMeta(locale, slug, data, content);
    })
    .filter((page) => !page.draft)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getWikiPage(locale: WikiLocale, slug: string): WikiPage | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  const filePath = path.join(getLocaleDirectory(locale), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const meta = getMeta(locale, slug, data, content);
  if (meta.draft) return null;

  return {
    ...meta,
    html: marked.parse(content, { async: false, gfm: true }) as string,
  };
}
