import Experiences from "@/components/experiences";
import { Metadata } from "next";
import Posts from "@/components/posts";
import Header from "@/components/header";

const ogImageUrl = `/api/og?title=${encodeURIComponent("Diogo Matos")}&&description=${encodeURIComponent("diogogmatos.dev")}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://diogogmatos.dev"),
  title: "Diogo Matos",
  description: "Diogo Matos Portfolio & Blog: Software Engineer",
  keywords: [
    "software engineer",
    "developer",
    "diogo matos",
    "portfolio",
    "cv",
    "projects",
    "education",
    "experience",
    "contact",
  ],
  openGraph: {
    url: "/",
    type: "website",
    title: "Diogo Matos",
    description: "Diogo Matos Portfolio & Blog: Software Engineer",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "diogogmatos.dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diogo Matos",
    description: "Diogo Matos Portfolio & Blog: Software Engineer",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "diogogmatos.dev",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  return (
    <>
      <Header />
      <Experiences />
      <Posts />
    </>
  );
}
