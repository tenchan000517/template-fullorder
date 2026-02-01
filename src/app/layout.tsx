import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { seo, company, contact, locations, images } from "@/lib/site";

// JSON-LD構造化データ
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  description: seo.defaultDescription,
  url: seo.siteUrl,
  telephone: contact.phone,
  email: contact.email,
  address: locations.headquarters.address
    ? {
        "@type": "PostalAddress",
        streetAddress: locations.headquarters.address,
        postalCode: locations.headquarters.zipCode,
        addressCountry: "JP",
      }
    : undefined,
  image: images.logo,
};

export const metadata: Metadata = {
  metadataBase: seo.siteUrl ? new URL(seo.siteUrl) : undefined,
  title: {
    default: seo.defaultTitle || company.name || "会社名",
    template: `%s${seo.titleSuffix || ""}`,
  },
  description: seo.defaultDescription,

  // canonical URL
  alternates: {
    canonical: "/",
  },

  // robots
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

  // OGP
  openGraph: {
    title: seo.defaultTitle || company.name,
    description: seo.defaultDescription,
    locale: "ja_JP",
    type: "website",
    url: seo.siteUrl,
    siteName: company.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: seo.defaultTitle || company.name,
    description: seo.defaultDescription,
    images: ["/opengraph-image"],
  },
};

// Viewport
export const viewport: Viewport = {
  themeColor: "#1a3a5c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
