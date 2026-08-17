import type { Metadata } from "next";

import LocalizedArticlePage, {
  generateMetadata as generateLocalizedMetadata,
} from "@/app/[locale]/articles/[slug]/page";
import { getArticles } from "@/lib/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles("en").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generateLocalizedMetadata({
    params: Promise.resolve({ locale: "en", slug }),
  });
}

export default async function EnglishArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <LocalizedArticlePage
      params={Promise.resolve({ locale: "en", slug })}
      canonicalRoute
    />
  );
}
