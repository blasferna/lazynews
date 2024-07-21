import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
