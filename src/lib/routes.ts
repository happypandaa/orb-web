export function getArticlesPath(locale: string, slug?: string) {
  const base = locale === "en" ? "/articles" : `/${locale}/articles`;
  return slug ? `${base}/${slug}` : base;
}

export function getArticlesUrl(siteUrl: string, locale: string, slug?: string) {
  return `${siteUrl}${getArticlesPath(locale, slug)}/`;
}
