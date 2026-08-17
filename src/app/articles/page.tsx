import type { Metadata } from "next";

import LocalizedArticlesPage, {
  generateMetadata as generateLocalizedMetadata,
} from "@/app/[locale]/articles/page";

export async function generateMetadata(): Promise<Metadata> {
  return generateLocalizedMetadata({ params: Promise.resolve({ locale: "en" }) });
}

export default function EnglishArticlesPage() {
  return (
    <LocalizedArticlesPage
      params={Promise.resolve({ locale: "en" })}
      canonicalRoute
    />
  );
}
