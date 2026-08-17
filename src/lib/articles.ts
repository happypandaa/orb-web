import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { marked } from "marked";

export const articleLocales = ["en", "zh"] as const;

export type ArticleLocale = (typeof articleLocales)[number];

export interface ArticleMeta {
  slug: string;
  locale: ArticleLocale;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  summary: string[];
  relatedArticles: string[];
  relatedWiki: string[];
  translationKey: string;
  draft: boolean;
  readingMinutes: number;
}

export interface Article extends ArticleMeta {
  html: string;
}

const articlesRoot = path.join(process.cwd(), "content", "articles");

export function isArticleLocale(locale: string): locale is ArticleLocale {
  return articleLocales.includes(locale as ArticleLocale);
}

function getLocaleDirectory(locale: ArticleLocale) {
  return path.join(articlesRoot, locale);
}

function getReadingMinutes(source: string, locale: ArticleLocale) {
  const unitCount = locale === "zh"
    ? source.replace(/\s/g, "").length
    : source.trim().split(/\s+/).filter(Boolean).length;
  const unitsPerMinute = locale === "zh" ? 420 : 220;

  return Math.max(1, Math.ceil(unitCount / unitsPerMinute));
}

function getMeta(
  locale: ArticleLocale,
  slug: string,
  data: Record<string, unknown>,
  source: string,
): ArticleMeta {
  const publishedAt = String(data.publishedAt ?? "");
  const stringArray = (value: unknown) =>
    Array.isArray(value) ? value.map(String).filter(Boolean) : [];

  return {
    slug,
    locale,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    publishedAt,
    updatedAt: String(data.updatedAt ?? publishedAt),
    author: String(data.author ?? "OrbNote Team"),
    category: String(data.category ?? "OrbNote Guide"),
    tags: stringArray(data.tags),
    image: String(data.image ?? ""),
    imageAlt: String(data.imageAlt ?? data.title ?? "OrbNote"),
    summary: stringArray(data.summary),
    relatedArticles: stringArray(data.relatedArticles),
    relatedWiki: stringArray(data.relatedWiki),
    translationKey: String(data.translationKey ?? slug),
    draft: Boolean(data.draft),
    readingMinutes: getReadingMinutes(source, locale),
  };
}

export function getArticles(locale: ArticleLocale): ArticleMeta[] {
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
    .filter((article) => !article.draft)
    .sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title),
    );
}

export function getArticle(locale: ArticleLocale, slug: string): Article | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  const filePath = path.join(getLocaleDirectory(locale), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const meta = getMeta(locale, slug, data, content);

  if (meta.draft) return null;

  return {
    ...meta,
    html: marked.parse(content, {
      async: false,
      gfm: true,
    }) as string,
  };
}
