import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import styles from "./styles.module.css";
import { PaintBrush } from "@phosphor-icons/react/dist/ssr";
import BottomGradient from "@/components/bottom-gradient";
import { Analytics } from "@vercel/analytics/react";
import { WidthProvider } from "@/providers/width-provider";
import localFont from "next/font/local";
import { clsx } from "clsx";
import BackButton from "@/components/back-button";

const editorialNew = localFont({
  display: "swap",
  variable: "--font-editorial-new",
  src: [
    {
      path: "./fonts/PPEditorialNew-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPEditorialNew-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/PPEditorialNew-Ultrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/PPEditorialNew-UltraboldItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/PPEditorialNew-Ultralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/PPEditorialNew-UltralightItalic.otf",
      weight: "200",
      style: "italic",
    },
  ],
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://diogogmatos.dev"),
  openGraph: {
    siteName: "Diogo Matos",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="msapplication-TileColor" content="#000000" />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.UMAMI_WEBSITE_ID}
        ></script>
      </head>
      <body
        className={clsx(
          inter.variable,
          jetbrains.variable,
          editorialNew.variable,
          "text-neutral-50 font-sans antialiased relative",
          styles.body_bg,
        )}
      >
        <WidthProvider>
          <div
            className={clsx(
              "flex flex-col justify-between gap-8 sm:gap-10 px-4 pb-8 pt-28 sm:pb-8 sm:px-10 min-h-screen m-auto max-w-prose",
            )}
          >
            <main className="flex flex-col gap-8 sm:gap-10">
              <BackButton />
              {children}
            </main>

            <footer className="text-neutral-50/50 text-sm text-center py-12">
              proudly developed and designed by me{" "}
              <PaintBrush size={18} className="inline-flex mb-1" />
            </footer>

            <div className={styles.base} />
            <div className={styles.gradient} />
            <div className={styles.pattern} />
            <BottomGradient />
            <Analytics />
          </div>
        </WidthProvider>
      </body>
    </html>
  );
}
