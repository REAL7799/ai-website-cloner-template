import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline} em Fátima`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "estética Fátima",
    "unhas de gel Fátima",
    "manicure Fátima",
    "pedicure Fátima",
    "extensão de pestanas Fátima",
    "sobrancelhas Ourém",
    "Annelux",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline} em Fátima`,
    description: siteConfig.description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Annelux — Estética e Bem-Estar em Fátima",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f9f6f0",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phoneHref.replace("tel:", ""),
  image: `${siteConfig.url}/images/hero.webp`,
  hasMap: siteConfig.location.mapsUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressRegion: "Santarém",
    addressCountry: "PT",
  },
  // Manter em sincronia com siteConfig.hours (horários provisórios).
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-PT"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${jost.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
