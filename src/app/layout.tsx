import type { Metadata, Viewport } from "next";
import { Caveat, Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/site/analytics";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Fátima Cake — Pastelaria Artesanal | Bolos e Tartes por Encomenda",
    template: "%s | Fátima Cake",
  },
  description:
    "Bolos e tartes artesanais feitos à mão com amor. Bolos de aniversário, casamento e tartes tradicionais por encomenda. Peça já pelo WhatsApp!",
  keywords: [
    "pastelaria artesanal",
    "bolos por encomenda",
    "bolos de aniversário",
    "bolos de casamento",
    "tartes artesanais",
    "Fátima Cake",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: site.url,
    siteName: site.name,
    title: "Fátima Cake — Pastelaria Artesanal",
    description:
      "Bolos e tartes artesanais feitos à mão com amor. Encomende pelo WhatsApp.",
    images: [
      {
        url: "/images/hero-cake.webp",
        width: 1280,
        height: 720,
        alt: "Bolo artesanal azul e branco da Fátima Cake",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fátima Cake — Pastelaria Artesanal",
    description:
      "Bolos e tartes artesanais feitos à mão com amor. Encomende pelo WhatsApp.",
    images: ["/images/hero-cake.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#3667c4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
