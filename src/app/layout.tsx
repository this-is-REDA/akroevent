import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import SiteExtras from "@/components/SiteExtras";
import { rootMetadata } from "@/lib/seo";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${bebas.variable} ${cormorant.variable} ${dmSans.variable} overflow-x-hidden`}>
      <body className="overflow-x-hidden font-sans">
        {children}
        <SiteExtras />
      </body>
    </html>
  );
}
