import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { LocaleProvider } from "@/context/LocaleContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locals } from '@/i18n/config';

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "OrbNote - Your Intelligent Conversational Notebook",
    description: "Capture inspiration instantly, keep data absolutely private. Built on native Apple technology, designed for deep recording and long-term privacy.",
};

export async function generateStaticParams() {
    return locals.map((locale) => ({ locale }));
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
    if (!locals.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} className="scroll-smooth">
            <body className={`${inter.className} antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    <LocaleProvider>
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </LocaleProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
