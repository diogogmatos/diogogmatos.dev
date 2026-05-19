import ExperienceList from "@/components/experience-list";
import client from "../../tina/__generated__/client";
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
  const experienceProps = await client.queries.experienceConnection();
  // const projectProps = await client.queries.projectConnection({
  //   filter: { featured: { eq: true } },
  // });
  const postProps = await client.queries.postConnection({
    first: 5,
  });

  return (
    <>
      <Header />
      {/* Experience & Education */}
      <ExperienceList props={experienceProps} />
      {/* Projects */}
      {/* {projectProps.data.projectConnection.edges &&
        projectProps.data.projectConnection.edges.length > 0 && (
          <>
            <h1 className="font-primary text-2xl sm:text-3xl pl-2">Projects</h1>
            <ProjectList props={projectProps} />
          </>
        )} */}
      {/* Blog Posts */}
      {postProps && <Posts postProps={postProps} />}
    </>
  );
}
