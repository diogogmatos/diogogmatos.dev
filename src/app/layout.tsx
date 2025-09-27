import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import styles from "./styles.module.css";
import { PaintBrush } from "@phosphor-icons/react/dist/ssr";
import BottomGradient from "@/components/bottom-gradient";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/navbar";
import { WidthProvider } from "@/providers/width-provider";

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
        className={`${inter.variable} ${jetbrains.variable} text-neutral-50 font-mono antialiased relative`}
      >
        <WidthProvider>
          <div className="flex flex-col justify-between gap-6 sm:gap-8 px-4 py-6 sm:pt-12 sm:pb-8 sm:px-10 max-w-screen-lg min-h-screen m-auto">
            <div className={styles.gradient} />
            <div className={styles.pattern} />
            <BottomGradient />
            {/* header + body */}
            <section className="flex flex-col gap-6 sm:gap-8">
              <header className="flex flex-col gap-2 sm:gap-4 pl-2">
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
                <Navbar />
              </header>
              {children}
            </section>
            <footer className="text-white/50 text-sm sm:text-base text-center z-50">
              proudly developed and designed by me{" "}
              <PaintBrush size={18} className="inline-flex mb-1" />
            </footer>
            <Analytics />
          </div>
        </WidthProvider>
      </body>
    </html>
  );
}
