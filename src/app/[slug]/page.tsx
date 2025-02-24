import BackButton from "@/components/back-button";
import Card from "@/components/card";
import { Metadata } from "next";
import client from "../../../tina/__generated__/client";
import fs from "fs";
import path from "path";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = fs.readdirSync(path.join("src/content/posts"));
  return posts.map((post) => ({
    slug: post.split(".")[0],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const projects = (await client.queries.projectConnection()).data;
  const project = projects.projectConnection.edges?.filter(
    (p) => p?.node?.post?._sys.filename === slug,
  )[0]?.node;

  return {
    title: `${project?.title || slug} | ${project ? "Projects" : "Post"} | Diogo Matos`,
    description: project?.description || undefined,
    keywords: project?.stack.split(" ") || undefined,
    openGraph: {
      title: `${project?.title || slug} | ${project ? "Projects" : "Post"} | Diogo Matos`,
      description: project?.description || undefined,
      type: "article",
      url: `https://diogogmatos.dev/${slug}`,
      tags: project?.stack.split(" ") || undefined,
      images: project
        ? [
            {
              url: project.image,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project?.title || slug} | ${project ? "Projects" : "Post"} | Diogo Matos`,
      description: project?.description || undefined,
      images: project
        ? [
            {
              url: project.image,
              alt: project.title,
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: `https://diogogmatos.dev/${slug}`,
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { default: Post } = await import(`@/content/posts/${slug}.mdx`);
  return (
    <div className="flex flex-col gap-4">
      <BackButton />
      <Card innerClassName="p-3 sm:p-6">
        <Post />
      </Card>
    </div>
  );
}
