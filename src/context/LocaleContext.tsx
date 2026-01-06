'use client';

/**
 * 语言上下文
 * 提供全局语言状态管理
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale, getBrowserLocale, locales } from '@/lib/i18n';

// 导入所有语言文件
import zhContent from '@/content/locales/zh.json';
import enContent from '@/content/locales/en.json';
import jaContent from '@/content/locales/ja.json';
import koContent from '@/content/locales/ko.json';

const contentMap = {
  zh: zhContent,
  en: enContent,
  ja: jaContent,
  ko: koContent,
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: typeof zhContent;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = 'orbnote-locale';

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isHydrated, setIsHydrated] = useState(false);

  // 初始化时检测语言
  useEffect(() => {
    // 优先使用用户保存的偏好
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (savedLocale && locales.includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // 否则使用浏览器语言
      const browserLocale = getBrowserLocale();
      setLocaleState(browserLocale);
    }
    setIsHydrated(true);
  }, []);

  // 设置语言并保存
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    // 更新 html lang 属性
    document.documentElement.lang = newLocale === 'zh' ? 'zh-CN' : newLocale;
  };

  const content = contentMap[locale];

  // 防止 hydration 不匹配，在客户端水合完成前使用默认语言
  if (!isHydrated) {
    return (
      <LocaleContext.Provider value={{ locale: defaultLocale, setLocale, content: contentMap[defaultLocale] }}>
        {children}
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, content }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

