import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Hope, RI`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Still Water Christian Fellowship",
    "church in Hope RI",
    "Hope Rhode Island church",
    "Sunday worship Hope RI",
    "Bible study Hope RI",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} | Hope, RI`,
    description: site.description,
    url: siteUrl,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [
      {
        url: "/stillwater/hero-water.jpg",
        width: 1200,
        height: 630,
        alt: "Still Water Christian Fellowship in Hope, Rhode Island",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Hope, RI`,
    description: site.description,
    images: ["/stillwater/hero-water.jpg"],
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
  category: "religion",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable}`}>
      <body>{children}</body>
    </html>
  );
}
