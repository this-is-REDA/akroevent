import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import SiteExtras from "@/components/SiteExtras";
import { buildRootMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/settings";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildRootMetadata(settings);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${bebas.variable} ${dmSans.variable} overflow-x-hidden`}>
      <body className="overflow-x-hidden font-sans">
        {children}
        <SiteExtras />
      </body>
    </html>
  );
}
