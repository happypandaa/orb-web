import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LegacyArticlesRedirect } from "@/components/content/LegacyArticlesRedirect";
import { getArticles, isArticleLocale } from "@/lib/articles";
import { getArticlesPath, getArticlesUrl } from "@/lib/routes";

const siteUrl = "https://www.orbnote.app";

const pageCopy = {
  en: {
    eyebrow: "OrbNote Articles",
    title: "Better ways to capture, keep, and find what matters.",
    description: "Practical notes on conversational capture, personal knowledge, privacy, and building a calmer memory system.",
    read: "Read article",
    minute: "min read",
  },
  zh: {
    eyebrow: "OrbNote 文章",
    title: "更轻松地记录、保存，并找回重要内容。",
    description: "关于对话式记录、个人知识、隐私，以及如何建立更平静的记忆系统。",
    read: "阅读文章",
    minute: "分钟阅读",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isArticleLocale(locale)) return {};

  const copy = pageCopy[locale];
  const canonical = getArticlesUrl(siteUrl, locale);

  return {
    title: locale === "en" ? "Articles - OrbNote" : "文章 - OrbNote",
    description: copy.description,
    alternates: {
      canonical,
      languages: {
        en: getArticlesUrl(siteUrl, "en"),
        "zh-CN": getArticlesUrl(siteUrl, "zh"),
        "x-default": getArticlesUrl(siteUrl, "en"),
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "OrbNote",
      title: locale === "en" ? "OrbNote Articles" : "OrbNote 文章",
      description: copy.description,
    },
  };
}

export default async function ArticlesPage({
  params,
  canonicalRoute = false,
}: {
  params: Promise<{ locale: string }>;
  canonicalRoute?: boolean;
}) {
  const { locale } = await params;
  if (!isArticleLocale(locale)) notFound();
  if (locale === "en" && !canonicalRoute) {
    return <LegacyArticlesRedirect target={getArticlesPath("en")} />;
  }

  const copy = pageCopy[locale];
  const articles = getArticles(locale);

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <section className="border-b border-black/5 bg-[#fbfbfd]">
        <div className="mx-auto max-w-[1040px] px-6 py-14 sm:py-18">
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#ff6a1a]">
            {copy.eyebrow}
          </p>
          <h1 className="max-w-[820px] text-[38px] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-[54px]">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-[680px] text-[17px] leading-[1.55] text-[#6e6e73] sm:text-[19px]">
            {copy.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1040px] px-6 py-8 sm:py-12">
        <div className="grid gap-6">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
            >
              <Link
                href={getArticlesPath(locale, article.slug)}
                className="group grid md:grid-cols-[1.05fr_0.95fr]"
              >
                <div className="relative min-h-[220px] overflow-hidden bg-black md:min-h-[300px]">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 56vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-[12px] text-[#86868b]">
                    <span className="font-medium text-[#ff6a1a]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingMinutes} {copy.minute}</span>
                  </div>
                  <h2 className="text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[34px]">
                    {article.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.58] text-[#6e6e73] sm:text-[16px]">
                    {article.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc]">
                    {copy.read}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
