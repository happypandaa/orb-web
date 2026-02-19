'use client';

/**
 * 网站底部
 * 简洁的 Apple 风格页脚
 */

import { useEffect, useMemo, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import type { Locale } from '@/lib/i18n';

export function Footer() {
  const { content, locale } = useLocale();

  type ModalKey = 'privacy' | 'terms' | 'support' | 'contact';
  const [openKey, setOpenKey] = useState<ModalKey | null>(null);

  const modalBody: Record<Locale, string> = useMemo(() => ({
    zh: '内容待补充，后续上线时更新。',
    en: 'Content coming soon. We will update before launch.',
    ja: '内容は準備中です。正式公開前に更新します。',
    ko: '콘텐츠 준비 중입니다. 정식 공개 전에 업데이트하겠습니다.',
  }), []);

  const footerLabels: Record<ModalKey, string> = {
    privacy: content.footer.privacy,
    terms: content.footer.terms,
    support: content.footer.support,
    contact: content.footer.contact,
  };

  const links: Array<{ key: ModalKey; label: string }> = [
    { key: 'privacy', label: footerLabels.privacy },
    { key: 'terms', label: footerLabels.terms },
    { key: 'support', label: footerLabels.support },
    { key: 'contact', label: footerLabels.contact },
  ];

  useEffect(() => {
    if (!openKey) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenKey(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openKey]);

  const active = openKey
    ? { title: footerLabels[openKey], body: modalBody[locale] }
    : null;

  return (
    <footer className="bg-[#f5f5f7] border-t border-[#d2d2d7]">
      <div className="max-w-[980px] mx-auto px-6 py-5">
        {/* 链接 */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
          {links.map((link) => (
            <button
              key={link.key}
              type="button"
              onClick={() => setOpenKey(link.key)}
              className="text-[12px] text-[#424245] hover:text-[#1d1d1f] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
        
        {/* 版权信息 */}
        <p className="text-[12px] text-[#86868b] text-center">
          {content.footer.copyright}
        </p>
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenKey(null)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="footer-modal-title"
            className="relative z-10 w-full max-w-[520px] rounded-2xl bg-white text-[#1d1d1f] shadow-2xl"
          >
            <div className="px-6 py-5 border-b border-[#e5e5e7] flex items-center justify-between">
              <h2 id="footer-modal-title" className="text-[18px] font-semibold">
                {active.title}
              </h2>
              <button
                type="button"
                onClick={() => setOpenKey(null)}
                className="text-[#86868b] hover:text-[#1d1d1f]"
                aria-label="Close"
              >
                x
              </button>
            </div>
            <div className="px-6 py-6">
              <p className="body-medium text-[#424245]">{active.body}</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
