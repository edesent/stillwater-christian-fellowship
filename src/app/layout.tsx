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
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Still Water Christian Fellowship",
    "Still Water Christian Fellowship Hope RI",
    "church in Hope RI",
    "church in Hope Rhode Island",
    "Hope Rhode Island church",
    "Independent Baptist church Rhode Island",
    "Independent Baptist church Hope RI",
    "Bible-believing church Rhode Island",
    "King James Bible church RI",
    "Sunday worship Hope RI",
    "Wednesday Bible study Hope RI",
    "Pastor Bob Levesque",
    "Robert Levesque pastor",
    "Scituate Rhode Island church",
    "Coventry Rhode Island church",
    "West Warwick Rhode Island church",
    "Gospel preaching Rhode Island",
    "church near me Hope RI",
  ],
  other: {
    "geo.region": "US-RI",
    "geo.placename": "Hope, Rhode Island",
    "geo.position": "41.72363;-71.64019",
    ICBM: "41.72363, -71.64019",
  },
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name,
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
    title: site.name,
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
