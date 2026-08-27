import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://closet-dayana.vercel.app"),
  title: {
    default: "Clóset Dayana — Moda y Estilo | Loja de Roupa em Moçambique",
    template: "%s · Clóset Dayana",
  },
  description: siteConfig.description,
  keywords: [
    "loja de roupa",
    "moda feminina",
    "Moçambique",
    "Maputo",
    "vestidos",
    "conjuntos",
    "Clóset Dayana",
  ],
  openGraph: {
    title: "Clóset Dayana — Moda y Estilo",
    description: siteConfig.description,
    type: "website",
    locale: "pt_MZ",
    images: [{ url: "/images/logo.jpg", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary",
    title: "Clóset Dayana — Moda y Estilo",
    description: siteConfig.description,
    images: ["/images/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
