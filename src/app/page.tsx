import Experiences from "@/components/home/experiences";
import { Metadata } from "next";
import Posts from "@/components/home/posts";
import Header from "@/components/home/header";
import Projects from "@/components/home/projects";
import Aurora from "@/components/animations/aurora";

const ogImageUrl = `/api/og?title=${encodeURIComponent("Diogo Matos")}&&description=${encodeURIComponent("diogogmatos.dev")}`;

export const metadata: Metadata = {
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
      <Aurora />
      <Header />
      <Experiences />
      <Projects />
      <Posts />
    </>
  );
}
