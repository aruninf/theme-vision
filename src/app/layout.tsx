import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = "https://theme-vision.app";
const siteName = "Theme Vision";
const description =
  "Preview complete websites and mobile apps with real UI before choosing your color palette. Discover handcrafted themes for every industry.";
const ogImage = `${siteUrl}/og.png`;

export const metadata: Metadata = {
  title: {
    default: "Theme Vision — Choose Colors You'll Never Regret",
    template: "%s | Theme Vision",
  },
  description,
  keywords: [
    "color theme",
    "color palette",
    "UI design",
    "theme preview",
    "website colors",
    "app colors",
    "design system",
    "CSS variables",
    "Tailwind theme",
    "color scheme",
  ],
  authors: [{ name: "Theme Vision" }],
  creator: "Theme Vision",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Theme Vision — Choose Colors You'll Never Regret",
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Theme Vision — Preview themes in real UI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Theme Vision — Choose Colors You'll Never Regret",
    description,
    images: [ogImage],
    creator: "@themevision",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: siteName,
              url: siteUrl,
              description,
              applicationCategory: "DesignApplication",
              operatingSystem: "All",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
