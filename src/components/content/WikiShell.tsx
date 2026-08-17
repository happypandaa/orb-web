import Link from "next/link";

import { getWikiPages, type WikiLocale } from "@/lib/wiki";

const shellCopy = {
  en: {
    home: "Wiki home",
    menu: "Documentation menu",
    current: "Current page",
    openMenu: "Open menu",
  },
  zh: {
    home: "Wiki 首页",
    menu: "文档目录",
    current: "当前页面",
    openMenu: "展开目录",
  },
} as const;

type WikiShellProps = {
  locale: WikiLocale;
  activeSlug?: string;
  children: React.ReactNode;
};

export function WikiShell({ locale, activeSlug, children }: WikiShellProps) {
  const copy = shellCopy[locale];
  const pages = getWikiPages(locale);
  const groups = pages.reduce<Array<{ category: string; pages: typeof pages }>>((result, page) => {
    const group = result.find((item) => item.category === page.category);
    if (group) group.pages.push(page);
    else result.push({ category: page.category, pages: [page] });
    return result;
  }, []);
  const activePage = pages.find((page) => page.slug === activeSlug);

  const navigation = (
    <>
      <Link
        href={`/${locale}/wiki/`}
        className={`block rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
          !activeSlug ? "bg-[#e8e8ed] text-[#1d1d1f]" : "text-[#424245] hover:bg-[#eeeef1]"
        }`}
        aria-current={!activeSlug ? "page" : undefined}
      >
        {copy.home}
      </Link>

      {groups.map((group) => (
        <section key={group.category} className="mt-5">
          <h2 className="px-3 text-[11px] font-semibold uppercase tracking-[0.11em] text-[#86868b]">
            {group.category}
          </h2>
          <div className="mt-2 grid gap-0.5">
            {group.pages.map((page) => {
              const active = page.slug === activeSlug;
              return (
                <Link
                  key={page.slug}
                  href={`/${locale}/wiki/${page.slug}/`}
                  className={`rounded-lg px-3 py-2 text-[13px] leading-[1.35] transition-colors ${
                    active
                      ? "bg-[#e8e8ed] font-medium text-[#1d1d1f]"
                      : "text-[#424245] hover:bg-[#eeeef1]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {page.title}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );

  return (
    <div className="min-h-[calc(100vh-48px)] bg-white text-[#1d1d1f] lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="hidden border-r border-black/8 bg-[#f7f7f8] lg:block" aria-label={copy.menu}>
        <nav className="sticky top-12 h-[calc(100vh-48px)] overflow-y-auto px-4 py-5">
          <p className="mb-4 px-3 text-[14px] font-semibold tracking-[-0.01em] text-[#1d1d1f]">OrbNote Wiki</p>
          {navigation}
        </nav>
      </aside>

      <div className="min-w-0">
        <details className="group sticky top-12 z-30 border-b border-black/8 bg-white/95 px-5 py-3 backdrop-blur-xl lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-medium text-[#1d1d1f]">
            <span>
              <span className="mr-2 text-[#86868b]">{copy.current}:</span>
              {activePage?.title ?? copy.home}
            </span>
            <span className="shrink-0 text-[13px] font-medium text-[#0066cc]">{copy.openMenu}</span>
          </summary>
          <nav className="max-h-[65vh] overflow-y-auto pb-2 pt-4" aria-label={copy.menu}>
            {navigation}
          </nav>
        </details>
        {children}
      </div>
    </div>
  );
}
