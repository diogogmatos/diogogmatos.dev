import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import styles from "./styles.module.css";
import { PaintBrush } from "@phosphor-icons/react/dist/ssr";
import BottomGradient from "@/components/bottom-gradient";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

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
    siteName: "Diogo Matos | Software Engineer",
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
  applicationName: "Diogo Matos | Software Engineer",
  appleWebApp: {
    title: "Diogo Matos | Software Engineer",
    statusBarStyle: "default",
    capable: true,
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/safari-pinned-tab.svg",
        color: "#7b7b7b",
        rel: "mask-icon",
      },
    ],
    shortcut: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#000000",
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
        {/* <meta property="og:image" content="/images/og.png" />
        <meta property="og:title" content="Diogo Matos - Portfolio" />
        <meta
          property="og:description"
          content="Welcome to my little corner of the internet."
        />
        <meta property="og:url" content="https://diogogmatos.dev" />
        <meta property="og:type" content="website" /> */}
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} text-neutral-50 font-mono antialiased relative flex flex-col gap-4 sm:gap-12 px-2 pt-6 pb-2 sm:p-12 min-h-screen md:px-14 xl:px-52`}
      >
        <div className={styles.gradient} />
        <div className={styles.pattern} />
        <BottomGradient />
        <header className="space-y-4 pl-2">
          <Link href="/" className="font-bold text-4xl sm:text-5xl">
            Diogo Matos
          </Link>
          <p className="sm:text-lg">
            software engineering @{" "}
            <a
              className="font-bold hover:underline"
              href="https://www.uminho.pt"
              target="_blank"
              rel="noopener noreferrer"
            >
              uminho
            </a>
          </p>
        </header>
        {children}
        <Analytics />
        <footer className="w-full justify-center text-white/50 text-sm sm:text-base items-center text-center">
          <p>
            proudly developed and designed by me{" "}
            <PaintBrush size={18} className="inline-flex mb-1" />
          </p>
        </footer>
      </body>
    </html>
  );
}
