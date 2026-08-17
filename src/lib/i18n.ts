/**
 * 国际化配置
 * 支持根据设备语言自动切换
 */

export const locales = ['zh', 'en', 'ja', 'ko'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// 语言显示名称
export const localeNames: Record<Locale, string> = {
  zh: '简体中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
};

/**
 * 根据浏览器语言获取最匹配的语言
 */
export function getPreferredLocale(acceptLanguage?: string): Locale {
  if (!acceptLanguage) return defaultLocale;

  // 解析 Accept-Language 头
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = 'q=1'] = lang.trim().split(';');
      return {
        code: code.toLowerCase(),
        quality: parseFloat(q.replace('q=', '')) || 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  // 查找匹配的语言
  for (const { code } of languages) {
    // 精确匹配
    if (locales.includes(code as Locale)) {
      return code as Locale;
    }
    // 前缀匹配 (如 zh-CN -> zh, ja-JP -> ja)
    const prefix = code.split('-')[0];
    if (locales.includes(prefix as Locale)) {
      return prefix as Locale;
    }
  }

  return defaultLocale;
}

/**
 * 客户端获取浏览器语言
 */
export function getBrowserLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;

  const legacyNavigator = navigator as Navigator & { userLanguage?: string };
  const browserLang = navigator.language || legacyNavigator.userLanguage;
  if (!browserLang) return defaultLocale;

  const code = browserLang.toLowerCase();

  // 精确匹配
  if (locales.includes(code as Locale)) {
    return code as Locale;
  }

  // 前缀匹配
  const prefix = code.split('-')[0];
  if (locales.includes(prefix as Locale)) {
    return prefix as Locale;
  }

  return defaultLocale;
}
