import type { Metadata } from "next";
import { Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import styles from "./styles.module.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
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
        className={`${spaceMono.variable} ${inter.variable} font-mono antialiased relative`}
      >
        <div className={styles.gradient} />
        <div className={styles.pattern} />
        {children}
      </body>
    </html>
  );
}
