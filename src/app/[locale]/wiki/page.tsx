import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { QuickAnswer } from "@/components/content/QuickAnswer";
import { WikiShell } from "@/components/content/WikiShell";
import { getWikiPages, isWikiLocale } from "@/lib/wiki";
import { getArticlesPath } from "@/lib/routes";

const siteUrl = "https://www.orbnote.app";

const pageCopy = {
  en: {
    eyebrow: "OrbNote documentation",
    title: "Use OrbNote with confidence.",
    description: "Short, practical guides for capturing an idea, organizing it later, and keeping your notes private across Apple devices.",
    quick: [
      "Start with Quick Jot when you need to preserve an idea immediately.",
      "Use AI Organization when you want help moving a saved message into a useful Thread.",
      "Every guide has its own permanent URL and links to related explanations.",
    ],
    start: "Start here",
    startBody: "Choose the task closest to what you want to do. Each guide begins with the answer, followed by the details.",
    open: "Read guide",
    choose: "Find the right page",
    rows: [
      ["Capture without choosing a Thread", "Quick Jot", "quick-jot"],
      ["Organize a saved message", "AI Organization", "ai-organization"],
      ["Understand the capture-first method", "Conversational note-taking", "articles/conversational-note-taking"],
    ],
    need: "What you need",
    page: "Recommended page",
  },
  zh: {
    eyebrow: "OrbNote 使用文档",
    title: "快速找到答案，再继续记录。",
    description: "围绕立即记录、之后整理和跨 Apple 设备保护个人笔记的简明操作文档。",
    quick: [
      "需要立刻接住想法时，从随手记开始。",
      "已经保存消息、希望获得归档建议时，使用 AI 智能整理。",
      "每篇教程都有独立永久路由，并和相关说明互相链接。",
    ],
    start: "从这里开始",
    startBody: "选择最接近当前目标的教程。每一页都会先给答案，再展开操作细节。",
    open: "阅读教程",
    choose: "按目标查找",
    rows: [
      ["不选择会话，先记录下来", "随手记", "quick-jot"],
      ["整理一条已经保存的消息", "AI 智能整理", "ai-organization"],
      ["理解“先记录，再整理”的方法", "对话式笔记", "articles/conversational-note-taking"],
    ],
    need: "我想要",
    page: "推荐页面",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isWikiLocale(locale)) return {};
  const copy = pageCopy[locale];
  const canonical = `${siteUrl}/${locale}/wiki/`;
  return {
    title: locale === "zh" ? "使用说明与教程 - OrbNote Wiki" : "Guides and tutorials - OrbNote Wiki",
    description: copy.description,
    alternates: {
      canonical,
      languages: { en: `${siteUrl}/en/wiki/`, "zh-CN": `${siteUrl}/zh/wiki/` },
    },
    openGraph: { type: "website", url: canonical, siteName: "OrbNote", title: copy.title, description: copy.description },
  };
}

export default async function WikiIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isWikiLocale(locale)) notFound();
  const copy = pageCopy[locale];
  const pages = getWikiPages(locale);

  return (
    <WikiShell locale={locale}>
      <div className="mx-auto max-w-[840px] px-6 pb-12 pt-6 sm:px-9 sm:pt-8 xl:px-12">
        <header className="max-w-[720px]">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#ff6a1a]">{copy.eyebrow}</p>
          <h1 className="text-[36px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[46px]">{copy.title}</h1>
          <p className="mt-4 text-[16px] leading-[1.55] text-[#6e6e73] sm:text-[18px]">{copy.description}</p>
        </header>

        <div className="mt-6 max-w-[720px]">
          <QuickAnswer items={[...copy.quick]} locale={locale} />
        </div>

        <section className="mt-8 max-w-[720px]">
          <h2 className="text-[26px] font-semibold tracking-[-0.025em]">{copy.start}</h2>
          <p className="mt-2 text-[16px] leading-[1.6] text-[#6e6e73]">{copy.startBody}</p>
          <div className="mt-5 divide-y divide-black/8 border-y border-black/8">
            {pages.map((page) => (
              <Link key={page.slug} href={`/${locale}/wiki/${page.slug}/`} className="group block py-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[13px] font-medium text-[#ff6a1a]">{page.category}</p>
                    <h3 className="mt-1.5 text-[19px] font-semibold tracking-[-0.018em] group-hover:text-[#0066cc]">{page.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-[1.55] text-[#6e6e73]">{page.description}</p>
                  </div>
                  <span className="mt-6 shrink-0 text-[13px] font-medium text-[#0066cc]">{copy.open}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 max-w-[720px]">
          <h2 className="text-[26px] font-semibold tracking-[-0.025em]">{copy.choose}</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-black/10">
            <table className="w-full min-w-[600px] border-collapse text-left text-[14px]">
              <thead className="bg-[#f5f5f7] text-[#424245]">
                <tr><th className="px-5 py-4 font-semibold">{copy.need}</th><th className="px-5 py-4 font-semibold">{copy.page}</th></tr>
              </thead>
              <tbody className="divide-y divide-black/8">
                {copy.rows.map(([need, label, route]) => {
                  const href = route.startsWith("articles/")
                    ? getArticlesPath(locale, route.replace("articles/", ""))
                    : `/${locale}/wiki/${route}/`;
                  return (
                    <tr key={route}>
                      <td className="px-5 py-4 text-[#424245]">{need}</td>
                      <td className="px-5 py-4"><Link className="font-medium text-[#0066cc] hover:underline" href={href}>{label}</Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </WikiShell>
  );
}
