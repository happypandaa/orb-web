'use client';

/**
 * 语言切换器
 * 显示在导航栏，支持手动切换语言
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';
import { locales, localeNames, Locale } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-white/80 text-[14px] hover:text-white transition-colors px-2 py-1 rounded"
        aria-label="切换语言"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 点击外部关闭 */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* 下拉菜单 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-50 bg-[#1d1d1f] rounded-xl overflow-hidden shadow-xl border border-white/10 min-w-[140px]"
            >
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setLocale(loc);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full px-4 py-2.5 text-left text-[14px] transition-colors
                    ${locale === loc 
                      ? 'bg-[#0071e3] text-white' 
                      : 'text-white/80 hover:bg-white/10'
                    }
                  `}
                >
                  {localeNames[loc]}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

