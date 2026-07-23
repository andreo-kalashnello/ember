import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EMBER — Fire. Flavor. Moments.",
  description:
    "Modern European cuisine, open-fire cooking and unforgettable dining in Mayfair, London.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="motion-ready">
      <head>
        <noscript>
          <style>{`
            .motion-ready [data-reveal] {
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body className={`${bodoni.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
