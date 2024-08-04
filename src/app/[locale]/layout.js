import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Inter } from "next/font/google";
import "../globals.css";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Lazy News",
  description: "AI-Powered News Summarization Platform",
  authors: { name: "Blas Isaias Fernández", url: "https://blasferna.com" },
  keywords: ["News", "Summarization", "AI", "Next.js", "Tailwind CSS"],
  openGraph: {
    type: "website",
    url: "https://ailazynews.vercel.app",
    images: [
      {
        url: "https://ailazynews.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lazy News",
      },
    ],
  },
};

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen bg-white text-black dark:bg-[#1a1b1e] dark:text-white">
            <Header />
            {children}
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
