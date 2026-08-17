import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { QuickAnswer } from "@/components/content/QuickAnswer";
import { LegacyArticlesRedirect } from "@/components/content/LegacyArticlesRedirect";
import {
  articleLocales,
  getArticle,
  getArticles,
  isArticleLocale,
} from "@/lib/articles";
import { getArticlesPath, getArticlesUrl } from "@/lib/routes";

const siteUrl = "https://www.orbnote.app";

const articleCopy = {
  en: {
    back: "All articles",
    read: "min read",
    updated: "Updated",
    switchLanguage: "阅读中文版",
    ctaTitle: "Capture first. Organize when it helps.",
    ctaBody: "OrbNote keeps text, photos, voice, files, and AI-assisted organization in one private notebook.",
    ctaLink: "Download on the App Store",
  },
  zh: {
    back: "全部文章",
    read: "分钟阅读",
    updated: "更新于",
    switchLanguage: "Read in English",
    ctaTitle: "先记录，在真正有用时再整理。",
    ctaBody: "OrbNote 把文字、图片、语音、文件和 AI 智能整理放进同一个私密笔记本。",
    ctaLink: "在 App Store 下载",
  },
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return articleLocales.flatMap((locale) =>
    getArticles(locale).map((article) => ({
      locale,
      slug: article.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isArticleLocale(locale)) return {};

  const article = getArticle(locale, slug);
  if (!article) return {};

  const canonical = getArticlesUrl(siteUrl, locale, slug);
  const image = `${siteUrl}${article.image}`;

  return {
    title: `${article.title} - OrbNote`,
    description: article.description,
    authors: [{ name: article.author }],
    alternates: {
      canonical,
      languages: {
        en: getArticlesUrl(siteUrl, "en", slug),
        "zh-CN": getArticlesUrl(siteUrl, "zh", slug),
        "x-default": getArticlesUrl(siteUrl, "en", slug),
      },
    },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: "OrbNote",
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      images: [{ url: image, alt: article.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [image],
    },
  };
}

export default async function ArticlePage({
  params,
  canonicalRoute = false,
}: {
  params: Promise<{ locale: string; slug: string }>;
  canonicalRoute?: boolean;
}) {
  const { locale, slug } = await params;
  if (!isArticleLocale(locale)) notFound();
  if (locale === "en" && !canonicalRoute) {
    return <LegacyArticlesRedirect target={getArticlesPath("en", slug)} />;
  }

  const article = getArticle(locale, slug);
  if (!article) notFound();

  const copy = articleCopy[locale];
  const otherLocale = locale === "en" ? "zh" : "en";
  const translatedArticle = getArticle(otherLocale, slug);
  const canonical = getArticlesUrl(siteUrl, locale, slug);
  const publishedDate = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${article.publishedAt}T00:00:00Z`));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      abstract: article.summary.join(" "),
      keywords: article.tags.join(", "),
      image: `${siteUrl}${article.image}`,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      inLanguage: locale === "zh" ? "zh-CN" : "en",
      author: {
        "@type": "Organization",
        name: article.author,
      },
      publisher: {
        "@type": "Organization",
        name: "OrbNote",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/icon.png`,
        },
      },
      mainEntityOfPage: canonical,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "OrbNote", item: `${siteUrl}/${locale}/` },
        { "@type": "ListItem", position: 2, name: locale === "zh" ? "文章" : "Articles", item: getArticlesUrl(siteUrl, locale) },
        { "@type": "ListItem", position: 3, name: article.title, item: canonical },
      ],
    },
  ];

  return (
    <article
      lang={locale === "zh" ? "zh-CN" : "en"}
      className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header className="mx-auto max-w-[840px] px-6 pb-8 pt-10 sm:pb-10 sm:pt-14">
        <div className="mb-7 flex items-center justify-between gap-4">
          <Link
            href={getArticlesPath(locale)}
            className="text-[15px] font-medium text-[#0066cc] hover:underline"
          >
            ← {copy.back}
          </Link>
          {translatedArticle && (
            <Link
              href={getArticlesPath(otherLocale, slug)}
              hrefLang={otherLocale === "zh" ? "zh-CN" : "en"}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-medium text-[#424245] shadow-sm transition-colors hover:bg-[#f5f5f7]"
            >
              {copy.switchLanguage}
            </Link>
          )}
        </div>

        <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#ff6a1a]">
          {article.category}
        </p>
        <h1 className="text-[38px] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[54px]">
          {article.title}
        </h1>
        <p className="mt-5 text-[17px] leading-[1.55] text-[#6e6e73] sm:text-[20px]">
          {article.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-[#86868b]">
          <span>{article.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>{publishedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingMinutes} {copy.read}</span>
        </div>
      </header>

      <div className="mx-auto max-w-[840px] px-6 pb-8 sm:pb-10">
        <QuickAnswer items={article.summary} locale={locale} />
      </div>

      <div className="mx-auto max-w-[960px] px-4 sm:px-6">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-black shadow-[0_14px_44px_rgba(0,0,0,0.13)] sm:rounded-[28px]">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 1120px) 100vw, 1120px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div
        className="article-body mx-auto max-w-[720px] px-6 py-10 sm:py-14"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />

      {article.relatedWiki.length > 0 && (
        <nav aria-label={locale === "zh" ? "相关教程" : "Related guides"} className="mx-auto max-w-[720px] px-6 pb-12">
          <div className="rounded-[20px] border border-black/8 bg-white p-5 sm:p-6">
            <h2 className="text-[21px] font-semibold tracking-[-0.02em]">
              {locale === "zh" ? "接下来可以看" : "Continue with these guides"}
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {article.relatedWiki.map((wikiSlug) => (
                <Link
                  key={wikiSlug}
                  href={`/${locale}/wiki/${wikiSlug}`}
                  className="rounded-full bg-[#f5f5f7] px-4 py-2 text-[14px] font-medium text-[#0066cc] hover:underline"
                >
                  {wikiSlug === "quick-jot"
                    ? locale === "zh" ? "随手记教程" : "Quick Jot guide"
                    : locale === "zh" ? "AI 智能整理教程" : "AI Organization guide"}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}

      <aside className="mx-auto max-w-[840px] px-6 pb-14">
        <div className="overflow-hidden rounded-[22px] bg-[#111] px-6 py-8 text-white sm:px-9 sm:py-9">
          <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.025em] sm:text-[34px]">
            {copy.ctaTitle}
          </h2>
          <p className="mt-3 max-w-[620px] text-[15px] leading-[1.58] text-white/65 sm:text-[16px]">
            {copy.ctaBody}
          </p>
          <a
            href="https://apps.apple.com/app/id6756836158"
            className="mt-5 inline-flex rounded-full bg-white px-4 py-2.5 text-[14px] font-medium text-black transition-opacity hover:opacity-85"
          >
            {copy.ctaLink}
          </a>
        </div>
      </aside>
    </article>
  );
}
