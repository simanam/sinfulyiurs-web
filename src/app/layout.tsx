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

export const metadata: Metadata = {
  title: "sinfulyurs — Your routine. Sinfully yours.",
  description:
    "The beauty routine tracker you'll actually keep. Track your AM & PM skincare rituals, discover what others use, and join a community that takes beauty as seriously as you do.",
  keywords: [
    "skincare",
    "beauty routine",
    "skincare tracker",
    "beauty app",
    "skincare routine",
    "beauty community",
  ],
  openGraph: {
    title: "sinfulyurs — Your routine. Sinfully yours.",
    description:
      "The beauty routine tracker you'll actually keep. Track, share, and perfect your skincare ritual.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
