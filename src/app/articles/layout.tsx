import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleProvider } from "@/context/LocaleContext";
import messages from "@/content/locales/en.json";

export default function EnglishArticlesLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider locale="en" messages={messages} timeZone="Asia/Shanghai">
      <LocaleProvider>
        <Header />
        <main lang="en">{children}</main>
        <Footer />
      </LocaleProvider>
    </NextIntlClientProvider>
  );
}
