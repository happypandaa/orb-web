'use client';

/**
 * 网站底部
 * 简洁的 Apple 风格页脚
 */

import { useLocale } from '@/context/LocaleContext';
import Link from 'next/link';
import Image from 'next/image';
import { getArticlesPath } from '@/lib/routes';

export function Footer() {
  const { content, locale } = useLocale();

  const links = [
    ...(locale === 'en' || locale === 'zh'
      ? [
          { label: content.nav.articles, href: getArticlesPath(locale) },
          { label: content.nav.wiki, href: `/${locale}/wiki` },
        ]
      : []),
    { label: content.footer.privacy, href: `/${locale}/privacy` },
    { label: content.footer.terms, href: `/${locale}/terms` },
    { label: content.footer.support, href: `/${locale}/support` },
  ];

  return (
    <footer className="bg-[#f5f5f7] border-t border-[#d2d2d7]">
      <div className="max-w-[980px] mx-auto px-6 py-5">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12px] text-[#424245] hover:text-[#1d1d1f] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 mb-6">
          <Image
            src="/icon.png"
            alt="OrbNote Logo"
            width={24}
            height={24}
            className="w-6 h-6 rounded-md opacity-50 grayscale"
          />
          <p className="text-[12px] text-[#86868b] text-center">
            {content.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
