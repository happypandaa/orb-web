import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { AnalyticsEvents } from "@/components/analytics/AnalyticsEvents";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-DGFF5BZYBP";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "OrbNote 3.0 - Capture First, Organize Later",
    description: "A conversational notebook for capturing thoughts first and organizing them when it becomes useful.",
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale?: string }>;
}>) {
    const { locale } = await params;

    return (
        <html lang={locale || "en"} className="scroll-smooth">
            <body className={`${inter.className} antialiased bg-[#fafafa] dark:bg-black`}>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}');
                    `}
                </Script>
                <AnalyticsEvents />
                {children}
            </body>
        </html>
    );
}
