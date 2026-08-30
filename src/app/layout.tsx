import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/site";
import { greatVibes, playfair, poppins } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kitty Flowers — Rosas Eternas Feitas à Mão em Lisboa",
    template: "%s | Kitty Flowers",
  },
  description:
    "Buquês de rosas eternas personalizados, feitos à mão em Lisboa (Prior Velho). Rosas de cetim que nunca murcham, caixas com chocolates e edições especiais. Encomendas por DM ou WhatsApp.",
  keywords: [
    "rosas eternas",
    "buquês personalizados",
    "rosas de cetim",
    "flores eternas Lisboa",
    "buquê de rosas Lisboa",
    "caixas com chocolates",
    "presentes personalizados",
    "Kitty Flowers",
  ],
  applicationName: "Kitty Flowers",
  authors: [{ name: "Kitty Flowers" }],
  creator: "Kitty Flowers",
  category: "shopping",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    siteName: "Kitty Flowers",
    title: "Kitty Flowers — Rosas Eternas Feitas à Mão em Lisboa",
    description:
      "Buquês de rosas eternas personalizados, feitos à mão com amor. Delicadeza em forma de flores — encomendas por DM ou WhatsApp.",
    images: [
      {
        url: "/seo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kitty Flowers — buquês de rosas eternas feitos à mão em Lisboa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitty Flowers — Rosas Eternas Feitas à Mão em Lisboa",
    description:
      "Buquês de rosas eternas personalizados, feitos à mão com amor. Delicadeza em forma de flores.",
    images: ["/seo/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#fdf2f7",
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
      lang="pt-PT"
      className={`${playfair.variable} ${greatVibes.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
