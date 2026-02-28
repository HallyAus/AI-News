import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Trading News & Market Analysis | AIMarketWire",
    template: "%s | AIMarketWire",
  },
  description:
    "AI-relevant market news for traders and investors. Every article scored for relevance, summarised by AI, with market impact analysis. Track AI stocks, chip makers, regulation, and model releases.",
  keywords: [
    "AI news",
    "artificial intelligence stocks",
    "AI market news",
    "AI trading news",
    "NVIDIA news",
    "AI chip stocks",
    "AI regulation",
    "AI investing",
    "machine learning stocks",
    "AI industry news",
    "AI stock market",
    "AI news today",
  ],
  authors: [{ name: "AIMarketWire" }],
  creator: "AIMarketWire",
  publisher: "AIMarketWire",
  metadataBase: new URL("https://aimarketwire.ai"),
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://aimarketwire.ai",
    siteName: "AIMarketWire",
    title: "AI Trading News & Market Analysis | AIMarketWire",
    description:
      "AI-relevant market news for traders and investors. Every article scored for relevance, summarised by AI, with market impact analysis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Trading News & Market Analysis | AIMarketWire",
    description:
      "AI-relevant market news scored and summarised. Only signal, no noise.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body
        className={`${geistSans.variable} ${ibmPlexMono.variable} ${newsreader.variable} antialiased scanlines`}
      >
        {children}
      </body>
    </html>
  );
}
