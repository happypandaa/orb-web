'use client';

/**
 * 网站底部
 * 简洁的 Apple 风格页脚
 */

import { useLocale } from '@/context/LocaleContext';
import Link from 'next/link';

export function Footer() {
  const { content } = useLocale();

  const links = [
    { label: content.footer.privacy, href: '/privacy' },
    { label: content.footer.terms, href: '/terms' },
    { label: content.footer.support, href: '/support' },
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
        <p className="text-[12px] text-[#86868b] text-center">
          {content.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
