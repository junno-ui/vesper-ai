import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/config/site";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "../../public/fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});
const serif = localFont({
  src: "../../public/fonts/instrument-serif-latin-400-italic.woff2",
  variable: "--font-instrument",
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: "%s | Vesper.ai" },
  description: siteConfig.description,
  openGraph: { title: siteConfig.title, description: siteConfig.description, type: "website", images: ["/images/hero.jpg"] },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description, images: ["/images/hero.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
      <body style={{ background: "#000", color: "#fff" }}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
