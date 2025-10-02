import Card from "@/components/card";
import {
  ArrowRight,
  GithubLogo,
  HandWaving,
  LinkedinLogo,
  Mailbox,
} from "@phosphor-icons/react/dist/ssr";
import CardTitle from "@/components/card-title";
import ExperienceList from "@/components/experience-list";
import CardBody from "@/components/card-body";
import CardImage from "@/components/card-image";
import client from "../../tina/__generated__/client";
import ProjectList from "@/components/project-list";
import { Metadata } from "next";
import Link from "next/link";
import BlogPostList from "@/components/blog-post-list";

export const metadata: Metadata = {
  metadataBase: new URL("https://diogogmatos.dev"),
  title: "Diogo Matos | Software Engineer",
  description: "Welcome to my little corner of the internet!",
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
    title: "Diogo Matos | Software Engineer",
    description: "Welcome to my little corner of the internet!",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "diogogmatos.dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diogo Matos | Software Engineer",
    description: "Welcome to my little corner of the internet!",
    images: [
      {
        url: "/images/og.jpg",
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
  const experienceProps = await client.queries.experienceConnection({
    sort: "relevance",
  });
  const projectProps = await client.queries.projectConnection({
    filter: { featured: { eq: true } },
  });
  const postProps = await client.queries.postConnection({
    first: 3,
  });

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <main>
        <div className="space-y-4 sm:space-y-6">
          <div className="flex lg:flex-row gap-4 sm:gap-6 flex-col-reverse">
            {/* Experience & Education */}
            <div className="space-y-4 sm:space-y-6 w-full">
              <Card>
                <CardTitle>Experience</CardTitle>
                <ExperienceList props={experienceProps} />
              </Card>
              <Card>
                <CardTitle>Education</CardTitle>
                <ExperienceList props={experienceProps} isEducation />
              </Card>
            </div>
            {/* About */}
            <div className="space-y-4 sm:space-y-6 flex flex-col">
              <Card
                className="lg:size-full lg:min-h-0 min-h-48"
                innerClassName="p-0"
              >
                <CardImage src="/images/highlight.jpg" alt="Diogo Matos" />
              </Card>
              <Card className="lg:min-w-96 lg:max-w-96">
                <CardTitle>
                  <p className="font-semibold text-lg sm:text-xl">
                    Hi there! I&apos;m Diogo{" "}
                    <HandWaving
                      size={24}
                      weight="duotone"
                      className="inline-flex -translate-y-0.5"
                    />
                  </p>
                </CardTitle>
                <CardBody>
                  <p>
                    Welcome to my tiny little corner of the internet. I use this
                    space to share my thoughts, projects, and experiences.
                  </p>
                  <p>Feel free to reach out and explore my work ^^</p>
                </CardBody>
              </Card>
            </div>
          </div>
          {/* Contacts / Socials */}
          <Card>
            <div className="grid xl:grid-cols-3 grid-flow-row xl:grid-flow-col gap-3 w-full sm:text-lg">
              <span className="flex space-x-2 items-center justify-center xl:justify-start">
                <Mailbox size={18} weight="duotone" />
                <a
                  href="mailto:career@diogogmatos.dev"
                  className="hover:underline"
                  data-umami-event="Email"
                >
                  career@diogogmatos.dev
                </a>
              </span>
              <span className="flex space-x-2 items-center justify-center">
                <GithubLogo size={18} weight="duotone" />
                <a
                  href="https://github.com/diogogmatos"
                  className="hover:underline"
                  data-umami-event="GitHub"
                >
                  diogogmatos
                </a>
              </span>
              <span className="flex space-x-2 items-center justify-center xl:justify-end">
                <LinkedinLogo size={18} weight="duotone" />
                <a
                  href="https://linkedin.com/in/diogo-matos"
                  className="hover:underline"
                  data-umami-event="LinkedIn"
                >
                  diogo-matos
                </a>
              </span>
            </div>
          </Card>
        </div>
      </main>
      {projectProps.data.projectConnection.edges &&
        projectProps.data.projectConnection.edges.length > 0 && (
          <>
            <div className="flex items-center justify-between gap-4 w-full pb-4 border-b border-white/20 mt-2">
              <h1 className="font-bold text-2xl sm:text-3xl pl-2">Projects</h1>
            </div>
            <ProjectList props={projectProps} />
          </>
        )}
      {postProps.data.postConnection.edges &&
        postProps.data.postConnection.edges.some(
          (r) => r !== null && r.node && !r.node.project,
        ) && (
          <>
            <div className="flex items-center justify-between gap-4 w-full pb-4 border-b border-white/20 mt-2">
              <h1 className="font-bold text-2xl sm:text-3xl pl-2">Blog</h1>
              <Link className="button" href="/blog">
                View all{" "}
                <ArrowRight
                  size="1.2em"
                  className="inline-flex group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
            <ul className="grid gap-4">
              <BlogPostList props={postProps} />
            </ul>
          </>
        )}
    </div>
  );
}
