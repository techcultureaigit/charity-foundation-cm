import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Great_Vibes,
  Montserrat,
  Playfair_Display,
  Poppins,
} from "next/font/google";
import { FooterFromDb } from "@/components/site/FooterFromDb";
import { HeaderFromDb } from "@/components/site/HeaderFromDb";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { fallbackContact } from "@/lib/content/fallback";
import "./globals.css";

/** Body / UI — matches PDF mockup sans-serif. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

/** Header nav — bold geometric caps like the reference bar. */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
});

/** Headings — PDF display serif (high contrast, like Playfair). */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

/** Footer / quote script accents from the PDF. */
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: {
    default: "Sewa Sankalp Foundation",
    template: "%s | Sewa Sankalp Foundation",
  },
  description:
    "Sewa Sankalp Foundation supports women, children, education, health, and social welfare.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable} ${playfair.variable} ${greatVibes.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0&icon_names=calendar_month,diamond,eco,groups,person,spa,star,target,trending_up,visibility,volunteer_activism"
        />
      </head>
      <body className="min-h-screen antialiased">
        <SmoothScroll>
          <div className="flex min-h-screen flex-col bg-white">
            <Suspense fallback={<SiteHeader contact={fallbackContact} />}>
              <HeaderFromDb />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Suspense fallback={<SiteFooter contact={fallbackContact} />}>
              <FooterFromDb />
            </Suspense>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
