'use client';

/**
 * 网站头部导航
 * 简洁导航栏，始终显示
 */

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { content } = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { label: content.nav.features, href: '#features-intro' },
    { label: content.nav.privacy, href: '#privacy' },
    { label: content.nav.faq, href: '#faq' },
    { label: content.nav.download, href: '#download' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl">
        <nav className="max-w-[1200px] mx-auto px-6 h-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-semibold text-[18px] hover:opacity-80 transition-opacity"
          >
            OrbNote
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 text-[14px] hover:text-white transition-colors"
              >
                {item.label}
              </Link>
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
              <Link
                key={item.href}
                href={item.href}
                className="text-white text-[28px] font-medium hover:text-white/80 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
