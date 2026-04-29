import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import DisableDevTools from "@/components/DisableDevTools";
import MobileWarning from "@/components/MobileWarning";
import {
  ogImage,
  seoKeywords,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
} from "@/lib/seo";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "Islombek Botirov", url: siteUrl }],
  creator: "Islombek Botirov",
  publisher: siteName,
  keywords: seoKeywords,
  category: "Packaging Design",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
    languages: {
      uz: "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 675,
        alt: "Qadoqdizayn.uz professional qadoq dizayn portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    address: false,
    email: false,
  },
  other: {
    "geo.region": "UZ",
    "geo.placename": "Toshkent, Uzbekistan",
    classification: "Packaging design, qadoq dizayn, package design",
    "business:contact_data:country_name": "Uzbekistan",
    "business:contact_data:phone_number": "+998913514261",
    "article:author": "Islombek Botirov",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased font-sans`}>
        <DisableDevTools />
        <MobileWarning />
        {children}
      </body>
    </html>
  );
}
