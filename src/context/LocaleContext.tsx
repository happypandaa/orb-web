'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocale as useNextIntlLocale, useMessages } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import zhContent from '@/content/locales/zh.json';

// We cast messages to this type for TS
type ContentType = typeof zhContent;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: ContentType;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useNextIntlLocale() as Locale;
  const messages = useMessages() as unknown as ContentType;
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = (newLocale: Locale) => {
    const articleMatch = pathname.match(/^\/(?:(en|zh)\/)?articles(\/.*)?$/);
    if (articleMatch) {
      const suffix = articleMatch[2] || '';
      router.push(newLocale === 'en' ? `/articles${suffix}` : `/${newLocale}/articles${suffix}`);
      return;
    }

    // pathname e.g. /en/privacy or /en
    const segments = pathname.split('/');
    // segments[0] is empty, segments[1] is locale
    if (segments.length >= 2) {
      segments[1] = newLocale;
      const newPath = segments.join('/');
      router.push(newPath);
    } else {
      router.push(`/${newLocale}`);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, content: messages }}>
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
