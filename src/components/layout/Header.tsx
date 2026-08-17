'use client';

/**
 * 网站头部导航
 * 顶栏只放页面级入口（首页 / Wiki / 文章 / 下载），跨页行为一致
 */

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/context/LocaleContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { getArticlesPath } from '@/lib/routes';
import { APP_STORE_URL } from '@/config/content';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

function NavAnchor({
  item,
  className,
  onClick,
}: {
  item: NavItem;
  className?: string;
  onClick?: () => void;
}) {
  if (item.external) {
    return (
      <a
        href={item.href}
        className={className}
        onClick={onClick}
        rel="noopener noreferrer"
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

export function Header() {
  const { content, locale } = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation: NavItem[] = [
    { label: content.nav.home, href: `/${locale}` },
    ...(locale === 'en' || locale === 'zh'
      ? [
          { label: content.nav.articles, href: getArticlesPath(locale) },
          { label: content.nav.wiki, href: `/${locale}/wiki` },
        ]
      : []),
    { label: content.nav.download, href: APP_STORE_URL, external: true },
  ];

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl">
        <nav className="max-w-[1200px] mx-auto px-6 h-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/icon.png"
              alt="OrbNote Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-white font-semibold text-[18px]">OrbNote</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <NavAnchor
                key={item.href}
                item={item}
                className="text-white/80 text-[14px] hover:text-white transition-colors"
              />
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile: 语言切换 + 菜单按钮 */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                {isMobileMenuOpen ? (
                  <path d="M4.5 4.5l9 9m0-9l-9 9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                ) : (
                  <>
                    <rect y="4" width="18" height="1.5" rx="0.75" />
                    <rect y="8.5" width="18" height="1.5" rx="0.75" />
                    <rect y="13" width="18" height="1.5" rx="0.75" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black pt-12">
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {navigation.map((item) => (
              <NavAnchor
                key={item.href}
                item={item}
                className="text-white text-[28px] font-medium hover:text-white/80 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
