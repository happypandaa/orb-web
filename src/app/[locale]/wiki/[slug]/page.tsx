import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { QuickAnswer } from "@/components/content/QuickAnswer";
import { WikiShell } from "@/components/content/WikiShell";
import { getWikiPage, getWikiPages, isWikiLocale, wikiLocales } from "@/lib/wiki";
import { getArticlesPath } from "@/lib/routes";

const siteUrl = "https://www.orbnote.app";

const pageCopy = {
  en: {
    docs: "Documentation",
    updated: "Updated",
    read: "min read",
    switchLanguage: "阅读中文版",
    related: "Related reading",
    article: "Background article",
    guide: "Next guide",
    screenshot: "Product screenshot",
    appStore: "Download OrbNote on the App Store",
  },
  zh: {
    docs: "使用文档",
    updated: "更新于",
    read: "分钟阅读",
    switchLanguage: "Read in English",
    related: "相关内容",
    article: "背景文章",
    guide: "下一篇教程",
    screenshot: "产品界面截图",
    appStore: "前往 App Store 下载 OrbNote",
  },
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return wikiLocales.flatMap((locale) => getWikiPages(locale).map((page) => ({ locale, slug: page.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isWikiLocale(locale)) return {};
  const page = getWikiPage(locale, slug);
  if (!page) return {};
  const canonical = `${siteUrl}/${locale}/wiki/${slug}/`;
  const image = `${siteUrl}${page.image}`;
  return {
    title: `${page.title} - OrbNote Wiki`,
    description: page.description,
    alternates: { canonical, languages: { en: `${siteUrl}/en/wiki/${slug}/`, "zh-CN": `${siteUrl}/zh/wiki/${slug}/` } },
    openGraph: { type: "article", url: canonical, siteName: "OrbNote", title: page.title, description: page.description, modifiedTime: page.updatedAt, images: [{ url: image, alt: page.imageAlt }] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [image] },
  };
}

export default async function WikiDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isWikiLocale(locale)) notFound();
  const page = getWikiPage(locale, slug);
  if (!page) notFound();

  const copy = pageCopy[locale];
  const otherLocale = locale === "en" ? "zh" : "en";
  const translation = getWikiPage(otherLocale, slug);
  const canonical = `${siteUrl}/${locale}/wiki/${slug}/`;
  const formattedDate = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric", month: "long", day: "numeric",
  }).format(new Date(`${page.updatedAt}T00:00:00Z`));
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "TechArticle", headline: page.title, description: page.description,
      image: `${siteUrl}${page.image}`, dateModified: page.updatedAt, inLanguage: locale === "zh" ? "zh-CN" : "en",
      proficiencyLevel: "Beginner", about: "OrbNote",
      publisher: { "@type": "Organization", name: "OrbNote", logo: { "@type": "ImageObject", url: `${siteUrl}/icon.png` } },
      mainEntityOfPage: canonical,
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "OrbNote", item: `${siteUrl}/${locale}/` },
        { "@type": "ListItem", position: 2, name: "Wiki", item: `${siteUrl}/${locale}/wiki/` },
        { "@type": "ListItem", position: 3, name: page.title, item: canonical },
      ],
    },
  ];

  return (
    <WikiShell locale={locale} activeSlug={slug}>
      <article lang={locale === "zh" ? "zh-CN" : "en"} className="mx-auto max-w-[840px] px-6 pb-12 pt-6 sm:px-9 sm:pt-8 xl:px-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

        <header className="max-w-[720px]">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[13px]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[#86868b]">
              <Link href={`/${locale}/wiki/`} className="hover:text-[#0066cc]">{copy.docs}</Link>
              <span aria-hidden="true">/</span>
              <span>{page.category}</span>
            </nav>
            {translation && (
              <Link href={`/${otherLocale}/wiki/${slug}/`} hrefLang={otherLocale === "zh" ? "zh-CN" : "en"} className="font-medium text-[#0066cc] hover:underline">
                {copy.switchLanguage}
              </Link>
            )}
          </div>
          <h1 className="mt-5 text-[36px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[44px]">{page.title}</h1>
          <p className="mt-4 text-[16px] leading-[1.55] text-[#6e6e73] sm:text-[18px]">{page.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] text-[#86868b]">
            <span>{page.productVersion}</span><span aria-hidden="true">·</span>
            <span>{copy.updated} {formattedDate}</span><span aria-hidden="true">·</span>
            <span>{page.readingMinutes} {copy.read}</span>
          </div>
        </header>

        <div className="mt-6 max-w-[720px]"><QuickAnswer items={page.summary} locale={locale} /></div>

        <figure className="mt-7 max-w-[680px] overflow-hidden rounded-xl border border-black/10 bg-[#0a0a0b] shadow-[0_10px_28px_rgba(0,0,0,0.07)]">
          <div className="relative aspect-[16/10]">
            <Image src={page.image} alt={page.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 760px" className="object-cover" />
          </div>
          <figcaption className="border-t border-white/10 bg-[#f5f5f7] px-4 py-3 text-[13px] text-[#6e6e73]">{copy.screenshot}: {page.imageAlt}</figcaption>
        </figure>

        <div className="article-body wiki-body max-w-[720px] py-6 sm:py-7" dangerouslySetInnerHTML={{ __html: page.html }} />

        <footer className="max-w-[720px] border-t border-black/10 pt-6">
          {(page.relatedArticles.length > 0 || page.relatedWiki.length > 0) && (
            <nav aria-label={copy.related}>
              <h2 className="text-[20px] font-semibold tracking-[-0.015em]">{copy.related}</h2>
              <div className="mt-4 grid gap-3 text-[15px]">
                {page.relatedArticles.map((articleSlug) => (
                  <Link key={articleSlug} href={getArticlesPath(locale, articleSlug)} className="font-medium text-[#0066cc] hover:underline">
                    {copy.article}: {locale === "zh" ? "什么是对话式笔记？" : "What is conversational note-taking?"}
                  </Link>
                ))}
                {page.relatedWiki.map((wikiSlug) => (
                  <Link key={wikiSlug} href={`/${locale}/wiki/${wikiSlug}/`} className="font-medium text-[#0066cc] hover:underline">
                    {copy.guide}: {wikiSlug === "quick-jot" ? (locale === "zh" ? "随手记" : "Quick Jot") : (locale === "zh" ? "AI 智能整理" : "AI Organization")}
                  </Link>
                ))}
              </div>
            </nav>
          )}
          <a href="https://apps.apple.com/app/id6756836158" className="mt-8 inline-flex rounded-full bg-[#1d1d1f] px-5 py-3 text-[14px] font-medium text-white hover:bg-black">
            {copy.appStore}
          </a>
        </footer>
      </article>
    </WikiShell>
  );
}
