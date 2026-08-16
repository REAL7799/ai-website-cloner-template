import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Great_Vibes, Inter, Playfair_Display } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { defaultLocale, isLocale, locales, metaCopy } from "@/content/dictionary";
import { site } from "@/content/site";
import type { Locale } from "@/types/menu";

import "../globals.css";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const wordmark = Great_Vibes({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const copy = metaCopy[locale];

  return {
    metadataBase: new URL(site.url),
    title: {
      default: copy.title,
      template: `%s · ${site.name}`,
    },
    description: copy.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "pt-PT": "/pt",
        "en-GB": "/en",
        "x-default": "/pt",
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: copy.title,
      description: copy.description,
      locale: locale === "pt" ? "pt_PT" : "en_GB",
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang === "pt" ? "pt-PT" : "en"}
      className={`${body.variable} ${display.variable} ${wordmark.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background">
        <SiteHeader locale={lang} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={lang} />
      </body>
    </html>
  );
}
