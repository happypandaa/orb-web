import type { Metadata } from "next";
import { LocaleProvider } from "@/context/LocaleContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { isAppLocale, locals } from '@/i18n/config';

type LocaleMessages = {
    meta?: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
};

const SITE_URL = "https://www.orbnote.app";

const openGraphLocales: Record<string, string> = {
    en: "en_US",
    zh: "zh_CN",
    ja: "ja_JP",
    ko: "ko_KR",
};

export async function generateStaticParams() {
    return locals.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    if (!isAppLocale(locale)) {
        return {};
    }

    setRequestLocale(locale);
    const messages = await getMessages() as LocaleMessages;
    const title = messages.meta?.title || "OrbNote";
    const description = messages.meta?.description || "OrbNote";
    const canonicalUrl = `${SITE_URL}/${locale}/`;

    return {
        title,
        description,
        keywords: messages.meta?.keywords,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${SITE_URL}/en/`,
                "zh-CN": `${SITE_URL}/zh/`,
                ja: `${SITE_URL}/ja/`,
                ko: `${SITE_URL}/ko/`,
                "x-default": `${SITE_URL}/en/`,
            },
        },
        openGraph: {
            type: "website",
            siteName: "OrbNote",
            title,
            description,
            url: canonicalUrl,
            locale: openGraphLocales[locale],
        },
    };
}

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    // Validate that the incoming `locale` parameter is valid
    if (!isAppLocale(locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();
    const contentLanguage = locale === 'zh' ? 'zh-CN' : locale;

    return (
        <NextIntlClientProvider messages={messages}>
            <LocaleProvider>
                <Header />
                <main lang={contentLanguage}>{children}</main>
                <Footer />
            </LocaleProvider>
        </NextIntlClientProvider>
    );
}
