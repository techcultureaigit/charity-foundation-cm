import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-admin-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-admin-display",
});

export const metadata = {
  title: "Admin | Sewa Sankalp Foundation",
  description: "Content management for Sewa Sankalp Foundation website",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${manrope.variable} ${cormorant.variable} admin-theme min-h-full font-[family-name:var(--font-admin-sans)]`}
    >
      {children}
    </div>
  );
}
