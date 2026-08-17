export const locals = ['en', 'zh', 'ja', 'ko'] as const;
export type AppLocale = (typeof locals)[number];

export const defaultLocale: AppLocale = 'en';

export function isAppLocale(value: string): value is AppLocale {
    return (locals as readonly string[]).includes(value);
}
