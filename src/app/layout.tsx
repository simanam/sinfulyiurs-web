import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://sinfulyurs.com";
const siteName = "sinfulyurs";
const title = "sinfulyurs — Your routine. Sinfully yours.";
const description =
  "The beauty routine tracker you'll actually keep. Log your AM & PM skincare rituals, share routines with friends, rate products, and discover what real people actually use — not influencers. Join the waitlist for the iOS app.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | sinfulyurs",
  },
  description,
  keywords: [
    "skincare routine tracker",
    "beauty routine app",
    "skincare tracker app",
    "skincare community",
    "beauty routine log",
    "skincare product tracker",
    "AM PM skincare routine",
    "skincare sharing app",
    "beauty product reviews",
    "skincare streak tracker",
    "skin care ritual",
    "beauty app iOS",
    "skincare routine builder",
    "product rating skincare",
    "clone skincare routine",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  applicationName: siteName,
  category: "Beauty & Skincare",
  classification: "Beauty, Health, Lifestyle",
  referrer: "origin-when-cross-origin",
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph/Sin_open.png",
        width: 1200,
        height: 630,
        alt: "sinfulyurs — Log it. Share it. Own it. The skincare routine tracker.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph/Sin_open.png"],
    creator: "@sinfulyurs",
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
  alternates: {
    canonical: siteUrl,
  },
  other: {
    "apple-mobile-web-app-title": siteName,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      description,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/opengraph/Sin_open.png`,
      description:
        "sinfulyurs is a beauty routine tracker and social skincare community. Users log AM & PM routines, track streaks, share rituals, rate products, and discover real routines from real people.",
      sameAs: [],
    },
    {
      "@type": "SoftwareApplication",
      name: siteName,
      applicationCategory: "HealthApplication",
      operatingSystem: "iOS",
      description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
      },
      featureList: [
        "Track AM and PM skincare routines",
        "Share routines with friends and community",
        "Rate and review skincare products",
        "Tag products in posts",
        "Clone routines from other users",
        "Daily streak tracking and sin levels",
        "Social feed for skincare enthusiasts",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is sinfulyurs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "sinfulyurs is a beauty routine tracker and social skincare app. You log your AM and PM skincare rituals, track your streaks, share routines with friends, rate products, and discover what real people actually use — not influencers.",
          },
        },
        {
          "@type": "Question",
          name: "How does sinfulyurs work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Add your skincare products to morning and evening routines, check them off daily to build streaks, share your routine cards on social media or within the app, and discover new routines from the community feed.",
          },
        },
        {
          "@type": "Question",
          name: "Is sinfulyurs free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, sinfulyurs is free to use. The iOS app is launching soon — join the waitlist to get early access.",
          },
        },
        {
          "@type": "Question",
          name: "Can I share my skincare routine on Instagram or TikTok?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! sinfulyurs generates beautiful shareable routine cards that you can post directly to Instagram Stories, TikTok, iMessage, and more.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
