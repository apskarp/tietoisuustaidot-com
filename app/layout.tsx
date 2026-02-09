import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Tietoisuustaidot - Tutkimusmatkoja mieleen ja tietoisuuteen",
    template: "%s | Tietoisuustaidot"
  },
  description: "Blogikirjoituksia tietoisuudesta, psykologiasta ja mielekkäästä elämästä. Ari-Pekka Skarp yhdistää tutkimuksen, filosofian ja käytännön.",
  keywords: ["tietoisuus", "mindfulness", "psykologia", "nondualiteetti", "tietoisuustutkimus", "Ari-Pekka Skarp"],
  authors: [{ name: "Ari-Pekka Skarp" }],
  creator: "Ari-Pekka Skarp",
  openGraph: {
    type: "website",
    locale: "fi_FI",
    url: "https://tietoisuustaidot.com",
    siteName: "Tietoisuustaidot",
    title: "Tietoisuustaidot - Tutkimusmatkoja mieleen ja tietoisuuteen",
    description: "Blogikirjoituksia tietoisuudesta, psykologiasta ja mielekkäästä elämästä.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
