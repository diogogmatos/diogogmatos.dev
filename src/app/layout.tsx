import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import styles from "./styles.module.css";
import { PaintBrush } from "@phosphor-icons/react/dist/ssr";
import BottomGradient from "@/components/bottom-gradient";
import Link from "next/link";

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
  title: "Diogo Matos",
  description: "Diogo Matos Portfolio: Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7b7b7b" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:image" content="/images/og.png" />
        <meta property="og:title" content="Diogo Matos - Portfolio" />
        <meta
          property="og:description"
          content="Welcome to my little corner of the internet."
        />
        <meta property="og:url" content="https://diogogmatos.dev" />
        <meta property="og:type" content="website" />
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
